import React, { useState } from 'react';
import './Home.css';

const Attendance = () => {
  const [view, setView] = useState('student');
  const [selectedClub, setSelectedClub] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  
  const clubs = [
    { 
      id: 1, 
      name: 'Tech Club', 
      icon: '💻', 
      attended: 12, 
      total: 15, 
      percentage: 80,
      trend: -3,
      status: 'at-risk',
      meetings: [
        { date: 'Jan 20', status: 'present' },
        { date: 'Jan 13', status: 'present' },
        { date: 'Jan 6', status: 'absent', excuse: 'Sick' },
        { date: 'Dec 16', status: 'present' }
      ],
      notes: 'Strong participation in workshops',
      hasBadge: false
    },
    { 
      id: 2, 
      name: 'Art Club', 
      icon: '🎨', 
      attended: 10, 
      total: 12, 
      percentage: 83,
      trend: 2,
      status: 'at-risk',
      meetings: [
        { date: 'Jan 22', status: 'present' },
        { date: 'Jan 15', status: 'present' },
        { date: 'Jan 8', status: 'absent', excuse: 'Family event' }
      ],
      notes: 'Consistent attendance',
      hasBadge: false
    },
    { 
      id: 3, 
      name: 'Debate Team', 
      icon: '🗣️', 
      attended: 8, 
      total: 10, 
      percentage: 80,
      trend: 5,
      status: 'at-risk',
      meetings: [
        { date: 'Jan 21', status: 'present' },
        { date: 'Jan 14', status: 'present' }
      ],
      notes: 'Great improvement recently',
      hasBadge: false
    },
    { 
      id: 4, 
      name: 'Science Olympiad', 
      icon: '🔬', 
      attended: 15, 
      total: 15, 
      percentage: 100,
      trend: 8,
      status: 'on-track',
      meetings: [
        { date: 'Jan 23', status: 'present' },
        { date: 'Jan 16', status: 'present' },
        { date: 'Jan 9', status: 'present' }
      ],
      notes: 'Perfect attendance!',
      hasBadge: true,
      badge: '🎖️ Perfect Attendance'
    }
  ];
  
  const students = [
    { id: 1, name: 'Sarah Johnson', status: 'present', club: 'Tech Club', attendance: 95, flag: false },
    { id: 2, name: 'Mike Chen', status: 'present', club: 'Tech Club', attendance: 88, flag: false },
    { id: 3, name: 'Alex Kim', status: 'absent', club: 'Tech Club', reason: 'Sick', attendance: 45, flag: true },
    { id: 4, name: 'Emma Wilson', status: 'present', club: 'Tech Club', attendance: 92, flag: false },
    { id: 5, name: 'David Lee', status: 'excused', club: 'Tech Club', reason: 'School event', attendance: 78, flag: false }
  ];

  const getStatusInfo = (status) => {
    switch(status) {
      case 'on-track':
        return { color: 'var(--accent-green)', bg: 'rgba(34, 197, 94, 0.15)', label: '🟢 On Track', goalText: 'above 85% goal' };
      case 'at-risk':
        return { color: 'var(--accent-yellow)', bg: 'rgba(250, 204, 21, 0.15)', label: '🟡 At Risk', goalText: 'below 85% goal' };
      case 'needs-attention':
        return { color: 'var(--accent-red)', bg: 'rgba(239, 68, 68, 0.15)', label: '🔴 Needs Attention', goalText: 'critical threshold' };
      default:
        return { color: 'var(--text-secondary)', bg: 'var(--bg-tertiary)', label: 'Unknown', goalText: '' };
    }
  };

  const ClubDrillDown = ({ club, onClose }) => (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '32px' }}>{club.icon}</span>
              <h2 style={{ margin: 0 }}>{club.name}</h2>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {club.percentage}% attendance
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}
          >
            ✕
          </button>
        </div>

        {/* Meeting History */}
        <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-secondary)' }}>Meeting History</h3>
        <div style={{ marginBottom: '24px' }}>
          {club.meetings.map((meeting, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                background: 'var(--bg-tertiary)',
                borderRadius: '8px',
                marginBottom: '8px',
                border: '1px solid var(--border-color)'
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {meeting.date}
                </div>
                {meeting.excuse && (
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Reason: {meeting.excuse}
                  </div>
                )}
              </div>
              <span style={{
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                background: meeting.status === 'present' 
                  ? 'rgba(34, 197, 94, 0.15)' 
                  : meeting.status === 'excused'
                  ? 'rgba(250, 204, 21, 0.15)'
                  : 'rgba(239, 68, 68, 0.15)',
                color: meeting.status === 'present' 
                  ? 'var(--accent-green)' 
                  : meeting.status === 'excused'
                  ? 'var(--accent-yellow)'
                  : 'var(--accent-red)'
              }}>
                {meeting.status === 'present' ? '✓ Present' : meeting.status === 'excused' ? '⚠ Excused' : '✗ Absent'}
              </span>
            </div>
          ))}
        </div>

        {/* Officer Notes */}
        <h3 style={{ fontSize: '16px', marginBottom: '12px', color: 'var(--text-secondary)' }}>Officer Notes</h3>
        <div style={{
          padding: '12px 16px',
          background: 'var(--bg-tertiary)',
          borderRadius: '8px',
          marginBottom: '24px',
          fontSize: '14px',
          color: 'var(--text-primary)',
          lineHeight: 1.6
        }}>
          {club.notes}
        </div>

        {/* Request Excused Absence */}
        <button 
          onClick={() => alert('Absence request submitted to club officers')}
          style={{
            width: '100%',
            padding: '14px',
            background: 'var(--accent-primary)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          📝 Request Excused Absence
        </button>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-greeting">
          <h1>Attendance</h1>
          <span className="school-name">Smart engagement dashboard</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setView('student')}
            style={{
              padding: '10px 20px',
              background: view === 'student' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: view === 'student' ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all var(--transition-base)'
            }}>
            Student View
          </button>
          <button 
            onClick={() => setView('officer')}
            style={{
              padding: '10px 20px',
              background: view === 'officer' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: view === 'officer' ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all var(--transition-base)'
            }}>
            Officer View
          </button>
        </div>
      </div>

      <section>
        {view === 'student' && (
          <>
            {/* Overall Attendance with Trends */}
            <div className="post-card" style={{ maxWidth: '800px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <h3>Overall Attendance</h3>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    85%
                  </div>
                  <div style={{ 
                    fontSize: '13px', 
                    color: 'var(--accent-green)', 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    ↑ 5% from last month
                  </div>
                </div>
              </div>
              <div style={{ 
                width: '100%', 
                height: '16px', 
                backgroundColor: 'var(--bg-tertiary)', 
                borderRadius: '8px',
                overflow: 'hidden',
                marginTop: '12px'
              }}>
                <div style={{
                  width: '85%',
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-green))',
                  borderRadius: '8px',
                  transition: 'width 1s ease-out'
                }}></div>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginTop: '12px', fontSize: '14px', margin: 0 }}>
                Attendance rate this semester
              </p>
            </div>

            {/* Incentives & Badges */}
            <div className="post-card" style={{ maxWidth: '800px', marginBottom: '24px', background: 'rgba(147, 51, 234, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '40px' }}>🎖️</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, marginBottom: '6px' }}>Attendance Achievements</h4>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Your participation score: <strong style={{ color: 'var(--text-primary)' }}>850 points</strong>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    • Science Olympiad: 🎖️ Perfect Attendance<br/>
                    • 2 more perfect months → unlock "Active Member" voting rights<br/>
                    • 90%+ attendance → eligible for leadership roles
                  </div>
                </div>
              </div>
            </div>

            <h2 className="section-title">Attendance by Club</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {clubs.map((club) => {
                const statusInfo = getStatusInfo(club.status);
                return (
                  <div 
                    key={club.id} 
                    className="post-card"
                    onClick={() => setSelectedClub(club)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{
                        fontSize: '32px',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {club.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: 0, fontSize: '16px', marginBottom: '4px' }}>{club.name}</h3>
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                          {club.attended} / {club.total} meetings
                        </div>
                      </div>
                      {club.hasBadge && (
                        <div style={{
                          fontSize: '24px'
                        }}>
                          🎖️
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div style={{ 
                      width: '100%', 
                      height: '10px', 
                      backgroundColor: 'var(--bg-tertiary)', 
                      borderRadius: '5px',
                      overflow: 'hidden',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        width: `${club.percentage}%`,
                        height: '100%',
                        background: club.percentage >= 85 
                          ? 'linear-gradient(90deg, var(--accent-green), #4ADE80)' 
                          : club.percentage >= 70
                          ? 'linear-gradient(90deg, var(--accent-yellow), #FCD34D)'
                          : 'linear-gradient(90deg, var(--accent-red), #FCA5A5)',
                        transition: 'width 0.8s ease-out'
                      }}></div>
                    </div>

                    {/* Status & Percentage */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {club.percentage}%
                      </div>
                      <div style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: statusInfo.bg,
                        color: statusInfo.color
                      }}>
                        {statusInfo.label}
                      </div>
                    </div>

                    {/* Trend & Context */}
                    <div style={{ 
                      fontSize: '13px', 
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      borderTop: '1px solid var(--border-color)'
                    }}>
                      <span>
                        {club.status !== 'on-track' && `${statusInfo.goalText}`}
                        {club.status === 'on-track' && 'Excellent participation!'}
                      </span>
                      <span style={{ 
                        color: club.trend > 0 ? 'var(--accent-green)' : 'var(--accent-red)',
                        fontWeight: 600
                      }}>
                        {club.trend > 0 ? '↑' : '↓'} {Math.abs(club.trend)}%
                      </span>
                    </div>

                    <div style={{ 
                      fontSize: '12px', 
                      color: 'var(--accent-primary)',
                      marginTop: '8px',
                      textAlign: 'center',
                      fontWeight: 500
                    }}>
                      Tap for details →
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {view === 'officer' && (
          <>
            {/* Officer Tools */}
            <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setShowQRCode(!showQRCode)}
                style={{
                  padding: '12px 20px',
                  background: 'var(--accent-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                📱 QR Code Check-In
              </button>
              <button 
                onClick={() => alert('Marking all as present...')}
                style={{
                  padding: '12px 20px',
                  background: 'var(--accent-green)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600
                }}>
                ✓ Bulk Mark Present
              </button>
              <button style={{
                padding: '12px 20px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}>
                📊 Export CSV
              </button>
              <button style={{
                padding: '12px 20px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}>
                📄 Export PDF
              </button>
            </div>

            {/* QR Code Display */}
            {showQRCode && (
              <div className="post-card" style={{ maxWidth: '400px', marginBottom: '24px', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '16px' }}>Meeting Check-In</h3>
                <div style={{
                  width: '200px',
                  height: '200px',
                  margin: '0 auto',
                  background: 'white',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '100px'
                }}>
                  📱
                </div>
                <p style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                  Students scan this code to check in
                </p>
              </div>
            )}

            {/* Student Table */}
            <div className="post-card" style={{ maxWidth: 'none' }}>
              <h3 style={{ marginBottom: '16px' }}>Tech Club - Today's Meeting</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                      <th style={{ textAlign: 'left', padding: '12px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>Student</th>
                      <th style={{ textAlign: 'left', padding: '12px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>Status</th>
                      <th style={{ textAlign: 'center', padding: '12px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>Overall</th>
                      <th style={{ textAlign: 'left', padding: '12px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>Notes</th>
                      <th style={{ textAlign: 'left', padding: '12px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{student.name}</span>
                            {student.flag && (
                              <span style={{ 
                                fontSize: '16px',
                                title: 'Chronic absence flagged'
                              }}>
                                🚩
                              </span>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: 600,
                            background: student.status === 'present' 
                              ? 'rgba(34, 197, 94, 0.15)' 
                              : student.status === 'excused'
                              ? 'rgba(250, 204, 21, 0.15)'
                              : 'rgba(239, 68, 68, 0.15)',
                            color: student.status === 'present' 
                              ? 'var(--accent-green)' 
                              : student.status === 'excused'
                              ? 'var(--accent-yellow)'
                              : 'var(--accent-red)'
                          }}>
                            {student.status === 'present' ? '✓ Present' : student.status === 'excused' ? '⚠ Excused' : '✗ Absent'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <div style={{ 
                            fontWeight: 600,
                            color: student.attendance >= 85 
                              ? 'var(--accent-green)' 
                              : student.attendance >= 70
                              ? 'var(--accent-yellow)'
                              : 'var(--accent-red)'
                          }}>
                            {student.attendance}%
                          </div>
                        </td>
                        <td style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                          {student.reason || '—'}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{
                              padding: '6px 12px',
                              background: 'var(--bg-tertiary)',
                              border: '1px solid var(--border-color)',
                              borderRadius: '6px',
                              color: 'var(--text-primary)',
                              cursor: 'pointer',
                              fontSize: '13px',
                              fontWeight: 500
                            }}>
                              Edit
                            </button>
                            {student.flag && (
                              <button 
                                onClick={() => alert(`Flagged ${student.name} for chronic absence`)}
                                style={{
                                  padding: '6px 12px',
                                  background: 'rgba(239, 68, 68, 0.15)',
                                  border: '1px solid var(--accent-red)',
                                  borderRadius: '6px',
                                  color: 'var(--accent-red)',
                                  cursor: 'pointer',
                                  fontSize: '13px',
                                  fontWeight: 600
                                }}>
                                🚩 Flagged
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Club Drill-Down Modal */}
      {selectedClub && (
        <ClubDrillDown 
          club={selectedClub} 
          onClose={() => setSelectedClub(null)} 
        />
      )}
    </div>
  );
};

export default Attendance;
