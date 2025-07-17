import React, { useState } from 'react'

const ManageServiceCalls = () => {
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

  return (
    <div className="page">
      <div className="page-header">
        <h1>Manage Service Calls</h1>
        <button className="btn btn-primary">+ New Service Call</button>
      </div>

      <div className="content-card">
        <div className="table-container">
          <table className="data-table">
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
                    <div className="action-buttons">
                      <button className="btn btn-sm btn-secondary">Edit</button>
                      <button className="btn btn-sm btn-primary">View</button>
                      <button className="btn btn-sm btn-danger">Delete</button>
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