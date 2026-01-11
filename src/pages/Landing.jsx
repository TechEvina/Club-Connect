import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import './Landing.css';

const Landing = () => {
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

  return (
    <div>
      <header className="landing-navbar">
        <div className="container">
          <div className="logo">🏫 Club-Connect</div>
          <nav>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><Link to="/app/login">Sign in</Link></li>
              <li><Link to="/app/register" className="btn">Sign up</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
          <div className="hero-content" style={{ flex: 1 }}>
            <h1>The future of student clubs happens together</h1>
            <p>Tools and trends evolve, but student connection endures. With ClubConnect, students, clubs, and opportunities come together on one platform.</p>
            <div className="hero-actions">
              <Link to="/app/register" className="btn primary">Sign up for ClubConnect</Link>
              <Link to="/app/login" className="btn outline">Sign in</Link>
            </div>
          </div>
          <div style={{ flex: 1, height: '500px', minWidth: '400px' }}>
            <Spline scene="https://prod.spline.design/Ty6CtMGHCy6f4dm3/scene.splinecode" />
          </div>
        </div>
      </section>

      <section id="features" className="section features">
        <div className="container">
          <h2>Accelerate your student experience</h2>
          <p>From joining your first club to leading events, Club-Connect provides tools to help you get involved and stay connected.</p>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🧑‍🤝‍🧑 Discover & Join Clubs</h3>
              <p>Browse all available clubs with detailed descriptions, meeting times, and leadership info. Join instantly and get access to exclusive content.</p>
              <Link to="/app/clubs" className="feature-link">Explore clubs →</Link>
            </div>
            <div className="feature-card">
              <h3>📅 Track Events & Meetings</h3>
              <p>Never miss a meeting again. View upcoming events, set reminders, and mark attendance directly from your dashboard.</p>
              <Link to="/app" className="feature-link">View events →</Link>
            </div>
            <div className="feature-card">
              <h3>📊 Monitor Participation</h3>
              <p>Track your involvement across clubs. See attendance history, earned badges, and participation stats in one place.</p>
              <Link to="/app/profile" className="feature-link">View profile →</Link>
            </div>
            <div className="feature-card">
              <h3>📢 Stay Updated</h3>
              <p>Receive real-time announcements from club leaders. No more missed messages or scattered information.</p>
              <Link to="/app/notifications" className="feature-link">Check notifications →</Link>
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

      <section className="section faq">
        <div className="container">
          <h2>Frequently asked questions</h2>
          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${openFaq === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                <div className={`faq-answer ${openFaq === index ? 'open' : ''}`}>
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
    </div>
  );
};

export default Landing;