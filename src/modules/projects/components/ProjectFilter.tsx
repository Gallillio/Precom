'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/modules/shared/components/ui'

interface ProjectFilterProps {
  categories: string[]
  tags: string[]
  statuses: Array<'completed' | 'in-progress' | 'planned'>
  onFilterChange: (filters: FilterState) => void
  onSearchChange: (search: string) => void
  totalCount: number
  filteredCount: number
  className?: string
}

export interface FilterState {
  category: string
  tags: string[]
  status: string
  featured: boolean | null
  sortBy: 'date' | 'title' | 'category'
  sortOrder: 'asc' | 'desc'
  search: string
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  categories,
  tags,
  statuses,
  onFilterChange,
  onSearchChange,
  totalCount,
  filteredCount,
  className = '',
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    tags: [],
    status: '',
    featured: null,
    sortBy: 'date',
    sortOrder: 'desc',
    search: '',
  })

  const [isExpanded, setIsExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Debounce search updates
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onFilterChange({ ...filters, search: searchTerm })
      onSearchChange(searchTerm)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      category: '',
      tags: [],
      status: '',
      featured: null,
      sortBy: 'date',
      sortOrder: 'desc',
      search: '',
    }
    setFilters(clearedFilters)
    setSearchTerm('')
    onFilterChange(clearedFilters)
    onSearchChange('')
  }

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag]
    updateFilters({ tags: newTags })
  }

  const hasActiveFilters = filters.category || filters.tags.length > 0 || filters.status || filters.featured !== null || filters.search

  return (
    <div className={`bg-white shadow-lg rounded-xl border border-gray-100 ${className}`}>
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-var(--color-primary) to-var(--color-primary-dark) text-white p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Filter & Search Projects</h3>
            <p className="text-blue-100 text-sm mt-1">
              {filteredCount} of {totalCount} projects {hasActiveFilters ? 'match your criteria' : 'available'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear All
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden border-white/30 text-white hover:bg-white/10"
            >
              <svg className={`w-4 h-4 mr-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {isExpanded ? 'Hide' : 'Show'} Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Search Bar */}
      <div className="p-6">
        <div className="relative mb-6">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search projects by name, description, or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-var(--color-primary) focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
          {/* Quick Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => updateFilters({ featured: filters.featured === true ? null : true })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filters.featured === true
                  ? 'bg-var(--color-primary) text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⭐ Featured Only
            </button>
            <button
              onClick={() => updateFilters({ status: filters.status === 'completed' ? '' : 'completed' })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filters.status === 'completed'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ✓ Completed
            </button>
            <button
              onClick={() => updateFilters({ status: filters.status === 'in-progress' ? '' : 'in-progress' })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filters.status === 'in-progress'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔄 In Progress
            </button>
          </div>

          {/* Enhanced Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Category
              </label>
              <div className="relative">
                <select
                  value={filters.category}
                  onChange={(e) => updateFilters({ category: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-var(--color-primary) focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Status
              </label>
              <div className="relative">
                <select
                  value={filters.status}
                  onChange={(e) => updateFilters({ status: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-var(--color-primary) focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Featured
              </label>
              <div className="relative">
                <select
                  value={filters.featured === null ? '' : filters.featured.toString()}
                  onChange={(e) => updateFilters({ 
                    featured: e.target.value === '' ? null : e.target.value === 'true' 
                  })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-var(--color-primary) focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="">All Projects</option>
                  <option value="true">Featured Only</option>
                  <option value="false">Non-Featured</option>
                </select>
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Enhanced Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Project Tags
            </label>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md ${
                    filters.tags.includes(tag)
                      ? 'bg-var(--color-primary) text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-var(--color-primary) hover:text-var(--color-primary)'
                  }`}
                >
                  {filters.tags.includes(tag) && (
                    <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Sort Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilters({ sortBy: e.target.value as 'date' | 'title' | 'category' })}
                    className="px-4 py-2 pr-8 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-var(--color-primary) focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="date">Date Created</option>
                    <option value="title">Project Name</option>
                    <option value="category">Category</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Order
                </label>
                <div className="relative">
                  <select
                    value={filters.sortOrder}
                    onChange={(e) => updateFilters({ sortOrder: e.target.value as 'asc' | 'desc' })}
                    className="px-4 py-2 pr-8 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-var(--color-primary) focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* View Options */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                View
              </label>
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button className="px-3 py-1 rounded-lg bg-var(--color-primary) text-white text-sm font-medium">
                  Grid
                </button>
                <button className="px-3 py-1 text-gray-600 text-sm font-medium hover:text-gray-800">
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Active Filters Display */}
          {hasActiveFilters && (
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-800 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-var(--color-primary)" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                  Active Filters
                </h4>
                <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full">
                  {filteredCount} results
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.search && (
                  <span className="inline-flex items-center bg-var(--color-primary) text-white px-3 py-1 rounded-full text-xs font-medium">
                    🔍 Search: &ldquo;{filters.search}&rdquo;
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                )}
                {filters.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    🏷️ {tag}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectFilter