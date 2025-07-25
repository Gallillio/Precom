'use client'
import React, { useState, useRef, useCallback } from 'react'
import { Card } from '@/modules/shared/components/ui'

interface BeforeAfterItem {
  id: string
  title: string
  category: string
  beforeImage: string
  afterImage: string
  beforeDescription: string
  afterDescription: string
  improvements: string[]
  projectDetails?: {
    location?: string
    timeline?: string
    budget?: string
  }
}

interface BeforeAfterSliderProps {
  items: BeforeAfterItem[]
  className?: string
}

const ComparisonSlider: React.FC<{
  beforeImage: string
  afterImage: string
  beforeDescription: string
  afterDescription: string
}> = ({ beforeImage, afterImage, beforeDescription, afterDescription }) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    updateSliderPosition(e)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e)
    }
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const updateSliderPosition = (e: React.MouseEvent | MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-lg overflow-hidden cursor-col-resize group select-none"
      onMouseDown={handleMouseDown}
      style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 select-none">
        <img 
          src={afterImage} 
          alt={afterDescription}
          className="w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
          style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
        />
        <div className="absolute bottom-4 right-4 bg-[var(--success)] text-white px-3 py-1 rounded-full text-sm font-medium select-none pointer-events-none">
          After
        </div>
      </div>

      {/* Before Image (Overlay) */}
      <div 
        className="absolute inset-0 overflow-hidden select-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt={beforeDescription}
          className="w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
          style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
        />
        <div className="absolute bottom-4 left-4 bg-[var(--warning)] text-white px-3 py-1 rounded-full text-sm font-medium select-none pointer-events-none">
          Before
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize group-hover:w-2 transition-all duration-200 select-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)', userSelect: 'none' }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-[var(--accent-teal)] select-none pointer-events-none">
          <svg className="w-4 h-4 text-[var(--accent-teal)] select-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none pointer-events-none">
        Drag to compare
      </div>
    </div>
  )
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  items,
  className = ''
}) => {
  const [activeItem, setActiveItem] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  if (!items.length) return null

  const currentItem = items[activeItem]

  const handleItemChange = (newIndex: number) => {
    if (isTransitioning) return // Prevent rapid clicking during transition
    
    setIsTransitioning(true)
    setActiveItem(newIndex)
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500) // Match the CSS transition duration
  }

  const handlePrevious = () => {
    const newIndex = activeItem > 0 ? activeItem - 1 : items.length - 1
    handleItemChange(newIndex)
  }

  const handleNext = () => {
    const newIndex = activeItem < items.length - 1 ? activeItem + 1 : 0
    handleItemChange(newIndex)
  }

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Comparison */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="p-6">
              <div className="mb-6">
                <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                  <h3 className="heading-3 text-xl mb-2">{currentItem.title}</h3>
                  <p className="text-sm text-body-secondary">
                    Category: <span className="font-medium">{currentItem.category}</span>
                  </p>
                </div>
              </div>

              <div className={`transition-all duration-500 transform ${isTransitioning ? 'opacity-0 scale-95 translate-x-4' : 'opacity-100 scale-100 translate-x-0'}`}>
                <ComparisonSlider 
                  beforeImage={currentItem.beforeImage}
                  afterImage={currentItem.afterImage}
                  beforeDescription={currentItem.beforeDescription}
                  afterDescription={currentItem.afterDescription}
                />
              </div>

              {/* Navigation */}
              {items.length > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={handlePrevious}
                    className={`btn-outline px-4 py-2 flex items-center gap-2 transition-all duration-300 ${
                      isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    }`}
                    disabled={isTransitioning}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>

                  <div className="flex gap-2">
                    {items.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleItemChange(index)}
                        disabled={isTransitioning}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === activeItem 
                            ? 'bg-[var(--accent-teal)] scale-125' 
                            : 'bg-[var(--border)] hover:bg-[var(--accent-teal)]/50'
                        } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-110'}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className={`btn-outline px-4 py-2 flex items-center gap-2 transition-all duration-300 ${
                      isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    }`}
                    disabled={isTransitioning}
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Improvements */}
            <Card className={`transition-all duration-500 transform ${isTransitioning ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>
              <div className="p-6">
                <h4 className="font-semibold mb-4" style={{ color: 'var(--success)' }}>
                  Key Improvements
                </h4>
                <div className="space-y-3">
                  {currentItem.improvements.map((improvement, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start gap-3 transition-all duration-500 ${
                        isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="w-5 h-5 rounded-full bg-[var(--success)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-[var(--success)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-[var(--text-primary)]">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Project Details */}
            {currentItem.projectDetails && (
              <Card className={`transition-all duration-500 transform ${isTransitioning ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`} style={{ transitionDelay: '200ms' }}>
                <div className="p-6">
                  <h4 className="font-semibold mb-4" style={{ color: 'var(--primary-blue)' }}>
                    Project Details
                  </h4>
                  <div className="space-y-4">
                    {currentItem.projectDetails.location && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-body-secondary">Location:</span>
                        <span className="text-sm font-medium">{currentItem.projectDetails.location}</span>
                      </div>
                    )}
                    {currentItem.projectDetails.timeline && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-body-secondary">Timeline:</span>
                        <span className="text-sm font-medium">{currentItem.projectDetails.timeline}</span>
                      </div>
                    )}
                    {currentItem.projectDetails.budget && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-body-secondary">Budget:</span>
                        <span className="text-sm font-medium">{currentItem.projectDetails.budget}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Action Button */}
            <div className={`bg-gradient-to-br from-[var(--primary-blue)]/5 to-[var(--accent-teal)]/5 rounded-xl p-6 border border-[var(--accent-teal)]/20 text-center transition-all duration-500 transform ${
              isTransitioning ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
            }`} style={{ transitionDelay: '300ms' }}>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--primary-blue)' }}>
                Similar Project?
              </h4>
              <p className="text-sm text-body-secondary mb-4">
                Let us help you achieve similar results
              </p>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="btn-teal w-full"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}