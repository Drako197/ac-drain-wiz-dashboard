import React, { useState, useRef, useEffect } from 'react'

const ManageClients = () => {
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

  // Expanded mock data for demonstration (100 entries for 10 pages)
  const clients = [
    { id: 1, name: 'John Smith', email: 'john.smith@email.com', phone: '(555) 123-4567', address: '123 Main St, Miami Beach, Florida 33181', status: 'active', lastService: '2024-01-15' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah.wilson@email.com', phone: '(555) 234-5678', address: '456 Oak Ave, Fort Lauderdale, Florida 33301', status: 'active', lastService: '2024-01-10' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@email.com', phone: '(555) 345-6789', address: '789 Pine Rd, West Palm Beach, Florida 33401', status: 'inactive', lastService: '2023-12-20' },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@email.com', phone: '(555) 456-7890', address: '1010 Sunset Blvd, Miami, Florida 33133', status: 'active', lastService: '2024-01-20' },
    { id: 5, name: 'David Brown', email: 'david.brown@email.com', phone: '(555) 567-8901', address: '2020 Sunrise Blvd, Fort Lauderdale, Florida 33304', status: 'active', lastService: '2024-01-18' },
    { id: 6, name: 'Lisa Anderson', email: 'lisa.anderson@email.com', phone: '(555) 678-9012', address: '3030 Coral Way, Coral Gables, Florida 33134', status: 'active', lastService: '2024-01-12' },
    { id: 7, name: 'Robert Taylor', email: 'robert.taylor@email.com', phone: '(555) 789-0123', address: '4040 Biscayne Blvd, Miami, Florida 33137', status: 'inactive', lastService: '2023-11-15' },
    { id: 8, name: 'Jennifer Garcia', email: 'jennifer.garcia@email.com', phone: '(555) 890-1234', address: '5050 Collins Ave, Miami Beach, Florida 33140', status: 'active', lastService: '2024-01-25' },
    { id: 9, name: 'Michael Martinez', email: 'michael.martinez@email.com', phone: '(555) 901-2345', address: '6060 Lincoln Rd, Miami Beach, Florida 33139', status: 'active', lastService: '2024-01-22' },
    { id: 10, name: 'Amanda Rodriguez', email: 'amanda.rodriguez@email.com', phone: '(555) 012-3456', address: '7070 Washington Ave, Miami Beach, Florida 33139', status: 'active', lastService: '2024-01-19' },
    { id: 11, name: 'Christopher Lee', email: 'christopher.lee@email.com', phone: '(555) 123-4567', address: '8080 Alton Rd, Miami Beach, Florida 33139', status: 'active', lastService: '2024-01-16' },
    { id: 12, name: 'Jessica White', email: 'jessica.white@email.com', phone: '(555) 234-5678', address: '9090 Meridian Ave, Miami Beach, Florida 33139', status: 'inactive', lastService: '2023-10-30' },
    { id: 13, name: 'Daniel Clark', email: 'daniel.clark@email.com', phone: '(555) 345-6789', address: '1111 Venetian Causeway, Miami, Florida 33139', status: 'active', lastService: '2024-01-28' },
    { id: 14, name: 'Ashley Lewis', email: 'ashley.lewis@email.com', phone: '(555) 456-7890', address: '2222 MacArthur Causeway, Miami, Florida 33139', status: 'active', lastService: '2024-01-24' },
    { id: 15, name: 'Matthew Hall', email: 'matthew.hall@email.com', phone: '(555) 567-8901', address: '3333 Julia Tuttle Causeway, Miami, Florida 33139', status: 'active', lastService: '2024-01-21' },
    { id: 16, name: 'Nicole Young', email: 'nicole.young@email.com', phone: '(555) 678-9012', address: '4444 Rickenbacker Causeway, Miami, Florida 33139', status: 'active', lastService: '2024-01-17' },
    { id: 17, name: 'Kevin King', email: 'kevin.king@email.com', phone: '(555) 789-0123', address: '5555 William Lehman Causeway, Miami, Florida 33139', status: 'inactive', lastService: '2023-09-25' },
    { id: 18, name: 'Stephanie Wright', email: 'stephanie.wright@email.com', phone: '(555) 890-1234', address: '6666 Broad Causeway, Miami, Florida 33139', status: 'active', lastService: '2024-01-30' },
    { id: 19, name: 'Andrew Green', email: 'andrew.green@email.com', phone: '(555) 901-2345', address: '7777 79th Street Causeway, Miami, Florida 33139', status: 'active', lastService: '2024-01-26' },
    { id: 20, name: 'Rachel Baker', email: 'rachel.baker@email.com', phone: '(555) 012-3456', address: '8888 163rd Street, North Miami Beach, Florida 33162', status: 'active', lastService: '2024-01-23' },
    { id: 21, name: 'Brandon Adams', email: 'brandon.adams@email.com', phone: '(555) 123-4567', address: '9999 167th Street, North Miami Beach, Florida 33162', status: 'active', lastService: '2024-01-20' },
    { id: 22, name: 'Lauren Nelson', email: 'lauren.nelson@email.com', phone: '(555) 234-5678', address: '11111 183rd Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-27' },
    { id: 23, name: 'Ryan Carter', email: 'ryan.carter@email.com', phone: '(555) 345-6789', address: '22222 195th Street, Aventura, Florida 33180', status: 'inactive', lastService: '2023-08-15' },
    { id: 24, name: 'Megan Mitchell', email: 'megan.mitchell@email.com', phone: '(555) 456-7890', address: '33333 199th Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-29' },
    { id: 25, name: 'Tyler Perez', email: 'tyler.perez@email.com', phone: '(555) 567-8901', address: '44444 203rd Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-25' },
    { id: 26, name: 'Brittany Roberts', email: 'brittany.roberts@email.com', phone: '(555) 678-9012', address: '55555 207th Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-22' },
    { id: 27, name: 'Nathan Turner', email: 'nathan.turner@email.com', phone: '(555) 789-0123', address: '66666 211th Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-19' },
    { id: 28, name: 'Samantha Phillips', email: 'samantha.phillips@email.com', phone: '(555) 890-1234', address: '77777 215th Street, Aventura, Florida 33180', status: 'inactive', lastService: '2023-07-20' },
    { id: 29, name: 'Jonathan Campbell', email: 'jonathan.campbell@email.com', phone: '(555) 901-2345', address: '88888 219th Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-31' },
    { id: 30, name: 'Victoria Parker', email: 'victoria.parker@email.com', phone: '(555) 012-3456', address: '99999 223rd Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-28' },
    { id: 31, name: 'Derek Evans', email: 'derek.evans@email.com', phone: '(555) 123-4567', address: '111111 227th Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-24' },
    { id: 32, name: 'Hannah Edwards', email: 'hannah.edwards@email.com', phone: '(555) 234-5678', address: '222222 231st Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-21' },
    { id: 33, name: 'Corey Collins', email: 'corey.collins@email.com', phone: '(555) 345-6789', address: '333333 235th Street, Aventura, Florida 33180', status: 'inactive', lastService: '2023-06-10' },
    { id: 34, name: 'Amber Stewart', email: 'amber.stewart@email.com', phone: '(555) 456-7890', address: '444444 239th Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-26' },
    { id: 35, name: 'Travis Morris', email: 'travis.morris@email.com', phone: '(555) 567-8901', address: '555555 243rd Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-23' },
    { id: 36, name: 'Melissa Rogers', email: 'melissa.rogers@email.com', phone: '(555) 678-9012', address: '666666 247th Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-20' },
    { id: 37, name: 'Marcus Reed', email: 'marcus.reed@email.com', phone: '(555) 789-0123', address: '777777 251st Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-17' },
    { id: 38, name: 'Crystal Cook', email: 'crystal.cook@email.com', phone: '(555) 890-1234', address: '888888 255th Street, Aventura, Florida 33180', status: 'inactive', lastService: '2023-05-05' },
    { id: 39, name: 'Dustin Morgan', email: 'dustin.morgan@email.com', phone: '(555) 901-2345', address: '999999 259th Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-30' },
    { id: 40, name: 'Tiffany Bell', email: 'tiffany.bell@email.com', phone: '(555) 012-3456', address: '1111111 263rd Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-27' },
    { id: 41, name: 'Brent Murphy', email: 'brent.murphy@email.com', phone: '(555) 123-4567', address: '2222222 267th Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-24' },
    { id: 42, name: 'Danielle Bailey', email: 'danielle.bailey@email.com', phone: '(555) 234-5678', address: '3333333 271st Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-21' },
    { id: 43, name: 'Gregory Rivera', email: 'gregory.rivera@email.com', phone: '(555) 345-6789', address: '4444444 275th Street, Aventura, Florida 33180', status: 'inactive', lastService: '2023-04-15' },
    { id: 44, name: 'Lindsey Cooper', email: 'lindsey.cooper@email.com', phone: '(555) 456-7890', address: '5555555 279th Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-28' },
    { id: 45, name: 'Troy Richardson', email: 'troy.richardson@email.com', phone: '(555) 567-8901', address: '6666666 283rd Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-25' },
    { id: 46, name: 'Monica Cox', email: 'monica.cox@email.com', phone: '(555) 678-9012', address: '7777777 287th Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-22' },
    { id: 47, name: 'Derrick Howard', email: 'derrick.howard@email.com', phone: '(555) 789-0123', address: '8888888 291st Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-19' },
    { id: 48, name: 'Stacy Ward', email: 'stacy.ward@email.com', phone: '(555) 890-1234', address: '9999999 295th Street, Aventura, Florida 33180', status: 'inactive', lastService: '2023-03-20' },
    { id: 49, name: 'Wesley Torres', email: 'wesley.torres@email.com', phone: '(555) 901-2345', address: '11111111 299th Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-31' },
    { id: 50, name: 'Tamara Peterson', email: 'tamara.peterson@email.com', phone: '(555) 012-3456', address: '22222222 303rd Street, Aventura, Florida 33180', status: 'active', lastService: '2024-01-29' }
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
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Generate suggestions for search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([])
      return
    }

    const filtered = clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.address.toLowerCase().includes(searchTerm.toLowerCase())
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
    setSearchTerm(suggestion.name)
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
      <nav className="breadcrumb-nav">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <span className="breadcrumb-current">Dashboard</span>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-current">›</span>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-current">Manage Clients</span>
          </li>
        </ol>
      </nav>
      
      <div className="dashboard-table-section">
        <h1>Manage Clients</h1>
        
        <div className="table-header">
          <h2>Clients</h2>
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
                      <div className="suggestion-address">{suggestion.name}</div>
                      <div className="suggestion-client">{suggestion.email}</div>
                    </div>
                  ))}
                </div>
              )}
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
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Last Service</th>
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
                          <div className="skeleton-placeholder skeleton-email"></div>
                        </td>
                        <td>
                          <div className="skeleton-placeholder skeleton-phone"></div>
                        </td>
                        <td>
                          <div className="skeleton-placeholder skeleton-address"></div>
                        </td>
                        <td>
                          <div className="skeleton-placeholder skeleton-status"></div>
                        </td>
                        <td>
                          <div className="skeleton-placeholder skeleton-date"></div>
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
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>{client.phone}</td>
                        <td>{client.address}</td>
                        <td>
                          <span className={`status-badge ${client.status}`}>
                            {client.status}
                          </span>
                        </td>
                        <td>{client.lastService}</td>
                        <td>
                          <div 
                            className="icon-wrapper" 
                            style={{ position: 'relative', display: 'inline-block' }}
                            title="Edit client details"
                            onMouseEnter={handleTooltipPosition}
                            onMouseLeave={handleTooltipHide}
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon action">
                              <path d="M13.0261 6.3595C12.6961 6.02948 12.5311 5.86447 12.4693 5.6742C12.4149 5.50683 12.4149 5.32654 12.4693 5.15917C12.5311 4.9689 12.6961 4.80389 13.0261 4.47388L15.3914 2.10857C14.7638 1.82471 14.067 1.66669 13.3333 1.66669C10.5719 1.66669 8.33333 3.90526 8.33333 6.66669C8.33333 7.07589 8.38248 7.47361 8.47521 7.85426C8.57451 8.26189 8.62416 8.4657 8.61535 8.59446C8.60612 8.72926 8.58602 8.80098 8.52386 8.92095C8.46448 9.03554 8.35071 9.14931 8.12318 9.37684L2.91666 14.5834C2.22631 15.2737 2.22631 16.393 2.91666 17.0834C3.60702 17.7737 4.72631 17.7737 5.41666 17.0834L10.6232 11.8768C10.8507 11.6493 10.9645 11.5355 11.0791 11.4762C11.199 11.414 11.2708 11.3939 11.4056 11.3847C11.5343 11.3759 11.7381 11.4255 12.1458 11.5248C12.5264 11.6175 12.9241 11.6667 13.3333 11.6667C16.0948 11.6667 18.3333 9.42811 18.3333 6.66669C18.3333 5.93301 18.1753 5.23625 17.8914 4.60857L15.5261 6.97388C15.1961 7.30389 15.0311 7.4689 14.8408 7.53072C14.6735 7.5851 14.4932 7.5851 14.3258 7.53072C14.1355 7.4689 13.9705 7.30389 13.6405 6.97388L13.0261 6.3595Z" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
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
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredClients.length)} of {filteredClients.length} results
          </div>
          <div className="pagination">
            <button 
              className="pagination-btn" 
              disabled={currentPage === 1 || isPageLoading}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              ← Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                disabled={isPageLoading}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="pagination-btn" 
              disabled={currentPage === totalPages || isPageLoading}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageClients 