'use client'
import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Project } from '@/modules/shared/utils/types'
import { 
  ProjectHero, 
  ProjectCard, 
  ProjectFilter, 
  ProjectMasonryGrid,
  ProjectListView,
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
    title: 'Digital Manufacturing Implementation',
    description: 'Comprehensive technology operations consulting for a major manufacturing company to implement Industry 4.0 solutions, including IoT integration, automated production lines, and real-time monitoring systems.',
    shortDescription: 'Technology operations consulting for Industry 4.0 manufacturing transformation.',
    category: 'Technology Operations',
    tags: ['Industry 4.0', 'IoT Integration', 'Automation', 'Manufacturing'],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&h=600&fit=crop',
        alt: 'Modern manufacturing facility with automated systems',
        isPrimary: true,
        caption: 'Smart manufacturing facility with integrated IoT systems'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop',
        alt: 'Automated production line',
        isPrimary: false,
        caption: 'Automated production line with real-time monitoring'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1586983931288-3b7d28fb8d58?w=600&h=400&fit=crop',
        alt: 'Industrial IoT sensors and control systems',
        isPrimary: false,
        caption: 'IoT sensors and real-time data collection systems'
      },
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1562813733-b31f71025d54?w=600&h=400&fit=crop',
        alt: 'Quality control and testing station',
        isPrimary: false,
        caption: 'Advanced quality control and testing procedures'
      },
      {
        id: '5',
        url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
        alt: 'Control room with monitoring dashboards',
        isPrimary: false,
        caption: 'Central control room with real-time dashboards'
      }
    ],
    client: 'TechManufacturing Inc.',
    duration: '18 months',
    budget: '$3.2M',
    status: 'completed',
    featured: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-06-30')
  },
  {
    id: '2',
    title: 'Global Supply Chain Optimization',
    description: 'End-to-end supply chain management project for an international retail company, optimizing logistics networks, vendor relationships, and inventory management across 15 countries.',
    shortDescription: 'International supply chain optimization across 15 countries for retail operations.',
    category: 'Supply Chain Management',
    tags: ['Global Logistics', 'Vendor Management', 'Inventory Optimization', 'International Trade'],
    images: [
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
        alt: 'Global logistics and supply chain visualization',
        isPrimary: true,
        caption: 'Global supply chain network optimization'
      },
      {
        id: '6',
        url: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=400&fit=crop',
        alt: 'Warehouse automation and robotics',
        isPrimary: false,
        caption: 'Automated warehouse management systems'
      },
      {
        id: '7',
        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
        alt: 'Logistics tracking and monitoring',
        isPrimary: false,
        caption: 'Real-time logistics tracking and monitoring'
      },
      {
        id: '8',
        url: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0?w=600&h=400&fit=crop',
        alt: 'Supply chain analytics dashboard',
        isPrimary: false,
        caption: 'Advanced supply chain analytics and reporting'
      }
    ],
    client: 'GlobalRetail Corp',
    duration: '12 months',
    status: 'completed',
    featured: false,
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: '3',
    title: 'Renewable Energy Park Feasibility Study',
    description: 'Comprehensive feasibility analysis for a 500MW solar and wind energy park, including technical assessments, financial modeling, environmental impact studies, and regulatory compliance evaluation.',
    shortDescription: 'Feasibility study for large-scale renewable energy park development.',
    category: 'Feasibility Studies',
    tags: ['Renewable Energy', 'Financial Modeling', 'Environmental Impact', 'Regulatory Compliance'],
    images: [
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop',
        alt: 'Wind and solar energy park',
        isPrimary: true,
        caption: 'Renewable energy park with solar and wind integration'
      },
      {
        id: '9',
        url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop',
        alt: 'Solar panel installation',
        isPrimary: false,
        caption: 'Large-scale solar panel installation and maintenance'
      },
      {
        id: '10',
        url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=400&fit=crop',
        alt: 'Wind turbine construction',
        isPrimary: false,
        caption: 'Wind turbine construction and assembly process'
      },
      {
        id: '11',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        alt: 'Energy monitoring control center',
        isPrimary: false,
        caption: 'Renewable energy monitoring and control systems'
      },
      {
        id: '12',
        url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop',
        alt: 'Environmental impact assessment',
        isPrimary: false,
        caption: 'Environmental impact studies and site assessment'
      }
    ],
    client: 'GreenEnergy Ventures',
    duration: '8 months',
    status: 'in-progress',
    featured: true,
    createdAt: new Date('2023-08-10'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: '4',
    title: 'Infrastructure Development Tender',
    description: 'Complete tender preparation and submission for a major infrastructure development project, including technical documentation, cost analysis, project scheduling, and compliance verification.',
    shortDescription: 'Comprehensive tender services for major infrastructure development project.',
    category: 'Tender Services',
    tags: ['Infrastructure', 'Technical Documentation', 'Cost Analysis', 'Project Scheduling'],
    images: [
      {
        id: '5',
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
        alt: 'Infrastructure construction site',
        isPrimary: true,
        caption: 'Major infrastructure development project site'
      }
    ],
    client: 'National Infrastructure Authority',
    duration: '6 months',
    status: 'completed',
    featured: false,
    createdAt: new Date('2023-05-05'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '5',
    title: 'Corporate Training Program Development',
    description: 'Design and implementation of comprehensive training and development programs for a multinational corporation, including leadership development, technical skills training, and performance management systems.',
    shortDescription: 'Corporate training program development for multinational company workforce.',
    category: 'Training & Development',
    tags: ['Leadership Development', 'Skills Training', 'Performance Management', 'Corporate Learning'],
    images: [
      {
        id: '6',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
        alt: 'Corporate training session',
        isPrimary: true,
        caption: 'Corporate training and development program in progress'
      }
    ],
    client: 'MultiCorp International',
    duration: '15 months',
    status: 'planned',
    featured: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '6',
    title: 'International Market Entry Strategy',
    description: 'Business representation and market entry consulting for European companies expanding into emerging markets, including regulatory compliance, local partnerships, and strategic positioning.',
    shortDescription: 'Market entry strategy and business representation for European companies.',
    category: 'Business Representation',
    tags: ['Market Entry', 'International Business', 'Regulatory Compliance', 'Strategic Partnerships'],
    images: [
      {
        id: '13',
        url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop',
        alt: 'Global market analysis',
        isPrimary: true,
        caption: 'Market research and analysis for emerging markets'
      },
      {
        id: '14',
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
        alt: 'Strategic partnerships and negotiations',
        isPrimary: false,
        caption: 'Strategic partnership development and negotiations'
      },
      {
        id: '15',
        url: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&h=400&fit=crop',
        alt: 'Regulatory compliance documentation',
        isPrimary: false,
        caption: 'Regulatory compliance and documentation processes'
      }
    ],
    client: 'European Business Consortium',
    duration: '10 months',
    status: 'in-progress',
    featured: true,
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2024-11-20')
  },
  {
    id: '7',
    title: 'Smart City Development Project',
    description: 'Comprehensive project management for a smart city development initiative, coordinating multiple stakeholders, technology vendors, and government agencies to deliver integrated urban solutions.',
    shortDescription: 'Project management for comprehensive smart city development initiative.',
    category: 'Project Management',
    tags: ['Smart City', 'Urban Planning', 'Stakeholder Management', 'Technology Integration'],
    images: [
      {
        id: '8',
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        alt: 'Smart city infrastructure',
        isPrimary: true,
        caption: 'Smart city development with integrated technology solutions'
      }
    ],
    client: 'Metropolitan City Council',
    duration: '24 months',
    status: 'in-progress',
    featured: false,
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-10-15')
  },
]

