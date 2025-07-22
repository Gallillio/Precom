'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Project } from '@/modules/shared/utils/types'
import ProjectCard from './ProjectCard'

interface ProjectMasonryGridProps {
  projects: Project[]
  loading?: boolean
  onProjectClick: (project: Project) => void
  className?: string
}

export const ProjectMasonryGrid: React.FC<ProjectMasonryGridProps> = ({
  projects,
  loading = false,
  onProjectClick,
  className = '',
}) => {
  const [columns, setColumns] = useState(3)
  const [gridItems, setGridItems] = useState<Project[][]>([])
  const gridRef = useRef<HTMLDivElement>(null)

  // Responsive column calculation
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width < 768) {
        setColumns(1) // Mobile
      } else if (width < 1024) {
        setColumns(2) // Tablet
      } else if (width < 1440) {
        setColumns(3) // Desktop
      } else {
        setColumns(4) // Large desktop
      }
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  // Distribute projects into columns for masonry layout
  useEffect(() => {
    if (projects.length === 0) {
      setGridItems([])
      return
    }

    const cols: Project[][] = Array.from({ length: columns }, () => [])
    const colHeights = new Array(columns).fill(0)

    projects.forEach((project, index) => {
      // Calculate estimated height based on content
      const baseHeight = 300 // Base card height
      const descriptionHeight = Math.ceil(project.description.length / 100) * 20
      const tagsHeight = Math.ceil(project.tags.length / 4) * 30
      const estimatedHeight = baseHeight + descriptionHeight + tagsHeight
      
      // Find column with minimum height
      const minHeightIndex = colHeights.indexOf(Math.min(...colHeights))
      
      cols[minHeightIndex].push(project)
      colHeights[minHeightIndex] += estimatedHeight
    })

    setGridItems(cols)
  }, [projects, columns])

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="space-y-6">
              {Array.from({ length: Math.ceil(6 / columns) }).map((_, itemIndex) => (
                <div
                  key={itemIndex}
                  className="bg-gray-200 animate-pulse rounded-xl"
                  style={{
                    height: `${280 + Math.random() * 100}px`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
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
    <div 
      ref={gridRef}
      className={`transition-all duration-500 ${className}`}
    >
      <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {gridItems.map((columnProjects, colIndex) => (
          <div key={colIndex} className="space-y-6">
            {columnProjects.map((project, projectIndex) => (
              <div
                key={project.id}
                className="transform transition-all duration-500 hover:scale-[1.02] hover:z-10"
                style={{
                  animationDelay: `${(colIndex * columnProjects.length + projectIndex) * 100}ms`,
                }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => onProjectClick(project)}
                  variant="masonry"
                  className="h-auto hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectMasonryGrid