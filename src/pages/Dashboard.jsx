import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ onShowOnboarding }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock data for demonstration
  const clientAddresses = [
    { id: 1, address: '123 Main Street, Miami Beach, Florida 33181', clientName: 'Steven Segal' },
    { id: 2, address: '456 Ocean Drive, Fort Lauderdale, Florida 33301', clientName: 'Martin Short' },
    { id: 3, address: '789 Palm Avenue, West Palm Beach, Florida 33401', clientName: 'Thomas Aguilar' },
    { id: 4, address: '1010 Sunset Boulevard, Miami, Florida 33133', clientName: 'Jake Smith' },
    { id: 5, address: '2020 Sunrise Boulevard, Fort Lauderdale, Florida 33304', clientName: 'Robert Black' },
    { id: 6, address: '3030 Coral Way, Coral Gables, Florida 33134', clientName: 'Mauricio Cicone' },
    { id: 7, address: '4040 Biscayne Boulevard, Miami, Florida 33137', clientName: 'Brad Agustini' },
    { id: 8, address: '5050 Collins Avenue, Miami Beach, Florida 33140', clientName: 'John Snow' },
    { id: 9, address: '6060 Lincoln Road, Miami Beach, Florida 33139', clientName: 'Michael Johnson' },
    { id: 10, address: '7070 Washington Avenue, Miami Beach, Florida 33139', clientName: 'David Wilson' },
  ];

  const filteredAddresses = clientAddresses.filter(item =>
    item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAddresses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAddresses = filteredAddresses.slice(startIndex, endIndex);

  const handleOnboardingClick = () => {
    if (onShowOnboarding) {
      onShowOnboarding();
    }
  };

  return (
    <>
      <nav className="breadcrumb-nav">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <span className="breadcrumb-current">Dashboard</span>
          </li>
        </ol>
      </nav>
      
      <div className="dashboard-header-section">
        <div className="dashboard-header">
          <div className="dashboard-welcome">
            <div>
              <h1>Welcome back, Diana! 🚀</h1>
              <p>Your current sensor display and activities - Updated!</p>
            </div>
            <div className="dashboard-contact">
              <div className="contact-card">
                <div className="contact-title" title="AC Drain Wiz">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="contact-logo">
                    <path d="M7.26232 8.72485C10.0934 7.34724 12.309 5.00949 13.581 2.08729C12.7604 1.21063 11.6936 0.58444 10.5447 0.208729L9.92928 0C9.88825 0.0834914 9.84722 0.208734 9.84722 0.292225C8.8625 3.13093 6.85203 5.42695 4.14404 6.72106C2.25666 7.63947 0.861632 9.3093 0.20515 11.3131L0 11.9393C0.0820602 11.981 0.205152 12.0228 0.287212 12.0228C1.06678 12.315 1.84636 12.6907 2.5849 13.1499C3.61065 11.2713 5.25185 9.68501 7.26232 8.72485Z" fill="#087443"></path>
                    <path d="M19.1611 8.89185C17.643 11.2296 15.5504 13.1082 12.9655 14.3605C10.873 15.3624 9.27282 17.241 8.53428 19.4953L8.32913 20.2049C9.1087 20.9146 10.0524 21.4573 11.0781 21.7913L11.6936 22C11.7346 21.9165 11.7757 21.7913 11.7757 21.7078C12.7604 18.8691 14.7709 16.5731 17.4788 15.2789C19.3662 14.3605 20.8023 12.6907 21.4177 10.6869L21.6229 10.0607C20.7612 9.81026 19.9406 9.39279 19.1611 8.89185Z" fill="#16B364"></path>
                    <path d="M6.68793 18.0341C7.71368 15.5294 9.60106 13.4838 12.0218 12.3149C14.2375 11.2295 16.0838 9.55971 17.3557 7.51417C16.4121 6.59576 15.6325 5.55212 15.0581 4.29974C13.5399 7.13845 11.1602 9.43447 8.24707 10.8538C6.56484 11.647 5.21085 13.0246 4.39024 14.6944C5.29291 15.5711 6.03145 16.6565 6.60587 17.8671C6.60587 17.8671 6.6469 17.9506 6.68793 18.0341Z" fill="#099250"></path>
                  </svg>
                  AC Drain Wiz
                </div>
                <div className="contact-email">
                  <span className="contact-label">Email:</span> ariddle@acdrainwiz.com
                </div>
                <div className="contact-phone">
                  <span className="contact-label">Mobile Number:</span> (000) 000-0000
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-cards">
            <div className="dashboard-card attention">
              <div className="card-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-icon">
                  <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.54 21H20.46A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" fill="#8b5cf6" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 9V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="17" r="1" fill="white"/>
                </svg>
              </div>
              <div className="card-content">
                <div className="card-value">25</div>
                <div className="card-label">Attention Needed</div>
              </div>
            </div>
            <div className="dashboard-card active">
              <div className="card-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-icon">
                  <path d="M8 2V5M16 2V5M3.5 4H20.5C21.3284 4 22 4.67157 22 5.5V19.5C22 20.3284 21.3284 21 20.5 21H3.5C2.67157 21 2 20.3284 2 19.5V5.5C2 4.67157 2.67157 4 3.5 4Z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 9H22" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="card-content">
                <div className="card-value">456</div>
                <div className="card-label">Active Service Calls</div>
              </div>
            </div>
            <div className="dashboard-card clients">
              <div className="card-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-icon">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="card-content">
                <div className="card-value">1,243</div>
                <div className="card-label">Total # of Clients</div>
              </div>
            </div>
            <div className="dashboard-card sensors">
              <div className="card-icon-wrapper">
                <span className="material-symbols-outlined card-icon">sensors</span>
              </div>
              <div className="card-content">
                <div className="card-value">1,345</div>
                <div className="card-label">Total # of Sensors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-table-section">
        <div className="table-header">
          <h2>Client Addresses Managed</h2>
          <div className="search-wrapper">
            <div className="typeahead-wrapper">
              <input 
                className="search-input" 
                placeholder="Search Address" 
                aria-label="Search Address" 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Client Addresses</th>
                <th>Client Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAddresses.map((item) => (
                <tr key={item.id}>
                  <td>{item.address}</td>
                  <td>{item.clientName}</td>
                  <td>
                    <div className="icon-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon action">
                        <path d="M13.0261 6.3595C12.6961 6.02948 12.5311 5.86447 12.4693 5.6742C12.4149 5.50683 12.4149 5.32654 12.4693 5.15917C12.5311 4.9689 12.6961 4.80389 13.0261 4.47388L15.3914 2.10857C14.7638 1.82471 14.067 1.66669 13.3333 1.66669C10.5719 1.66669 8.33333 3.90526 8.33333 6.66669C8.33333 7.07589 8.38248 7.47361 8.47521 7.85426C8.57451 8.26189 8.62416 8.4657 8.61535 8.59446C8.60612 8.72926 8.58602 8.80098 8.52386 8.92095C8.46448 9.03554 8.35071 9.14931 8.12318 9.37684L2.91666 14.5834C2.22631 15.2737 2.22631 16.393 2.91666 17.0834C3.60702 17.7737 4.72631 17.7737 5.41666 17.0834L10.6232 11.8768C10.8507 11.6493 10.9645 11.5355 11.0791 11.4762C11.199 11.414 11.2708 11.3939 11.4056 11.3847C11.5343 11.3759 11.7381 11.4255 12.1458 11.5248C12.5264 11.6175 12.9241 11.6667 13.3333 11.6667C16.0948 11.6667 18.3333 9.42811 18.3333 6.66669C18.3333 5.93301 18.1753 5.23625 17.8914 4.60857L15.5261 6.97388C15.1961 7.30389 15.0311 7.4689 14.8408 7.53072C14.6735 7.5851 14.4932 7.5851 14.3258 7.53072C14.1355 7.4689 13.9705 7.30389 13.6405 6.97388L13.0261 6.3595Z" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredAddresses.length)} of {filteredAddresses.length} results
          </div>
          <div className="pagination">
            <button 
              className="pagination-btn" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ← Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="pagination-btn" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard; 