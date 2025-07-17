import React from 'react'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Clients',
      value: '247',
      change: '+12%',
      positive: true
    },
    {
      title: 'Active Service Calls',
      value: '18',
      change: '-3%',
      positive: false
    },
    {
      title: 'Revenue This Month',
      value: '$45,230',
      change: '+8%',
      positive: true
    },
    {
      title: 'Team Members',
      value: '12',
      change: '+2',
      positive: true
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'service_call',
      message: 'New service call created for Johnson Residence',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'client',
      message: 'New client registered: Sarah Wilson',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'employee',
      message: 'Mike completed service call #1234',
      time: '6 hours ago'
    },
    {
      id: 4,
      type: 'payment',
      message: 'Payment received from Davis Family',
      time: '1 day ago'
    }
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome back!</h1>
          <p className="dashboard-subtitle">Here's what's happening with your business today.</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary">+ New Service Call</button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-title">{stat.title}</div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.positive ? '' : 'negative'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="content-grid">
          <div className="content-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'service_call' && '🔧'}
                    {activity.type === 'client' && '👤'}
                    {activity.type === 'employee' && '👷'}
                    {activity.type === 'payment' && '💰'}
                  </div>
                  <div className="activity-content">
                    <div className="activity-message">{activity.message}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="content-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-btn">
                <span>📞</span>
                Schedule Call
              </button>
              <button className="action-btn">
                <span>👤</span>
                Add Client
              </button>
              <button className="action-btn">
                <span>👷</span>
                Assign Employee
              </button>
              <button className="action-btn">
                <span>📊</span>
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 