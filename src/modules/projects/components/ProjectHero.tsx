'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/modules/shared/components/ui'
import Image from 'next/image'

interface ProjectHeroProps {
  title?: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  backgroundImages?: string[] // Multiple images for Ken Burns effect
  onCTAClick?: () => void
  ctaText?: string
  stats?: Array<{
    label: string
    value: string
  }>
  className?: string
}

const ProjectHero: React.FC<ProjectHeroProps> = ({
  title = "Our Projects",
  subtitle = "Engineering Excellence in Action",
  description = "Explore our portfolio of successful engineering projects that demonstrate our commitment to innovation, quality, and client satisfaction.",
  backgroundImage,
  backgroundImages = [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop',
  ],
  onCTAClick,
  ctaText = "View All Projects",
  stats = [
    { label: "Projects Completed", value: "200+" },
    { label: "Years of Experience", value: "15+" },
    { label: "Client Satisfaction", value: "98%" },
    { label: "Industries Served", value: "12+" }
  ],
  className = '',
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Ken Burns effect - rotate through images
  useEffect(() => {
    if (backgroundImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 8000) // Change image every 8 seconds

    return () => clearInterval(interval)
  }, [backgroundImages.length])

  useEffect(() => {
    setIsLoaded(true)
  }, [])
  const imagesToUse = backgroundImage ? [backgroundImage] : backgroundImages

  return (
    <section className={`relative min-h-[80vh] overflow-hidden ${className}`}>
      {/* Ken Burns Effect Background Images */}
      {imagesToUse.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
            index === currentImageIndex 
              ? 'opacity-100 scale-110' 
              : 'opacity-0 scale-100'
          }`}
        >
          <Image
            src={image}
            alt={`Hero background ${index + 1}`}
            fill
            priority={index === 0}
            className={`object-cover transition-all duration-[15000ms] ease-linear ${
              index === currentImageIndex && isLoaded
                ? 'scale-110' 
                : 'scale-100'
            }`}
            sizes="100vw"
            quality={85}
          />
        </div>
      ))}
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-var(--color-primary)/80 via-var(--color-primary)/60 to-var(--color-primary-dark)/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="text-center">
            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                {title}
              </h1>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 font-light mb-6">
                {subtitle}
              </p>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-lg md:text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
                {description}
              </p>
            </div>
            
            {onCTAClick && (
              <div className={`transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <Button
                  onClick={onCTAClick}
                  size="lg"
                  className="bg-white text-var(--color-primary) hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl px-8 py-4 text-lg font-semibold"
                >
                  {ctaText}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                  </svg>
                </Button>
              </div>
            )}
          </div>
          
          {/* Enhanced Stats Section */}
          {stats && stats.length > 0 && (
            <div className={`mt-20 transform transition-all duration-1000 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="text-center group"
                    style={{ animationDelay: `${1200 + index * 200}ms` }}
                  >
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl">
                      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 group-hover:text-yellow-200 transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-blue-100 text-sm md:text-base font-medium tracking-wide uppercase">
                        {stat.label}
                      </div>
                      <div className="mt-2 w-12 h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0 mx-auto rounded-full group-hover:via-yellow-200 transition-colors"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Image indicators */}
      {imagesToUse.length > 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2">
            {imagesToUse.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'bg-white shadow-lg'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg 
          className="w-full h-16 text-gray-50" 
          preserveAspectRatio="none" 
          viewBox="0 0 1200 120" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            fill="currentColor"
          />
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            fill="currentColor"
          />
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}

export default ProjectHero