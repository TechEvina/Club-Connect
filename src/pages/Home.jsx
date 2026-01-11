import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [timeUntilEvent, setTimeUntilEvent] = useState({ hours: 2, minutes: 14 });
  
  // Derived values from user (not state)
  const userName = user?.name || 'User';
  const schoolName = user?.school || 'Your School';
  const availableClubCount = 55; // Total clubs available
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getGradientTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  // Countdown timer for next event
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilEvent(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59 };
        }
        return prev;
      });
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Define myClubs first
  const myClubs = user?.clubs?.map(clubId => {
    // Map club IDs to full club data
    const clubData = {
      1: { name: 'Chess Club', icon: '♟️', description: 'Strategic thinking and competitive play', members: 16 },
      2: { name: 'Robotics Club', icon: '🤖', description: 'Building robots and coding competitions', members: 22 },
      3: { name: 'Art Society', icon: '🎨', description: 'Expressing creativity through visual arts', members: 18 },
      4: { name: 'Drama Club', icon: '🎭', description: 'Theatrical performances and acting', members: 14 },
      5: { name: 'Science Olympiad', icon: '🔬', description: 'Competing in STEM excellence', members: 24 },
      6: { name: 'Debate Team', icon: '🗣️', description: 'Sharpening minds through discourse', members: 12 },
    };
    
    const club = clubData[clubId];
    if (!club) return null;
    
    return {
      id: clubId,
      name: club.name,
      icon: club.icon,
      role: user?.role === 'president' ? 'President' : 
            user?.role === 'officer' ? 'Officer' : 'Member',
      description: club.description,
      hasNotification: false,
      members: club.members,
      nextMeeting: 'TBD'
    };
  }).filter(Boolean) || [];

  // Generate today's snapshot based on user's actual clubs
  const todaySnapshot = myClubs.length > 0 ? [
    // Only show if user has clubs with upcoming events
    ...(myClubs.length > 0 ? [{
      id: 1,
      icon: '📅',
      title: 'Next Event',
      content: `${myClubs[0]?.name || 'Club'} Workshop`,
      meta: 'Check calendar for details',
      cta: 'View Calendar',
      action: () => navigate('/app/calendar')
    }] : []),
    // Only show attendance if in clubs
    ...(myClubs.length > 0 ? [{
      id: 2,
      icon: '✓',
      title: 'Attendance',
      content: `${myClubs.length} club${myClubs.length > 1 ? 's' : ''} to track`,
      cta: 'View History',
      action: () => navigate('/app/attendance')
    }] : []),
    // Only show announcements if in clubs
    ...(myClubs.length > 0 ? [{
      id: 3,
      icon: '📢',
      title: 'Updates',
      content: myClubs.length > 1 ? `Updates from ${myClubs.length} clubs` : `Updates from ${myClubs[0]?.name}`,
      cta: 'View All',
      action: () => navigate('/app/notifications')
    }] : [])
  ] : [];

  return (
    <div className="dashboard">
      {/* Hero Gradient Background */}
      <div className={`hero-gradient ${getGradientTime()}`}></div>
      
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-greeting">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--vibrant-green), var(--soft-blue))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              boxShadow: '0 4px 12px rgba(126, 217, 87, 0.3)'
            }}>
              {user?.profilePic || '👤'}
            </div>
            <div>
              <h1>{getGreeting()}, {userName}</h1>
              <span className="school-name">{schoolName}</span>
            </div>
          </div>
        </div>
        <div className="dashboard-actions">
          <button className="bell-button" onClick={() => navigate('/app/notifications')}>
            🔔
            <span className="notification-dot"></span>
          </button>
        </div>
      </div>

      {/* Today Snapshot */}
      <section>
        <h2 className="section-title">Today</h2>
        {todaySnapshot.length > 0 ? (
          <div className="today-snapshot">
            {todaySnapshot.map((item) => (
              <div 
                key={item.id} 
                className="snapshot-card"
                onClick={item.action}
                style={{ cursor: 'pointer' }}
              >
                <div className="snapshot-card-header">
                  <span className="snapshot-card-icon">{item.icon}</span>
                </div>
                <div className="snapshot-card-title">{item.title}</div>
                <div className="snapshot-card-content">
                  <h3>{item.content}</h3>
                  {item.meta && <div className="snapshot-card-meta">{item.meta}</div>}
                </div>
                <div className="snapshot-card-cta">
                  {item.cta} →
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state-small">
            <p style={{ color: '#666', fontSize: '14px', textAlign: 'center', margin: '20px 0' }}>
              📋 Join clubs to see your upcoming events and updates here
            </p>
          </div>
        )}
      </section>

      {/* My Clubs */}
      <section className="my-clubs-section">
        <h2 className="section-title">My Clubs</h2>
        {myClubs.length > 0 ? (
          <div className="clubs-grid">
            {myClubs.map((club) => (
              <div 
                key={club.id} 
                className="modern-club-card"
                onClick={() => navigate(`/clubs/${club.id}`)}
              >
                {club.hasNotification && <div className="club-notification-dot"></div>}
                
                {/* Club Header: Icon + Name */}
                <div className="modern-club-header">
                  <div className="modern-club-icon">{club.icon}</div>
                  <div className="modern-club-title-wrapper">
                    <h3 className="modern-club-name">{club.name}</h3>
                    <span className={`modern-role-badge ${club.role.toLowerCase()}`}>
                      {club.role}
                    </span>
                  </div>
                </div>
                
                {/* Club Description */}
                <p className="modern-club-description">{club.description}</p>
                
                {/* Club Footer: Member Count */}
                <div className="modern-club-footer">
                  <div className="modern-club-members">
                    <span className="member-icon">👥</span>
                    <span className="member-count">{club.members} members</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🏫</div>
            <h3 className="empty-state-title">No clubs yet!</h3>
            <p className="empty-state-message">
              Join clubs to connect with students who share your interests. Explore our catalog of {availableClubCount} active clubs.
            </p>
            <button className="empty-state-btn" onClick={() => navigate('/clubs')} aria-label="Browse available clubs">
              Explore Clubs
            </button>
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="section-title">Quick Actions</h2>
        <div className="today-snapshot">
          <div className="snapshot-card" onClick={() => navigate('/clubs')} style={{ cursor: 'pointer' }}>
            <div className="snapshot-card-header">
              <span className="snapshot-card-icon">🔍</span>
            </div>
            <div className="snapshot-card-content">
              <h3>Join New Club</h3>
            </div>
            <div className="snapshot-card-cta">Explore Clubs →</div>
          </div>
          <div className="snapshot-card" onClick={() => navigate('/app/messages')} style={{ cursor: 'pointer' }}>
            <div className="snapshot-card-header">
              <span className="snapshot-card-icon">💬</span>
            </div>
            <div className="snapshot-card-content">
              <h3>Message Officers</h3>
            </div>
            <div className="snapshot-card-cta">Open Messages →</div>
          </div>
          <div className="snapshot-card" onClick={() => navigate('/app/calendar')} style={{ cursor: 'pointer' }}>
            <div className="snapshot-card-header">
              <span className="snapshot-card-icon">📅</span>
            </div>
            <div className="snapshot-card-content">
              <h3>View Full Calendar</h3>
            </div>
            <div className="snapshot-card-cta">Open Calendar →</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;