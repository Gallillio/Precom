'use client'
import React, { useEffect, useState } from 'react'

interface ScrollIndicatorProps {
  className?: string
  targetId?: string
  text?: string
  variant?: 'arrow' | 'mouse' | 'dots'
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  className = '',
  targetId,
  text = 'Scroll to explore',
  variant = 'arrow'
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsVisible(scrollTop < 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    if (targetId) {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    } else {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      })
    }
  }

  const renderIndicator = () => {
    switch (variant) {
      case 'mouse':
        return (
          <div className="relative">
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <div className="w-1 h-3 bg-current rounded-full animate-bounce mt-2" />
            </div>
          </div>
        )
      
      case 'dots':
        return (
          <div className="flex flex-col space-y-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`w-2 h-2 bg-current rounded-full animate-pulse`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>
        )
      
      default: // arrow
        return (
          <svg 
            className="w-6 h-6 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        )
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`
        group flex flex-col items-center space-y-2 text-white/80 hover:text-white
        transition-all duration-500 ease-in-out cursor-pointer
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        ${className}
      `}
      aria-label={text}
    >
      {text && (
        <span className="text-sm font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {text}
        </span>
      )}
      
      <div className="transform group-hover:scale-110 transition-transform duration-300">
        {renderIndicator()}
      </div>
    </button>
  )
}

// Floating scroll progress indicator
interface ScrollProgressProps {
  className?: string
  height?: number
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className = '',
  height = 4
}) => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`fixed top-0 left-0 w-full h-1 bg-gray-200 z-[60] ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-[#003366] to-[#00B4A6] transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}