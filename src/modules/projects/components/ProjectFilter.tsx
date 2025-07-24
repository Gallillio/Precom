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
  viewMode: 'grid' | 'list'
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
    viewMode: 'grid',
  })

  const [isExpanded, setIsExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Debounce search updates and maintain search when other filters change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const updatedFilters = { ...filters, search: searchTerm }
      setFilters(updatedFilters)
      onFilterChange(updatedFilters)
      onSearchChange(searchTerm)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  // Sync search term with filters when other filters change (to maintain search)
  useEffect(() => {
    if (filters.search !== searchTerm) {
      setSearchTerm(filters.search)
    }
  }, [filters.search])

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
      viewMode: filters.viewMode, // Preserve view mode
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
    <div className={`bg-white/95 backdrop-blur-sm shadow-lg rounded-2xl border border-gray-200/50 ${className}`}>
      {/* Compact Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 border-b border-gray-200/50">
        {/* Left: Search and Results */}
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B4A6]/30 focus:border-[#00B4A6] transition-all duration-200 text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Results Count */}
          <div className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
            <span className="font-medium text-[#003366]">{filteredCount}</span>
            <span>of {totalCount} projects</span>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Filter Pills */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => updateFilters({ featured: filters.featured === true ? null : true })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                filters.featured === true
                  ? 'bg-[#003366] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ⭐ Featured
            </button>
            <button
              onClick={() => updateFilters({ status: filters.status === 'completed' ? '' : 'completed' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                filters.status === 'completed'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ✓ Completed
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => updateFilters({ viewMode: 'grid' })}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                filters.viewMode === 'grid'
                  ? 'bg-white text-[#003366] shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button 
              onClick={() => updateFilters({ viewMode: 'list' })}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                filters.viewMode === 'list'
                  ? 'bg-white text-[#003366] shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isExpanded || hasActiveFilters
                ? 'bg-[#003366] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                {(filters.category ? 1 : 0) + filters.tags.length + (filters.status && filters.status !== '' ? 1 : 0) + (filters.featured !== null ? 1 : 0)}
              </span>
            )}
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-gray-400 hover:text-gray-600 p-2"
              title="Reset all filters"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters Expanded Content */}
      <div className={`transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
        <div className="p-6 space-y-6">

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
                <svg className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#00B4A6] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <svg className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#00B4A6] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <svg className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#00B4A6] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      ? 'bg-[#003366] text-white shadow-lg transform scale-105'
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

          {/* Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value as 'date' | 'title' | 'category' })}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B4A6]/30 focus:border-[#00B4A6]"
              >
                <option value="date">Date Created</option>
                <option value="title">Project Name</option>
                <option value="category">Category</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
              <select
                value={filters.sortOrder}
                onChange={(e) => updateFilters({ sortOrder: e.target.value as 'asc' | 'desc' })}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B4A6]/30 focus:border-[#00B4A6]"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
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
                  <span className="inline-flex items-center bg-[#003366] text-white px-3 py-1 rounded-full text-xs font-medium">
                    <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search: &ldquo;{filters.search}&rdquo;
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
                    <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {tag}
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