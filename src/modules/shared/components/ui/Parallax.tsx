'use client'
import React, { useEffect, useRef, useState } from 'react'

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
  offset?: number
  disabled?: boolean
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  className = '',
  offset = 0,
  disabled = false
}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  useEffect(() => {
    if (disabled) return

    const handleScroll = () => {
      const element = elementRef.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const scrolled = window.pageYOffset
      const windowHeight = window.innerHeight
      
      // Only apply parallax when element is in viewport
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const elementTop = rect.top + scrolled
        const elementHeight = element.offsetHeight
        const windowBottom = scrolled + windowHeight
        
        // Calculate parallax offset
        const parallaxOffset = (scrolled - elementTop + offset) * speed
        
        setTransform(`translateY(${parallaxOffset}px)`)
      }
    }

    // Throttle scroll events for performance
    let ticking = false
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll)
        ticking = true
        setTimeout(() => { ticking = false }, 10)
      }
    }

    window.addEventListener('scroll', optimizedScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', optimizedScroll)
    }
  }, [speed, offset, disabled])

  // Disable parallax on mobile for performance
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setTransform('')
      }
    }

    mediaQuery.addEventListener('change', handleMediaChange)
    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform: disabled ? undefined : transform,
        transition: disabled ? 'transform 0.1s ease-out' : undefined,
        willChange: disabled ? undefined : 'transform'
      }}
    >
      {children}
    </div>
  )
}

// Background parallax component for hero sections
interface BackgroundParallaxProps {
  imageSrc?: string
  videoSrc?: string
  className?: string
  speed?: number
  children?: React.ReactNode
  overlay?: boolean
}

export const BackgroundParallax: React.FC<BackgroundParallaxProps> = ({
  imageSrc,
  videoSrc,
  className = '',
  speed = 0.3,
  children,
  overlay = true
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Parallax speed={speed} className="absolute inset-0 w-full h-[120%]">
        {videoSrc ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : imageSrc ? (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--primary-blue)] to-[var(--accent-teal)]" />
        )}
      </Parallax>

      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-[var(--primary-blue)]/30 to-transparent z-10" />
      )}

      {children && (
        <div className="relative z-20">
          {children}
        </div>
      )}
    </div>
  )
}