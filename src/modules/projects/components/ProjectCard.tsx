import React from 'react'
import Image from 'next/image'
import { Project } from '@/modules/shared/utils/types'
import { Card } from '@/modules/shared/components/ui'

interface ProjectCardProps {
  project: Project
  className?: string
  onClick?: () => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className = '',
  onClick,
}) => {
  const primaryImage = project.images.find(img => img.isPrimary) || project.images[0]

  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    planned: 'bg-blue-100 text-blue-800',
  }

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
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
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
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