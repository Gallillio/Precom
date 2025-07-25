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
  loading?: boolean
  debounceMs?: number
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
  autoFocus = false,
  loading = false,
  debounceMs = 300
}) => {
  const [internalValue, setInternalValue] = useState(value)
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

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

    // Debounced search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    
    if (onSearch && debounceMs > 0) {
      setIsSearching(true)
      debounceRef.current = setTimeout(() => {
        onSearch(newValue)
        setIsSearching(false)
      }, debounceMs)
    }
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

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
      {/* Search Icon or Loading Spinner */}
      <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${disabled ? 'opacity-50' : ''}`}>
        {loading || isSearching ? (
          <svg 
            className={`${iconSizes[size]} text-gray-400 animate-spin`} 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
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
        )}
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
          border-2 border-[var(--border)] rounded-lg 
          focus:outline-none focus:border-[var(--accent-teal)] focus:ring-4 focus:ring-[var(--accent-teal)] focus:ring-opacity-20
          ${disabled ? 'bg-[var(--background-secondary)] cursor-not-allowed' : 'bg-white hover:border-[var(--border-secondary)]'}
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
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none focus:text-[var(--text-primary)] transition-colors duration-200"
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
              text-[var(--text-secondary)] hover:text-[var(--accent-teal)] focus:outline-none focus:text-[var(--accent-teal)] 
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
            className="px-3 py-2 border-2 border-[var(--border)] rounded-l-lg focus:outline-none focus:border-[var(--accent-teal)] focus:ring-4 focus:ring-[var(--accent-teal)] focus:ring-opacity-20 w-48"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-[var(--accent-teal)] text-white rounded-r-lg hover:bg-[var(--primary-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-teal)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none focus:text-[var(--text-primary)] transition-colors"
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