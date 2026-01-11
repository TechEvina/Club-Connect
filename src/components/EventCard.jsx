import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, onAttend }) => {
  return (
    <div className="card event-card">
      <div>
        <h3>{event.name}</h3>
        <p>{event.dateTime}</p>
        <p>{event.location}</p>
      </div>
      <div>
        <button className="btn" onClick={() => onAttend(event.id)}>Attend</button>
        <Link to={`/events/${event.id}`}>
          <button className="btn btn-outline">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;