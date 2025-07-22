'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/modules/shared/utils/constants'

interface ChatWidgetProps {
  className?: string
  variant?: 'default' | 'contact' | 'help'
  position?: 'bottom-right' | 'bottom-left'
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  className = '',
  variant = 'default',
  position = 'bottom-right'
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Show widget after page load
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8'
  }

  const variantConfig = {
    default: {
      icon: (
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      tooltip: 'Start a conversation',
      href: ROUTES.contact
    },
    contact: {
      icon: (
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      tooltip: 'Get in touch',
      href: ROUTES.contact
    },
    help: {
      icon: (
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      tooltip: 'Need help?',
      href: ROUTES.contact
    }
  }

  const config = variantConfig[variant]

  return (
    <>
      {/* Chat Widget */}
      <Link
        href={config.href}
        className={`fixed ${positionClasses[position]} z-50 w-16 h-16 bg-gradient-to-r from-[#003366] to-[#00B4A6] rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 hover:shadow-xl hover:shadow-[#00B4A6]/30 transition-all duration-300 group transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        } ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={config.tooltip}
      >
        {/* Pulsing ring animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#003366] to-[#00B4A6] animate-ping opacity-30" />
        <div className="absolute inset-1 rounded-full bg-gradient-to-r from-[#003366] to-[#00B4A6] animate-pulse" />
        
        {/* Icon */}
        <div className="relative z-10">
          {config.icon}
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      </Link>

      {/* Tooltip */}
      <div 
        className={`fixed ${
          position === 'bottom-right' ? 'bottom-20 right-4' : 'bottom-20 left-4'
        } z-40 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg transition-all duration-300 transform pointer-events-none ${
          isHovered && isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-2 opacity-0'
        }`}
      >
        {config.tooltip}
        <div className={`absolute top-full ${
          position === 'bottom-right' ? 'right-6' : 'left-6'
        } w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900`} />
      </div>

      {/* Backdrop blur when hovered (optional enhancement) */}
      {isHovered && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-[1px] z-30 transition-all duration-300" />
      )}
    </>
  )
}

// Enhanced Chat Widget with notification badge
interface ChatWidgetWithBadgeProps extends ChatWidgetProps {
  hasNotification?: boolean
  notificationCount?: number
}

export const ChatWidgetWithBadge: React.FC<ChatWidgetWithBadgeProps> = ({
  hasNotification = false,
  notificationCount = 0,
  ...props
}) => {
  return (
    <div className="relative">
      <ChatWidget {...props} />
      
      {/* Notification badge */}
      {hasNotification && (
        <div className={`fixed ${
          props.position === 'bottom-left' ? 'bottom-16 left-16' : 'bottom-16 right-16'
        } z-50 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-bounce`}>
          {notificationCount > 0 ? (notificationCount > 99 ? '99+' : notificationCount) : '!'}
        </div>
      )}
    </div>
  )
}

// Floating help button for specific sections
export const FloatingHelpButton: React.FC<{
  helpText: string
  className?: string
}> = ({ helpText, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Help"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-64 p-4 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <p className="text-sm text-gray-700 mb-3">{helpText}</p>
          <div className="flex gap-2">
            <Link
              href={ROUTES.contact}
              className="flex-1 bg-[#003366] text-white px-3 py-2 rounded-lg text-sm text-center hover:bg-[#00456B] transition-colors"
            >
              Contact Us
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}