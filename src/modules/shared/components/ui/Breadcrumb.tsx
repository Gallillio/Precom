import React from 'react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  className?: string
  showHome?: boolean
  homeLabel?: string
  homeHref?: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  className = '',
  showHome = true,
  homeLabel = 'Home',
  homeHref = '/'
}) => {
  const defaultSeparator = (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )

  const allItems = showHome 
    ? [{ label: homeLabel, href: homeHref }, ...items]
    : items

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          const isActive = item.isActive || isLast

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 flex-shrink-0">
                  {separator || defaultSeparator}
                </span>
              )}
              
              {item.href && !isActive ? (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-200 truncate"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`truncate ${
                    isActive 
                      ? 'text-gray-900 font-medium' 
                      : 'text-gray-500'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Simplified breadcrumb for common use cases
interface SimpleBreadcrumbProps {
  currentPage: string
  parentPage?: {
    label: string
    href: string
  }
  className?: string
}

export const SimpleBreadcrumb: React.FC<SimpleBreadcrumbProps> = ({
  currentPage,
  parentPage,
  className = ''
}) => {
  const items: BreadcrumbItem[] = []
  
  if (parentPage) {
    items.push({
      label: parentPage.label,
      href: parentPage.href
    })
  }
  
  items.push({
    label: currentPage,
    isActive: true
  })

  return <Breadcrumb items={items} className={className} />
}

// Breadcrumb with structured data for SEO
interface StructuredBreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export const StructuredBreadcrumb: React.FC<StructuredBreadcrumbProps> = ({
  items,
  className = ''
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: window.location.origin + item.href })
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Breadcrumb items={items} className={className} />
    </>
  )
}

// Mobile-friendly breadcrumb that collapses on small screens
interface MobileBreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  maxMobileItems?: number
}

export const MobileBreadcrumb: React.FC<MobileBreadcrumbProps> = ({
  items,
  className = '',
  maxMobileItems = 2
}) => {
  const allItems = [{ label: 'Home', href: '/' }, ...items]
  
  return (
    <div className={className}>
      {/* Desktop breadcrumb */}
      <div className="hidden md:block">
        <Breadcrumb items={items} showHome={true} />
      </div>
      
      {/* Mobile breadcrumb */}
      <div className="md:hidden">
        {allItems.length <= maxMobileItems ? (
          <Breadcrumb items={items} showHome={true} />
        ) : (
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-400">...</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium truncate">
              {allItems[allItems.length - 1].label}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}