import React, { useState, useRef, useEffect } from 'react'
import './ManageServiceCalls.css'

const ManageServiceCalls = () => {
  const [activeTab, setActiveTab] = useState('required')
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const searchInputRef = useRef(null)
  const dropdownRef = useRef(null)

  // Service calls data for "Service Call Required" tab (50 entries for 5 pages)
  const [serviceCalls] = useState([
    {
      id: 1,
      address: '456 Ocean Drive, Fort Lauderdale, Florida 33301',
      clientName: 'Dennis Roberts',
      contactNumber: '(555) 104-3778',
      assignedSensor: 'Sensor #12346'
    },
    {
      id: 2,
      address: '789 Palm Avenue, West Palm Beach, Florida 33401',
      clientName: 'Jason Clark',
      contactNumber: '(555) 151-9853',
      assignedSensor: 'Sensor #12347'
    },
    {
      id: 3,
      address: '1010 Sunset Boulevard, Miami, Florida 33133',
      clientName: 'Mark Martinez',
      contactNumber: '(555) 630-7774',
      assignedSensor: 'Sensor #12348'
    },
    {
      id: 4,
      address: '5050 Collins Avenue, Miami Beach, Florida 33140',
      clientName: 'Matthew Garcia',
      contactNumber: '(555) 373-2216',
      assignedSensor: 'Sensor #12352'
    },
    {
      id: 5,
      address: '4444 20th Street, Miami Beach, Florida 33139',
      clientName: 'Roy Perez',
      contactNumber: '(555) 809-5172',
      assignedSensor: 'Sensor #12360'
    },
    {
      id: 6,
      address: '5555 25th Street, Miami Beach, Florida 33140',
      clientName: 'Jake Smith',
      contactNumber: '(555) 131-5135',
      assignedSensor: 'Sensor #12361'
    },
    {
      id: 7,
      address: '6666 30th Street, Miami Beach, Florida 33140',
      clientName: 'Joshua White',
      contactNumber: '(555) 954-6303',
      assignedSensor: 'Sensor #12362'
    },
    {
      id: 8,
      address: '7777 35th Street, Miami Beach, Florida 33140',
      clientName: 'Jake Smith',
      contactNumber: '(555) 904-5354',
      assignedSensor: 'Sensor #12363'
    },
    {
      id: 9,
      address: '123 Main Street, Miami Beach, Florida 33181',
      clientName: 'George Garcia',
      contactNumber: '(555) 306-8401',
      assignedSensor: 'Sensor #12365'
    },
    {
      id: 10,
      address: '3030 Coral Way, Coral Gables, Florida 33134',
      clientName: 'Nicholas Allen',
      contactNumber: '(555) 286-7511',
      assignedSensor: 'Sensor #12370'
    },
    {
      id: 11,
      address: '4040 Biscayne Boulevard, Miami, Florida 33137',
      clientName: 'Brad Agustini',
      contactNumber: '(555) 456-7890',
      assignedSensor: 'Sensor #12371'
    },
    {
      id: 12,
      address: '6060 Lincoln Road, Miami Beach, Florida 33139',
      clientName: 'Michael Johnson',
      contactNumber: '(555) 234-5678',
      assignedSensor: 'Sensor #12372'
    },
    {
      id: 13,
      address: '7070 Washington Avenue, Miami Beach, Florida 33139',
      clientName: 'David Wilson',
      contactNumber: '(555) 345-6789',
      assignedSensor: 'Sensor #12373'
    },
    {
      id: 14,
      address: '8080 Alton Road, Miami Beach, Florida 33139',
      clientName: 'Sarah Martinez',
      contactNumber: '(555) 456-7890',
      assignedSensor: 'Sensor #12374'
    },
    {
      id: 15,
      address: '9090 Meridian Avenue, Miami Beach, Florida 33139',
      clientName: 'Carlos Rodriguez',
      contactNumber: '(555) 567-8901',
      assignedSensor: 'Sensor #12375'
    },
    {
      id: 16,
      address: '1111 Venetian Causeway, Miami, Florida 33139',
      clientName: 'Maria Garcia',
      contactNumber: '(555) 678-9012',
      assignedSensor: 'Sensor #12376'
    },
    {
      id: 17,
      address: '2222 MacArthur Causeway, Miami, Florida 33139',
      clientName: 'James Brown',
      contactNumber: '(555) 789-0123',
      assignedSensor: 'Sensor #12377'
    },
    {
      id: 18,
      address: '3333 Julia Tuttle Causeway, Miami, Florida 33139',
      clientName: 'Lisa Anderson',
      contactNumber: '(555) 890-1234',
      assignedSensor: 'Sensor #12378'
    },
    {
      id: 19,
      address: '4444 Rickenbacker Causeway, Miami, Florida 33139',
      clientName: 'Robert Taylor',
      contactNumber: '(555) 901-2345',
      assignedSensor: 'Sensor #12379'
    },
    {
      id: 20,
      address: '5555 William Lehman Causeway, Miami, Florida 33139',
      clientName: 'Jennifer Davis',
      contactNumber: '(555) 012-3456',
      assignedSensor: 'Sensor #12380'
    },
    {
      id: 21,
      address: '6666 Broad Causeway, Miami, Florida 33139',
      clientName: 'Christopher Wilson',
      contactNumber: '(555) 123-4567',
      assignedSensor: 'Sensor #12381'
    },
    {
      id: 22,
      address: '7777 79th Street Causeway, Miami, Florida 33139',
      clientName: 'Amanda Thompson',
      contactNumber: '(555) 234-5678',
      assignedSensor: 'Sensor #12382'
    },
    {
      id: 23,
      address: '8888 163rd Street, North Miami Beach, Florida 33162',
      clientName: 'Daniel Moore',
      contactNumber: '(555) 345-6789',
      assignedSensor: 'Sensor #12383'
    },
    {
      id: 24,
      address: '9999 167th Street, North Miami Beach, Florida 33162',
      clientName: 'Jessica Lee',
      contactNumber: '(555) 456-7890',
      assignedSensor: 'Sensor #12384'
    },
    {
      id: 25,
      address: '11111 183rd Street, Aventura, Florida 33180',
      clientName: 'Matthew White',
      contactNumber: '(555) 567-8901',
      assignedSensor: 'Sensor #12385'
    },
    {
      id: 26,
      address: '22222 195th Street, Aventura, Florida 33180',
      clientName: 'Nicole Harris',
      contactNumber: '(555) 678-9012',
      assignedSensor: 'Sensor #12386'
    },
    {
      id: 27,
      address: '33333 199th Street, Aventura, Florida 33180',
      clientName: 'Andrew Clark',
      contactNumber: '(555) 789-0123',
      assignedSensor: 'Sensor #12387'
    },
    {
      id: 28,
      address: '44444 203rd Street, Aventura, Florida 33180',
      clientName: 'Stephanie Lewis',
      contactNumber: '(555) 890-1234',
      assignedSensor: 'Sensor #12388'
    },
    {
      id: 29,
      address: '55555 207th Street, Aventura, Florida 33180',
      clientName: 'Kevin Hall',
      contactNumber: '(555) 901-2345',
      assignedSensor: 'Sensor #12389'
    },
    {
      id: 30,
      address: '66666 211th Street, Aventura, Florida 33180',
      clientName: 'Rachel Young',
      contactNumber: '(555) 012-3456',
      assignedSensor: 'Sensor #12390'
    },
    {
      id: 31,
      address: '77777 215th Street, Aventura, Florida 33180',
      clientName: 'Brandon King',
      contactNumber: '(555) 123-4567',
      assignedSensor: 'Sensor #12391'
    },
    {
      id: 32,
      address: '88888 219th Street, Aventura, Florida 33180',
      clientName: 'Lauren Scott',
      contactNumber: '(555) 234-5678',
      assignedSensor: 'Sensor #12392'
    },
    {
      id: 33,
      address: '99999 223rd Street, Aventura, Florida 33180',
      clientName: 'Ryan Green',
      contactNumber: '(555) 345-6789',
      assignedSensor: 'Sensor #12393'
    },
    {
      id: 34,
      address: '111111 227th Street, Aventura, Florida 33180',
      clientName: 'Megan Baker',
      contactNumber: '(555) 456-7890',
      assignedSensor: 'Sensor #12394'
    },
    {
      id: 35,
      address: '222222 231st Street, Aventura, Florida 33180',
      clientName: 'Tyler Adams',
      contactNumber: '(555) 567-8901',
      assignedSensor: 'Sensor #12395'
    },
    {
      id: 36,
      address: '333333 235th Street, Aventura, Florida 33180',
      clientName: 'Ashley Nelson',
      contactNumber: '(555) 678-9012',
      assignedSensor: 'Sensor #12396'
    },
    {
      id: 37,
      address: '444444 239th Street, Aventura, Florida 33180',
      clientName: 'Joshua Carter',
      contactNumber: '(555) 789-0123',
      assignedSensor: 'Sensor #12397'
    },
    {
      id: 38,
      address: '555555 243rd Street, Aventura, Florida 33180',
      clientName: 'Brittany Mitchell',
      contactNumber: '(555) 890-1234',
      assignedSensor: 'Sensor #12398'
    },
    {
      id: 39,
      address: '666666 247th Street, Aventura, Florida 33180',
      clientName: 'Nathan Perez',
      contactNumber: '(555) 901-2345',
      assignedSensor: 'Sensor #12399'
    },
    {
      id: 40,
      address: '777777 251st Street, Aventura, Florida 33180',
      clientName: 'Samantha Roberts',
      contactNumber: '(555) 012-3456',
      assignedSensor: 'Sensor #12400'
    },
    {
      id: 41,
      address: '888888 255th Street, Aventura, Florida 33180',
      clientName: 'Jonathan Turner',
      contactNumber: '(555) 123-4567',
      assignedSensor: 'Sensor #12401'
    },
    {
      id: 42,
      address: '999999 259th Street, Aventura, Florida 33180',
      clientName: 'Victoria Phillips',
      contactNumber: '(555) 234-5678',
      assignedSensor: 'Sensor #12402'
    },
    {
      id: 43,
      address: '1111111 263rd Street, Aventura, Florida 33180',
      clientName: 'Derek Campbell',
      contactNumber: '(555) 345-6789',
      assignedSensor: 'Sensor #12403'
    },
    {
      id: 44,
      address: '2222222 267th Street, Aventura, Florida 33180',
      clientName: 'Hannah Parker',
      contactNumber: '(555) 456-7890',
      assignedSensor: 'Sensor #12404'
    },
    {
      id: 45,
      address: '3333333 271st Street, Aventura, Florida 33180',
      clientName: 'Corey Evans',
      contactNumber: '(555) 567-8901',
      assignedSensor: 'Sensor #12405'
    },
    {
      id: 46,
      address: '4444444 275th Street, Aventura, Florida 33180',
      clientName: 'Amber Edwards',
      contactNumber: '(555) 678-9012',
      assignedSensor: 'Sensor #12406'
    },
    {
      id: 47,
      address: '5555555 279th Street, Aventura, Florida 33180',
      clientName: 'Travis Collins',
      contactNumber: '(555) 789-0123',
      assignedSensor: 'Sensor #12407'
    },
    {
      id: 48,
      address: '6666666 283rd Street, Aventura, Florida 33180',
      clientName: 'Melissa Stewart',
      contactNumber: '(555) 890-1234',
      assignedSensor: 'Sensor #12408'
    },
    {
      id: 49,
      address: '7777777 287th Street, Aventura, Florida 33180',
      clientName: 'Marcus Morris',
      contactNumber: '(555) 901-2345',
      assignedSensor: 'Sensor #12409'
    },
    {
      id: 50,
      address: '8888888 291st Street, Aventura, Florida 33180',
      clientName: 'Crystal Rogers',
      contactNumber: '(555) 012-3456',
      assignedSensor: 'Sensor #12410'
    }
  ])

  // My Service Calls data
  const [myServiceCalls] = useState([
    {
      id: 1,
      address: '3030 Coral Way, Coral Gables, Florida 33134',
      clientName: 'Roy Perez',
      contactNumber: '(555) 897-6280',
      assignedSensor: 'Sensor #12350',
      priority: 'Open'
    },
    {
      id: 2,
      address: '9090 Meridian Avenue, Miami Beach, Florida 33139',
      clientName: 'Eric Young',
      contactNumber: '(555) 468-2575',
      assignedSensor: 'Sensor #12356',
      priority: 'In Progress'
    },
    {
      id: 3,
      address: '5555 25th Street, Miami Beach, Florida 33140',
      clientName: 'Ronald Robinson',
      contactNumber: '(555) 636-9397',
      assignedSensor: 'Sensor #12361',
      priority: 'In Progress'
    },
    {
      id: 4,
      address: '6666 30th Street, Miami Beach, Florida 33140',
      clientName: 'Patrick Gonzalez',
      contactNumber: '(555) 696-7040',
      assignedSensor: 'Sensor #12362',
      priority: 'Open'
    },
    {
      id: 5,
      address: '8888 40th Street, Miami Beach, Florida 33140',
      clientName: 'Edward Rodriguez',
      contactNumber: '(555) 957-8672',
      assignedSensor: 'Sensor #12364',
      priority: 'In Progress'
    },
    {
      id: 6,
      address: '789 Palm Avenue, West Palm Beach, Florida 33401',
      clientName: 'Donald Anderson',
      contactNumber: '(555) 834-5313',
      assignedSensor: 'Sensor #12367',
      priority: 'Open'
    },
    {
      id: 7,
      address: '1010 Sunset Boulevard, Miami, Florida 33133',
      clientName: 'Edward Rodriguez',
      contactNumber: '(555) 201-4564',
      assignedSensor: 'Sensor #12368',
      priority: 'In Progress'
    },
    {
      id: 8,
      address: '3030 Coral Way, Coral Gables, Florida 33134',
      clientName: 'Jeffrey Lewis',
      contactNumber: '(555) 805-5071',
      assignedSensor: 'Sensor #12370',
      priority: 'In Progress'
    },
    {
      id: 9,
      address: '4040 Biscayne Boulevard, Miami, Florida 33137',
      clientName: 'Raymond Green',
      contactNumber: '(555) 602-7066',
      assignedSensor: 'Sensor #12371',
      priority: 'In Progress'
    },
    {
      id: 10,
      address: '9090 Meridian Avenue, Miami Beach, Florida 33139',
      clientName: 'Thomas Aguilar',
      contactNumber: '(555) 237-3622',
      assignedSensor: 'Sensor #12376',
      priority: 'In Progress'
    }
  ])

  // Service Call History data
  const [serviceCallHistory] = useState([
    {
      id: 1,
      address: '6666 30th Street, Miami Beach, Florida 33140',
      clientName: 'Christopher Davis',
      contactNumber: '(555) 218-1280',
      assignedSensor: 'Sensor #12362',
      priority: 'Closed'
    },
    {
      id: 2,
      address: '7777 35th Street, Miami Beach, Florida 33140',
      clientName: 'Jennifer Wilson',
      contactNumber: '(555) 345-6789',
      assignedSensor: 'Sensor #12363',
      priority: 'Closed'
    },
    {
      id: 3,
      address: '8888 40th Street, Miami Beach, Florida 33140',
      clientName: 'Michael Brown',
      contactNumber: '(555) 456-7890',
      assignedSensor: 'Sensor #12364',
      priority: 'Closed'
    },
    {
      id: 4,
      address: '9999 45th Street, Miami Beach, Florida 33140',
      clientName: 'Sarah Johnson',
      contactNumber: '(555) 567-8901',
      assignedSensor: 'Sensor #12365',
      priority: 'Closed'
    },
    {
      id: 5,
      address: '1111 50th Street, Miami Beach, Florida 33140',
      clientName: 'David Miller',
      contactNumber: '(555) 678-9012',
      assignedSensor: 'Sensor #12366',
      priority: 'Closed'
    }
  ])

  // Cancelled Service Calls data
  const [cancelledServiceCalls] = useState([
    {
      id: 1,
      address: '123 Main Street, Miami Beach, Florida 33181',
      cancellationDate: '01/15/2024',
      reason: 'Client Requested Reschedule',
      cancellationNote: 'Client called to reschedule due to personal emergency. New appointment scheduled for next week.'
    },
    {
      id: 2,
      address: '456 Ocean Drive, Fort Lauderdale, Florida 33301',
      cancellationDate: '01/14/2024',
      reason: 'Weather Conditions',
      cancellationNote: 'Heavy rain and flooding in area. Service postponed until weather improves. Client notified and understanding.'
    },
    {
      id: 3,
      address: '789 Palm Avenue, West Palm Beach, Florida 33401',
      cancellationDate: '01/13/2024',
      reason: 'Technician Unavailable',
      cancellationNote: 'Primary technician called out sick. Backup technician assigned but requires additional time for travel.'
    },
    {
      id: 4,
      address: '1010 Sunset Boulevard, Miami, Florida 33133',
      cancellationDate: '01/12/2024',
      reason: 'Equipment Maintenance',
      cancellationNote: 'Required diagnostic equipment undergoing scheduled maintenance. Service rescheduled for following day.'
    },
    {
      id: 5,
      address: '2020 Sunrise Boulevard, Fort Lauderdale, Florida 33304',
      cancellationDate: '12/02/2024',
      reason: 'Emergency Call Priority',
      cancellationNote: 'Emergency service call took priority. Client understanding and agreed to reschedule. Sensor monitoring continues with no immediate concerns detected.'
    }
  ])

  const tabs = [
    { id: 'required', label: 'Service Call Required', count: 8, color: 'purple' },
    { id: 'my-calls', label: 'My Service Calls', count: 15, color: 'red' },
    { id: 'history', label: 'Service Call History', count: null, color: 'grey' },
    { id: 'cancelled', label: 'Cancelled Service Calls', count: null, color: 'grey' }
  ]

  // Handle tab navigation - single page behavior
  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    setCurrentPage(1) // Reset to first page when switching tabs
    setSearchTerm('') // Clear search when switching tabs
    setShowSuggestions(false)
  }

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case 'required':
        return serviceCalls
      case 'my-calls':
        return myServiceCalls
      case 'history':
        return serviceCallHistory
      case 'cancelled':
        return cancelledServiceCalls
      default:
        return serviceCalls
    }
  }

  // Filter data based on search term and active tab
  const filteredData = getCurrentData().filter(call =>
    call.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const filtered = getCurrentData().filter(call =>
      call.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5) // Limit to 5 suggestions

    setSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
    setSelectedSuggestion(-1)
  }, [searchTerm, activeTab])

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
            <span className="breadcrumb-current">Manage Service Calls</span>
          </li>
        </ul>
      </div>

      {/* Main Content Card */}
      <div className="dashboard-table-section">
        <h1>Manage Service Calls</h1>
        
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
            {activeTab === 'required' && 'Addresses Requiring a Service Call'}
            {activeTab === 'my-calls' && 'My Service Calls'}
            {activeTab === 'history' && 'Service Call History'}
            {activeTab === 'cancelled' && 'Cancelled Service Calls'}
          </h2>
          <div className="search-wrapper">
            <div className="typeahead-wrapper" ref={dropdownRef}>
              <div className="search-input-container">
                <input
                  ref={searchInputRef}
                  className="search-input"
                  placeholder="Search Address"
                  aria-label="Search Address"
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
                      <div className="suggestion-client">{suggestion.clientName}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="table-container" style={{ position: 'relative' }}>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Address</th>
                {(activeTab === 'my-calls' || activeTab === 'history') && <th>Priority</th>}
                {activeTab !== 'cancelled' && <th>Client Name</th>}
                {activeTab !== 'cancelled' && <th>Contact Number</th>}
                {(activeTab === 'required' || activeTab === 'my-calls' || activeTab === 'history') && (
                  <th>
                    Assigned Sensor
                    <div className="info-icon-wrapper" style={{ position: 'relative', display: 'inline-block', marginLeft: '6px' }}>
                      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle' }}>
                        <path d="M6.56 6C6.71673 5.55445 7.0261 5.17874 7.4333 4.93942C7.8405 4.70011 8.31926 4.61263 8.78478 4.69248C9.2503 4.77233 9.67254 5.01435 9.97671 5.37569C10.2809 5.73702 10.4474 6.19435 10.4467 6.66667C10.4467 8 8.44666 8.66667 8.44666 8.66667M8.5 11.3333H8.50666M15.1667 8C15.1667 11.6819 12.1819 14.6667 8.5 14.6667C4.8181 14.6667 1.83333 11.6819 1.83333 8C1.83333 4.3181 4.8181 1.33334 8.5 1.33334C12.1819 1.33334 15.1667 4.3181 15.1667 8Z" stroke="#98A2B3" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                  </th>
                )}
                {activeTab === 'cancelled' && <th>Cancellation Date</th>}
                {activeTab === 'cancelled' && <th>Reason</th>}
                {activeTab === 'cancelled' && <th>Cancellation Note</th>}
                {activeTab !== 'cancelled' && <th>Actions</th>}
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
                    {(activeTab === 'my-calls' || activeTab === 'history') && (
                      <td>
                        <div className="skeleton-placeholder skeleton-priority"></div>
                      </td>
                    )}
                    {activeTab !== 'cancelled' && (
                      <td>
                        <div className="skeleton-placeholder skeleton-name"></div>
                      </td>
                    )}
                    {activeTab !== 'cancelled' && (
                      <td>
                        <div className="skeleton-placeholder skeleton-phone"></div>
                      </td>
                    )}
                    {(activeTab === 'required' || activeTab === 'my-calls' || activeTab === 'history') && (
                      <td>
                        <div className="skeleton-placeholder skeleton-sensor"></div>
                      </td>
                    )}
                    {activeTab === 'cancelled' && (
                      <>
                        <td>
                          <div className="skeleton-placeholder skeleton-date"></div>
                        </td>
                        <td>
                          <div className="skeleton-placeholder skeleton-reason"></div>
                        </td>
                        <td>
                          <div className="skeleton-placeholder skeleton-cancellation-note"></div>
                        </td>
                      </>
                    )}
                    {activeTab !== 'cancelled' && (
                      <td>
                        <div className="skeleton-placeholder skeleton-action"></div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                // Actual data
                currentData.map((call) => (
                  <tr key={call.id}>
                    <td>{call.address}</td>
                    {(activeTab === 'my-calls' || activeTab === 'history') && (
                      <td>
                        <span className={`priority-badge priority-${call.priority.toLowerCase().replace(' ', '-')}`}>
                          {call.priority}
                        </span>
                      </td>
                    )}
                    {activeTab !== 'cancelled' && <td>{call.clientName}</td>}
                    {activeTab !== 'cancelled' && <td>{call.contactNumber}</td>}
                    {(activeTab === 'required' || activeTab === 'my-calls' || activeTab === 'history') && <td>{call.assignedSensor}</td>}
                    {activeTab === 'cancelled' && <td>{call.cancellationDate}</td>}
                    {activeTab === 'cancelled' && <td>{call.reason}</td>}
                    {activeTab === 'cancelled' && <td>{call.cancellationNote}</td>}
                    {activeTab !== 'cancelled' && (
                      <td>
                        <div 
                          className="icon-wrapper" 
                          style={{ position: 'relative', display: 'inline-block' }}
                          title={
                            activeTab === 'my-calls' ? 'Edit service call details' :
                            activeTab === 'history' ? 'View Details' :
                            'Create Service Call'
                          }
                          onMouseEnter={handleTooltipPosition}
                          onMouseLeave={handleTooltipHide}
                        >
                          {activeTab === 'my-calls' ? (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon action">
                              <path d="M13.0261 6.3595C12.6961 6.02948 12.5311 5.86447 12.4693 5.6742C12.4149 5.50683 12.4149 5.32654 12.4693 5.15917C12.5311 4.9689 12.6961 4.80389 13.0261 4.47388L15.3914 2.10857C14.7638 1.82471 14.067 1.66669 13.3333 1.66669C10.5719 1.66669 8.33333 3.90526 8.33333 6.66669C8.33333 7.07589 8.38248 7.47361 8.47521 7.85426C8.57451 8.26189 8.62416 8.4657 8.61535 8.59446C8.60612 8.72926 8.58602 8.80098 8.52386 8.92095C8.46448 9.03554 8.35071 9.14931 8.12318 9.37684L2.91666 14.5834C2.22631 15.2737 2.22631 16.393 2.91666 17.0834C3.60702 17.7737 4.72631 17.7737 5.41666 17.0834L10.6232 11.8768C10.8507 11.6493 10.9645 11.5355 11.0791 11.4762C11.199 11.414 11.2708 11.3939 11.4056 11.3847C11.5343 11.3759 11.7381 11.4255 12.1458 11.5248C12.5264 11.6175 12.9241 11.6667 13.3333 11.6667C16.0948 11.6667 18.3333 9.42811 18.3333 6.66669C18.3333 5.93301 18.1753 5.23625 17.8914 4.60857L15.5261 6.97388C15.1961 7.30389 15.0311 7.4689 14.8408 7.53072C14.6735 7.5851 14.4932 7.5851 14.3258 7.53072C14.1355 7.4689 13.9705 7.30389 13.6405 6.97388L13.0261 6.3595Z" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          ) : activeTab === 'history' ? (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon action">
                              <path d="M2.01677 10.5944C1.90328 10.4147 1.84654 10.3248 1.81477 10.1863C1.79091 10.0822 1.79091 9.918 1.81477 9.8139C1.84654 9.67532 1.90328 9.58547 2.01677 9.40577C2.95461 7.92078 5.74617 4.16675 10.0003 4.16675C14.2545 4.16675 17.0461 7.92078 17.9839 9.40577C18.0974 9.58547 18.1541 9.67532 18.1859 9.8139C18.2098 9.918 18.2098 10.0822 18.1859 10.1863C18.1541 10.3248 18.0974 10.4147 17.9839 10.5944C17.0461 12.0794 14.2545 15.8334 10.0003 15.8334C5.74617 15.8334 2.95461 12.0794 2.01677 10.5944Z" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M10.0003 12.5001C11.381 12.5001 12.5003 11.3808 12.5003 10.0001C12.5003 8.61937 11.381 7.50008 10.0003 7.50008C8.61962 7.50008 7.50034 8.61937 7.50034 10.0001C7.50034 11.3808 8.61962 12.5001 10.0003 12.5001Z" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon action">
                              <path d="M17.5 9.58334V7.33334C17.5 5.93321 17.5 5.23314 17.2275 4.69836C16.9878 4.22796 16.6054 3.84551 16.135 3.60582C15.6002 3.33334 14.9001 3.33334 13.5 3.33334H6.5C5.09987 3.33334 4.3998 3.33334 3.86502 3.60582C3.39462 3.84551 3.01217 4.22796 2.77248 4.69836C2.5 5.23314 2.5 5.93321 2.5 7.33334V14.3333C2.5 15.7335 2.5 16.4335 2.77248 16.9683C3.01217 17.4387 3.39462 17.8212 3.86502 18.0609C4.3998 18.3333 5.09987 18.3333 6.5 18.3333H10.4167M17.5 8.33334H2.5M13.3333 1.66667V5.00001M6.66667 1.66667V5.00001M15 17.5V12.5M12.5 15H17.5" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          )}
                        </div>
                      </td>
                    )}
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

        </div>

        <div className="pagination-container">
          <div className="pagination-info">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
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

export default ManageServiceCalls 