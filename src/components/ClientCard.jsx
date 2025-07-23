import React from 'react';

const ClientCard = ({ client, onEdit, onView, onDelete, handleTooltipPosition, handleTooltipHide }) => {
  return (
    <div className="client-card">
      <div className="client-card-header">
        <div className="client-name">
          {client.firstName} {client.lastName}
        </div>
      </div>
      
      <div className="client-card-content">
        <div className="client-info-item">
          <span className="client-info-label">Email:</span>
          <span className="client-info-value">{client.email}</span>
        </div>
        
        <div className="client-info-item">
          <span className="client-info-label">Mobile:</span>
          <span className="client-info-value">{client.mobileNumber}</span>
        </div>
      </div>
      
      <div className="client-card-actions">
        <div 
          className="icon-wrapper" 
          title="Edit client"
          onMouseEnter={handleTooltipPosition}
          onMouseLeave={handleTooltipHide}
          onClick={() => onEdit(client)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon action">
            <path d="M2.39662 15.0964C2.43491 14.7518 2.45405 14.5795 2.50618 14.4185C2.55243 14.2756 2.61778 14.1396 2.70045 14.0142C2.79363 13.8729 2.91621 13.7504 3.16136 13.5052L14.1666 2.49999C15.0871 1.57951 16.5795 1.57951 17.4999 2.49999C18.4204 3.42046 18.4204 4.91285 17.4999 5.83332L6.49469 16.8386C6.24954 17.0837 6.12696 17.2063 5.98566 17.2995C5.86029 17.3821 5.72433 17.4475 5.58146 17.4937C5.42042 17.5459 5.24813 17.565 4.90356 17.6033L2.08325 17.9167L2.39662 15.0964Z" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
        
        <div 
          className="icon-wrapper" 
          title="View address"
          onMouseEnter={handleTooltipPosition}
          onMouseLeave={handleTooltipHide}
          onClick={() => onView(client)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon action">
            <path d="M9.16675 9.16667H5.16675C4.23333 9.16667 3.76662 9.16667 3.4101 9.34832C3.09649 9.50811 2.84153 9.76308 2.68174 10.0767C2.50008 10.4332 2.50008 10.8999 2.50008 11.8333V17.5M17.5001 17.5V5.16667C17.5001 4.23325 17.5001 3.76654 17.3184 3.41002C17.1586 3.09641 16.9037 2.84144 16.5901 2.68166C16.2335 2.5 15.7668 2.5 14.8334 2.5H11.8334C10.9 2.5 10.4333 2.5 10.0768 2.68166C9.76316 2.84144 9.50819 3.09641 9.3484 3.41002C9.16675 3.76654 9.16675 4.23325 9.16675 5.16667V17.5M18.3334 17.5H1.66675M12.0834 5.83333H14.5834M12.0834 9.16667H14.5834M12.0834 12.5H14.5834" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
        
        <div 
          className="icon-wrapper" 
          title="Delete client"
          onMouseEnter={handleTooltipPosition}
          onMouseLeave={handleTooltipHide}
          onClick={() => onDelete(client)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon action">
            <path d="M13.3333 4.99999V4.33332C13.3333 3.3999 13.3333 2.93319 13.1517 2.57667C12.9919 2.26307 12.7369 2.0081 12.4233 1.84831C12.0668 1.66666 11.6001 1.66666 10.6667 1.66666H9.33333C8.39991 1.66666 7.9332 1.66666 7.57668 1.84831C7.26308 2.0081 7.00811 2.26307 6.84832 2.57667C6.66667 2.93319 6.66667 3.3999 6.66667 4.33332V4.99999M8.33333 9.58332V13.75M11.6667 9.58332V13.75M2.5 4.99999H17.5M15.8333 4.99999V14.3333C15.8333 15.7335 15.8333 16.4335 15.5608 16.9683C15.3212 17.4387 14.9387 17.8212 14.4683 18.0608C13.9335 18.3333 13.2335 18.3333 11.8333 18.3333H8.16667C6.76654 18.3333 6.06647 18.3333 5.53169 18.0608C5.06129 17.8212 4.67883 17.4387 4.43915 16.9683C4.16667 16.4335 4.16667 15.7335 4.16667 14.3333V4.99999" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ClientCard; 