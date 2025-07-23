import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination'

const ManageClients = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1)
  const [isLoading, setIsLoading] = useState(true)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const searchInputRef = useRef(null)
  const dropdownRef = useRef(null)

  // Updated mock data to match the table structure from the image
  const clients = [
    { id: 1, firstName: 'Steven', lastName: 'Segal', mobileNumber: '(595) 745-6954', email: 'steven.segal@email.com' },
    { id: 2, firstName: 'Martin', lastName: 'Short', mobileNumber: '(630) 443-3644', email: 'martin.short@email.com' },
    { id: 3, firstName: 'Thomas', lastName: 'Aguilar', mobileNumber: '(555) 123-4567', email: 'thomas.aguilar@email.com' },
    { id: 4, firstName: 'Jake', lastName: 'Smith', mobileNumber: '(555) 234-5678', email: 'jake.smith@email.com' },
    { id: 5, firstName: 'Robert', lastName: 'Black', mobileNumber: '(555) 345-6789', email: 'robert.black@email.com' },
    { id: 6, firstName: 'Mauricio', lastName: 'Cicone', mobileNumber: '(555) 456-7890', email: 'mauricio.cicone@email.com' },
    { id: 7, firstName: 'Brad', lastName: 'Agustini', mobileNumber: '(555) 567-8901', email: 'brad.agustini@email.com' },
    { id: 8, firstName: 'John', lastName: 'Snow', mobileNumber: '(555) 678-9012', email: 'john.snow@email.com' },
    { id: 9, firstName: 'Michael', lastName: 'Johnson', mobileNumber: '(555) 789-0123', email: 'michael.johnson@email.com' },
    { id: 10, firstName: 'David', lastName: 'Wilson', mobileNumber: '(555) 890-1234', email: 'david.wilson@email.com' },
    { id: 11, firstName: 'Sarah', lastName: 'Martinez', mobileNumber: '(555) 901-2345', email: 'sarah.martinez@email.com' },
    { id: 12, firstName: 'Carlos', lastName: 'Rodriguez', mobileNumber: '(555) 012-3456', email: 'carlos.rodriguez@email.com' },
    { id: 13, firstName: 'Maria', lastName: 'Garcia', mobileNumber: '(555) 123-4567', email: 'maria.garcia@email.com' },
    { id: 14, firstName: 'James', lastName: 'Brown', mobileNumber: '(555) 234-5678', email: 'james.brown@email.com' },
    { id: 15, firstName: 'Lisa', lastName: 'Anderson', mobileNumber: '(555) 345-6789', email: 'lisa.anderson@email.com' },
    { id: 16, firstName: 'Robert', lastName: 'Taylor', mobileNumber: '(555) 456-7890', email: 'robert.taylor@email.com' },
    { id: 17, firstName: 'Jennifer', lastName: 'Davis', mobileNumber: '(555) 567-8901', email: 'jennifer.davis@email.com' },
    { id: 18, firstName: 'Christopher', lastName: 'Wilson', mobileNumber: '(555) 678-9012', email: 'christopher.wilson@email.com' },
    { id: 19, firstName: 'Amanda', lastName: 'Thompson', mobileNumber: '(555) 789-0123', email: 'amanda.thompson@email.com' },
    { id: 20, firstName: 'Daniel', lastName: 'Moore', mobileNumber: '(555) 890-1234', email: 'daniel.moore@email.com' },
    { id: 21, firstName: 'Jessica', lastName: 'Lee', mobileNumber: '(555) 901-2345', email: 'jessica.lee@email.com' },
    { id: 22, firstName: 'Matthew', lastName: 'White', mobileNumber: '(555) 012-3456', email: 'matthew.white@email.com' },
    { id: 23, firstName: 'Nicole', lastName: 'Harris', mobileNumber: '(555) 123-4567', email: 'nicole.harris@email.com' },
    { id: 24, firstName: 'Andrew', lastName: 'Clark', mobileNumber: '(555) 234-5678', email: 'andrew.clark@email.com' },
    { id: 25, firstName: 'Stephanie', lastName: 'Lewis', mobileNumber: '(555) 345-6789', email: 'stephanie.lewis@email.com' },
    { id: 26, firstName: 'Kevin', lastName: 'Hall', mobileNumber: '(555) 456-7890', email: 'kevin.hall@email.com' },
    { id: 27, firstName: 'Rachel', lastName: 'Young', mobileNumber: '(555) 567-8901', email: 'rachel.young@email.com' },
    { id: 28, firstName: 'Brandon', lastName: 'King', mobileNumber: '(555) 678-9012', email: 'brandon.king@email.com' },
    { id: 29, firstName: 'Lauren', lastName: 'Scott', mobileNumber: '(555) 789-0123', email: 'lauren.scott@email.com' },
    { id: 30, firstName: 'Ryan', lastName: 'Green', mobileNumber: '(555) 890-1234', email: 'ryan.green@email.com' },
    { id: 31, firstName: 'Megan', lastName: 'Baker', mobileNumber: '(555) 901-2345', email: 'megan.baker@email.com' },
    { id: 32, firstName: 'Tyler', lastName: 'Adams', mobileNumber: '(555) 012-3456', email: 'tyler.adams@email.com' },
    { id: 33, firstName: 'Ashley', lastName: 'Nelson', mobileNumber: '(555) 123-4567', email: 'ashley.nelson@email.com' },
    { id: 34, firstName: 'Joshua', lastName: 'Carter', mobileNumber: '(555) 234-5678', email: 'joshua.carter@email.com' },
    { id: 35, firstName: 'Brittany', lastName: 'Mitchell', mobileNumber: '(555) 345-6789', email: 'brittany.mitchell@email.com' },
    { id: 36, firstName: 'Nathan', lastName: 'Perez', mobileNumber: '(555) 456-7890', email: 'nathan.perez@email.com' },
    { id: 37, firstName: 'Samantha', lastName: 'Roberts', mobileNumber: '(555) 567-8901', email: 'samantha.roberts@email.com' },
    { id: 38, firstName: 'Jonathan', lastName: 'Turner', mobileNumber: '(555) 678-9012', email: 'jonathan.turner@email.com' },
    { id: 39, firstName: 'Victoria', lastName: 'Phillips', mobileNumber: '(555) 789-0123', email: 'victoria.phillips@email.com' },
    { id: 40, firstName: 'Derek', lastName: 'Campbell', mobileNumber: '(555) 890-1234', email: 'derek.campbell@email.com' },
    { id: 41, firstName: 'Hannah', lastName: 'Parker', mobileNumber: '(555) 901-2345', email: 'hannah.parker@email.com' },
    { id: 42, firstName: 'Corey', lastName: 'Evans', mobileNumber: '(555) 012-3456', email: 'corey.evans@email.com' },
    { id: 43, firstName: 'Amber', lastName: 'Edwards', mobileNumber: '(555) 123-4567', email: 'amber.edwards@email.com' },
    { id: 44, firstName: 'Travis', lastName: 'Collins', mobileNumber: '(555) 234-5678', email: 'travis.collins@email.com' },
    { id: 45, firstName: 'Melissa', lastName: 'Stewart', mobileNumber: '(555) 345-6789', email: 'melissa.stewart@email.com' },
    { id: 46, firstName: 'Marcus', lastName: 'Morris', mobileNumber: '(555) 456-7890', email: 'marcus.morris@email.com' },
    { id: 47, firstName: 'Crystal', lastName: 'Rogers', mobileNumber: '(555) 567-8901', email: 'crystal.rogers@email.com' },
    { id: 48, firstName: 'Dustin', lastName: 'Reed', mobileNumber: '(555) 678-9012', email: 'dustin.reed@email.com' },
    { id: 49, firstName: 'Stacy', lastName: 'Cox', mobileNumber: '(555) 789-0123', email: 'stacy.cox@email.com' },
    { id: 50, firstName: 'Lance', lastName: 'Howard', mobileNumber: '(555) 890-1234', email: 'lance.howard@email.com' }
  ]

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter clients based on search term
  const filteredClients = clients.filter(client =>
    client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.mobileNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Generate suggestions for search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([])
      return
    }

    const filtered = clients.filter(client =>
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.mobileNumber.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5)

    setSuggestions(filtered)
  }, [searchTerm])

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentClients = filteredClients.slice(startIndex, endIndex)

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter' && selectedSuggestion >= 0) {
      e.preventDefault()
      handleSuggestionClick(suggestions[selectedSuggestion])
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setSelectedSuggestion(-1)
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.firstName + ' ' + suggestion.lastName)
    setShowSuggestions(false)
    setSelectedSuggestion(-1)
    setCurrentPage(1)
    searchInputRef.current?.focus()
  }

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('')
    setShowSuggestions(false)
    setSelectedSuggestion(-1)
    setCurrentPage(1)
    searchInputRef.current?.focus()
  }

  // Handle page change with loading animation
  const handlePageChange = (newPage) => {
    setIsPageLoading(true)
    setTimeout(() => {
      setCurrentPage(newPage)
      setIsPageLoading(false)
    }, 800)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Tooltip positioning function
  const handleTooltipPosition = (event) => {
    const iconWrapper = event.currentTarget
    const rect = iconWrapper.getBoundingClientRect()
    
    // Create tooltip element if it doesn't exist
    let tooltip = document.getElementById('custom-tooltip')
    if (!tooltip) {
      tooltip = document.createElement('div')
      tooltip.id = 'custom-tooltip'
      tooltip.style.cssText = `
        position: fixed;
        background: #1f2937;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
      `
      document.body.appendChild(tooltip)
    }
    
    // Set tooltip content
    tooltip.textContent = iconWrapper.getAttribute('title')
    
    // Calculate position
    let left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)
    let top = rect.top - tooltip.offsetHeight - 12 // 12px gap
    
    // Adjust if tooltip goes off screen
    if (left < 10) left = 10
    if (left + tooltip.offsetWidth > window.innerWidth - 10) {
      left = window.innerWidth - tooltip.offsetWidth - 10
    }
    if (top < 10) {
      // Show below if not enough space above
      top = rect.bottom + 12
    }
    
    tooltip.style.left = `${left}px`
    tooltip.style.top = `${top}px`
    tooltip.style.opacity = '1'
  }

  const handleTooltipHide = () => {
    const tooltip = document.getElementById('custom-tooltip')
    if (tooltip) {
      tooltip.style.opacity = '0'
    }
  }

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-nav">
        <ul className="breadcrumb-list">
          <li className="breadcrumb-item">
            <button 
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center'
              }}
              title="Go to Dashboard"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="breadcrumb-icon">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-current">›</span>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-current">Manage Clients</span>
          </li>
        </ul>
      </div>

      <div className="dashboard-table-section">
        <h1>Manage Clients</h1>
        
        <div className="table-header">
          <h2>Clients</h2>
          <div className="header-actions">
            <button className="btn-import-clients">
              Import Clients
            </button>
            <button className="btn-add-client">
              Add A New Client
            </button>
            <div className="search-wrapper">
              <div className="typeahead-wrapper" ref={dropdownRef}>
                <div className="search-input-container">
                  <input 
                    ref={searchInputRef}
                    className="search-input" 
                    placeholder="Search clients..." 
                    aria-label="Search clients" 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => searchTerm.trim() !== '' && setShowSuggestions(true)}
                  />
                  {searchTerm && (
                    <button 
                      className="search-clear-btn"
                      onClick={handleClearSearch}
                      type="button"
                      aria-label="Clear search"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L4 12M4 4L12 12" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>
                {showSuggestions && suggestions.length > 0 && (
                  <div className="search-suggestions">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={suggestion.id}
                        className={`suggestion-item ${index === selectedSuggestion ? 'selected' : ''}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="suggestion-address">{suggestion.firstName} {suggestion.lastName}</div>
                        <div className="suggestion-client">{suggestion.email}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          {isLoading ? (
            <div className="loading-overlay">
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
              <div className="loading-text">Loading client data...</div>
            </div>
          ) : (
            <>
              <table className={`dashboard-table ${searchTerm.trim() !== '' ? 'compact-results' : ''}`}>
            <thead>
              <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Mobile Number</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                  {isPageLoading ? (
                    // Skeleton loading placeholders
                    Array.from({ length: 10 }, (_, index) => (
                      <tr key={`skeleton-${index}`} className="skeleton-row">
                        <td>
                          <div className="skeleton-placeholder skeleton-name"></div>
                        </td>
                        <td>
                          <div className="skeleton-placeholder skeleton-name"></div>
                        </td>
                        <td>
                          <div className="skeleton-placeholder skeleton-phone"></div>
                        </td>
                        <td>
                          <div className="skeleton-placeholder skeleton-email"></div>
                        </td>
                        <td>
                          <div className="skeleton-placeholder skeleton-action"></div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    // Actual data
                    currentClients.map((client) => (
                <tr key={client.id}>
                        <td>{client.firstName}</td>
                        <td>{client.lastName}</td>
                        <td>{client.mobileNumber}</td>
                  <td>{client.email}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <div 
                              className="icon-wrapper" 
                              style={{ position: 'relative', display: 'inline-block' }}
                              title="Edit client"
                              onMouseEnter={handleTooltipPosition}
                              onMouseLeave={handleTooltipHide}
                            >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon action">
                                <path d="M2.39662 15.0964C2.43491 14.7518 2.45405 14.5795 2.50618 14.4185C2.55243 14.2756 2.61778 14.1396 2.70045 14.0142C2.79363 13.8729 2.91621 13.7504 3.16136 13.5052L14.1666 2.49999C15.0871 1.57951 16.5795 1.57951 17.4999 2.49999C18.4204 3.42046 18.4204 4.91285 17.4999 5.83332L6.49469 16.8386C6.24954 17.0837 6.12696 17.2063 5.98566 17.2995C5.86029 17.3821 5.72433 17.4475 5.58146 17.4937C5.42042 17.5459 5.24813 17.565 4.90356 17.6033L2.08325 17.9167L2.39662 15.0964Z" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </div>
                            <div 
                              className="icon-wrapper" 
                              style={{ position: 'relative', display: 'inline-block' }}
                              title="View address"
                              onMouseEnter={handleTooltipPosition}
                              onMouseLeave={handleTooltipHide}
                            >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon action">
                                <path d="M9.16675 9.16667H5.16675C4.23333 9.16667 3.76662 9.16667 3.4101 9.34832C3.09649 9.50811 2.84153 9.76308 2.68174 10.0767C2.50008 10.4332 2.50008 10.8999 2.50008 11.8333V17.5M17.5001 17.5V5.16667C17.5001 4.23325 17.5001 3.76654 17.3184 3.41002C17.1586 3.09641 16.9037 2.84144 16.5901 2.68166C16.2335 2.5 15.7668 2.5 14.8334 2.5H11.8334C10.9 2.5 10.4333 2.5 10.0768 2.68166C9.76316 2.84144 9.50819 3.09641 9.3484 3.41002C9.16675 3.76654 9.16675 4.23325 9.16675 5.16667V17.5M18.3334 17.5H1.66675M12.0834 5.83333H14.5834M12.0834 9.16667H14.5834M12.0834 12.5H14.5834" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </div>
                            <div 
                              className="icon-wrapper" 
                              style={{ position: 'relative', display: 'inline-block' }}
                              title="Delete client"
                              onMouseEnter={handleTooltipPosition}
                              onMouseLeave={handleTooltipHide}
                            >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon action">
                                <path d="M13.3333 4.99999V4.33332C13.3333 3.3999 13.3333 2.93319 13.1517 2.57667C12.9919 2.26307 12.7369 2.0081 12.4233 1.84831C12.0668 1.66666 11.6001 1.66666 10.6667 1.66666H9.33333C8.39991 1.66666 7.9332 1.66666 7.57668 1.84831C7.26308 2.0081 7.00811 2.26307 6.84832 2.57667C6.66667 2.93319 6.66667 3.3999 6.66667 4.33332V4.99999M8.33333 9.58332V13.75M11.6667 9.58332V13.75M2.5 4.99999H17.5M15.8333 4.99999V14.3333C15.8333 15.7335 15.8333 16.4335 15.5608 16.9683C15.3212 17.4387 14.9387 17.8212 14.4683 18.0608C13.9335 18.3333 13.2335 18.3333 11.8333 18.3333H8.16667C6.76654 18.3333 6.06647 18.3333 5.53169 18.0608C5.06129 17.8212 4.67883 17.4387 4.43915 16.9683C4.16667 16.4335 4.16667 15.7335 4.16667 14.3333V4.99999" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </div>
                    </div>
                  </td>
                </tr>
                    ))
                  )}
            </tbody>
          </table>
              {isPageLoading && (
                <div className="loading-overlay">
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                  <div className="loading-text">Loading page...</div>
                </div>
              )}
            </>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isPageLoading}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filteredClients.length}
          itemsLabel="results"
        />
      </div>
    </>
  )
}

export default ManageClients 