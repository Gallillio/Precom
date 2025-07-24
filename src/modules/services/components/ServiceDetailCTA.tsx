'use client'
import React from 'react'
import Link from 'next/link'
import { DETAILED_SERVICES } from '../utils/serviceData'
import { ROUTES, SERVICES } from '@/modules/shared/utils/constants'

interface ServiceDetailCTAProps {
  serviceSlug: string
  service: { title: string; description: string; icon: string }
}

export const ServiceDetailCTA: React.FC<ServiceDetailCTAProps> = ({ serviceSlug }) => {
  const detailedService = DETAILED_SERVICES[serviceSlug]
  
  if (!detailedService) return null

  // Get other services for recommendations
  const otherServices = Object.entries(SERVICES)
    .filter(([key]) => key !== serviceSlug)
    .slice(0, 3)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div className="bg-gradient-to-br from-[#003366] via-[#003366] to-[#00B4A6]/20 rounded-2xl p-12 text-center text-white mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Ready to Transform Your Automotive Project?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Let our expert team help you achieve excellence in {detailedService.title.toLowerCase()}. 
            Contact us today for a free consultation and customized solution.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Response</h3>
              <p className="text-white/80 text-sm">Get a response within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Proven Results</h3>
              <p className="text-white/80 text-sm">150+ successful projects delivered</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Team</h3>
              <p className="text-white/80 text-sm">Certified automotive engineers</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`${ROUTES.contact}?service=${serviceSlug}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#00B4A6] text-white font-semibold rounded-lg hover:bg-[#00B4A6]/90 transition-colors"
            >
              Get Free Consultation
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href={`${ROUTES.contact}?service=${serviceSlug}&type=quote`}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#003366] transition-colors"
            >
              Request Detailed Quote
            </Link>
          </div>
        </div>

        {/* Related Services */}
        <div>
          <h3 className="text-2xl font-light text-[#003366] text-center mb-12">
            Explore Our Other Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherServices.map(([key, service]) => (
              <Link 
                key={key}
                href={`/services/${key}`}
                className="group bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#00B4A6]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00B4A6]/20 transition-colors">
                  <svg className="w-6 h-6 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-[#003366] mb-3 group-hover:text-[#00B4A6] transition-colors">
                  {service.title}
                </h4>
                <p className="text-[#003366]/70 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center text-[#00B4A6] font-medium">
                  <span>Learn More</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}