'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Project } from '@/modules/shared/utils/types'
import { Modal } from '@/modules/shared/components/ui'
import { ROUTES } from '@/modules/shared/utils/constants'
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
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'gallery'>('overview')
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Reset state when project changes
  useEffect(() => {
    setCurrentImageIndex(0)
    setIsImageGalleryOpen(false)
    setActiveTab('overview')
    setIsAutoPlaying(true)
  }, [project])

  // Auto-slideshow for overview tab
  useEffect(() => {
    if (!project || activeTab !== 'overview' || !isAutoPlaying || project.images.length <= 1) {
      return
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [project, activeTab, isAutoPlaying])

  // Pause auto-play when modal is not open
  useEffect(() => {
    if (!isOpen) {
      setIsAutoPlaying(false)
    } else {
      setIsAutoPlaying(true)
    }
  }, [isOpen])

  if (!project) return null

  const primaryImage = project.images.find(img => img.isPrimary) || project.images[0]
  
  const statusConfig = {
    completed: { 
      color: 'bg-emerald-500', 
      textColor: 'text-emerald-700', 
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>,
      label: 'Completed',
      progressWidth: '100%'
    },
    'in-progress': { 
      color: 'bg-amber-500', 
      textColor: 'text-amber-700', 
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      label: 'In Progress',
      progressWidth: '65%'
    },
    planned: { 
      color: 'bg-blue-500', 
      textColor: 'text-blue-700', 
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
      label: 'Planned',
      progressWidth: '20%'
    },
  }

  const status = statusConfig[project.status]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    setIsAutoPlaying(false) // Pause auto-play when user manually navigates
    setTimeout(() => setIsAutoPlaying(true), 8000) // Resume after 8 seconds
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
    setIsAutoPlaying(false) // Pause auto-play when user manually navigates
    setTimeout(() => setIsAutoPlaying(true), 8000) // Resume after 8 seconds
  }

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index)
    setIsAutoPlaying(false) // Pause auto-play when user clicks dot
    setTimeout(() => setIsAutoPlaying(true), 8000) // Resume after 8 seconds
  }

  const handleGetSimilarQuote = () => {
    // Navigate to contact page with project context and scroll parameter
    const url = `${ROUTES.contact}?service=${encodeURIComponent(project?.category || '')}&project=${encodeURIComponent(project?.title || '')}&scroll=form`
    router.push(url)
    onClose()
  }

  const handleContactTeam = () => {
    // Navigate to contact page
    router.push(ROUTES.contact)
    onClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="xl"
    >
      <div className="flex flex-col max-w-4xl w-full max-h-[88vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Modern Header */}
        <div className="relative bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-teal)] text-white">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative px-4 sm:px-6 py-3 sm:py-4">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Project Header Info */}
            <div className="max-w-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h1 className="text-base sm:text-lg font-bold leading-tight pr-10 sm:pr-0">
                  {project.title}
                </h1>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${status.bgColor} ${status.textColor} border ${status.borderColor}`}>
                  <span className="mr-1.5">{status.icon}</span>
                  {status.label}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-white/90">
                <div className="flex items-center">
                  <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4" />
                  </svg>
                  {project.category}
                </div>
                {project.client && (
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H8a2 2 0 00-2-2V6m8 0h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2" />
                    </svg>
                    {project.client}
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-white/80">Progress</span>
                  <span className="text-white font-semibold">{status.label}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1">
                  <div 
                    className="bg-white h-1 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: status.progressWidth }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="px-4 sm:px-6">
            <nav className="flex space-x-6 overflow-x-auto">
              {[
                { 
                  id: 'overview', 
                  label: 'Overview', 
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                },
                { 
                  id: 'details', 
                  label: 'Details', 
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                },
                { 
                  id: 'gallery', 
                  label: 'Gallery', 
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )
                }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center space-x-1.5 py-2.5 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-[var(--accent-teal)] text-[var(--accent-teal)]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-5 py-4">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="max-w-3xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-4">
                  {/* Main Image */}
                  <div className="lg:col-span-2">
                    <div className="relative group">
                      <div 
                        className="relative w-full h-40 sm:h-48 lg:h-52 rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
                        onClick={() => setIsImageGalleryOpen(true)}
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                      >
                        {/* Image Container with Swipe Animation */}
                        <div className="relative w-full h-full">
                          {project.images.map((image, index) => (
                            <div
                              key={image.id}
                              className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                                index === currentImageIndex 
                                  ? 'translate-x-0' 
                                  : index < currentImageIndex 
                                    ? '-translate-x-full' 
                                    : 'translate-x-full'
                              }`}
                            >
                              <Image
                                src={image.url}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 66vw"
                              />
                            </div>
                          ))}
                        </div>
                        
                        {/* Navigation Arrows */}
                        {project.images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                prevImage()
                              }}
                              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                nextImage()
                              }}
                              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </>
                        )}


                        {/* Auto-play indicator */}
                        {isAutoPlaying && project.images.length > 1 && activeTab === 'overview' && (
                          <div className="absolute bottom-4 left-4">
                            <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                              <span className="text-white text-xs font-medium">Auto</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Image Navigation Dots */}
                      {project.images.length > 1 && (
                        <div className="flex justify-center mt-3 space-x-2">
                          {project.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => handleDotClick(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                index === currentImageIndex 
                                  ? 'bg-[var(--accent-teal)] scale-125' 
                                  : 'bg-gray-300 hover:bg-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Image Caption */}
                      {project.images[currentImageIndex]?.caption && (
                        <div className="mt-2 text-center">
                          <p className="text-xs text-gray-600 italic">
                            {project.images[currentImageIndex].caption}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div className="mt-3">
                      <h2 className="text-sm font-bold text-gray-900 mb-2">Project Overview</h2>
                      <p className="text-gray-700 leading-relaxed text-xs">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-3">
                    {/* Project Stats */}
                    <div className="bg-gray-50 rounded-xl p-3">
                      <h3 className="font-bold text-gray-900 mb-2 text-xs">Project Details</h3>
                      <div className="space-y-2">
                        {project.duration && (
                          <div>
                            <div className="text-xs text-gray-600 mb-0.5">Duration</div>
                            <div className="font-semibold text-gray-900 text-xs">{project.duration}</div>
                          </div>
                        )}
                        {project.budget && (
                          <div>
                            <div className="text-xs text-gray-600 mb-0.5">Budget</div>
                            <div className="font-semibold text-[var(--primary-blue)] text-xs">{project.budget}</div>
                          </div>
                        )}
                        <div>
                          <div className="text-xs text-gray-600 mb-0.5">Started</div>
                          <div className="font-semibold text-gray-900 text-xs">
                            {new Date(project.createdAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    {project.tags.length > 0 && (
                      <div className="bg-white rounded-xl p-3 border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-2 text-xs">Technologies</h3>
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-1.5 py-0.5 bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] text-xs font-medium rounded border border-[var(--accent-teal)]/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="space-y-1.5">
                      <button 
                        onClick={handleGetSimilarQuote}
                        className="w-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-teal)] text-white py-2 px-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-xs"
                      >
                        Get Similar Quote
                      </button>
                      <button 
                        onClick={handleContactTeam}
                        className="w-full border border-gray-300 text-gray-700 py-2 px-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-xs"
                      >
                        Contact Team
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="max-w-3xl mx-auto">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-2">Project Specification</h3>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-gray-700 leading-relaxed text-xs">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-2">Key Features</h3>
                      <div className="space-y-2">
                        {project.tags.slice(0, 6).map((tag, index) => (
                          <div key={index} className="flex items-center text-xs">
                            <div className="w-1.5 h-1.5 bg-[var(--accent-teal)] rounded-full mr-2" />
                            <span className="text-gray-700">{tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Timeline & Milestones</h3>
                    <div className="space-y-3">
                      <div className="border-l-3 border-[var(--primary-blue)] pl-3">
                        <div className="font-semibold text-gray-900 text-xs">Project Start</div>
                        <div className="text-xs text-gray-600">
                          {new Date(project.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                      <div className={`border-l-3 ${status.color.replace('bg-', 'border-')} pl-3`}>
                        <div className="font-semibold text-gray-900 text-xs">Current Status</div>
                        <div className="text-xs text-gray-600">{status.label}</div>
                      </div>
                      <div className="border-l-3 border-gray-300 pl-3">
                        <div className="font-semibold text-gray-900 text-xs">Last Updated</div>
                        <div className="text-xs text-gray-600">
                          {new Date(project.updatedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <div className="max-w-3xl mx-auto">
                <h2 className="text-sm font-bold text-gray-900 mb-3">Project Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {project.images.map((image, index) => (
                    <div
                      key={image.id}
                      className="relative group cursor-pointer"
                      onClick={() => {
                        setCurrentImageIndex(index)
                        setIsImageGalleryOpen(true)
                      }}
                    >
                      <div className="relative h-24 sm:h-32 lg:h-36 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover transition-all duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                      </div>
                      {image.caption && (
                        <p className="mt-1 text-xs text-gray-600 text-center">{image.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-screen Gallery */}
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
            
            {/* Controls */}
            <button
              onClick={() => setIsImageGalleryOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 bg-black/30 rounded-full transition-all"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {project.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-4 text-white/80 hover:text-white p-2 bg-black/30 rounded-full transition-all"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 text-white/80 hover:text-white p-2 bg-black/30 rounded-full transition-all"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

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