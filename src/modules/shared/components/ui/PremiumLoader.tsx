'use client'

import React from 'react'

interface PremiumLoaderProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'skeleton' | 'engineering' | 'brand'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'accent' | 'gradient'
  text?: string
  className?: string
}

export const PremiumLoader: React.FC<PremiumLoaderProps> = ({
  variant = 'engineering',
  size = 'md',
  color = 'primary',
  text,
  className = ''
}) => {
  const sizeClasses = {
    sm: { loader: 'w-6 h-6', text: 'text-sm' },
    md: { loader: 'w-8 h-8', text: 'text-base' },
    lg: { loader: 'w-12 h-12', text: 'text-lg' },
    xl: { loader: 'w-16 h-16', text: 'text-xl' }
  }
  
  const colorClasses = {
    primary: 'text-[#003366]',
    accent: 'text-[#00B4A6]',
    gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-[#003366] to-[#00B4A6]'
  }
  
  const renderSpinner = () => (
    <div className={`${sizeClasses[size].loader} animate-spin`}>
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="3"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
  
  const renderDots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'} 
                     bg-current rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )
  
  const renderPulse = () => (
    <div className={`${sizeClasses[size].loader} bg-current rounded-full animate-pulse opacity-75`} />
  )
  
  const renderWave = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`${size === 'sm' ? 'w-1 h-4' : size === 'md' ? 'w-1.5 h-6' : size === 'lg' ? 'w-2 h-8' : 'w-3 h-10'} 
                     bg-current rounded-full animate-wave`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )
  
  const renderEngineering = () => (
    <div className={`${sizeClasses[size].loader} relative`}>
      <svg className="w-full h-full animate-spin" viewBox="0 0 24 24" fill="none">
        {/* Outer gear */}
        <path 
          d="M12 2L13.09 8.26L20 5.27L16.74 11.73L23 12L16.74 12.27L20 18.73L13.09 15.74L12 22L10.91 15.74L4 18.73L7.26 12.27L1 12L7.26 11.73L4 5.27L10.91 8.26L12 2Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          fill="none"
          className="opacity-75"
        />
        {/* Inner circle */}
        <circle 
          cx="12" 
          cy="12" 
          r="4" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          fill="none"
          className="opacity-50"
        />
        {/* Center dot */}
        <circle 
          cx="12" 
          cy="12" 
          r="1.5" 
          fill="currentColor"
          className="opacity-100"
        />
      </svg>
    </div>
  )
  
  const renderBrand = () => (
    <div className={`${sizeClasses[size].loader} relative`}>
      <div className="absolute inset-0 border-4 border-[#003366]/20 rounded-full" />
      <div className="absolute inset-0 border-4 border-transparent border-t-[#003366] border-r-[#00B4A6] rounded-full animate-spin" />
      <div className="absolute inset-2 border-2 border-[#00B4A6]/30 rounded-full" />
      <div className="absolute inset-2 border-2 border-transparent border-b-[#00B4A6] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      
      {/* Center logo or icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 bg-gradient-to-r from-[#003366] to-[#00B4A6] rounded-full animate-pulse" />
      </div>
    </div>
  )
  
  const renderSkeleton = () => (
    <div className="space-y-3">
      <div className={`${size === 'sm' ? 'h-3' : size === 'md' ? 'h-4' : size === 'lg' ? 'h-5' : 'h-6'} 
                       bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse`} 
           style={{ width: '60%' }} />
      <div className={`${size === 'sm' ? 'h-3' : size === 'md' ? 'h-4' : size === 'lg' ? 'h-5' : 'h-6'} 
                       bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse`} 
           style={{ width: '80%', animationDelay: '0.1s' }} />
      <div className={`${size === 'sm' ? 'h-3' : size === 'md' ? 'h-4' : size === 'lg' ? 'h-5' : 'h-6'} 
                       bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse`} 
           style={{ width: '40%', animationDelay: '0.2s' }} />
    </div>
  )
  
  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return renderSpinner()
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      case 'wave':
        return renderWave()
      case 'skeleton':
        return renderSkeleton()
      case 'engineering':
        return renderEngineering()
      case 'brand':
        return renderBrand()
      default:
        return renderEngineering()
    }
  }
  
  return (
    <>
      <style jsx>{`
        @keyframes wave {
          0%, 40%, 100% {
            transform: scaleY(0.4);
          }
          20% {
            transform: scaleY(1);
          }
        }
        
        .animate-wave {
          animation: wave 1.2s ease-in-out infinite;
        }
      `}</style>
      
      <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
        <div className={`${colorClasses[color]} ${variant === 'skeleton' ? '' : 'flex items-center justify-center'}`}>
          {renderLoader()}
        </div>
        
        {text && (
          <p className={`${sizeClasses[size].text} ${colorClasses[color]} font-medium animate-pulse`}>
            {text}
          </p>
        )}
      </div>
    </>
  )
}

// Skeleton loader for specific content types
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-lg p-6 space-y-4 ${className}`}>
    <div className="animate-pulse space-y-3">
      <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl" 
           style={{ backgroundSize: '200% 100%', animation: 'skeleton-shine 2s ease-in-out infinite' }} />
      <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg" 
           style={{ width: '75%', backgroundSize: '200% 100%', animation: 'skeleton-shine 2s ease-in-out infinite', animationDelay: '0.1s' }} />
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg" 
           style={{ width: '100%', backgroundSize: '200% 100%', animation: 'skeleton-shine 2s ease-in-out infinite', animationDelay: '0.2s' }} />
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg" 
           style={{ width: '60%', backgroundSize: '200% 100%', animation: 'skeleton-shine 2s ease-in-out infinite', animationDelay: '0.3s' }} />
    </div>
    
    <style jsx>{`
      @keyframes skeleton-shine {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `}</style>
  </div>
)

// Page loader overlay
export const PageLoader: React.FC<{ text?: string }> = ({ text = "Loading..." }) => (
  <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="text-center">
      <PremiumLoader variant="brand" size="xl" color="gradient" text={text} />
    </div>
  </div>
)

// Section loader
export const SectionLoader: React.FC<{ text?: string, className?: string }> = ({ 
  text = "Loading...", 
  className = '' 
}) => (
  <div className={`flex items-center justify-center py-12 ${className}`}>
    <PremiumLoader variant="engineering" size="lg" color="primary" text={text} />
  </div>
)