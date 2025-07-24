'use client'
import React from 'react'
import { notFound } from 'next/navigation'
import { SERVICES } from '@/modules/shared/utils/constants'
import { ServiceDetailHero } from '../components/ServiceDetailHero'
import { ServiceDetailContent } from '../components/ServiceDetailContent'
import { ServiceDetailFeatures } from '../components/ServiceDetailFeatures'
import { ServiceDetailProcess } from '../components/ServiceDetailProcess'
import { ServiceDetailCTA } from '../components/ServiceDetailCTA'

interface ServiceDetailScreenProps {
  serviceSlug: string
}

export const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({ serviceSlug }) => {
  const service = SERVICES[serviceSlug as keyof typeof SERVICES]
  
  if (!service) {
    notFound()
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