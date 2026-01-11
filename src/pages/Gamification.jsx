import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { badges, calculateUserLevel } from '../services/gamificationService';
import './Gamification.css';

const Gamification = () => {
  const { user } = useAuth();
  const [userLevel, setUserLevel] = useState({ level: 1, title: 'Newcomer', color: '#95E1D3' });
  const [userBadges, setUserBadges] = useState([]);

  useEffect(() => {
    const totalPoints = user?.points || 0;
    setUserLevel(calculateUserLevel(totalPoints));
    
    // Load user badges
    const earnedBadges = user?.badges || [];
    setUserBadges(badges.filter(badge => earnedBadges.includes(badge.id)));
  }, [user]);

  const progress = ((user?.points || 0) % 250) / 250 * 100;

  return (
    <div className="gamification-page">
      <div className="gamification-header">
        <h1>🏆 Your Achievements</h1>
        <p>Track your progress and unlock rewards</p>
      </div>

      <div className="level-card">
        <div className="level-badge" style={{ backgroundColor: userLevel.color }}>
          <span className="level-number">Level {userLevel.level}</span>
        </div>
        <div className="level-info">
          <h2>{userLevel.title}</h2>
          <p>{user?.points || 0} Total Points</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-text">{Math.floor(progress)}% to next level</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-value">{user?.eventsAttended || 0}</div>
          <div className="stat-label">Events Attended</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{user?.clubs?.length || 0}</div>
          <div className="stat-label">Clubs Joined</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">{user?.hoursVolunteered || 0}</div>
          <div className="stat-label">Hours Volunteered</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏅</div>
          <div className="stat-value">{userBadges.length}</div>
          <div className="stat-label">Badges Earned</div>
        </div>
      </div>

      <div className="badges-section">
        <h2>🎖️ Your Badges</h2>
        <div className="badges-grid">
          {badges.map(badge => {
            const earned = userBadges.some(b => b.id === badge.id);
            return (
              <div key={badge.id} className={`badge-card ${earned ? 'earned' : 'locked'}`}>
                <div className="badge-icon">{badge.icon}</div>
                <div className="badge-name">{badge.name}</div>
                <div className="badge-description">{badge.description}</div>
                <div className="badge-points">+{badge.points} pts</div>
                {!earned && <div className="badge-lock">🔒</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gamification;
