'use client'
import React from 'react'

interface ContactHeroProps {
  title?: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  className?: string
  showQuickContact?: boolean
}

export const ContactHero: React.FC<ContactHeroProps> = ({
  title = "Contact Our Engineering Experts",
  subtitle = "GET IN TOUCH",
  description = "Ready to discuss your automotive engineering project? Our team of experts is here to provide consultation, technical support, and innovative solutions.",
  className = ''
}) => {
  return (
    <section className={`bg-white pt-32 pb-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wider text-[#003366] mb-8">
            {subtitle}
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#003366] leading-tight max-w-4xl mx-auto mb-8">
            Contact Our Engineering 
            <span className="text-[#00B4A6]"> Experts</span>
          </h1>
          
          <p className="text-xl text-[#003366]/70 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}