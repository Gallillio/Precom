'use client'
import React from 'react'
import Link from 'next/link'
import { DETAILED_SERVICES } from '../utils/serviceData'
import { ROUTES } from '@/modules/shared/utils/constants'

interface ServiceDetailHeroProps {
  serviceSlug: string
  service: { title: string; description: string; icon: string }
}

export const ServiceDetailHero: React.FC<ServiceDetailHeroProps> = ({ serviceSlug, service }) => {
  const detailedService = DETAILED_SERVICES[serviceSlug]
  
  if (!detailedService) return null

  return (
    <section 
      className="relative pt-32 pb-20 bg-gradient-to-br from-[#003366]/95 to-[#00B4A6]/90"
      style={{
        backgroundImage: detailedService.heroImage ? `url(${detailedService.heroImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/80 to-[#00B4A6]/70" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link href={ROUTES.home} className="text-white/70 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-white/50">/</span>
          <Link href={ROUTES.services} className="text-white/70 hover:text-white transition-colors">
            Services
          </Link>
          <span className="text-white/50">/</span>
          <span className="text-white font-medium">{detailedService.title}</span>
        </nav>

        <div className="text-center">
          <p className="text-sm font-semibold tracking-wider text-[#00B4A6] mb-8">
            INDUSTRIAL & BUSINESS SOLUTIONS
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight max-w-4xl mx-auto mb-8">
            {detailedService.title.split(' ').slice(0, -1).join(' ')} 
            <span className="text-[#00B4A6]"> {detailedService.title.split(' ').slice(-1)}</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {detailedService.description}
          </p>
        </div>
      </div>
    </section>
  )
}