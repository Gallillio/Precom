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
  const [isSticky, setIsSticky] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sidebar = sidebarRef.current
      if (!sidebar) return

      const sidebarTop = sidebar.getBoundingClientRect().top
      const shouldStick = sidebarTop <= 100

      setIsSticky(shouldStick)

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
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
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
        className={`transition-all duration-300 ${
          isSticky 
            ? 'fixed top-24 left-2 lg:left-4 z-40 transform-gpu' 
            : 'relative'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-lg border border-[var(--border)] p-2 sm:p-3 lg:p-4 w-56 sm:w-60 lg:w-64 xl:w-72">
          {/* Header */}
          <div className="mb-3 lg:mb-4">
            <h3 className="heading-3 text-sm lg:text-base mb-1">Our Services</h3>
            <p className="text-xs text-body-secondary">
              Navigate through our service offerings
            </p>
            
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 lg:space-y-2">
            {items.map((item, index) => {
              const isActive = activeSection === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className={`w-full flex items-center p-1.5 lg:p-2 rounded-lg transition-all duration-300 text-left group ${
                    isActive 
                      ? 'bg-[var(--accent-teal)]/10 border border-[var(--accent-teal)]/20' 
                      : 'hover:bg-[var(--secondary-gray)] border border-transparent hover:border-[var(--border-secondary)]'
                  }`}
                >
                  {/* Icon */}
                  <div 
                    className={`w-7 h-7 lg:w-8 lg:h-8 rounded-md flex items-center justify-center mr-2 transition-all duration-300 ${
                      isActive 
                        ? 'bg-[var(--accent-teal)] text-white scale-105' 
                        : 'bg-[var(--secondary-gray)] text-[var(--text-secondary)] group-hover:bg-[var(--accent-teal)]/20 group-hover:text-[var(--accent-teal)]'
                    }`}
                  >
                    {item.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div 
                      className={`text-xs lg:text-sm font-medium transition-colors duration-300 ${
                        isActive 
                          ? 'text-[var(--accent-teal)]' 
                          : 'text-[var(--text-primary)] group-hover:text-[var(--accent-teal)]'
                      }`}
                    >
                      {item.title}
                    </div>
                    <div 
                      className={`text-xs transition-colors duration-300 ${
                        isActive 
                          ? 'text-[var(--accent-teal)]/70' 
                          : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      Section {index + 1}
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-[var(--accent-teal)] animate-pulse" />
                  )}
                  
                  {/* Arrow */}
                  <svg 
                    className={`w-3 h-3 lg:w-4 lg:h-4 ml-1 transition-all duration-300 ${
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
          <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-[var(--border)]">
            <div className="bg-gradient-to-br from-[var(--primary-blue)]/5 to-[var(--accent-teal)]/5 rounded-lg p-2 lg:p-3 text-center border border-[var(--accent-teal)]/20">
              <h4 className="text-xs lg:text-sm font-semibold mb-1.5" style={{ color: 'var(--primary-blue)' }}>
                Need Help Choosing?
              </h4>
              <p className="text-xs text-body-secondary mb-2 leading-tight">
                Speak with our experts
              </p>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="btn-teal text-xs px-3 py-1.5 w-full transform hover:scale-105 transition-all duration-300"
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