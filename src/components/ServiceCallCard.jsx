import React from 'react'

const ServiceCallCard = ({ serviceCall, activeTab, onEdit, onView, onDelete }) => {
  return (
    <div className="service-call-card">
      <div className="service-call-card-header">
        <div className="service-call-address">{serviceCall.address}</div>
        {(activeTab === 'my-calls' || activeTab === 'history') && (
          <div className="service-call-priority">
            <span className={`priority-badge ${serviceCall.priority?.toLowerCase() || 'medium'}`}>
              {serviceCall.priority || 'Medium'}
            </span>
          </div>
        )}
      </div>
      
      <div className="service-call-card-content">
        {activeTab !== 'cancelled' && (
          <>
            <div className="service-call-info-item">
              <span className="service-call-info-label">Client Name:</span>
              <span className="service-call-info-value">{serviceCall.clientName}</span>
            </div>
            <div className="service-call-info-item">
              <span className="service-call-info-label">Contact Number:</span>
              <span className="service-call-info-value">{serviceCall.contactNumber}</span>
            </div>
          </>
        )}
        {(activeTab === 'required' || activeTab === 'my-calls' || activeTab === 'history') && (
          <div className="service-call-info-item">
            <span className="service-call-info-label">Assigned Sensor:</span>
            <span className="service-call-info-value">{serviceCall.assignedSensor}</span>
          </div>
        )}
      </div>
      
      <div className="service-call-card-actions">
        <div className="icon-wrapper" onClick={() => onView(serviceCall)} title="View Details">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon view">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="icon-wrapper" onClick={() => onEdit(serviceCall)} title="Edit Service Call">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon edit">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="icon-wrapper" onClick={() => onDelete(serviceCall)} title="Delete Service Call">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon delete">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ServiceCallCard 