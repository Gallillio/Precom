'use client'
import React, { useState, useEffect } from 'react'
import { Project } from '@/modules/shared/utils/types'
import { Modal } from '@/modules/shared/components/ui'
import Image from 'next/image'

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false)

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0)
    setIsImageGalleryOpen(false)
  }, [project])

  if (!project) return null

  const primaryImage = project.images.find(img => img.isPrimary) || project.images[0]
  
  const statusConfig = {
    completed: { 
      color: 'bg-green-500', 
      textColor: 'text-green-600', 
      bgColor: 'bg-green-50',
      icon: '✓',
      label: 'Completed'
    },
    'in-progress': { 
      color: 'bg-orange-500', 
      textColor: 'text-orange-600', 
      bgColor: 'bg-orange-50',
      icon: '🔄',
      label: 'In Progress'
    },
    planned: { 
      color: 'bg-blue-500', 
      textColor: 'text-blue-600', 
      bgColor: 'bg-blue-50',
      icon: '📋',
      label: 'Planned'
    },
  }

  const status = statusConfig[project.status]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="full"
      className="max-w-7xl mx-auto"
    >
      <div className="flex flex-col h-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200 bg-white">
          <div className="flex-1 pr-4">
            <div className="flex items-center space-x-4 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {project.title}
              </h2>
              {project.featured && (
                <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured Project
                </div>
              )}
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4" />
                </svg>
                {project.category}
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full ${status.bgColor}`}>
                <span className="mr-1">{status.icon}</span>
                <span className={`font-medium ${status.textColor}`}>
                  {status.label}
                </span>
              </div>
              {project.client && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H8a2 2 0 00-2-2V6m8 0h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2" />
                  </svg>
                  {project.client}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid lg:grid-cols-2 gap-8 p-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              {primaryImage && (
                <div className="relative group">
                  <div 
                    className="relative w-full h-96 rounded-xl overflow-hidden cursor-pointer bg-gray-100"
                    onClick={() => setIsImageGalleryOpen(true)}
                  >
                    <Image
                      src={project.images[currentImageIndex]?.url || primaryImage.url}
                      alt={project.images[currentImageIndex]?.alt || primaryImage.alt}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    
                    {/* Ken Burns Effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Zoom icon */}
                    <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Navigation arrows */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Thumbnail gallery */}
              {project.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {project.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-var(--color-primary) shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Overview</h3>
                <p className="text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-4">
                {project.duration && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center text-gray-600 mb-1">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Duration
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {project.duration}
                    </div>
                  </div>
                )}
                
                {project.budget && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center text-gray-600 mb-1">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      Budget
                    </div>
                    <div className="text-lg font-semibold text-var(--color-primary)">
                      {project.budget}
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              {project.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies & Methods</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-lg bg-var(--color-primary)/10 text-var(--color-primary) text-sm font-medium border border-var(--color-primary)/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-var(--color-primary) rounded-full mr-3"></div>
                    <span className="text-gray-600 mr-2">Started:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(project.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className={`w-2 h-2 ${status.color} rounded-full mr-3`}></div>
                    <span className="text-gray-600 mr-2">Last Updated:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(project.updatedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-var(--color-primary) text-white px-6 py-3 rounded-lg hover:bg-var(--color-primary-dark) transition-colors font-medium">
                    Get Similar Quote
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Contact Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen image gallery modal */}
      {isImageGalleryOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center"
          onClick={() => setIsImageGalleryOpen(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={project.images[currentImageIndex].url}
              alt={project.images[currentImageIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
            
            {/* Close button */}
            <button
              onClick={() => setIsImageGalleryOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-4 text-white/80 hover:text-white p-2"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 text-white/80 hover:text-white p-2"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default ProjectDetailModal