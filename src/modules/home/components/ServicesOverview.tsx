'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ServiceCard } from '@/modules/shared/components/ui/ServiceCard'
import { SERVICES, ROUTES } from '@/modules/shared/utils/constants'

interface ServicesOverviewProps {
  className?: string
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(true)

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
      cog: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      beaker: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
        </svg>
      ),
      lightbulb: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      'shield-check': (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    }
    return icons[iconName as keyof typeof icons] || icons.cog
  }

  const servicesData = Object.entries(SERVICES).map(([key, service], index) => ({
    title: service.title,
    description: service.description,
    icon: getServiceIcon(service.icon),
    features: [
      'Automotive consultation',
      'Vehicle analysis & testing',
      'Performance optimization',
      '24/7 automotive support'
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
              Automotive Engineering Solutions for{' '}
              <span className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-teal)] bg-clip-text text-transparent">
                Tomorrow's Vehicles
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              From concept to production, we deliver innovative automotive engineering solutions 
              that push the boundaries of vehicle performance while ensuring safety, 
              efficiency, and automotive excellence.
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
                Ready to Start Your Next Vehicle Project?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let's discuss how our automotive engineering expertise can bring your vehicle vision to life. 
                Get in touch for an automotive consultation.
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
                  <button className="group px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-black/20 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
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
                  <div className="text-2xl font-bold">150+</div>
                  <div className="text-sm text-white/80">Vehicles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">35+</div>
                  <div className="text-sm text-white/80">Egyptian Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">12+</div>
                  <div className="text-sm text-white/80">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">98%</div>
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