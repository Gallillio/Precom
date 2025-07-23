'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/modules/shared/components/ui'
import { Parallax } from '@/modules/shared/components/ui/Parallax'

interface ServiceHeroProps {
  title?: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  className?: string
}

interface ServiceStat {
  number: string
  label: string
  icon: React.ReactNode
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({
  title = "Professional Engineering Services",
  subtitle = "Excellence in Every Project", 
  description = "Comprehensive engineering solutions tailored to your specific needs, delivering innovative and reliable results that exceed expectations.",
  backgroundImage,
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const stats: ServiceStat[] = [
    { 
      number: "500+", 
      label: "Projects Delivered", 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      number: "25+", 
      label: "Years Experience", 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      number: "15+", 
      label: "Service Areas", 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    { 
      number: "100%", 
      label: "Client Satisfaction", 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    }
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className={`relative min-h-[85vh] flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background with Parallax */}
      <Parallax speed={0.2} className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url('/images/services/services-hero.jpg')`,
          }}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-blue)]/90 via-[var(--primary-blue)]/80 to-[var(--accent-teal)]/70" />
      </Parallax>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent-teal)]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transform transition-all duration-1000 delay-300 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Service Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
            <div className="w-3 h-3 bg-[var(--accent-teal)] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium tracking-wider uppercase">
              {subtitle}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="heading-hero text-white mb-8 max-w-5xl mx-auto leading-tight">
            <span className="block">{title.split(' ').slice(0, 2).join(' ')}</span>
            <span className="block bg-gradient-to-r from-[var(--accent-teal)] to-white bg-clip-text text-transparent">
              {title.split(' ').slice(2).join(' ')}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-white/90 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              variant="teal"
              size="xl"
              className="group px-12 py-4 text-lg font-semibold shadow-2xl hover:shadow-[var(--accent-teal)]/25 transform hover:scale-105 transition-all duration-300"
              onClick={() => {
                const element = document.getElementById('services-content')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              <span>Explore Services</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="group bg-black/30 border-white/30 text-white hover:bg-black/20 hover:border-white/50 px-12 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
              onClick={() => window.location.href = '/contact'}
            >
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Free Consultation</span>
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-700 delay-${(index + 1) * 150 + 800} ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[var(--accent-teal)] transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-white/80 text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent z-10" />
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="animate-bounce">
          <div className="w-6 h-6 rounded-full border-2 border-white/50 flex items-center justify-center">
            <svg className="w-3 h-3 text-white/75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}