import React, { useState, useEffect } from 'react';
import Toast from './Toast';
import StatusBarContainer from './StatusBarContainer';
import './Toast.css';

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Global function to add a new toast/notification
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random(); // Unique ID for each toast
    const newToast = {
      id,
      message,
      type,
      timestamp: Date.now(),
      index: toasts.length // Track position for staggered removal
    };
    
    setToasts(prev => [...prev, newToast]);
  };

  // Remove a specific toast by ID with staggered timing
  const removeToast = (id) => {
    setToasts(prev => {
      const toastIndex = prev.findIndex(toast => toast.id === id);
      if (toastIndex === -1) return prev;
      
      // Add staggered delay based on position (older toasts first)
      const delay = toastIndex * 200; // 200ms delay between each toast
      
      setTimeout(() => {
        setToasts(current => current.filter(toast => toast.id !== id));
      }, delay);
      
      return prev; // Don't remove immediately, let setTimeout handle it
    });
  };

  // Make addToast available globally
  useEffect(() => {
    window.showToastMessage = addToast;
    return () => {
      delete window.showToastMessage;
    };
  }, []);

  // On mobile, show status bar notifications instead of toasts
  if (isMobile) {
    return <StatusBarContainer />;
  }

  // On desktop, show regular toasts
  return (
    <div className="toast-container">
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          index={index}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer; 