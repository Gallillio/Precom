'use client'
import React, { useEffect, useState } from 'react'
import { Parallax } from '@/modules/shared/components/ui/Parallax'
import { COMPANY_INFO } from '@/modules/shared/utils/constants'

interface AboutHeroProps {
  className?: string
}

export const AboutHero: React.FC<AboutHeroProps> = ({ className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className={`relative min-h-[70vh] flex items-center justify-center overflow-hidden ${className}`}>
      {/* Hero Background Image with Parallax */}
      <Parallax speed={0.2} className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/about/team-hero.jpg')`,
          }}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-blue)]/80 via-[var(--primary-blue)]/70 to-[var(--accent-teal)]/60" />
      </Parallax>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent-teal)]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transform transition-all duration-1000 delay-300 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Company Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
            <div className="w-3 h-3 bg-[var(--accent-teal)] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium tracking-wider uppercase">
              About {COMPANY_INFO.name}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="heading-hero text-white mb-8 max-w-4xl mx-auto leading-tight">
            <span className="block">Engineering</span>
            <span className="block bg-gradient-to-r from-[var(--accent-teal)] to-white bg-clip-text text-transparent">
              Excellence Since 2010
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-white/90 mb-6 max-w-4xl mx-auto font-light leading-relaxed">
            We are a leading engineering consultancy dedicated to delivering innovative, 
            sustainable, and reliable solutions for complex engineering challenges.
          </p>

          <p className="text-lg text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Our expertise spans across multiple disciplines, ensuring comprehensive 
            support for all your engineering needs while building lasting partnerships 
            with forward-thinking organizations.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "15+", label: "Years of Excellence", icon: "🏆" },
              { number: "500+", label: "Projects Completed", icon: "🏗️" },
              { number: "150+", label: "Happy Clients", icon: "🤝" },
              { number: "25+", label: "Expert Engineers", icon: "👥" }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-700 delay-${(index + 1) * 150} ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[var(--accent-teal)] transition-colors duration-300">
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

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent z-10" />
    </section>
  )
}