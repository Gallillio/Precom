'use client'
import React, { useState } from 'react'
import { Button } from '@/modules/shared/components/ui'

interface ProjectFilterProps {
  categories: string[]
  tags: string[]
  statuses: Array<'completed' | 'in-progress' | 'planned'>
  onFilterChange: (filters: FilterState) => void
  className?: string
}

export interface FilterState {
  category: string
  tags: string[]
  status: string
  featured: boolean | null
  sortBy: 'date' | 'title' | 'category'
  sortOrder: 'asc' | 'desc'
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  categories,
  tags,
  statuses,
  onFilterChange,
  className = '',
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    tags: [],
    status: '',
    featured: null,
    sortBy: 'date',
    sortOrder: 'desc',
  })

  const [isExpanded, setIsExpanded] = useState(false)

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
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag]
    updateFilters({ tags: newTags })
  }

  const hasActiveFilters = filters.category || filters.tags.length > 0 || filters.status || filters.featured !== null

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Projects</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
            >
              Clear All
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden"
          >
            {isExpanded ? 'Hide' : 'Show'} Filters
          </Button>
        </div>
      </div>

      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => updateFilters({ category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => updateFilters({ status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured
            </label>
            <select
              value={filters.featured === null ? '' : filters.featured.toString()}
              onChange={(e) => updateFilters({ 
                featured: e.target.value === '' ? null : e.target.value === 'true' 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Projects</option>
              <option value="true">Featured Only</option>
              <option value="false">Non-Featured</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filters.tags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilters({ sortBy: e.target.value as 'date' | 'title' | 'category' })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Date</option>
              <option value="title">Title</option>
              <option value="category">Category</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order
            </label>
            <select
              value={filters.sortOrder}
              onChange={(e) => updateFilters({ sortOrder: e.target.value as 'asc' | 'desc' })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Active Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  Category: {filters.category}
                </span>
              )}
              {filters.status && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  Status: {filters.status.charAt(0).toUpperCase() + filters.status.slice(1).replace('-', ' ')}
                </span>
              )}
              {filters.featured !== null && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {filters.featured ? 'Featured' : 'Non-Featured'}
                </span>
              )}
              {filters.tags.map((tag) => (
                <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  Tag: {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectFilter