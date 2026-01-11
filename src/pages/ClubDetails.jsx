import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ClubDetails.css';

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('feed');
  
  const club = {
    id: id,
    name: 'Tech Club',
    icon: '💻',
    role: 'President',
    description: 'Building the future through technology'
  };

  const posts = [
    {
      id: 1,
      type: 'announcement',
      typeLabel: '📣 Announcement',
      author: 'Sarah Johnson',
      avatar: 'S',
      role: 'President',
      roleColor: '#3B82F6',
      timestamp: '2 hours ago',
      title: 'Welcome New Members!',
      content: 'We\'re excited to have 5 new members joining us this semester. Looking forward to building amazing projects together! 🚀',
      likes: 12,
      comments: 3,
      hasResources: true
    },
    {
      id: 2,
      type: 'event',
      typeLabel: '📅 Event Reminder',
      author: 'Mike Chen',
      avatar: 'M',
      role: 'Officer',
      roleColor: '#9CA3AF',
      timestamp: '1 day ago',
      title: 'Python Workshop',
      content: 'Don\'t forget about our Python workshop this Friday at 3 PM. Bring your laptops!',
      eventDetails: {
        time: 'Friday at 3:00 PM',
        location: 'Room 214'
      },
      likes: 8,
      comments: 2
    },
    {
      id: 3,
      type: 'poll',
      typeLabel: '📊 Poll',
      author: 'Dr. Williams',
      avatar: 'W',
      role: 'Advisor',
      roleColor: '#22C55E',
      timestamp: '3 days ago',
      title: 'Next Semester Topics',
      content: 'Vote on what you want to learn next semester!',
      likes: 15,
      comments: 7
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Python Workshop',
      date: '25',
      month: 'Jan',
      time: '3:00 PM - 5:00 PM',
      location: 'Room 201'
    },
    {
      id: 2,
      title: 'Hackathon Planning',
      date: '28',
      month: 'Jan',
      time: '4:00 PM - 6:00 PM',
      location: 'Computer Lab'
    }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'feed':
        return (
          <div className="feed-container">
            {posts.map(post => (
              <div key={post.id} className="post-card" style={{ 
                borderLeft: `4px solid ${post.roleColor}`,
                position: 'relative'
              }}>
                {/* Post Type Label */}
                <div style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  marginBottom: '12px',
                  letterSpacing: '0.3px'
                }}>
                  {post.typeLabel}
                </div>

                {/* Post Header with Role Badge */}
                <div className="post-header">
                  <div className="post-avatar">{post.avatar}</div>
                  <div className="post-author-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="post-author-name">{post.author}</span>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background: `${post.roleColor}20`,
                        color: post.roleColor,
                        border: `1px solid ${post.roleColor}40`
                      }}>
                        {post.role}
                      </span>
                    </div>
                    <div className="post-timestamp">{post.timestamp}</div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="post-content">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  
                  {/* Event Details if present */}
                  {post.eventDetails && (
                    <div style={{
                      marginTop: '16px',
                      padding: '12px 16px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)'
                    }}>
                      <div style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        ⏰ {post.eventDetails.time}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        📍 {post.eventDetails.location}
                      </div>
                    </div>
                  )}
                </div>

                {/* Engagement Stats */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-color)',
                  fontSize: '14px',
                  color: 'var(--text-secondary)'
                }}>
                  <span>👍 {post.likes}</span>
                  <span>💬 {post.comments} comments</span>
                </div>

                {/* Action Buttons */}
                <div className="post-actions" style={{ 
                  opacity: 1,
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  {/* Universal Actions */}
                  <button className="post-action-btn">
                    <span>👍</span> Like
                  </button>
                  <button className="post-action-btn" onClick={(e) => {
                    e.stopPropagation();
                    alert('Comments coming soon!');
                  }}>
                    <span>💬</span> Comment
                  </button>
                  <button className="post-action-btn">
                    <span>🔖</span> Save
                  </button>

                  {/* Context-Specific Actions */}
                  {post.type === 'event' && (
                    <>
                      <button className="post-action-btn" style={{
                        background: 'rgba(59, 130, 246, 0.15)',
                        color: 'var(--accent-primary)',
                        border: '1px solid rgba(59, 130, 246, 0.3)'
                      }}>
                        <span>📅</span> Add to Calendar
                      </button>
                      <button className="post-action-btn" style={{
                        background: 'rgba(59, 130, 246, 0.15)',
                        color: 'var(--accent-primary)',
                        border: '1px solid rgba(59, 130, 246, 0.3)'
                      }}>
                        <span>🕒</span> Remind Me
                      </button>
                    </>
                  )}

                  {post.hasResources && (
                    <button className="post-action-btn" style={{
                      background: 'rgba(34, 197, 94, 0.15)',
                      color: 'var(--accent-green)',
                      border: '1px solid rgba(34, 197, 94, 0.3)'
                    }}>
                      <span>📎</span> Resources
                    </button>
                  )}

                  {post.type === 'poll' && (
                    <button className="post-action-btn" style={{
                      background: 'rgba(250, 204, 21, 0.15)',
                      color: 'var(--accent-yellow)',
                      border: '1px solid rgba(250, 204, 21, 0.3)'
                    }}>
                      <span>🗳️</span> Vote Now
                    </button>
                  )}
                </div>

                {/* Collapsible Comments Section */}
                {post.comments > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('View comments functionality coming soon!');
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-primary)',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        padding: '8px 0',
                        transition: 'opacity var(--transition-base)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      View {post.comments} comment{post.comments > 1 ? 's' : ''} ▼
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      
      case 'events':
        return (
          <div>
            <div className="events-view-toggle">
              <button className="view-toggle-btn active">List</button>
              <button className="view-toggle-btn">Calendar</button>
            </div>
            <div className="events-grid">
              {events.map(event => (
                <div 
                  key={event.id} 
                  className="event-card"
                  onClick={() => navigate(`/app/events/${event.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="event-date-badge">
                    <div className="event-date-day">{event.date}</div>
                    <div className="event-date-month">{event.month}</div>
                  </div>
                  <h3>{event.title}</h3>
                  <div className="event-meta">
                    <div>⏰ {event.time}</div>
                    <div>📍 {event.location}</div>
                  </div>
                  <div className="event-buttons">
                    <button 
                      className="event-btn event-btn-primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Going
                    </button>
                    <button 
                      className="event-btn event-btn-secondary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Maybe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'attendance':
        return (
          <div className="feed-container">
            <div className="post-card">
              <h3>Attendance History</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                You've attended 12 out of 15 meetings this semester
              </p>
              <div style={{ 
                width: '100%', 
                height: '12px', 
                backgroundColor: 'var(--bg-tertiary)', 
                borderRadius: '6px',
                overflow: 'hidden',
                marginTop: '16px'
              }}>
                <div style={{
                  width: '80%',
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-green))',
                  borderRadius: '6px',
                  animation: 'fillBar 1s ease-out'
                }}></div>
              </div>
            </div>
          </div>
        );
      
      case 'projects':
        return (
          <div className="feed-container">
            <div className="post-card">
              <h3>Active Projects</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Collaborate on club projects and track progress
              </p>
            </div>
          </div>
        );
      
      case 'voting':
        return (
          <div className="feed-container">
            <div className="post-card">
              <h3>Active Polls</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Participate in club decisions and elections
              </p>
            </div>
          </div>
        );
      
      case 'members':
        return (
          <div className="feed-container">
            <div className="post-card">
              <h3>Club Members (24)</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Connect with fellow members
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="club-details">
      {/* Banner */}
      <div className="club-banner">
        <div className="club-header-content">
          <div className="club-header-top">
            <div className="club-title-section">
              <div className="club-header-icon">{club.icon}</div>
              <div className="club-title-info">
                <h1>{club.name}</h1>
                <span className="club-header-badge">{club.role}</span>
              </div>
            </div>
            <div className="club-quick-actions">
              <button className="quick-action-btn">💬 Message</button>
              <button className="quick-action-btn">✓ Attendance</button>
              <button className="quick-action-btn">🚪 Leave</button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="club-tabs">
        <div className="club-tabs-container">
          <ul className="club-tabs-nav">
            {['feed', 'events', 'attendance', 'projects', 'voting', 'members'].map(tab => (
              <li 
                key={tab}
                className={`club-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      <div className="club-tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ClubDetails;