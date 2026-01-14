import React, { useState } from 'react';
import './Home.css';
import { schools, languages } from '../data/onboardingData.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedSchool, setSelectedSchool] = useState('Central High School');

  const tabs = ['profile', 'school', 'language', 'notifications', 'privacy', 'accessibility'];

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="post-card" style={{ maxWidth: '800px' }}>
            <h3>Profile Settings</h3>
            <div style={{ marginTop: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Full Name</label>
                <input type="text" defaultValue="Evina" style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '14px'
                }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Email</label>
                <input type="email" defaultValue="evina@school.edu" style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '14px'
                }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Bio</label>
                <textarea rows="3" defaultValue="Tech enthusiast and club leader" style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  resize: 'vertical'
                }} />
              </div>
              <button style={{
                padding: '10px 20px',
                background: 'var(--accent-primary)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}>Save Changes</button>
            </div>
          </div>
        );
      
      case 'school':
        return (
          <div className="post-card" style={{ maxWidth: '800px' }}>
            <h3>School Information</h3>
            <div style={{ marginTop: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>School Name</label>
                  {/* Allow selecting school from the known list */}
                  <select value={selectedSchool || ''} onChange={(e) => setSelectedSchool(e.target.value)} style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontSize: '14px'
                  }}>
                    <option value="">-- Select your school --</option>
                    {schools.map(s => (
                      <option key={s.id} value={s.name}>{s.name} — {s.location}</option>
                    ))}
                  </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Grade</label>
                <select style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  <option>9th Grade</option>
                  <option>10th Grade</option>
                  <option selected>11th Grade</option>
                  <option>12th Grade</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 'language':
        return (
          <div className="post-card" style={{ maxWidth: '800px' }}>
            <h3>🌐 Language Preferences</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '20px' }}>
              Choose your preferred language. Changes apply instantly.
            </p>
            <LanguageSelector />
          </div>
        );
      
      case 'notifications':
        return (
          <div className="post-card" style={{ maxWidth: '800px' }}>
            <h3>Notification Settings</h3>
            <div style={{ marginTop: '20px' }}>
              {['Event Reminders', 'New Messages', 'Announcements', 'Attendance Alerts', 'Voting Notifications'].map((item) => (
                <div key={item} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{item}</span>
                  <label style={{ cursor: 'pointer', position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                    <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'var(--accent-primary)',
                      borderRadius: '24px',
                      transition: 'var(--transition-base)'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '',
                        height: '18px',
                        width: '18px',
                        left: '26px',
                        bottom: '3px',
                        background: 'white',
                        borderRadius: '50%',
                        transition: 'var(--transition-base)'
                      }}></span>
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'privacy':
        return (
          <div className="post-card" style={{ maxWidth: '800px' }}>
            <h3>Privacy Controls</h3>
            <div style={{ marginTop: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Profile Visibility</label>
                <select style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  <option>Everyone</option>
                  <option selected>My Clubs</option>
                  <option>Private</option>
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Show Online Status</label>
                <select style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  <option selected>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 'accessibility':
        return (
          <div className="post-card" style={{ maxWidth: '800px' }}>
            <h3>Accessibility Options</h3>
            <div style={{ marginTop: '20px' }}>
              {['High Contrast Mode', 'Reduce Motion', 'Large Text', 'Screen Reader Optimized'].map((item) => (
                <div key={item} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{item}</span>
                  <label style={{ cursor: 'pointer', position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                    <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'var(--bg-tertiary)',
                      borderRadius: '24px',
                      transition: 'var(--transition-base)',
                      border: '1px solid var(--border-color)'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '',
                        height: '18px',
                        width: '18px',
                        left: '3px',
                        bottom: '2px',
                        background: 'var(--text-secondary)',
                        borderRadius: '50%',
                        transition: 'var(--transition-base)'
                      }}></span>
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-greeting">
          <h1>Settings</h1>
          <span className="school-name">Customize your experience</span>
        </div>
      </div>

      <section>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                background: activeTab === tab ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-base)'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {renderContent()}
      </section>
    </div>
  );
};

export default Settings;
