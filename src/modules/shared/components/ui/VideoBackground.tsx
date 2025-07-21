'use client'
import React, { useEffect, useRef, useState } from 'react'

interface VideoBackgroundProps {
  videoSrc?: string
  fallbackImage: string
  posterImage?: string
  className?: string
  overlay?: boolean
  overlayOpacity?: number
  muted?: boolean
  loop?: boolean
  autoPlay?: boolean
  children?: React.ReactNode
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  fallbackImage,
  posterImage,
  className = '',
  overlay = true,
  overlayOpacity = 0.5,
  muted = true,
  loop = true,
  autoPlay = true,
  children
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoSrc) return

    const handleCanPlay = () => {
      setIsVideoLoaded(true)
      if (autoPlay) {
        video.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          setHasError(true)
        })
      }
    }

    const handleError = () => {
      setHasError(true)
      setIsVideoLoaded(false)
    }

    const handleLoadStart = () => {
      setIsVideoLoaded(false)
      setHasError(false)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)
    video.addEventListener('loadstart', handleLoadStart)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
      video.removeEventListener('loadstart', handleLoadStart)
    }
  }, [videoSrc, autoPlay])

  // Intersection Observer for performance
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && autoPlay) {
            video.play().catch(() => setHasError(true))
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [autoPlay])

  const overlayStyles = overlay ? {
    background: `linear-gradient(
      135deg,
      rgba(0, 51, 102, ${overlayOpacity}) 0%,
      rgba(0, 180, 166, ${overlayOpacity * 0.7}) 50%,
      rgba(0, 51, 102, ${overlayOpacity * 0.9}) 100%
    )`
  } : {}

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Background */}
      {videoSrc && !hasError && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded && isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          muted={muted}
          loop={loop}
          playsInline
          poster={posterImage}
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Fallback Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          (isVideoLoaded && isPlaying && !hasError) ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `url(${fallbackImage})`
        }}
      />

      {/* Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 z-10"
          style={overlayStyles}
        />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-20 h-full">
          {children}
        </div>
      )}

      {/* Loading indicator */}
      {videoSrc && !isVideoLoaded && !hasError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  )
}