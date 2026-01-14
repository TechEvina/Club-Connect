(async () => {
  try {
    const mod = await import('../src/services/schoolLookup.js');
    console.log('Calling geocodeZip for 10001...');
    const geo = await mod.geocodeZip('10001', 'us');
    console.log('geocodeZip result:', JSON.stringify(geo, null, 2));
    if (!geo || !geo.bbox) {
      console.error('No bbox returned; aborting.');
      process.exit(1);
    }
    console.log('Calling findSchoolsByBBox...');
    const schools = await mod.findSchoolsByBBox(geo.bbox);
    console.log(`Found ${Array.isArray(schools) ? schools.length : 0} schools (showing up to 10):`);
    console.log(JSON.stringify((schools || []).slice(0,10), null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error running lookup:', err);
    process.exit(2);
  }
})();
