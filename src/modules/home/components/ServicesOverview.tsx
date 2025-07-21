'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ServiceCard } from '@/modules/shared/components/ui/ServiceCard'
import { SERVICES, ROUTES } from '@/modules/shared/utils/constants'

interface ServicesOverviewProps {
  className?: string
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('services')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const getServiceIcon = (iconName: string) => {
    const icons = {
      building: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      clipboard: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      lightbulb: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      search: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    }
    return icons[iconName as keyof typeof icons] || icons.building
  }

  const servicesData = Object.entries(SERVICES).map(([key, service], index) => ({
    title: service.title,
    description: service.description,
    icon: getServiceIcon(service.icon),
    features: [
      'Professional consultation',
      'Detailed analysis & reporting',
      'Quality assurance',
      '24/7 support'
    ],
    link: `/services/${key}`,
    variant: index === 1 ? 'featured' as const : 'default' as const
  }))

  return (
    <section id="services" className={`relative py-24 overflow-hidden ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--background-tertiary)] to-white" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--accent-teal)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--primary-blue)]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-[var(--accent-teal)]/10 rounded-full px-6 py-2 mb-6">
              <div className="w-2 h-2 bg-[var(--accent-teal)] rounded-full animate-pulse" />
              <span className="text-[var(--accent-teal)] text-sm font-medium tracking-wider uppercase">
                Our Expertise
              </span>
            </div>

            {/* Main Title */}
            <h2 className="heading-1 text-[var(--text-primary)] mb-6 max-w-4xl mx-auto">
              Engineering Solutions for{' '}
              <span className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-teal)] bg-clip-text text-transparent">
                Tomorrow's World
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              From concept to completion, we deliver innovative engineering solutions 
              that push the boundaries of what's possible while ensuring safety, 
              sustainability, and excellence.
            </p>

            {/* Decorative Line */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--accent-teal)]" />
              <div className="w-2 h-2 bg-[var(--accent-teal)] rounded-full" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--accent-teal)]" />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action Section */}
        <div className={`text-center transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-gradient-to-br from-[var(--primary-blue)] to-[var(--accent-teal)] rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-24 translate-y-24" />
            </div>

            <div className="relative">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Start Your Next Project?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let's discuss how our engineering expertise can bring your vision to life. 
                Get in touch for a consultation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={ROUTES.services}>
                  <button className="group px-8 py-4 bg-white text-[var(--primary-blue)] rounded-xl font-semibold text-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                    <span>View All Services</span>
                    <svg className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>
                <Link href={ROUTES.contact}>
                  <button className="group px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
                    <span>Get Quote</span>
                    <svg className="w-5 h-5 ml-2 inline group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-8 mt-8 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-white/80">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">25</div>
                  <div className="text-sm text-white/80">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-white/80">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-white/80">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}