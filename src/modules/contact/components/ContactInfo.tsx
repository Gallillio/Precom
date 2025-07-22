import React, { useState } from 'react'
import { Card } from '@/modules/shared/components/ui'
import { COMPANY_INFO, SOCIAL_LINKS } from '@/modules/shared/utils/constants'

interface ContactInfoProps {
  className?: string
  showSocialLinks?: boolean
  showBusinessHours?: boolean
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  className = '',
  showSocialLinks = true,
  showBusinessHours = true
}) => {
  const [hoveredContact, setHoveredContact] = useState<number | null>(null)
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  const businessHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM', isToday: true },
    { day: 'Saturday', hours: '9:00 AM - 4:00 PM', isToday: false },
    { day: 'Sunday', hours: 'Closed', isToday: false }
  ]

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Us',
      value: COMPANY_INFO.email,
      link: `mailto:${COMPANY_INFO.email}`,
      description: 'Send us an email and we\'ll respond within 24 hours',
      color: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      hoverBg: 'hover:from-blue-100 hover:to-blue-200'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Call Us',
      value: COMPANY_INFO.phone,
      link: `tel:${COMPANY_INFO.phone}`,
      description: 'Monday to Friday from 8am to 6pm',
      color: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      hoverBg: 'hover:from-green-100 hover:to-green-200'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Visit Us',
      value: `${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state} ${COMPANY_INFO.address.zipCode}`,
      link: `https://maps.google.com/?q=${encodeURIComponent(`${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state} ${COMPANY_INFO.address.zipCode}`)}`,
      description: 'Come visit our office for an in-person consultation',
      color: 'from-[#00B4A6] to-[#00A098]',
      bgGradient: 'from-teal-50 to-teal-100',
      hoverBg: 'hover:from-teal-100 hover:to-teal-200'
    }
  ]

  const emergencyContact = {
    title: 'Emergency Support',
    phone: '+20 1234567890',
    description: 'For urgent engineering matters outside business hours'
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Main Contact Information */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#003366] to-[#004080] p-6">
          <h3 className="text-xl font-semibold text-white mb-2">Get In Touch</h3>
          <p className="text-blue-100 text-sm">Multiple ways to reach our engineering team</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {contactMethods.map((method, index) => (
              <a 
                key={index} 
                href={method.link}
                className={`group block p-4 rounded-xl border border-gray-100 bg-gradient-to-r ${method.bgGradient} ${method.hoverBg} hover:border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-[1.02] transform`}
                onMouseEnter={() => setHoveredContact(index)}
                onMouseLeave={() => setHoveredContact(null)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    {method.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-[#003366] transition-colors duration-300">
                        {method.title}
                      </h4>
                      <div className={`w-5 h-5 text-gray-400 group-hover:text-[#00B4A6] group-hover:translate-x-1 transition-all duration-300 ${hoveredContact === index ? 'opacity-100' : 'opacity-0'}`}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-[#003366] font-medium group-hover:text-[#00B4A6] transition-colors duration-300 break-all">
                      {method.value}
                    </div>
                    <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700 transition-colors duration-300">
                      {method.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Business Hours */}
      {showBusinessHours && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#00B4A6] to-[#00A098] p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Business Hours</h3>
            <p className="text-teal-100 text-sm">When our engineering team is available</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {businessHours.map((schedule, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center p-3 rounded-lg transition-all duration-300 ${
                    schedule.isToday 
                      ? 'bg-gradient-to-r from-green-50 to-green-100 border border-green-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {schedule.isToday && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                    <span className={`font-medium ${schedule.isToday ? 'text-green-700' : 'text-gray-700'}`}>
                      {schedule.day}
                    </span>
                  </div>
                  <span className={`font-semibold ${
                    schedule.hours === 'Closed' 
                      ? 'text-red-600' 
                      : schedule.isToday 
                        ? 'text-green-600' 
                        : 'text-gray-900'
                  }`}>
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Emergency Contact */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mt-0.5 animate-pulse">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-700 mb-1">{emergencyContact.title}</h4>
                    <a 
                      href={`tel:${emergencyContact.phone}`}
                      className="text-red-600 hover:text-red-800 transition-colors font-medium text-lg hover:underline"
                    >
                      {emergencyContact.phone}
                    </a>
                    <p className="text-sm text-red-600 mt-1">{emergencyContact.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Links */}
      {showSocialLinks && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Connect With Us</h3>
            <p className="text-purple-100 text-sm">Follow our latest projects and insights</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-md"
                  aria-label={`Follow us on ${platform}`}
                  onMouseEnter={() => setHoveredSocial(platform)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm group-hover:shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      {platform === 'twitter' && (
                        <svg className="w-5 h-5 text-sky-500 group-hover:text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      )}
                      {platform === 'linkedin' && (
                        <svg className="w-5 h-5 text-blue-600 group-hover:text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      )}
                      {platform === 'facebook' && (
                        <svg className="w-5 h-5 text-blue-500 group-hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      )}
                      {platform === 'instagram' && (
                        <svg className="w-5 h-5 text-pink-500 group-hover:text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986S24.014 18.605 24.014 11.987C24.014 5.367 18.646.001 12.017.001zM8.449 16.988c-2.508 0-4.538-2.03-4.538-4.538s2.03-4.538 4.538-4.538 4.538 2.03 4.538 4.538-2.03 4.538-4.538 4.538zm7.424-8.088c-.598 0-1.083-.485-1.083-1.083s.485-1.083 1.083-1.083 1.083.485 1.083 1.083-.485 1.083-1.083 1.083z"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-[#003366] transition-colors duration-300 capitalize">
                        {platform}
                      </div>
                      <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        @PrecomEng
                      </div>
                    </div>
                    <div className={`w-4 h-4 text-gray-400 group-hover:text-[#00B4A6] group-hover:translate-x-1 transition-all duration-300 ${hoveredSocial === platform ? 'opacity-100' : 'opacity-0'}`}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-700 text-center">
                <span className="font-medium">Stay updated</span> with our latest projects, engineering insights, and company news.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Additional Information - Why Choose Precom */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#003366] to-[#00B4A6] p-6">
          <h3 className="text-xl font-semibold text-white mb-2">Why Choose Precom?</h3>
          <p className="text-blue-100 text-sm">Excellence in engineering and trusted partnerships</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {[
              { text: 'Licensed Professional Engineers', icon: 'certification' },
              { text: '15+ Years of Experience', icon: 'experience' },
              { text: '500+ Successful Projects', icon: 'projects' },
              { text: 'Fully Insured & Bonded', icon: 'insurance' }
            ].map((item, index) => (
              <div key={index} className="group flex items-start space-x-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  {item.icon === 'certification' && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {item.icon === 'experience' && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  )}
                  {item.icon === 'projects' && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {item.icon === 'insurance' && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 font-medium transition-colors duration-300">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-teal-50 rounded-full px-4 py-2 border border-blue-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Trusted by leading construction companies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}