'use client'
import React from 'react'

interface LoadingProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'spinner' | 'dots' | 'bars' | 'pulse'
  text?: string
  fullScreen?: boolean
  overlay?: boolean
}

export const Loading: React.FC<LoadingProps> = ({
  className = '',
  size = 'md',
  variant = 'spinner',
  text,
  fullScreen = false,
  overlay = false
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const renderSpinner = () => (
    <div className={`animate-spin rounded-full border-2 border-gray-200 border-t-blue-600 ${sizeClasses[size]}`} />
  )

  const renderDots = () => (
    <div className="flex space-x-1">
      <div className={`bg-blue-600 rounded-full animate-bounce ${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'}`} style={{ animationDelay: '0ms' }} />
      <div className={`bg-blue-600 rounded-full animate-bounce ${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'}`} style={{ animationDelay: '150ms' }} />
      <div className={`bg-blue-600 rounded-full animate-bounce ${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'}`} style={{ animationDelay: '300ms' }} />
    </div>
  )

  const renderBars = () => (
    <div className="flex space-x-1">
      <div className={`bg-blue-600 animate-pulse ${size === 'sm' ? 'w-1 h-4' : size === 'md' ? 'w-2 h-6' : size === 'lg' ? 'w-3 h-8' : 'w-4 h-10'}`} style={{ animationDelay: '0ms' }} />
      <div className={`bg-blue-600 animate-pulse ${size === 'sm' ? 'w-1 h-4' : size === 'md' ? 'w-2 h-6' : size === 'lg' ? 'w-3 h-8' : 'w-4 h-10'}`} style={{ animationDelay: '150ms' }} />
      <div className={`bg-blue-600 animate-pulse ${size === 'sm' ? 'w-1 h-4' : size === 'md' ? 'w-2 h-6' : size === 'lg' ? 'w-3 h-8' : 'w-4 h-10'}`} style={{ animationDelay: '300ms' }} />
      <div className={`bg-blue-600 animate-pulse ${size === 'sm' ? 'w-1 h-4' : size === 'md' ? 'w-2 h-6' : size === 'lg' ? 'w-3 h-8' : 'w-4 h-10'}`} style={{ animationDelay: '450ms' }} />
    </div>
  )

  const renderPulse = () => (
    <div className={`bg-blue-600 rounded-full animate-pulse ${sizeClasses[size]}`} />
  )

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots()
      case 'bars':
        return renderBars()
      case 'pulse':
        return renderPulse()
      default:
        return renderSpinner()
    }
  }

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderLoader()}
      {text && (
        <p className="text-gray-600 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className={`fixed inset-0 bg-white z-50 flex items-center justify-center ${className}`}>
        {content}
      </div>
    )
  }

  if (overlay) {
    return (
      <div className={`absolute inset-0 bg-white bg-opacity-75 z-40 flex items-center justify-center ${className}`}>
        {content}
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      {content}
    </div>
  )
}

// Additional loading components for specific use cases
export const PageLoader: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => (
  <Loading fullScreen variant="spinner" size="lg" text={text} />
)

export const ContentLoader: React.FC<{ className?: string; text?: string }> = ({ 
  className = '', 
  text = 'Loading content...' 
}) => (
  <Loading className={`min-h-64 ${className}`} variant="spinner" size="md" text={text} />
)

export const ButtonLoader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Loading className={className} variant="spinner" size="sm" />
)

export const CardLoader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      <div className="h-3 bg-gray-200 rounded w-4/6"></div>
    </div>
    <div className="mt-4 h-8 bg-gray-200 rounded w-24"></div>
  </div>
)

export const TableLoader: React.FC<{ rows?: number; cols?: number; className?: string }> = ({ 
  rows = 5, 
  cols = 4, 
  className = '' 
}) => (
  <div className={`animate-pulse ${className}`}>
    <div className="mb-4">
      <div className="h-4 bg-gray-200 rounded w-32"></div>
    </div>
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      ))}
    </div>
  </div>
)

export const ImageLoader: React.FC<{ className?: string; aspectRatio?: string }> = ({ 
  className = '', 
  aspectRatio = 'aspect-video' 
}) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${aspectRatio} ${className}`}>
    <div className="flex items-center justify-center h-full">
      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  </div>
)

export const ListLoader: React.FC<{ items?: number; className?: string }> = ({ 
  items = 3, 
  className = '' 
}) => (
  <div className={`animate-pulse space-y-4 ${className}`}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
)