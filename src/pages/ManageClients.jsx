import React, { useState } from 'react'

const ManageClients = () => {
  const [clients] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, USA',
      status: 'active',
      lastService: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '(555) 234-5678',
      address: '456 Oak Ave, Somewhere, USA',
      status: 'active',
      lastService: '2024-01-10'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '(555) 345-6789',
      address: '789 Pine Rd, Elsewhere, USA',
      status: 'inactive',
      lastService: '2023-12-20'
    }
  ])

  return (
    <div className="page">
      <div className="page-header">
        <h1>Manage Clients</h1>
        <button className="btn btn-primary">+ Add New Client</button>
      </div>

      <div className="content-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Status</th>
                <th>Last Service</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.address}</td>
                  <td>
                    <span className={`status-badge ${client.status}`}>
                      {client.status}
                    </span>
                  </td>
                  <td>{client.lastService}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-sm btn-secondary">Edit</button>
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

export default ManageClients 