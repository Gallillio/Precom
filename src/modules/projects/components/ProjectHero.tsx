'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/modules/shared/components/ui'
import Image from 'next/image'

interface ProjectHeroProps {
  title?: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  backgroundImages?: string[] // Multiple images for Ken Burns effect
  onCTAClick?: () => void
  ctaText?: string
  stats?: Array<{
    label: string
    value: string
  }>
  className?: string
}

const ProjectHero: React.FC<ProjectHeroProps> = ({
  title = "Engineering Portfolio",
  subtitle = "Showcasing Innovation & Excellence",
  description = "Discover our comprehensive portfolio of successful engineering projects that demonstrate technical expertise, innovative solutions, and unwavering commitment to client success across diverse industries.",
  backgroundImage,
  backgroundImages = [
    '/images/projects/hero-construction-site.jpg',
    '/images/projects/hero-engineering-office.jpg',
    '/images/projects/hero-infrastructure-bridge.jpg',
    '/images/projects/hero-building-design.jpg'
  ],
  onCTAClick,
  ctaText = "Explore Projects",
  stats = [
    { label: "Projects Completed", value: "500+" },
    { label: "Years of Experience", value: "15+" },
    { label: "Client Satisfaction", value: "98%" },
    { label: "Countries Served", value: "12+" }
  ],
  className = '',
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Ken Burns effect - rotate through images
  useEffect(() => {
    if (backgroundImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 8000) // Change image every 8 seconds

    return () => clearInterval(interval)
  }, [backgroundImages.length])

  useEffect(() => {
    setIsLoaded(true)
  }, [])
  const imagesToUse = backgroundImage ? [backgroundImage] : backgroundImages

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Ken Burns Effect Background Images */}
      {imagesToUse.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-3000 ${
            index === currentImageIndex ? 'opacity-40' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0,51,102,0.85) 0%, rgba(0,180,166,0.75) 100%), url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: index === currentImageIndex ? 'kenBurnsZoom 8s ease-in-out' : 'none'
          }}
        />
      ))}

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-white/30 rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-white/15 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Blueprint-style grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" 
               style={{
                 backgroundImage: `
                   linear-gradient(white 1px, transparent 1px),
                   linear-gradient(90deg, white 1px, transparent 1px)
                 `,
                 backgroundSize: '80px 80px'
               }}>
          </div>
        </div>
      </div>
      
      {/* Premium Content Container */}
      <div className={`relative z-10 container mx-auto px-4 text-center transition-all duration-1000 transform ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}>
        <div className="max-w-5xl mx-auto">
          {/* Premium Badge */}
          <div className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
            <svg className="w-6 h-6 mr-3 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-lg font-bold text-white">Professional Engineering Portfolio</span>
          </div>

          {/* Main Headlines */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
            {title.split(' ').map((word, index) => (
              <span key={index} className={index === 1 ? 'block bg-gradient-to-r from-[#00B4A6] to-[#00D4C4] bg-clip-text text-transparent' : ''}>
                {word}{index === 0 ? ' ' : ''}
              </span>
            ))}
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-4xl mx-auto font-light drop-shadow-lg">
            {description}
          </p>

          {/* Premium Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            {onCTAClick && (
              <button 
                onClick={onCTAClick}
                className="group bg-gradient-to-r from-[#003366] to-[#00B4A6] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <svg className="w-5 h-5 mr-2 inline group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {ctaText}
              </button>
            )}
            <button 
              onClick={() => {
                document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <svg className="w-5 h-5 mr-2 inline group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Featured Projects
            </button>
          </div>
          
          {/* Premium Stats Section */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-blue-200 text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-8 right-8 flex space-x-2">
        {imagesToUse.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-[#00B4A6] scale-125' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes kenBurnsZoom {
          0% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(0.5deg);
          }
          100% {
            transform: scale(1.15) rotate(-0.3deg);
          }
        }
      `}</style>
    </section>
  )
}

export default ProjectHero