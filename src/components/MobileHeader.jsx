import React from 'react';
import { useNavigate } from 'react-router-dom';

const MobileHeader = ({ isMenuOpen, onToggleMenu, currentPage }) => {
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <header className="mobile-header">
      <div className="mobile-header-content">
        <div className="mobile-logo">
          <a 
            href="/" 
            onClick={handleLogoClick}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            <img alt="AC Drain Wiz Logo" className="logo-img" src="/images/acdrainwiz_logo.png" />
          </a>
        </div>
        
        <button 
          className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
          onClick={onToggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </header>
  );
};

export default MobileHeader; 