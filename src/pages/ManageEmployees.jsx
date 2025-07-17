import React, { useState } from 'react'

const ManageEmployees = () => {
  const [employees] = useState([
    {
      id: 1,
      name: 'Mike Davis',
      email: 'mike.davis@acdrainwiz.com',
      phone: '(555) 111-2222',
      role: 'Technician',
      status: 'active',
      hireDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Lisa Chen',
      email: 'lisa.chen@acdrainwiz.com',
      phone: '(555) 222-3333',
      role: 'Technician',
      status: 'active',
      hireDate: '2023-03-20'
    },
    {
      id: 3,
      name: 'Tom Wilson',
      email: 'tom.wilson@acdrainwiz.com',
      phone: '(555) 333-4444',
      role: 'Manager',
      status: 'active',
      hireDate: '2022-11-10'
    }
  ])

  return (
    <div className="page">
      <div className="page-header">
        <h1>Manage Employees</h1>
        <button className="btn btn-primary">+ Add New Employee</button>
      </div>

      <div className="content-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Hire Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.role}</td>
                  <td>
                    <span className={`status-badge ${employee.status}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td>{employee.hireDate}</td>
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

export default ManageEmployees 