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
    <section className="bg-white pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link href={ROUTES.home} className="text-[#003366]/60 hover:text-[#003366] transition-colors">
            Home
          </Link>
          <span className="text-[#003366]/40">/</span>
          <Link href={ROUTES.services} className="text-[#003366]/60 hover:text-[#003366] transition-colors">
            Services
          </Link>
          <span className="text-[#003366]/40">/</span>
          <span className="text-[#003366] font-medium">{detailedService.title}</span>
        </nav>

        <div className="text-center">
          <p className="text-sm font-semibold tracking-wider text-[#003366] mb-8">
            INDUSTRIAL & BUSINESS SOLUTIONS
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#003366] leading-tight max-w-4xl mx-auto mb-8">
            {detailedService.title.split(' ').slice(0, -1).join(' ')} 
            <span className="text-[#00B4A6]"> {detailedService.title.split(' ').slice(-1)}</span>
          </h1>
          
          <p className="text-xl text-[#003366]/70 max-w-3xl mx-auto leading-relaxed">
            {detailedService.description}
          </p>
        </div>
      </div>
    </section>
  )
}