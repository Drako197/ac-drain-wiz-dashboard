import React, { useState, useRef, useEffect } from 'react';
import './Dashboard.css';
import Pagination from '../components/Pagination';
import DashboardClientCard from '../components/DashboardClientCard';
import useMobileDetection from '../hooks/useMobileDetection';

const Dashboard = ({ onShowOnboarding, onboardingCompleted }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [contractorName, setContractorName] = useState('Acme HVAC and Cooling');
  const [contractorEmail, setContractorEmail] = useState('ariddle@acdrainwiz.com');
  const [firstName, setFirstName] = useState('Diana');
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateContractorInfo = () => {
      const storedContractorName = localStorage.getItem('acdrainwiz_contractor_name');
      if (storedContractorName && storedContractorName.trim()) {
        setContractorName(storedContractorName.trim());
      }
      
      const storedContractorEmail = localStorage.getItem('acdrainwiz_contractor_email');
      if (storedContractorEmail && storedContractorEmail.trim()) {
        setContractorEmail(storedContractorEmail.trim());
      }
      
      const storedFullName = localStorage.getItem('acdrainwiz_full_name');
      if (storedFullName && storedFullName.trim()) {
        const nameParts = storedFullName.trim().split(' ');
        const firstName = nameParts[0] || 'Diana';
        setFirstName(firstName);
      }
    };

    // Update immediately
    updateContractorInfo();

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'acdrainwiz_contractor_name' || 
          e.key === 'acdrainwiz_contractor_email' || 
          e.key === 'acdrainwiz_full_name') {
        updateContractorInfo();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events
    const handleOnboardingComplete = () => {
      updateContractorInfo();
    };
    
    window.addEventListener('onboardingCompleted', handleOnboardingComplete);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('onboardingCompleted', handleOnboardingComplete);
    };
  }, [onboardingCompleted]);

  // Expanded mock data for demonstration (100 entries for 10 pages)
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
    { id: 11, address: '8080 Alton Road, Miami Beach, Florida 33139', clientName: 'Sarah Martinez' },
    { id: 12, address: '9090 Meridian Avenue, Miami Beach, Florida 33139', clientName: 'Carlos Rodriguez' },
    { id: 13, address: '1111 Venetian Causeway, Miami, Florida 33139', clientName: 'Maria Garcia' },
    { id: 14, address: '2222 MacArthur Causeway, Miami, Florida 33139', clientName: 'James Brown' },
    { id: 15, address: '3333 Julia Tuttle Causeway, Miami, Florida 33139', clientName: 'Lisa Anderson' },
    { id: 16, address: '4444 Rickenbacker Causeway, Miami, Florida 33139', clientName: 'Robert Taylor' },
    { id: 17, address: '5555 William Lehman Causeway, Miami, Florida 33139', clientName: 'Jennifer Davis' },
    { id: 18, address: '6666 Broad Causeway, Miami, Florida 33139', clientName: 'Christopher Wilson' },
    { id: 19, address: '7777 79th Street Causeway, Miami, Florida 33139', clientName: 'Amanda Thompson' },
    { id: 20, address: '8888 163rd Street, North Miami Beach, Florida 33162', clientName: 'Daniel Moore' },
    { id: 21, address: '9999 167th Street, North Miami Beach, Florida 33162', clientName: 'Jessica Lee' },
    { id: 22, address: '11111 183rd Street, Aventura, Florida 33180', clientName: 'Matthew White' },
    { id: 23, address: '22222 195th Street, Aventura, Florida 33180', clientName: 'Nicole Harris' },
    { id: 24, address: '33333 199th Street, Aventura, Florida 33180', clientName: 'Andrew Clark' },
    { id: 25, address: '44444 203rd Street, Aventura, Florida 33180', clientName: 'Stephanie Lewis' },
    { id: 26, address: '55555 207th Street, Aventura, Florida 33180', clientName: 'Kevin Hall' },
    { id: 27, address: '66666 211th Street, Aventura, Florida 33180', clientName: 'Rachel Young' },
    { id: 28, address: '77777 215th Street, Aventura, Florida 33180', clientName: 'Brandon King' },
    { id: 29, address: '88888 219th Street, Aventura, Florida 33180', clientName: 'Lauren Scott' },
    { id: 30, address: '99999 223rd Street, Aventura, Florida 33180', clientName: 'Ryan Green' },
    { id: 31, address: '111111 227th Street, Aventura, Florida 33180', clientName: 'Megan Baker' },
    { id: 32, address: '222222 231st Street, Aventura, Florida 33180', clientName: 'Tyler Adams' },
    { id: 33, address: '333333 235th Street, Aventura, Florida 33180', clientName: 'Ashley Nelson' },
    { id: 34, address: '444444 239th Street, Aventura, Florida 33180', clientName: 'Joshua Carter' },
    { id: 35, address: '555555 243rd Street, Aventura, Florida 33180', clientName: 'Brittany Mitchell' },
    { id: 36, address: '666666 247th Street, Aventura, Florida 33180', clientName: 'Nathan Perez' },
    { id: 37, address: '777777 251st Street, Aventura, Florida 33180', clientName: 'Samantha Roberts' },
    { id: 38, address: '888888 255th Street, Aventura, Florida 33180', clientName: 'Jonathan Turner' },
    { id: 39, address: '999999 259th Street, Aventura, Florida 33180', clientName: 'Victoria Phillips' },
    { id: 40, address: '1111111 263rd Street, Aventura, Florida 33180', clientName: 'Derek Campbell' },
    { id: 41, address: '2222222 267th Street, Aventura, Florida 33180', clientName: 'Hannah Parker' },
    { id: 42, address: '3333333 271st Street, Aventura, Florida 33180', clientName: 'Corey Evans' },
    { id: 43, address: '4444444 275th Street, Aventura, Florida 33180', clientName: 'Amber Edwards' },
    { id: 44, address: '5555555 279th Street, Aventura, Florida 33180', clientName: 'Travis Collins' },
    { id: 45, address: '6666666 283rd Street, Aventura, Florida 33180', clientName: 'Melissa Stewart' },
    { id: 46, address: '7777777 287th Street, Aventura, Florida 33180', clientName: 'Marcus Morris' },
    { id: 47, address: '8888888 291st Street, Aventura, Florida 33180', clientName: 'Crystal Rogers' },
    { id: 48, address: '9999999 295th Street, Aventura, Florida 33180', clientName: 'Dustin Reed' },
    { id: 49, address: '11111111 299th Street, Aventura, Florida 33180', clientName: 'Tiffany Cook' },
    { id: 50, address: '22222222 303rd Street, Aventura, Florida 33180', clientName: 'Brent Morgan' },
    { id: 51, address: '33333333 307th Street, Aventura, Florida 33180', clientName: 'Danielle Bell' },
    { id: 52, address: '44444444 311th Street, Aventura, Florida 33180', clientName: 'Gregory Murphy' },
    { id: 53, address: '55555555 315th Street, Aventura, Florida 33180', clientName: 'Lindsey Bailey' },
    { id: 54, address: '66666666 319th Street, Aventura, Florida 33180', clientName: 'Troy Rivera' },
    { id: 55, address: '77777777 323rd Street, Aventura, Florida 33180', clientName: 'Monica Cooper' },
    { id: 56, address: '88888888 327th Street, Aventura, Florida 33180', clientName: 'Derrick Richardson' },
    { id: 57, address: '99999999 331st Street, Aventura, Florida 33180', clientName: 'Stacy Cox' },
    { id: 58, address: '111111111 335th Street, Aventura, Florida 33180', clientName: 'Lance Howard' },
    { id: 59, address: '222222222 339th Street, Aventura, Florida 33180', clientName: 'Tracy Ward' },
    { id: 60, address: '333333333 343rd Street, Aventura, Florida 33180', clientName: 'Wesley Torres' },
    { id: 61, address: '444444444 347th Street, Aventura, Florida 33180', clientName: 'Tamara Peterson' },
    { id: 62, address: '555555555 351st Street, Aventura, Florida 33180', clientName: 'Mario Gray' },
    { id: 63, address: '666666666 355th Street, Aventura, Florida 33180', clientName: 'Latoya James' },
    { id: 64, address: '777777777 359th Street, Aventura, Florida 33180', clientName: 'Ramon Watson' },
    { id: 65, address: '888888888 363rd Street, Aventura, Florida 33180', clientName: 'Yolanda Brooks' },
    { id: 66, address: '999999999 367th Street, Aventura, Florida 33180', clientName: 'Hector Kelly' },
    { id: 67, address: '1111111111 371st Street, Aventura, Florida 33180', clientName: 'Felicia Sanders' },
    { id: 68, address: '2222222222 375th Street, Aventura, Florida 33180', clientName: 'Ricardo Price' },
    { id: 69, address: '3333333333 379th Street, Aventura, Florida 33180', clientName: 'Gina Bennett' },
    { id: 70, address: '4444444444 383rd Street, Aventura, Florida 33180', clientName: 'Oscar Wood' },
    { id: 71, address: '5555555555 387th Street, Aventura, Florida 33180', clientName: 'Tanya Barnes' },
    { id: 72, address: '6666666666 391st Street, Aventura, Florida 33180', clientName: 'Fernando Ross' },
    { id: 73, address: '7777777777 395th Street, Aventura, Florida 33180', clientName: 'Dawn Henderson' },
    { id: 74, address: '8888888888 399th Street, Aventura, Florida 33180', clientName: 'Maurice Coleman' },
    { id: 75, address: '9999999999 403rd Street, Aventura, Florida 33180', clientName: 'Tasha Jenkins' },
    { id: 76, address: '11111111111 407th Street, Aventura, Florida 33180', clientName: 'Lorenzo Perry' },
    { id: 77, address: '22222222222 411th Street, Aventura, Florida 33180', clientName: 'Keisha Powell' },
    { id: 78, address: '33333333333 415th Street, Aventura, Florida 33180', clientName: 'Darnell Long' },
    { id: 79, address: '44444444444 419th Street, Aventura, Florida 33180', clientName: 'Shanice Patterson' },
    { id: 80, address: '55555555555 423rd Street, Aventura, Florida 33180', clientName: 'Malik Hughes' },
    { id: 81, address: '66666666666 427th Street, Aventura, Florida 33180', clientName: 'Ebony Flores' },
    { id: 82, address: '77777777777 431st Street, Aventura, Florida 33180', clientName: 'Tyrone Washington' },
    { id: 83, address: '88888888888 435th Street, Aventura, Florida 33180', clientName: 'Aisha Butler' },
    { id: 84, address: '99999999999 439th Street, Aventura, Florida 33180', clientName: 'Dante Simmons' },
    { id: 85, address: '111111111111 443rd Street, Aventura, Florida 33180', clientName: 'Imani Foster' },
    { id: 86, address: '222222222222 447th Street, Aventura, Florida 33180', clientName: 'Kendrick Gonzales' },
    { id: 87, address: '333333333333 451st Street, Aventura, Florida 33180', clientName: 'Nia Bryant' },
    { id: 88, address: '444444444444 455th Street, Aventura, Florida 33180', clientName: 'DeAndre Alexander' },
    { id: 89, address: '555555555555 459th Street, Aventura, Florida 33180', clientName: 'Jade Russell' },
    { id: 90, address: '666666666666 463rd Street, Aventura, Florida 33180', clientName: 'Marquis Griffin' },
    { id: 91, address: '777777777777 467th Street, Aventura, Florida 33180', clientName: 'Destiny Diaz' },
    { id: 92, address: '888888888888 471st Street, Aventura, Florida 33180', clientName: 'Khalil Hayes' },
    { id: 93, address: '999999999999 475th Street, Aventura, Florida 33180', clientName: 'Aaliyah Myers' },
    { id: 94, address: '1111111111111 479th Street, Aventura, Florida 33180', clientName: 'Javon Ford' },
    { id: 95, address: '2222222222222 483rd Street, Aventura, Florida 33180', clientName: 'Zara Hamilton' },
    { id: 96, address: '3333333333333 487th Street, Aventura, Florida 33180', clientName: 'Rashad Graham' },
    { id: 97, address: '4444444444444 491st Street, Aventura, Florida 33180', clientName: 'Nyla Sullivan' },
    { id: 98, address: '5555555555555 495th Street, Aventura, Florida 33180', clientName: 'Trevon Wallace' },
    { id: 99, address: '6666666666666 499th Street, Aventura, Florida 33180', clientName: 'Maya Cole' },
    { id: 100, address: '7777777777777 503rd Street, Aventura, Florida 33180', clientName: 'Darius West' },
  ];

  const filteredAddresses = clientAddresses.filter(item =>
    item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = clientAddresses.filter(item =>
      item.address.toLowerCase().includes(searchLower) ||
      item.clientName.toLowerCase().includes(searchLower)
    );

    setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
    setShowSuggestions(filtered.length > 0);
    setSelectedSuggestion(-1);
  }, [searchTerm]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestion >= 0 && suggestions[selectedSuggestion]) {
          const selected = suggestions[selectedSuggestion];
          setSearchTerm(selected.address);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        searchInputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.address);
    setShowSuggestions(false);
    setCurrentPage(1); // Reset to first page when selecting suggestion
    searchInputRef.current?.focus();
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
    setCurrentPage(1); // Reset to first page when clearing search
    searchInputRef.current?.focus();
  };

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate 1.5 second loading time

    return () => clearTimeout(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalPages = Math.ceil(filteredAddresses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAddresses = filteredAddresses.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setIsPageLoading(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsPageLoading(false);
    }, 800); // 0.8 second loading time for page changes
  };

  const isMobile = useMobileDetection();

  const handleOnboardingClick = () => {
    if (onShowOnboarding) {
      onShowOnboarding();
    }
  };

  // Tooltip positioning function
  const handleTooltipPosition = (event) => {
    // Don't show tooltips on mobile
    if (isMobile) {
      return;
    }
    
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

  // Mobile action handler
  const handleMobileAction = (action, item) => {
    if (isMobile) {
      // For now, just log the action - we'll implement action sheets in Phase 2
      console.log(`${action} action for:`, item);
      // You can add haptic feedback here if needed
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  }

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
              <h1>Welcome back, {firstName}! 🚀</h1>
              <p>Your current sensor display and activities - Updated!</p>
            </div>
            <div className="dashboard-contact">
              <div className="contact-card">
                <div className="contact-title" title={contractorName}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="contact-logo">
                    <path d="M7.26232 8.72485C10.0934 7.34724 12.309 5.00949 13.581 2.08729C12.7604 1.21063 11.6936 0.58444 10.5447 0.208729L9.92928 0C9.88825 0.0834914 9.84722 0.208734 9.84722 0.292225C8.8625 3.13093 6.85203 5.42695 4.14404 6.72106C2.25666 7.63947 0.861632 9.3093 0.20515 11.3131L0 11.9393C0.0820602 11.981 0.205152 12.0228 0.287212 12.0228C1.06678 12.315 1.84636 12.6907 2.5849 13.1499C3.61065 11.2713 5.25185 9.68501 7.26232 8.72485Z" fill="#087443"></path>
                    <path d="M19.1611 8.89185C17.643 11.2296 15.5504 13.1082 12.9655 14.3605C10.873 15.3624 9.27282 17.241 8.53428 19.4953L8.32913 20.2049C9.1087 20.9146 10.0524 21.4573 11.0781 21.7913L11.6936 22C11.7346 21.9165 11.7757 21.7913 11.7757 21.7078C12.7604 18.8691 14.7709 16.5731 17.4788 15.2789C19.3662 14.3605 20.8023 12.6907 21.4177 10.6869L21.6229 10.0607C20.7612 9.81026 19.9406 9.39279 19.1611 8.89185Z" fill="#16B364"></path>
                    <path d="M6.68793 18.0341C7.71368 15.5294 9.60106 13.4838 12.0218 12.3149C14.2375 11.2295 16.0838 9.55971 17.3557 7.51417C16.4121 6.59576 15.6325 5.55212 15.0581 4.29974C13.5399 7.13845 11.1602 9.43447 8.24707 10.8538C6.56484 11.647 5.21085 13.0246 4.39024 14.6944C5.29291 15.5711 6.03145 16.6565 6.60587 17.8671C6.60587 17.8671 6.6469 17.9506 6.68793 18.0341Z" fill="#099250"></path>
                  </svg>
                  {contractorName}
                </div>
                <div className="contact-email">
                  <span className="contact-label">Email:</span> {contractorEmail}
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-icon">
                  <path d="M10.0005 12.6667C10.0005 13.7713 9.10506 14.6667 8.00049 14.6667C6.89592 14.6667 6.00049 13.7713 6.00049 12.6667M9.19816 4.15908C9.48849 3.85913 9.66716 3.45045 9.66716 3.00004C9.66716 2.07957 8.92097 1.33337 8.00049 1.33337C7.08002 1.33337 6.33382 2.07957 6.33382 3.00004C6.33382 3.45045 6.51249 3.85913 6.80282 4.15908M1.69837 5.54868C1.68881 4.58112 2.21046 3.67758 3.05318 3.20208M14.3026 5.54868C14.3122 4.58112 13.7905 3.67758 12.9478 3.20208M12.0005 7.46671C12.0005 6.54729 11.5791 5.66553 10.8289 5.0154C10.0788 4.36528 9.06136 4.00004 8.00049 4.00004C6.93963 4.00004 5.92221 4.36528 5.17206 5.0154C4.42192 5.66553 4.00049 6.54729 4.00049 7.46671C4.00049 8.98791 3.62325 10.1004 3.15253 10.8965C2.61605 11.8038 2.34781 12.2574 2.3584 12.3658C2.37052 12.4898 2.39284 12.5289 2.49338 12.6024C2.58127 12.6667 3.02283 12.6667 3.90595 12.6667H12.095C12.9782 12.6667 13.4197 12.6667 13.5076 12.6024C13.6081 12.5289 13.6305 12.4898 13.6426 12.3658C13.6532 12.2574 13.3849 11.8038 12.8484 10.8965C12.3777 10.1004 12.0005 8.98791 12.0005 7.46671Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="card-content">
                <div className="card-value">25</div>
                <div className="card-label">Attention Needed</div>
              </div>
            </div>
            <div className="dashboard-card active">
              <div className="card-icon-wrapper">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-icon">
                  <path d="M14 6.66671H2M14 8.33337V5.86671C14 4.7466 14 4.18655 13.782 3.75873C13.5903 3.3824 13.2843 3.07644 12.908 2.88469C12.4802 2.66671 11.9201 2.66671 10.8 2.66671H5.2C4.0799 2.66671 3.51984 2.66671 3.09202 2.88469C2.71569 3.07644 2.40973 3.3824 2.21799 3.75873C2 4.18655 2 4.7466 2 5.86671V11.4667C2 12.5868 2 13.1469 2.21799 13.5747C2.40973 13.951 2.71569 14.257 3.09202 14.4487C3.51984 14.6667 4.0799 14.6667 5.2 14.6667H8M10.6667 1.33337V4.00004M5.33333 1.33337V4.00004M9.66667 12.6667L11 14L14 11" stroke="#344054" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="card-content">
                <div className="card-value">456</div>
                <div className="card-label">Active Service Calls</div>
              </div>
            </div>
            <div className="dashboard-card clients">
              <div className="card-icon-wrapper">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-icon">
                  <g clipPath="url(#clip0_3464_2620)">
                  <path d="M2.66636 14.545C3.06807 14.6667 3.61067 14.6667 4.53301 14.6667H11.4663C12.3887 14.6667 12.9313 14.6667 13.333 14.545M2.66636 14.545C2.58022 14.5189 2.50056 14.4872 2.42503 14.4487C2.0487 14.257 1.74274 13.951 1.55099 13.5747C1.33301 13.1469 1.33301 12.5868 1.33301 11.4667V4.53337C1.33301 3.41327 1.33301 2.85322 1.55099 2.42539C1.74274 2.04907 2.0487 1.74311 2.42503 1.55136C2.85285 1.33337 3.4129 1.33337 4.53301 1.33337H11.4663C12.5864 1.33337 13.1465 1.33337 13.5743 1.55136C13.9506 1.74311 14.2566 2.04907 14.4484 2.42539C14.6663 2.85322 14.6663 3.41327 14.6663 4.53337V11.4667C14.6663 12.5868 14.6663 13.1469 14.4484 13.5747C14.2566 13.951 13.9506 14.257 13.5743 14.4487C13.4988 14.4872 13.4191 14.5189 13.333 14.545M2.66636 14.545C2.66658 14.0054 2.66981 13.7199 2.71758 13.4798C2.928 12.422 3.75493 11.595 4.81277 11.3846C5.07036 11.3334 5.38013 11.3334 5.99967 11.3334H9.99967C10.6192 11.3334 10.929 11.3334 11.1866 11.3846C12.2444 11.595 13.0714 12.422 13.2818 13.4798C13.3295 13.7199 13.3328 14.0054 13.333 14.545M10.6663 6.33337C10.6663 7.80613 9.47243 9.00004 7.99967 9.00004C6.52692 9.00004 5.33301 7.80613 5.33301 6.33337C5.33301 4.86061 6.52692 3.66671 7.99967 3.66671C9.47243 3.66671 10.6663 4.86061 10.6663 6.33337Z" stroke="#344054" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_3464_2620">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="card-content">
                <div className="card-value">1,243</div>
                <div className="card-label">Total # of Clients</div>
              </div>
            </div>
            <div className="dashboard-card sensors">
              <div className="card-icon-wrapper">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-icon">
                  <path d="M8.66634 7.33333H11.8663C12.6131 7.33333 12.9864 7.33333 13.2717 7.47866C13.5225 7.60649 13.7265 7.81046 13.8544 8.06135C13.9997 8.34656 13.9997 8.71993 13.9997 9.46667V14M8.66634 14V4.13333C8.66634 3.3866 8.66634 3.01323 8.52102 2.72801C8.39319 2.47713 8.18921 2.27316 7.93833 2.14532C7.65311 2 7.27974 2 6.53301 2H4.13301C3.38627 2 3.0129 2 2.72769 2.14532C2.4768 2.27316 2.27283 2.47713 2.145 2.72801C1.99967 3.01323 1.99967 3.3866 1.99967 4.13333V14M14.6663 14H1.33301M4.33301 4.66667H6.33301M4.33301 7.33333H6.33301M4.33301 10H6.33301" stroke="#344054" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when typing
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
                    <th>Client Addresses</th>
                    <th>Client Name</th>
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
                          <div className="skeleton-placeholder skeleton-action"></div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    // Actual data
                    currentAddresses.map((item) => (
                      <tr key={item.id}>
                        <td>{item.address}</td>
                        <td>{item.clientName}</td>
                        <td>
                          <div 
                            className="icon-wrapper" 
                            style={{ position: 'relative', display: 'inline-block' }}
                            title="Manage address sensor detail"
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

        {/* Mobile Dashboard Client Cards */}
        <div className="dashboard-client-cards-container">
          {isPageLoading ? (
            // Skeleton loading placeholders for cards
            Array.from({ length: 5 }, (_, index) => (
              <div key={`skeleton-card-${index}`} className="dashboard-client-card">
                <div className="dashboard-client-card-header">
                  <div className="skeleton-placeholder skeleton-address"></div>
                </div>
                <div className="dashboard-client-card-content">
                  <div className="dashboard-client-info-item">
                    <div className="skeleton-placeholder skeleton-name"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Actual dashboard client cards
            currentAddresses.map((client) => (
              <DashboardClientCard
                key={client.id}
                client={client}
                onView={(client) => {
                  // Handle view action - could navigate to client details
                  console.log('View client:', client);
                }}
                handleTooltipPosition={handleTooltipPosition}
                handleTooltipHide={handleTooltipHide}
              />
            ))
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isPageLoading}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filteredAddresses.length}
          itemsLabel="results"
        />
      </div>
    </>
  );
};

export default Dashboard; 