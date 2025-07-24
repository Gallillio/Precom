'use client'

import React from 'react'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse'
}) => {
  const baseClasses = 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200'
  
  const variantClasses = {
    text: 'h-4',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg'
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-skeleton-wave',
    none: ''
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <>
      <div
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${animationClasses[animation]}
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        style={style}
      />
      
      {animation === 'wave' && (
        <style jsx>{`
          @keyframes skeleton-wave {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          
          .animate-skeleton-wave {
            background-size: 200% 100%;
            animation: skeleton-wave 1.5s ease-in-out infinite;
          }
        `}</style>
      )}
    </>
  )
}

// Article Card Skeleton
export const ArticleSkeleton: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => (
  <div className={`bg-white rounded-2xl shadow-lg p-6 space-y-4 ${className}`}>
    {/* Image placeholder */}
    <Skeleton 
      variant="rounded" 
      className="w-full h-48" 
      animation="wave" 
    />
    
    {/* Category badge */}
    <Skeleton 
      variant="rounded" 
      width="80px" 
      height="24px" 
      animation="wave" 
    />
    
    {/* Title */}
    <div className="space-y-2">
      <Skeleton 
        variant="text" 
        className="h-6" 
        animation="wave" 
      />
      <Skeleton 
        variant="text" 
        className="h-6 w-3/4" 
        animation="wave" 
      />
    </div>
    
    {/* Description */}
    <div className="space-y-2">
      <Skeleton variant="text" animation="wave" />
      <Skeleton variant="text" animation="wave" />
      <Skeleton variant="text" className="w-2/3" animation="wave" />
    </div>
    
    {/* Author and date */}
    <div className="flex items-center justify-between pt-4">
      <div className="flex items-center space-x-3">
        <Skeleton 
          variant="circular" 
          width="32px" 
          height="32px" 
          animation="wave" 
        />
        <div className="space-y-1">
          <Skeleton 
            variant="text" 
            width="100px" 
            height="14px" 
            animation="wave" 
          />
          <Skeleton 
            variant="text" 
            width="80px" 
            height="12px" 
            animation="wave" 
          />
        </div>
      </div>
      <Skeleton 
        variant="text" 
        width="60px" 
        height="14px" 
        animation="wave" 
      />
    </div>
  </div>
)

// Project Card Skeleton
export const ProjectSkeleton: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => (
  <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
    {/* Image placeholder */}
    <Skeleton 
      variant="rectangular" 
      className="w-full h-64" 
      animation="wave" 
    />
    
    <div className="p-6 space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <Skeleton 
          variant="text" 
          className="h-6" 
          animation="wave" 
        />
        <Skeleton 
          variant="text" 
          className="h-6 w-2/3" 
          animation="wave" 
        />
      </div>
      
      {/* Description */}
      <div className="space-y-2">
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map((i) => (
          <Skeleton 
            key={i}
            variant="rounded" 
            width={`${60 + i * 20}px`}
            height="24px" 
            animation="wave" 
          />
        ))}
      </div>
      
      {/* Button */}
      <Skeleton 
        variant="rounded" 
        className="h-12 w-full" 
        animation="wave" 
      />
    </div>
  </div>
)

// Service Card Skeleton
export const ServiceSkeleton: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => (
  <div className={`bg-white rounded-2xl shadow-lg p-8 space-y-6 ${className}`}>
    {/* Icon */}
    <Skeleton 
      variant="circular" 
      width="64px" 
      height="64px" 
      animation="wave" 
    />
    
    {/* Title */}
    <Skeleton 
      variant="text" 
      className="h-8 w-3/4" 
      animation="wave" 
    />
    
    {/* Description */}
    <div className="space-y-2">
      <Skeleton variant="text" animation="wave" />
      <Skeleton variant="text" animation="wave" />
      <Skeleton variant="text" className="w-4/5" animation="wave" />
    </div>
    
    {/* Features list */}
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center space-x-3">
          <Skeleton 
            variant="circular" 
            width="20px" 
            height="20px" 
            animation="wave" 
          />
          <Skeleton 
            variant="text" 
            width={`${120 + i * 30}px`}
            height="16px" 
            animation="wave" 
          />
        </div>
      ))}
    </div>
    
    {/* Button */}
    <Skeleton 
      variant="rounded" 
      className="h-12 w-full" 
      animation="wave" 
    />
  </div>
)

// Team Member Skeleton
export const TeamMemberSkeleton: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => (
  <div className={`bg-white rounded-2xl shadow-lg p-6 text-center space-y-4 ${className}`}>
    {/* Photo */}
    <Skeleton 
      variant="circular" 
      width="120px" 
      height="120px" 
      className="mx-auto" 
      animation="wave" 
    />
    
    {/* Name */}
    <Skeleton 
      variant="text" 
      className="h-6 w-32 mx-auto" 
      animation="wave" 
    />
    
    {/* Title */}
    <Skeleton 
      variant="text" 
      className="h-4 w-40 mx-auto" 
      animation="wave" 
    />
    
    {/* Bio */}
    <div className="space-y-2">
      <Skeleton variant="text" animation="wave" />
      <Skeleton variant="text" className="w-4/5 mx-auto" animation="wave" />
    </div>
    
    {/* Social links */}
    <div className="flex justify-center space-x-3">
      {[1, 2, 3].map((i) => (
        <Skeleton 
          key={i}
          variant="circular" 
          width="36px" 
          height="36px" 
          animation="wave" 
        />
      ))}
    </div>
  </div>
)

