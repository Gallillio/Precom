'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/modules/shared/utils/constants'

interface FloatingChatButtonProps {
  className?: string
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ 
  className = '' 
}) => {
  const pathname = usePathname()
  
  // Hide the chat button on the contact page
  if (pathname === '/contact') {
    return null
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Link href={ROUTES.contact}>
        <button className="group relative bg-gradient-to-r from-[#003366] to-[#00B4A6] hover:from-[#00B4A6] hover:to-[#003366] text-white rounded-full p-4 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none">
          {/* Chat Icon */}
          <svg 
            className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
          
          {/* Notification Dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            Need help? Contact us!
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
          </div>
        </button>
      </Link>
    </div>
  )
}