'use client'
import React, { useState, useEffect } from 'react'
import { Card } from '@/modules/shared/components/ui'

interface Stat {
  id: string
  label: string
  value: number
  suffix?: string
  prefix?: string
  description?: string
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
}

interface StatsProps {
  className?: string
  stats?: Stat[]
  title?: string
  description?: string
  variant?: 'default' | 'cards' | 'minimal' | 'hero'
  animated?: boolean
}

const defaultStats: Stat[] = [
  {
    id: '1',
    label: 'Projects Completed',
    value: 250,
    suffix: '+',
    description: 'Successfully delivered engineering projects',
    color: 'blue',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: '2',
    label: 'Years Experience',
    value: 15,
    suffix: '+',
    description: 'Combined team experience in engineering',
    color: 'green',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: '3',
    label: 'Client Satisfaction',
    value: 98,
    suffix: '%',
    description: 'Average client satisfaction rating',
    color: 'purple',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    id: '4',
    label: 'Cost Savings',
    value: 2.5,
    prefix: '$',
    suffix: 'M',
    description: 'Total cost savings for clients',
    color: 'orange',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    )
  }
]

const useCountAnimation = (endValue: number, duration: number = 2000, startAnimation: boolean = false) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startAnimation) return

    let startTime: number
    const startValue = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOut)
      
      setCount(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [endValue, duration, startAnimation])

  return count
}

export const Stats: React.FC<StatsProps> = ({
  className = '',
  stats = defaultStats,
  title = 'Our Track Record',
  description = 'Numbers that showcase our commitment to excellence and client success.',
  variant = 'default',
  animated = true
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('stats-container')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const getColorClasses = (color: string = 'blue') => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const StatItem: React.FC<{ stat: Stat; index: number }> = ({ stat, index }) => {
    const animatedValue = useCountAnimation(stat.value, 2000, animated && isVisible)
    const displayValue = animated ? animatedValue : stat.value

    return (
      <div key={stat.id} className="text-center">
        {variant === 'cards' && (
          <Card className="p-8 h-full">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${getColorClasses(stat.color)}`}>
              {stat.icon}
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {stat.prefix}{displayValue.toLocaleString()}{stat.suffix}
            </div>
            <div className="text-xl font-semibold text-gray-800 mb-2">
              {stat.label}
            </div>
            {stat.description && (
              <p className="text-gray-600 text-sm">
                {stat.description}
              </p>
            )}
          </Card>
        )}

        {variant === 'minimal' && (
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              {stat.prefix}{displayValue.toLocaleString()}{stat.suffix}
            </div>
            <div className="text-lg font-medium text-gray-600">
              {stat.label}
            </div>
          </div>
        )}

        {variant === 'hero' && (
          <div className="p-6 text-white">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              {stat.prefix}{displayValue.toLocaleString()}{stat.suffix}
            </div>
            <div className="text-xl font-semibold mb-2">
              {stat.label}
            </div>
            {stat.description && (
              <p className="text-blue-100 text-sm">
                {stat.description}
              </p>
            )}
          </div>
        )}

        {variant === 'default' && (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(stat.color)}`}>
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stat.prefix}{displayValue.toLocaleString()}{stat.suffix}
            </div>
            <div className="text-lg font-semibold text-gray-800 mb-1">
              {stat.label}
            </div>
            {stat.description && (
              <p className="text-gray-600 text-sm">
                {stat.description}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div id="stats-container" className={`bg-blue-600 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatItem key={stat.id} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="stats-container" className={`${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <StatItem key={stat.id} stat={stat} index={index} />
        ))}
      </div>

      {variant === 'default' && (
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready to Add Your Project to Our Success Stories?
              </h3>
              <p className="text-gray-600 mb-6">
                Join our growing list of satisfied clients and let us help you achieve your engineering goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Start Your Project
                </button>
                <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}