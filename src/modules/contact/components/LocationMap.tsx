'use client'
import React, { useState } from 'react'
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

  const address = `${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state} ${COMPANY_INFO.address.zipCode}`
  const encodedAddress = encodeURIComponent(address)
  
  // Google Maps embed URL
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodedAddress}`
  
  // Google Maps link for directions
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
  
  // Alternative: OpenStreetMap embed (no API key required)
  const openStreetMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-74.0060%2C40.7128%2C-73.9352%2C40.7589&layer=mapnik&marker=40.7589%2C-73.9441`

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
    <Card className={className}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Our Location</h3>
          {showDirections && (
            <button
              onClick={openInMaps}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span className="text-sm font-medium">Get Directions</span>
            </button>
          )}
        </div>

        {/* Address Information */}
        <div className="mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0 mt-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Office Address</h4>
              <p className="text-gray-600 leading-relaxed">
                {COMPANY_INFO.address.street}<br />
                {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} {COMPANY_INFO.address.zipCode}<br />
                {COMPANY_INFO.address.country}
              </p>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="mb-6">
          <div 
            className="relative rounded-lg overflow-hidden border border-gray-200"
            style={{ height }}
          >
            {!mapError ? (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                {/* Placeholder for map - In a real application, you would integrate with Google Maps or another map service */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h4>
                  <p className="text-gray-600 mb-4">
                    Click below to view our location in your preferred maps application
                  </p>
                  <button
                    onClick={openInMaps}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Open in Maps
                  </button>
                </div>
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
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Getting Here</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {transportationOptions.map((option, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-gray-600 flex-shrink-0 mt-0.5">
                  {option.icon}
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 text-sm">{option.title}</h5>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Location Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Nearby Landmarks</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• City Hall (0.5 miles)</li>
                <li>• Central Library (0.3 miles)</li>
                <li>• Tech District (0.8 miles)</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Office Features</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• Conference rooms available</li>
                <li>• Client presentation area</li>
                <li>• Secure document storage</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}