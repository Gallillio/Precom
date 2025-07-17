'use client'
import React from 'react'
import { Service } from '@/modules/shared/utils/types'
import { Card, Button } from '@/modules/shared/components/ui'

interface ServiceDetailsProps {
  service: Service
  className?: string
  showFullDescription?: boolean
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({ 
  service, 
  className = '',
  showFullDescription = false 
}) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'building':
        return (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'clipboard':
        return (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        )
      case 'lightbulb':
        return (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )
      case 'search':
        return (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )
      default:
        return (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
    }
  }

  const getDetailedDescription = (serviceId: string) => {
    const descriptions: { [key: string]: string } = {
      'structural': `Our structural engineering services encompass the complete design and analysis of buildings, bridges, and other structures. We utilize advanced software and methodologies to ensure optimal structural performance, safety, and cost-effectiveness.

Our team specializes in seismic design, wind load analysis, and innovative structural systems. We work closely with architects and contractors to deliver projects that meet both aesthetic and functional requirements while adhering to all relevant building codes and standards.

From residential buildings to complex commercial structures, we provide comprehensive structural solutions that stand the test of time.`,
      
      'project': `Our project management services ensure your engineering projects are delivered on time, within budget, and to the highest quality standards. We coordinate all aspects of project execution, from initial planning through final delivery.

Our experienced project managers utilize industry-best practices and cutting-edge project management tools to maintain visibility and control throughout the project lifecycle. We excel at managing complex, multi-disciplinary projects with multiple stakeholders.

Risk management, quality assurance, and stakeholder communication are at the core of our project management approach, ensuring successful outcomes for all participants.`,
      
      'consulting': `Our engineering consulting services provide expert technical advice and strategic guidance for complex engineering challenges. We offer independent assessments, feasibility studies, and technical due diligence services.

Whether you need assistance with design optimization, code compliance, or technical problem-solving, our consultants bring decades of experience across multiple engineering disciplines.

We pride ourselves on delivering practical, cost-effective solutions that address both immediate needs and long-term objectives.`,
      
      'design': `Our design review services provide independent verification and validation of engineering designs. We conduct thorough reviews to identify potential issues, ensure code compliance, and optimize design efficiency.

Our review process includes structural calculations verification, drawing reviews, specification analysis, and constructability assessments. We work collaboratively with design teams to enhance project quality while maintaining schedule objectives.

Quality assurance is embedded in our review methodology, ensuring that all designs meet the highest standards of safety and performance.`
    }
    
    return descriptions[serviceId] || service.description
  }

  return (
    <div className={className}>
      <Card className="overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
              {getIconComponent(service.icon)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {service.title}
              </h2>
              <p className="text-lg text-gray-600">
                {service.description}
              </p>
            </div>
          </div>

          {/* Detailed Description */}
          {showFullDescription && (
            <div className="mb-8">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {getDetailedDescription(service.id).split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Features Grid */}
          {service.features && service.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What&apos;s Included
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {service.duration && (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {service.duration}
                </div>
                <div className="text-sm text-gray-600">
                  Typical Timeline
                </div>
              </div>
            )}
            
            {service.price && (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {service.price}
                </div>
                <div className="text-sm text-gray-600">
                  Starting Price
                </div>
              </div>
            )}

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                24/7
              </div>
              <div className="text-sm text-gray-600">
                Support Available
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Our Process
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Consultation', desc: 'Initial project assessment and requirements gathering' },
                { step: '02', title: 'Planning', desc: 'Detailed planning and resource allocation' },
                { step: '03', title: 'Execution', desc: 'Implementation with regular progress updates' },
                { step: '04', title: 'Delivery', desc: 'Final review and project handover' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-4">
              Contact us today to discuss your project requirements and get a customized solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="primary"
                onClick={() => {
                  window.location.href = `/contact?service=${encodeURIComponent(service.title)}`
                }}
              >
                Request Quote
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  window.location.href = '/contact'
                }}
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}