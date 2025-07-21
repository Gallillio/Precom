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
        group relative overflow-hidden rounded-2xl cursor-pointer
        transition-all duration-500 ease-out hover:scale-[1.02]
        ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}
        bg-white border border-[var(--border)] hover:border-[var(--accent-teal)]/50
        hover:shadow-2xl hover:shadow-[var(--accent-teal)]/10
      `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div
          className="w-full bg-[var(--background-secondary)] transition-all duration-700 ease-out"
          style={{
            paddingBottom: featured ? '50%' : '60%',
            backgroundImage: imageLoaded ? `url(${image})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-0"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>

        {/* Overlay */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-60'}
        `} />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-teal)] text-white">
            {category}
          </span>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white text-xs font-medium">Featured</span>
            </div>
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent-teal)] transition-colors duration-300">
            {title}
          </h3>
          
          {description && (
            <p className={`text-sm text-white/80 mb-4 transition-all duration-300 ${
              isHovered ? 'opacity-100 max-h-32' : 'opacity-0 max-h-0 overflow-hidden'
            }`}>
              {description}
            </p>
          )}

          {/* Stats */}
          {stats && (
            <div className={`flex flex-wrap gap-4 mb-4 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold text-[var(--accent-teal)]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {tags && (
            <div className={`flex flex-wrap gap-2 transition-all duration-300 delay-100 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Hover Arrow */}
        <div className={`
          absolute top-4 right-4 w-10 h-10 bg-[var(--accent-teal)] rounded-full
          flex items-center justify-center text-white transition-all duration-300
          ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
        `}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
    </div>
  )
}