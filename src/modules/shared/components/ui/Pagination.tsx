import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  showPrevNext?: boolean
  maxVisiblePages?: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  className = '',
  size = 'md'
}) => {
  if (totalPages <= 1) return null

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  const getVisiblePages = () => {
    const delta = Math.floor(maxVisiblePages / 2)
    let start = Math.max(1, currentPage - delta)
    let end = Math.min(totalPages, start + maxVisiblePages - 1)
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }
    
    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  const visiblePages = getVisiblePages()

  const buttonClass = (isActive: boolean, isDisabled: boolean = false) => `
    ${sizeClasses[size]}
    border border-gray-300 
    ${isActive 
      ? 'bg-blue-600 text-white border-blue-600' 
      : isDisabled 
        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
        : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
    }
    transition-colors duration-200
    ${isDisabled ? '' : 'cursor-pointer'}
  `

  return (
    <nav className={`flex items-center justify-center space-x-1 ${className}`} aria-label="Pagination">
      {/* First Page */}
      {showFirstLast && currentPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`${buttonClass(false)} rounded-l-lg`}
            aria-label="Go to first page"
          >
            <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </>
      )}

      {/* Previous Page */}
      {showPrevNext && (
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`${buttonClass(false, currentPage === 1)} ${!showFirstLast && currentPage > 1 ? 'rounded-l-lg' : ''}`}
          aria-label="Go to previous page"
        >
          <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Page Numbers */}
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={buttonClass(false)}
          >
            1
          </button>
          {visiblePages[0] > 2 && (
            <span className={`${sizeClasses[size]} text-gray-500`}>...</span>
          )}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={buttonClass(page === currentPage)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className={`${sizeClasses[size]} text-gray-500`}>...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={buttonClass(false)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Page */}
      {showPrevNext && (
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`${buttonClass(false, currentPage === totalPages)} ${!showFirstLast && currentPage < totalPages ? 'rounded-r-lg' : ''}`}
          aria-label="Go to next page"
        >
          <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Last Page */}
      {showFirstLast && currentPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={`${buttonClass(false)} rounded-r-lg`}
          aria-label="Go to last page"
        >
          <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </nav>
  )
}

// Simple pagination info component
interface PaginationInfoProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  className?: string
}

export const PaginationInfo: React.FC<PaginationInfoProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  className = ''
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className={`text-sm text-gray-700 ${className}`}>
      Showing <span className="font-medium">{startItem}</span> to{' '}
      <span className="font-medium">{endItem}</span> of{' '}
      <span className="font-medium">{totalItems}</span> results
    </div>
  )
}