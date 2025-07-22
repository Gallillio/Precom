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
  height = '400px',
  showDirections = true
}) => {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  const address = `${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state} ${COMPANY_INFO.address.zipCode}`
  const encodedAddress = encodeURIComponent(address)
  
  // Google Maps embed URL
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodedAddress}`
  
  // Google Maps link for directions
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
  
  // Alternative: OpenStreetMap embed (no API key required)
  const openStreetMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-74.0060%2C40.7128%2C-73.9352%2C40.7589&layer=mapnik&marker=40.7589%2C-73.9441`

  useEffect(() => {
    // Animate map container on mount
    if (mapContainerRef.current) {
      mapContainerRef.current.style.opacity = '0'
      mapContainerRef.current.style.transform = 'translateY(20px)'
      
      const timer = setTimeout(() => {
        if (mapContainerRef.current) {
          mapContainerRef.current.style.transition = 'all 0.6s ease-out'
          mapContainerRef.current.style.opacity = '1'
          mapContainerRef.current.style.transform = 'translateY(0)'
        }
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleMapLoad = () => {
    setMapLoaded(true)
  }

  const handleMapError = () => {
    setMapError(true)
  }

  const openInMaps = () => {
    window.open(directionsUrl, '_blank', 'noopener,noreferrer')
  }

  const transportationOptions = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      title: 'Parking',
      description: 'Free parking available on-site'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Public Transit',
      description: 'Bus stop 2 blocks away'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: 'Accessibility',
      description: 'ADA compliant entrance and facilities'
    }
  ]

  return (
    <Card className={`relative overflow-hidden ${className}`} ref={mapContainerRef}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-4 right-4 w-32 h-32 border border-blue-200 rounded-full transform rotate-12" />
        <div className="absolute bottom-4 left-4 w-24 h-24 border border-teal-200 rounded-full transform -rotate-6" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-blue-100 rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Visit Our Office</h3>
            <p className="text-gray-600">We welcome consultations and in-person meetings</p>
          </div>
          {showDirections && (
            <button
              onClick={openInMaps}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold
                transition-all duration-300 transform hover:scale-105
                ${isHovering 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Get Directions</span>
            </button>
          )}
        </div>

        {/* Address Information */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Professional Engineering Office</h4>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {COMPANY_INFO.address.street}<br />
                  {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} {COMPANY_INFO.address.zipCode}<br />
                  {COMPANY_INFO.address.country}
                </p>
                <div className="mt-3 flex items-center text-sm text-blue-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Business Hours: Monday - Friday, 8:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map Container */}
        <div className="mb-8">
          <div 
            className="relative rounded-2xl overflow-hidden border-2 border-blue-100 shadow-lg"
            style={{ height }}
          >
            {!mapError ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center relative">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%),
                      radial-gradient(circle at 75% 75%, #00b4a6 0%, transparent 50%),
                      linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)
                    `,
                    backgroundSize: '200px 200px, 150px 150px, 100px 100px',
                    animation: 'float 20s ease-in-out infinite'
                  }} />
                </div>

                <div className="text-center relative z-10">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Professional Location</h4>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto text-lg">
                    Our modern engineering office is conveniently located for client consultations and project meetings
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={openInMaps}
                      className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      View in Google Maps
                    </button>
                    <button
                      onClick={openInMaps}
                      className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
                    >
                      Get Directions
                    </button>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-blue-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="absolute top-8 right-8 w-6 h-6 bg-teal-200 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-8 left-8 w-4 h-4 bg-blue-300 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-teal-100 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            ) : (
              <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Map Unavailable</h4>
                  <p className="text-gray-600 mb-4">
                    Unable to load the map. Please use the address above or click below for directions.
                  </p>
                  <button
                    onClick={openInMaps}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Transportation Options */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">Getting to Our Office</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transportationOptions.map((option, index) => (
              <div 
                key={index} 
                className="group relative bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-teal-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {option.icon}
                  </div>
                  <h5 className="font-bold text-gray-900 text-lg mb-2">{option.title}</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Location Info */}
        <div className="border-t border-blue-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h5 className="font-bold text-gray-900 text-lg">Nearby Landmarks</h5>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0" />
                  City Hall (0.5 miles)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0" />
                  Central Library (0.3 miles)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0" />
                  Tech District (0.8 miles)
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-2xl border border-teal-100">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h5 className="font-bold text-gray-900 text-lg">Office Features</h5>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 flex-shrink-0" />
                  Modern conference rooms
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 flex-shrink-0" />
                  Client presentation area
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 flex-shrink-0" />
                  Secure document storage
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}