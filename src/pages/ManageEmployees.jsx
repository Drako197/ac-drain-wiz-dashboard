import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ManageEmployees = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('active')
  const [showRoleTooltip, setShowRoleTooltip] = useState(false)
  const [roleTooltipPosition, setRoleTooltipPosition] = useState({ x: 0, y: 0 })
  const [currentRole, setCurrentRole] = useState('')
  const searchInputRef = useRef(null)
  const dropdownRef = useRef(null)

  // Role permissions mapping
  const rolePermissions = {
    'Manager': [
      'Create Service Calls',
      'Complete Service Calls',
      'Reset Sensors',
      'Manage Clients',
      'Manage Employees',
      'View Reports'
    ],
    'Lead Technician': [
      'Create Service Calls',
      'Complete Service Calls',
      'Reset Sensors',
      'Manage Clients'
    ],
    'Technician': [
      'Complete Service Calls',
      'Reset Sensors'
    ],
    'Supervisor': [
      'Create Service Calls',
      'Complete Service Calls',
      'Reset Sensors',
      'Manage Clients',
      'View Reports'
    ],
    'Specialist': [
      'Complete Service Calls',
      'Reset Sensors',
      'View Reports'
    ]
  }

  // Tab configuration
  const tabs = [
    { id: 'active', label: 'Current Active Employees', count: null },
    { id: 'pending', label: 'Pending Employee Invitations', count: 25 }
  ]

  // Expanded mock data for employees (50 entries for 5 pages)
  const employees = [
    { id: 1, firstName: 'Jake', lastName: 'Smith', address: '123 Main Street, Miami Beach, Florida 33181', phone: '(358)328-5091', role: 'Manager', status: 'active', hireDate: '2023-01-15' },
    { id: 2, firstName: 'Robert', lastName: 'Black', address: '456 Ocean Drive, Fort Lauderdale, Florida 33301', phone: '(351)426-5134', role: 'Technician', status: 'active', hireDate: '2023-03-20' },
    { id: 3, firstName: 'Mauricio', lastName: 'Cicone', address: '789 Palm Avenue, West Palm Beach, Florida 33401', phone: '(388)927-6290', role: 'Supervisor', status: 'active', hireDate: '2022-11-10' },
    { id: 4, firstName: 'Brad', lastName: 'Agustini', address: '1010 Sunset Boulevard, Miami, Florida 33133', phone: '(368)705-8267', role: 'Manager', status: 'active', hireDate: '2023-02-15' },
    { id: 5, firstName: 'John', lastName: 'Snow', address: '2020 Sunrise Boulevard, Fort Lauderdale, Florida 33304', phone: '(401)197-5564', role: 'Specialist', status: 'active', hireDate: '2022-08-20' },
    { id: 6, firstName: 'Emily', lastName: 'Martinez', address: '3030 Biscayne Boulevard, Miami, Florida 33137', phone: '(666)777-8888', role: 'Technician', status: 'active', hireDate: '2023-04-10' },
    { id: 7, firstName: 'James', lastName: 'Taylor', address: '4040 Collins Avenue, Miami Beach, Florida 33140', phone: '(777)888-9999', role: 'Manager', status: 'active', hireDate: '2022-12-05' },
    { id: 8, firstName: 'Maria', lastName: 'Garcia', address: '5050 Lincoln Road, Miami Beach, Florida 33139', phone: '(888)999-0000', role: 'Technician', status: 'active', hireDate: '2023-01-25' },
    { id: 9, firstName: 'Robert', lastName: 'Anderson', address: '6060 Washington Avenue, Miami Beach, Florida 33139', phone: '(999)000-1111', role: 'Technician', status: 'active', hireDate: '2023-03-15' },
    { id: 10, firstName: 'Jennifer', lastName: 'Thomas', address: '7070 Alton Road, Miami Beach, Florida 33140', phone: '(000)111-2222', role: 'Technician', status: 'active', hireDate: '2023-02-28' },
    { id: 11, firstName: 'Michael', lastName: 'Jackson', address: '8080 41st Street, Miami Beach, Florida 33140', phone: '(111)222-3333', role: 'Manager', status: 'active', hireDate: '2022-10-15' },
    { id: 12, firstName: 'Jessica', lastName: 'White', address: '9090 71st Street, Miami Beach, Florida 33141', phone: '(222)333-4444', role: 'Technician', status: 'active', hireDate: '2023-05-10' },
    { id: 13, firstName: 'Christopher', lastName: 'Harris', address: '1010 79th Street, Miami Beach, Florida 33141', phone: '(333)444-5555', role: 'Technician', status: 'active', hireDate: '2022-09-30' },
    { id: 14, firstName: 'Amanda', lastName: 'Martin', address: '2020 87th Street, Miami Beach, Florida 33141', phone: '(444)555-6666', role: 'Technician', status: 'active', hireDate: '2023-04-25' },
    { id: 15, firstName: 'Daniel', lastName: 'Thompson', address: '3030 95th Street, Miami Beach, Florida 33141', phone: '(555)666-7777', role: 'Technician', status: 'active', hireDate: '2023-01-10' },
    { id: 16, firstName: 'Nicole', lastName: 'Moore', address: '4040 103rd Street, Miami Beach, Florida 33141', phone: '(666)777-8888', role: 'Technician', status: 'active', hireDate: '2023-03-05' },
    { id: 17, firstName: 'Andrew', lastName: 'Clark', address: '5050 111th Street, Miami Beach, Florida 33141', phone: '(777)888-9999', role: 'Manager', status: 'active', hireDate: '2022-11-20' },
    { id: 18, firstName: 'Stephanie', lastName: 'Lewis', address: '6060 119th Street, Miami Beach, Florida 33141', phone: '(888)999-0000', role: 'Technician', status: 'active', hireDate: '2023-02-15' },
    { id: 19, firstName: 'Kevin', lastName: 'Lee', address: '7070 127th Street, Miami Beach, Florida 33141', phone: '(999)000-1111', role: 'Technician', status: 'active', hireDate: '2023-05-20' },
    { id: 20, firstName: 'Rachel', lastName: 'Walker', address: '8080 135th Street, Miami Beach, Florida 33141', phone: '(000)111-2222', role: 'Technician', status: 'active', hireDate: '2023-01-30' },
    { id: 21, firstName: 'Brandon', lastName: 'Hall', address: '9090 143rd Street, Miami Beach, Florida 33141', phone: '(111)222-3333', role: 'Technician', status: 'active', hireDate: '2022-12-10' },
    { id: 22, firstName: 'Lauren', lastName: 'Young', address: '1010 151st Street, Miami Beach, Florida 33141', phone: '(222)333-4444', role: 'Technician', status: 'active', hireDate: '2023-04-15' },
    { id: 23, firstName: 'Ryan', lastName: 'King', address: '2020 159th Street, Miami Beach, Florida 33141', phone: '(333)444-5555', role: 'Manager', status: 'active', hireDate: '2022-10-25' },
    { id: 24, firstName: 'Megan', lastName: 'Wright', address: '3030 167th Street, Miami Beach, Florida 33141', phone: '(444)555-6666', role: 'Technician', status: 'active', hireDate: '2023-03-30' },
    { id: 25, firstName: 'Nathan', lastName: 'Lopez', address: '4040 175th Street, Miami Beach, Florida 33141', phone: '(555)666-7777', role: 'Technician', status: 'active', hireDate: '2023-02-05' },
    { id: 26, firstName: 'Samantha', lastName: 'Hill', address: '5050 183rd Street, Miami Beach, Florida 33141', phone: '(666)777-8888', role: 'Technician', status: 'active', hireDate: '2023-05-05' },
    { id: 27, firstName: 'Jonathan', lastName: 'Scott', address: '6060 191st Street, Miami Beach, Florida 33141', phone: '(777)888-9999', role: 'Technician', status: 'active', hireDate: '2023-01-20' },
    { id: 28, firstName: 'Victoria', lastName: 'Green', address: '7070 199th Street, Miami Beach, Florida 33141', phone: '(888)999-0000', role: 'Technician', status: 'active', hireDate: '2022-09-15' },
    { id: 29, firstName: 'Derek', lastName: 'Adams', address: '8080 207th Street, Miami Beach, Florida 33141', phone: '(999)000-1111', role: 'Technician', status: 'active', hireDate: '2023-04-30' },
    { id: 30, firstName: 'Hannah', lastName: 'Baker', address: '9090 215th Street, Miami Beach, Florida 33141', phone: '(000)111-2222', role: 'Technician', status: 'active', hireDate: '2023-03-25' },
    { id: 31, firstName: 'Corey', lastName: 'Gonzalez', address: '1010 223rd Street, Miami Beach, Florida 33141', phone: '(111)222-3333', role: 'Manager', status: 'active', hireDate: '2022-11-05' },
    { id: 32, firstName: 'Amber', lastName: 'Nelson', address: '2020 231st Street, Miami Beach, Florida 33141', phone: '(222)333-4444', role: 'Technician', status: 'active', hireDate: '2023-02-20' },
    { id: 33, firstName: 'Travis', lastName: 'Carter', address: '3030 239th Street, Miami Beach, Florida 33141', phone: '(333)444-5555', role: 'Technician', status: 'active', hireDate: '2023-05-15' },
    { id: 34, firstName: 'Melissa', lastName: 'Mitchell', address: '4040 247th Street, Miami Beach, Florida 33141', phone: '(444)555-6666', role: 'Technician', status: 'active', hireDate: '2023-01-15' },
    { id: 35, firstName: 'Marcus', lastName: 'Perez', address: '5050 255th Street, Miami Beach, Florida 33141', phone: '(555)666-7777', role: 'Technician', status: 'active', hireDate: '2022-12-20' },
    { id: 36, firstName: 'Crystal', lastName: 'Roberts', address: '6060 263rd Street, Miami Beach, Florida 33141', phone: '(666)777-8888', role: 'Technician', status: 'active', hireDate: '2023-04-10' },
    { id: 37, firstName: 'Dustin', lastName: 'Turner', address: '7070 271st Street, Miami Beach, Florida 33141', phone: '(777)888-9999', role: 'Technician', status: 'active', hireDate: '2023-03-15' },
    { id: 38, firstName: 'Stacy', lastName: 'Phillips', address: '8080 279th Street, Miami Beach, Florida 33141', phone: '(888)999-0000', role: 'Technician', status: 'active', hireDate: '2023-02-25' },
    { id: 39, firstName: 'Lance', lastName: 'Campbell', address: '9090 287th Street, Miami Beach, Florida 33141', phone: '(999)000-1111', role: 'Manager', status: 'active', hireDate: '2022-10-10' },
    { id: 40, firstName: 'Tiffany', lastName: 'Parker', address: '1010 295th Street, Miami Beach, Florida 33141', phone: '(000)111-2222', role: 'Technician', status: 'active', hireDate: '2023-05-25' },
    { id: 41, firstName: 'Brent', lastName: 'Evans', address: '2020 303rd Street, Miami Beach, Florida 33141', phone: '(111)222-3333', role: 'Technician', status: 'active', hireDate: '2023-01-05' },
    { id: 42, firstName: 'Danielle', lastName: 'Edwards', address: '3030 311th Street, Miami Beach, Florida 33141', phone: '(222)333-4444', role: 'Technician', status: 'active', hireDate: '2023-04-20' },
    { id: 43, firstName: 'Gregory', lastName: 'Collins', address: '4040 319th Street, Miami Beach, Florida 33141', phone: '(333)444-5555', role: 'Technician', status: 'active', hireDate: '2023-03-10' },
    { id: 44, firstName: 'Lindsey', lastName: 'Stewart', address: '5050 327th Street, Miami Beach, Florida 33141', phone: '(444)555-6666', role: 'Technician', status: 'active', hireDate: '2022-11-30' },
    { id: 45, firstName: 'Troy', lastName: 'Morris', address: '6060 335th Street, Miami Beach, Florida 33141', phone: '(555)666-7777', role: 'Technician', status: 'active', hireDate: '2023-02-10' },
    { id: 46, firstName: 'Monica', lastName: 'Rogers', address: '7070 343rd Street, Miami Beach, Florida 33141', phone: '(666)777-8888', role: 'Technician', status: 'active', hireDate: '2023-05-30' },
    { id: 47, firstName: 'Derrick', lastName: 'Reed', address: '8080 351st Street, Miami Beach, Florida 33141', phone: '(777)888-9999', role: 'Manager', status: 'active', hireDate: '2022-12-15' },
    { id: 48, firstName: 'Stacy', lastName: 'Cox', address: '9090 359th Street, Miami Beach, Florida 33141', phone: '(888)999-0000', role: 'Technician', status: 'active', hireDate: '2023-01-25' },
    { id: 49, firstName: 'Wesley', lastName: 'Howard', address: '1010 367th Street, Miami Beach, Florida 33141', phone: '(999)000-1111', role: 'Technician', status: 'active', hireDate: '2023-04-05' },
    { id: 50, firstName: 'Tamara', lastName: 'Ward', address: '2020 375th Street, Miami Beach, Florida 33141', phone: '(000)111-2222', role: 'Technician', status: 'active', hireDate: '2023-03-20' }
  ]

  // Pending invitations data (expanded for pagination testing)
  const pendingInvitations = [
    { id: 1, firstName: 'Alex', lastName: 'Johnson', email: 'alex.johnson@email.com', role: 'Technician', invitedDate: '2023-07-15' },
    { id: 2, firstName: 'Sarah', lastName: 'Williams', email: 'sarah.williams@email.com', role: 'Manager', invitedDate: '2023-07-14' },
    { id: 3, firstName: 'Mike', lastName: 'Brown', email: 'mike.brown@email.com', role: 'Technician', invitedDate: '2023-07-13' },
    { id: 4, firstName: 'Lisa', lastName: 'Davis', email: 'lisa.davis@email.com', role: 'Supervisor', invitedDate: '2023-07-12' },
    { id: 5, firstName: 'David', lastName: 'Wilson', email: 'david.wilson@email.com', role: 'Technician', invitedDate: '2023-07-11' },
    { id: 6, firstName: 'Emma', lastName: 'Taylor', email: 'emma.taylor@email.com', role: 'Technician', invitedDate: '2023-07-10' },
    { id: 7, firstName: 'James', lastName: 'Anderson', email: 'james.anderson@email.com', role: 'Manager', invitedDate: '2023-07-09' },
    { id: 8, firstName: 'Sophia', lastName: 'Martinez', email: 'sophia.martinez@email.com', role: 'Technician', invitedDate: '2023-07-08' },
    { id: 9, firstName: 'William', lastName: 'Garcia', email: 'william.garcia@email.com', role: 'Supervisor', invitedDate: '2023-07-07' },
    { id: 10, firstName: 'Olivia', lastName: 'Rodriguez', email: 'olivia.rodriguez@email.com', role: 'Technician', invitedDate: '2023-07-06' },
    { id: 11, firstName: 'Benjamin', lastName: 'Lewis', email: 'benjamin.lewis@email.com', role: 'Technician', invitedDate: '2023-07-05' },
    { id: 12, firstName: 'Ava', lastName: 'Lee', email: 'ava.lee@email.com', role: 'Manager', invitedDate: '2023-07-04' },
    { id: 13, firstName: 'Lucas', lastName: 'Walker', email: 'lucas.walker@email.com', role: 'Technician', invitedDate: '2023-07-03' },
    { id: 14, firstName: 'Mia', lastName: 'Hall', email: 'mia.hall@email.com', role: 'Technician', invitedDate: '2023-07-02' },
    { id: 15, firstName: 'Mason', lastName: 'Young', email: 'mason.young@email.com', role: 'Supervisor', invitedDate: '2023-07-01' },
    { id: 16, firstName: 'Charlotte', lastName: 'King', email: 'charlotte.king@email.com', role: 'Technician', invitedDate: '2023-06-30' },
    { id: 17, firstName: 'Ethan', lastName: 'Wright', email: 'ethan.wright@email.com', role: 'Technician', invitedDate: '2023-06-29' },
    { id: 18, firstName: 'Amelia', lastName: 'Lopez', email: 'amelia.lopez@email.com', role: 'Manager', invitedDate: '2023-06-28' },
    { id: 19, firstName: 'Alexander', lastName: 'Hill', email: 'alexander.hill@email.com', role: 'Technician', invitedDate: '2023-06-27' },
    { id: 20, firstName: 'Harper', lastName: 'Scott', email: 'harper.scott@email.com', role: 'Technician', invitedDate: '2023-06-26' },
    { id: 21, firstName: 'Henry', lastName: 'Green', email: 'henry.green@email.com', role: 'Supervisor', invitedDate: '2023-06-25' },
    { id: 22, firstName: 'Evelyn', lastName: 'Adams', email: 'evelyn.adams@email.com', role: 'Technician', invitedDate: '2023-06-24' },
    { id: 23, firstName: 'Sebastian', lastName: 'Baker', email: 'sebastian.baker@email.com', role: 'Technician', invitedDate: '2023-06-23' },
    { id: 24, firstName: 'Abigail', lastName: 'Gonzalez', email: 'abigail.gonzalez@email.com', role: 'Manager', invitedDate: '2023-06-22' },
    { id: 25, firstName: 'Michael', lastName: 'Nelson', email: 'michael.nelson@email.com', role: 'Technician', invitedDate: '2023-06-21' }
  ]

  // Handle tab click
  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    setCurrentPage(1)
    setSearchTerm('')
  }

  // Get current data based on active tab
  const getCurrentData = () => {
    if (activeTab === 'active') {
      return employees
    } else if (activeTab === 'pending') {
      return pendingInvitations
    }
    return []
  }

  // Filter data based on search term and active tab
  const filteredData = getCurrentData().filter(item => {
    if (activeTab === 'active') {
      return item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
             item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
             item.role.toLowerCase().includes(searchTerm.toLowerCase())
    } else {
      return item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
             item.role.toLowerCase().includes(searchTerm.toLowerCase())
    }
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  // Generate suggestions for search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([])
      return
    }

    const currentDataForSuggestions = getCurrentData()
    const filtered = currentDataForSuggestions.filter(item => {
      if (activeTab === 'active') {
        return item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.role.toLowerCase().includes(searchTerm.toLowerCase())
      } else {
        return item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.role.toLowerCase().includes(searchTerm.toLowerCase())
      }
    }).slice(0, 5)

    setSuggestions(filtered)
  }, [searchTerm, activeTab])

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

  // Handle page change
  const handlePageChange = (newPage) => {
    setIsPageLoading(true)
    setTimeout(() => {
      setCurrentPage(newPage)
      setIsPageLoading(false)
    }, 300)
  }

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false)
        setSelectedSuggestion(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Tooltip positioning
  const handleTooltipPosition = (event) => {
    const iconWrapper = event.currentTarget
    
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
    
    const rect = iconWrapper.getBoundingClientRect()
    let left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2
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

  // Role tooltip functions
  const handleRoleHover = (event, role) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setRoleTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 8
    })
    setCurrentRole(role)
    setShowRoleTooltip(true)
  }

  const handleRoleHoverHide = () => {
    setShowRoleTooltip(false)
  }

  return (
    <div className="page">
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
            <span className="breadcrumb-current">Manage Employees</span>
          </li>
        </ul>
      </div>

      {/* Main Content Card */}
      <div className="dashboard-table-section">
        <div className="page-header-with-actions">
          <h1>Manage Employees</h1>
          <div className="header-actions">
            <button className="btn-manage-roles">
              Manage Employee Roles
            </button>
            <button className="btn-add-employee">
              Add A New Employee
            </button>
          </div>
        </div>
        
        <div className="tabs-section">
          <div className="tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
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
          <h2>
            {activeTab === 'active' && 'Current Active Employees'}
            {activeTab === 'pending' && 'Pending Employee Invitations'}
          </h2>
          <div className="search-wrapper">
            <div className="typeahead-wrapper" ref={dropdownRef}>
              <div className="search-input-container">
                <input 
                  ref={searchInputRef}
                  className="search-input" 
                  placeholder="Search employees..." 
                  aria-label="Search employees" 
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
                      <div className="suggestion-client">
                        {activeTab === 'active' ? suggestion.email : suggestion.email}
                      </div>
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
              <div className="loading-text">Loading employee data...</div>
            </div>
          ) : (
            <>
              <table className={`dashboard-table ${searchTerm.trim() !== '' ? 'compact-results' : ''}`}>
            <thead>
              <tr>
                    {activeTab === 'active' ? (
                      <>
                        <th>Employee Name</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>Employee Role</th>
                        <th>Actions</th>
                      </>
                    ) : (
                      <>
                        <th>Employee Name</th>
                <th>Email</th>
                <th>Role</th>
                        <th>Invited Date</th>
                <th>Actions</th>
                      </>
                    )}
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
                          <div className="skeleton-placeholder skeleton-name"></div>
                        </td>
                        <td>
                          <div className="skeleton-placeholder skeleton-action"></div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    // Actual data
                    currentData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.firstName} {item.lastName}</td>
                        {activeTab === 'active' ? (
                          <>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                            <td>
                              <span 
                                className="role-link"
                                onMouseEnter={(e) => handleRoleHover(e, item.role)}
                                onMouseLeave={handleRoleHoverHide}
                              >
                                {item.role}
                    </span>
                  </td>
                          </>
                        ) : (
                          <>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>{item.invitedDate}</td>
                          </>
                        )}
                        <td>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <div 
                              className="icon-wrapper" 
                              style={{ position: 'relative', display: 'inline-block' }}
                              title={activeTab === 'active' ? "Edit employee" : "Edit invitation"}
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
                              title={activeTab === 'active' ? "Delete employee" : "Delete invitation"}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <div className="pagination-info">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} {activeTab === 'active' ? 'employees' : 'invitations'}
            </div>
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isPageLoading}
              >
                ← Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                  disabled={isPageLoading}
                >
                  {page}
                </button>
              ))}
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isPageLoading}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Role Permissions Tooltip */}
      {showRoleTooltip && rolePermissions[currentRole] && (
        <div 
          className="role-tooltip"
          style={{
            left: `${roleTooltipPosition.x}px`,
            top: `${roleTooltipPosition.y}px`
          }}
        >
          <div className="role-tooltip-header">
            {currentRole} Permissions
          </div>
          <ul className="role-tooltip-list">
            {rolePermissions[currentRole].map((permission, index) => (
              <li key={index} className="role-tooltip-item">
                {permission}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ManageEmployees 