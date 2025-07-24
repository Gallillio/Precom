'use client'
import React from 'react'
import Image from 'next/image'

interface HeroSectionProps {
  className?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  const heroImages = [
    {
      src: '/images/hero/hero-1-manufacturing.png',
      alt: 'Advanced Manufacturing',
      size: 'large',
      hasOverlay: false
    },
    {
      src: '/images/hero/hero-2-engineering-team.png',
      alt: 'Engineering Excellence',
      size: 'small',
      hasOverlay: false
    },
    {
      src: '/images/hero/hero-3-testing-facility.png',
      alt: 'Testing Innovation',
      size: 'large',
      hasOverlay: true,
      overlayContent: {
        tag: 'CASE STUDY',
        date: 'JULY 23, 2025',
        title: 'Revolutionary Engine Design Delivers 40% Efficiency Boost'
      }
    },
    {
      src: '/images/hero/hero-4-engineering-tools.png',
      alt: 'Precision Tools',
      size: 'small',
      hasOverlay: false
    },
    {
      src: '/images/hero/hero-5-research-facility.png',
      alt: 'Research Excellence',
      size: 'large',
      hasOverlay: false
    }
  ]

  return (
    <section className={`bg-white py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Text */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-wider text-[#003366] mb-8">
            WELCOME TO PRECOM
          </p>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#003366] leading-tight max-w-5xl mx-auto">
            Engineering Excellence That Drives the Future of 
            <span className="text-[#00B4A6]"> Automotive Innovation</span>
          </h1>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {heroImages.map((image, index) => (
            <div 
              key={index} 
              className={`relative ${
                image.size === 'large' 
                  ? 'lg:col-span-1 h-96 lg:h-[500px]' 
                  : 'lg:col-span-1 h-96 lg:h-[350px] lg:mt-16'
              } ${index < 2 ? 'md:col-span-1' : index === 2 ? 'md:col-span-2 lg:col-span-1' : 'md:col-span-1'}`}
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay for featured content */}
                {image.hasOverlay && image.overlayContent && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                        <p className="text-xs font-semibold tracking-wider text-[#00B4A6] mb-1">
                          {image.overlayContent.tag}
                        </p>
                        <p className="text-xs text-white/80 mb-2">
                          {image.overlayContent.date}
                        </p>
                        <h3 className="text-lg font-semibold leading-tight">
                          {image.overlayContent.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
              
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}