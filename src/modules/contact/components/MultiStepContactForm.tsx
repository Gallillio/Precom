'use client'
import React, { useState, useCallback, useRef } from 'react'
import { ContactInfo } from '@/modules/shared/utils/types'
import { Button, Input, Card } from '@/modules/shared/components/ui'

interface MultiStepContactFormProps {
  className?: string
  onSubmit?: (data: ExtendedContactInfo) => void
  title?: string
  description?: string
}

interface ExtendedContactInfo extends ContactInfo {
  projectType: string
  budget: string
  timeline: string
  attachments?: File[]
  urgency: 'low' | 'medium' | 'high'
  preferredContact: 'email' | 'phone' | 'meeting'
}

const STEPS = [
  { id: 1, title: 'Contact Details', description: 'Tell us about yourself' },
  { id: 2, title: 'Project Information', description: 'Describe your project' },
  { id: 3, title: 'Requirements', description: 'Timeline and budget' },
  { id: 4, title: 'Attachments', description: 'Upload relevant files' },
  { id: 5, title: 'Review', description: 'Confirm your details' },
]

export const MultiStepContactForm: React.FC<MultiStepContactFormProps> = ({
  className = '',
  onSubmit,
  title = 'Start Your Engineering Project',
  description = 'Tell us about your project needs and we\'ll provide a comprehensive proposal.'
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ExtendedContactInfo>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    projectType: '',
    budget: '',
    timeline: '',
    attachments: [],
    urgency: 'medium',
    preferredContact: 'email',
  })
  
  const [errors, setErrors] = useState<Partial<ExtendedContactInfo>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<ExtendedContactInfo> = {}

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address'
        }
        if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number'
        }
        break
      case 2:
        if (!formData.projectType) newErrors.projectType = 'Project type is required'
        if (!formData.subject.trim()) newErrors.subject = 'Project subject is required'
        if (!formData.message.trim()) {
          newErrors.message = 'Project description is required'
        } else if (formData.message.trim().length < 20) {
          newErrors.message = 'Please provide more details (at least 20 characters)'
        }
        break
      case 3:
        if (!formData.budget) newErrors.budget = 'Budget range is required'
        if (!formData.timeline) newErrors.timeline = 'Timeline is required'
        break
      case 4:
        // File attachments are optional
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = useCallback((field: keyof ExtendedContactInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }, [errors])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(file => {
      // Limit file size to 10MB
      if (file.size > 10 * 1024 * 1024) {
        alert(`File "${file.name}" is too large. Maximum size is 10MB.`)
        return false
      }
      // Allow common file types
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ]
      if (!allowedTypes.includes(file.type)) {
        alert(`File "${file.name}" has an unsupported format.`)
        return false
      }
      return true
    })

    setFormData(prev => ({
      ...prev,
      attachments: [...(prev.attachments || []), ...validFiles]
    }))
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments?.filter((_, i) => i !== index) || []
    }))
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (onSubmit) {
        onSubmit(formData)
      }
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      projectType: '',
      budget: '',
      timeline: '',
      attachments: [],
      urgency: 'medium',
      preferredContact: 'email',
    })
    setCurrentStep(1)
    setIsSubmitted(false)
    setErrors({})
  }

  if (isSubmitted) {
    return (
      <Card className={`text-center p-12 ${className}`}>
        <div className="relative mb-8">
          {/* Success Animation */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {/* Confetti Animation */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-var(--color-primary) rounded-full animate-pulse"
                style={{
                  left: `${20 + (i * 12)}%`,
                  top: `${10 + (i % 2) * 20}%`,
                  animationDelay: `${i * 200}ms`,
                }}
              />
            ))}
          </div>
        </div>

        <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Your project details have been submitted successfully. Our engineering team will review your requirements 
          and get back to you within 24 hours with a detailed proposal.
        </p>
        
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
          <div className="text-sm text-blue-800 space-y-2">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold mr-3">1</div>
              <span>We&apos;ll review your project requirements</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold mr-3">2</div>
              <span>Our team will prepare a detailed proposal</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold mr-3">3</div>
              <span>We&apos;ll contact you to schedule a consultation</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={resetForm}
          >
            Submit Another Project
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/projects'}
          >
            View Our Portfolio
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className={`bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden ${className}`}>
      {/* Premium Header with Gradient */}
      <div className="bg-gradient-to-r from-[#003366] via-[#004080] to-[#00B4A6] p-8">
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">{title}</h2>
          <p className="text-blue-100 text-lg leading-relaxed drop-shadow-md">{description}</p>
          
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 opacity-20">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="p-8">

        {/* Premium Progress Indicator */}
        <div className="mb-10">
          <div className="relative">
            {/* Progress Bar Background */}
            <div className="absolute top-6 left-6 right-6 h-1 bg-gray-200 rounded-full"></div>
            
            {/* Active Progress Bar */}
            <div 
              className="absolute top-6 left-6 h-1 bg-gradient-to-r from-[#003366] to-[#00B4A6] rounded-full transition-all duration-500 ease-out"
              style={{ width: `calc(${((currentStep - 1) / (STEPS.length - 1)) * 100}% - 1.5rem + ${12 * ((currentStep - 1) / (STEPS.length - 1))}px)` }}
            ></div>
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-6 relative">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition-all duration-300 transform
                    ${currentStep >= step.id 
                      ? 'bg-gradient-to-br from-[#003366] to-[#00B4A6] text-white scale-110 shadow-[#003366]/30' 
                      : currentStep === step.id
                        ? 'bg-white border-2 border-[#00B4A6] text-[#00B4A6] shadow-[#00B4A6]/20 scale-105'
                        : 'bg-gray-200 text-gray-500 border-2 border-gray-300'
                    }
                  `}>
                    {currentStep > step.id ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  
                  {/* Step Labels */}
                  <div className="mt-3 text-center max-w-20">
                    <div className={`text-xs font-semibold leading-tight ${
                      currentStep >= step.id ? 'text-[#003366]' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Current Step Info */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-4 border border-blue-100">
            <h3 className="text-xl font-bold text-[#003366] mb-1">{STEPS[currentStep - 1].title}</h3>
            <p className="text-sm text-gray-600 font-medium">{STEPS[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Premium Form Content */}
        <div className="min-h-[500px] bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-8 shadow-inner">
          {/* Step 1: Contact Details */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#003366] to-[#00B4A6] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-[#003366] mb-2">Tell Us About Yourself</h4>
                <p className="text-gray-600">We'll use this information to personalize your experience</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center text-sm font-bold text-[#003366] mb-3">
                    <svg className="w-4 h-4 mr-2 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Full Name *
                  </label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className={`pl-12 py-4 text-lg bg-white border-2 rounded-xl shadow-sm transition-all duration-300 ${
                        errors.name 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-200 focus:border-[#00B4A6] focus:ring-[#00B4A6] hover:border-gray-300'
                      }`}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  {errors.name && (
                    <div className="flex items-center mt-2 text-sm text-red-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center text-sm font-bold text-[#003366] mb-3">
                    <svg className="w-4 h-4 mr-2 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Address *
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                      className={`pl-12 py-4 text-lg bg-white border-2 rounded-xl shadow-sm transition-all duration-300 ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-200 focus:border-[#00B4A6] focus:ring-[#00B4A6] hover:border-gray-300'
                      }`}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  {errors.email && (
                    <div className="flex items-center mt-2 text-sm text-red-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-2">
                  <label htmlFor="phone" className="flex items-center text-sm font-bold text-[#003366] mb-3">
                    <svg className="w-4 h-4 mr-2 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone Number
                  </label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className={`pl-12 py-4 text-lg bg-white border-2 rounded-xl shadow-sm transition-all duration-300 ${
                        errors.phone 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-200 focus:border-[#00B4A6] focus:ring-[#00B4A6] hover:border-gray-300'
                      }`}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  {errors.phone && (
                    <div className="flex items-center mt-2 text-sm text-red-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.phone}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="flex items-center text-sm font-bold text-[#003366] mb-3">
                    <svg className="w-4 h-4 mr-2 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Company/Organization
                  </label>
                  <div className="relative">
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Enter your company name"
                      className="pl-12 py-4 text-lg bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:border-[#00B4A6] focus:ring-[#00B4A6] hover:border-gray-300 transition-all duration-300"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <label className="flex items-center text-sm font-bold text-[#003366] mb-6">
                  <svg className="w-4 h-4 mr-2 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'email', label: 'Email', 
                      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    },
                    { value: 'phone', label: 'Phone Call', 
                      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    },
                    { value: 'meeting', label: 'In-Person Meeting', 
                      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleInputChange('preferredContact', option.value)}
                      className={`
                        flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 font-medium hover:scale-105 hover:shadow-md
                        ${formData.preferredContact === option.value
                          ? 'border-[#00B4A6] bg-gradient-to-br from-teal-50 to-blue-50 text-[#003366] shadow-lg'
                          : 'border-gray-200 hover:border-[#00B4A6] text-gray-700 bg-white'
                        }
                      `}
                    >
                      <div className={`mb-2 ${formData.preferredContact === option.value ? 'text-[#00B4A6]' : 'text-gray-400'}`}>
                        {option.icon}
                      </div>
                      <span className="text-sm text-center leading-tight">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Add CSS animation */}
          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
              animation: fadeIn 0.5s ease-out;
            }
          `}</style>

          {/* Step 2: Project Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Project Type *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Structural Engineering',
                    'Project Management',
                    'Engineering Consulting',
                    'Design Review & QA',
                    'Infrastructure Development',
                    'Renovation & Retrofitting'
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleInputChange('projectType', type)}
                      className={`
                        p-3 rounded-xl border-2 transition-all text-sm font-medium text-left
                        ${formData.projectType === type
                          ? 'border-var(--color-primary) bg-blue-50 text-var(--color-primary)'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }
                      `}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.projectType && <p className="mt-2 text-sm text-red-600">{errors.projectType}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-3">
                  Project Subject/Title *
                </label>
                <Input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Brief title for your project"
                  className={errors.subject ? 'border-red-500 focus:ring-red-500' : ''}
                />
                {errors.subject && <p className="mt-2 text-sm text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-3">
                  Project Description *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Describe your project in detail. Include scope, requirements, challenges, and any specific engineering needs..."
                  className={`
                    block w-full px-4 py-3 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-var(--color-primary) focus:border-transparent
                    resize-none transition-all
                    ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}
                  `}
                />
                {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Requirements */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Budget Range *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Under $10,000',
                    '$10,000 - $50,000',
                    '$50,000 - $100,000',
                    '$100,000 - $500,000',
                    '$500,000 - $1,000,000',
                    'Over $1,000,000'
                  ].map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => handleInputChange('budget', budget)}
                      className={`
                        p-3 rounded-xl border-2 transition-all text-sm font-medium
                        ${formData.budget === budget
                          ? 'border-var(--color-primary) bg-blue-50 text-var(--color-primary)'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }
                      `}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
                {errors.budget && <p className="mt-2 text-sm text-red-600">{errors.budget}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Project Timeline *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'ASAP (Rush)',
                    '1-3 months',
                    '3-6 months',
                    '6-12 months',
                    '1-2 years',
                    'Flexible'
                  ].map((timeline) => (
                    <button
                      key={timeline}
                      type="button"
                      onClick={() => handleInputChange('timeline', timeline)}
                      className={`
                        p-3 rounded-xl border-2 transition-all text-sm font-medium
                        ${formData.timeline === timeline
                          ? 'border-var(--color-primary) bg-blue-50 text-var(--color-primary)'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }
                      `}
                    >
                      {timeline}
                    </button>
                  ))}
                </div>
                {errors.timeline && <p className="mt-2 text-sm text-red-600">{errors.timeline}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Project Urgency
                </label>
                <div className="flex gap-4">
                  {[
                    { 
                      value: 'low', 
                      label: 'Low Priority', 
                      color: 'green', 
                      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" className="text-green-500" /></svg>
                    },
                    { 
                      value: 'medium', 
                      label: 'Standard', 
                      color: 'yellow', 
                      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" className="text-yellow-500" /></svg>
                    },
                    { 
                      value: 'high', 
                      label: 'High Priority', 
                      color: 'red', 
                      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" className="text-red-500" /></svg>
                    }
                  ].map((urgency) => (
                    <button
                      key={urgency.value}
                      type="button"
                      onClick={() => handleInputChange('urgency', urgency.value)}
                      className={`
                        flex-1 p-3 rounded-xl border-2 transition-all text-sm font-medium
                        ${formData.urgency === urgency.value
                          ? 'border-var(--color-primary) bg-blue-50 text-var(--color-primary)'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }
                      `}
                    >
                      <div className="mb-1 flex justify-center">{urgency.icon}</div>
                      {urgency.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: File Upload */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Project Files</h3>
                <p className="text-gray-600 mb-6">
                  Upload any relevant documents, drawings, photos, or specifications (optional)
                </p>
              </div>

              <div 
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-var(--color-primary) transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5L12 5H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supported: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, GIF (max 10MB each)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {formData.attachments && formData.attachments.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Uploaded Files:</h4>
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="text-gray-400 mr-3">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Review Your Information</h3>
                <p className="text-gray-600">
                  Please review all details before submitting your project request
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div><span className="font-medium">Name:</span> {formData.name}</div>
                    <div><span className="font-medium">Email:</span> {formData.email}</div>
                    <div><span className="font-medium">Phone:</span> {formData.phone || 'Not provided'}</div>
                    <div><span className="font-medium">Company:</span> {formData.company || 'Not provided'}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Project Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Type:</span> {formData.projectType}</div>
                    <div><span className="font-medium">Subject:</span> {formData.subject}</div>
                    <div><span className="font-medium">Description:</span> {formData.message}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div><span className="font-medium">Budget:</span> {formData.budget}</div>
                    <div><span className="font-medium">Timeline:</span> {formData.timeline}</div>
                    <div><span className="font-medium">Urgency:</span> {formData.urgency}</div>
                  </div>
                </div>

                {formData.attachments && formData.attachments.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Attachments</h4>
                    <div className="text-sm">
                      {formData.attachments.map((file, index) => (
                        <div key={index}>{file.name}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <div>
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
              >
                ← Previous
              </Button>
            )}
          </div>

          <div className="text-sm text-gray-500">
            Step {currentStep} of {STEPS.length}
          </div>

          <div>
            {currentStep < STEPS.length ? (
              <Button
                type="button"
                variant="primary"
                onClick={nextStep}
              >
                Next →
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Project'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiStepContactForm