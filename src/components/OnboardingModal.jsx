import React, { useState } from 'react'
import './OnboardingModal.css'

const OnboardingModal = ({ onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: 'Welcome to AC Drain Wiz!',
      content: 'Your complete solution for managing AC and drain services. Let\'s get you started with a quick tour.',
      image: '/images/Congrats_header_image.png'
    },
    {
      title: 'Dashboard Overview',
      content: 'Monitor your business metrics, track service calls, and manage your team all from one place.',
      image: '/images/technician-hero.png'
    },
    {
      title: 'Client Management',
      content: 'Easily add and manage your clients, track their service history, and maintain detailed records.',
      image: '/images/acdrainwiz_logo.png'
    },
    {
      title: 'Service Call Tracking',
      content: 'Create and track service calls, assign technicians, and monitor progress in real-time.',
      image: '/images/Rocket_lower_right_bg.png'
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        
        <div className="onboarding-content">
          <div className="step-image">
            <img src={steps[currentStep].image} alt={steps[currentStep].title} />
          </div>
          
          <div className="step-content">
            <h2>{steps[currentStep].title}</h2>
            <p>{steps[currentStep].content}</p>
          </div>
          
          <div className="step-indicators">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === currentStep ? 'active' : ''}`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
          
          <div className="step-actions">
            <button className="btn btn-secondary" onClick={handleSkip}>
              Skip Tour
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingModal 