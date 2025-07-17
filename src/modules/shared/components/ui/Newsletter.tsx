'use client'
import React, { useState } from 'react'
import { Button, Input, Card } from '@/modules/shared/components/ui'

interface NewsletterProps {
  className?: string
  variant?: 'default' | 'compact' | 'hero'
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
}

export const Newsletter: React.FC<NewsletterProps> = ({
  className = '',
  variant = 'default',
  title = "Stay Updated with Engineering Insights",
  description = "Subscribe to our newsletter for the latest engineering trends, project updates, and industry insights delivered to your inbox.",
  placeholder = "Enter your email address",
  buttonText = "Subscribe"
}) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError('Email address is required')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      // In a real application, this would send the email to your newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      console.log('Newsletter subscription:', email)
      
      setIsSubscribed(true)
      setEmail('')
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (value: string) => {
    setEmail(value)
    if (error) {
      setError('')
    }
  }

  if (isSubscribed) {
    return (
      <Card className={`text-center p-6 ${className}`}>
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You for Subscribing!</h3>
        <p className="text-gray-600 mb-4">
          You&apos;ll receive our latest engineering insights and updates in your inbox.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSubscribed(false)}
        >
          Subscribe Another Email
        </Button>
      </Card>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={placeholder}
              className={error ? 'border-red-500 focus:ring-red-500' : ''}
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="sm:flex-shrink-0"
          >
            {isSubmitting ? 'Subscribing...' : buttonText}
          </Button>
        </form>
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div className={`text-center ${className}`}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {description}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1">
              <Input
                type="email"
                value={email}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={placeholder}
                className={`bg-white text-gray-900 ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
              {error && (
                <p className="mt-1 text-sm text-red-200">{error}</p>
              )}
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              loading={isSubmitting}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              {isSubmitting ? 'Subscribing...' : buttonText}
            </Button>
          </form>
          <p className="text-sm text-blue-200 mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    )
  }

  return (
    <Card className={className}>
      <div className="p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={placeholder}
              className={error ? 'border-red-500 focus:ring-red-500' : ''}
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Subscribing...' : buttonText}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Join 2,500+ engineering professionals who trust our insights.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No spam</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Weekly updates</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}