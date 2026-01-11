import React, { useState } from 'react';
import './Home.css';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(1);

  const chats = [
    { id: 1, name: 'Tech Club', type: 'group', unread: 3, lastMessage: 'Meeting at 3 PM', icon: '💻', members: 24 },
    { id: 2, name: 'Art Club', type: 'group', unread: 0, lastMessage: 'Great work today!', icon: '🎨', members: 18 },
    { id: 3, name: 'Sarah Johnson', type: 'direct', unread: 1, lastMessage: 'Can you help with...', icon: 'S', members: null },
    { id: 4, name: 'Debate Team', type: 'group', unread: 0, lastMessage: 'Practice tomorrow', icon: '🗣️', members: 15 }
  ];

  const chatMessages = {
    1: [
      { id: 1, sender: 'Sarah Johnson', text: 'Hey everyone! Don\'t forget about our workshop tomorrow.', time: '2:30 PM', avatar: 'S' },
      { id: 2, sender: 'You', text: 'Thanks for the reminder!', time: '2:35 PM', avatar: 'E', isMe: true },
      { id: 3, sender: 'Mike Chen', text: 'I\'ll be there 👍', time: '2:40 PM', avatar: 'M' }
    ],
    2: [
      { id: 1, sender: 'Lisa Park', text: 'The gallery setup looks amazing!', time: '1:15 PM', avatar: 'L' },
      { id: 2, sender: 'You', text: 'Great work everyone! 🎨', time: '1:20 PM', avatar: 'E', isMe: true },
      { id: 3, sender: 'Tom Williams', text: 'Can\'t wait for the showcase', time: '1:25 PM', avatar: 'T' }
    ],
    3: [
      { id: 1, sender: 'Sarah Johnson', text: 'Hey! Can you help with the project presentation?', time: '11:30 AM', avatar: 'S' },
      { id: 2, sender: 'You', text: 'Sure! What do you need?', time: '11:35 AM', avatar: 'E', isMe: true },
      { id: 3, sender: 'Sarah Johnson', text: 'I need help with the design slides', time: '11:40 AM', avatar: 'S' }
    ],
    4: [
      { id: 1, sender: 'Coach Anderson', text: 'Practice tomorrow at 4 PM sharp', time: '9:00 AM', avatar: 'C' },
      { id: 2, sender: 'You', text: 'I\'ll be there!', time: '9:15 AM', avatar: 'E', isMe: true },
      { id: 3, sender: 'Alex Kim', text: 'Ready for the tournament 💪', time: '9:20 AM', avatar: 'A' }
    ]
  };

  const currentChat = chats.find(chat => chat.id === activeChat);
  const messages = chatMessages[activeChat] || [];

  return (
    <div className="dashboard" style={{ padding: 0, maxWidth: 'none' }}>
      <div style={{ 
        display: 'flex', 
        height: 'calc(100vh - 64px)',
        width: '100%'
      }}>
        {/* Left Panel - Chat List */}
        <div style={{ 
          width: '320px',
          minWidth: '320px',
          background: 'var(--bg-secondary)', 
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-color)' }}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>Messages</h2>
            <input 
              type="text" 
              placeholder="Search conversations..." 
              style={{
                width: '100%',
                marginTop: '16px',
                padding: '10px 16px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '14px'
              }}
            />
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {chats.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  background: activeChat === chat.id ? 'var(--bg-tertiary)' : 'transparent',
                  transition: 'background var(--transition-base)'
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-green))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0
                  }}>
                    {chat.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '4px'
                    }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{chat.name}</div>
                      {chat.unread > 0 && (
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'var(--accent-primary)',
                          color: 'white',
                          fontSize: '11px',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {chat.unread}
                        </div>
                      )}
                    </div>
                    <div style={{ 
                      fontSize: '13px', 
                      color: 'var(--text-secondary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {chat.lastMessage}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Chat Thread */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div style={{ 
            padding: '20px 32px', 
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-green))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                {currentChat?.icon}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '16px' }}>{currentChat?.name}</div>
                {currentChat?.members && (
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{currentChat.members} members</div>
                )}
              </div>
            </div>
          </div>

          {/* Pinned Announcement */}
          <div style={{
            padding: '12px 32px',
            background: 'rgba(250, 204, 21, 0.1)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '20px' }}>📌</span>
            <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
              <strong>Announcement:</strong> Workshop this Friday at 3 PM - Room 201
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                style={{ 
                  display: 'flex', 
                  gap: '12px',
                  marginBottom: '20px',
                  flexDirection: msg.isMe ? 'row-reverse' : 'row'
                }}
              >
                {!msg.isMe && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-green))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'white',
                    flexShrink: 0
                  }}>
                    {msg.avatar}
                  </div>
                )}
                <div style={{ maxWidth: '60%' }}>
                  {!msg.isMe && (
                    <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: 'var(--text-primary)' }}>
                      {msg.sender}
                    </div>
                  )}
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: msg.isMe ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                    color: msg.isMe ? 'white' : 'var(--text-primary)',
                    fontSize: '14px',
                    lineHeight: 1.5
                  }}>
                    {msg.text}
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: 'var(--text-secondary)', 
                    marginTop: '4px',
                    textAlign: msg.isMe ? 'right' : 'left'
                  }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div style={{ 
            padding: '20px 32px', 
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)'
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button style={{
                padding: '10px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '18px'
              }}>📎</button>
              <input 
                type="text" 
                placeholder="Type a message..." 
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '14px'
                }}
              />
              <button style={{
                padding: '10px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '18px'
              }}>😊</button>
              <button style={{
                padding: '12px 24px',
                background: 'var(--accent-primary)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
