import React, { useState } from 'react'
import './ManageServiceCalls.css'

const ManageServiceCalls = () => {
  const [activeTab, setActiveTab] = useState('required')
  const [serviceCalls] = useState([
    {
      id: 1,
      clientName: 'John Smith',
      address: '123 Main St, Anytown, USA',
      issue: 'Clogged drain',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'Mike Davis',
      scheduledDate: '2024-01-20'
    },
    {
      id: 2,
      clientName: 'Sarah Wilson',
      address: '456 Oak Ave, Somewhere, USA',
      issue: 'AC maintenance',
      priority: 'medium',
      status: 'scheduled',
      assignedTo: 'Lisa Chen',
      scheduledDate: '2024-01-22'
    },
    {
      id: 3,
      clientName: 'Mike Johnson',
      address: '789 Pine Rd, Elsewhere, USA',
      issue: 'Emergency repair',
      priority: 'urgent',
      status: 'completed',
      assignedTo: 'Tom Wilson',
      scheduledDate: '2024-01-18'
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
            <span className="breadcrumb-current">🏠</span>
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
      <div className="service-calls-card">
        {/* Page Title */}
        <h1 className="page-title">Manage Service Calls</h1>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-item ${activeTab === tab.id ? 'active' : ''} ${tab.color}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-label">{tab.label}</span>
              {tab.count && (
                <span className={`tab-badge ${tab.color}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Section Heading and Search */}
        <div className="section-header">
          <h2 className="section-title">Addresses Requiring a Service Call</h2>
          <div className="search-wrapper">
            <div className="typeahead-wrapper">
              <div className="search-input-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search Address"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Service Calls Table Section */}
        <div className="dashboard-table-section">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Address</th>
                <th>Issue</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Scheduled Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {serviceCalls.map((call) => (
                <tr key={call.id}>
                  <td>#{call.id}</td>
                  <td>{call.clientName}</td>
                  <td>{call.address}</td>
                  <td>{call.issue}</td>
                  <td>
                    <span className={`priority-badge ${call.priority}`}>
                      {call.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${call.status}`}>
                      {call.status}
                    </span>
                  </td>
                  <td>{call.assignedTo}</td>
                  <td>{call.scheduledDate}</td>
                  <td>
                    <div className="icon-wrapper">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon action">
                        <path d="M13.0261 6.3595C12.6961 6.02948 12.5311 5.86447 12.4693 5.6742C12.4149 5.50683 12.4149 5.32654 12.4693 5.15917C12.5311 4.9689 12.6961 4.80389 13.0261 4.47388L15.3914 2.10857C14.7638 1.82471 14.067 1.66669 13.3333 1.66669C10.5719 1.66669 8.33333 3.90526 8.33333 6.66669C8.33333 7.07589 8.38248 7.47361 8.47521 7.85426C8.57451 8.26189 8.62416 8.4657 8.61535 8.59446C8.60612 8.72926 8.58602 8.80098 8.52386 8.92095C8.46448 9.03554 8.35071 9.14931 8.12318 9.37684L2.91666 14.5834C2.22631 15.2737 2.22631 16.393 2.91666 17.0834C3.60702 17.7737 4.72631 17.7737 5.41666 17.0834L10.6232 11.8768C10.8507 11.6493 10.9645 11.5355 11.0791 11.4762C11.199 11.414 11.2708 11.3939 11.4056 11.3847C11.5343 11.3759 11.7381 11.4255 12.1458 11.5248C12.5264 11.6175 12.9241 11.6667 13.3333 11.6667C16.0948 11.6667 18.3333 9.42811 18.3333 6.66669C18.3333 5.93301 18.1753 5.23625 17.8914 4.60857L15.5261 6.97388C15.1961 7.30389 15.0311 7.4689 14.8408 7.53072C14.6735 7.5851 14.4932 7.5851 14.3258 7.53072C14.1355 7.4689 13.9705 7.30389 13.6405 6.97388L13.0261 6.3595Z" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageServiceCalls 