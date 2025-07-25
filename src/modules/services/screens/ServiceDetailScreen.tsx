'use client'
import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { SERVICES } from '@/modules/shared/utils/constants'
import { ServiceDetailHero } from '../components/ServiceDetailHero'
import { ServiceDetailContent } from '../components/ServiceDetailContent'
import { ServiceDetailFeatures } from '../components/ServiceDetailFeatures'
import { ServiceDetailProcess } from '../components/ServiceDetailProcess'
import { ServiceDetailCTA } from '../components/ServiceDetailCTA'
import { ContentLoader } from '@/modules/shared/components/common'

interface ServiceDetailScreenProps {
  serviceSlug: string
}

export const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({ serviceSlug }) => {
  const [loading, setLoading] = useState(true)
  const service = SERVICES[serviceSlug as keyof typeof SERVICES]
  
  useEffect(() => {
    // Allow time for service content and animations to initialize
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])
  
  if (!service) {
    notFound()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Service Hero Section Skeleton */}
        <section className="bg-gradient-to-br from-[#003366] to-[#00456B] py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-pulse">
                <div className="h-4 bg-white/20 rounded mb-4 w-24"></div>
                <div className="h-12 bg-white/20 rounded mb-6 w-full"></div>
                <div className="h-6 bg-white/20 rounded mb-4 w-full"></div>
                <div className="h-6 bg-white/20 rounded mb-8 w-3/4"></div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="h-12 bg-white/20 rounded w-40"></div>
                  <div className="h-12 bg-white/20 rounded w-32"></div>
                </div>
              </div>
              <div className="animate-pulse">
                <div className="bg-white/10 rounded-2xl h-80 w-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Content Section Skeleton */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="text-center mb-16">
                <div className="h-10 bg-gray-200 rounded mb-4 max-w-2xl mx-auto"></div>
                <div className="h-6 bg-gray-200 rounded max-w-3xl mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="bg-gray-200 rounded-2xl h-64"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Features Section Skeleton */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="text-center mb-16">
                <div className="h-10 bg-gray-200 rounded mb-4 max-w-xl mx-auto"></div>
                <div className="h-6 bg-gray-200 rounded max-w-2xl mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-6">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Process Section Skeleton */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="text-center mb-16">
                <div className="h-10 bg-gray-200 rounded mb-4 max-w-xl mx-auto"></div>
                <div className="h-6 bg-gray-200 rounded max-w-2xl mx-auto"></div>
              </div>
              
              <div className="space-y-12">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className={`space-y-4 ${i % 2 === 0 ? 'lg:order-2' : ''}`}>
                      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className={`${i % 2 === 0 ? 'lg:order-1' : ''}`}>
                      <div className="bg-gray-200 rounded-2xl h-48"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Loading Component */}
        <ContentLoader text="Loading service details..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <ServiceDetailHero serviceSlug={serviceSlug} service={service} />
      <ServiceDetailContent serviceSlug={serviceSlug} service={service} />
      <ServiceDetailFeatures serviceSlug={serviceSlug} service={service} />
      <ServiceDetailProcess serviceSlug={serviceSlug} service={service} />
      <ServiceDetailCTA serviceSlug={serviceSlug} service={service} />
    </div>
  )
}