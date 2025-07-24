'use client'
import React from 'react'
import { DETAILED_SERVICES } from '../utils/serviceData'

interface ServiceDetailContentProps {
  serviceSlug: string
  service: { title: string; description: string; icon: string }
}

export const ServiceDetailContent: React.FC<ServiceDetailContentProps> = ({ serviceSlug }) => {
  const detailedService = DETAILED_SERVICES[serviceSlug]
  
  if (!detailedService) return null

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Technologies */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-[#003366]/10 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#003366] mb-4">Technologies & Tools</h3>
            <div className="space-y-2">
              {detailedService.technologies?.map((tech, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-[#00B4A6] rounded-full mr-3" />
                  <span className="text-[#003366]/80">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-[#00B4A6]/10 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#003366] mb-4">What You&apos;ll Receive</h3>
            <div className="space-y-3">
              {detailedService.deliverables.map((deliverable, index) => (
                <div key={index} className="flex items-start">
                  <svg className="w-4 h-4 text-[#00B4A6] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#003366]/80 text-sm">{deliverable}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gradient-to-br from-[#003366] to-[#003366]/90 rounded-xl p-8 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
            <p className="text-white/90 mb-6 text-sm">
              Contact our automotive engineering experts to discuss your specific requirements and get a customized solution.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-3 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@precom-egypt.com</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-3 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+20 2 2735 4567</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-3 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Response within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}