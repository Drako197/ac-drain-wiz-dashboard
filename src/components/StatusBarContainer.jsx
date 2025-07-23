import React, { useState, useEffect } from 'react';
import StatusBarNotification from './StatusBarNotification';
import './StatusBarNotification.css';

const StatusBarContainer = () => {
  const [notifications, setNotifications] = useState([]);

  // Global function to add a new status bar notification
  const addStatusBarNotification = (message, type = 'info') => {
    const id = Date.now() + Math.random(); // Unique ID for each notification
    const newNotification = {
      id,
      message,
      type,
      index: notifications.length // Track position for staggered removal
    };

    setNotifications(prev => [...prev, newNotification]);
  };

  // Remove a specific notification by ID with staggered timing
  const removeNotification = (id) => {
    setNotifications(prev => {
      const notificationIndex = prev.findIndex(notification => notification.id === id);
      if (notificationIndex === -1) return prev;

      // Add staggered delay based on position (older notifications first)
      const delay = notificationIndex * 100; // 100ms delay between each notification

      setTimeout(() => {
        setNotifications(current => current.filter(notification => notification.id !== id));
      }, delay);

      return prev;
    });
  };

  useEffect(() => {
    // Make addStatusBarNotification available globally using the same name as toast system
    window.showToastMessage = addStatusBarNotification;

    return () => {
      delete window.showToastMessage;
    };
  }, [notifications]);

  return (
    <div className="status-bar-container">
      {notifications.map((notification, index) => (
        <StatusBarNotification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          index={index}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export default StatusBarContainer; 