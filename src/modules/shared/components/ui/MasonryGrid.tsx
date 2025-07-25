'use client'
import React, { useState, useEffect, useRef } from 'react'

interface MasonryItem {
  id: string
  content: React.ReactNode
  height?: number
  className?: string
}

interface MasonryGridProps {
  items: MasonryItem[]
  columns?: { sm: number; md: number; lg: number; xl: number }
  gap?: number
  className?: string
  itemClassName?: string
  animationDelay?: number
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  items,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 24,
  className = '',
  itemClassName = '',
  animationDelay = 100
}) => {
  const [columnCount, setColumnCount] = useState(columns.lg)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle responsive column count
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width < 640) setColumnCount(columns.sm)
      else if (width < 768) setColumnCount(columns.md)
      else if (width < 1024) setColumnCount(columns.lg)
      else setColumnCount(columns.xl)
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    
    // Trigger animation after mount
    const timer = setTimeout(() => setIsLoaded(true), 100)

    return () => {
      window.removeEventListener('resize', updateColumns)
      clearTimeout(timer)
    }
  }, [columns])

  // Distribute items across columns
  const distributeItems = () => {
    const columnArrays: MasonryItem[][] = Array(columnCount).fill(null).map(() => [])
    
    items.forEach((item, index) => {
      const columnIndex = index % columnCount
      columnArrays[columnIndex].push(item)
    })

    return columnArrays
  }

  const columnArrays = distributeItems()

  return (
    <div
      ref={containerRef}
      className={`${className}`}
      style={{
        columnCount,
        columnGap: `${gap}px`,
        columnFill: 'balance'
      }}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`
            inline-block w-full transition-all duration-700 ease-out
            ${isLoaded 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
            }
            ${itemClassName}
            ${item.className || ''}
          `}
          style={{
            marginBottom: `${gap}px`,
            breakInside: 'avoid',
            animationDelay: `${index * animationDelay}ms`
          }}
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}

// Project showcase card for masonry grid
interface ProjectCardProps {
  id: string
  title: string
  category: string
  image: string
  description?: string
  stats?: { label: string; value: string }[]
  link?: string
  tags?: string[]
  featured?: boolean
  onClick?: () => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  category,
  image,
  description,
  stats,
  link,
  tags,
  featured = false,
  onClick
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (link) {
      window.open(link, '_blank')
    }
  }

  return (
    <div 
      className={`
        group relative overflow-hidden rounded-3xl cursor-pointer
        transition-all duration-500 ease-out hover:scale-[1.02]
        ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}
        bg-white shadow-lg hover:shadow-2xl border border-gray-100
      `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[var(--primary-blue)] text-white text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>
        
        {/* View project button */}
        <div className={`absolute top-4 right-4 transition-all duration-300 ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-[var(--primary-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 line-clamp-2 group-hover:text-[var(--accent-teal)] transition-colors duration-300">
          {title}
        </h3>
        
        {description && (
          <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}

        {/* Stats Row */}
        {stats && stats.length > 0 && (
          <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl">
            {stats.slice(0, 3).map((stat, index) => (
              <div key={index} className="text-center flex-1">
                <div className="text-lg font-bold text-[var(--primary-blue)]">
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--text-secondary)] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] text-xs font-medium rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            View Details
          </span>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered 
              ? 'bg-[var(--accent-teal)] text-white transform translate-x-1' 
              : 'bg-gray-100 text-[var(--text-secondary)]'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}