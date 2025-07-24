'use client'
import React from 'react'

interface AboutHeroProps {
  className?: string
}

export const AboutHero: React.FC<AboutHeroProps> = ({ className = '' }) => {
  return (
    <section className={`bg-white pt-32 pb-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wider text-[#003366] mb-8">
            ABOUT PRECOM
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#003366] leading-tight max-w-4xl mx-auto mb-8">
            Engineering Excellence That Shapes the 
            <span className="text-[#00B4A6]"> Future of Automotive Innovation</span>
          </h1>
          
          <p className="text-xl text-[#003366]/70 max-w-3xl mx-auto leading-relaxed">
            Since 2010, we have been Egypt&apos;s leading automotive engineering consultancy, 
            delivering innovative solutions that drive the industry forward.
          </p>
        </div>
      </div>
    </section>
  )
}