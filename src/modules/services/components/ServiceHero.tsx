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
  icon: string
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
    { number: "500+", label: "Projects Delivered", icon: "🏗️" },
    { number: "25+", label: "Years Experience", icon: "⚡" },
    { number: "15+", label: "Service Areas", icon: "🔧" },
    { number: "100%", label: "Client Satisfaction", icon: "✨" }
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
              className="group bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-12 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
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