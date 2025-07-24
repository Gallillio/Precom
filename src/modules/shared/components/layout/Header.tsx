'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/modules/shared/components/ui'
import { CompactSearch } from '@/modules/shared/components/ui/SearchBar'
import { COMPANY_INFO, ROUTES, SERVICES } from '@/modules/shared/utils/constants'

interface HeaderProps {
  className?: string
  isHomePage?: boolean
}

export const Header: React.FC<HeaderProps> = ({ className = '', isHomePage = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const navigation = [
    { name: 'Home', href: ROUTES.home },
    { name: 'About', href: ROUTES.about },
    { name: 'Services', href: ROUTES.services, hasDropdown: true },
    { name: 'Projects', href: ROUTES.projects },
    { name: 'Contact', href: ROUTES.contact },
  ]

  const servicesData = Object.entries(SERVICES).map(([key, service]) => ({
    id: key,
    title: service.title,
    description: service.description,
    href: `/services/${key}`,
    icon: service.icon
  }))

  // Handle scroll effect for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle services dropdown hover
  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
    }
    setIsServicesOpen(true)
  }

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 150)
  }

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // TODO: Implement search functionality
    console.log('Searching for:', query)
  }

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
    setIsServicesOpen(false)
  }, [pathname])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current)
      }
    }
  }, [])

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
    ${
      isScrolled || !isHomePage
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[var(--border)]'
        : 'bg-transparent'
    }
  `.replace(/\s+/g, ' ').trim()

  const logoClasses = `
    text-2xl font-bold transition-colors duration-300
    text-[var(--primary-blue)]
  `.replace(/\s+/g, ' ').trim()

  const navLinkClasses = (isActive: boolean) => `
    relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out
    ${
      isActive
        ? 'text-[var(--primary-blue)] bg-[var(--primary-blue)]/10'
        : isScrolled || !isHomePage
        ? 'text-[var(--text-primary)] hover:text-[var(--primary-blue)] hover:bg-[var(--background-secondary)]'
        : 'text-[var(--text-primary)]/80 hover:text-[var(--primary-blue)] hover:bg-[var(--background-secondary)]/50'
    }
  `.replace(/\s+/g, ' ').trim()

  const mobileMenuClasses = `
    absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out
    bg-white/95 backdrop-blur-md border-b border-[var(--border)] shadow-lg
    ${
      isMenuOpen
        ? 'max-h-96 opacity-100'
        : 'max-h-0 opacity-0'
    }
  `.replace(/\s+/g, ' ').trim()

  const getServiceIcon = (iconName: string) => {
    const icons = {
      building: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      clipboard: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      lightbulb: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      search: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    }
    return icons[iconName as keyof typeof icons] || icons.building
  }

  return (
    <>
      {/* Spacer for fixed header */}
      <div className={isHomePage ? '' : 'h-20'} />
      
      <header className={`${headerClasses} ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href={ROUTES.home} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img 
                    src="/images/logo.png" 
                    alt={`${COMPANY_INFO.name} Logo`}
                    className="h-10 w-auto transition-opacity duration-300"
                  />
                </div>
                <div className="flex-shrink-0">
                  <h1 className={logoClasses}>
                    {COMPANY_INFO.name}
                  </h1>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                
                if (item.hasDropdown && item.name === 'Services') {
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={handleServicesEnter}
                      onMouseLeave={handleServicesLeave}
                    >
                      <Link
                        href={item.href}
                        className={`${navLinkClasses(isActive)} flex items-center space-x-1`}
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isServicesOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                      
                      {/* Mega Menu */}
                      <div className={`
                        absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                        w-96 bg-white rounded-xl shadow-xl border border-[var(--border)]
                        transition-all duration-300 ease-out
                        ${
                          isServicesOpen
                            ? 'opacity-100 translate-y-0 visible'
                            : 'opacity-0 -translate-y-2 invisible'
                        }
                      `}>
                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                              Our Services
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)]">
                              Professional engineering solutions for your projects
                            </p>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            {servicesData.map((service) => (
                              <Link
                                key={service.id}
                                href={service.href}
                                className="group p-4 rounded-lg hover:bg-[var(--background-secondary)] transition-colors duration-200"
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="text-[var(--accent-teal)] group-hover:scale-110 transition-transform duration-200">
                                    {getServiceIcon(service.icon)}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--primary-blue)] transition-colors duration-200">
                                      {service.title}
                                    </h4>
                                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                                      {service.description}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-[var(--border)]">
                            <Link
                              href={ROUTES.services}
                              className="inline-flex items-center text-sm font-medium text-[var(--accent-teal)] hover:text-[var(--primary-blue)] transition-colors duration-200"
                            >
                              View All Services
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={navLinkClasses(isActive)}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <CompactSearch
                onSearch={handleSearch}
                placeholder="Search..."
                className="transition-colors duration-300 text-[var(--text-secondary)]"
              />
              <Button
                variant={isScrolled || !isHomePage ? 'primary' : 'outline'}
                size="sm"
                className={`transition-all duration-300 ${
                  !isScrolled && isHomePage
                    ? 'border-[var(--primary-blue)] text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white'
                    : ''
                }`}
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                type="button"
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled || !isHomePage
                    ? 'text-[var(--text-primary)] hover:bg-[var(--background-secondary)]'
                    : 'text-[var(--text-primary)] hover:bg-[var(--background-secondary)]/50'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                      isMenuOpen ? 'top-3 rotate-45' : 'top-1'
                    }`}
                  />
                  <span
                    className={`absolute block w-6 h-0.5 bg-current transition-opacity duration-300 top-3 ${
                      isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                      isMenuOpen ? 'top-3 -rotate-45' : 'top-5'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={mobileMenuClasses}>
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[var(--primary-blue)] bg-[var(--primary-blue)]/10'
                      : 'text-[var(--text-primary)] hover:text-[var(--primary-blue)] hover:bg-[var(--background-secondary)]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
            
            {/* Mobile Services Dropdown */}
            <div className="pt-2">
              <div className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                Services
              </div>
              {servicesData.map((service) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="block px-4 py-2 ml-4 text-sm text-[var(--text-secondary)] hover:text-[var(--primary-blue)] transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {service.title}
                </Link>
              ))}
            </div>
            
            <div className="pt-4 border-t border-[var(--border)]">
              <Button variant="primary" size="sm" className="w-full">
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}