import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Portfolio.css';

const Portfolio = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const portfolioData = {
    achievements: [
      { title: 'Robotics Competition Winner', date: 'March 2026', description: '1st place in regional robotics competition' },
      { title: 'Drama Performance', date: 'February 2026', description: 'Lead role in spring musical production' },
      { title: 'Chess Tournament', date: 'January 2026', description: 'Top 5 finish in state championship' }
    ],
    skills: [
      { name: 'Leadership', level: 85, category: 'Soft Skills' },
      { name: 'Programming', level: 75, category: 'Technical' },
      { name: 'Public Speaking', level: 70, category: 'Communication' },
      { name: 'Teamwork', level: 90, category: 'Soft Skills' },
      { name: 'Problem Solving', level: 80, category: 'Critical Thinking' }
    ],
    projects: [
      { 
        title: 'Community Garden Initiative',
        club: 'Environmental Club',
        impact: 'Planted 200+ native plants, engaged 50+ students',
        date: 'Ongoing'
      },
      {
        title: 'Coding Workshop Series',
        club: 'Tech Club',
        impact: 'Taught Python to 30+ beginners',
        date: 'Fall 2025'
      }
    ],
    volunteerHours: user?.hoursVolunteered || 0,
    clubs: user?.clubs?.length || 0,
    eventsAttended: user?.eventsAttended || 0
  };

  const exportPortfolio = () => {
    const portfolioText = `
${user?.name}'s Club Portfolio
${user?.school}

OVERVIEW
- Clubs Joined: ${portfolioData.clubs}
- Events Attended: ${portfolioData.eventsAttended}
- Volunteer Hours: ${portfolioData.volunteerHours}

ACHIEVEMENTS
${portfolioData.achievements.map(a => `- ${a.title} (${a.date}): ${a.description}`).join('\n')}

SKILLS
${portfolioData.skills.map(s => `- ${s.name}: ${s.level}%`).join('\n')}

PROJECTS
${portfolioData.projects.map(p => `- ${p.title} (${p.club}): ${p.impact}`).join('\n')}
    `.trim();

    const blob = new Blob([portfolioText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user?.name}_Portfolio.txt`;
    a.click();
  };

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <div className="portfolio-profile">
          <div className="portfolio-pic">{user?.profilePic || '👤'}</div>
          <div className="portfolio-info">
            <h1>{user?.name}</h1>
            <p>{user?.school}</p>
            <p className="portfolio-role">{user?.role}</p>
          </div>
        </div>
        <button onClick={exportPortfolio} className="export-btn">
          📥 Export Portfolio
        </button>
      </div>

      <div className="portfolio-stats">
        <div className="stat-box">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{portfolioData.clubs}</div>
          <div className="stat-label">Clubs</div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">📅</div>
          <div className="stat-value">{portfolioData.eventsAttended}</div>
          <div className="stat-label">Events</div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">{portfolioData.volunteerHours}h</div>
          <div className="stat-label">Volunteer Hours</div>
        </div>
      </div>

      <div className="portfolio-tabs">
        <button 
          className={activeSection === 'overview' ? 'active' : ''}
          onClick={() => setActiveSection('overview')}
        >
          Overview
        </button>
        <button 
          className={activeSection === 'achievements' ? 'active' : ''}
          onClick={() => setActiveSection('achievements')}
        >
          Achievements
        </button>
        <button 
          className={activeSection === 'skills' ? 'active' : ''}
          onClick={() => setActiveSection('skills')}
        >
          Skills
        </button>
        <button 
          className={activeSection === 'projects' ? 'active' : ''}
          onClick={() => setActiveSection('projects')}
        >
          Projects
        </button>
      </div>

      <div className="portfolio-content">
        {activeSection === 'achievements' && (
          <div className="achievements-section">
            <h2>🏆 Achievements</h2>
            <div className="achievements-list">
              {portfolioData.achievements.map((achievement, index) => (
                <div key={index} className="achievement-card">
                  <div className="achievement-icon">🌟</div>
                  <div className="achievement-content">
                    <h3>{achievement.title}</h3>
                    <p className="achievement-date">{achievement.date}</p>
                    <p className="achievement-description">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'skills' && (
          <div className="skills-section">
            <h2>💪 Skills</h2>
            <div className="skills-list">
              {portfolioData.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: `${skill.level}%` }}></div>
                  </div>
                  <span className="skill-category">{skill.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'projects' && (
          <div className="projects-section">
            <h2>🚀 Projects</h2>
            <div className="projects-list">
              {portfolioData.projects.map((project, index) => (
                <div key={index} className="project-card">
                  <h3>{project.title}</h3>
                  <p className="project-club">{project.club}</p>
                  <p className="project-impact">Impact: {project.impact}</p>
                  <p className="project-date">{project.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'overview' && (
          <div className="overview-section">
            <h2>📋 Portfolio Summary</h2>
            <p>This portfolio showcases your involvement and growth through club activities at {user?.school}.</p>
            <div className="overview-highlights">
              <div className="highlight-box">
                <h3>Most Active In</h3>
                <p>STEM & Technology</p>
              </div>
              <div className="highlight-box">
                <h3>Leadership Experience</h3>
                <p>{user?.role === 'president' ? 'Club President' : user?.role === 'officer' ? 'Club Officer' : 'Active Member'}</p>
              </div>
              <div className="highlight-box">
                <h3>Community Impact</h3>
                <p>{portfolioData.volunteerHours}+ hours contributed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
