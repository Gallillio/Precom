'use client'
import React from 'react'
import { Project } from '@/modules/shared/utils/types'

interface ProjectListViewProps {
  projects: Project[]
  loading?: boolean
  onProjectClick: (project: Project) => void
  className?: string
}

export const ProjectListView: React.FC<ProjectListViewProps> = ({
  projects,
  loading = false,
  onProjectClick,
  className = '',
}) => {
  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-pulse"
          >
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="flex gap-2 mt-4">
                  <div className="h-6 bg-gray-200 rounded w-16" />
                  <div className="h-6 bg-gray-200 rounded w-20" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="text-gray-400 mb-6">
          <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          No Projects Found
        </h3>
        <p className="text-gray-600 text-lg max-w-md mx-auto">
          We couldn&apos;t find any projects matching your current filters. Try adjusting your search criteria or clearing all filters.
        </p>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {projects.map((project, index) => (
        <div
          key={project.id}
          onClick={() => onProjectClick(project)}
          className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 overflow-hidden cursor-pointer"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex flex-col md:flex-row">
            {/* Project Image */}
            <div className="md:w-1/3 relative">
              <div 
                className="h-48 md:h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-700 relative overflow-hidden"
                style={{
                  backgroundImage: project.images?.[0]?.url ? `url(${project.images[0].url})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/20 via-transparent to-transparent group-hover:from-[#003366]/30 transition-all duration-500" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${
                    project.status === 'completed' ? 'bg-green-100/90 text-green-800 border-green-200/50' :
                    project.status === 'in-progress' ? 'bg-blue-100/90 text-blue-800 border-blue-200/50' :
                    'bg-orange-100/90 text-orange-800 border-orange-200/50'
                  }`}>
                    {project.status === 'completed' ? 'Completed' : project.status === 'in-progress' ? 'In Progress' : 'Planned'}
                  </span>
                </div>

                {/* Category Tag */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-[#003366]/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-[#003366] mb-2 group-hover:text-[#00B4A6] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {project.shortDescription}
                  </p>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {project.duration}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {project.client}
                </div>
                {project.budget && (
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    {project.budget}
                  </div>
                )}
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#00B4A6]/10 text-[#00B4A6] text-xs font-medium rounded-full border border-[#00B4A6]/20"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      +{project.tags.length - 4} more
                    </span>
                  )}
                </div>
              )}

              {/* Click Indicator */}
              <div className="flex justify-end items-center text-sm text-gray-500 group-hover:text-[#00B4A6] transition-colors duration-300">
                <span className="mr-2">Click to view details</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectListView