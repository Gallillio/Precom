import React from 'react'
import Image from 'next/image'
import { Project } from '@/modules/shared/utils/types'
import { Card } from '@/modules/shared/components/ui'

interface ProjectCardProps {
  project: Project
  className?: string
  onClick?: () => void
  variant?: 'default' | 'masonry' | 'featured'
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className = '',
  onClick,
  variant = 'default',
}) => {
  const primaryImage = project.images.find(img => img.isPrimary) || project.images[0]

  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    planned: 'bg-blue-100 text-blue-800',
  }

  const getImageHeight = () => {
    if (variant === 'masonry') {
      // Variable heights for masonry layout
      const heights = ['h-48', 'h-56', 'h-64', 'h-72']
      return heights[Math.floor(Math.random() * heights.length)]
    } else if (variant === 'featured') {
      return 'h-64'
    }
    return 'h-48'
  }

  const getCardClass = () => {
    const baseClasses = 'group cursor-pointer transition-all duration-500'
    
    if (variant === 'masonry') {
      return `${baseClasses} hover:shadow-2xl hover:scale-[1.02] bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-var(--color-primary)/20 ${className}`
    } else if (variant === 'featured') {
      return `${baseClasses} hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-2 border-var(--color-primary)/10 rounded-2xl overflow-hidden ${className}`
    }
    
    return `${baseClasses} hover:shadow-lg hover:-translate-y-1 ${className}`
  }

  if (variant === 'masonry') {
    return (
      <div className={getCardClass()} onClick={onClick}>
        {primaryImage && (
          <div className="relative overflow-hidden">
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              width={600}
              height={400}
              className={`w-full ${getImageHeight()} object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110`}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
              priority={false}
            />
            
            {/* Enhanced overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Floating badges */}
            {project.featured && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </div>
            )}
            
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
              project.status === 'completed' ? 'bg-green-500 text-white' :
              project.status === 'in-progress' ? 'bg-orange-500 text-white' :
              'bg-blue-500 text-white'
            }`}>
              {project.status === 'completed' ? (
                <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : project.status === 'in-progress' ? (
                <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              )} {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
            </div>
          </div>
        )}

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-var(--color-primary) transition-colors duration-300 leading-tight">
              {project.title}
            </h3>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4" />
              </svg>
              {project.category}
              {project.client && (
                <>
                  <span className="mx-2">•</span>
                  <span className="font-medium">{project.client}</span>
                </>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {project.description.length > 120 ? 
              `${project.description.substring(0, 120)}...` : 
              project.description
            }
          </p>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-lg bg-var(--color-primary)/10 text-var(--color-primary) text-xs font-medium border border-var(--color-primary)/20 hover:bg-var(--color-primary)/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="inline-flex items-center px-2 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          )}

          {(project.duration || project.budget) && (
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              {project.duration && (
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {project.duration}
                </div>
              )}
              {project.budget && (
                <div className="text-sm font-semibold text-var(--color-primary)">
                  {project.budget}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Card 
      className={getCardClass()}
      padding="sm"
      onClick={onClick}
    >
      {primaryImage && (
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            width={400}
            height={192}
            className={`w-full ${getImageHeight()} object-cover transition-transform duration-300 group-hover:scale-105`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          {project.featured && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium">
              Featured
            </div>
          )}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-sm font-medium ${statusColors[project.status]}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {project.shortDescription}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded-md">
            {project.category}
          </span>
          {project.duration && (
            <span>{project.duration}</span>
          )}
        </div>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-gray-500 text-xs px-2 py-1">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {project.client && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Client: <span className="font-medium">{project.client}</span>
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}

export default ProjectCard