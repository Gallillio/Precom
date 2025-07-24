'use client'
import React, { useState, useEffect, useRef } from 'react'
import { StatsCard } from '@/modules/shared/components/ui/AnimatedCounter'

interface StatsSectionProps {
  className?: string
}

export const StatsSection: React.FC<StatsSectionProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const statsData = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
      value: 150,
      suffix: '+',
      label: 'Vehicles Developed',
      description: 'Successfully engineered across Egyptian automotive sectors',
      variant: 'gradient' as const
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: 35,
      label: 'Egyptian Clients',
      description: 'Egyptian automotive reach with specialized local expertise',
      variant: 'default' as const
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: 12,
      suffix: '+',
      label: 'Years in Egypt',
      description: 'Specialized automotive engineering excellence in Egypt',
      variant: 'default' as const
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: 100,
      suffix: '%',
      label: 'Client Satisfaction',
      description: 'Committed to exceeding expectations',
      variant: 'gradient' as const
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className={`relative py-24 overflow-hidden ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] via-[var(--primary-blue)] to-[var(--accent-teal)]" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px'
          }} />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-[var(--accent-teal)]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
              <div className="w-2 h-2 bg-[var(--accent-teal)] rounded-full animate-pulse" />
              <span className="text-white text-sm font-medium tracking-wider uppercase">
                Proven Excellence
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Numbers That{' '}
              <span className="bg-gradient-to-r from-[var(--accent-teal)] to-white bg-clip-text text-transparent">
                Define Excellence
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Our automotive track record speaks for itself. These milestones represent years of 
              dedication to automotive engineering excellence and client satisfaction.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 delay-${(index + 1) * 200} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
            >
              <StatsCard
                {...stat}
                className="h-full"
              />
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-1200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>

          {/* Decorative separator */}
          <div className="flex items-center justify-center space-x-4">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="w-3 h-3 bg-[var(--accent-teal)] rounded-full animate-pulse" />
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}