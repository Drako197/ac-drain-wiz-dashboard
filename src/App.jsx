import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import MobileNavigation from './components/MobileNavigation';
import Dashboard from './pages/Dashboard';
import ManageClients from './pages/ManageClients';
import ManageEmployees from './pages/ManageEmployees';
import ManageServiceCalls from './pages/ManageServiceCalls';
import MyServiceCalls from './pages/MyServiceCalls';
import ServiceCallHistory from './pages/ServiceCallHistory';
import CancelledServiceCalls from './pages/CancelledServiceCalls';
import OnboardingModal from './components/OnboardingModal';
import ToastContainer from './components/ToastContainer';
import './components/OnboardingModal.css';
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPersuasiveModal, setShowPersuasiveModal] = useState(false);
  const navigate = useNavigate();

  // Check if onboarding is completed on mount
  useEffect(() => {
    const isCompleted = sessionStorage.getItem('acdrainwiz_onboarding_completed') === 'true';
    setOnboardingCompleted(isCompleted);
    
    if (!isCompleted) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = (contractorName, contractorEmail, fullName) => {
    setShowOnboarding(false);
    setOnboardingCompleted(true);
    sessionStorage.setItem('acdrainwiz_onboarding_completed', 'true');
    if (contractorName && contractorName.trim()) {
      localStorage.setItem('acdrainwiz_contractor_name', contractorName.trim());
    }
    if (contractorEmail && contractorEmail.trim()) {
      localStorage.setItem('acdrainwiz_contractor_email', contractorEmail.trim());
    }
    if (fullName && fullName.trim()) {
      localStorage.setItem('acdrainwiz_full_name', fullName.trim());
    }
    
    // Dispatch custom event to notify components
    window.dispatchEvent(new CustomEvent('onboardingCompleted'));
    
    // Navigate to dashboard page
    setCurrentPage('dashboard');
    navigate('/');
    
    if (window.showToastMessage) {
      window.showToastMessage('Your setup is complete, feel free to navigate the application to learn how to manage your clients, employees and service calls.', 'success');
    }
  };

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    setOnboardingCompleted(true);
    sessionStorage.setItem('acdrainwiz_onboarding_completed', 'true');
    
    // Navigate to dashboard page
    setCurrentPage('dashboard');
    navigate('/');
  };

  const handleShowOnboarding = () => {
    setShowOnboarding(true);
    setShowPersuasiveModal(false);
    // Reset session storage when manually triggered so onboarding can be completed again
    sessionStorage.removeItem('acdrainwiz_onboarding_completed');
  };

  const handleShowPersuasiveModal = () => {
    setShowPersuasiveModal(true);
    setShowOnboarding(false); // Hide onboarding modal when showing persuasive modal
  };

  const handlePersuasiveModalClose = () => {
    setShowPersuasiveModal(false);
    // Complete onboarding process
    handleOnboardingComplete('', '', '');
  };

  const handleNavigateToEmployees = () => {
    setShowPersuasiveModal(false);
    handleOnboardingComplete('', '', '');
    setTimeout(() => {
      navigate('/manage-employees');
    }, 200);
  };

  const handleNavigateToClients = () => {
    setShowPersuasiveModal(false);
    handleOnboardingComplete('', '', '');
    setTimeout(() => {
      navigate('/manage-clients');
    }, 200);
  };

  const handleNavigateToDashboard = () => {
    setShowPersuasiveModal(false);
    handleOnboardingComplete('', '', '');
    setTimeout(() => {
      navigate('/dashboard');
    }, 200);
  };

  const handlePageChange = (page) => {
    console.log('App handlePageChange called with:', page);
    setCurrentPage(page);
  };

  const handleMobileMenuToggle = () => {
    console.log('Mobile menu toggle clicked, current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="App">
      <div className={`dashboard-container ${showOnboarding && !showPersuasiveModal ? 'onboarding-active' : ''}`}>
        {/* Mobile Header */}
        <MobileHeader 
          isMenuOpen={isMobileMenuOpen}
          onToggleMenu={handleMobileMenuToggle}
          currentPage={currentPage}
        />
        
        {/* Desktop Sidebar */}
        <aside className="sidebar">
          <Sidebar currentPage={currentPage} onPageChange={handlePageChange} onboardingCompleted={onboardingCompleted} />
        </aside>
        
        {/* Mobile Navigation */}
        <MobileNavigation 
          isOpen={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
          onPageChange={handlePageChange}
          onboardingCompleted={onboardingCompleted}
        />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard onShowOnboarding={handleShowOnboarding} onboardingCompleted={onboardingCompleted} />} />
            <Route path="/dashboard" element={<Dashboard onShowOnboarding={handleShowOnboarding} onboardingCompleted={onboardingCompleted} />} />
            <Route path="/manage-clients" element={<ManageClients />} />
            <Route path="/manage-employees" element={<ManageEmployees />} />
            <Route path="/manage-service-calls" element={<ManageServiceCalls />} />
            <Route path="/my-service-calls" element={<MyServiceCalls />} />
            <Route path="/service-call-history" element={<ServiceCallHistory />} />
            <Route path="/cancelled-service-calls" element={<CancelledServiceCalls />} />
          </Routes>
        </main>
      </div>

      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
        onComplete={handleOnboardingComplete}
        onboardingCompleted={onboardingCompleted}
        onShowPersuasiveModal={handleShowPersuasiveModal}
        showPersuasiveModal={showPersuasiveModal}
        onPersuasiveModalClose={handlePersuasiveModalClose}
      />

      {/* Persuasive Modal */}
      {showPersuasiveModal && (
        <div className="persuasive-modal-overlay" onClick={handlePersuasiveModalClose}>
          <div className="persuasive-modal" onClick={(e) => e.stopPropagation()}>
            <div className="persuasive-modal-header">
              <h2>Welcome to Your Dashboard!</h2>
              <button 
                className="persuasive-modal-close"
                onClick={handlePersuasiveModalClose}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="persuasive-modal-content">
              <p className="persuasive-modal-description">
                You're all set up! Now you can start monitoring drain lines and help your customers save thousands in damage and repair costs.
              </p>
              
              <div className="persuasive-modal-actions">
                <div className="persuasive-modal-actions-row">
                  <div className="persuasive-action-card" onClick={handleNavigateToEmployees}>
                    <div className="persuasive-action-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM20 8v6M23 11h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3>Add Employees</h3>
                    <p>Invite team members to join your crew and assign service calls</p>
                    <button className="persuasive-action-btn" onClick={(e) => {
                      e.stopPropagation();
                      handleNavigateToEmployees();
                    }}>Add Employees</button>
                  </div>
                  
                  <div className="persuasive-action-card" onClick={handleNavigateToClients}>
                    <div className="persuasive-action-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 10h8M8 14h6M8 6h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3>Add Clients</h3>
                    <p>Import your customer database to start tracking service calls</p>
                    <button className="persuasive-action-btn" onClick={(e) => {
                      e.stopPropagation();
                      handleNavigateToClients();
                    }}>Add Clients</button>
                  </div>
                </div>
                
                <div className="persuasive-action-card persuasive-action-card-wide" onClick={handleNavigateToDashboard}>
                  <div className="persuasive-action-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12.55a11 11 0 0 1 14.08 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1.42 9a16 16 0 0 1 21.16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Install ACDW Sensors</h3>
                  <p>Set up smart monitoring to prevent costly drain issues</p>
                </div>
              </div>
              
              <div className="persuasive-modal-footer">
                <button 
                  className="btn-dismiss"
                  onClick={handlePersuasiveModalClose}
                >
                  I'll explore later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />

      {/* Onboarding Trigger Button */}
      <button 
        className={`onboarding-trigger-btn ${showOnboarding ? 'onboarding-active' : ''}`}
        onClick={handleShowOnboarding}
      >
        Show Onboarding
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App; 