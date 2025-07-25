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
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    // Reset session storage when manually triggered so onboarding can be completed again
    sessionStorage.removeItem('acdrainwiz_onboarding_completed');
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
      <div className={`dashboard-container ${showOnboarding ? 'onboarding-active' : ''}`}>
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
      />

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