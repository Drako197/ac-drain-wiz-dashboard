import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onClose]);

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
      default:
        return 'ℹ️';
    }
  };

  const getToastClass = () => {
    return `toast toast-${type}`;
  };

  return (
    <div className="toast-container">
      <div className={getToastClass()}>
        <div className="toast-content">
          <div className="toast-icon">
            {getToastIcon()}
          </div>
          <div className="toast-message">{message}</div>
          <button className="toast-close" onClick={onClose}>
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast; 