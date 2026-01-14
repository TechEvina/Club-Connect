import React, { useState, useEffect } from 'react';
import './AccessibilityChatbot.css';

const OPTIONS = [
  { id: 'highContrast', label: 'High contrast' },
  { id: 'largeText', label: 'Larger text' },
  { id: 'dyslexicFont', label: 'Dyslexic-friendly font' },
  { id: 'focusOutline', label: 'Persistent focus outlines' }
];

export default function AccessibilityChatbot(){
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('a11y_settings') || '{}'); } catch(e){ return {}; }
  });

  useEffect(() => {
    applySettings();
    try { localStorage.setItem('a11y_settings', JSON.stringify(settings)); } catch(e){}
  }, [settings]);

  const toggle = (id) => {
    setSettings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const applySettings = () => {
    const root = document.documentElement;
    if (settings.highContrast) root.classList.add('a11y-high-contrast'); else root.classList.remove('a11y-high-contrast');
    if (settings.largeText) root.classList.add('a11y-large-text'); else root.classList.remove('a11y-large-text');
    if (settings.dyslexicFont) root.classList.add('a11y-dyslexic'); else root.classList.remove('a11y-dyslexic');
    if (settings.focusOutline) root.classList.add('a11y-focus-outline'); else root.classList.remove('a11y-focus-outline');
  };

  return (
    <div className={"a11y-chatbot " + (open ? 'open' : '')}>
      <button className="a11y-toggle" onClick={() => setOpen(o => !o)} aria-label="Accessibility assistant">🦾</button>
      {open && (
        <div className="a11y-panel">
          <div className="a11y-header">Accessibility Assistant</div>
          <div className="a11y-body">
            <p style={{ marginTop: 0 }}>Toggle accessibility helpers for better reading and navigation.</p>
            {OPTIONS.map(opt => (
              <label key={opt.id} className="a11y-option">
                <input type="checkbox" checked={!!settings[opt.id]} onChange={() => toggle(opt.id)} />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
          <div className="a11y-footer">
            <button onClick={() => { setSettings({}); localStorage.removeItem('a11y_settings'); applySettings(); }} className="a11y-reset">Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}
