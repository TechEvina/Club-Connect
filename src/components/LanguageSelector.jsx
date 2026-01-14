import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { languages } from '../data/onboardingData.js';

export default function LanguageSelector(){
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
      {languages.map(lang => (
        <div key={lang.code}
          onClick={() => setLanguage(lang.code)}
          style={{
            padding: '16px',
            background: language === lang.code ? 'rgba(59,130,246,0.15)' : 'var(--bg-tertiary)',
            border: language === lang.code ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all var(--transition-base)'
          }}
        >
          <div style={{ fontSize: 24 }}>{lang.flag}</div>
          <div style={{ marginTop: 8 }}>{lang.name}</div>
        </div>
      ))}
    </div>
  );
}
