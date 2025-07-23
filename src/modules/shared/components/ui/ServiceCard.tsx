'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  features?: string[]
  link?: string
  variant?: 'default' | 'featured' | 'minimal'
  className?: string
  index?: number
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  features,
  link,
  variant = 'default',
  className = '',
  index = 0
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay based on index for staggered animation
          setTimeout(() => {
            setIsVisible(true)
          }, index * 150)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  const getVariantStyles = () => {
    switch (variant) {
      case 'featured':
        return {
          container: `
            bg-gradient-to-br from-[var(--primary-blue)] to-[var(--accent-teal)]
            text-white shadow-2xl hover:shadow-[var(--accent-teal)]/30
            transform hover:scale-105 hover:-translate-y-2
          `,
          icon: 'bg-black/40 text-white',
          title: 'text-white',
          description: 'text-white/90',
          features: 'text-white/80',
          button: 'bg-black/40 text-white hover:bg-white hover:text-[var(--primary-blue)]'
        }
      case 'minimal':
        return {
          container: `
            bg-transparent border-2 border-dashed border-[var(--border-secondary)]
            hover:border-[var(--accent-teal)] hover:bg-[var(--background-secondary)]/50
            transform hover:scale-[1.02]
          `,
          icon: 'bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]',
          title: 'text-[var(--text-primary)]',
          description: 'text-[var(--text-secondary)]',
          features: 'text-[var(--text-secondary)]',
          button: 'bg-[var(--accent-teal)] text-white hover:bg-[var(--primary-blue)]'
        }
      default:
        return {
          container: `
            bg-white border border-[var(--border)] shadow-lg hover:shadow-xl
            hover:border-[var(--accent-teal)] hover:border-opacity-50
            transform hover:scale-[1.02] hover:-translate-y-1
          `,
          icon: 'bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] group-hover:bg-[var(--accent-teal)] group-hover:text-white',
          title: 'text-[var(--text-primary)] group-hover:text-[var(--accent-teal)]',
          description: 'text-[var(--text-secondary)]',
          features: 'text-[var(--text-secondary)]',
          button: 'bg-[var(--accent-teal)] text-white hover:bg-[var(--primary-blue)]'
        }
    }
  }

  const styles = getVariantStyles()

  const CardContent = () => (
    <div
      ref={cardRef}
      className={`
        group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 ease-out
        ${styles.container}
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
        }
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-current rounded-full blur-3xl transform translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-current rounded-full blur-3xl transform -translate-x-12 translate-y-12" />
      </div>

      {/* Icon */}
      <div className={`
        relative mb-6 p-4 rounded-2xl w-fit transition-all duration-300
        ${styles.icon}
        ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
      `}>
        <div className="w-8 h-8">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className={`
        text-2xl font-bold mb-4 transition-colors duration-300
        ${styles.title}
      `}>
        {title}
      </h3>

      {/* Description */}
      <p className={`
        text-base leading-relaxed mb-6 transition-colors duration-300
        ${styles.description}
      `}>
        {description}
      </p>

      {/* Features List */}
      {features && features.length > 0 && (
        <div className="mb-8">
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li
                key={idx}
                className={`
                  flex items-center space-x-3 text-sm transition-all duration-300
                  ${styles.features}
                  ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                `}
                style={{ transitionDelay: `${(idx + 1) * 100}ms` }}
              >
                <div className={`
                  w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
                  ${variant === 'featured' 
                    ? 'bg-white/20' 
                    : 'bg-[var(--accent-teal)]/20'
                  }
                `}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Button */}
      {link && (
        <div className={`
          transition-all duration-300 transform
          ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-80'}
        `}>
          <button className={`
            inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium
            transition-all duration-300 transform hover:scale-105
            ${styles.button}
          `}>
            <span>Learn More</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Decorative Elements */}
      <div className={`
        absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-current opacity-10
        transition-all duration-500 transform
        ${isHovered ? 'scale-150 rotate-180' : 'scale-100 rotate-0'}
      `} />
      
      <div className={`
        absolute bottom-4 left-4 w-8 h-8 rounded-full border border-current opacity-10
        transition-all duration-700 transform
        ${isHovered ? 'scale-125 rotate-90' : 'scale-100 rotate-0'}
      `} />

      {/* Hover Glow Effect */}
      {variant !== 'minimal' && (
        <div className={`
          absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none
          ${variant === 'featured'
            ? 'bg-gradient-to-br from-white/5 to-transparent'
            : 'bg-gradient-to-br from-[var(--accent-teal)]/5 to-transparent'
          }
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} />
      )}
    </div>
  )

  if (link) {
    return (
      <Link href={link}>
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}

// Service grid container with staggered animations
interface ServiceGridProps {
  services: Array<Omit<ServiceCardProps, 'index'>>
  className?: string
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  services,
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
      {services.map((service, index) => (
        <ServiceCard
          key={service.title}
          {...service}
          index={index}
        />
      ))}
    </div>
  )
}