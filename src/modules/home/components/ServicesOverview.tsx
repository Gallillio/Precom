import React from 'react'
import Link from 'next/link'
import { Card } from '@/modules/shared/components/ui'
import { SERVICES } from '@/modules/shared/utils/constants'

interface ServicesOverviewProps {
  className?: string
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ className = '' }) => {
  const servicesList = Object.values(SERVICES)

  return (
    <section className={`bg-white ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-gray-900 mb-4">
              Our Engineering Services
            </h2>
            <p className="text-large text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive engineering solutions tailored to your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {servicesList.map((service, index) => (
              <Card
                key={index}
                className="bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-200 border border-gray-200"
                padding="lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-3 text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <Link 
                      href="/services"
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/services"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}