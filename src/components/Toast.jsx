import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ id, message, type = 'info', index = 0, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Stagger the auto-close timing based on index
    const baseDelay = 5000; // 5 seconds base
    const staggerDelay = index * 500; // 500ms additional delay per toast
    const totalDelay = baseDelay + staggerDelay;
    
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Delay the actual removal to allow animation to complete
      setTimeout(() => {
        onClose();
      }, 400);
    }, totalDelay);

    return () => clearTimeout(timer);
  }, [onClose, index]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const getToastIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 11L9.5 14L15.5 8M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#16B884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 8.33329H2.5M13.3333 1.66663V4.99996M6.66667 1.66663V4.99996M6.5 18.3333H13.5C14.9001 18.3333 15.6002 18.3333 16.135 18.0608C16.6054 17.8211 16.9878 17.4387 17.2275 16.9683C17.5 16.4335 17.5 15.7334 17.5 14.3333V7.33329C17.5 5.93316 17.5 5.2331 17.2275 4.69832C16.9878 4.22791 16.6054 3.84546 16.135 3.60578C15.6002 3.33329 14.9001 3.33329 13.5 3.33329H6.5C5.09987 3.33329 4.3998 3.33329 3.86502 3.60578C3.39462 3.84546 3.01217 4.22791 2.77248 4.69832C2.5 5.2331 2.5 5.93316 2.5 7.33329V14.3333C2.5 15.7334 2.5 16.4335 2.77248 16.9683C3.01217 17.4387 3.39462 17.8211 3.86502 18.0608C4.3998 18.3333 5.09987 18.3333 6.5 18.3333Z" stroke="#344054" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return 'ℹ️';
    }
  };

  const getToastClass = () => {
    return `toast toast-${type} ${isExiting ? 'toast-exit' : ''}`;
  };

  return (
    <div className={getToastClass()}>
      <div className="toast-content">
        <div className="toast-icon">
          {getToastIcon()}
        </div>
        <div className="toast-message">{message}</div>
        <button className="toast-close" onClick={handleClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast; 