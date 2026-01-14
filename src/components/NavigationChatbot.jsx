import React, { useState } from 'react';
import './NavigationChatbot.css';
import { useNavigate } from 'react-router-dom';

const cannedReplies = {
  'help': 'I can help you navigate: try "go to calendar", "my clubs", or "attendance".',
  'calendar': 'Opening your Calendar...',
  'clubs': 'Taking you to Clubs...',
  'attendance': 'Opening Attendance (QR Check-in)...'
};

export default function NavigationChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim().toLowerCase();
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    setInput('');

    // Simple intent parsing
    if (text.includes('calendar')) {
      setMessages(prev => [...prev, { from: 'bot', text: cannedReplies.calendar }]);
      setTimeout(() => navigate('/app/calendar'), 400);
    } else if (text.includes('club') || text.includes('clubs')) {
      setMessages(prev => [...prev, { from: 'bot', text: cannedReplies.clubs }]);
      setTimeout(() => navigate('/clubs'), 400);
    } else if (text.includes('attendance') || text.includes('qr')) {
      setMessages(prev => [...prev, { from: 'bot', text: cannedReplies.attendance }]);
      setTimeout(() => navigate('/app/qr-attendance'), 400);
    } else {
      setMessages(prev => [...prev, { from: 'bot', text: cannedReplies.help }]);
    }
  };

  return (
    <div className={"nav-chatbot " + (open ? 'open' : '')}>
      <button className="chat-toggle" onClick={() => setOpen(o => !o)} aria-label="Navigation assistant">
        🤖
      </button>

      {open && (
        <div className="chat-panel">
          <div className="chat-header">Navigation Assistant</div>
          <div className="chat-body">
            {messages.length === 0 && (
              <div className="chat-welcome">Ask me to navigate: e.g., "Go to calendar"</div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={"chat-msg " + (m.from === 'bot' ? 'bot' : 'user')}>{m.text}</div>
            ))}
          </div>
          <div className="chat-input">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="How can I help?" />
            <button onClick={send}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
