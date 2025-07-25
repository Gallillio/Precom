'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Card } from '@/modules/shared/components/ui'
import { COMPANY_INFO } from '@/modules/shared/utils/constants'

interface LocationMapProps {
  className?: string
  height?: string
  showDirections?: boolean
}

export const LocationMap: React.FC<LocationMapProps> = ({
  className = '',
  height = '600px',
  showDirections = true
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const officeImages = [
    {
      src: '/images/office/modern-consultancy-exterior.png',
      title: 'Modern Office Exterior',
      description: 'Professional consultancy building with contemporary design'
    },
    {
      src: '/images/office/business-district-context.png',
      title: 'Business District Location',
      description: 'Strategically located in the heart of the business district'
    },
    {
      src: '/images/office/consultancy-lobby-interior.png',
      title: 'Professional Lobby',
      description: 'Welcoming reception area for client consultations'
    },
    {
      src: '/images/office/meeting-facilities.png',
      title: 'Meeting Facilities',
      description: 'State-of-the-art conference rooms for collaborative work'
    }
  ]

  const address = `${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.governorate} ${COMPANY_INFO.address.postalCode}`
  const encodedAddress = encodeURIComponent(address)
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % officeImages.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isVisible, officeImages.length])

  const openInMaps = () => {
    window.open(directionsUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section ref={sectionRef} className={`relative py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden ${className}`}>
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)]/5 via-transparent to-[var(--accent-teal)]/5" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Visit Our Office</h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            We welcome consultations and in-person meetings at our professional facility
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Office Images Showcase */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="relative">
              {/* Main Image Display with Swiping Animation */}
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative w-full h-full">
                  {officeImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                        index === currentImageIndex 
                          ? 'translate-x-0' 
                          : index < currentImageIndex 
                            ? '-translate-x-full' 
                            : 'translate-x-full'
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      {/* Image Info Overlay */}
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                        <p className="text-white/90 text-sm">{image.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => 
                    prev === 0 ? officeImages.length - 1 : prev - 1
                  )}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => 
                    prev === officeImages.length - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Image Navigation Dots */}
              <div className="flex justify-center space-x-3 mt-6">
                {officeImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-[var(--accent-teal)] scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Image Thumbnails */}
              <div className="grid grid-cols-4 gap-3 mt-6">
                {officeImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'ring-2 ring-[var(--accent-teal)] scale-105' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Office Information */}
          <div className={`transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {/* Address Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--accent-teal)] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-[var(--text-primary)] mb-3">Professional Engineering Office</h4>
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                    {COMPANY_INFO.address.street}<br />
                    {COMPANY_INFO.address.city}, {COMPANY_INFO.address.governorate} {COMPANY_INFO.address.postalCode}<br />
                    {COMPANY_INFO.address.country}
                  </p>
                  <div className="flex items-center text-sm text-[var(--accent-teal)] bg-[var(--accent-teal)]/10 rounded-lg px-3 py-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">Sunday - Thursday: 8:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={openInMaps}
                className="flex-1 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-teal)] text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                View in Google Maps
              </button>
              <button
                onClick={openInMaps}
                className="flex-1 bg-white text-[var(--primary-blue)] px-6 py-4 rounded-xl font-semibold border-2 border-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Get Directions
              </button>
            </div>

            {/* Office Features */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h5 className="font-bold text-[var(--text-primary)] text-lg mb-4">Office Features</h5>
              <div className="grid grid-cols-1 gap-3">
                {[
                  'Modern conference rooms',
                  'Client presentation area', 
                  'Secure document storage',
                  'Professional consultation spaces'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-teal)] rounded-full mr-3" />
                    <span className="text-[var(--text-secondary)]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}