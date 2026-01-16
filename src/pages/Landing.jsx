import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  // Enable smooth scrolling for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  // Scroll to section if location.state.scrollTo is set
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      setTimeout(() => {
        document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.state]);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'Is Club-Connect free?',
      answer: 'Yes! Club-Connect is completely free for students. Schools can upgrade to premium features for advanced analytics.'
    },
    {
      question: 'How do I join a club?',
      answer: 'Simply browse clubs, click on one that interests you, and hit the "Join" button. You\'ll instantly get access to events and announcements.'
    },
    {
      question: 'Can I track my participation?',
      answer: 'Absolutely! Your profile shows all joined clubs, attended events, earned badges, and participation statistics.'
    },
    {
      question: 'Is my data secure?',
      answer: 'We prioritize privacy with encrypted data storage and compliance with educational privacy standards.'
    }
  ];

  const tourCloseRef = useRef(null);
  const [showTour, setShowTour] = useState(false);

  // Modal focus-trap and Esc-to-close
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setShowTour(false);
    }
    if (!showTour) return;

    const modal = document.querySelector('.modal');
    const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable = modal ? Array.from(modal.querySelectorAll(focusableSelector)) : [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function trapTab(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKey);
    document.addEventListener('keydown', trapTab);
    // autofocus first focusable
    setTimeout(() => { if (first) first.focus(); }, 0);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('keydown', trapTab);
    };
  }, [showTour]);

  

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="landing-navbar" role="banner">
        <div className="container" style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '56px'}}>
          <div className="logo" style={{fontSize: '1.3rem', fontWeight: 700}}>🏫 Club-Connect</div>
        </div>
      </header>

      <section className="hero" style={{paddingTop: '1.5rem', paddingBottom: '0.5rem'}}>
        <div className="container hero-inner" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'}}>
          <div className="hero-content" style={{width: '100%', maxWidth: 420, textAlign: 'center'}}>
            <h2 style={{fontSize: '1.3rem', fontWeight: 600, margin: '0 0 0.5rem 0', color: '#222'}}>The future of student clubs happens <em>together</em></h2>
            <p style={{fontSize: '1rem', color: '#444', margin: '0 0 1rem 0'}}>Student connection endures. Club-Connect brings students, clubs, and opportunities together in one simple platform.</p>
            <Link to="/app/register" className="btn primary" style={{width: '100%', fontSize: '1.1rem', marginBottom: 8}}>Sign up for ClubConnect</Link>
            <div style={{margin: '0.5rem 0 0.5rem 0'}}>
              <span style={{fontSize: '0.98rem', color: '#666'}}>Already have an account? </span>
              <Link to="/app/login" style={{fontSize: '0.98rem', color: '#6EB5FF', textDecoration: 'underline'}}>Sign in</Link>
            </div>
            <div style={{marginBottom: 8}}>
              <button className="btn-link" style={{background: 'none', border: 'none', color: '#7ED957', fontSize: '0.98rem', textDecoration: 'underline', cursor: 'pointer', padding: 0}} onClick={() => setShowTour(true)} aria-haspopup="dialog">Take a quick tour</button>
            </div>
          </div>
          {/* App-style preview: Upcoming events */}
          <div className="app-preview" style={{width: '100%', maxWidth: 420, background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(110,181,255,0.08)', margin: '0.5rem 0 0 0', padding: '1rem 1.2rem'}}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: 8}}>
              <span style={{fontSize: '1.1rem', fontWeight: 600, color: '#6EB5FF', marginRight: 8}}>Upcoming events</span>
              <span style={{fontSize: '1.2rem'}}>📅</span>
            </div>
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
              <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F0F4F8'}}>
                <span style={{fontWeight: 500}}>Art Club Meeting</span>
                <span style={{fontSize: '0.95rem', color: '#888'}}>Today 3:30pm</span>
              </li>
              <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0'}}>
                <span style={{fontWeight: 500}}>Robotics Kickoff</span>
                <span style={{fontSize: '0.95rem', color: '#888'}}>Tomorrow 4:00pm</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <main id="main">
      <section id="features" className="section features" aria-labelledby="features-heading" style={{paddingTop: '1.2rem'}}>
        <div className="container" style={{maxWidth: 420, margin: '0 auto'}}>
          <div className="feature-card app-feature-card" style={{display: 'flex', alignItems: 'center', gap: 12, padding: '0.8rem 1rem', borderRadius: 12, boxShadow: '0 1px 6px rgba(110,181,255,0.07)', marginBottom: 12, cursor: 'pointer', border: '1.5px solid #F0F4F8'}}>
            <span style={{fontSize: '1.5rem', marginRight: 8}}>🧑‍🤝‍🧑</span>
            <div style={{flex: 1}}>
              <div style={{fontWeight: 600, fontSize: '1.08rem'}}>Discover & Join Clubs <span style={{fontSize: '1.1rem', color: '#6EB5FF'}}>→</span></div>
              <div style={{fontSize: '0.97rem', color: '#666', marginTop: 2}}>Browse all clubs, join instantly, and get access to exclusive content.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="section testimonials">
        <div className="container">
          <h2>Trusted by students and schools nationwide</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Club-Connect made it so easy to find and join clubs. I discovered my passion for art and became club president!"</p>
              <p><strong>Sarah Johnson</strong><br/>Art Club President, University of Example</p>
            </div>
            <div className="testimonial-card">
              <p>"The event tracking saved me hours. I never miss meetings anymore and my grades improved from better time management."</p>
              <p><strong>Mike Chen</strong><br/>Sports Enthusiast, State College</p>
            </div>
            <div className="testimonial-card">
              <p>"As a club leader, managing announcements and tracking attendance is now effortless. Highly recommend!"</p>
              <p><strong>Emily Rodriguez</strong><br/>Tech Club Leader, Tech University</p>
            </div>
          </div>
          <div className="stats">
            <div className="stat">
              <h3>50+</h3>
              <p>Schools using Club-Connect</p>
            </div>
            <div className="stat">
              <h3>1000+</h3>
              <p>Active students</p>
            </div>
            <div className="stat">
              <h3>25%</h3>
              <p>Increase in club participation</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq" aria-labelledby="faq-heading">
        <div className="container">
          <h2 id="faq-heading">Frequently asked questions</h2>
          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  id={`faq-${index}-btn`}
                  className={`faq-question ${openFaq === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-${index}-panel`}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                <div id={`faq-${index}-panel`} className={`faq-answer ${openFaq === index ? 'open' : ''}`} role="region" aria-labelledby={`faq-${index}-btn`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta">
        <div className="container">
          <h2>Ready to build your college experience?</h2>
          <p>Join thousands of students already using Club-Connect to discover opportunities and stay connected.</p>
          <Link to="/app/register" className="btn primary large">Get started for free</Link>
        </div>
      </section>

      </main>
      <footer className="footer">
        <div className="container">
          <nav>
            <ul>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </nav>
          <p>&copy; 2025 Club-Connect</p>
        </div>
      </footer>
      {/* Removed duplicate header/navbar and skip-link */}
    </>
  );
};

export default Landing;