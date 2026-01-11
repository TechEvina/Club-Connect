import React, { useState } from 'react';

const Profile = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    joinedClubs: ['Tech Club', 'Art Club'],
    badges: ['Active Member', 'Event Organizer'],
    eventsAttended: 5,
    clubsJoined: 2,
    participationStreak: 3
  });

  const handleExport = () => {
    alert('PDF export will be implemented with Firebase later.');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '48px' }}>👤</div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
      <div className="card" style={{ marginBottom: '20px' }}>
        <h2>Your Stats</h2>
        <p>Clubs Joined: {user.clubsJoined}</p>
        <p>Events Attended: {user.eventsAttended}</p>
        <p>Participation Streak: {user.participationStreak} weeks</p>
      </div>
      <section style={{ marginBottom: '20px' }}>
        <h2>Joined Clubs</h2>
        <ul>
          {user.joinedClubs.map(club => <li key={club}>{club}</li>)}
        </ul>
      </section>
      <section style={{ marginBottom: '20px' }}>
        <h2>Digital Badges</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {user.badges.map(badge => (
            <span key={badge} className="badge">{badge}</span>
          ))}
        </div>
      </section>
      <button className="btn" onClick={handleExport}>Download Participation PDF</button>
    </div>
  );
};

export default Profile;