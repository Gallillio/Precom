'use client'
import React from 'react'
import { Button } from '@/modules/shared/components/ui'

interface ServiceHeroProps {
  title?: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  className?: string
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({
  title = "Professional Engineering Services",
  subtitle = "Excellence in Every Project",
  description = "Comprehensive engineering solutions tailored to your specific needs. From structural design to project management, we deliver innovative and reliable results.",
  backgroundImage,
  className = ''
}) => {
  return (
    <section className={`relative py-20 ${className}`}>
      {/* Background */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={backgroundImage}
              alt="Engineering services"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-900 bg-opacity-75"></div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"></div>
        )}
      </div>

      {/* Geometric overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              onClick={() => {
                document.getElementById('services-grid')?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
            >
              Explore Our Services
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
              onClick={() => {
                window.location.href = '/contact'
              }}
            >
              Get Free Consultation
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-200 text-sm md:text-base">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-blue-200 text-sm md:text-base">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-blue-200 text-sm md:text-base">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-200 text-sm md:text-base">Support Available</div>
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