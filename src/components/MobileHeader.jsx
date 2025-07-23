import React from 'react';

const MobileHeader = ({ isMenuOpen, onToggleMenu, currentPage }) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case '/':
      case '/dashboard':
        return 'Dashboard';
      case '/manage-service-calls':
        return 'Service Calls';
      case '/manage-clients':
        return 'Clients';
      case '/manage-employees':
        return 'Employees';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="mobile-header">
      <div className="mobile-header-content">
        <button 
          className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
          onClick={onToggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        
        <div className="mobile-page-title">
          <h1>{getPageTitle()}</h1>
        </div>
        
        <div className="mobile-header-spacer"></div>
      </div>
    </header>
  );
};

export default MobileHeader; 