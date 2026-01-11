import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();
  const [event] = useState({
    id: '1',
    name: 'Tech Meetup',
    dateTime: '2025-12-25 10:00',
    location: 'Room 101',
    description: 'Join us for a discussion on the latest in tech.'
  });

  const handleAttend = () => {
    alert('Attendance marked!');
  };

  const handleAddToCalendar = () => {
    alert('Added to Google Calendar!');
  };

  const handleShare = () => {
    alert('Share options opened!');
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{event.name}</h1>
      <p><strong>Date & Time:</strong> {event.dateTime}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button className="btn btn-success" onClick={handleAttend}>Mark Attendance</button>
        <button className="btn" onClick={handleAddToCalendar}>Add to Calendar</button>
        <button className="btn btn-outline" onClick={handleShare}>Share</button>
      </div>
    </div>
  );
};

export default EventDetails;