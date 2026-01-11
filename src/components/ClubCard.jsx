import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClubCard = ({ club, onJoin }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className="card club-card"
      onClick={() => navigate(`/clubs/${club.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        transition: 'transform 0.2s',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        cursor: 'pointer'
      }}
    >
      <div>
        <h3>{club.name}</h3>
        <p style={{ 
          color: '#666', 
          fontSize: '14px',
          opacity: isHovered ? 1 : 0.7,
          transition: 'opacity 0.2s'
        }}>
          {club.description}
        </p>
        <p style={{ fontSize: '13px', color: '#888' }}>
          👥 {club.members} members • 📁 {club.category}
        </p>
      </div>
      {isHovered && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px'
        }}>
          <button 
            className="btn" 
            onClick={(e) => {
              e.stopPropagation();
              onJoin(club.id);
            }}
          >
            Join Club
          </button>
        </div>
      )}
    </div>
  );
};

export default ClubCard;