'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationItem {
  name: string
  href: string
  description?: string
}

interface NavigationProps {
  items: NavigationItem[]
  className?: string
  orientation?: 'horizontal' | 'vertical'
  showActiveState?: boolean
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  className = '',
  orientation = 'horizontal',
  showActiveState = true,
}) => {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const baseClasses = orientation === 'horizontal' 
    ? 'flex space-x-8' 
    : 'flex flex-col space-y-2'

  return (
    <nav className={`${baseClasses} ${className}`}>
      {items.map((item) => {
        const active = showActiveState && isActive(item.href)
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
              ${active 
                ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }
            `}
            title={item.description}
          >
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}

export const MainNavigation: React.FC<{ className?: string }> = ({ className }) => {
  const navigationItems: NavigationItem[] = [
    { name: 'Home', href: '/', description: 'Return to homepage' },
    { name: 'About', href: '/about', description: 'Learn about our company' },
    { name: 'Services', href: '/services', description: 'View our engineering services' },
    { name: 'Projects', href: '/projects', description: 'See our completed projects' },
    { name: 'Contact', href: '/contact', description: 'Get in touch with us' },
  ]

  return (
    <Navigation 
      items={navigationItems} 
      className={className}
      orientation="horizontal"
      showActiveState={true}
    />
  )
}

export const MobileNavigation: React.FC<{ className?: string }> = ({ className }) => {
  const navigationItems: NavigationItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <Navigation 
      items={navigationItems} 
      className={className}
      orientation="vertical"
      showActiveState={true}
    />
  )
}