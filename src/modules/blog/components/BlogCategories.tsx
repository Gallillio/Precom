'use client'
import React from 'react'
import { BlogCategory } from '@/modules/shared/utils/types'
import { Card } from '@/modules/shared/components/ui'

interface BlogCategoriesProps {
  categories: BlogCategory[]
  selectedCategory?: string
  onCategorySelect?: (categorySlug: string) => void
  className?: string
  showPostCounts?: boolean
}

export const BlogCategories: React.FC<BlogCategoriesProps> = ({ 
  categories, 
  selectedCategory = 'all',
  onCategorySelect,
  className = '',
  showPostCounts = true
}) => {
  const handleCategoryClick = (categorySlug: string) => {
    if (onCategorySelect) {
      onCategorySelect(categorySlug)
    }
  }

  const totalPosts = categories.reduce((sum, category) => sum + category.postCount, 0)

  return (
    <div className={className}>
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
          
          <div className="space-y-2">
            {/* All Categories Option */}
            <button
              onClick={() => handleCategoryClick('all')}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 border border-transparent'
              }`}
            >
              <span className="font-medium">All Articles</span>
              {showPostCounts && (
                <span className={`text-sm px-2 py-1 rounded-full ${
                  selectedCategory === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {totalPosts}
                </span>
              )}
            </button>

            {/* Individual Categories */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex-1">
                  <div className="font-medium">{category.name}</div>
                  {category.description && (
                    <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {category.description}
                    </div>
                  )}
                </div>
                {showPostCounts && (
                  <span className={`ml-3 text-sm px-2 py-1 rounded-full flex-shrink-0 ${
                    selectedCategory === category.slug
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.postCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Category Tags (Alternative Layout) */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Filter</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryClick('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={`tag-${category.id}`}
              onClick={() => handleCategoryClick(category.slug)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.slug
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
              {showPostCounts && (
                <span className="ml-1 opacity-75">({category.postCount})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      {categories.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Topics</h4>
          <div className="space-y-2">
            {categories
              .sort((a, b) => b.postCount - a.postCount)
              .slice(0, 5)
              .map((category) => (
                <div key={`popular-${category.id}`} className="flex items-center justify-between">
                  <button
                    onClick={() => handleCategoryClick(category.slug)}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {category.name}
                  </button>
                  <span className="text-xs text-gray-400">
                    {category.postCount} article{category.postCount !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}