// Stats Skeleton
export const StatsSkeleton: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => (
  <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 ${className}`}>
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="text-center space-y-3">
        {/* Icon */}
        <Skeleton 
          variant="circular" 
          width="48px" 
          height="48px" 
          className="mx-auto" 
          animation="wave" 
        />
        
        {/* Number */}
        <Skeleton 
          variant="text" 
          className="h-10 w-20 mx-auto" 
          animation="wave" 
        />
        
        {/* Label */}
        <Skeleton 
          variant="text" 
          className="h-4 w-24 mx-auto" 
          animation="wave" 
        />
      </div>
    ))}
  </div>
)

// Hero Section Skeleton
export const HeroSkeleton: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => (
  <div className={`min-h-screen bg-gray-100 flex items-center justify-center ${className}`}>
    <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
      {/* Badge */}
      <Skeleton 
        variant="rounded" 
        width="200px" 
        height="40px" 
        className="mx-auto" 
        animation="wave" 
      />
      
      {/* Main title */}
      <div className="space-y-4">
        <Skeleton 
          variant="text" 
          className="h-16 w-full" 
          animation="wave" 
        />
        <Skeleton 
          variant="text" 
          className="h-16 w-4/5 mx-auto" 
          animation="wave" 
        />
        <Skeleton 
          variant="text" 
          className="h-12 w-3/5 mx-auto" 
          animation="wave" 
        />
      </div>
      
      {/* Description */}
      <div className="space-y-3 max-w-2xl mx-auto">
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" className="w-3/4 mx-auto" animation="wave" />
      </div>
      
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Skeleton 
          variant="rounded" 
          width="160px" 
          height="48px" 
          animation="wave" 
        />
        <Skeleton 
          variant="rounded" 
          width="160px" 
          height="48px" 
          animation="wave" 
        />
      </div>
      
      {/* Stats */}
      <div className="pt-16">
        <StatsSkeleton />
      </div>
    </div>
  </div>
)

// Table Skeleton
export const TableSkeleton: React.FC<{ 
  rows?: number
  columns?: number
  className?: string 
}> = ({ 
  rows = 5, 
  columns = 4, 
  className = '' 
}) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {/* Header */}
    <div className="border-b border-gray-200 p-4">
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array(columns).fill(0).map((_, i) => (
          <Skeleton 
            key={`header-${i}`}
            variant="text" 
            className="h-5" 
            animation="wave" 
          />
        ))}
      </div>
    </div>
    
    {/* Rows */}
    <div className="divide-y divide-gray-200">
      {Array(rows).fill(0).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="p-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array(columns).fill(0).map((_, colIndex) => (
              <Skeleton 
                key={`cell-${rowIndex}-${colIndex}`}
                variant="text" 
                animation="wave" 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Form Skeleton
export const FormSkeleton: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => (
  <div className={`bg-white rounded-lg shadow-lg p-6 space-y-6 ${className}`}>
    {/* Title */}
    <Skeleton 
      variant="text" 
      className="h-8 w-1/2" 
      animation="wave" 
    />
    
    {/* Form fields */}
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton 
            variant="text" 
            width="100px" 
            height="16px" 
            animation="wave" 
          />
          <Skeleton 
            variant="rounded" 
            className="h-12 w-full" 
            animation="wave" 
          />
        </div>
      ))}
      
      {/* Textarea */}
      <div className="space-y-2">
        <Skeleton 
          variant="text" 
          width="120px" 
          height="16px" 
          animation="wave" 
        />
        <Skeleton 
          variant="rounded" 
          className="h-24 w-full" 
          animation="wave" 
        />
      </div>
    </div>
    
    {/* Button */}
    <Skeleton 
      variant="rounded" 
      className="h-12 w-full" 
      animation="wave" 
    />
  </div>
)

// Navigation Skeleton
export const NavigationSkeleton: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => (
  <div className={`bg-white border-b border-gray-200 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <Skeleton 
          variant="text" 
          width="120px" 
          height="32px" 
          animation="wave" 
        />
        
        {/* Navigation items */}
        <div className="hidden md:flex space-x-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton 
              key={i}
              variant="text" 
              width={`${60 + i * 10}px`}
              height="20px" 
              animation="wave" 
            />
          ))}
        </div>
        
        {/* CTA Button */}
        <Skeleton 
          variant="rounded" 
          width="100px" 
          height="36px" 
          animation="wave" 
        />
      </div>
    </div>
  </div>
)