'use client'
import React from 'react'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-32 h-32 bg-[var(--primary-blue)] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-[var(--accent-teal)] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src="/images/logo.png" 
            alt="Precom Logo"
            className="h-12 w-auto opacity-90"
          />
          <h1 className="text-3xl font-bold text-[var(--primary-blue)]">
            Precom
          </h1>
        </div>

        {/* Loading Animation */}
        <div className="relative">
          {/* Main Spinner */}
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[var(--primary-blue)] rounded-full animate-spin"></div>
          
          {/* Secondary Ring */}
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-[var(--accent-teal)] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-lg font-medium text-[var(--text-primary)] mb-2">
            Loading
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Industrial & Business Consultancy
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </div>
  )
}