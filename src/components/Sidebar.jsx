import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ currentPage, onPageChange, onboardingCompleted }) => {
  const [contractorName, setContractorName] = useState('Acme HVAC and Cooling');
  const [contractorEmail, setContractorEmail] = useState('ariddle@acdrainwiz.com');
  const [fullName, setFullName] = useState('Diana Rivera');

  useEffect(() => {
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
      setFullName(storedFullName.trim());
    }
  }, [onboardingCompleted]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    console.log('Navigating to:', path);
    navigate(path);
    if (onPageChange) {
      const pageId = path === '/' || path === '/dashboard' ? 'dashboard' : 
                    path === '/manage-service-calls' ? 'service-calls' :
                    path === '/manage-clients' ? 'clients' :
                    path === '/manage-employees' ? 'employees' : 'dashboard';
      console.log('Setting page to:', pageId);
      onPageChange(pageId);
    }
  };

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return '/';
    return path;
  };

  const currentPath = getCurrentPage();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img alt="AC Drain Wiz Logo" className="logo-img" src="/images/acdrainwiz_logo.png" />
        </div>
        
      <div className="contractor-card">
        <span className="pro-badge">PRO</span>
        <span className="contractor-name" title={contractorName}>{contractorName}</span>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <a 
              aria-current={currentPath === '/' ? "page" : undefined}
              className={`nav-link ${currentPath === '/' ? 'active' : ''}`} 
              href="/" 
              data-discover="true"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/');
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                <path d="M6 11.25V12.75M9 8.25V12.75M12 5.25V12.75M5.85 15.75H12.15C13.4101 15.75 14.0402 15.75 14.5215 15.5048C14.9448 15.289 15.289 14.9448 15.5048 14.5215C15.75 14.0402 15.75 13.4101 15.75 12.15V5.85C15.75 4.58988 15.75 3.95982 15.5048 3.47852C15.289 3.05516 14.9448 2.71095 14.5215 2.49524C14.0402 2.25 13.4101 2.25 12.15 2.25H5.85C4.58988 2.25 3.95982 2.25 3.47852 2.49524C3.05516 2.71095 2.71095 3.05516 2.49524 3.47852C2.25 3.95982 2.25 4.58988 2.25 5.85V12.15C2.25 13.4101 2.25 14.0402 2.49524 14.5215C2.71095 14.9448 3.05516 15.289 3.47852 15.5048C3.95982 15.75 4.58988 15.75 5.85 15.75Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg> 
              Dashboard
            </a>
          </li>
          <li>
            <a 
              className={`nav-link ${currentPath === '/manage-service-calls' ? 'active' : ''}`} 
              href="/manage-service-calls" 
              data-discover="true"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/manage-service-calls');
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                <path d="M9 4.125L5.52119 9.18508C5.31177 9.4897 5.20706 9.64201 5.21335 9.76861C5.21883 9.87887 5.27261 9.98111 5.36037 10.0481C5.46113 10.125 5.64596 10.125 6.01562 10.125H9V13.875L12.4788 8.81492C12.6882 8.5103 12.7929 8.35799 12.7867 8.23139C12.7812 8.12113 12.7274 8.01889 12.6396 7.95191C12.5389 7.875 12.354 7.875 11.9844 7.875H9V4.125Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg> 
              Manage Service Calls
            </a>
          </li>
          <li>
            <a 
              className={`nav-link ${currentPath === '/manage-clients' ? 'active' : ''}`} 
              href="/manage-clients" 
              data-discover="true"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/manage-clients');
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                <g clipPath="url(#clip0_911_6986)">
                  <path d="M3.00002 16.3631C3.45195 16.5 4.06237 16.5 5.1 16.5H12.9C13.9376 16.5 14.548 16.5 15 16.3631M3.00002 16.3631C2.90312 16.3337 2.8135 16.2981 2.72852 16.2548C2.30516 16.039 1.96095 15.6948 1.74524 15.2715C1.5 14.7902 1.5 14.1601 1.5 12.9V5.1C1.5 3.83988 1.5 3.20982 1.74524 2.72852C1.96095 2.30516 2.30516 1.96095 2.72852 1.74524C3.20982 1.5 3.83988 1.5 5.1 1.5H12.9C14.1601 1.5 14.7902 1.5 15.2715 1.74524C15.6948 1.96095 16.039 2.30516 16.2548 2.72852C16.5 3.20982 16.5 3.83988 16.5 5.1V12.9C16.5 14.1601 16.5 14.7902 16.2548 15.2715C16.039 15.6948 15.6948 16.039 15.2715 16.2548C15.1865 16.2981 15.0969 16.3337 15 16.3631M3.00002 16.3631C3.00026 15.7561 3.0039 15.4349 3.05764 15.1647C3.29436 13.9747 4.22466 13.0444 5.41473 12.8076C5.70453 12.75 6.05302 12.75 6.75 12.75H11.25C11.947 12.75 12.2955 12.75 12.5853 12.8076C13.7753 13.0444 14.7056 13.9747 14.9424 15.1647C14.9961 15.4349 14.9997 15.7561 15 16.3631M12 7.125C12 8.78185 10.6569 10.125 9 10.125C7.34315 10.125 6 8.78185 6 7.125C6 5.46815 7.34315 4.125 9 4.125C10.6569 4.125 12 5.46815 12 7.125Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
                <defs>
                  <clipPath id="clip0_911_6986">
                    <rect width="18" height="18" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg> 
              Manage Clients
            </a>
          </li>
          <li>
            <a 
              className={`nav-link ${currentPath === '/manage-employees' ? 'active' : ''}`} 
              href="/manage-employees" 
              data-discover="true"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/manage-employees');
              }}
              >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                <path d="M16.5 15.75V14.25C16.5 12.8521 15.5439 11.6775 14.25 11.3445M11.625 2.46807C12.7244 2.91311 13.5 3.99098 13.5 5.25C13.5 6.50902 12.7244 7.58689 11.625 8.03193M12.75 15.75C12.75 14.3522 12.75 13.6533 12.5216 13.1019C12.2172 12.3669 11.6331 11.7828 10.8981 11.4784C10.3467 11.25 9.64783 11.25 8.25 11.25H6C4.60218 11.25 3.90326 11.25 3.35195 11.4784C2.61687 11.7828 2.03284 12.3669 1.72836 13.1019C1.5 13.6533 1.5 14.3522 1.5 15.75M10.125 5.25C10.125 6.90685 8.78185 8.25 7.125 8.25C5.46815 8.25 4.125 6.90685 4.125 5.25C4.125 3.59315 5.46815 2.25 7.125 2.25C8.78185 2.25 10.125 3.59315 10.125 5.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg> 
              Manage Employees
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-bottom">
        <div className="sidebar-support">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
            <g clipPath="url(#clip0_1221_19763)">
              <path d="M6.8522 6.85221L3.6967 3.69672M3.6967 14.3033L6.87598 11.124M11.1458 11.1478L14.3013 14.3033M14.3013 3.69672L11.1216 6.87646M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9ZM12 9C12 10.6569 10.6569 12 9 12C7.34315 12 6 10.6569 6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
            <defs>
              <clipPath id="clip0_1221_19763">
                <rect width="18" height="18" fill="white"></rect>
              </clipPath>
            </defs>
          </svg> 
          Support
                </div>
        <div className="sidebar-settings">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
            <g clipPath="url(#clip0_1221_19766)">
              <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M14.0455 11.0455C13.9547 11.2511 13.9276 11.4792 13.9677 11.7004C14.0078 11.9216 14.1133 12.1257 14.2705 12.2864L14.3114 12.3273C14.4382 12.4539 14.5387 12.6043 14.6074 12.7699C14.676 12.9354 14.7113 13.1128 14.7113 13.292C14.7113 13.4712 14.676 13.6487 14.6074 13.8142C14.5387 13.9798 14.4382 14.1302 14.3114 14.2568C14.1847 14.3836 14.0343 14.4842 13.8688 14.5528C13.7032 14.6214 13.5258 14.6568 13.3466 14.6568C13.1674 14.6568 12.9899 14.6214 12.8244 14.5528C12.6589 14.4842 12.5085 14.3836 12.3818 14.2568L12.3409 14.2159C12.1802 14.0587 11.9761 13.9533 11.7549 13.9132C11.5338 13.8731 11.3056 13.9001 11.1 13.9909C10.8983 14.0773 10.7264 14.2208 10.6052 14.4038C10.4841 14.5867 10.4191 14.8011 10.4182 15.0205V15.1364C10.4182 15.498 10.2745 15.8449 10.0188 16.1006C9.76305 16.3563 9.4162 16.5 9.05455 16.5C8.69289 16.5 8.34604 16.3563 8.09031 16.1006C7.83458 15.8449 7.69091 15.498 7.69091 15.1364V15.075C7.68563 14.8493 7.61258 14.6305 7.48126 14.4468C7.34993 14.2632 7.16641 14.1234 6.95455 14.0455C6.7489 13.9547 6.52078 13.9276 6.2996 13.9677C6.07842 14.0078 5.87433 14.1133 5.71364 14.2705L5.67273 14.3114C5.54608 14.4382 5.39569 14.5387 5.23015 14.6074C5.0646 14.676 4.88716 14.7113 4.70795 14.7113C4.52875 14.7113 4.35131 14.676 4.18576 14.6074C4.02022 14.5387 3.86983 14.4382 3.74318 14.3114C3.6164 14.1847 3.51582 14.0343 3.44719 13.8688C3.37857 13.7032 3.34325 13.5258 3.34325 13.3466C3.34325 13.1674 3.37857 12.9899 3.44719 12.8244C3.51582 12.6589 3.6164 12.5085 3.74318 12.3818L3.78409 12.3409C3.94128 12.1802 4.04672 11.9761 4.08682 11.7549C4.12693 11.5338 4.09985 11.3056 4.00909 11.1C3.92266 10.8983 3.77915 10.7264 3.59623 10.6052C3.4133 10.4841 3.19895 10.4191 2.97955 10.4182H2.86364C2.50198 10.4182 2.15513 10.2745 1.8994 10.0188C1.64367 9.76305 1.5 9.4162 1.5 9.05455C1.5 8.69289 1.64367 8.34604 1.8994 8.09031C2.15513 7.83458 2.50198 7.69091 2.86364 7.69091H2.925C3.15068 7.68563 3.36955 7.61258 3.55316 7.48126C3.73677 7.34993 3.87662 7.16641 3.95455 6.95455C4.04531 6.7489 4.07238 6.52078 4.03228 6.2996C3.99217 6.07842 3.88673 5.87433 3.72955 5.71364L3.68864 5.67273C3.56185 5.54608 3.46127 5.39569 3.39265 5.23015C3.32402 5.0646 3.2887 4.88716 3.2887 4.70795C3.2887 4.52875 3.32402 4.35131 3.39265 4.18576C3.46127 4.02022 3.56185 3.86983 3.68864 3.74318C3.81528 3.6164 3.96568 3.51582 4.13122 3.44719C4.29676 3.37857 4.47421 3.34325 4.65341 3.34325C4.83261 3.34325 5.01006 3.37857 5.1756 3.44719C5.34114 3.51582 5.49154 3.6164 5.61818 3.74318L5.65909 3.78409C5.81978 3.94128 6.02387 4.04672 6.24505 4.08682C6.46623 4.12693 6.69435 4.09985 6.9 4.00909H6.95455C7.15621 3.92266 7.32819 3.77915 7.44934 3.59623C7.57048 3.4133 7.63549 3.19895 7.63636 2.97955V2.86364C7.63636 2.50198 7.78003 2.15513 8.03576 1.8994C8.2915 1.64367 8.63834 1.5 9 1.5C9.36166 1.5 9.7085 1.64367 9.96424 1.8994C10.22 2.15513 10.3636 2.50198 10.3636 2.86364V2.925C10.3645 3.1444 10.4295 3.35876 10.5507 3.54168C10.6718 3.72461 10.8438 3.86812 11.0455 3.95455C11.2511 4.04531 11.4792 4.07238 11.7004 4.03228C11.9216 3.99217 12.1257 3.88673 12.2864 3.72955L12.3273 3.68864C12.4539 3.56185 12.6043 3.46127 12.7699 3.39265C12.9354 3.32402 13.1128 3.2887 13.292 3.2887C13.4712 3.2887 13.6487 3.32402 13.8142 3.39265C13.9798 3.46127 14.1302 3.56185 14.2568 3.68864C14.3836 3.81528 14.4842 3.96568 14.5528 4.13122C14.6214 4.29676 14.6568 4.47421 14.6568 4.65341C14.6568 4.83261 14.6214 5.01006 14.5528 5.1756C14.4842 5.34114 14.3836 5.49154 14.2568 5.61818L14.2159 5.65909C14.0587 5.81978 13.9533 6.02387 13.9132 6.24505C13.8731 6.46623 13.9001 6.69435 13.9909 6.9V6.95455C14.0773 7.15621 14.2208 7.32819 14.4038 7.44934C14.5867 7.57048 14.8011 7.63549 15.0205 7.63636H15.1364C15.498 7.63636 15.8449 7.78003 16.1006 8.03576C16.3563 8.2915 16.5 8.63834 16.5 9C16.5 9.36166 16.3563 9.7085 16.1006 9.96424C15.8449 10.22 15.498 10.3636 15.1364 10.3636H15.075C14.8556 10.3645 14.6412 10.4295 14.4583 10.5507C14.2754 10.6718 14.1319 10.8438 14.0455 11.0455Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
            <defs>
              <clipPath id="clip0_1221_19766">
                <rect width="18" height="18" fill="white"></rect>
              </clipPath>
            </defs>
          </svg> 
          Settings
        </div>
        <div className="sidebar-user">
          <div className="user-avatar">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div className="user-info">
            <div className="user-name">{fullName}</div>
            <div className="user-email" title={contractorEmail}>{contractorEmail}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 