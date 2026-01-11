import React, { useState } from 'react';
import './Home.css';

const Calendar = () => {
  const [view, setView] = useState('agenda');
  const [filter, setFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [calendarSynced, setCalendarSynced] = useState(false);
  const [rsvpStates, setRsvpStates] = useState({});

  const eventTypes = {
    meeting: { color: '#3B82F6', label: 'Meeting' },
    workshop: { color: '#8B5CF6', label: 'Workshop' },
    mandatory: { color: '#EF4444', label: 'Mandatory' },
    social: { color: '#10B981', label: 'Social' },
    competition: { color: '#F59E0B', label: 'Competition' }
  };

  const events = [
    { 
      id: 1, 
      club: 'Tech Club', 
      title: 'Python Workshop', 
      date: 'Jan 25', 
      fullDate: '2026-01-25',
      time: '3:00–4:30 PM', 
      location: 'Room 201', 
      type: 'workshop',
      description: 'Learn Python basics and build your first app',
      rsvp: null,
      attendees: 18,
      attachments: ['workshop-guide.pdf']
    },
    { 
      id: 2, 
      club: 'Art Club', 
      title: 'Gallery Visit', 
      date: 'Jan 26', 
      fullDate: '2026-01-26',
      time: '2:00–5:00 PM', 
      location: 'Art Museum', 
      type: 'social',
      description: 'Explore modern art at the downtown gallery',
      rsvp: 'going',
      attendees: 12
    },
    { 
      id: 3, 
      club: 'Debate Team', 
      title: 'Practice Session', 
      date: 'Jan 27', 
      fullDate: '2026-01-27',
      time: '4:00–6:00 PM', 
      location: 'Auditorium', 
      type: 'meeting',
      description: 'Prepare for upcoming debate tournament',
      rsvp: 'going',
      attendees: 15
    },
    { 
      id: 4, 
      club: 'Science Olympiad', 
      title: 'Regional Competition', 
      date: 'Jan 28', 
      fullDate: '2026-01-28',
      time: '9:00 AM–5:00 PM', 
      location: 'University Campus', 
      type: 'competition',
      description: 'First regional competition of the season - attendance mandatory',
      rsvp: 'going',
      attendees: 24,
      mandatory: true
    },
    { 
      id: 5, 
      club: 'Tech Club', 
      title: 'Officer Meeting', 
      date: 'Today', 
      fullDate: '2026-01-02',
      time: '3:30 PM', 
      location: 'Room 201', 
      type: 'mandatory',
      description: 'Monthly officer check-in',
      rsvp: null,
      attendees: 5
    }
  ];

  const filteredEvents = filter === 'my' 
    ? events.filter(e => e.rsvp === 'going')
    : events;

  const groupEventsByDate = (events) => {
    const today = events.filter(e => e.date === 'Today');
    const tomorrow = events.filter(e => e.date === 'Tomorrow');
    const thisWeek = events.filter(e => !['Today', 'Tomorrow'].includes(e.date));
    
    return { today, tomorrow, thisWeek };
  };

  const handleRSVP = (eventId, status) => {
    const event = events.find(e => e.id === eventId);
    
    if (status === 'not-going' && event.type === 'mandatory') {
      const reason = prompt('This is a mandatory event. Please provide a reason for absence:');
      if (reason) {
        setRsvpStates(prev => ({ ...prev, [eventId]: status }));
        alert(`Excuse submitted. Officer will be notified.\nReason: ${reason}`);
      }
    } else {
      setRsvpStates(prev => ({ ...prev, [eventId]: status }));
    }
  };

  const EventCard = ({ event }) => {
    const eventType = eventTypes[event.type];
    const currentRsvp = rsvpStates[event.id] || event.rsvp;
    const isToday = event.date === 'Today';
    
    return (
      <div 
        style={{ 
          position: 'relative',
          background: 'var(--bg-secondary)',
          borderRadius: '12px',
          padding: '20px',
          paddingLeft: '24px',
          marginBottom: '16px',
          border: '1px solid var(--border-color)',
          boxShadow: isToday ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = isToday 
            ? '0 4px 12px rgba(59, 130, 246, 0.15), 0 0 0 2px rgba(59, 130, 246, 0.2)' 
            : '0 4px 12px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = isToday ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none';
        }}
        onClick={() => setSelectedEvent(event)}
      >
        {/* Left Color Bar */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          background: eventType.color,
          borderRadius: '12px 0 0 12px'
        }} />

        {/* Event Type + Club */}
        <div style={{ 
          fontSize: '11px', 
          fontWeight: 700, 
          color: eventType.color,
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.8px'
        }}>
          {eventType.label} • {event.club}
        </div>

        {/* Title */}
        <h3 style={{ 
          margin: 0, 
          marginBottom: '12px', 
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--text-primary)'
        }}>
          {event.title}
        </h3>

        {/* Meta Info */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          gap: '8px',
          marginBottom: '16px',
          fontSize: '14px',
          color: '#94A3B8'
        }}>
          <div>📅 {event.date}</div>
          <div>⏰ {event.time}</div>
          <div>📍 {event.location}</div>
          <div>👥 {event.attendees} attending</div>
        </div>

        {/* RSVP Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '12px'
        }}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleRSVP(event.id, 'going');
            }}
            style={{
              flex: 1,
              padding: '10px',
              background: currentRsvp === 'going' ? '#10B981' : 'transparent',
              color: currentRsvp === 'going' ? 'white' : '#10B981',
              border: `1.5px solid ${currentRsvp === 'going' ? '#10B981' : '#334155'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {currentRsvp === 'going' && '✓'} Going
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleRSVP(event.id, 'maybe');
            }}
            style={{
              flex: 1,
              padding: '10px',
              background: currentRsvp === 'maybe' ? '#F59E0B' : 'transparent',
              color: currentRsvp === 'maybe' ? 'white' : '#F59E0B',
              border: `1.5px solid ${currentRsvp === 'maybe' ? '#F59E0B' : '#334155'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {currentRsvp === 'maybe' && '✓'} Maybe
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleRSVP(event.id, 'not-going');
            }}
            style={{
              flex: 1,
              padding: '10px',
              background: currentRsvp === 'not-going' ? '#EF4444' : 'transparent',
              color: currentRsvp === 'not-going' ? 'white' : '#EF4444',
              border: `1.5px solid ${currentRsvp === 'not-going' ? '#EF4444' : '#334155'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {currentRsvp === 'not-going' && '✓'} Not Going
          </button>
        </div>

        {/* Secondary Actions */}
        <div style={{ 
          display: 'flex', 
          gap: '16px',
          fontSize: '13px',
          color: '#3B82F6',
          fontWeight: 500
        }}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              alert('Added to your calendar');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#3B82F6',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
              padding: 0
            }}
          >
            Add to Calendar →
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEvent(event);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#3B82F6',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
              padding: 0
            }}
          >
            Details →
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      {/* Sticky Header */}
      <div className="dashboard-header" style={{ 
        position: 'sticky', 
        top: 0, 
        background: 'var(--bg-primary)',
        zIndex: 10,
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="dashboard-greeting">
          <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Calendar</h1>
          <span className="school-name">Your command center for student life</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* View Switcher */}
          <div style={{ 
            display: 'flex',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '4px'
          }}>
            <button 
              onClick={() => setView('month')}
              style={{
                padding: '6px 14px',
                background: view === 'month' ? 'var(--accent-primary)' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: view === 'month' ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}>
              Month
            </button>
            <button 
              onClick={() => setView('week')}
              style={{
                padding: '6px 14px',
                background: view === 'week' ? 'var(--accent-primary)' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: view === 'week' ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}>
              Week
            </button>
            <button 
              onClick={() => setView('agenda')}
              style={{
                padding: '6px 14px',
                background: view === 'agenda' ? 'var(--accent-primary)' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: view === 'agenda' ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}>
              Agenda
            </button>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', flex: 1, minWidth: '200px', maxWidth: '300px' }}>
            <input 
              type="text" 
              placeholder="Search events..." 
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '14px'
              }}
            />
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '16px'
            }}>🔍</span>
          </div>

          {/* Filters Icon */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '8px 12px',
              background: showFilters ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: showFilters ? 'white' : 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
            ⚙️ Filters
          </button>
        </div>
      </div>

      <section>
        {/* Smart Filters Row */}
        <div style={{ marginBottom: '20px' }}>
          {/* Main Toggle */}
          <div style={{ 
            display: 'inline-flex',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '4px'
          }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '8px 20px',
                background: filter === 'all' ? 'var(--accent-primary)' : 'transparent',
                border: 'none',
                borderRadius: '20px',
                color: filter === 'all' ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
            >
              ◉ All Club Events
            </button>
            <button
              onClick={() => setFilter('my')}
              style={{
                padding: '8px 20px',
                background: filter === 'my' ? 'var(--accent-primary)' : 'transparent',
                border: 'none',
                borderRadius: '20px',
                color: filter === 'my' ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
            >
              ○ My RSVP'd Only
            </button>
          </div>

          {/* Advanced Filters (Collapsed by default) */}
          {showFilters && (
            <div style={{
              marginTop: '12px',
              padding: '16px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              alignItems: 'center',
              animation: 'fadeIn 0.2s ease'
            }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Filter by:
              </div>
              <select style={{
                padding: '6px 12px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontSize: '13px'
              }}>
                <option>All Clubs</option>
                <option>Tech Club</option>
                <option>Art Club</option>
                <option>Debate Team</option>
              </select>
              <select style={{
                padding: '6px 12px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontSize: '13px'
              }}>
                <option>All Types</option>
                <option>🔴 Mandatory</option>
                <option>🟣 Workshop</option>
                <option>🟢 Social</option>
                <option>🔵 Meeting</option>
                <option>🟠 Competition</option>
              </select>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontSize: '13px',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}>
                <input type="checkbox" />
                Mandatory only
              </label>
            </div>
          )}
        </div>

        {/* Calendar Sync Card */}
        {!calendarSynced && (
          <div style={{
            marginBottom: '24px',
            padding: '20px',
            background: 'var(--bg-secondary)',
            border: '1.5px solid var(--accent-primary)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h3 style={{ 
                margin: 0, 
                marginBottom: '6px',
                fontSize: '16px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                📲 Auto-Sync Calendar
              </h3>
              <p style={{ color: '#94A3B8', margin: 0, fontSize: '14px' }}>
                One-tap sync. All future events auto-update.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setCalendarSynced(true)}
                style={{
                  padding: '10px 20px',
                  background: 'var(--accent-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600
                }}>
                ✓ Google Connected
              </button>
              <button style={{
                padding: '10px 20px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}>
                🍎 Add Apple Calendar
              </button>
            </div>
          </div>
        )}

        {/* Synced Status Chip */}
        {calendarSynced && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid #10B981',
            borderRadius: '20px',
            marginBottom: '24px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#10B981'
          }}>
            ✓ Calendar Synced
          </div>
        )}


        {/* Event Timeline */}
        {view === 'agenda' && (() => {
          const grouped = groupEventsByDate(filteredEvents);
          return (
            <>
              {grouped.today.length > 0 && (
                <>
                  <h2 style={{ 
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: '#64748B',
                    marginBottom: '16px',
                    marginTop: '24px'
                  }}>
                    TODAY
                  </h2>
                  {grouped.today.map(event => <EventCard key={event.id} event={event} />)}
                </>
              )}
              
              {grouped.thisWeek.length > 0 && (
                <>
                  <h2 style={{ 
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: '#64748B',
                    marginBottom: '16px',
                    marginTop: grouped.today.length > 0 ? '32px' : '24px'
                  }}>
                    THIS WEEK
                  </h2>
                  {grouped.thisWeek.map(event => <EventCard key={event.id} event={event} />)}
                </>
              )}

              {grouped.today.length === 0 && grouped.thisWeek.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#64748B'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
                  <div style={{ fontSize: '16px', fontWeight: 600 }}>No events found</div>
                  <div style={{ fontSize: '14px', marginTop: '8px' }}>
                    {filter === 'my' ? 'Try changing your filter' : 'Check back later for updates'}
                  </div>
                </div>
              )}
            </>
          );
        })()}

        {view === 'month' && (
          <div className="post-card" style={{ maxWidth: 'none', textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
            <h3>Month View</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Calendar grid with dot indicators under dates.<br/>
              Tap dates to expand day drawer.
            </p>
          </div>
        )}

        {view === 'week' && (
          <div className="post-card" style={{ maxWidth: 'none', textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <h3>Week Timeline View</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Timeline layout like Google Calendar.<br/>
              Drag to block time. Automatic conflict warnings.
            </p>
          </div>
        )}
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setSelectedEvent(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              zIndex: 999,
              animation: 'fadeIn 0.2s ease'
            }}
          />

          {/* Modal */}
          <div 
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'var(--bg-secondary)',
              borderRadius: '20px 20px 0 0',
              padding: '28px',
              maxHeight: '85vh',
              overflowY: 'auto',
              zIndex: 1000,
              boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.4)',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <style>{`
              @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
            `}</style>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  color: eventTypes[selectedEvent.type].color,
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px'
                }}>
                  {eventTypes[selectedEvent.type].label} • {selectedEvent.club}
                </div>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700 }}>{selectedEvent.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  flexShrink: 0
                }}
              >
                ✕
              </button>
            </div>

            {/* Event Details */}
            <div style={{ 
              display: 'grid',
              gap: '12px',
              marginBottom: '24px',
              fontSize: '15px',
              color: 'var(--text-primary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>📅</span>
                <span>{selectedEvent.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>⏰</span>
                <span>{selectedEvent.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>📍</span>
                <span>{selectedEvent.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>👥</span>
                <span>{selectedEvent.attendees} attending</span>
              </div>
            </div>

            {/* Description */}
            <div style={{ 
              padding: '16px', 
              background: 'var(--bg-tertiary)', 
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <h4 style={{ margin: 0, marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Description</h4>
              <p style={{ margin: 0, color: '#94A3B8', lineHeight: 1.6, fontSize: '14px' }}>
                {selectedEvent.description}
              </p>
            </div>

            {/* Attachments */}
            {selectedEvent.attachments && selectedEvent.attachments.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Attachments</h4>
                {selectedEvent.attachments.map((file, idx) => (
                  <div key={idx} style={{
                    padding: '14px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: idx < selectedEvent.attachments.length - 1 ? '8px' : 0
                  }}>
                    <span style={{ fontSize: '24px' }}>📄</span>
                    <span style={{ flex: 1, fontSize: '14px' }}>{file}</span>
                    <button style={{
                      padding: '6px 14px',
                      background: 'var(--accent-primary)',
                      border: 'none',
                      borderRadius: '6px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 600
                    }}>
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Attendee List Preview */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Attendees ({selectedEvent.attendees})</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {[...Array(Math.min(5, selectedEvent.attendees))].map((_, i) => (
                  <div key={i} style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-green))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'white'
                  }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                {selectedEvent.attendees > 5 && (
                  <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 500 }}>
                    +{selectedEvent.attendees - 5} more
                  </div>
                )}
              </div>
            </div>

            {/* Discussion Thread Teaser */}
            <div style={{ 
              padding: '16px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <h4 style={{ margin: 0, marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
                💬 Discussion (3)
              </h4>
              <div style={{ fontSize: '14px', color: '#94A3B8' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Sarah:</strong> Can't wait for this!
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Mike:</strong> Should we bring laptops?
                </div>
              </div>
              <button style={{
                marginTop: '12px',
                padding: '8px 14px',
                background: 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                width: '100%'
              }}>
                View all comments →
              </button>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                flex: 1,
                padding: '14px',
                background: 'var(--accent-primary)',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600
              }}>
                💬 Message Organizer
              </button>
              <button 
                onClick={() => alert('Attendance logged automatically when present')}
                style={{
                flex: 1,
                padding: '14px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600
              }}>
                ✓ Check In
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
