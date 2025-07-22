'use client'

import React, { useState, useEffect, useRef } from 'react'

interface ProgressiveImageProps {
  src: string
  placeholderSrc?: string
  alt: string
  className?: string
  width?: number
  height?: number
  quality?: 'low' | 'medium' | 'high'
  loading?: 'lazy' | 'eager'
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  placeholderSrc,
  alt,
  className = '',
  width,
  height,
  quality = 'high',
  loading = 'lazy',
  priority = false,
  onLoad,
  onError
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [inView, setInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const intersectionRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!intersectionRef.current || priority || loading === 'eager') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(intersectionRef.current!)
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    )

    observer.observe(intersectionRef.current)

    return () => {
      if (intersectionRef.current) {
        observer.unobserve(intersectionRef.current)
      }
    }
  }, [priority, loading])

  // Handle image loading
  useEffect(() => {
    if (!inView) return

    const img = new Image()
    
    img.onload = () => {
      setImageLoaded(true)
      onLoad?.()
    }
    
    img.onerror = () => {
      setImageError(true)
      onError?.()
    }

    img.src = src
  }, [src, inView, onLoad, onError])

  // Generate blur placeholder from main image
  const generateBlurPlaceholder = (imageSrc: string) => {
    // Simple base64 blur placeholder
    return `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
          </filter>
        </defs>
        <rect width="100" height="100" fill="#f3f4f6" filter="url(#blur)"/>
      </svg>
    `)}`
  }

  const placeholder = placeholderSrc || generateBlurPlaceholder(src)

  const imageStyle: React.CSSProperties = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto',
    transition: 'all 0.3s ease',
    filter: imageLoaded ? 'blur(0px)' : 'blur(2px)',
    transform: imageLoaded ? 'scale(1)' : 'scale(1.1)',
    opacity: imageLoaded ? 1 : 0
  }

  const placeholderStyle: React.CSSProperties = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto',
    transition: 'opacity 0.3s ease',
    opacity: imageLoaded ? 0 : 1
  }

  return (
    <div 
      ref={intersectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : 'auto' }}
    >
      {/* Placeholder/Blur image */}
      <img
        src={placeholder}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={placeholderStyle}
        aria-hidden="true"
      />

      {/* Main image */}
      {(inView || priority) && !imageError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={imageStyle}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}

      {/* Error fallback */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {inView && !imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#003366] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}

// Hero Image with Ken Burns Effect
interface HeroImageProps extends Omit<ProgressiveImageProps, 'className'> {
  className?: string
  kenBurns?: boolean
  overlay?: boolean
  overlayOpacity?: number
}

export const HeroImage: React.FC<HeroImageProps> = ({
  kenBurns = true,
  overlay = true,
  overlayOpacity = 0.4,
  className = '',
  ...props
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <ProgressiveImage
        {...props}
        className={`w-full h-full object-cover ${kenBurns ? 'animate-ken-burns' : ''}`}
      />
      
      {overlay && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#003366]/60 via-transparent to-[#00B4A6]/40"
          style={{ opacity: overlayOpacity }}
        />
      )}

      <style jsx>{`
        @keyframes ken-burns {
          0% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(0.5deg);
          }
          100% {
            transform: scale(1.05) rotate(-0.3deg);
          }
        }
        
        .animate-ken-burns {
          animation: ken-burns 20s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  )
}

// Optimized Background Image
export const BackgroundImage: React.FC<{
  src: string
  alt: string
  className?: string
  children?: React.ReactNode
  overlay?: boolean
  parallax?: boolean
}> = ({
  src,
  alt,
  className = '',
  children,
  overlay = false,
  parallax = false
}) => {
  return (
    <div className={`relative ${className}`}>
      <ProgressiveImage
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover ${parallax ? 'will-change-transform' : ''}`}
        priority={true}
      />
      
      {overlay && (
        <div className="absolute inset-0 bg-black/50" />
      )}
      
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}

// Image Gallery with Progressive Loading
export const ImageGallery: React.FC<{
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
  className?: string
  columns?: number
}> = ({
  images,
  className = '',
  columns = 3
}) => {
  return (
    <div className={`grid gap-4 ${className}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {images.map((image, index) => (
        <div key={index} className="group relative overflow-hidden rounded-lg">
          <ProgressiveImage
            src={image.src}
            alt={image.alt}
            className="aspect-square group-hover:scale-105 transition-transform duration-500"
          />
          
          {image.caption && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <p className="text-white p-4 text-sm">{image.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Avatar with Progressive Loading
export const Avatar: React.FC<{
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  fallbackInitials?: string
}> = ({
  src,
  alt,
  size = 'md',
  className = '',
  fallbackInitials
}) => {
  const [imageError, setImageError] = useState(false)
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  if (imageError && fallbackInitials) {
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-[#003366] to-[#00B4A6] flex items-center justify-center text-white font-semibold ${className}`}>
        {fallbackInitials}
      </div>
    )
  }

  return (
    <ProgressiveImage
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      onError={() => setImageError(true)}
    />
  )
}