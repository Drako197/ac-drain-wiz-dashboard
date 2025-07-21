import React, { useState, useRef, useEffect } from 'react'
import './CancelledServiceCalls.css'

const CancelledServiceCalls = () => {
  const [activeTab, setActiveTab] = useState('cancelled')
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const searchInputRef = useRef(null)
  const dropdownRef = useRef(null)

  // Cancelled Service Calls data (50 entries for 5 pages)
  const [cancelledServiceCalls] = useState([
    {
      id: 1,
      address: '123 Main Street, Miami Beach, Florida 33181',
      clientName: 'Steven Segal',
      contactNumber: '(555) 123-4567',
      assignedSensor: 'Sensor #12346',
      cancelledDate: '2024-01-15',
      reason: 'Client Request',
      cancelledBy: 'John Smith'
    },
    {
      id: 2,
      address: '456 Ocean Drive, Fort Lauderdale, Florida 33301',
      clientName: 'Martin Short',
      contactNumber: '(555) 234-5678',
      assignedSensor: 'Sensor #12347',
      cancelledDate: '2024-01-14',
      reason: 'Weather Conditions',
      cancelledBy: 'Mike Johnson'
    },
    {
      id: 3,
      address: '789 Palm Avenue, West Palm Beach, Florida 33401',
      clientName: 'Thomas Aguilar',
      contactNumber: '(555) 345-6789',
      assignedSensor: 'Sensor #12348',
      cancelledDate: '2024-01-13',
      reason: 'Equipment Failure',
      cancelledBy: 'Sarah Wilson'
    },
    {
      id: 4,
      address: '1010 Sunset Boulevard, Miami, Florida 33133',
      clientName: 'Jake Smith',
      contactNumber: '(555) 456-7890',
      assignedSensor: 'Sensor #12349',
      cancelledDate: '2024-01-12',
      reason: 'Client Request',
      cancelledBy: 'David Brown'
    },
    {
      id: 5,
      address: '2020 Sunrise Boulevard, Fort Lauderdale, Florida 33304',
      clientName: 'Robert Black',
      contactNumber: '(555) 567-8901',
      assignedSensor: 'Sensor #12350',
      cancelledDate: '2024-01-11',
      reason: 'Weather Conditions',
      cancelledBy: 'Lisa Davis'
    },
    {
      id: 6,
      address: '3030 Coral Way, Coral Gables, Florida 33134',
      clientName: 'Mauricio Cicone',
      contactNumber: '(555) 678-9012',
      assignedSensor: 'Sensor #12351',
      cancelledDate: '2024-01-10',
      reason: 'Equipment Failure',
      cancelledBy: 'James Wilson'
    },
    {
      id: 7,
      address: '4040 Biscayne Boulevard, Miami, Florida 33137',
      clientName: 'Brad Agustini',
      contactNumber: '(555) 789-0123',
      assignedSensor: 'Sensor #12352',
      cancelledDate: '2024-01-09',
      reason: 'Client Request',
      cancelledBy: 'Emily Johnson'
    },
    {
      id: 8,
      address: '5050 Collins Avenue, Miami Beach, Florida 33140',
      clientName: 'John Snow',
      contactNumber: '(555) 890-1234',
      assignedSensor: 'Sensor #12353',
      cancelledDate: '2024-01-08',
      reason: 'Weather Conditions',
      cancelledBy: 'Robert Taylor'
    },
    {
      id: 9,
      address: '6060 Lincoln Road, Miami Beach, Florida 33139',
      clientName: 'Michael Johnson',
      contactNumber: '(555) 901-2345',
      assignedSensor: 'Sensor #12354',
      cancelledDate: '2024-01-07',
      reason: 'Equipment Failure',
      cancelledBy: 'Jennifer Davis'
    },
    {
      id: 10,
      address: '7070 Washington Avenue, Miami Beach, Florida 33139',
      clientName: 'David Wilson',
      contactNumber: '(555) 012-3456',
      assignedSensor: 'Sensor #12355',
      cancelledDate: '2024-01-06',
      reason: 'Client Request',
      cancelledBy: 'Christopher Lee'
    },
    {
      id: 11,
      address: '8080 Alton Road, Miami Beach, Florida 33139',
      clientName: 'Sarah Martinez',
      contactNumber: '(555) 123-4567',
      assignedSensor: 'Sensor #12356',
      cancelledDate: '2024-01-05',
      reason: 'Weather Conditions',
      cancelledBy: 'Amanda Thompson'
    },
    {
      id: 12,
      address: '9090 Meridian Avenue, Miami Beach, Florida 33139',
      clientName: 'Carlos Rodriguez',
      contactNumber: '(555) 234-5678',
      assignedSensor: 'Sensor #12357',
      cancelledDate: '2024-01-04',
      reason: 'Equipment Failure',
      cancelledBy: 'Daniel Moore'
    },
    {
      id: 13,
      address: '1111 Venetian Causeway, Miami, Florida 33139',
      clientName: 'Maria Garcia',
      contactNumber: '(555) 345-6789',
      assignedSensor: 'Sensor #12358',
      cancelledDate: '2024-01-03',
      reason: 'Client Request',
      cancelledBy: 'Jessica Lee'
    },
    {
      id: 14,
      address: '2222 MacArthur Causeway, Miami, Florida 33139',
      clientName: 'James Brown',
      contactNumber: '(555) 456-7890',
      assignedSensor: 'Sensor #12359',
      cancelledDate: '2024-01-02',
      reason: 'Weather Conditions',
      cancelledBy: 'Matthew White'
    },
    {
      id: 15,
      address: '3333 Julia Tuttle Causeway, Miami, Florida 33139',
      clientName: 'Lisa Anderson',
      contactNumber: '(555) 567-8901',
      assignedSensor: 'Sensor #12360',
      cancelledDate: '2024-01-01',
      reason: 'Equipment Failure',
      cancelledBy: 'Nicole Harris'
    },
    {
      id: 16,
      address: '4444 Rickenbacker Causeway, Miami, Florida 33139',
      clientName: 'Robert Taylor',
      contactNumber: '(555) 678-9012',
      assignedSensor: 'Sensor #12361',
      cancelledDate: '2023-12-31',
      reason: 'Client Request',
      cancelledBy: 'Andrew Clark'
    },
    {
      id: 17,
      address: '5555 William Lehman Causeway, Miami, Florida 33139',
      clientName: 'Jennifer Davis',
      contactNumber: '(555) 789-0123',
      assignedSensor: 'Sensor #12362',
      cancelledDate: '2023-12-30',
      reason: 'Weather Conditions',
      cancelledBy: 'Stephanie Lewis'
    },
    {
      id: 18,
      address: '6666 Broad Causeway, Miami, Florida 33139',
      clientName: 'Christopher Wilson',
      contactNumber: '(555) 890-1234',
      assignedSensor: 'Sensor #12363',
      cancelledDate: '2023-12-29',
      reason: 'Equipment Failure',
      cancelledBy: 'Kevin Hall'
    },
    {
      id: 19,
      address: '7777 79th Street Causeway, Miami, Florida 33139',
      clientName: 'Amanda Thompson',
      contactNumber: '(555) 901-2345',
      assignedSensor: 'Sensor #12364',
      cancelledDate: '2023-12-28',
      reason: 'Client Request',
      cancelledBy: 'Rachel Young'
    },
    {
      id: 20,
      address: '8888 163rd Street, North Miami Beach, Florida 33162',
      clientName: 'Daniel Moore',
      contactNumber: '(555) 012-3456',
      assignedSensor: 'Sensor #12365',
      cancelledDate: '2023-12-27',
      reason: 'Weather Conditions',
      cancelledBy: 'Brandon King'
    },
    {
      id: 21,
      address: '9999 167th Street, North Miami Beach, Florida 33162',
      clientName: 'Jessica Lee',
      contactNumber: '(555) 123-4567',
      assignedSensor: 'Sensor #12366',
      cancelledDate: '2023-12-26',
      reason: 'Equipment Failure',
      cancelledBy: 'Lauren Scott'
    },
    {
      id: 22,
      address: '11111 183rd Street, Aventura, Florida 33180',
      clientName: 'Matthew White',
      contactNumber: '(555) 234-5678',
      assignedSensor: 'Sensor #12367',
      cancelledDate: '2023-12-25',
      reason: 'Client Request',
      cancelledBy: 'Ryan Green'
    },
    {
      id: 23,
      address: '22222 195th Street, Aventura, Florida 33180',
      clientName: 'Nicole Harris',
      contactNumber: '(555) 345-6789',
      assignedSensor: 'Sensor #12368',
      cancelledDate: '2023-12-24',
      reason: 'Weather Conditions',
      cancelledBy: 'Megan Baker'
    },
    {
      id: 24,
      address: '33333 199th Street, Aventura, Florida 33180',
      clientName: 'Andrew Clark',
      contactNumber: '(555) 456-7890',
      assignedSensor: 'Sensor #12369',
      cancelledDate: '2023-12-23',
      reason: 'Equipment Failure',
      cancelledBy: 'Tyler Adams'
    },
    {
      id: 25,
      address: '44444 203rd Street, Aventura, Florida 33180',
      clientName: 'Stephanie Lewis',
      contactNumber: '(555) 567-8901',
      assignedSensor: 'Sensor #12370',
      cancelledDate: '2023-12-22',
      reason: 'Client Request',
      cancelledBy: 'Ashley Nelson'
    },
    {
      id: 26,
      address: '55555 207th Street, Aventura, Florida 33180',
      clientName: 'Kevin Hall',
      contactNumber: '(555) 678-9012',
      assignedSensor: 'Sensor #12371',
      cancelledDate: '2023-12-21',
      reason: 'Weather Conditions',
      cancelledBy: 'Joshua Carter'
    },
    {
      id: 27,
      address: '66666 211th Street, Aventura, Florida 33180',
      clientName: 'Rachel Young',
      contactNumber: '(555) 789-0123',
      assignedSensor: 'Sensor #12372',
      cancelledDate: '2023-12-20',
      reason: 'Equipment Failure',
      cancelledBy: 'Brittany Mitchell'
    },
    {
      id: 28,
      address: '77777 215th Street, Aventura, Florida 33180',
      clientName: 'Brandon King',
      contactNumber: '(555) 890-1234',
      assignedSensor: 'Sensor #12373',
      cancelledDate: '2023-12-19',
      reason: 'Client Request',
      cancelledBy: 'Nathan Perez'
    },
    {
      id: 29,
      address: '88888 219th Street, Aventura, Florida 33180',
      clientName: 'Lauren Scott',
      contactNumber: '(555) 901-2345',
      assignedSensor: 'Sensor #12374',
      cancelledDate: '2023-12-18',
      reason: 'Weather Conditions',
      cancelledBy: 'Samantha Roberts'
    },
    {
      id: 30,
      address: '99999 223rd Street, Aventura, Florida 33180',
      clientName: 'Ryan Green',
      contactNumber: '(555) 012-3456',
      assignedSensor: 'Sensor #12375',
      cancelledDate: '2023-12-17',
      reason: 'Equipment Failure',
      cancelledBy: 'Jonathan Turner'
    },
    {
      id: 31,
      address: '111111 227th Street, Aventura, Florida 33180',
      clientName: 'Megan Baker',
      contactNumber: '(555) 123-4567',
      assignedSensor: 'Sensor #12376',
      cancelledDate: '2023-12-16',
      reason: 'Client Request',
      cancelledBy: 'Victoria Phillips'
    },
    {
      id: 32,
      address: '222222 231st Street, Aventura, Florida 33180',
      clientName: 'Tyler Adams',
      contactNumber: '(555) 234-5678',
      assignedSensor: 'Sensor #12377',
      cancelledDate: '2023-12-15',
      reason: 'Weather Conditions',
      cancelledBy: 'Derek Campbell'
    },
    {
      id: 33,
      address: '333333 235th Street, Aventura, Florida 33180',
      clientName: 'Ashley Nelson',
      contactNumber: '(555) 345-6789',
      assignedSensor: 'Sensor #12378',
      cancelledDate: '2023-12-14',
      reason: 'Equipment Failure',
      cancelledBy: 'Hannah Parker'
    },
    {
      id: 34,
      address: '444444 239th Street, Aventura, Florida 33180',
      clientName: 'Joshua Carter',
      contactNumber: '(555) 456-7890',
      assignedSensor: 'Sensor #12379',
      cancelledDate: '2023-12-13',
      reason: 'Client Request',
      cancelledBy: 'Corey Evans'
    },
    {
      id: 35,
      address: '555555 243rd Street, Aventura, Florida 33180',
      clientName: 'Brittany Mitchell',
      contactNumber: '(555) 567-8901',
      assignedSensor: 'Sensor #12380',
      cancelledDate: '2023-12-12',
      reason: 'Weather Conditions',
      cancelledBy: 'Amber Edwards'
    },
    {
      id: 36,
      address: '666666 247th Street, Aventura, Florida 33180',
      clientName: 'Nathan Perez',
      contactNumber: '(555) 678-9012',
      assignedSensor: 'Sensor #12381',
      cancelledDate: '2023-12-11',
      reason: 'Equipment Failure',
      cancelledBy: 'Travis Collins'
    },
    {
      id: 37,
      address: '777777 251st Street, Aventura, Florida 33180',
      clientName: 'Samantha Roberts',
      contactNumber: '(555) 789-0123',
      assignedSensor: 'Sensor #12382',
      cancelledDate: '2023-12-10',
      reason: 'Client Request',
      cancelledBy: 'Melissa Stewart'
    },
    {
      id: 38,
      address: '888888 255th Street, Aventura, Florida 33180',
      clientName: 'Jonathan Turner',
      contactNumber: '(555) 890-1234',
      assignedSensor: 'Sensor #12383',
      cancelledDate: '2023-12-09',
      reason: 'Weather Conditions',
      cancelledBy: 'Marcus Morris'
    },
    {
      id: 39,
      address: '999999 259th Street, Aventura, Florida 33180',
      clientName: 'Victoria Phillips',
      contactNumber: '(555) 901-2345',
      assignedSensor: 'Sensor #12384',
      cancelledDate: '2023-12-08',
      reason: 'Equipment Failure',
      cancelledBy: 'Crystal Rogers'
    },
    {
      id: 40,
      address: '1111111 263rd Street, Aventura, Florida 33180',
      clientName: 'Derek Campbell',
      contactNumber: '(555) 012-3456',
      assignedSensor: 'Sensor #12385',
      cancelledDate: '2023-12-07',
      reason: 'Client Request',
      cancelledBy: 'Dustin Reed'
    },
    {
      id: 41,
      address: '2222222 267th Street, Aventura, Florida 33180',
      clientName: 'Hannah Parker',
      contactNumber: '(555) 123-4567',
      assignedSensor: 'Sensor #12386',
      cancelledDate: '2023-12-06',
      reason: 'Weather Conditions',
      cancelledBy: 'Tiffany Cook'
    },
    {
      id: 42,
      address: '3333333 271st Street, Aventura, Florida 33180',
      clientName: 'Corey Evans',
      contactNumber: '(555) 234-5678',
      assignedSensor: 'Sensor #12387',
      cancelledDate: '2023-12-05',
      reason: 'Equipment Failure',
      cancelledBy: 'Brent Morgan'
    },
    {
      id: 43,
      address: '4444444 275th Street, Aventura, Florida 33180',
      clientName: 'Amber Edwards',
      contactNumber: '(555) 345-6789',
      assignedSensor: 'Sensor #12388',
      cancelledDate: '2023-12-04',
      reason: 'Client Request',
      cancelledBy: 'Danielle Bell'
    },
    {
      id: 44,
      address: '5555555 279th Street, Aventura, Florida 33180',
      clientName: 'Travis Collins',
      contactNumber: '(555) 456-7890',
      assignedSensor: 'Sensor #12389',
      cancelledDate: '2023-12-03',
      reason: 'Weather Conditions',
      cancelledBy: 'Gregory Murphy'
    },
    {
      id: 45,
      address: '6666666 283rd Street, Aventura, Florida 33180',
      clientName: 'Melissa Stewart',
      contactNumber: '(555) 567-8901',
      assignedSensor: 'Sensor #12390',
      cancelledDate: '2023-12-02',
      reason: 'Equipment Failure',
      cancelledBy: 'Lindsey Bailey'
    },
    {
      id: 46,
      address: '7777777 287th Street, Aventura, Florida 33180',
      clientName: 'Marcus Morris',
      contactNumber: '(555) 678-9012',
      assignedSensor: 'Sensor #12391',
      cancelledDate: '2023-12-01',
      reason: 'Client Request',
      cancelledBy: 'Troy Rivera'
    },
    {
      id: 47,
      address: '8888888 291st Street, Aventura, Florida 33180',
      clientName: 'Crystal Rogers',
      contactNumber: '(555) 789-0123',
      assignedSensor: 'Sensor #12392',
      cancelledDate: '2023-11-30',
      reason: 'Weather Conditions',
      cancelledBy: 'Monica Cooper'
    },
    {
      id: 48,
      address: '9999999 295th Street, Aventura, Florida 33180',
      clientName: 'Dustin Reed',
      contactNumber: '(555) 890-1234',
      assignedSensor: 'Sensor #12393',
      cancelledDate: '2023-11-29',
      reason: 'Equipment Failure',
      cancelledBy: 'Derrick Richardson'
    },
    {
      id: 49,
      address: '11111111 299th Street, Aventura, Florida 33180',
      clientName: 'Tiffany Cook',
      contactNumber: '(555) 901-2345',
      assignedSensor: 'Sensor #12394',
      cancelledDate: '2023-11-28',
      reason: 'Client Request',
      cancelledBy: 'Stacy Cox'
    },
    {
      id: 50,
      address: '22222222 303rd Street, Aventura, Florida 33180',
      clientName: 'Brent Morgan',
      contactNumber: '(555) 012-3456',
      assignedSensor: 'Sensor #12395',
      cancelledDate: '2023-11-27',
      reason: 'Weather Conditions',
      cancelledBy: 'Lance Howard'
    }
  ])

  const tabs = [
    { id: 'required', label: 'Service Call Required', count: 8, color: 'purple' },
    { id: 'my-calls', label: 'My Service Calls', count: 15, color: 'red' },
    { id: 'history', label: 'Service Call History', count: null, color: 'grey' },
    { id: 'cancelled', label: 'Cancelled Service Calls', count: null, color: 'grey' }
  ]

  // Filter service calls based on search term
  const filteredServiceCalls = cancelledServiceCalls.filter(call =>
    call.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.reason.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination calculations
  const totalPages = Math.ceil(filteredServiceCalls.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentServiceCalls = filteredServiceCalls.slice(startIndex, endIndex)

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const filtered = cancelledServiceCalls.filter(call =>
      call.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.reason.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5) // Limit to 5 suggestions

    setSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
    setSelectedSuggestion(-1)
  }, [searchTerm])

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedSuggestion >= 0 && suggestions[selectedSuggestion]) {
          const selected = suggestions[selectedSuggestion]
          setSearchTerm(selected.address)
          setShowSuggestions(false)
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        searchInputRef.current?.blur()
        break
      default:
        break
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.address)
    setShowSuggestions(false)
    setCurrentPage(1) // Reset to first page when selecting suggestion
    searchInputRef.current?.focus()
  }

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('')
    setShowSuggestions(false)
    setSelectedSuggestion(-1)
    setCurrentPage(1) // Reset to first page when clearing search
    searchInputRef.current?.focus()
  }

  // Handle page change with loading animation
  const handlePageChange = (newPage) => {
    setIsPageLoading(true)
    setTimeout(() => {
      setCurrentPage(newPage)
      setIsPageLoading(false)
    }, 800) // 0.8 second loading time for page changes
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

  return (
    <div className="page">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-nav">
        <ul className="breadcrumb-list">
          <li className="breadcrumb-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="breadcrumb-icon">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-current">›</span>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-current">Cancelled Service Calls</span>
          </li>
        </ul>
      </div>

      {/* Main Content Card */}
      <div className="dashboard-table-section">
        <h1>Cancelled Service Calls</h1>
        
        <div className="tabs-section">
          <div className="tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {tab.count && (
                  <span className="tab-count">{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="table-header">
          <h2>Cancelled Service Call Records</h2>
          <div className="search-wrapper">
            <div className="typeahead-wrapper" ref={dropdownRef}>
              <div className="search-input-container">
                <input
                  ref={searchInputRef}
                  className="search-input"
                  placeholder="Search Address, Client, or Reason"
                  aria-label="Search Address, Client, or Reason"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1) // Reset to first page when typing
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
                      <div className="suggestion-address">{suggestion.address}</div>
                      <div className="suggestion-client">{suggestion.clientName} - {suggestion.reason}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="table-container" style={{ position: 'relative' }}>
          {/* Standardized Table Loading Indicator */}
          {isPageLoading && (
            <div className="table-loading-indicator">
              <div className="table-loading-spinner">
                <div className="table-spinner"></div>
              </div>
              <div className="table-loading-text">Loading new page...</div>
            </div>
          )}
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Address</th>
                <th>Client Name</th>
                <th>Contact Number</th>
                <th>Assigned Sensor</th>
                <th>Cancelled Date</th>
                <th>Reason</th>
                <th>Cancelled By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isPageLoading ? (
                // Skeleton loading placeholders
                Array.from({ length: 10 }, (_, index) => (
                  <tr key={`skeleton-${index}`} className="skeleton-row">
                    <td>
                      <div className="skeleton-placeholder skeleton-address"></div>
                    </td>
                    <td>
                      <div className="skeleton-placeholder skeleton-name"></div>
                    </td>
                    <td>
                      <div className="skeleton-placeholder skeleton-phone"></div>
                    </td>
                    <td>
                      <div className="skeleton-placeholder skeleton-sensor"></div>
                    </td>
                    <td>
                      <div className="skeleton-placeholder skeleton-date"></div>
                    </td>
                    <td>
                      <div className="skeleton-placeholder skeleton-reason"></div>
                    </td>
                    <td>
                      <div className="skeleton-placeholder skeleton-cancelled-by"></div>
                    </td>
                    <td>
                      <div className="skeleton-placeholder skeleton-action"></div>
                    </td>
                  </tr>
                ))
              ) : (
                // Actual data
                currentServiceCalls.map((call) => (
                  <tr key={call.id}>
                    <td>{call.address}</td>
                    <td>{call.clientName}</td>
                    <td>{call.contactNumber}</td>
                    <td>{call.assignedSensor}</td>
                    <td>{call.cancelledDate}</td>
                    <td>
                      <span className={`reason-badge reason-${call.reason.toLowerCase().replace(' ', '-')}`}>
                        {call.reason}
                      </span>
                    </td>
                    <td>{call.cancelledBy}</td>
                    <td>
                      <div className="icon-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon action">
                          <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>

        <div className="pagination-container">
          <div className="pagination-info">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredServiceCalls.length)} of {filteredServiceCalls.length} results
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
    </div>
  )
}

export default CancelledServiceCalls 