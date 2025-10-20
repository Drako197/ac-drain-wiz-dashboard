import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './OnboardingModal.css';

const OnboardingModal = ({ isOpen, onClose, onComplete, onboardingCompleted }) => {
  // Configuration flag to show/hide step 4 (Service Call step)
  const SHOW_SERVICE_CALL_STEP = false;
  const [currentStep, setCurrentStep] = useState(0);

  const [userName, setUserName] = useState('');
  const [invitedEmployees, setInvitedEmployees] = useState([]);
  const [existingCustomAddressNames, setExistingCustomAddressNames] = useState(['main office', 'warehouse a', 'downtown location']);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Generate consistent appointments across multiple months
  const generateAppointments = () => {
    const appointments = [];
    const urgentAppointments = [];
    const today = new Date();
    
    // Use a fixed seed for consistent appointments
    const seed = 12345; // Fixed seed for consistent results
    
    // Generate appointments for the next 24 months
    for (let month = 0; month < 24; month++) {
      const currentDate = new Date(today.getFullYear(), today.getMonth() + month, 1);
      const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      
      // Generate 3-8 random appointments per month using seeded random
      const numAppointments = Math.floor(((seed + month) % 6) + 3);
      const monthAppointments = [];
      
      for (let i = 0; i < numAppointments; i++) {
        const day = ((seed + month + i) % daysInMonth) + 1;
        const isUrgent = ((seed + month + i) % 10) < 3; // 30% chance of being urgent
        
        if (!monthAppointments.includes(day)) {
          monthAppointments.push(day);
          appointments.push({
            year: currentDate.getFullYear(),
            month: currentDate.getMonth(),
            day,
            isUrgent
          });
          
          if (isUrgent) {
            urgentAppointments.push({
              year: currentDate.getFullYear(),
              month: currentDate.getMonth(),
              day
            });
          }
        }
      }
    }
    
    return { appointments, urgentAppointments };
  };
  
  const { appointments, urgentAppointments } = generateAppointments();
  const [formData, setFormData] = useState({
    contractorName: '',
    contractorEmail: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    employeeEmail: '',
    employeeRole: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    serviceCallTitle: '',
    serviceCallDescription: '',
    serviceCallPriority: 'Medium',
    assignedClient: '',
    assignedTechnician: 'Awaiting Technicians',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    addressNameType: '',
    customAddressName: '',
    clientAddress1: '',
    clientAddress2: '',
    clientCity: '',
    clientState: '',
    clientZipCode: '',
    address: '',
    emailAddress: '',
    priority: 'Medium',
    sensor1: false,
    sensor2: false,
    sensor3: false,
    serviceDate: '',
    startTime: '08:00 AM',
    endTime: ''
  });
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [isStepValid, setIsStepValid] = useState(false);

  // Role permissions mapping
  const rolePermissions = {
    'Admin': [
      'Edit Contractor',
      'Invite Employees', 
      'Manage Roles',
      'Edit Employee Roles',
      'Create Service Calls',
      'Complete Service Calls',
      'Reset Sensors',
      'Manage Clients',
      'Manage Client Addresses',
      'Manage Client Sensors'
    ],
    'Manager': [
      'Create Service Calls',
      'Complete Service Calls',
      'Manage Clients',
      'Manage Client Addresses',
      'Manage Client Sensors'
    ],
    'Technician': [
      'Complete Service Calls',
      'Reset Sensors'
    ],
    'Sales': [
      'Create Service Calls',
      'Manage Clients',
      'Manage Client Addresses'
    ],
    'Support': [
      'Manage Clients',
      'Manage Client Addresses'
    ]
  };

  // Dynamic name generation
  const names = [
    { firstName: 'Quincy', lastName: 'Rodriguez' },
    { firstName: 'Ryan', lastName: 'Thompson' },
    { firstName: 'Dan', lastName: 'Williams' },
    { firstName: 'Alex', lastName: 'Martinez' },
    { firstName: 'Jordan', lastName: 'Anderson' },
    { firstName: 'Casey', lastName: 'Garcia' },
    { firstName: 'Taylor', lastName: 'Miller' },
    { firstName: 'Morgan', lastName: 'Davis' },
    { firstName: 'Jamie', lastName: 'Brown' },
    { firstName: 'Riley', lastName: 'Johnson' },
    { firstName: 'Avery', lastName: 'Wilson' },
    { firstName: 'Blake', lastName: 'Taylor' },
    { firstName: 'Cameron', lastName: 'Moore' },
    { firstName: 'Drew', lastName: 'Jackson' },
    { firstName: 'Emery', lastName: 'Martin' },
    { firstName: 'Finley', lastName: 'Lee' },
    { firstName: 'Gray', lastName: 'Perez' },
    { firstName: 'Harper', lastName: 'Thompson' },
    { firstName: 'Indigo', lastName: 'White' },
    { firstName: 'Jules', lastName: 'Harris' },
    { firstName: 'Kai', lastName: 'Clark' },
    { firstName: 'Lane', lastName: 'Lewis' },
    { firstName: 'Mika', lastName: 'Robinson' },
    { firstName: 'Noah', lastName: 'Walker' },
    { firstName: 'Oakley', lastName: 'Young' },
    { firstName: 'Parker', lastName: 'Allen' },
    { firstName: 'Quinn', lastName: 'King' },
    { firstName: 'River', lastName: 'Wright' },
    { firstName: 'Sage', lastName: 'Lopez' },
    { firstName: 'Tatum', lastName: 'Hill' },
    { firstName: 'Vale', lastName: 'Scott' },
    { firstName: 'Wren', lastName: 'Green' },
    { firstName: 'Xander', lastName: 'Adams' },
    { firstName: 'Yuki', lastName: 'Baker' },
    { firstName: 'Zara', lastName: 'Gonzalez' },
    { firstName: 'Atlas', lastName: 'Nelson' },
    { firstName: 'Briar', lastName: 'Carter' },
    { firstName: 'Cedar', lastName: 'Mitchell' },
    { firstName: 'Dove', lastName: 'Roberts' },
    { firstName: 'Echo', lastName: 'Turner' },
    { firstName: 'Flint', lastName: 'Phillips' },
    { firstName: 'Gale', lastName: 'Campbell' },
    { firstName: 'Haven', lastName: 'Parker' },
    { firstName: 'Iris', lastName: 'Evans' },
    { firstName: 'Jade', lastName: 'Edwards' },
    { firstName: 'Kestrel', lastName: 'Collins' },
    { firstName: 'Luna', lastName: 'Stewart' },
    { firstName: 'Moss', lastName: 'Sanchez' },
    { firstName: 'Nova', lastName: 'Morris' },
    { firstName: 'Ocean', lastName: 'Rogers' },
    { firstName: 'Phoenix', lastName: 'Reed' },
    { firstName: 'Quill', lastName: 'Cook' },
    { firstName: 'Rain', lastName: 'Morgan' },
    { firstName: 'Sky', lastName: 'Bell' },
    { firstName: 'Thunder', lastName: 'Murphy' },
    { firstName: 'Umber', lastName: 'Bailey' },
    { firstName: 'Violet', lastName: 'Rivera' },
    { firstName: 'Willow', lastName: 'Cooper' },
    { firstName: 'Xylo', lastName: 'Richardson' },
    { firstName: 'Yarrow', lastName: 'Cox' },
    { firstName: 'Zen', lastName: 'Howard' }
  ];

  useEffect(() => {
    if (isOpen) {
      // Reset form data when modal opens
      setFormData({
        contractorName: '',
        contractorEmail: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        employeeEmail: '',
        employeeRole: '',
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        clientAddress: '',
        serviceCallTitle: '',
        serviceCallDescription: '',
        serviceCallPriority: 'Medium',
        assignedClient: '',
        assignedTechnician: 'Awaiting Technicians',
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        addressNameType: '',
        customAddressName: '',
        clientAddress1: '',
        clientAddress2: '',
        clientCity: '',
        clientState: '',
        clientZipCode: '',
        address: '',
        emailAddress: '',
        priority: 'Medium',
        sensor1: false,
        sensor2: false,
        sensor3: false,
        serviceDate: '',
        startTime: '08:00 AM',
        endTime: ''
      });
      
      // Reset other states
      setErrors({});
      setShowErrors(false);
      setCurrentStep(0);
      setInvitedEmployees([]); // Clear all past employee invites
      setExistingCustomAddressNames(['main office', 'warehouse a', 'downtown location']);
      
      // Generate a random name when modal opens
      const randomNameObj = names[Math.floor(Math.random() * names.length)];
      setUserName(randomNameObj.firstName);
      // Store the random name for later use in completion, but don't auto-populate step 3 fields
      setFormData(prev => ({
        ...prev,
        // Store random name separately for completion, but don't populate firstName/lastName fields
        randomFirstName: randomNameObj.firstName,
        randomLastName: randomNameObj.lastName,
        fullName: `${randomNameObj.firstName} ${randomNameObj.lastName}`
      }));
    }
  }, [isOpen, onboardingCompleted]);

  // Update validation status when form data or current step changes
  useEffect(() => {
    const currentStepData = steps[currentStep];
    if (!currentStepData.formFields || currentStepData.formFields.length === 0) {
      setIsStepValid(true);
      return;
    }

    const requiredFields = currentStepData.formFields.filter(field => {
      // Check if field is required
      if (!field.required) return false;
      
      // Check conditional requirements
      if (field.conditional) {
        const { field: conditionalField, value: conditionalValue } = field.conditional;
        return formData[conditionalField] === conditionalValue;
      }
      
      return true;
    });
    
    let isValid = requiredFields.every(field => 
      formData[field.name] && formData[field.name].trim() !== ''
    );

    // Special validation for Step 4: Check that at least one sensor is selected (only if step 4 is visible)
    if (currentStep === 4) {
      // Only apply step 4 validation if the SHOW_SERVICE_CALL_STEP flag is true
      if (SHOW_SERVICE_CALL_STEP) {
        const hasSelectedSensor = formData.sensor1 || formData.sensor2 || formData.sensor3;
        isValid = isValid && hasSelectedSensor;
      }
    }

    setIsStepValid(isValid);
  }, [currentStep, formData]);

  // Debug isLoading state changes
  useEffect(() => {
    // console.log('isLoading state changed to:', isLoading);
  }, [isLoading]);

  const steps = [
    {
      title: "Welcome",
      description: "Welcome to AC Drain Wiz sensor monitoring",
      icon: "👋",
      content: "Welcome step - Get ready to set up your account",
      isWelcomeStep: true
    },
    {
      title: "Create Your Contractor Profile",
      description: "Before you can track clients, manage jobs, or deploy sensors, you'll create your primary contractor account. This quick step unlocks everything—and sets you up for smarter service and smoother installs.",
      icon: "⭐",
      content: "STEP 1: Create your primary contractor account to unlock all features.",
      formFields: [
        { name: 'contractorName', label: 'Contractor Company Name', type: 'text', placeholder: 'Contractor Company Name', hint: 'Your Company Name', required: true },
        { name: 'contractorEmail', label: 'Contractor Email', type: 'email', placeholder: 'name@domain.com', required: true },
        { name: 'address1', label: 'Address 1', type: 'text', placeholder: '123 Main Street', required: true },
        { name: 'address2', label: 'Address 2 Optional', type: 'text', placeholder: '', required: false },
        { name: 'city', label: 'City', type: 'text', placeholder: '', required: true },
        { name: 'state', label: 'State', type: 'select', options: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'], required: true },
        { name: 'zipCode', label: 'Zip Code', type: 'text', placeholder: 'Zip/Postal Code', required: true }
      ]
    },
    {
      title: "Add Your Employees",
      description: "Build your team by adding employees who will manage clients and service calls. Each team member gets their own access and can track their assigned tasks.",
      icon: "👤",
      content: "STEP 2: Add team members who will manage clients and service calls.",
      isEmployeeInviteStep: true
    },
    {
      title: "Add Your Clients",
      description: "Get started by adding your clients with their contact information and address details.",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.12492 4.12498L7.40617 7.40623M4.12492 4.12498H1.93742L1.20825 1.93748L1.93742 1.20831L4.12492 1.93748V4.12498ZM13.7929 1.74863L11.877 3.6646C11.5882 3.95337 11.4438 4.09775 11.3897 4.26424C11.3421 4.41069 11.3421 4.56844 11.3897 4.71489C11.4438 4.88138 11.5882 5.02576 11.877 5.31452L12.05 5.48752C12.3387 5.77628 12.4831 5.92066 12.6496 5.97476C12.796 6.02234 12.9538 6.02234 13.1002 5.97476C13.2667 5.92066 13.4111 5.77628 13.6999 5.48752L15.4921 3.69529C15.6851 4.165 15.7916 4.67943 15.7916 5.21873C15.7916 7.43362 13.9961 9.22915 11.7812 9.22915C11.5141 9.22915 11.2532 9.20305 11.0008 9.15327C10.6463 9.08335 10.4691 9.0484 10.3616 9.05911C10.2474 9.07049 10.1911 9.08762 10.0899 9.14178C9.99467 9.19273 9.89917 9.28823 9.70817 9.47923L4.4895 14.6979C3.88544 15.3019 2.90606 15.3019 2.302 14.6979C1.69794 14.0938 1.69794 13.1144 2.302 12.5104L7.52067 7.29173C7.71167 7.10073 7.80717 7.00523 7.85812 6.91002C7.91228 6.80881 7.92941 6.75251 7.94079 6.63828C7.9515 6.53083 7.91654 6.35359 7.84663 5.99911C7.79685 5.74669 7.77075 5.48576 7.77075 5.21873C7.77075 3.00384 9.56628 1.20831 11.7812 1.20831C12.5143 1.20831 13.2016 1.40506 13.7929 1.74863ZM8.49996 10.6874L12.5103 14.6978C13.1144 15.3019 14.0938 15.3019 14.6978 14.6978C15.3019 14.0938 15.3019 13.1144 14.6978 12.5103L11.3986 9.21113C11.165 9.18903 10.9373 9.1469 10.7172 9.08647C10.4335 9.00861 10.1223 9.06512 9.91426 9.27314L8.49996 10.6874Z" stroke="currentColor" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      content: "STEP 3: Add your clients for better tracking and management.",
      formFields: [
        { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'First Name', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Last Name', required: true },
        { name: 'mobileNumber', label: 'Mobile Number', type: 'tel', placeholder: '(000) 000-0000', required: true },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'name@domain.com', required: true },
        { name: 'addressNameType', label: 'Address Name', type: 'select', options: ['Home', 'Office', 'Warehouse', 'Apartment', 'Airbnb', 'Custom'], required: true },
        { name: 'customAddressName', label: 'Custom Address Name', type: 'text', placeholder: 'Enter custom address name', required: false, conditional: { field: 'addressNameType', value: 'Custom' } },
        { name: 'clientAddress1', label: 'Address 1', type: 'text', placeholder: '123 Main Street', required: true },
        { name: 'clientAddress2', label: 'Address 2', type: 'text', placeholder: '', required: false },
        { name: 'clientCity', label: 'City', type: 'text', placeholder: '', required: true },
        { name: 'clientState', label: 'State', type: 'select', options: ['AL', 'FL', 'GA', 'TX', 'CA', 'NY'], required: true },
        { name: 'clientZipCode', label: 'Zip Code', type: 'text', placeholder: 'Zip/Postal Code', required: true }
      ]
    },
    {
      title: "Create Your First Service Call",
      icon: "📍",
      content: "STEP 4: Create your first service call to start tracking jobs.",
      hidden: !SHOW_SERVICE_CALL_STEP,
      formFields: [
        { name: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Emergency'], required: true },
        { name: 'sensor1', label: 'Sensor 1 - Aft Deck', type: 'checkbox', required: false },
        { name: 'sensor2', label: 'Sensor 2 - Starboard', type: 'checkbox', required: false },
        { name: 'sensor3', label: 'Sensor 3 - Port', type: 'checkbox', required: false },
        { name: 'serviceDate', label: 'Select Date', type: 'date', placeholder: 'Select date', required: true },
        { name: 'startTime', label: 'Start Time', type: 'select', options: ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'], required: true },
        { name: 'endTime', label: 'End Time', type: 'select', options: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'], required: true }
      ]
    },
    {
      title: "Setup Complete",
      description: "Congratulations! You're all set up and ready to manage your AC and drain services efficiently. Welcome to AC Drain Wiz sensor monitoring.",
      icon: "⭐",
      content: "STEP 5: Setup complete! You're ready to manage your services.",
      formFields: []
    }
  ];

  // Helper functions to work with visible/hidden steps
  const getVisibleSteps = () => {
    return steps.filter(step => !step.hidden);
  };

  const getVisibleStepIndex = (stepIndex) => {
    const visibleSteps = getVisibleSteps();
    return visibleSteps.findIndex(step => steps.indexOf(step) === stepIndex);
  };

  const getNextVisibleStep = (currentVisibleIndex) => {
    const visibleSteps = getVisibleSteps();
    return currentVisibleIndex + 1 < visibleSteps.length ? currentVisibleIndex + 1 : null;
  };

  const isStepHidden = (stepIndex) => {
    return steps[stepIndex] && steps[stepIndex].hidden;
  };

  const showToastMessage = (message, type = 'info') => {
    if (window.showToastMessage) {
      window.showToastMessage(message, type);
    }
  };

  // Scroll to first error field on mobile
  const scrollToFirstError = (errorFields = null) => {
    // Only run on mobile
    if (window.innerWidth > 480) return;
    
    // Use provided error fields or fall back to current errors state
    const fieldsToCheck = errorFields || errors;
    const firstErrorField = Object.keys(fieldsToCheck)[0];
    if (!firstErrorField) return;
    
    // Find the error field element
    const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
    if (!errorElement) return;
    
    // Scroll to the field with offset for mobile header
    setTimeout(() => {
      errorElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 100);
  };



  const handleInputChange = (name, value) => {
    setFormData(prev => {
      const newFormData = {
        ...prev,
        [name]: value
      };
      
      // Auto-set end time when start time changes
      if (name === 'startTime' && value) {
        const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];
        const startIndex = timeSlots.indexOf(value);
        
        if (startIndex !== -1 && startIndex < timeSlots.length - 1) {
          // Set end time to one hour after start time
          newFormData.endTime = timeSlots[startIndex + 1];
        }
      }
      
      return newFormData;
    });
    
    // Clear error when user starts typing
    if (showErrors && errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Clear custom address name error when address type changes
    if (name === 'addressNameType' && showErrors && errors.customAddressName) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.customAddressName;
        return newErrors;
      });
    }
    
    // Clear selectedSensors error when any sensor is selected
    if ((name === 'sensor1' || name === 'sensor2' || name === 'sensor3') && showErrors && errors.selectedSensors) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.selectedSensors;
        return newErrors;
      });
    }
  };

  const validateStep = (stepIndex) => {
    // console.log('=== validateStep called ===');
          // console.log('Step index:', stepIndex);
      // console.log('Current form data:', formData);
    
    const currentStepData = steps[stepIndex];
    if (!currentStepData.formFields || currentStepData.formFields.length === 0) {
      setIsStepValid(true);
      return true;
    }

    const newErrors = {};
    const requiredFields = currentStepData.formFields.filter(field => {
      // Check if field is required
      if (!field.required) return false;
      
      // Check conditional requirements
      if (field.conditional) {
        const { field: conditionalField, value: conditionalValue } = field.conditional;
        return formData[conditionalField] === conditionalValue;
      }
      
      return true;
    });
    
    requiredFields.forEach(field => {
      const value = formData[field.name];
      const isEmpty = !value || (typeof value === 'string' && value.trim() === '');
      if (isEmpty) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    // Special validation for Step 2: Check that at least one employee is invited
    if (stepIndex === 2) {
      // console.log('Step 2 validation - checking invited employees');
      // console.log('Invited employees:', invitedEmployees);
      
      if (invitedEmployees.length === 0) {
        // console.log('No employees invited! Adding error');
        newErrors.invitedEmployees = 'Please invite at least one employee before continuing';
      } else {
        // console.log('Employees are invited:', invitedEmployees.length);
      }
    }

    // Special validation for Step 3: Custom address name validation
    if (stepIndex === 3) {
      // console.log('Step 3 validation - checking custom address name');
      
      // Check if "Custom" is selected for address name type
      if (formData.addressNameType === 'Custom') {
        // console.log('Custom address type selected, checking custom address name');
        
        // Validate custom address name is provided
        if (!formData.customAddressName || formData.customAddressName.trim() === '') {
          // console.log('Custom address name is empty! Adding error');
          newErrors.customAddressName = 'Custom address name is required when "Custom" is selected';
        } else {
          // console.log('Custom address name is provided:', formData.customAddressName);
        }
        } else {
        // console.log('Non-custom address type selected:', formData.addressNameType);
      }
    }

    // Special validation for Step 4: Check that at least one sensor is selected
    if (stepIndex === 4) {
      // console.log('Step 4 sensor validation:');
      // console.log('- sensor1:', formData.sensor1);
      // console.log('- sensor2:', formData.sensor2);
      // console.log('- sensor3:', formData.sensor3);
      
      const hasSelectedSensor = formData.sensor1 || formData.sensor2 || formData.sensor3;
      // console.log('- hasSelectedSensor:', hasSelectedSensor);
      
      if (!hasSelectedSensor) {
        // console.log('No sensors selected! Adding error');
        newErrors.selectedSensors = 'Please select at least one sensor to service';
      } else {
        // console.log('At least one sensor is selected');
      }
    }

    // console.log('Final errors:', newErrors);
    setErrors(newErrors);
    setShowErrors(true);
    
    const isValid = Object.keys(newErrors).length === 0;
    setIsStepValid(isValid);
    
    // Scroll to first error on mobile if validation fails
    if (!isValid) {
      // Use setTimeout to ensure errors are set before scrolling
      setTimeout(() => {
        scrollToFirstError(newErrors);
      }, 50);
    }
    
    // console.log('Validation result:', isValid);
    return isValid;
  };

  const handleSendInvitation = () => {
    if (!formData.employeeEmail || !formData.employeeRole) {
      return; // Don't proceed if validation fails, let inline errors show
    }

    const newEmployee = {
      id: Date.now(),
      email: formData.employeeEmail,
      role: formData.employeeRole,
      invitedAt: new Date().toISOString()
    };

    setInvitedEmployees(prev => [...prev, newEmployee]);
    
    // Clear the form
    setFormData(prev => ({
      ...prev,
      employeeEmail: '',
      employeeRole: ''
    }));

    showToastMessage(`Invitation sent to ${newEmployee.email} for ${newEmployee.role} role!`, "success");
  };

  // Function to scroll onboarding-right to top on mobile
  const scrollToTop = () => {
    // Only run on mobile
    if (window.innerWidth > 480) return;
    
    // Find the onboarding-right element
    const onboardingRight = document.querySelector('.onboarding-right');
    if (onboardingRight) {
      // Scroll to top with smooth behavior
      onboardingRight.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    if (currentStep === 0) {
      // Welcome step - just move to next step
      setCurrentStep(1);
      // Scroll to top on mobile
      setTimeout(scrollToTop, 100);
      return;
    }

    if (currentStep === 1) {
      // Contractor step - move to employee step
      setCurrentStep(2);
      showToastMessage("Contractor created successfully", "success");
      // Scroll to top on mobile
      setTimeout(scrollToTop, 100);
      return;
    }

    if (currentStep === 2) {
      // Employee invite step - validate that at least one employee is invited
      if (invitedEmployees.length === 0) {
        console.log('Step 2: No employees invited - preventing progression');
        setErrors(prev => ({ ...prev, invitedEmployees: 'Please invite at least one employee before continuing' }));
        setShowErrors(true);
        return;
      }
      
      setCurrentStep(3);
      const employeeCount = invitedEmployees.length;
      if (employeeCount === 1) {
        showToastMessage("One employee invitation processed successfully", "success");
      } else {
        showToastMessage(`${employeeCount} employee invitations processed successfully`, "success");
      }
      // Scroll to top on mobile
      setTimeout(scrollToTop, 100);
      return;
    }

    if (currentStep === 3) {
      // Client step - validate first, then add custom address name to existing list if it's custom
      const isValid = validateStep(3);
      if (!isValid) {
        return; // Don't proceed if validation fails
      }
      
      // Add custom address name to existing list if it's custom
      if (formData.addressNameType === 'Custom' && formData.customAddressName) {
        const customName = formData.customAddressName.trim().toLowerCase();
        if (!existingCustomAddressNames.includes(customName)) {
          setExistingCustomAddressNames(prev => [...prev, customName]);
        }
      }
      
      // Check if step 4 is hidden, if so skip directly to step 5 (completion)
      if (!SHOW_SERVICE_CALL_STEP) {
        setCurrentStep(5);
        showToastMessage("Client added successfully", "success");
      } else {
        setCurrentStep(4);
        showToastMessage("Client added successfully", "success");
      }
      // Scroll to top on mobile
      setTimeout(scrollToTop, 100);
      return;
    }

    if (currentStep === 4 && SHOW_SERVICE_CALL_STEP) {
      // Service operations step - show loading animation before moving to completion (only if step 4 is visible)
      console.log('=== HANDLE NEXT STEP 4 DEBUG ===');
      console.log('Setting isLoading to true');
      setIsLoading(true);
      console.log('Setting timeout for 5 seconds');
      setTimeout(() => {
        console.log('Timeout triggered - setting isLoading to false');
        setIsLoading(false);
        console.log('Moving to step 5');
        setCurrentStep(5);
        // Scroll to top on mobile after loading completes
        setTimeout(scrollToTop, 100);
      }, 5000);
      return;
    }

    if (!isStepValid) {
      return; // Don't proceed if validation fails, let inline errors show
    }

    // Clear errors when moving to next step
    setErrors({});
    setShowErrors(false);

    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      // Show toast message for step transition
      const stepMessages = [
        { message: "Client added successfully", type: "success" },
        { message: "Service call tracking enabled", type: "success" },
        { message: "Service call created successfully", type: "success" }
      ];
      showToastMessage(stepMessages[nextStep - 3].message, stepMessages[nextStep - 3].type);
      // Scroll to top on mobile
      setTimeout(scrollToTop, 100);
    } else {
      // Use random name for fullName construction
      const fullName = formData.randomFirstName && formData.randomLastName ? `${formData.randomFirstName} ${formData.randomLastName}` : '';
      onComplete(formData.contractorName, formData.contractorEmail, fullName);
    }
  };

  const handleSkip = () => {
    // Construct full name from firstName and lastName
    const fullName = formData.firstName && formData.lastName ? `${formData.firstName} ${formData.lastName}` : '';
    onComplete(formData.contractorName, formData.contractorEmail, fullName);
  };

  const handleClose = () => {
    onClose();
  };

  const handleContinueClick = () => {
    console.log('=== handleContinueClick called ===');
    console.log('Current step:', currentStep);
    console.log('Current form data:', formData);
    console.log('Current errors:', errors);
    console.log('Show errors:', showErrors);
    
    if (currentStep === 1) {
      const isValid = validateStep(1);
      if (isValid) {
        handleNext();
      }
      // Don't show toast message - let inline errors show instead
    } else if (currentStep === 2) {
      console.log('Step 2 validation called');
      console.log('Invited employees:', invitedEmployees);
      
      if (invitedEmployees.length === 0) {
        console.log('No employees invited - showing inline error');
        setErrors(prev => ({ ...prev, invitedEmployees: 'Please invite at least one employee before continuing' }));
        setShowErrors(true);
        return;
      }
      
      console.log('Employees are invited - proceeding to next step');
      handleNext();
    } else if (currentStep === 3) {
      console.log('Step 3 validation called');
      console.log('Current form data:', formData);
      console.log('Address type:', formData.addressNameType);
      console.log('Custom address name:', formData.customAddressName);
      const isValid = validateStep(3);
      console.log('Step 3 validation result:', isValid);
      console.log('Current errors after validation:', errors);
      if (isValid) {
        handleNext();
      }
      // Don't show toast message for Step 3 - let inline errors show instead
    } else if (currentStep === 4 && SHOW_SERVICE_CALL_STEP) {
      console.log('=== STEP 4 VALIDATION DEBUG ===');
      console.log('Step 4 validation called');
      console.log('Current form data:', formData);
      console.log('Sensor values:', { sensor1: formData.sensor1, sensor2: formData.sensor2, sensor3: formData.sensor3 });
      console.log('Priority:', formData.priority);
      console.log('Service Date:', formData.serviceDate);
      console.log('Start Time:', formData.startTime);
      console.log('End Time:', formData.endTime);
      console.log('Is Step Valid:', isStepValid);
      
      const isValid = validateStep(4);
      console.log('Step 4 validation result:', isValid);
      console.log('Current errors after validation:', errors);
      
      if (isValid) {
        console.log('✅ Validation passed - calling handleNext()');
        handleNext();
      } else {
        console.log('❌ Validation failed - not calling handleNext()');
      }
      // Don't show toast message for Step 4 - let inline errors show instead
    } else {
      if (isStepValid) {
        handleNext();
      }
      // Don't show toast message - let inline errors show instead
    }
  };

  // Calendar functions
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === currentMonth && 
           today.getFullYear() === currentYear;
  };

  const isPastDate = (day) => {
    const today = new Date();
    const checkDate = new Date(currentYear, currentMonth, day);
    return checkDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const isAppointment = (day) => {
    return appointments.some(apt => 
      apt.year === currentYear && 
      apt.month === currentMonth && 
      apt.day === day
    );
  };

  const isUrgentAppointment = (day) => {
    return urgentAppointments.some(apt => 
      apt.year === currentYear && 
      apt.month === currentMonth && 
      apt.day === day
    );
  };

  const handleDateSelect = (day, month = currentMonth, year = currentYear) => {
    const newDate = new Date(year, month, day);
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    if (newDate < todayStart) return; // Prevent selecting past dates
    
    setSelectedDate(newDate);
    
    // Check if the selected date has existing appointments
    const busySlots = getBusyTimeSlots(newDate);
    const hasExistingAppointments = busySlots.length > 0;
    
    // Get the next available time slot
    const nextAvailableTime = getNextAvailableTimeSlot(newDate);
    
    // Auto-set end time based on the selected start time
    const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];
    const startIndex = timeSlots.indexOf(nextAvailableTime);
    const endTime = startIndex !== -1 && startIndex < timeSlots.length - 1 ? timeSlots[startIndex + 1] : '09:00 AM';
    
    setFormData(prev => ({
      ...prev,
      serviceDate: formatDate(newDate),
      startTime: nextAvailableTime,
      endTime: endTime
    }));
    
    // Show a toast message if appointments were found and time was auto-adjusted
    if (hasExistingAppointments) {
      showToastMessage(`This date has one or more pre-existing service calls. Available start time has been automatically set to ${nextAvailableTime}.`, "info");
    }
    
    // Clear error for serviceDate when date is selected
    if (showErrors && errors.serviceDate) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.serviceDate;
        return newErrors;
      });
    }
    
    // Clear errors for startTime and endTime when they're auto-set
    if (showErrors) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.startTime;
        delete newErrors.endTime;
        return newErrors;
      });
    }
  };

  const handleMonthChange = (direction) => {
    const today = new Date();
    const currentDate = new Date(currentYear, currentMonth, 1);
    const twoYearsFromNow = new Date(today.getFullYear() + 2, today.getMonth(), 1);
    
    if (direction === 'prev') {
      // Don't allow going to past months
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const prevDate = new Date(prevYear, prevMonth, 1);
      
      if (prevDate >= new Date(today.getFullYear(), today.getMonth(), 1)) {
        if (currentMonth === 0) {
          setCurrentMonth(11);
          setCurrentYear(currentYear - 1);
        } else {
          setCurrentMonth(currentMonth - 1);
        }
      }
    } else {
      // Don't allow going beyond 2 years from now
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const nextDate = new Date(nextYear, nextMonth, 1);
      
      if (nextDate <= twoYearsFromNow) {
        if (currentMonth === 11) {
          setCurrentMonth(0);
          setCurrentYear(currentYear + 1);
        } else {
          setCurrentMonth(currentMonth + 1);
        }
      }
    }
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    
    // Check if today has existing appointments
    const busySlots = getBusyTimeSlots(today);
    const hasExistingAppointments = busySlots.length > 0;
    
    // Get the next available time slot
    const nextAvailableTime = getNextAvailableTimeSlot(today);
    
    // Auto-set end time based on the selected start time
    const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];
    const startIndex = timeSlots.indexOf(nextAvailableTime);
    const endTime = startIndex !== -1 && startIndex < timeSlots.length - 1 ? timeSlots[startIndex + 1] : '09:00 AM';
    
    setFormData(prev => ({
      ...prev,
      serviceDate: formatDate(today),
      startTime: nextAvailableTime,
      endTime: endTime
    }));
    
    // Show a toast message if appointments were found and time was auto-adjusted
    if (hasExistingAppointments) {
      showToastMessage(`This date has one or more pre-existing service calls. Available start time has been automatically set to ${nextAvailableTime}.`, "info");
    }
    
    // Clear error for serviceDate when Today is clicked
    if (showErrors && errors.serviceDate) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.serviceDate;
        return newErrors;
      });
    }
    
    // Clear errors for startTime and endTime when they're auto-set
    if (showErrors) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.startTime;
        delete newErrors.endTime;
        return newErrors;
      });
    }
  };

  const handleCalendarApply = () => {
    setIsCalendarOpen(false);
  };

  const handleCalendarCancel = () => {
    setIsCalendarOpen(false);
  };

  // Generate consistent busy time slots for the selected date
  const getBusyTimeSlots = (selectedDate) => {
    if (!selectedDate) return [];
    
    const busySlots = [];
    
    // Check if selected date has appointments
    const dayAppointments = appointments.filter(apt => 
      apt.year === selectedDate.getFullYear() && 
      apt.month === selectedDate.getMonth() && 
      apt.day === selectedDate.getDate()
    );
    
    if (dayAppointments.length > 0) {
      // Generate consistent busy time slots based on appointments
      const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
      
      // Use a fixed seed based on the date for consistent results
      const dateSeed = selectedDate.getFullYear() * 10000 + (selectedDate.getMonth() + 1) * 100 + selectedDate.getDate();
      const numBusySlots = (dateSeed % 3) + 2; // 2-4 busy slots
      
      // Generate consistent busy slots based on date
      for (let i = 0; i < numBusySlots; i++) {
        const slotIndex = (dateSeed + i) % timeSlots.length;
        busySlots.push(timeSlots[slotIndex]);
      }
    }
    
    return busySlots;
  };

  // Find the next available time slot for a given date
  const getNextAvailableTimeSlot = (selectedDate) => {
    if (!selectedDate) return '08:00 AM';
    
    const busySlots = getBusyTimeSlots(selectedDate);
    const allTimeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
    
    // Find the first available time slot
    for (const timeSlot of allTimeSlots) {
      if (!busySlots.includes(timeSlot)) {
        return timeSlot;
      }
    }
    
    // If all slots are busy, return the first slot (fallback)
    return '08:00 AM';
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Get previous month's days to fill the grid
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear);
    
    const calendarDays = [];
    
    // Add previous month's days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      calendarDays.push({
        day,
        isCurrentMonth: false,
        isSelected: false,
        hasAppointment: false
      });
    }
    
    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth && 
        selectedDate.getFullYear() === currentYear;
      
      const isTodayDate = isToday(day);
      const isPast = isPastDate(day);
      const hasAppointment = isAppointment(day);
      const isUrgent = isUrgentAppointment(day);
      
      calendarDays.push({
        day,
        isCurrentMonth: true,
        isSelected,
        isToday: isTodayDate,
        isPast,
        hasAppointment,
        isUrgent,
        month: currentMonth,
        year: currentYear
      });
    }
    
    // Add next month's days to complete the grid
    const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const nextMonthDate = new Date(nextYear, nextMonth, day);
      
      const isPast = nextMonthDate < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      const hasAppointment = appointments.some(apt => 
        apt.year === nextYear && 
        apt.month === nextMonth && 
        apt.day === day
      );
      const isUrgent = urgentAppointments.some(apt => 
        apt.year === nextYear && 
        apt.month === nextMonth && 
        apt.day === day
      );
      
      calendarDays.push({
        day,
        isCurrentMonth: false,
        isSelected: false,
        isToday: false,
        isPast,
        hasAppointment,
        isUrgent,
        month: nextMonth,
        year: nextYear
      });
    }

    return (
      <div className="calendar-popup">
        <div className="calendar-header">
          <button 
            className="calendar-nav-btn"
            onClick={() => handleMonthChange('prev')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h3 className="calendar-title">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button 
            className="calendar-nav-btn"
            onClick={() => handleMonthChange('next')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="calendar-input-row">
          <input
            type="text"
            className="calendar-date-input"
            placeholder="Select date"
            value={selectedDate ? formatDisplayDate(selectedDate) : ''}
            readOnly
          />
          <button 
            className="calendar-today-btn"
            onClick={handleTodayClick}
          >
            Today
          </button>
        </div>
        
        <div className="calendar-days-header">
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
          <span>Su</span>
        </div>
        
        <div className="calendar-grid">
          {calendarDays.map((dateObj, index) => {
            // Check if this date is selected (across all months)
            const isSelected = selectedDate && 
              selectedDate.getDate() === dateObj.day && 
              selectedDate.getMonth() === (dateObj.month || currentMonth) && 
              selectedDate.getFullYear() === (dateObj.year || currentYear);
            
            return (
              <button
                key={index}
                className={`calendar-day ${dateObj.isCurrentMonth ? 'current-month' : 'other-month'} ${isSelected ? 'selected' : ''} ${dateObj.isToday ? 'today' : ''} ${dateObj.isPast ? 'past' : ''} ${dateObj.isUrgent ? 'urgent' : ''}`}
                onClick={() => !dateObj.isPast && handleDateSelect(dateObj.day, dateObj.month, dateObj.year)}
                disabled={dateObj.isPast}
              >
                <span className="day-number">{dateObj.day}</span>
                {dateObj.hasAppointment && !isSelected && (
                  <span className={`appointment-dot ${dateObj.isUrgent ? 'urgent' : ''}`}></span>
                )}
                {dateObj.hasAppointment && isSelected && dateObj.isUrgent && (
                  <span className="appointment-dot urgent-selected"></span>
                )}
                {dateObj.hasAppointment && isSelected && !dateObj.isUrgent && (
                  <span className="appointment-dot selected"></span>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Calendar Legend */}
        <div className="calendar-legend">
          <div className="legend-heading">Existing appointment indicators</div>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-dot regular"></span>
              <span className="legend-text">Regular appointment</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot urgent"></span>
              <span className="legend-text">Urgent appointment</span>
            </div>
          </div>
        </div>
        
        <div className="calendar-actions">
          <button 
            className="calendar-cancel-btn"
            onClick={handleCalendarCancel}
          >
            Cancel
          </button>
          <button 
            className={`calendar-apply-btn ${selectedDate ? 'active' : 'disabled'}`}
            onClick={handleCalendarApply}
            disabled={!selectedDate}
          >
            Apply
          </button>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];
  const isWelcomeStep = currentStep === 0;
  const isEmployeeInviteStep = currentStep === 2;

  const renderFormField = (field) => {
    const value = formData[field.name] || '';
    const hasError = showErrors && errors[field.name];
    const inputClassName = `form-input ${hasError ? 'error' : ''}`;
    
    // Special handling for city, state, zip fields in Step 3
    if (field.name === 'clientCity' || field.name === 'clientState' || field.name === 'clientZipCode') {
      console.log('Step 3 field processing:', field.name);
      // Only render if this is the city field (first in the group)
      if (field.name === 'clientCity') {
        return (
          <div key="city-state-zip-row" className="form-row three-col">
            <div className="form-group">
              <label className="form-label">
                City {field.required && <span className="required">*</span>}
              </label>
              <input
                type="text"
                className={`form-input ${showErrors && errors.clientCity ? 'error' : ''}`}
                value={formData.clientCity || ''}
                onChange={(e) => handleInputChange('clientCity', e.target.value)}
                placeholder=""
                required={field.required}
              />
              {showErrors && errors.clientCity && <div className="form-error">{errors.clientCity}</div>}
            </div>
            
            <div className="form-group">
              <label className="form-label">
                State {field.required && <span className="required">*</span>}
              </label>
              <select
                className={`form-select ${showErrors && errors.clientState ? 'error' : ''}`}
                value={formData.clientState || ''}
                onChange={(e) => handleInputChange('clientState', e.target.value)}
                required={field.required}
              >
                <option value="">Select</option>
                {['AL', 'FL', 'GA', 'TX', 'CA', 'NY'].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {showErrors && errors.clientState && <div className="form-error">{errors.clientState}</div>}
            </div>
            
            <div className="form-group">
              <label className="form-label">
                Zip Code {field.required && <span className="required">*</span>}
              </label>
              <input
                type="text"
                className={`form-input ${showErrors && errors.clientZipCode ? 'error' : ''}`}
                value={formData.clientZipCode || ''}
                onChange={(e) => handleInputChange('clientZipCode', e.target.value)}
                placeholder="Zip/Postal Code"
                required={field.required}
              />
              {showErrors && errors.clientZipCode && <div className="form-error">{errors.clientZipCode}</div>}
            </div>
          </div>
        );
      }
      
      // Skip state and zip fields since they're handled in the city render
      return null;
    }
    
    if (field.type === 'select') {
      return (
        <div key={field.name} className="form-group">
          <label className="form-label">
            {field.label} {field.required && <span className="required">*</span>}
          </label>
          <select
            className={`form-select ${hasError ? 'error' : ''}`}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
          >
            <option value="">Select</option>
            {field.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {hasError && <div className="form-error">{errors[field.name]}</div>}
        </div>
      );
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.name} className="form-group">
          <label className="form-label">
            {field.label} {field.required && <span className="required">*</span>}
          </label>
          <textarea
            className={inputClassName}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
          />
          {hasError && <div className="form-error">{errors[field.name]}</div>}
        </div>
      );
    }

    if (field.type === 'checkbox') {
      return (
        <div key={field.name} className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox-input"
              checked={formData[field.name] || false}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
            />
            <span className="checkbox-text">{field.label}</span>
          </label>
        </div>
      );
    }

    if (field.type === 'date') {
      return (
        <div key={field.name} className="form-group">
          <label className="form-label">
            {field.label} {field.required && <span className="required">*</span>}
          </label>
          <div className="date-input-container">
            <input
              type="text"
              className={`form-input date-input ${hasError ? 'error' : ''}`}
              value={value ? formatDisplayDate(new Date(value)) : ''}
              placeholder={field.placeholder}
              readOnly
              onClick={() => setIsCalendarOpen(true)}
            />
            <button
              type="button"
              className="calendar-trigger-btn"
              onClick={() => setIsCalendarOpen(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          {hasError && <div className="form-error">{errors[field.name]}</div>}
        </div>
      );
    }



    return (
      <div key={field.name} className="form-group">
        <label className="form-label">
          {field.label} {field.required && <span className="required">*</span>}
        </label>
        <input
          type={field.type}
          className={inputClassName}
          value={value}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
        />
        {hasError && <div className="form-error">{errors[field.name]}</div>}
      </div>
    );
  };

  const renderEmployeeInviteStep = () => (
    <div className="onboarding-content">
      <div className="content-header">
        <h1>Build Your Team</h1>
      </div>
      
      <div className="form-container">
        <h3>{invitedEmployees.length === 0 ? 'Invite Your First Employee' : 'Invite Another Employee'}</h3>
        <div className="form-row">
          <div className="form-group half-width">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={formData.employeeEmail || ''}
              onChange={(e) => handleInputChange('employeeEmail', e.target.value)}
              placeholder="Enter employee email"
            />
            {showErrors && errors.invitedEmployees && (
              <div className="form-error">{errors.invitedEmployees}</div>
            )}
          </div>
          
          <div className="form-group half-width">
            <label className="form-label">Select role</label>
            <select
              className="form-select"
              value={formData.employeeRole || ''}
              onChange={(e) => handleInputChange('employeeRole', e.target.value)}
            >
              <option value="">Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Technician">Technician</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
            </select>
          </div>
        </div>

        {formData.employeeRole && (
          <>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '2px',
              textAlign: 'left'
            }}>Permissions assigned to this role</h3>
            <div className="permissions-section">
              <div className="permissions-container">
                {rolePermissions[formData.employeeRole]?.map((permission, index) => (
                  <span key={index} className="permission-badge">
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="form-actions">
          <button 
            className={`btn-send-invitation ${formData.employeeEmail && formData.employeeRole ? 'active' : 'disabled'}`}
            onClick={handleSendInvitation}
            disabled={!formData.employeeEmail || !formData.employeeRole}
          >
            Send Invitation
          </button>
          
          <p className="assistive-text">
            An invitation will be sent to the email provided. The employee will need to accept the invitation and create their user account.
          </p>
        </div>

        {invitedEmployees.length > 0 && (
          <div className="invited-employees-section">
            <h3>Invited Employees ({invitedEmployees.length})</h3>
            <div className="invited-employees-list">
              {invitedEmployees.map((employee) => (
                <div key={employee.id} className="invited-employee-badge">
                  <span className="employee-email">{employee.email}</span>
                  <span className="employee-separator">•</span>
                  <span className="employee-role">{employee.role}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="content-actions">
        <button className="btn-back" onClick={() => {
          setCurrentStep(1);
          // Scroll to top on mobile when going back
          setTimeout(scrollToTop, 100);
        }}>
          Back
        </button>
        <button 
          className={`btn-next ${invitedEmployees.length > 0 ? 'active' : 'disabled'}`}
          onClick={() => {
            handleNext();
            // Scroll to top on mobile when continuing from employee step
            setTimeout(scrollToTop, 100);
          }}
        >
          Continue with {invitedEmployees.length} Employee{invitedEmployees.length !== 1 ? 's' : ''}
        </button>
      </div>
      {/* Progress Indicator for steps 2-5 */}
      <div className="progress-indicator">
        {getVisibleSteps().slice(1).map((step, index) => {
          const originalStepIndex = steps.indexOf(step);
          const isActive = originalStepIndex <= currentStep && originalStepIndex > 0;
          return (
            <div key={index} className={`progress-dot${isActive ? ' active' : ''}`}></div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Floating Step Indicator - Hidden for now */}
      {/* <div className="mobile-step-indicator">
        <div className="mobile-step-number">{currentStep}</div>
        <div className="mobile-step-text">{steps[currentStep]?.title || 'Setup'}</div>
      </div> */}
      
      <div className="onboarding-overlay">
        <div className="onboarding-modal" onClick={(e) => e.stopPropagation()}>
          {isLoading ? (
            // New minimalist rocket ship loading animation
                          <div className="loading-content-rocket">
                <div className="lottie-container">
                  <DotLottieReact
                    src="/Rocket Launch.json"
                    autoplay
                    loop
                    style={{ 
                      width: '300px', 
                      height: '300px',
                      transform: 'rotate(45deg)'
                    }}
                    onError={(error) => {
                      console.log('DotLottie error:', error);
                    }}
                  />
                </div>
              
              <div className="loading-text-rocket">
                <h2>Finalizing Your Setup</h2>
                <div className="loading-messages-rocket">
                  <div className="loading-message-rocket">Preparing your dashboard...</div>
                  <div className="loading-message-rocket">Configuring sensors...</div>
                  <div className="loading-message-rocket">Setting up service tracking...</div>
                  <div className="loading-message-rocket">Almost ready...</div>
                </div>
              </div>
            </div>
          ) : (
            <>
          <div className="onboarding-left">
                {/* Desktop Logo */}
                <div className="onboarding-logo">
                  <img className="logo-img" src="/images/acdrainwiz_logo.png" alt="AC Drain Wiz" />
                </div>
                
                {/* Mobile Header */}
                <div className="mobile-onboarding-header">
                  <img className="mobile-onboarding-logo" src="/images/acdrainwiz_logo.png" alt="AC Drain Wiz" />
                  <div className="mobile-step-title">{steps[currentStep]?.title || 'Welcome'}</div>
                  {/* <div className="mobile-step-description">{steps[currentStep]?.description || 'Let\'s get you set up'}</div> */}
                  
                  {/* Mobile Horizontal Step Indicators */}
                  <div className="mobile-step-indicators">
                    {/* Progress Line */}
                    <div 
                      className="mobile-progress-line"
                      style={{
                        width: `${Math.max(0, (currentStep - 1) / (steps.length - 2)) * 85}%`
                      }}
                    />
                    
                    {getVisibleSteps().slice(1).map((step, index) => {
                      const originalStepNumber = steps.indexOf(step);
                      const visibleStepNumber = index + 1;
                      const isCompleted = originalStepNumber < currentStep;
                      const isActive = originalStepNumber === currentStep;
                      const isDisabled = originalStepNumber > currentStep;
                      
                      return (
                        <div key={originalStepNumber} className="mobile-step-item">
                          <div 
                            className={`mobile-step-circle ${
                              isCompleted ? 'completed' : 
                              isActive ? 'active' : 
                              isDisabled ? 'disabled' : ''
                            }`}
                          >
                            {isCompleted ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            ) : (
                              visibleStepNumber
                            )}
                          </div>
                          <div 
                            className={`mobile-step-text ${
                              isCompleted ? 'completed' : 
                              isActive ? 'active' : 
                              isDisabled ? 'disabled' : ''
                            }`}
                          >
                            {originalStepNumber === 1 ? 'Setup' :
                             originalStepNumber === 2 ? 'Team' :
                             originalStepNumber === 3 ? 'Client' :
                             originalStepNumber === 4 ? 'Service' :
                             originalStepNumber === 5 ? 'Done' : step.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
            </div>
            
                {/* Desktop Steps (hidden on mobile) */}
            <div className={`onboarding-steps ${isWelcomeStep ? 'preview-mode' : ''}`}>
              <div className="steps-preview-header">
                <h3>Setup Steps</h3>
                <p>Here's what we'll help you set up:</p>
              </div>
              
              {getVisibleSteps().slice(1).map((step, index) => {
                const stepIcons = [
                  // Star icon for Step 1
                  <svg key="star" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2827 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3717 2.75291 12.4869 2.98638 12.7174 3.45332L14.9041 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2776 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.9121 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1912 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.906 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7554 20.57 17.6071 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6277 17.9658L7.25492 20.2654C6.79392 20.5078 6.56341 20.6291 6.39297 20.5975C6.24468 20.57 6.11672 20.477 6.04474 20.3445C5.962 20.1922 6.00603 19.9355 6.09407 19.4221L6.92889 14.5547C6.95491 14.403 6.96793 14.3271 6.95912 14.2545C6.95132 14.1902 6.93111 14.128 6.89961 14.0715C6.86402 14.0076 6.80888 13.9538 6.69859 13.8464L3.16056 10.4004C2.78766 10.0372 2.60121 9.85558 2.57853 9.68377C2.55879 9.5343 2.60755 9.38389 2.71125 9.27444C2.83044 9.14863 3.08797 9.11099 3.60304 9.03571L8.49431 8.32077C8.64642 8.29854 8.72248 8.28742 8.78872 8.25662C8.84736 8.22935 8.90016 8.19096 8.94419 8.14358C8.99391 8.09006 9.02793 8.02113 9.09597 7.88328L11.2827 3.45332Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>,
                  // Person icon for Step 2
                      <svg key="person" width="20" height="20" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.62638 14.9238C5.06995 13.8788 6.10559 13.1458 7.31242 13.1458H11.6874C12.8942 13.1458 13.9299 13.8788 14.3735 14.9238M12.4166 7.67706C12.4166 9.28789 11.1107 10.5937 9.49992 10.5937C7.88909 10.5937 6.58325 9.28789 6.58325 7.67706C6.58325 6.06623 7.88909 4.7604 9.49992 4.7604C11.1107 4.7604 12.4166 6.06623 12.4166 7.67706ZM16.7916 9.49998C16.7916 13.5271 13.527 16.7916 9.49992 16.7916C5.47284 16.7916 2.20825 13.5271 2.20825 9.49998C2.20825 5.4729 5.47284 2.20831 9.49992 2.20831C13.527 2.20831 16.7916 5.4729 16.7916 9.49998Z" stroke="currentColor" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>,
                  // Wrench and screwdriver icon for Step 3
                      <svg key="tools" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.12492 4.12498L7.40617 7.40623M4.12492 4.12498H1.93742L1.20825 1.93748L1.93742 1.20831L4.12492 1.93748V4.12498ZM13.7929 1.74863L11.877 3.6646C11.5882 3.95337 11.4438 4.09775 11.3897 4.26424C11.3421 4.41069 11.3421 4.56844 11.3897 4.71489C11.4438 4.88138 11.5882 5.02576 11.877 5.31452L12.05 5.48752C12.3387 5.77628 12.4831 5.92066 12.6496 5.97476C12.796 6.02234 12.9538 6.02234 13.1002 5.97476C13.2667 5.92066 13.4111 5.77628 13.6999 5.48752L15.4921 3.69529C15.6851 4.165 15.7916 4.67943 15.7916 5.21873C15.7916 7.43362 13.9961 9.22915 11.7812 9.22915C11.5141 9.22915 11.2532 9.20305 11.0008 9.15327C10.6463 9.08335 10.4691 9.0484 10.3616 9.05911C10.2474 9.07049 10.1911 9.08762 10.0899 9.14178C9.99467 9.19273 9.89917 9.28823 9.70817 9.47923L4.4895 14.6979C3.88544 15.3019 2.90606 15.3019 2.302 14.6979C1.69794 14.0938 1.69794 13.1144 2.302 12.5104L7.52067 7.29173C7.71167 7.10073 7.80717 7.00523 7.85812 6.91002C7.91228 6.80881 7.92941 6.75251 7.94079 6.63828C7.9515 6.53083 7.91654 6.35359 7.84663 5.99911C7.79685 5.74669 7.77075 5.48576 7.77075 5.21873C7.77075 3.00384 9.56628 1.20831 11.7812 1.20831C12.5143 1.20831 13.2016 1.40506 13.7929 1.74863ZM8.49996 10.6874L12.5103 14.6978C13.1144 15.3019 14.0938 15.3019 14.6978 14.6978C15.3019 14.0938 15.3019 13.1144 14.6978 12.5103L11.3986 9.21113C11.165 9.18903 10.9373 9.1469 10.7172 9.08647C10.4335 9.00861 10.1223 9.06512 9.91426 9.27314L8.49996 10.6874Z" stroke="currentColor" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>,
                  // Map pin icon for Step 4
                  <svg key="pin" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>,
                  // Star icon for Step 5 (Setup Complete)
                  <svg key="star-complete" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2827 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3717 2.75291 12.4869 2.98638 12.7174 3.45332L14.9041 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2776 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.9121 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1912 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.906 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7554 20.57 17.6071 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6277 17.9658L7.25492 20.2654C6.79392 20.5078 6.56341 20.6291 6.39297 20.5975C6.24468 20.57 6.11672 20.477 6.04474 20.3445C5.962 20.1922 6.00603 19.9355 6.09407 19.4221L6.92889 14.5547C6.95491 14.403 6.96793 14.3271 6.95912 14.2545C6.95132 14.1902 6.93111 14.128 6.89961 14.0715C6.86402 14.0076 6.80888 13.9538 6.69859 13.8464L3.16056 10.4004C2.78766 10.0372 2.60121 9.85558 2.57853 9.68377C2.55879 9.5343 2.60755 9.38389 2.71125 9.27444C2.83044 9.14863 3.08797 9.11099 3.60304 9.03571L8.49431 8.32077C8.64642 8.29854 8.72248 8.28742 8.78872 8.25662C8.84736 8.22935 8.90016 8.19096 8.94419 8.14358C8.99391 8.09006 9.02793 8.02113 9.09597 7.88328L11.2827 3.45332Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                ];
                
                return (
                  <div 
                    key={index + 1} 
                    className={`step-item ${index + 1 < currentStep ? 'completed' : index + 1 === currentStep ? 'active' : 'disabled-preview'} ${isWelcomeStep ? 'muted' : ''}`}
                  >
                    <div className="step-icon">
                      {stepIcons[index]}
                    </div>
                    <div className="step-content">
                      <span className="step-number">Step {index + 1}:</span>
                      <span className="step-title">{step.title}</span>
                    </div>
                    {index + 1 < steps.length - 1 && (
                      <div className={`step-connector ${index + 1 < currentStep ? 'active' : 'disabled'}`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

              <div className={`onboarding-right ${isWelcomeStep ? '' : `step-${currentStep}`}`}>
            {isWelcomeStep ? (
              <div className="onboarding-content">
                <div className="content-header">
                  <h1>Welcome to AC Drain Wiz sensor monitoring</h1>
                  <h2>{userName}</h2>
                </div>
                <p className="content-description">Before you can track clients, manage jobs, or deploy sensors, you'll create your primary contractor account. This quick step unlocks everything—and sets you up for smarter service and smoother installs.</p>
                <div className="content-image">
                  <img alt="Technician Hero" src="/images/technician-hero.png" />
                </div>
                <div className="content-actions">
                  <button className="btn-next" onClick={handleNext}>
                    Get Started
                  </button>
                </div>
              </div>
            ) : isEmployeeInviteStep ? (
              renderEmployeeInviteStep()
            ) : currentStepData.formFields && currentStepData.formFields.length > 0 ? (
              <div className="onboarding-content">
                {currentStep !== 1 && (
                  <div className="content-header">
                    <h1>{currentStepData.title}</h1>
                    <p>{currentStepData.description}</p>
                  </div>
                )}
                
                <form className="onboarding-form" onSubmit={(e) => {
                  e.preventDefault();
                  // Only allow form submission for step 1
                  if (currentStep === 1) {
                    const isValid = validateStep(1);
                    if (isValid) {
                      handleNext();
                    }
                    // Don't show toast message - let inline errors show instead
                  }
                }}>
                    <div className="form-container">
                        {currentStep === 1 ? (
                          // Step 1: Contractor form
                          <>
                      <div className="form-header">
                        <h1>Create Your Contractor Profile</h1>
                              <p>This will be your primary account for managing clients, employees, and service calls.</p>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group half-width">
                          <label className="form-label">
                            Contractor Company Name
                                  <span className="required">*</span>
                          </label>
                          <input
                            type="text" 
                                  name="contractorName"
                                  className={`form-input ${showErrors && errors.contractorName ? 'error' : ''}`}
                            value={formData.contractorName || ''}
                            onChange={(e) => handleInputChange('contractorName', e.target.value)}
                                  placeholder="Contractor Company Name"
                          />
                          {showErrors && errors.contractorName && (
                            <div className="form-error">{errors.contractorName}</div>
                          )}
                        </div>
                        <div className="form-group half-width">
                                <label className="form-label">
                                  Contractor Email
                                  <span className="required">*</span>
                                </label>
                          <input
                            type="email" 
                                  name="contractorEmail"
                                  className={`form-input ${showErrors && errors.contractorEmail ? 'error' : ''}`}
                            value={formData.contractorEmail || ''}
                            onChange={(e) => handleInputChange('contractorEmail', e.target.value)}
                                  placeholder="name@domain.com"
                          />
                          {showErrors && errors.contractorEmail && (
                            <div className="form-error">{errors.contractorEmail}</div>
                          )}
                        </div>
                      </div>
                            
                      <div className="form-row">
                        <div className="form-group half-width">
                                <label className="form-label">
                                  Address 1
                                  <span className="required">*</span>
                                </label>
                          <input
                            type="text" 
                                  name="address1"
                                  className={`form-input ${showErrors && errors.address1 ? 'error' : ''}`}
                            value={formData.address1 || ''}
                            onChange={(e) => handleInputChange('address1', e.target.value)}
                                  placeholder="123 Main Street"
                          />
                          {showErrors && errors.address1 && (
                            <div className="form-error">{errors.address1}</div>
                          )}
                        </div>
                        <div className="form-group half-width">
                          <label className="form-label">
                            Address 2 
                                  <span className="optional">(Optional)</span>
                          </label>
                          <input
                            type="text"
                                  name="address2"
                                  className="form-input"
                            value={formData.address2 || ''}
                            onChange={(e) => handleInputChange('address2', e.target.value)}
                                  placeholder=""
                          />
                        </div>
                      </div>
                            
                      <div className="form-row three-col">
                        <div className="form-group">
                                <label className="form-label">
                                  City
                                  <span className="required">*</span>
                                </label>
                          <input
                            type="text" 
                                  name="city"
                                  className={`form-input ${showErrors && errors.city ? 'error' : ''}`}
                            value={formData.city || ''}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                                  placeholder=""
                          />
                          {showErrors && errors.city && (
                            <div className="form-error">{errors.city}</div>
                          )}
                        </div>
                        <div className="form-group">
                                <label className="form-label">
                                  State
                                  <span className="required">*</span>
                                </label>
                          <select
                            name="state" 
                            className={`form-select ${showErrors && errors.state ? 'error' : ''}`}
                            value={formData.state || ''}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                          >
                            <option value="">Select</option>
                            {['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'].map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          {showErrors && errors.state && (
                            <div className="form-error">{errors.state}</div>
                          )}
                        </div>
                        <div className="form-group">
                                <label className="form-label">
                                  Zip Code
                                  <span className="required">*</span>
                                </label>
                          <input
                            type="text" 
                                  name="zipCode"
                                  className={`form-input ${showErrors && errors.zipCode ? 'error' : ''}`}
                            value={formData.zipCode || ''}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                  placeholder="Zip/Postal Code"
                          />
                          {showErrors && errors.zipCode && (
                            <div className="form-error">{errors.zipCode}</div>
                          )}
                        </div>
                                                  </div>
                          </>
                        ) : currentStep === 3 ? (
                          // Step 3: Client form
                          <>
                            
                            <div className="form-row">
                              <div className="form-group half-width">
                                <label className="form-label">
                                  First Name
                                  <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="firstName"
                                  className={`form-input ${showErrors && errors.firstName ? 'error' : ''}`}
                                  value={formData.firstName || ''}
                                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                                  placeholder="Enter first name"
                                />
                                {showErrors && errors.firstName && (
                                  <div className="form-error">{errors.firstName}</div>
                                )}
                              </div>
                              <div className="form-group half-width">
                                <label className="form-label">
                                  Last Name
                                  <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="lastName"
                                  className={`form-input ${showErrors && errors.lastName ? 'error' : ''}`}
                                  value={formData.lastName || ''}
                                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                                  placeholder="Enter last name"
                                />
                                {showErrors && errors.lastName && (
                                  <div className="form-error">{errors.lastName}</div>
                                )}
                              </div>
                            </div>
                            
                            <div className="form-row">
                              <div className="form-group half-width">
                                <label className="form-label">
                                  Mobile Number
                                  <span className="required">*</span>
                                </label>
                                <input
                                  type="tel"
                                  name="mobileNumber"
                                  className={`form-input ${showErrors && errors.mobileNumber ? 'error' : ''}`}
                                  value={formData.mobileNumber || ''}
                                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                                  placeholder="Enter mobile number"
                                />
                                {showErrors && errors.mobileNumber && (
                                  <div className="form-error">{errors.mobileNumber}</div>
                                )}
                              </div>
                              <div className="form-group half-width">
                                <label className="form-label">
                                  Email
                                  <span className="required">*</span>
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  className={`form-input ${showErrors && errors.email ? 'error' : ''}`}
                                  value={formData.email || ''}
                                  onChange={(e) => handleInputChange('email', e.target.value)}
                                  placeholder="Enter email address"
                                />
                                {showErrors && errors.email && (
                                  <div className="form-error">{errors.email}</div>
                                )}
                              </div>
                            </div>
                            
                            <div className="form-row">
                              <div className={`form-group ${formData.addressNameType === 'Custom' ? 'half-width' : 'full-width'}`}>
                                <label className="form-label">
                                  Address Name
                                  <span className="required">*</span>
                                </label>
                                <select
                                  name="addressNameType"
                                  className={`form-select ${showErrors && errors.addressNameType ? 'error' : ''}`}
                                  value={formData.addressNameType || ''}
                                  onChange={(e) => handleInputChange('addressNameType', e.target.value)}
                                >
                                  <option value="">Select address name</option>
                                  <option value="Home">Home</option>
                                  <option value="Office">Office</option>
                                  <option value="Warehouse">Warehouse</option>
                                  <option value="Apartment">Apartment</option>
                                  <option value="Airbnb">Airbnb</option>
                                  <option value="Custom">Custom</option>
                                </select>
                                <div className="helper-text">Use this to help you quickly tell one address from another</div>
                                {showErrors && errors.addressNameType && (
                                  <div className="form-error">{errors.addressNameType}</div>
                                )}
                              </div>
                              {formData.addressNameType === 'Custom' && (
                                <div className="form-group half-width">
                                  <label className="form-label">
                                    Custom Address Name
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="customAddressName"
                                    className={`form-input ${showErrors && errors.customAddressName ? 'error' : ''}`}
                                    value={formData.customAddressName || ''}
                                    onChange={(e) => handleInputChange('customAddressName', e.target.value)}
                                    placeholder="Enter custom address name"
                                  />
                                  {showErrors && errors.customAddressName && (
                                    <div className="form-error">{errors.customAddressName}</div>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            <div className="form-row">
                              <div className="form-group half-width">
                                <label className="form-label">
                                  Address 1
                                  <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="clientAddress1"
                                  className={`form-input ${showErrors && errors.clientAddress1 ? 'error' : ''}`}
                                  value={formData.clientAddress1 || ''}
                                  onChange={(e) => handleInputChange('clientAddress1', e.target.value)}
                                  placeholder="Enter street address"
                                />
                                {showErrors && errors.clientAddress1 && (
                                  <div className="form-error">{errors.clientAddress1}</div>
                                )}
                              </div>
                              <div className="form-group half-width">
                                <label className="form-label">
                                  Address 2 Optional
                                  <span className="optional">(optional)</span>
                                </label>
                                <input
                                  type="text"
                                  name="clientAddress2"
                                  className="form-input"
                                  value={formData.clientAddress2 || ''}
                                  onChange={(e) => handleInputChange('clientAddress2', e.target.value)}
                                  placeholder="Enter apartment, suite, etc."
                                />
                              </div>
                            </div>
                            
                            <div className="form-row">
                              <div className="form-group">
                                <label className="form-label">
                                  City
                                  <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="clientCity"
                                  className={`form-input ${showErrors && errors.clientCity ? 'error' : ''}`}
                                  value={formData.clientCity || ''}
                                  onChange={(e) => handleInputChange('clientCity', e.target.value)}
                                  placeholder="Enter city"
                                />
                                {showErrors && errors.clientCity && (
                                  <div className="form-error">{errors.clientCity}</div>
                                )}
                              </div>
                              <div className="form-group">
                                <label className="form-label">
                                  State
                                  <span className="required">*</span>
                                </label>
                                <select
                                  name="clientState"
                                  className={`form-select ${showErrors && errors.clientState ? 'error' : ''}`}
                                  value={formData.clientState || ''}
                                  onChange={(e) => handleInputChange('clientState', e.target.value)}
                                >
                                  <option value="">Select state</option>
                                  <option value="Florida">Florida</option>
                                  <option value="California">California</option>
                                  <option value="Texas">Texas</option>
                                  <option value="New York">New York</option>
                                </select>
                                {showErrors && errors.clientState && (
                                  <div className="form-error">{errors.clientState}</div>
                                )}
                              </div>
                              <div className="form-group">
                                <label className="form-label">
                                  Zip Code
                                  <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="clientZipCode"
                                  className={`form-input ${showErrors && errors.clientZipCode ? 'error' : ''}`}
                                  value={formData.clientZipCode || ''}
                                  onChange={(e) => handleInputChange('clientZipCode', e.target.value)}
                                  placeholder="Enter ZIP code"
                                />
                                {showErrors && errors.clientZipCode && (
                                  <div className="form-error">{errors.clientZipCode}</div>
                                )}
                              </div>
                            </div>
                          </>
                        ) : currentStep === 4 && SHOW_SERVICE_CALL_STEP ? (
                          // Step 4: Service call form
                          <>
                            {/* Client Contact Information */}
                            <div className="client-contact-section">
                              <h3 className="client-contact-title">Client Contact Information</h3>
                              <div className="client-contact-grid">
                                <div className="client-contact-item">
                                  <label className="client-contact-label">CLIENT NAME:</label>
                                  <span className="client-contact-value">
                                    {formData.firstName && formData.lastName 
                                      ? `${formData.firstName} ${formData.lastName}` 
                                      : 'Not provided'}
                                  </span>
                                </div>
                                <div className="client-contact-item">
                                  <label className="client-contact-label">ADDRESS:</label>
                                  <span className="client-contact-value address-link">
                                    <svg className="location-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    {formData.clientAddress1 && formData.clientCity && formData.clientState 
                                      ? `${formData.clientAddress1}${formData.clientAddress2 ? `, ${formData.clientAddress2}` : ''}, ${formData.clientCity}, ${formData.clientState} ${formData.clientZipCode || ''}`.trim()
                                      : 'Not provided'}
                                  </span>
                                </div>
                                <div className="client-contact-item">
                                  <label className="client-contact-label">EMAIL ADDRESS:</label>
                                  <span className="client-contact-value">
                                    {formData.email || 'Not provided'}
                                  </span>
                                </div>
                                <div className="client-contact-item">
                                  <label className="client-contact-label">MOBILE NUMBER:</label>
                                  <span className="client-contact-value">
                                    {formData.mobileNumber || 'Not provided'}
                                  </span>
                                </div>
                              </div>
                            </div>

                                  {/* Assign Technician and Priority */}
                                  <div className="form-row">
                                    <div className="form-group half-width">
                                      <label className="form-label">Assign technician:</label>
                                      <select
                                        name="assignedTechnician"
                                        className="form-select"
                                        value={formData.assignedTechnician || 'Awaiting Technicians'}
                                        disabled
                                      >
                                        <option value="Awaiting Technicians">Awaiting Technicians</option>
                                        <option value="John Smith">John Smith</option>
                                        <option value="Jane Doe">Jane Doe</option>
                                        <option value="Mike Johnson">Mike Johnson</option>
                                      </select>
                                    </div>
                                    <div className="form-group half-width">
                                      <label className="form-label">Priority:</label>
                                      <select
                                        name="priority"
                                        className={`form-select ${showErrors && errors.priority ? 'error' : ''}`}
                                        value={formData.priority || ''}
                                        onChange={(e) => handleInputChange('priority', e.target.value)}
                                      >
                                        <option value="">Select priority</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Emergency">Emergency</option>
                                      </select>
                                      {showErrors && errors.priority && (
                                        <div className="form-error">{errors.priority}</div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Sensors to Service */}
                                  <div className="form-group">
                                    <label className="form-label">
                                      Sensors to service
                                      <small className="assistive-text-inline">Select at least one</small>
                                    </label>
                                    <div className={`sensors-badges ${showErrors && errors.selectedSensors ? 'error' : ''}`}>
                                      <span 
                                        className={`sensor-badge ${formData.sensor1 ? 'selected' : ''}`}
                                        onClick={() => handleInputChange('sensor1', !formData.sensor1)}
                                      >
                                        <span className={`sensor-check-icon ${formData.sensor1 ? 'selected' : 'unselected'}`}>✓</span>
                                        Sensor 1 - Aft Deck
                                      </span>
                                      <span 
                                        className={`sensor-badge ${formData.sensor2 ? 'selected' : ''}`}
                                        onClick={() => handleInputChange('sensor2', !formData.sensor2)}
                                      >
                                        <span className={`sensor-check-icon ${formData.sensor2 ? 'selected' : 'unselected'}`}>✓</span>
                                        Sensor 2 - Starboard
                                      </span>
                                      <span 
                                        className={`sensor-badge ${formData.sensor3 ? 'selected' : ''}`}
                                        onClick={() => handleInputChange('sensor3', !formData.sensor3)}
                                      >
                                        <span className={`sensor-check-icon ${formData.sensor3 ? 'selected' : 'unselected'}`}>✓</span>
                                        Sensor 3 - Port
                                      </span>
                                    </div>
                                    {showErrors && errors.selectedSensors && (
                                      <div className="form-error">{errors.selectedSensors}</div>
                                    )}
                                  </div>

                                  {/* Date and Time Fields */}
                                  <div className="form-row three-col">
                                    <div className="form-group">
                                      <label className="form-label">Select date:</label>
                                      <div className="date-input-container">
                                        <input
                                          type="text"
                                          className={`form-input date-input ${showErrors && errors.serviceDate ? 'error' : ''}`}
                                          value={formData.serviceDate ? formatDisplayDate(new Date(formData.serviceDate)) : ''}
                                          placeholder="Select date"
                                          readOnly
                                          onClick={() => setIsCalendarOpen(true)}
                                        />
                                        <button
                                          type="button"
                                          className="calendar-trigger-btn"
                                          onClick={() => setIsCalendarOpen(true)}
                                        >
                                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          </svg>
                                        </button>
                                      </div>
                                      {showErrors && errors.serviceDate && (
                                        <div className="form-error">{errors.serviceDate}</div>
                                      )}
                                    </div>
                                    <div className="form-group">
                                      <label className="form-label">Start time:</label>
                                      <select
                                        name="startTime"
                                        className={`form-select ${showErrors && errors.startTime ? 'error' : ''}`}
                                        value={formData.startTime || ''}
                                        onChange={(e) => handleInputChange('startTime', e.target.value)}
                                      >
                                        <option value="">Select time</option>
                                        {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map(time => {
                                          const busySlots = getBusyTimeSlots(selectedDate);
                                          const isDisabled = busySlots.includes(time);
                                          return (
                                            <option 
                                              key={time} 
                                              value={time}
                                              disabled={isDisabled}
                                              style={isDisabled ? { color: '#9ca3af' } : {}}
                                            >
                                              {time} {isDisabled ? '(Booked)' : ''}
                                            </option>
                                          );
                                        })}
                                      </select>
                                      {showErrors && errors.startTime && (
                                        <div className="form-error">{errors.startTime}</div>
                                      )}
                                    </div>
                                    <div className="form-group">
                                      <label className="form-label">End time:</label>
                                      <select
                                        name="endTime"
                                        className={`form-select ${showErrors && errors.endTime ? 'error' : ''}`}
                                        value={formData.endTime || ''}
                                        onChange={(e) => handleInputChange('endTime', e.target.value)}
                                      >
                                        <option value="">Select time</option>
                                        {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'].map(time => {
                                          const busySlots = getBusyTimeSlots(selectedDate);
                                          const isDisabled = busySlots.includes(time);
                                          return (
                                            <option 
                                              key={time} 
                                              value={time}
                                              disabled={isDisabled}
                                              style={isDisabled ? { color: '#9ca3af' } : {}}
                                            >
                                              {time} {isDisabled ? '(Booked)' : ''}
                                            </option>
                                          );
                                        })}
                                      </select>
                                      {showErrors && errors.endTime && (
                                        <div className="form-error">{errors.endTime}</div>
                                      )}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                // Other steps: Use dynamic form rendering
                          currentStepData.formFields.map(field => renderFormField(field)).filter(Boolean)
                              )}
                            </div>
                  
                  {/* Form actions for step 1 only */}
                  {currentStep === 1 && (
                    <div className="form-actions">
                      <button type="submit" className="btn-next">
                        Create Your Contractor
                      </button>
                    </div>
                  )}
                  
                  {/* Back and Continue buttons for steps 2-5 */}
                  {currentStep > 1 && currentStep < steps.length - 1 && (
                    <div className="content-actions">
                      <button className="btn-back" onClick={() => setCurrentStep(currentStep - 1)}>
                        Back
                      </button>
                      <button 
                        className={`btn-next ${currentStep === 3 || (currentStep === 4 && SHOW_SERVICE_CALL_STEP) ? 'active' : (currentStep === 2 ? (invitedEmployees.length > 0 ? 'active' : 'disabled') : (isStepValid ? 'active' : 'disabled'))}`}
                        onClick={handleContinueClick}
                      >
                        {currentStep === 3 ? 'Add Client' : (currentStep === 4 && SHOW_SERVICE_CALL_STEP) ? 'Create Service Call' : 'Continue'}
                      </button>
                    </div>
                  )}
                </form>
                
                {/* Progress Indicator for all steps */}
                <div className="progress-indicator">
                  {getVisibleSteps().slice(1).map((step, index) => {
                    const originalStepIndex = steps.indexOf(step);
                    // Progress dot should be active if we've reached this step or beyond
                    // Since we excluded the Welcome step (index 0), we only show steps 1, 2, 3, 5
                    const isActive = originalStepIndex <= currentStep && originalStepIndex > 0;
                    return (
                      <div key={index} className={`progress-dot${isActive ? ' active' : ''}`}></div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Completion step
              <div className="completion-content">
                <div className="content-header">
                  <h1>Setup Complete!</h1>
                  <h2>Your AC Drain Wiz account is ready to go</h2>
                </div>
                
                <div className="completion-illustration">
                  <img src="/images/technician-completion.jpg" alt="Technician at work" />
                </div>
                
                <div className="completion-steps">
                  <div className="completion-step">
                    <div className="step-check">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span>Contractor profile created</span>
                  </div>
                  <div className="completion-step">
                    <div className="step-check">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span>Employees invited</span>
                  </div>
                  <div className="completion-step">
                    <div className="step-check">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span>Clients added</span>
                  </div>
                  {SHOW_SERVICE_CALL_STEP && (
                    <div className="completion-step">
                      <div className="step-check">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>First service call created</span>
                    </div>
                  )}
                </div>
                
                <div className="form-actions">
                  <button className="btn-next" onClick={handleNext}>
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
        </div>
      </div>

      {/* Calendar Popup */}
      {isCalendarOpen && (
        <div className="calendar-overlay" onClick={() => setIsCalendarOpen(false)}>
          <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
            {renderCalendar()}
          </div>
        </div>
      )}

    </>
  );
};

export default OnboardingModal;