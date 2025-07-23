import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Always show onboarding first on refresh
  useEffect(() => {
    setShowOnboarding(true);
  }, []);

  const handleOnboardingComplete = (contractorName, contractorEmail, fullName) => {
    setShowOnboarding(false);
    setOnboardingCompleted(true);
    localStorage.setItem('acdrainwiz_onboarding_completed', 'true');
    if (contractorName && contractorName.trim()) {
      localStorage.setItem('acdrainwiz_contractor_name', contractorName.trim());
    }
    if (contractorEmail && contractorEmail.trim()) {
      localStorage.setItem('acdrainwiz_contractor_email', contractorEmail.trim());
    }
    if (fullName && fullName.trim()) {
      localStorage.setItem('acdrainwiz_full_name', fullName.trim());
    }
    if (window.showToastMessage) {
      window.showToastMessage('Your setup is complete, feel free to navigate the application to learn how to manage your clients, employees and service calls.', 'success');
    }
  };

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('acdrainwiz_onboarding_completed', 'true');
  };

  const handleShowOnboarding = () => {
    setShowOnboarding(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Router>
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
    </Router>
  );
}

export default App; 