const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  projects = sampleProjects
}) => {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    tags: [],
    status: '',
    featured: null,
    sortBy: 'date',
    sortOrder: 'desc',
    search: '',
    viewMode: 'grid',
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

  // Handle URL parameter for auto-opening project details
  useEffect(() => {
    const projectId = searchParams.get('project')
    if (projectId && !loading) {
      const project = projects.find(p => p.id === projectId)
      if (project) {
        setSelectedProject(project)
        setIsModalOpen(true)
      }
    }
  }, [searchParams, projects, loading])
  
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
                    onClick={() => handleProjectClick(project)}
                    className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden cursor-pointer"
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
                  viewMode: 'grid',
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
                  {filters.viewMode === 'grid' ? (
                    <ProjectMasonryGrid
                      projects={[]}
                      loading={true}
                      onProjectClick={handleProjectClick}
                    />
                  ) : (
                    <ProjectListView
                      projects={[]}
                      loading={true}
                      onProjectClick={handleProjectClick}
                    />
                  )}
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
                  {filters.viewMode === 'grid' ? (
                    <ProjectMasonryGrid
                      projects={filteredProjects}
                      loading={false}
                      onProjectClick={handleProjectClick}
                      className="animate-fade-in"
                    />
                  ) : (
                    <ProjectListView
                      projects={filteredProjects}
                      loading={false}
                      onProjectClick={handleProjectClick}
                      className="animate-fade-in"
                    />
                  )}
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