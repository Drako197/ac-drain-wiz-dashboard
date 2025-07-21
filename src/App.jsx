import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ManageClients from './pages/ManageClients';
import ManageEmployees from './pages/ManageEmployees';
import ManageServiceCalls from './pages/ManageServiceCalls';
import MyServiceCalls from './pages/MyServiceCalls';
import ServiceCallHistory from './pages/ServiceCallHistory';
import CancelledServiceCalls from './pages/CancelledServiceCalls';
import OnboardingModal from './components/OnboardingModal';
import Toast from './components/Toast';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [toast, setToast] = useState(null);

  // Check if user has completed onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('acdrainwiz_onboarding_completed');
    if (hasCompletedOnboarding === 'true') {
      setShowOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('acdrainwiz_onboarding_completed', 'true');
    showToastMessage('🎉 Welcome to AC Drain Wiz! Your setup is complete.');
  };

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('acdrainwiz_onboarding_completed', 'true');
  };

  const handleShowOnboarding = () => {
    setShowOnboarding(true);
  };

  const showToastMessage = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <div className="App">
        <div className="dashboard-container">
          <aside className="sidebar">
            <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
          </aside>
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard onShowOnboarding={handleShowOnboarding} />} />
              <Route path="/dashboard" element={<Dashboard onShowOnboarding={handleShowOnboarding} />} />
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
        />

        {/* Toast Notifications */}
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)}
          />
        )}

        {/* Onboarding Trigger Button */}
        <button 
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '12px 24px',
            background: 'rgb(59, 130, 246)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 999
          }}
          onClick={handleShowOnboarding}
        >
          Show Onboarding
        </button>
      </div>
    </Router>
  );
}

export default App; 