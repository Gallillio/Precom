'use client'
import React from 'react'
import { Service } from '@/modules/shared/utils/types'
import { SERVICES } from '@/modules/shared/utils/constants'
import { ServiceHero } from '../components/ServiceHero'
import { ServiceCard } from '../components/ServiceCard'
import { ServiceFeatures } from '../components/ServiceFeatures'
import { Card, Button } from '@/modules/shared/components/ui'

// Extended services data with detailed information
const servicesData: Service[] = [
  {
    id: 'structural',
    title: SERVICES.structural.title,
    description: SERVICES.structural.description,
    icon: SERVICES.structural.icon,
    features: [
      'Seismic design and analysis',
      'Wind load calculations',
      'Foundation design',
      'Steel and concrete structures',
      'Building code compliance',
      'Structural health monitoring'
    ],
    price: 'Contact for Quote',
    duration: '2-8 weeks'
  },
  {
    id: 'project',
    title: SERVICES.project.title,
    description: SERVICES.project.description,
    icon: SERVICES.project.icon,
    features: [
      'Project planning and scheduling',
      'Budget management',
      'Quality control and assurance',
      'Risk assessment and mitigation',
      'Stakeholder coordination',
      'Progress reporting and monitoring'
    ],
    price: 'From $5,000',
    duration: 'Project-dependent'
  },
  {
    id: 'consulting',
    title: SERVICES.consulting.title,
    description: SERVICES.consulting.description,
    icon: SERVICES.consulting.icon,
    features: [
      'Technical feasibility studies',
      'Design optimization',
      'Code compliance review',
      'Expert witness services',
      'Value engineering',
      'Construction troubleshooting'
    ],
    price: '$200/hour',
    duration: '1-4 weeks'
  },
  {
    id: 'design',
    title: SERVICES.design.title,
    description: SERVICES.design.description,
    icon: SERVICES.design.icon,
    features: [
      'Peer review services',
      'Calculation verification',
      'Drawing reviews',
      'Specification analysis',
      'Code compliance checks',
      'Quality assurance audits'
    ],
    price: 'From $2,500',
    duration: '1-3 weeks'
  }
]

export const ServicesScreen: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ServiceHero 
        title="Professional Engineering Services"
        subtitle="Excellence in Every Project"
        description="Comprehensive engineering solutions tailored to your specific needs. From structural design to project management, we deliver innovative and reliable results."
      />

      {/* Services Grid */}
      <section id="services-grid" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of engineering services, 
              each designed to meet the highest standards of quality and professionalism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {servicesData.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service}
                featured={index === 0} // Make first service featured
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}
      <ServiceFeatures />

      {/* Detailed Service Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our specialized engineering disciplines and find the perfect solution for your project requirements.
            </p>
          </div>

          <div className="space-y-8">
            {servicesData.map((service, index) => (
              <Card key={service.id} className="overflow-hidden">
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}>
                  <div className="lg:w-1/2 p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {service.icon === 'building' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          )}
                          {service.icon === 'clipboard' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                          )}
                          {service.icon === 'lightbulb' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          )}
                          {service.icon === 'search' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          )}
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {service.features?.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-sm text-gray-500">Starting at</span>
                        <div className="text-xl font-semibold text-blue-600">{service.price}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">Timeline</span>
                        <div className="text-lg font-medium text-gray-900">{service.duration}</div>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      onClick={() => {
                        window.location.href = `/contact?service=${encodeURIComponent(service.title)}`
                      }}
                    >
                      Learn More
                    </Button>
                  </div>

                  <div className="lg:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <div className="w-16 h-16 text-blue-600">
                          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {service.icon === 'building' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            )}
                            {service.icon === 'clipboard' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            )}
                            {service.icon === 'lightbulb' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            )}
                            {service.icon === 'search' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            )}
                          </svg>
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Professional Excellence
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Delivering results that exceed expectations
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let&apos;s discuss your engineering needs and create a customized solution 
            that delivers exceptional results for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              onClick={() => {
                window.location.href = '/contact'
              }}
            >
              Get Free Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
              onClick={() => {
                window.location.href = '/about'
              }}
            >
              Learn About Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}