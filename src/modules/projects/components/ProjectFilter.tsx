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
    <div className={`bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/50 relative overflow-hidden ${className}`}>
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#003366] to-[#00B4A6] rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-tr from-[#00B4A6] to-[#003366] rounded-full blur-xl" />
      </div>
      
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-[#003366] via-[#00456B] to-[#00B4A6] text-white p-8 rounded-t-3xl relative overflow-hidden">
        {/* Header Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 border border-white/20 rounded-full animate-pulse" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border border-white/15 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Advanced Project Filtering</h3>
              <p className="text-blue-100 text-base mt-2 flex items-center">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mr-3">
                  {filteredCount} of {totalCount}
                </span>
                {hasActiveFilters ? 'projects match your search criteria' : 'projects available to explore'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 relative z-10">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="group bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <svg className="w-5 h-5 mr-2 inline group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reset Filters
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden group bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <svg className={`w-5 h-5 mr-2 inline transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {isExpanded ? 'Hide' : 'Show'} Options
            </button>
          </div>
        </div>
      </div>

      {/* Premium Search Bar */}
      <div className="p-8 relative">
        <div className="relative mb-8">
          <div className="relative">
            <svg className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search projects by name, description, client, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-16 py-5 bg-gradient-to-r from-gray-50 to-blue-50/30 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#00B4A6]/20 focus:border-[#00B4A6] transition-all duration-300 text-[#003366] placeholder-gray-500 shadow-inner text-lg font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00B4A6] hover:scale-110 transition-all duration-200 bg-white rounded-full p-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
          {/* Premium Quick Filter Pills */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-[#003366] mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Filters
            </h4>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => updateFilters({ featured: filters.featured === true ? null : true })}
                className={`group px-6 py-3 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
                  filters.featured === true
                    ? 'bg-gradient-to-r from-[#003366] to-[#00B4A6] text-white transform scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-gradient-to-r hover:from-[#003366]/10 hover:to-[#00B4A6]/10 hover:text-[#003366] border border-gray-200'
                }`}
              >
                <svg className="w-5 h-5 mr-2 inline group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Featured Projects
              </button>
              <button
                onClick={() => updateFilters({ status: filters.status === 'completed' ? '' : 'completed' })}
                className={`group px-6 py-3 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
                  filters.status === 'completed'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white transform scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-700 border border-gray-200'
                }`}
              >
                <svg className="w-5 h-5 mr-2 inline group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Completed Projects
              </button>
              <button
                onClick={() => updateFilters({ status: filters.status === 'in-progress' ? '' : 'in-progress' })}
                className={`group px-6 py-3 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
                  filters.status === 'in-progress'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white transform scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:text-orange-700 border border-gray-200'
                }`}
              >
                <svg className="w-5 h-5 mr-2 inline group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Active Projects
              </button>
            </div>
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