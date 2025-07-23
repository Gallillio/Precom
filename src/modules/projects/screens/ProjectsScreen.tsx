'use client'
import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Project } from '@/modules/shared/utils/types'
import { 
  ProjectHero, 
  ProjectCard, 
  ProjectFilter, 
  ProjectMasonryGrid,
  ProjectDetailModal,
  type FilterState 
} from '../components'
import { Container, Section, Loading, ContentLoader } from '@/modules/shared/components/common'

interface ProjectsScreenProps {
  projects?: Project[]
}

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Skyline Tower Complex',
    description: 'A comprehensive structural engineering project for a 40-story residential tower complex featuring innovative seismic resistance design and sustainable building practices.',
    shortDescription: 'Structural engineering for a 40-story residential tower with innovative seismic resistance.',
    category: 'Structural Engineering',
    tags: ['High-rise', 'Seismic Design', 'Residential', 'Sustainable'],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
        alt: 'Skyline Tower Complex exterior view',
        isPrimary: true,
        caption: 'Completed tower showcasing modern architectural design'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
        alt: 'Tower under construction',
        isPrimary: false,
        caption: 'Construction phase showing structural framework'
      }
    ],
    client: 'Metropolitan Development Corp',
    duration: '18 months',
    budget: '$2.5M',
    status: 'completed',
    featured: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-06-30')
  },
  {
    id: '2',
    title: 'Industrial Bridge Infrastructure',
    description: 'Design and project management for a steel truss bridge connecting two industrial facilities, featuring load optimization and environmental impact assessment.',
    shortDescription: 'Steel truss bridge design connecting industrial facilities with optimized load capacity.',
    category: 'Project Management',
    tags: ['Bridge Design', 'Industrial', 'Steel Structure', 'Environmental'],
    images: [
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        alt: 'Industrial bridge spanning between facilities',
        isPrimary: true,
        caption: 'Completed bridge connecting industrial facilities'
      }
    ],
    client: 'TechCorp Industries',
    duration: '12 months',
    status: 'completed',
    featured: false,
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: '3',
    title: 'Smart City Infrastructure Review',
    description: 'Comprehensive engineering consulting and design review for smart city infrastructure including traffic management systems, utilities integration, and public safety enhancements.',
    shortDescription: 'Consulting and design review for smart city infrastructure and utilities integration.',
    category: 'Engineering Consulting',
    tags: ['Smart City', 'Infrastructure', 'Traffic Management', 'Utilities'],
    images: [
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        alt: 'Smart city infrastructure overview',
        isPrimary: true,
        caption: 'Modern city infrastructure with integrated smart systems'
      }
    ],
    client: 'City Planning Department',
    duration: '24 months',
    status: 'in-progress',
    featured: true,
    createdAt: new Date('2023-08-10'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: '4',
    title: 'Renewable Energy Facility Design',
    description: 'Complete design review and quality assurance for a solar panel installation facility, including structural integrity assessment and compliance verification.',
    shortDescription: 'Design review for solar panel facility with structural integrity assessment.',
    category: 'Design Review',
    tags: ['Renewable Energy', 'Solar', 'Quality Assurance', 'Compliance'],
    images: [
      {
        id: '5',
        url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
        alt: 'Solar panel installation facility',
        isPrimary: true,
        caption: 'Solar panel array at renewable energy facility'
      }
    ],
    client: 'GreenTech Solutions',
    duration: '8 months',
    status: 'completed',
    featured: false,
    createdAt: new Date('2023-05-05'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '5',
    title: 'Commercial Plaza Redevelopment',
    description: 'Structural analysis and renovation planning for a historic commercial plaza, balancing preservation requirements with modern safety standards.',
    shortDescription: 'Historic plaza renovation balancing preservation with modern safety standards.',
    category: 'Structural Engineering',
    tags: ['Historic Preservation', 'Commercial', 'Renovation', 'Safety Standards'],
    images: [
      {
        id: '6',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
        alt: 'Historic commercial plaza renovation',
        isPrimary: true,
        caption: 'Renovated commercial plaza maintaining historic character'
      }
    ],
    client: 'Historic District Authority',
    duration: '15 months',
    status: 'planned',
    featured: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  }
]

