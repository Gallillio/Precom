'use client'
import React, { useEffect, useState, useRef } from 'react'

interface SidebarItem {
  id: string
  title: string
  icon: React.ReactNode
}

interface ServicesSidebarProps {
  items: SidebarItem[]
  activeSection: string
  onSectionClick: (sectionId: string) => void
  className?: string
}

export const ServicesSidebar: React.FC<ServicesSidebarProps> = ({
  items,
  activeSection,
  onSectionClick,
  className = ''
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    top: '96px',
    transition: 'top 0.3s ease-out'
  })

  useEffect(() => {
    const handleScroll = () => {
      // Simple and accurate section detection
      const sections = items.map(item => document.getElementById(item.id)).filter(Boolean)
      
      if (sections.length > 0) {
        const scrollTop = window.scrollY
        const offset = 200 // Distance from top of viewport to trigger section change
        
        let currentSection = sections[0]?.id || items[0].id
        
        // Find the section that should be active based on scroll position
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i]
          if (section) {
            const sectionTop = section.offsetTop - offset
            
            if (scrollTop >= sectionTop) {
              currentSection = section.id
              break
            }
          }
        }

        // Update active section immediately without debouncing
        if (currentSection !== activeSection) {
          onSectionClick(currentSection)
        }
      }

      // Handle sidebar positioning relative to footer
      const footer = document.querySelector('footer')
      const sidebar = sidebarRef.current
      
      if (footer && sidebar) {
        const footerRect = footer.getBoundingClientRect()
        const sidebarHeight = sidebar.offsetHeight
        const windowHeight = window.innerHeight
        const viewportScrollTop = window.pageYOffset
        const documentHeight = document.documentElement.scrollHeight
        
        // Get footer's absolute position in document
        const footerAbsoluteTop = viewportScrollTop + footerRect.top
        const footerAbsoluteBottom = footerAbsoluteTop + footerRect.height
        
        // Calculate default sidebar position (top-24 = 96px from top of viewport)
        const defaultSidebarTop = 96
        const defaultSidebarAbsoluteTop = viewportScrollTop + defaultSidebarTop
        const defaultSidebarAbsoluteBottom = defaultSidebarAbsoluteTop + sidebarHeight
        
        // Check if sidebar would overlap with footer (more sensitive detection)
        const footerBuffer = 200 // Start moving sidebar when footer is this far from bottom of viewport
        const wouldOverlap = (
          footerRect.top < (windowHeight + footerBuffer) && // Footer is approaching viewport
          footerRect.top > -100 && // Footer hasn't completely passed the top
          defaultSidebarAbsoluteBottom > (footerAbsoluteTop - 50) // Add buffer to sidebar collision
        )
        
        if (wouldOverlap) {
          // Calculate the maximum safe position with very generous gap
          const safeGap = 150 // Much larger gap between sidebar and footer
          const maxSafeAbsoluteTop = footerAbsoluteTop - sidebarHeight - safeGap
          const maxSafeViewportTop = maxSafeAbsoluteTop - viewportScrollTop
          
          // Ensure sidebar doesn't go above the viewport or below its natural position
          const minViewportTop = 8 // Allow very high positioning
          const maxViewportTop = defaultSidebarTop // Don't go lower than default position
          
          const finalTop = Math.max(
            minViewportTop,
            Math.min(maxSafeViewportTop, maxViewportTop)
          )
          
          setSidebarStyle({
            position: 'fixed',
            top: `${finalTop}px`,
            transition: 'top 0.3s ease-out'
          })
        } else {
          // Normal fixed positioning
          setSidebarStyle({
            position: 'fixed',
            top: `${defaultSidebarTop}px`,
            transition: 'top 0.3s ease-out'
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [items, activeSection])

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 120 // Account for sticky header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
    onSectionClick(sectionId)
  }

  return (
    <div className={`${className}`}>
      <div 
        ref={sidebarRef}
        className="left-2 lg:left-4 z-40"
        style={sidebarStyle}
      >
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-[var(--border)] p-1.5 sm:p-2 md:p-3 lg:p-4 w-48 sm:w-52 md:w-56 lg:w-60 xl:w-64 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="mb-2 lg:mb-3">
            <h3 className="heading-3 text-xs sm:text-sm lg:text-base mb-1">Our Services</h3>
            <p className="text-[10px] sm:text-xs text-body-secondary hidden sm:block">
              Navigate through our service offerings
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-0.5 sm:space-y-1 lg:space-y-2">
            {items.map((item, index) => {
              const isActive = activeSection === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className={`w-full flex items-center p-1 sm:p-1.5 lg:p-2 rounded-md lg:rounded-lg transition-all duration-300 text-left group ${
                    isActive 
                      ? 'bg-[var(--accent-teal)]/10 border border-[var(--accent-teal)]/20' 
                      : 'hover:bg-[var(--secondary-gray)] border border-transparent hover:border-[var(--border-secondary)]'
                  }`}
                >
                  {/* Icon */}
                  <div 
                    className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-sm sm:rounded-md flex items-center justify-center mr-1.5 sm:mr-2 transition-all duration-300 ${
                      isActive 
                        ? 'bg-[var(--accent-teal)] text-white scale-105' 
                        : 'bg-[var(--secondary-gray)] text-[var(--text-secondary)] group-hover:bg-[var(--accent-teal)]/20 group-hover:text-[var(--accent-teal)]'
                    }`}
                  >
                    <div className="scale-75 sm:scale-90 lg:scale-100">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div 
                      className={`text-[10px] sm:text-xs lg:text-sm font-medium transition-colors duration-300 leading-tight ${
                        isActive 
                          ? 'text-[var(--accent-teal)]' 
                          : 'text-[var(--text-primary)] group-hover:text-[var(--accent-teal)]'
                      }`}
                    >
                      {item.title}
                    </div>
                    <div 
                      className={`text-[9px] sm:text-[10px] lg:text-xs transition-colors duration-300 hidden sm:block ${
                        isActive 
                          ? 'text-[var(--accent-teal)]/70' 
                          : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      Section {index + 1}
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg 
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 ml-0.5 sm:ml-1 transition-all duration-300 ${
                      isActive 
                        ? 'text-[var(--accent-teal)] translate-x-1' 
                        : 'text-[var(--text-secondary)] group-hover:text-[var(--accent-teal)] group-hover:translate-x-1'
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )
            })}
          </nav>

          {/* Contact CTA */}
          <div className="mt-2 sm:mt-3 lg:mt-4 pt-2 sm:pt-3 lg:pt-4 border-t border-[var(--border)]">
            <div className="bg-gradient-to-br from-[var(--primary-blue)]/5 to-[var(--accent-teal)]/5 rounded-md lg:rounded-lg p-1.5 sm:p-2 lg:p-3 text-center border border-[var(--accent-teal)]/20">
              <h4 className="text-[10px] sm:text-xs lg:text-sm font-semibold mb-1 sm:mb-1.5" style={{ color: 'var(--primary-blue)' }}>
                Need Help Choosing?
              </h4>
              <p className="text-[9px] sm:text-xs text-body-secondary mb-1.5 sm:mb-2 leading-tight hidden sm:block">
                Speak with our experts
              </p>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="btn-teal text-[9px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 w-full transform hover:scale-105 transition-all duration-300"
              >
                Get Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}