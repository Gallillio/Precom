'use client'
import React, { useState, useEffect, useRef } from 'react'

export interface TimelineItem {
  id: string
  year: string
  title: string
  description: string
  image?: string
  icon?: React.ReactNode
  achievements?: string[]
  stats?: { label: string; value: string }[]
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
  variant?: 'vertical' | 'horizontal'
  animated?: boolean
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  className = '',
  variant = 'vertical',
  animated = true
}) => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    if (!animated) {
      setVisibleItems(new Set(items.map(item => item.id)))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const itemId = entry.target.getAttribute('data-timeline-id')
          if (itemId && entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, itemId]))
          }
        })
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    itemRefs.current.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items, animated])

  const setItemRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) {
      itemRefs.current.set(id, el)
    } else {
      itemRefs.current.delete(id)
    }
  }

  if (variant === 'horizontal') {
    return (
      <div className={`relative ${className}`}>
        {/* Horizontal Timeline */}
        <div className="flex overflow-x-auto pb-8 space-x-8">
          {items.map((item, index) => (
            <div
              key={item.id}
              ref={setItemRef(item.id)}
              data-timeline-id={item.id}
              className={`
                flex-shrink-0 relative transition-all duration-700 ease-out
                ${visibleItems.has(item.id) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
              `}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <TimelineCard 
                item={item} 
                isActive={activeItem === item.id}
                onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Vertical Timeline
  return (
    <div ref={timelineRef} className={`relative ${className}`}>
      {/* Timeline Line */}
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent-teal)] via-[var(--primary-blue)] to-[var(--accent-teal)]" />

      {/* Timeline Items */}
      <div className="space-y-12">
        {items.map((item, index) => {
          const isVisible = visibleItems.has(item.id)
          const isEven = index % 2 === 0
          
          return (
            <div
              key={item.id}
              ref={setItemRef(item.id)}
              data-timeline-id={item.id}
              className={`
                relative flex items-center
                ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}
              `}
            >
              {/* Timeline Node */}
              <div className={`
                absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10
                w-6 h-6 rounded-full border-4 border-white shadow-lg transition-all duration-500
                ${isVisible 
                  ? 'bg-[var(--accent-teal)] scale-100' 
                  : 'bg-[var(--border)] scale-75'
                }
              `}>
                <div className={`
                  absolute inset-0 rounded-full transition-all duration-500
                  ${isVisible ? 'animate-ping bg-[var(--accent-teal)] opacity-75' : ''}
                `} />
              </div>

              {/* Content Card */}
              <div className={`
                w-full md:w-5/12 ml-12 md:ml-0 transition-all duration-700 ease-out
                ${isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : `opacity-0 ${isEven ? '-translate-x-8' : 'translate-x-8'}`
                }
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
              >
                <TimelineCard 
                  item={item} 
                  isActive={activeItem === item.id}
                  onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                />
              </div>

              {/* Year Badge (for larger screens) */}
              <div className={`
                hidden md:block absolute left-1/2 transform -translate-x-1/2
                px-4 py-2 bg-white rounded-full shadow-lg border border-[var(--border)]
                transition-all duration-500 z-20
                ${isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-75'
                }
              `}
              style={{ 
                transitionDelay: `${index * 150 + 200}ms`,
                top: '-1rem'
              }}
              >
                <span className="text-sm font-bold text-[var(--primary-blue)]">
                  {item.year}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Timeline Card Component
interface TimelineCardProps {
  item: TimelineItem
  isActive: boolean
  onClick: () => void
}

const TimelineCard: React.FC<TimelineCardProps> = ({ item, isActive, onClick }) => {
  return (
    <div 
      className={`
        bg-white rounded-2xl p-6 shadow-lg border border-[var(--border)]
        cursor-pointer transition-all duration-300 hover:shadow-xl
        hover:border-[var(--accent-teal)] hover:border-opacity-50
        ${isActive ? 'ring-2 ring-[var(--accent-teal)] ring-opacity-50' : ''}
      `}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Icon/Image */}
        <div className="flex-shrink-0">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.title}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : item.icon ? (
            <div className="w-12 h-12 bg-[var(--accent-teal)]/10 rounded-full flex items-center justify-center text-[var(--accent-teal)]">
              {item.icon}
            </div>
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--accent-teal)] rounded-full flex items-center justify-center text-white font-bold">
              {item.year.slice(-2)}
            </div>
          )}
        </div>

        {/* Title and Year */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              {item.title}
            </h3>
            <span className="md:hidden text-sm font-semibold text-[var(--accent-teal)]">
              {item.year}
            </span>
          </div>
        </div>

        {/* Expand Icon */}
        <div className={`
          transform transition-transform duration-200
          ${isActive ? 'rotate-180' : ''}
        `}>
          <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Description */}
      <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
        {item.description}
      </p>

      {/* Expandable Content */}
      <div className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        {/* Achievements */}
        {item.achievements && item.achievements.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2 uppercase tracking-wider">
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {item.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-[var(--text-secondary)]">
                  <div className="w-1.5 h-1.5 bg-[var(--accent-teal)] rounded-full mt-2 flex-shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stats */}
        {item.stats && item.stats.length > 0 && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border)]">
            {item.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-bold text-[var(--primary-blue)]">
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}