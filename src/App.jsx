import React, { useState } from 'react'
import './App.css'
import './styles.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import ManageClients from './pages/ManageClients'
import ManageEmployees from './pages/ManageEmployees'
import ManageServiceCalls from './pages/ManageServiceCalls'
import OnboardingModal from './components/OnboardingModal'
import Toast from './components/Toast'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 3000)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'manage-clients':
        return <ManageClients />
      case 'manage-employees':
        return <ManageEmployees />
      case 'manage-service-calls':
        return <ManageServiceCalls />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        onShowOnboarding={() => setShowOnboarding(true)}
      />
      <main className="main-content">
        {renderPage()}
      </main>
      
      {showOnboarding && (
        <OnboardingModal 
          onClose={() => setShowOnboarding(false)}
          onComplete={() => {
            setShowOnboarding(false)
            addToast('Onboarding completed successfully!', 'success')
          }}
        />
      )}
      
      <Toast toasts={toasts} />
    </div>
  )
}

export default App 