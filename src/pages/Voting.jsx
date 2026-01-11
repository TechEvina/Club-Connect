import React, { useState } from 'react';
import './Home.css';

const Voting = () => {
  const [view, setView] = useState('active');
  const [votedPolls, setVotedPolls] = useState({});
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  const activePolls = [
    { 
      id: 1, 
      title: 'Next Workshop Topic', 
      club: 'Tech Club', 
      type: 'topic',
      options: [
        { name: 'AI/ML', votes: 45 },
        { name: 'Web Dev', votes: 32 },
        { name: 'Mobile Apps', votes: 23 }
      ],
      total: 100, 
      endsIn: '2 days', 
      anonymous: true,
      rules: {
        whoCanVote: 'Tech Club members',
        resultsVisible: 'After poll ends',
        canChange: true
      },
      rewardPoints: 5
    },
    { 
      id: 2, 
      title: 'Vice President Election', 
      club: 'Debate Team', 
      type: 'election',
      options: [
        { 
          name: 'Sarah Johnson', 
          votes: 12,
          experience: '2 years in Debate',
          statement: 'I will bring fresh perspectives and organize weekly practice sessions to help us win regionals.',
          previousRole: 'Secretary'
        },
        { 
          name: 'Mike Chen', 
          votes: 8,
          experience: 'Competed in 8 tournaments',
          statement: 'My goal is to expand our team and create mentorship programs for new debaters.',
          previousRole: 'Team Captain'
        }
      ],
      total: 20, 
      endsIn: '5 days', 
      anonymous: false,
      rules: {
        whoCanVote: 'All Debate Team members',
        resultsVisible: 'Live',
        canChange: false
      },
      rewardPoints: 10
    }
  ];
  
  const completedPolls = [
    { 
      id: 3, 
      title: 'Meeting Time', 
      club: 'Art Club', 
      winner: 'Wednesdays 3 PM', 
      votes: 18, 
      total: 24, 
      completedDate: 'Jan 15' 
    }
  ];

  const handleVote = (pollId, optionIndex) => {
    if (votedPolls[pollId]) return; // Already voted
    
    setVotedPolls({...votedPolls, [pollId]: optionIndex});
    
    // Success animation and feedback
    setTimeout(() => {
      alert('Vote recorded! +5 participation points earned 🗳️');
    }, 300);
  };

  const CandidateProfile = ({ candidate, onClose }) => (
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
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
          <div>
            <h2 style={{ margin: 0, marginBottom: '8px' }}>{candidate.name}</h2>
            {candidate.previousRole && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                background: 'rgba(147, 51, 234, 0.15)',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#9333EA',
                fontWeight: 600
              }}>
                🏅 Previous {candidate.previousRole}
              </div>
            )}
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

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Experience
          </h4>
          <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {candidate.experience}
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Statement
          </h4>
          <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {candidate.statement}
          </p>
        </div>

        <button 
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
          onClick={onClose}
        >
          Close Profile
        </button>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-greeting">
          <h1>Voting & Polls</h1>
          <span className="school-name">Transparent, trustworthy voting for schools</span>
        </div>
      </div>

      <section>
        <div style={{ marginBottom: '24px', display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setView('active')}
            style={{
              padding: '10px 20px',
              background: view === 'active' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: view === 'active' ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all var(--transition-base)'
            }}>
            Active ({activePolls.length})
          </button>
          <button 
            onClick={() => setView('completed')}
            style={{
              padding: '10px 20px',
              background: view === 'completed' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: view === 'completed' ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all var(--transition-base)'
            }}>
            Completed
          </button>
        </div>

        {view === 'active' && activePolls.map((poll) => {
          const hasVoted = votedPolls[poll.id] !== undefined;
          const userVote = votedPolls[poll.id];
          
          return (
            <div key={poll.id} className="post-card" style={{ maxWidth: '800px', marginBottom: '16px' }}>
              {/* Poll Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, marginBottom: '8px' }}>{poll.title}</h3>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    {poll.club} • {poll.total} votes • Ends in {poll.endsIn}
                  </div>
                  
                  {/* Poll Rules */}
                  <div style={{ 
                    fontSize: '12px', 
                    color: 'var(--text-secondary)', 
                    padding: '8px 12px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    borderLeft: '3px solid var(--accent-primary)'
                  }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Rules:</strong> {poll.rules.whoCanVote} • 
                    Results {poll.rules.resultsVisible.toLowerCase()} • 
                    {poll.rules.canChange ? ' Votes can be changed' : ' Votes are final'}
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  {poll.anonymous && (
                    <div style={{
                      padding: '4px 10px',
                      background: 'rgba(59, 130, 246, 0.15)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: 'var(--accent-primary)',
                      fontWeight: 500,
                      whiteSpace: 'nowrap'
                    }}>
                      🔒 Anonymous
                    </div>
                  )}
                  {poll.rewardPoints && (
                    <div style={{
                      padding: '4px 10px',
                      background: 'rgba(34, 197, 94, 0.15)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: 'var(--accent-green)',
                      fontWeight: 500,
                      whiteSpace: 'nowrap'
                    }}>
                      +{poll.rewardPoints} points
                    </div>
                  )}
                </div>
              </div>

              {/* Options */}
              {poll.options.map((option, idx) => {
                const percentage = Math.round((option.votes / poll.total) * 100);
                const isUserVote = hasVoted && userVote === idx;
                
                return (
                  <div key={idx} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ 
                            fontSize: '15px', 
                            fontWeight: 600, 
                            color: isUserVote ? 'var(--accent-primary)' : 'var(--text-primary)' 
                          }}>
                            {option.name}
                          </span>
                          {isUserVote && (
                            <span style={{ fontSize: '14px', color: 'var(--accent-primary)' }}>✓</span>
                          )}
                          {poll.type === 'election' && option.previousRole && (
                            <span style={{
                              fontSize: '11px',
                              padding: '2px 6px',
                              background: 'rgba(147, 51, 234, 0.15)',
                              borderRadius: '4px',
                              color: '#9333EA',
                              fontWeight: 600
                            }}>
                              🏅 {option.previousRole}
                            </span>
                          )}
                        </div>
                        {poll.type === 'election' && (
                          <button 
                            onClick={() => setSelectedCandidate(option)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--accent-primary)',
                              fontSize: '12px',
                              cursor: 'pointer',
                              padding: '4px 0',
                              textDecoration: 'underline'
                            }}
                          >
                            View profile →
                          </button>
                        )}
                      </div>
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        {option.votes} votes • {percentage}%
                      </span>
                    </div>

                    {/* Visual Progress Bar */}
                    <div 
                      onClick={() => !hasVoted && handleVote(poll.id, idx)}
                      style={{
                        width: '100%',
                        height: '40px',
                        background: 'var(--bg-tertiary)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: hasVoted ? 'default' : 'pointer',
                        border: isUserVote ? '2px solid var(--accent-primary)' : '2px solid var(--border-color)',
                        transition: 'all var(--transition-base)',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => !hasVoted && (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
                      onMouseLeave={(e) => !hasVoted && !isUserVote && (e.currentTarget.style.borderColor = 'var(--border-color)')}
                    >
                      <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: isUserVote 
                          ? 'linear-gradient(90deg, var(--accent-primary), var(--accent-green))'
                          : 'linear-gradient(90deg, rgba(59, 130, 246, 0.6), rgba(34, 197, 94, 0.6))',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '16px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 600,
                        transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        animation: hasVoted && isUserVote ? 'voteSuccess 0.5s ease-out' : 'none'
                      }}>
                        {!hasVoted && percentage > 15 && 'Click to vote'}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Vote Status / Button */}
              {hasVoted ? (
                <div style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  animation: 'fadeIn 0.3s ease-out'
                }}>
                  <span style={{ fontSize: '20px' }}>✓</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-green)' }}>
                      Vote recorded!
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      Earned +{poll.rewardPoints} participation points 🗳️ Active Member
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '13px',
                  color: 'var(--text-secondary)'
                }}>
                  Click on any option above to cast your vote
                </div>
              )}
            </div>
          );
        })}

        {view === 'completed' && completedPolls.map((poll) => (
          <div key={poll.id} className="post-card" style={{ maxWidth: '800px', marginBottom: '16px', opacity: 0.9 }}>
            <h3 style={{ margin: 0, marginBottom: '8px' }}>{poll.title}</h3>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              {poll.club} • Completed {poll.completedDate}
            </div>
            <div style={{
              padding: '16px',
              background: 'rgba(34, 197, 94, 0.15)',
              borderRadius: '8px',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Winner</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--accent-green)' }}>{poll.winner}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                {poll.votes} out of {poll.total} votes ({Math.round((poll.votes / poll.total) * 100)}%)
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Candidate Profile Modal */}
      {selectedCandidate && (
        <CandidateProfile 
          candidate={selectedCandidate} 
          onClose={() => setSelectedCandidate(null)} 
        />
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes voteSuccess {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1.05); }
          100% { transform: scaleX(1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Voting;
