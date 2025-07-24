'use client'
import React from 'react'

interface ServiceHeroProps {
  title?: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  className?: string
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({
  title = "Professional Automotive Engineering Services",
  subtitle = "ENGINEERING EXCELLENCE", 
  description = "Comprehensive automotive solutions designed to drive innovation and deliver exceptional results for the Egyptian automotive industry.",
  className = ''
}) => {
  return (
    <section className={`bg-white pt-32 pb-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wider text-[#003366] mb-8">
            {subtitle}
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#003366] leading-tight max-w-5xl mx-auto mb-8">
            {title.split(' ').slice(0, -2).join(' ')} 
            <span className="text-[#00B4A6]"> {title.split(' ').slice(-2).join(' ')}</span>
          </h1>
          
          <p className="text-xl text-[#003366]/70 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}