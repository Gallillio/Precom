'use client'
import React, { useState, useEffect, useRef } from 'react'

interface AnimatedCounterProps {
  end: number
  start?: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
  separator?: string
  triggerOnce?: boolean
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start = 0,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
  separator = ',',
  triggerOnce = true
}) => {
  const [count, setCount] = useState(start)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          animateCount()
          if (triggerOnce) setHasTriggered(true)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [hasTriggered, triggerOnce])

  const animateCount = () => {
    const startTime = Date.now()
    const startValue = start
    const endValue = end

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Use easing function for smooth animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
      const easedProgress = easeOutCubic(progress)
      
      const currentValue = startValue + (endValue - startValue) * easedProgress
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }

  const formatNumber = (value: number) => {
    const rounded = decimals > 0 
      ? value.toFixed(decimals)
      : Math.round(value).toString()
    
    if (separator && value >= 1000) {
      return rounded.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    }
    
    return rounded
  }

  return (
    <span ref={elementRef} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  )
}

// Stats card component with counter animation
interface StatsCardProps {
  icon: React.ReactNode
  value: number
  suffix?: string
  prefix?: string
  label: string
  description?: string
  className?: string
  variant?: 'default' | 'gradient' | 'minimal'
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  value,
  suffix = '',
  prefix = '',
  label,
  description,
  className = '',
  variant = 'default'
}) => {
  const variantStyles = {
    default: `
      bg-white border border-[var(--border)] shadow-lg hover:shadow-xl
      hover:border-[var(--accent-teal)] hover:border-opacity-50
    `,
    gradient: `
      bg-gradient-to-br from-[var(--primary-blue)] to-[var(--accent-teal)]
      text-white shadow-2xl hover:shadow-[var(--accent-teal)]/25
    `,
    minimal: `
      bg-transparent border-2 border-dashed border-[var(--border-secondary)]
      hover:border-[var(--accent-teal)] hover:bg-[var(--background-secondary)]
    `
  }

  return (
    <div className={`
      group rounded-2xl p-8 transition-all duration-500 ease-out cursor-pointer
      hover:scale-105 hover:-translate-y-2 transform
      ${variantStyles[variant]}
      ${className}
    `}>
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div className={`
          p-4 rounded-full transition-all duration-300 group-hover:scale-110
          ${variant === 'gradient' 
            ? 'bg-black/40 text-white' 
            : 'bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]'
          }
        `}>
          {icon}
        </div>

        {/* Counter */}
        <div className={`
          text-4xl sm:text-5xl font-bold transition-colors duration-300
          ${variant === 'gradient'
            ? 'text-white'
            : 'text-[var(--text-primary)] group-hover:text-[var(--accent-teal)]'
          }
        `}>
          <AnimatedCounter
            end={value}
            suffix={suffix}
            prefix={prefix}
            duration={2500}
          />
        </div>

        {/* Label */}
        <h3 className={`
          text-lg font-semibold transition-colors duration-300
          ${variant === 'gradient'
            ? 'text-white/90'
            : 'text-[var(--text-primary)]'
          }
        `}>
          {label}
        </h3>

        {/* Description */}
        {description && (
          <p className={`
            text-sm leading-relaxed transition-colors duration-300
            ${variant === 'gradient'
              ? 'text-white/70'
              : 'text-[var(--text-secondary)]'
            }
          `}>
            {description}
          </p>
        )}

        {/* Decorative element */}
        <div className={`
          w-12 h-1 rounded-full transition-all duration-300 group-hover:w-20
          ${variant === 'gradient'
            ? 'bg-white/30 group-hover:bg-white/50'
            : 'bg-[var(--accent-teal)]/30 group-hover:bg-[var(--accent-teal)]'
          }
        `} />
      </div>
    </div>
  )
}