import React from 'react'
import './Sidebar.css'
import DashboardIcon from './DashboardIcon'
import ManageClientsIcon from './ManageClientsIcon'
import ManageEmployeesIcon from './ManageEmployeesIcon'
import ManageServiceCallsIcon from './ManageServiceCallsIcon'
import SettingsIcon from './SettingsIcon'
import SupportIcon from './SupportIcon'

const Sidebar = ({ currentPage, setCurrentPage, onShowOnboarding }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: DashboardIcon,
      active: currentPage === 'dashboard'
    },
    {
      id: 'manage-clients',
      label: 'Manage Clients',
      icon: ManageClientsIcon,
      active: currentPage === 'manage-clients'
    },
    {
      id: 'manage-employees',
      label: 'Manage Employees',
      icon: ManageEmployeesIcon,
      active: currentPage === 'manage-employees'
    },
    {
      id: 'manage-service-calls',
      label: 'Service Calls',
      icon: ManageServiceCallsIcon,
      active: currentPage === 'manage-service-calls'
    }
  ]

  const bottomMenuItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: SettingsIcon,
      active: false
    },
    {
      id: 'support',
      label: 'Support',
      icon: SupportIcon,
      active: false
    }
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src="/images/acdrainwiz_logo.png" alt="AC Drain Wiz" />
          <span>AC Drain Wiz</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${item.active ? 'active' : ''}`}
                onClick={() => setCurrentPage(item.id)}
              >
                <item.icon />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <ul className="nav-list">
          {bottomMenuItems.map((item) => (
            <li key={item.id}>
              <button className="nav-item">
                <item.icon />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        
        <button className="onboarding-button" onClick={onShowOnboarding}>
          🚀 Get Started
        </button>
      </div>
    </div>
  )
}

export default Sidebar 