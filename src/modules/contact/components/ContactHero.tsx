'use client'
import React, { useEffect, useState } from 'react'
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
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <section className={`relative min-h-screen flex items-center overflow-hidden ${className}`}>
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Video placeholder - replace with actual video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            transform: `translateY(${scrollY * 0.5}px)`,
            filter: 'brightness(0.6) contrast(1.2)'
          }}
        >
          <source src="/videos/contact-hero-consultation.mp4" type="video/mp4" />
          {/* Fallback image */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#003366] via-blue-700 to-indigo-800"></div>
        </video>
        
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-blue-900/40 to-blue-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {/* Geometric patterns inspired by engineering */}
        <div className="absolute top-20 left-20 w-40 h-40 border border-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-24 h-24 border border-white/20 rotate-45 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 border border-white/25 rounded-full"></div>
        <div className="absolute bottom-60 right-20 w-32 h-32 border border-white/15 rotate-12"></div>
        
        {/* Blueprint-style grid lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" 
               style={{
                 backgroundImage: `
                   linear-gradient(white 1px, transparent 1px),
                   linear-gradient(90deg, white 1px, transparent 1px)
                 `,
                 backgroundSize: '60px 60px'
               }}>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="text-white lg:text-left text-center">
              {/* Subtitle */}
              <div className="mb-6">
                <span className="inline-flex items-center px-6 py-3 bg-[#00B4A6]/20 backdrop-blur-sm rounded-full text-[#00B4A6] text-sm font-semibold border border-[#00B4A6]/30">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {subtitle}
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                <span className="block">Connect With</span>
                <span className="block bg-gradient-to-r from-[#00B4A6] to-blue-400 bg-clip-text text-transparent">
                  Engineering Excellence
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl lg:max-w-none lg:pr-8">
                {description}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 mb-8 max-w-md mx-auto lg:max-w-none lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-[#00B4A6] mb-1">24hr</div>
                  <div className="text-sm text-gray-300">Response Time</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-[#00B4A6] mb-1">Free</div>
                  <div className="text-sm text-gray-300">Consultation</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-[#00B4A6] mb-1">15+</div>
                  <div className="text-sm text-gray-300">Years Experience</div>
                </div>
              </div>

              {/* Main CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-[#00B4A6] to-[#00A098] hover:from-[#00A098] to-[#008B85] text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  onClick={scrollToForm}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Start Your Project
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white hover:backdrop-blur-md font-semibold transition-all duration-300"
                  onClick={() => {
                    const infoElement = document.getElementById('contact-info')
                    if (infoElement) {
                      infoElement.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Contact Information
                </Button>
              </div>
            </div>

            {/* Right Column - Quick Contact Cards */}
            <div className="lg:pl-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">Get In Touch Instantly</h3>
                <div className="space-y-4">
                  {quickContactActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-102 group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                          {action.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-white group-hover:text-[#00B4A6] transition-colors duration-300">
                            {action.title}
                          </div>
                          <div className="text-sm text-gray-300">{action.subtitle}</div>
                        </div>
                        <div className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Band */}
      {emergencyInfo.available && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-red-500/90 backdrop-blur-md border border-red-400/50 rounded-full px-6 py-3 flex items-center space-x-3 shadow-lg">
            <div className="w-5 h-5 text-red-100 animate-pulse">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="text-sm text-red-100">
              <span className="font-semibold">Emergency: </span>
              <a 
                href={`tel:${emergencyInfo.phone}`}
                className="hover:text-white transition-colors underline"
              >
                {emergencyInfo.phone}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      {!emergencyInfo.available && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce cursor-pointer" onClick={scrollToForm}>
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}