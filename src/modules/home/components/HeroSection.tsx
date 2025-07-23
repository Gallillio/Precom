'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui'
import { VideoBackground } from '@/modules/shared/components/ui/VideoBackground'
import { ScrollIndicator } from '@/modules/shared/components/ui/ScrollIndicator'
import { Parallax } from '@/modules/shared/components/ui/Parallax'
import { COMPANY_INFO, ROUTES } from '@/modules/shared/utils/constants'

interface HeroSectionProps {
  className?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroContent = {
    headline: "Engineering Tomorrow's Vehicles",
    subheadline: "Leading automotive engineering solutions in Egypt that drive the future of vehicle development and automotive technology.",
    description: "We combine decades of automotive expertise with cutting-edge technology to deliver exceptional vehicle engineering results for our Egyptian automotive clients and partners across the Middle East."
  }

  const stats = [
    { number: "150+", label: "Vehicles Developed", icon: "🚗" },
    { number: "35+", label: "Egyptian Clients", icon: "🇪🇬" },
    { number: "12+", label: "Years in Egypt", icon: "⚡" },
    { number: "98%", label: "Client Satisfaction", icon: "✨" }
  ]

  const fallbackImages = [
    '/images/hero/hero-1-manufacturing.png',
    '/images/hero/hero-2-engineering-team.png',
    '/images/hero/hero-3-testing-facility.png',
    '/images/hero/hero-4-engineering-tools.png',
    '/images/hero/hero-5-research-facility.png'
  ]

  useEffect(() => {
    setIsLoaded(true)
    
    // Debug log
    console.log('Hero images paths:', fallbackImages)
    console.log('Current slide:', currentSlide, 'Image:', fallbackImages[currentSlide])
    
    // Auto-rotate hero images (Ken Burns effect)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const newSlide = (prev + 1) % fallbackImages.length
        console.log('Switching to slide:', newSlide, 'Image:', fallbackImages[newSlide])
        return newSlide
      })
    }, 6000) // Slightly faster rotation to showcase all 5 images

    return () => clearInterval(interval)
  }, [])

  const handleGetStarted = () => {
    // Smooth scroll to next section or navigate to contact
    const nextSection = document.querySelector('#services')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Hero Background Images */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${fallbackImages[currentSlide]})`
        }}
      />
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(0, 51, 102, 0.4) 0%,
            rgba(0, 180, 166, 0.28) 50%,
            rgba(0, 51, 102, 0.36) 100%
          )`
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[var(--accent-teal)]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--primary-blue)]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transform transition-all duration-1000 delay-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>

          {/* Main Headline */}
          <h1 className="heading-hero text-white mb-6 max-w-5xl mx-auto leading-tight">
            <span className="block">{heroContent.headline.split(' ').slice(0, 2).join(' ')}</span>
            <span className="block bg-gradient-to-r from-[var(--accent-teal)] to-white bg-clip-text text-transparent">
              {heroContent.headline.split(' ').slice(2).join(' ')}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-white/90 mb-4 max-w-4xl mx-auto font-light leading-relaxed">
            {heroContent.subheadline}
          </p>

          {/* Description */}
          <p className="text-lg text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            {heroContent.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              variant="teal" 
              size="xl"
              className="group w-full sm:w-auto px-12 py-4 text-lg font-semibold shadow-2xl hover:shadow-[var(--accent-teal)]/25 transform hover:scale-105 transition-all duration-300"
              onClick={handleGetStarted}
            >
              <span>Get Started</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Link href={ROUTES.projects}>
              <Button 
                variant="outline" 
                size="xl"
                className="group w-full sm:w-auto px-12 py-4 text-lg font-semibold border-white/30 text-white hover:bg-black/20 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>View Our Work</span>
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-700 delay-${(index + 1) * 200} ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-black/40 transition-all duration-300 group">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:text-[var(--accent-teal)] transition-colors duration-300">
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

      {/* Scroll Indicator */}
      <ScrollIndicator 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        targetId="services"
        text="Explore Services"
        variant="arrow"
      />

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent z-10" />
      
    </section>
  )
}