'use client'
import React, { useState, useRef, useEffect } from 'react'

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  onClear?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showSearchButton?: boolean
  showClearButton?: boolean
  disabled?: boolean
  autoFocus?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value = '',
  onChange,
  onSearch,
  onClear,
  className = '',
  size = 'md',
  showSearchButton = false,
  showClearButton = true,
  disabled = false,
  autoFocus = false
}) => {
  const [internalValue, setInternalValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInternalValue(newValue)
    onChange?.(newValue)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      e.preventDefault()
      onSearch?.(internalValue)
    }
  }

  const handleSearchClick = () => {
    if (!disabled) {
      onSearch?.(internalValue)
    }
  }

  const handleClear = () => {
    if (!disabled) {
      setInternalValue('')
      onChange?.('')
      onClear?.()
      inputRef.current?.focus()
    }
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <div className={`relative ${className}`}>
      {/* Search Icon */}
      <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${disabled ? 'opacity-50' : ''}`}>
        <svg 
          className={`${iconSizes[size]} text-gray-400`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={internalValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          block w-full pl-10 
          ${showSearchButton || (showClearButton && internalValue) ? 'pr-20' : 'pr-4'}
          ${sizeClasses[size]}
          border border-gray-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-400'}
          transition-colors duration-200
        `}
      />

      {/* Action Buttons */}
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-1">
        {/* Clear Button */}
        {showClearButton && internalValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
            aria-label="Clear search"
          >
            <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Search Button */}
        {showSearchButton && (
          <button
            type="button"
            onClick={handleSearchClick}
            disabled={disabled}
            className={`
              text-gray-400 hover:text-blue-600 focus:outline-none focus:text-blue-600 
              transition-colors duration-200
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            `}
            aria-label="Search"
          >
            <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

// Alternative compact version for smaller spaces
interface CompactSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export const CompactSearch: React.FC<CompactSearchProps> = ({
  onSearch,
  placeholder = 'Search...',
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
      setQuery('')
      setIsExpanded(false)
    }
  }

  const handleBlur = () => {
    if (!query.trim()) {
      setIsExpanded(false)
    }
  }

  return (
    <div className={`relative ${className}`}>
      {isExpanded ? (
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
          aria-label="Open search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      )}
    </div>
  )
}