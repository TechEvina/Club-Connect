import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to scroll or navigate and scroll
  const handleNavScroll = (sectionId) => (e) => {
    e.preventDefault();
    // Support HashRouter and GitHub Pages base path
    const hashLanding = location.pathname === '/' || location.pathname === '/landing' || location.hash === '#/' || location.hash === '#/landing' || window.location.pathname.endsWith('/Club-Connect/') || window.location.hash === '#/';
    if (hashLanding) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    } else {
      // Pass scroll target in location state
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <nav className="navbar sidebar-navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/app">
            🏠<br/>Home
          </Link>
        </li>
        <li>
          <Link to="/clubs">
            🏫<br/>Clubs
          </Link>
        </li>
        <li>
          <a href="#features" onClick={handleNavScroll('features')}>
            🚀<br/>Features
          </a>
        </li>
        <li>
          <a href="#testimonials" onClick={handleNavScroll('testimonials')}>
            ⭐<br/>Testimonials
          </a>
        </li>
        <li>
          <Link to="/app/profile">
            👤<br/>Profile
          </Link>
        </li>
        <li>
          <Link to="/app/notifications">
            🔔<br/>Notifications
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;