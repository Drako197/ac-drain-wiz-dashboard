import React, { useState, useEffect } from 'react';
import Toast from './Toast';
import './Toast.css';

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  // Global function to add a new toast
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random(); // Unique ID for each toast
    const newToast = {
      id,
      message,
      type,
      timestamp: Date.now()
    };
    
    setToasts(prev => [...prev, newToast]);
  };

  // Remove a specific toast by ID
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Make addToast available globally
  useEffect(() => {
    window.showToastMessage = addToast;
    return () => {
      delete window.showToastMessage;
    };
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer; 