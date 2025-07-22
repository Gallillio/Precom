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
    <Card className={className}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                  ${currentStep >= step.id 
                    ? 'bg-var(--color-primary) text-white' 
                    : 'bg-gray-200 text-gray-500'
                  }
                `}>
                  {currentStep > step.id ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`
                    flex-1 h-1 mx-4
                    ${currentStep > step.id ? 'bg-var(--color-primary)' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">{STEPS[currentStep - 1].title}</h3>
            <p className="text-sm text-gray-600">{STEPS[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="min-h-[400px]">
          {/* Step 1: Contact Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-3">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className={errors.name ? 'border-red-500 focus:ring-red-500' : ''}
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-3">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-3">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    className={errors.phone ? 'border-red-500 focus:ring-red-500' : ''}
                  />
                  {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-800 mb-3">
                    Company/Organization
                  </label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Preferred Contact Method
                </label>
                <div className="flex gap-4">
                  {[
                    { value: 'email', label: 'Email', icon: '📧' },
                    { value: 'phone', label: 'Phone Call', icon: '📞' },
                    { value: 'meeting', label: 'In-Person Meeting', icon: '🤝' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleInputChange('preferredContact', option.value)}
                      className={`
                        flex-1 p-3 rounded-xl border-2 transition-all text-sm font-medium
                        ${formData.preferredContact === option.value
                          ? 'border-var(--color-primary) bg-blue-50 text-var(--color-primary)'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }
                      `}
                    >
                      <span className="text-lg mb-1 block">{option.icon}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

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
                    { value: 'low', label: 'Low Priority', color: 'green', icon: '🟢' },
                    { value: 'medium', label: 'Standard', color: 'yellow', icon: '🟡' },
                    { value: 'high', label: 'High Priority', color: 'red', icon: '🔴' }
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
                      <span className="text-lg mb-1 block">{urgency.icon}</span>
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
                <div className="text-4xl mb-4">📁</div>
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
                        <div className="text-2xl mr-3">📄</div>
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
    </Card>
  )
}

export default MultiStepContactForm