const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  projects = sampleProjects
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
  const [loading, setLoading] = useState(true)
  const [filterLoading, setFilterLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  
  // Scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.1
    }
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.getAttribute('data-animate-id')
          if (elementId) {
            setVisibleElements(prev => new Set(Array.from(prev).concat(elementId)))
          }
        }
      })
    }
    
    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    // Observe all animation elements
    const elementsToObserve = [
      heroRef.current,
      featuredRef.current,
      filterRef.current,
      resultsRef.current,
      gridRef.current
    ].filter(Boolean)
    
    elementsToObserve.forEach((element) => {
      if (element) observer.observe(element)
    })
    
    return () => {
      elementsToObserve.forEach((element) => {
        if (element) observer.unobserve(element)
      })
    }
  }, [loading])

  useEffect(() => {
    setFilterLoading(true)
    const timer = setTimeout(() => {
      setFilterLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [filters])

  const categories = useMemo(() => {
    return Array.from(new Set(projects.map(project => project.category)))
  }, [projects])

  const tags = useMemo(() => {
    return Array.from(new Set(projects.flatMap(project => project.tags)))
  }, [projects])

  const statuses = useMemo(() => {
    return Array.from(new Set(projects.map(project => project.status))) as Array<'completed' | 'in-progress' | 'planned'>
  }, [projects])

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      // Text search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const searchableText = [
          project.title,
          project.description,
          project.shortDescription,
          project.client,
          project.category,
          ...project.tags
        ].join(' ').toLowerCase()
        
        if (!searchableText.includes(searchLower)) return false
      }

      // Category filter
      if (filters.category && project.category !== filters.category) return false
      
      // Status filter
      if (filters.status && project.status !== filters.status) return false
      
      // Featured filter
      if (filters.featured !== null && project.featured !== filters.featured) return false
      
      // Tags filter (OR logic - project must have at least one selected tag)
      if (filters.tags.length > 0 && !filters.tags.some(tag => project.tags.includes(tag))) return false
      
      return true
    })

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (filters.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'category':
          comparison = a.category.localeCompare(b.category)
          break
        case 'date':
        default:
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
      }
      
      return filters.sortOrder === 'desc' ? -comparison : comparison
    })

    return filtered
  }, [projects, filters])

  const featuredProjects = useMemo(() => {
    return projects.filter(project => project.featured).slice(0, 3)
  }, [projects])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProjectHero
          onCTAClick={() => {
            document.getElementById('projects-section')?.scrollIntoView({ 
              behavior: 'smooth' 
            })
          }}
        />
        <ContentLoader text="Loading projects..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#00B4A6]/5">
      <div
        ref={heroRef}
        data-animate-id="hero"
        className={`transition-all duration-1000 transform ${
          visibleElements.has('hero') || !loading
            ? 'translate-y-0 opacity-100'
            : 'translate-y-12 opacity-0'
        }`}
      >
        <ProjectHero
          onCTAClick={() => {
            document.getElementById('projects-section')?.scrollIntoView({ 
              behavior: 'smooth' 
            })
          }}
        />
      </div>

      {featuredProjects.length > 0 && (
        <section 
          ref={featuredRef}
          data-animate-id="featured"
          id="featured-projects" 
          className={`py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden transition-all duration-1000 transform ${
            visibleElements.has('featured')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-16 opacity-0'
          }`}
        >
          {/* Premium Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#003366] to-[#00B4A6] rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-[#00B4A6] to-[#003366] rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#003366]/10 to-[#00B4A6]/10 rounded-full mb-6">
                <svg className="w-5 h-5 mr-2 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="text-sm font-semibold text-[#003366]">Signature Projects</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-6">
                Featured Engineering Achievements
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover our most innovative and impactful engineering projects that showcase technical excellence, 
                creative problem-solving, and exceptional client outcomes across diverse industries.
              </p>
            </div>
            
            {filterLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-t-3xl mb-4" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 animate-pulse" style={{ animationDelay: '0.1s' }}>
                  <div className="h-64 bg-gray-200 rounded-t-3xl mb-4" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 animate-pulse" style={{ animationDelay: '0.2s' }}>
                  <div className="h-64 bg-gray-200 rounded-t-3xl mb-4" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {featuredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <div 
                        className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-110 transition-transform duration-700"
                        style={{
                          backgroundImage: project.images?.[0]?.url ? `url(${project.images[0].url})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/20 via-transparent to-transparent group-hover:from-[#003366]/30 transition-all duration-500" />
                      </div>
                      
                      {/* Project Status Badge */}
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
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 bg-[#003366]/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-[#003366] mb-3 group-hover:text-[#00B4A6] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {project.shortDescription}
                      </p>
                      
                      {/* Project Details */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {project.duration}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {project.client}
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <button
                        onClick={() => handleProjectClick(project)}
                        className="w-full bg-gradient-to-r from-[#003366] to-[#00B4A6] text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group-hover:from-[#00B4A6] group-hover:to-[#003366]"
                      >
                        <span className="flex items-center justify-center">
                          View Project Details
                          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section id="projects-section" className="py-24 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 relative">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-40 left-20 w-64 h-64 bg-gradient-to-br from-[#003366] to-[#00B4A6] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-gradient-to-tr from-[#00B4A6] to-[#003366] rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            {/* Premium Section Header */}
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#003366]/10 to-[#00B4A6]/10 rounded-full mb-8">
              <svg className="w-6 h-6 mr-3 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-base font-bold text-[#003366]">Complete Engineering Portfolio</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-[#003366] mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#003366] to-[#00B4A6] bg-clip-text text-transparent">
                All Projects
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Explore our comprehensive portfolio of engineering excellence across diverse industries, 
              showcasing innovative solutions, technical expertise, and successful project outcomes.
            </p>
          </div>

          <div
            ref={filterRef}
            data-animate-id="filter"
            className={`transition-all duration-1000 transform ${
              visibleElements.has('filter')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            }`}
          >
            <ProjectFilter
              categories={categories}
              tags={tags}
              statuses={statuses}
              onFilterChange={setFilters}
              onSearchChange={setSearchTerm}
              totalCount={projects.length}
              filteredCount={filteredProjects.length}
              className="mb-10"
            />
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 mb-4">
                No projects match your current filter criteria
              </p>
              <button
                onClick={() => setFilters({
                  category: '',
                  tags: [],
                  status: '',
                  featured: null,
                  sortBy: 'date',
                  sortOrder: 'desc',
                  search: '',
                })}
                className="bg-gradient-to-r from-[#003366] to-[#00B4A6] text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Premium Results Summary */}
              <div
                ref={resultsRef}
                data-animate-id="results"
                className={`mb-10 p-8 bg-gradient-to-r from-[#003366]/5 via-white to-[#00B4A6]/5 rounded-3xl border border-white/50 shadow-xl backdrop-blur-sm relative overflow-hidden transition-all duration-1000 transform ${
                  visibleElements.has('results')
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-8 opacity-0 scale-95'
                }`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#003366] to-[#00B4A6] rounded-full blur-xl" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#00B4A6] to-[#003366] rounded-full blur-lg" />
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
                  <div className="flex items-center space-x-6">
                    {/* Project Count Badge */}
                    <div className="bg-gradient-to-r from-[#003366] to-[#00B4A6] rounded-2xl p-6 shadow-xl">
                      <div className="text-4xl font-bold text-white text-center">
                        {filteredProjects.length}
                      </div>
                      <div className="text-white/80 text-sm text-center mt-1">
                        {filteredProjects.length === 1 ? 'Project' : 'Projects'}
                      </div>
                    </div>
                    
                    {/* Summary Information */}
                    <div>
                      <h3 className="text-2xl font-bold text-[#003366] mb-2">
                        Portfolio Results
                      </h3>
                      <p className="text-gray-600 text-base">
                        Showing <span className="font-semibold text-[#00B4A6]">{filteredProjects.length}</span> of <span className="font-semibold text-[#003366]">{projects.length}</span> total engineering projects
                      </p>
                      
                      {/* Active Filters Indicator */}
                      {(filters.search || filters.category || filters.tags.length > 0 || filters.status || filters.featured !== null) && (
                        <div className="flex items-center mt-3">
                          <svg className="w-4 h-4 mr-2 text-[#00B4A6]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-600">
                            Filters applied - showing refined results
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Sort Information */}
                  {filteredProjects.length > 0 && (
                    <div className="mt-6 md:mt-0 bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-[#003366] mb-1">
                          Sorted by
                        </div>
                        <div className="text-base font-bold text-[#00B4A6]">
                          {filters.sortBy === 'date' ? 'Date Created' : filters.sortBy === 'title' ? 'Project Name' : 'Category'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {filters.sortOrder === 'desc' ? '↓ Newest First' : '↑ Oldest First'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {filterLoading ? (
                <div className="space-y-8">
                  <div className="animate-pulse text-center text-gray-500">
                    <div className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-var(--color-primary)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Filtering projects...
                    </div>
                  </div>
                  <ProjectMasonryGrid
                    projects={[]}
                    loading={true}
                    onProjectClick={handleProjectClick}
                  />
                </div>
              ) : (
                <div
                  ref={gridRef}
                  data-animate-id="grid"
                  className={`transition-all duration-1000 transform ${
                    visibleElements.has('grid')
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-16 opacity-0'
                  }`}
                >
                  <ProjectMasonryGrid
                    projects={filteredProjects}
                    loading={false}
                    onProjectClick={handleProjectClick}
                    className="animate-fade-in"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default ProjectsScreen