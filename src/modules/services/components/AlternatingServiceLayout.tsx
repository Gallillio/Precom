'use client'
import React from 'react'
import { Card, Button } from '@/modules/shared/components/ui'
import { ServiceTabs } from './ServiceTabs'

interface ServiceFeature {
  title: string
  description: string
  icon: React.ReactNode
}

interface ServiceData {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  features: ServiceFeature[]
  stats?: {
    label: string
    value: string
  }[]
  subServices?: {
    id: string
    title: string
    description: string
    features: string[]
    icon: React.ReactNode
    details?: {
      duration?: string
      complexity?: string
      expertise?: string
    }
  }[]
}

interface AlternatingServiceLayoutProps {
  services: ServiceData[]
  className?: string
}

export const AlternatingServiceLayout: React.FC<AlternatingServiceLayoutProps> = ({
  services,
  className = ''
}) => {
  return (
    <div className={`space-y-24 ${className}`}>
      {services.map((service, index) => {
        const isEven = index % 2 === 0

        return (
          <div 
            key={service.id}
            id={service.id}
            className="container mx-auto px-4"
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              !isEven ? 'lg:grid-flow-col-dense' : ''
            }`}>
              {/* Image Side */}
              <div 
                className={`relative ${!isEven ? 'lg:col-start-2' : ''}`}
              >
                <Card className="overflow-hidden group">
                  {/* Main Service Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Service Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium" style={{ color: 'var(--primary-blue)' }}>
                        Service #{(index + 1).toString().padStart(2, '0')}
                      </div>
                    </div>

                    {/* Stats Overlay */}
                    {service.stats && (
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                        <div className="text-xs text-body-secondary mb-1">{service.stats[0].label}</div>
                        <div className="text-lg font-bold" style={{ color: 'var(--accent-teal)' }}>
                          {service.stats[0].value}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Image Footer */}
                  <div className="p-4 bg-gradient-to-r from-[var(--primary-blue)]/5 to-[var(--accent-teal)]/5">
                    <div className="text-center">
                      <div className="text-sm font-medium" style={{ color: 'var(--primary-blue)' }}>
                        Professional Excellence
                      </div>
                      <div className="text-xs text-body-secondary mt-1">
                        Industry-leading standards
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Content Side */}
              <div 
                className={`${!isEven ? 'lg:col-start-1' : ''}`}
              >
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-12 bg-[var(--accent-teal)] rounded-full" />
                      <div>
                        <div className="text-sm font-medium text-body-secondary uppercase tracking-wider">
                          {service.subtitle}
                        </div>
                        <h2 className="heading-2 text-2xl lg:text-3xl mt-1">
                          {service.title}
                        </h2>
                      </div>
                    </div>
                    <p className="text-large text-body-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex}
                        className="p-4 bg-white rounded-lg border border-[var(--border)] hover:border-[var(--accent-teal)]/20 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start gap-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ 
                              backgroundColor: `var(--accent-teal)20`,
                              color: 'var(--accent-teal)'
                            }}
                          >
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                            <p className="text-xs text-body-secondary leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      variant="teal"
                      onClick={() => window.location.href = `/contact?service=${encodeURIComponent(service.title)}`}
                      className="flex-1 py-3 px-6 transform hover:scale-105 transition-all duration-300"
                    >
                      Get Quote
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const element = document.getElementById(`${service.id}-details`)
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className="flex-1 py-3 px-6 transform hover:scale-105 transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </div>

                  {/* Stats Row */}
                  {service.stats && service.stats.length > 1 && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                      {service.stats.slice(1).map((stat, statIndex) => (
                        <div 
                          key={statIndex}
                          className="text-center p-3 bg-[var(--secondary-gray)] rounded-lg"
                        >
                          <div className="text-xl font-bold" style={{ color: 'var(--primary-blue)' }}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-body-secondary mt-1">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Service Details */}
            {service.subServices && (
              <div 
                id={`${service.id}-details`}
                className="mt-16"
              >
                <ServiceTabs 
                  serviceId={service.id}
                  serviceTitle={service.title}
                  tabs={service.subServices}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}