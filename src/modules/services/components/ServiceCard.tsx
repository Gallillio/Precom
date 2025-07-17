'use client'
import React from 'react'
import { Service } from '@/modules/shared/utils/types'
import { Card, Button } from '@/modules/shared/components/ui'

interface ServiceCardProps {
  service: Service
  className?: string
  featured?: boolean
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  className = '',
  featured = false 
}) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'building':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'clipboard':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        )
      case 'lightbulb':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )
      case 'search':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
    }
  }

  return (
    <Card className={`h-full transition-all duration-200 hover:shadow-lg ${
      featured ? 'ring-2 ring-blue-500 relative' : ''
    } ${className}`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Popular
          </span>
        </div>
      )}
      
      <div className="p-6 h-full flex flex-col">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${
          featured ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {getIconComponent(service.icon)}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
          {service.description}
        </p>

        {/* Features */}
        {service.features && service.features.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
            <ul className="space-y-1">
              {service.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <span className="text-blue-500 mr-2 mt-1 flex-shrink-0">•</span>
                  <span>{feature}</span>
                </li>
              ))}
              {service.features.length > 4 && (
                <li className="text-sm text-gray-500 italic">
                  +{service.features.length - 4} more features
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Pricing and Duration */}
        {(service.price || service.duration) && (
          <div className="mb-4 flex justify-between items-center text-sm">
            {service.price && (
              <div>
                <span className="text-gray-500">Starting at</span>
                <span className="text-lg font-semibold text-gray-900 ml-1">
                  {service.price}
                </span>
              </div>
            )}
            {service.duration && (
              <div className="text-gray-500">
                <span className="text-gray-400">Timeline:</span>
                <span className="ml-1">{service.duration}</span>
              </div>
            )}
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-auto">
          <Button 
            variant={featured ? 'primary' : 'outline'}
            className="w-full"
            onClick={() => {
              // In a real app, this would navigate to a detailed service page
              // or open a contact form specific to this service
              window.location.href = `/contact?service=${encodeURIComponent(service.title)}`
            }}
          >
            Learn More
          </Button>
        </div>

        {/* Additional info for featured services */}
        {featured && (
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              Most requested service
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}