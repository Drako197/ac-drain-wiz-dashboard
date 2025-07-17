import React from 'react'
import './Toast.css'

const Toast = ({ toasts }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            <span className="toast-message">{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Toast 