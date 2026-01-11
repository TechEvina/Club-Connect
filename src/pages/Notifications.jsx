import React, { useState } from 'react';

const Notifications = () => {
  const [notifications] = useState([
    { id: 1, message: 'Upcoming event: Tech Meetup tomorrow', type: 'event' },
    { id: 2, message: 'New announcement from Art Club', type: 'announcement' },
    { id: 3, message: 'Someone replied to your question', type: 'reply' }
  ]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Notifications</h1>
      {notifications.map(notif => (
        <div key={notif.id} className="card" style={{ marginBottom: '10px' }}>
          <p>{notif.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;