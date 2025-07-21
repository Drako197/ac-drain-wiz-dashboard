import React, { useState } from 'react'
import './ManageServiceCalls.css'

const ManageServiceCalls = () => {
  const [activeTab, setActiveTab] = useState('required')
  const [serviceCalls] = useState([
    {
      id: 1,
      address: '456 Ocean Drive, Fort Lauderdale, Florida 33301',
      clientName: 'Dennis Roberts',
      contactNumber: '(555) 104-3778',
      assignedSensor: 'Sensor #12346'
    },
    {
      id: 2,
      address: '789 Palm Avenue, West Palm Beach, Florida 33401',
      clientName: 'Jason Clark',
      contactNumber: '(555) 151-9853',
      assignedSensor: 'Sensor #12347'
    },
    {
      id: 3,
      address: '1010 Sunset Boulevard, Miami, Florida 33133',
      clientName: 'Mark Martinez',
      contactNumber: '(555) 630-7774',
      assignedSensor: 'Sensor #12348'
    },
    {
      id: 4,
      address: '5050 Collins Avenue, Miami Beach, Florida 33140',
      clientName: 'Matthew Garcia',
      contactNumber: '(555) 373-2216',
      assignedSensor: 'Sensor #12352'
    },
    {
      id: 5,
      address: '4444 20th Street, Miami Beach, Florida 33139',
      clientName: 'Roy Perez',
      contactNumber: '(555) 809-5172',
      assignedSensor: 'Sensor #12360'
    },
    {
      id: 6,
      address: '5555 25th Street, Miami Beach, Florida 33140',
      clientName: 'Jake Smith',
      contactNumber: '(555) 131-5135',
      assignedSensor: 'Sensor #12361'
    },
    {
      id: 7,
      address: '6666 30th Street, Miami Beach, Florida 33140',
      clientName: 'Joshua White',
      contactNumber: '(555) 954-6303',
      assignedSensor: 'Sensor #12362'
    },
    {
      id: 8,
      address: '7777 35th Street, Miami Beach, Florida 33140',
      clientName: 'Jake Smith',
      contactNumber: '(555) 904-5354',
      assignedSensor: 'Sensor #12363'
    },
    {
      id: 9,
      address: '123 Main Street, Miami Beach, Florida 33181',
      clientName: 'George Garcia',
      contactNumber: '(555) 306-8401',
      assignedSensor: 'Sensor #12365'
    },
    {
      id: 10,
      address: '3030 Coral Way, Coral Gables, Florida 33134',
      clientName: 'Nicholas Allen',
      contactNumber: '(555) 286-7511',
      assignedSensor: 'Sensor #12370'
    }
  ])

  const tabs = [
    { id: 'required', label: 'Service Call Required', count: 8, color: 'purple' },
    { id: 'my-calls', label: 'My Service Calls', count: 15, color: 'red' },
    { id: 'history', label: 'Service Call History', count: null, color: 'grey' },
    { id: 'cancelled', label: 'Cancelled Service Calls', count: null, color: 'grey' }
  ]

  return (
    <div className="page">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-nav">
        <ul className="breadcrumb-list">
          <li className="breadcrumb-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="breadcrumb-icon">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-current">›</span>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-current">Manage Service Calls</span>
          </li>
        </ul>
      </div>

      {/* Main Content Card */}
      <div className="dashboard-table-section">
        <h1>Manage Service Calls</h1>
        
        <div className="tabs-section">
          <div className="tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {tab.count && (
                  <span className="tab-count">{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="table-header">
          <h2>Addresses Requiring a Service Call</h2>
          <div className="search-wrapper">
            <div className="typeahead-wrapper">
              <input
                className="search-input"
                placeholder="Search Address"
                aria-label="Search Address"
                type="text"
                value=""
              />
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Address</th>
                <th>Client Name</th>
                <th>Contact Number</th>
                <th>
                  Assigned Sensor
                  <div className="info-icon-wrapper" style={{ position: 'relative', display: 'inline-block', marginLeft: '6px' }}>
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle' }}>
                      <path d="M6.56 6C6.71673 5.55445 7.0261 5.17874 7.4333 4.93942C7.8405 4.70011 8.31926 4.61263 8.78478 4.69248C9.2503 4.77233 9.67254 5.01435 9.97671 5.37569C10.2809 5.73702 10.4474 6.19435 10.4467 6.66667C10.4467 8 8.44666 8.66667 8.44666 8.66667M8.5 11.3333H8.50666M15.1667 8C15.1667 11.6819 12.1819 14.6667 8.5 14.6667C4.8181 14.6667 1.83333 11.6819 1.83333 8C1.83333 4.3181 4.8181 1.33334 8.5 1.33334C12.1819 1.33334 15.1667 4.3181 15.1667 8Z" stroke="#98A2B3" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {serviceCalls.map((call) => (
                <tr key={call.id}>
                  <td>{call.address}</td>
                  <td>{call.clientName}</td>
                  <td>{call.contactNumber}</td>
                  <td>{call.assignedSensor}</td>
                  <td>
                    <div className="icon-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon action">
                        <path d="M17.5 9.58334V7.33334C17.5 5.93321 17.5 5.23314 17.2275 4.69836C16.9878 4.22796 16.6054 3.84551 16.135 3.60582C15.6002 3.33334 14.9001 3.33334 13.5 3.33334H6.5C5.09987 3.33334 4.3998 3.33334 3.86502 3.60582C3.39462 3.84551 3.01217 4.22796 2.77248 4.69836C2.5 5.23314 2.5 5.93321 2.5 7.33334V14.3333C2.5 15.7335 2.5 16.4335 2.77248 16.9683C3.01217 17.4387 3.39462 17.8212 3.86502 18.0609C4.3998 18.3333 5.09987 18.3333 6.5 18.3333H10.4167M17.5 8.33334H2.5M13.3333 1.66667V5.00001M6.66667 1.66667V5.00001M15 17.5V12.5M12.5 15H17.5" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <div className="pagination-info">Showing 1 to 10 of 16 results</div>
          <div className="pagination">
            <button className="pagination-btn" disabled="">← Previous</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">Next →</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageServiceCalls 