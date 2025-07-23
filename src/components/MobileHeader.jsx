import React from 'react';

const MobileHeader = ({ isMenuOpen, onToggleMenu, currentPage }) => {
  return (
    <header className="mobile-header">
      <div className="mobile-header-content">
        <div className="mobile-logo">
          <img alt="AC Drain Wiz Logo" className="logo-img" src="/images/acdrainwiz_logo.png" />
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