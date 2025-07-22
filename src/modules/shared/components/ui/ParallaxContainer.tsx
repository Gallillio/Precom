'use client'

import React, { useRef, useEffect, useState } from 'react'
import { addParallaxEffect, removeParallaxEffect } from '../../utils/animations'

interface ParallaxContainerProps {
  children: React.ReactNode
  speed?: number
  direction?: 'vertical' | 'horizontal'
  className?: string
  offset?: number
  disabled?: boolean
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = 0.5,
  direction = 'vertical',
  className = '',
  offset = 0,
  disabled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  
  useEffect(() => {
    if (disabled || !containerRef.current) return
    
    const element = containerRef.current
    
    // Add parallax effect
    addParallaxEffect(element, speed, direction)
    
    // Set up intersection observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        rootMargin: '50% 0px 50% 0px'
      }
    )
    
    observer.observe(element)
    
    return () => {
      observer.unobserve(element)
      removeParallaxEffect(element)
    }
  }, [speed, direction, disabled])
  
  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        transform: `translateY(${offset}px)`
      }}
    >
      {children}
    </div>
  )
}

// Hero parallax component with layered effects
interface ParallaxHeroProps {
  children: React.ReactNode
  backgroundImage?: string
  backgroundImages?: string[]
  className?: string
  overlayOpacity?: number
}

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  children,
  backgroundImage,
  backgroundImages,
  className = '',
  overlayOpacity = 0.7
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  
  // Rotate background images
  useEffect(() => {
    if (!backgroundImages || backgroundImages.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [backgroundImages])
  
  // Add parallax to background layers
  useEffect(() => {
    if (!heroRef.current) return
    
    const hero = heroRef.current
    const backgroundLayers = hero.querySelectorAll('.parallax-bg-layer')
    
    backgroundLayers.forEach((layer, index) => {
      const speed = 0.3 + (index * 0.1) // Different speeds for each layer
      addParallaxEffect(layer as HTMLElement, speed, 'vertical')
    })
    
    return () => {
      backgroundLayers.forEach((layer) => {
        removeParallaxEffect(layer as HTMLElement)
      })
    }
  }, [])
  
  const imagesToUse = backgroundImages || (backgroundImage ? [backgroundImage] : [])
  
  return (
    <div ref={heroRef} className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Background layers with parallax */}
      {imagesToUse.map((image, index) => (
        <div
          key={index}
          className={`parallax-bg-layer absolute inset-0 transition-opacity duration-3000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: 'scale(1.1)' // Slightly larger to prevent edges showing
          }}
        />
      ))}
      
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#003366]/80 via-transparent to-[#00B4A6]/60"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Animated geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <ParallaxContainer speed={0.2} className="absolute top-20 right-20">
          <div className="w-64 h-64 border-2 border-white/30 rounded-full animate-pulse" />
        </ParallaxContainer>
        <ParallaxContainer speed={0.4} className="absolute bottom-20 left-20">
          <div className="w-48 h-48 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </ParallaxContainer>
        <ParallaxContainer speed={0.1} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border border-white/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </ParallaxContainer>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Ken Burns animation */}
      <style jsx>{`
        .parallax-bg-layer {
          animation: kenBurnsZoom 20s ease-in-out infinite alternate;
        }
        
        @keyframes kenBurnsZoom {
          0% {
            transform: scale(1.1) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(0.5deg);
          }
          100% {
            transform: scale(1.15) rotate(-0.3deg);
          }
        }
      `}</style>
    </div>
  )
}

// Section with parallax background
interface ParallaxSectionProps {
  children: React.ReactNode
  backgroundImage?: string
  speed?: number
  className?: string
  overlayColor?: string
  overlayOpacity?: number
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  backgroundImage,
  speed = 0.5,
  className = '',
  overlayColor = '#003366',
  overlayOpacity = 0.8
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!sectionRef.current || !backgroundImage) return
    
    const background = sectionRef.current.querySelector('.parallax-bg') as HTMLElement
    if (background) {
      addParallaxEffect(background, speed, 'vertical')
    }
    
    return () => {
      if (background) {
        removeParallaxEffect(background)
      }
    }
  }, [backgroundImage, speed])
  
  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {backgroundImage && (
        <>
          <div
            className="parallax-bg absolute inset-0"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              transform: 'scale(1.1)'
            }}
          />
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: overlayColor,
              opacity: overlayOpacity 
            }}
          />
        </>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Floating elements with parallax
export const ParallaxFloat: React.FC<{
  children: React.ReactNode
  speed?: number
  amplitude?: number
  duration?: number
  className?: string
}> = ({
  children,
  speed = 0.3,
  amplitude = 20,
  duration = 4,
  className = ''
}) => {
  const floatRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!floatRef.current) return
    
    addParallaxEffect(floatRef.current, speed, 'vertical')
    
    return () => {
      if (floatRef.current) {
        removeParallaxEffect(floatRef.current)
      }
    }
  }, [speed])
  
  return (
    <div
      ref={floatRef}
      className={`animate-float ${className}`}
      style={{
        animationDuration: `${duration}s`
      }}
    >
      {children}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-${amplitude}px);
          }
        }
        
        .animate-float {
          animation: float ${duration}s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// Text reveal with parallax
export const ParallaxTextReveal: React.FC<{
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}> = ({
  children,
  direction = 'up',
  delay = 0,
  className = ''
}) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!textRef.current) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsRevealed(true), delay)
        }
      },
      { threshold: 0.1 }
    )
    
    observer.observe(textRef.current)
    
    return () => observer.disconnect()
  }, [delay])
  
  const getTransform = () => {
    if (isRevealed) return 'translate(0, 0)'
    
    switch (direction) {
      case 'up':
        return 'translate(0, 30px)'
      case 'down':
        return 'translate(0, -30px)'
      case 'left':
        return 'translate(30px, 0)'
      case 'right':
        return 'translate(-30px, 0)'
      default:
        return 'translate(0, 30px)'
    }
  }
  
  return (
    <div
      ref={textRef}
      className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${className}`}
      style={{
        transform: getTransform(),
        opacity: isRevealed ? 1 : 0
      }}
    >
      {children}
    </div>
  )
}