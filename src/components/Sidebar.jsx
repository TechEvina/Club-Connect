import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/app', icon: '🏠', label: 'Home' },
    { path: '/clubs', icon: '🏫', label: 'My Clubs' },
    { path: '/app/feed', icon: '🌐', label: 'Feed' },
    { path: '/app/qr-attendance', icon: '📱', label: 'QR Check-in' },
    { path: '/app/calendar', icon: '📅', label: 'Calendar' },
    { path: '/app/gamification', icon: '🏆', label: 'Achievements' },
    { path: '/app/analytics', icon: '📊', label: 'Analytics' },
    { path: '/app/portfolio', icon: '📋', label: 'Portfolio' },
    { path: '/app/messages', icon: '💬', label: 'Messages' },
    { path: '/app/voting', icon: '🗳️', label: 'Voting' },
    { path: '/app/settings', icon: '⚙️', label: 'Settings' },
  ];
  
  const { user } = useAuth();

  // Allow a preview school to be shown while registering (written to localStorage by Register.jsx)
  const previewSchool = (typeof window !== 'undefined' && localStorage.getItem('clubconnect_preview_school')) || null;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        ClubConnect
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="sidebar-profile">
          <div className="sidebar-avatar">{(user?.name||'U').charAt(0).toUpperCase()}</div>
          <div className="sidebar-profile-info">
            <div className="sidebar-profile-name">{user?.name || 'Evina'}</div>
            <div className="sidebar-profile-school">{user?.school || previewSchool || 'Central High'}</div>
          </div>
        </div>
        <div style={{ marginTop: '12px', textAlign: 'center' }}>
          <button style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '8px'
          }}>
            🌐
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
