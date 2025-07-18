'use client'
import React from 'react'
import { Button } from '@/modules/shared/components/ui'
import { COMPANY_INFO } from '@/modules/shared/utils/constants'

interface ContactHeroProps {
  title?: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  className?: string
  showQuickContact?: boolean
}

export const ContactHero: React.FC<ContactHeroProps> = ({
  title = "Contact Our Engineering Experts",
  subtitle = "Ready to Start Your Project?",
  description = "Get in touch with our professional engineering team for consultation, project planning, or technical support. We're here to help turn your vision into reality.",
  backgroundImage,
  className = '',
  showQuickContact = true
}) => {
  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const quickContactActions = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Call Now',
      subtitle: COMPANY_INFO.phone,
      action: () => window.open(`tel:${COMPANY_INFO.phone}`, '_self'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Us',
      subtitle: COMPANY_INFO.email,
      action: () => window.open(`mailto:${COMPANY_INFO.email}`, '_self'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Schedule Call',
      subtitle: 'Book consultation',
      action: scrollToForm,
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ]

  const emergencyInfo = {
    available: true,
    phone: '+20 1234567890',
    description: 'Emergency engineering support available 24/7'
  }

  return (
    <section className={`relative py-20 overflow-hidden ${className}`}>
      {/* Background */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={backgroundImage}
              alt="Contact us"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-900 bg-opacity-80"></div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"></div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 border border-white rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Subtitle */}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-blue-500 bg-opacity-30 backdrop-blur-sm rounded-full text-blue-100 text-sm font-medium">
              {subtitle}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>

          {/* Main CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              onClick={scrollToForm}
            >
              Start Your Project
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
              onClick={() => {
                const infoElement = document.getElementById('contact-info')
                if (infoElement) {
                  infoElement.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              View Contact Info
            </Button>
          </div>

          {/* Quick Contact Actions */}
          {showQuickContact && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
              {quickContactActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`${action.color} text-white p-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8">
                      {action.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{action.title}</div>
                      <div className="text-xs opacity-90">{action.subtitle}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Emergency Contact */}
          {emergencyInfo.available && (
            <div className="bg-red-600 bg-opacity-20 backdrop-blur-sm border border-red-400 border-opacity-30 rounded-xl p-4 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 text-red-300">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-red-200">Emergency Support</div>
                  <a 
                    href={`tel:${emergencyInfo.phone}`}
                    className="text-red-100 hover:text-white transition-colors"
                  >
                    {emergencyInfo.phone}
                  </a>
                </div>
              </div>
              <p className="text-xs text-red-200 mt-2 opacity-90">
                {emergencyInfo.description}
              </p>
            </div>
          )}

          {/* Response Time Promise */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">24hr</div>
              <div className="text-blue-200 text-sm">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">Free</div>
              <div className="text-blue-200 text-sm">Initial Consultation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">15+</div>
              <div className="text-blue-200 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}