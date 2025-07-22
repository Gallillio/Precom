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
  const [scrollProgress, setScrollProgress] = useState(0)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sidebar = sidebarRef.current
      if (!sidebar) return

      const sidebarTop = sidebar.getBoundingClientRect().top
      const shouldStick = sidebarTop <= 100

      setIsSticky(shouldStick)

      // Calculate scroll progress for each section
      const sections = items.map(item => document.getElementById(item.id)).filter(Boolean)
      
      if (sections.length > 0) {
        const scrollPosition = window.scrollY + window.innerHeight / 3
        
        let currentSection = sections[0]?.id || items[0].id
        
        for (const section of sections) {
          if (section && section.offsetTop <= scrollPosition) {
            currentSection = section.id
          }
        }

        // Calculate overall scroll progress
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight
        const currentProgress = (window.scrollY / documentHeight) * 100
        setScrollProgress(Math.min(currentProgress, 100))

        // Update active section if different
        if (currentSection !== activeSection) {
          // Don't trigger callback during automatic scroll detection
          // onSectionClick(currentSection)
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
            ? 'fixed top-24 left-8 z-40 transform-gpu' 
            : 'relative'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-lg border border-[var(--border)] p-6 w-72">
          {/* Header */}
          <div className="mb-6">
            <h3 className="heading-3 text-lg mb-2">Our Services</h3>
            <p className="text-sm text-body-secondary">
              Navigate through our comprehensive service offerings
            </p>
            
            {/* Progress Indicator */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-body-secondary">Reading Progress</span>
                <span className="text-xs font-medium" style={{ color: 'var(--accent-teal)' }}>
                  {Math.round(scrollProgress)}%
                </span>
              </div>
              <div className="w-full bg-[var(--secondary-gray)] rounded-full h-1.5">
                <div 
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: 'var(--accent-teal)',
                    width: `${scrollProgress}%`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {items.map((item, index) => {
              const isActive = activeSection === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 text-left group ${
                    isActive 
                      ? 'bg-[var(--accent-teal)]/10 border-2 border-[var(--accent-teal)]/20' 
                      : 'hover:bg-[var(--secondary-gray)] border-2 border-transparent hover:border-[var(--border-secondary)]'
                  }`}
                >
                  {/* Icon */}
                  <div 
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 ${
                      isActive 
                        ? 'bg-[var(--accent-teal)] text-white scale-110' 
                        : 'bg-[var(--secondary-gray)] text-[var(--text-secondary)] group-hover:bg-[var(--accent-teal)]/20 group-hover:text-[var(--accent-teal)]'
                    }`}
                  >
                    {item.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div 
                      className={`font-medium transition-colors duration-300 ${
                        isActive 
                          ? 'text-[var(--accent-teal)]' 
                          : 'text-[var(--text-primary)] group-hover:text-[var(--accent-teal)]'
                      }`}
                    >
                      {item.title}
                    </div>
                    <div 
                      className={`text-xs mt-1 transition-colors duration-300 ${
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
                    className={`w-4 h-4 ml-2 transition-all duration-300 ${
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
          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <div className="bg-gradient-to-br from-[var(--primary-blue)]/5 to-[var(--accent-teal)]/5 rounded-xl p-4 text-center border border-[var(--accent-teal)]/20">
              <h4 className="font-semibold mb-2" style={{ color: 'var(--primary-blue)' }}>
                Need Help Choosing?
              </h4>
              <p className="text-sm text-body-secondary mb-3">
                Speak with our experts to find the perfect solution
              </p>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="btn-teal text-sm px-4 py-2 w-full transform hover:scale-105 transition-all duration-300"
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