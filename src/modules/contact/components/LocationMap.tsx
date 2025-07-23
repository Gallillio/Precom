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
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // Ken Burns effect background images
  const backgroundImages = [
    '/images/office/modern-office-exterior.jpg',
    '/images/office/professional-building.jpg', 
    '/images/office/city-business-district.jpg',
    '/images/office/office-lobby.jpg'
  ]

  const address = `${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.governorate} ${COMPANY_INFO.address.postalCode}`
  const encodedAddress = encodeURIComponent(address)
  
  // Google Maps embed URL
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodedAddress}`
  
  // Google Maps link for directions
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
  
  // Alternative: OpenStreetMap embed (no API key required)
  const openStreetMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-74.0060%2C40.7128%2C-73.9352%2C40.7589&layer=mapnik&marker=40.7589%2C-73.9441`

  useEffect(() => {
    // Ken Burns effect - cycle through background images
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 6000)

    // Scroll parallax effect
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)

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
      
      return () => {
        clearInterval(imageInterval)
        clearTimeout(timer)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    return () => {
      clearInterval(imageInterval)
      window.removeEventListener('scroll', handleScroll)
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
    <div className={`relative overflow-hidden ${className}`} ref={mapContainerRef}>
      {/* Ken Burns Effect Background */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentImageIndex ? 'opacity-30' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,51,102,0.8) 0%, rgba(0,180,166,0.6) 100%), url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.3}px) scale(${1.1 + (index === currentImageIndex ? 0.05 : 0)})`,
              animation: index === currentImageIndex ? 'kenBurns 6s ease-in-out' : 'none'
            }}
          />
        ))}
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-4 right-4 w-32 h-32 border border-white/30 rounded-full transform rotate-12 animate-pulse" />
        <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full transform -rotate-6 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-white/15 rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-45 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Blueprint-style grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" 
               style={{
                 backgroundImage: `
                   linear-gradient(white 1px, transparent 1px),
                   linear-gradient(90deg, white 1px, transparent 1px)
                 `,
                 backgroundSize: '60px 60px'
               }}>
          </div>
        </div>
      </div>
      
      {/* Add the Ken Burns keyframes */}
      <style jsx>{`
        @keyframes kenBurns {
          0% { transform: scale(1) translateY(${scrollY * 0.3}px); }
          100% { transform: scale(1.1) translateY(${scrollY * 0.3}px); }
        }
      `}</style>

      <div className="relative z-10 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Visit Our Office</h3>
            <p className="text-blue-100 text-lg drop-shadow-md">We welcome consultations and in-person meetings</p>
          </div>
          {showDirections && (
            <button
              onClick={openInMaps}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold
                transition-all duration-300 transform hover:scale-105 shadow-lg
                ${isHovering 
                  ? 'bg-white text-[#003366] shadow-white/30' 
                  : 'bg-black/40 backdrop-blur-sm text-white border border-white/30 hover:bg-black/50'
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
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00B4A6] to-[#00A098] rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-[#003366] mb-3">Professional Engineering Office</h4>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">
                  {COMPANY_INFO.address.street}<br />
                  {COMPANY_INFO.address.city}, {COMPANY_INFO.address.governorate} {COMPANY_INFO.address.postalCode}<br />
                  {COMPANY_INFO.address.country}
                </p>
                <div className="mt-4 flex items-center text-sm text-[#00B4A6] bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg px-3 py-2">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">Sunday - Thursday: 8:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map Container */}
        <div className="mb-8">
          <div 
            className="relative rounded-2xl overflow-hidden border border-white/30 shadow-2xl"
            style={{ height }}
          >
            {!mapError ? (
              <div className="w-full h-full bg-white/90 backdrop-blur-sm flex items-center justify-center relative">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      radial-gradient(circle at 25% 25%, #003366 0%, transparent 50%),
                      radial-gradient(circle at 75% 75%, #00b4a6 0%, transparent 50%),
                      linear-gradient(45deg, transparent 30%, rgba(0,180,166, 0.1) 50%, transparent 70%)
                    `,
                    backgroundSize: '200px 200px, 150px 150px, 100px 100px',
                    animation: 'float 20s ease-in-out infinite'
                  }} />
                </div>

                <div className="text-center relative z-10">
                  <div className="w-28 h-28 bg-gradient-to-br from-[#003366] to-[#00B4A6] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
                    <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-3xl font-bold text-[#003366] mb-4">Premium Engineering Location</h4>
                  <p className="text-gray-700 mb-8 max-w-lg mx-auto text-xl leading-relaxed">
                    Our state-of-the-art engineering facility is strategically positioned for optimal client accessibility and project collaboration
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button
                      onClick={openInMaps}
                      className="bg-gradient-to-r from-[#003366] to-[#00B4A6] text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      View in Google Maps
                    </button>
                    <button
                      onClick={openInMaps}
                      className="bg-white text-[#003366] px-10 py-4 rounded-xl font-bold text-lg border-2 border-[#003366] hover:bg-[#003366] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Get Directions
                    </button>
                  </div>
                  
                  {/* Image cycle indicators */}
                  <div className="flex justify-center space-x-2 mt-8">
                    {backgroundImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-[#00B4A6] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-6 left-6 w-10 h-10 bg-[#00B4A6]/20 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="absolute top-12 right-12 w-8 h-8 bg-[#003366]/20 rounded-full opacity-70 animate-bounce" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-12 left-12 w-6 h-6 bg-[#00B4A6]/30 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-[#003366]/10 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }} />
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
                    className="bg-[#003366] text-white px-6 py-2 rounded-lg hover:bg-[#004080] transition-colors"
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
          <h4 className="text-2xl font-bold text-white mb-8 text-center drop-shadow-lg">Getting to Our Office</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transportationOptions.map((option, index) => (
              <div 
                key={index} 
                className="group relative bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 shadow-lg"
              >
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/5 to-[#00B4A6]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#003366] to-[#00B4A6] rounded-2xl flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    {option.icon}
                  </div>
                  <h5 className="font-bold text-[#003366] text-xl mb-3 group-hover:text-[#00B4A6] transition-colors duration-300">{option.title}</h5>
                  <p className="text-gray-700 text-base leading-relaxed font-medium">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Location Info */}
        <div className="border-t border-white/20 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#004080] rounded-xl flex items-center justify-center text-white mr-4 shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h5 className="font-bold text-[#003366] text-xl">Nearby Landmarks</h5>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-center group">
                  <span className="w-3 h-3 bg-gradient-to-r from-[#003366] to-[#00B4A6] rounded-full mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">City Hall (0.5 miles)</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-3 h-3 bg-gradient-to-r from-[#003366] to-[#00B4A6] rounded-full mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Central Library (0.3 miles)</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-3 h-3 bg-gradient-to-r from-[#003366] to-[#00B4A6] rounded-full mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Tech District (0.8 miles)</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00B4A6] to-[#00A098] rounded-xl flex items-center justify-center text-white mr-4 shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h5 className="font-bold text-[#003366] text-xl">Office Features</h5>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-center group">
                  <span className="w-3 h-3 bg-gradient-to-r from-[#00B4A6] to-[#003366] rounded-full mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Modern conference rooms</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-3 h-3 bg-gradient-to-r from-[#00B4A6] to-[#003366] rounded-full mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Client presentation area</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-3 h-3 bg-gradient-to-r from-[#00B4A6] to-[#003366] rounded-full mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Secure document storage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}