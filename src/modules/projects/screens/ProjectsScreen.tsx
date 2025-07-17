'use client'
import React, { useState, useMemo } from 'react'
import { Project } from '@/modules/shared/utils/types'
import { 
  ProjectHero, 
  ProjectCard, 
  ProjectFilter, 
  type FilterState 
} from '../components'
import { Container, Section } from '@/modules/shared/components/common'

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
  })

  const categories = useMemo(() => {
    return [...new Set(projects.map(project => project.category))]
  }, [projects])

  const tags = useMemo(() => {
    return [...new Set(projects.flatMap(project => project.tags))]
  }, [projects])

  const statuses = useMemo(() => {
    return [...new Set(projects.map(project => project.status))] as Array<'completed' | 'in-progress' | 'planned'>
  }, [projects])

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      if (filters.category && project.category !== filters.category) return false
      if (filters.status && project.status !== filters.status) return false
      if (filters.featured !== null && project.featured !== filters.featured) return false
      if (filters.tags.length > 0 && !filters.tags.some(tag => project.tags.includes(tag))) return false
      return true
    })

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
    window.location.href = `/projects/${project.id}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectHero
        onCTAClick={() => {
          document.getElementById('projects-section')?.scrollIntoView({ 
            behavior: 'smooth' 
          })
        }}
      />

      {featuredProjects.length > 0 && (
        <Section className="bg-white">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our most notable engineering achievements and success stories
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section id="projects-section">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our complete portfolio of engineering projects across all categories
            </p>
          </div>

          <ProjectFilter
            categories={categories}
            tags={tags}
            statuses={statuses}
            onFilterChange={setFilters}
            className="mb-8"
          />

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
                })}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 text-sm text-gray-600">
                Showing {filteredProjects.length} of {projects.length} projects
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => handleProjectClick(project)}
                  />
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>
    </div>
  )
}

export default ProjectsScreen