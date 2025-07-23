import React, { useEffect, useState } from 'react';
import './StatusBarNotification.css';

const StatusBarNotification = ({ id, message, type = 'info', index = 0, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Shorter duration for mobile - 3-4 seconds
    const baseDelay = 3500; // 3.5 seconds base
    const staggerDelay = index * 200; // 200ms additional delay per notification
    const totalDelay = baseDelay + staggerDelay;
    
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Delay the actual removal to allow animation to complete
      setTimeout(() => {
        onClose();
      }, 300);
    }, totalDelay);

    return () => clearTimeout(timer);
  }, [onClose, index]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getNotificationIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 8L6.5 10L11.5 5M15 8C15 12.4183 12.4183 15 8 15C3.58172 15 1 12.4183 1 8C1 3.58172 3.58172 1 8 1C12.4183 1 15 3.58172 15 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'error':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM10.5 10.5L5.5 5.5M5.5 10.5L10.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'warning':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1L15 14H1L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="8" cy="11" r="0.5" fill="currentColor"/>
          </svg>
        );
      case 'info':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 5V8M8 11H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 5V8M8 11H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        );
    }
  };

  const getNotificationClass = () => {
    return `status-bar-notification status-bar-${type} ${isExiting ? 'status-bar-exit' : ''}`;
  };

  return (
    <div className={getNotificationClass()}>
      <div className="status-bar-content">
        <div className="status-bar-icon">
          {getNotificationIcon()}
        </div>
        <div className="status-bar-message">{message}</div>
        <button className="status-bar-close" onClick={handleClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StatusBarNotification; 