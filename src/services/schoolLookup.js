// OpenStreetMap-based school lookup: Nominatim (geocode ZIP) + Overpass (find schools)
export async function geocodeZip(zip, country = 'us') {
  const q = encodeURIComponent(zip + (country ? ` ${country}` : ''));
  const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&addressdetails=1&limit=1&countrycodes=${country}`;
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error('Geocoding failed');
  const data = await res.json();
  if (!data || data.length === 0) return null;
  const place = data[0];
  // Nominatim returns boundingbox: [south, north, west, east]
  const bbox = place.boundingbox.map(Number); // [south, north, west, east]
  return {
    lat: Number(place.lat),
    lon: Number(place.lon),
    bbox: { south: bbox[0], north: bbox[1], west: bbox[2], east: bbox[3] }
  };
}

export async function findSchoolsByBBox(bbox) {
  // Overpass QL: search for amenity=school/college/university within bbox
  const q = `
  [out:json][timeout:25];
  (
    node["amenity"~"school|college|university"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
    way["amenity"~"school|college|university"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
    relation["amenity"~"school|college|university"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
  );
  out center 100;
  `;

  const url = 'https://overpass-api.de/api/interpreter';
  const res = await fetch(url, { method: 'POST', body: q, headers: { 'Content-Type': 'text/plain' } });
  if (!res.ok) throw new Error('Overpass query failed');
  const data = await res.json();
  if (!data || !data.elements) return [];
  const results = data.elements.map(el => {
    const name = el.tags && (el.tags.name || el.tags['official_name']) ? (el.tags.name || el.tags['official_name']) : 'Unnamed school';
    const location = (el.tags && (el.tags['addr:city'] || el.tags['addr:suburb'] || el.tags['addr:postcode'])) || '';
    const lat = el.lat || (el.center && el.center.lat) || null;
    const lon = el.lon || (el.center && el.center.lon) || null;
    return { id: `${el.type}/${el.id}`, name, location, lat, lon, raw: el };
  });
  return results;
}
