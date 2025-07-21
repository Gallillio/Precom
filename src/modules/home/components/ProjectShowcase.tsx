'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProjectCard, MasonryGrid } from '@/modules/shared/components/ui/MasonryGrid'
import { ROUTES } from '@/modules/shared/utils/constants'

interface ProjectShowcaseProps {
  className?: string
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  const projectsData = [
    {
      id: '1',
      title: 'Metropolitan Bridge Complex',
      category: 'Infrastructure',
      image: '/images/projects/bridge-complex.jpg',
      description: 'A revolutionary cable-stayed bridge design spanning 2.5km, connecting two major metropolitan areas with sustainable engineering solutions.',
      stats: [
        { label: 'Length', value: '2.5km' },
        { label: 'Budget', value: '$180M' },
        { label: 'Duration', value: '3 years' }
      ],
      tags: ['Bridge Engineering', 'Sustainability', 'Urban Planning'],
      featured: true
    },
    {
      id: '2',
      title: 'Green Energy Campus',
      category: 'Commercial',
      image: '/images/projects/energy-campus.jpg',
      description: 'Net-zero energy commercial complex with integrated renewable systems and smart building technologies.',
      stats: [
        { label: 'Area', value: '450k sqft' },
        { label: 'Energy', value: 'Net-Zero' }
      ],
      tags: ['Renewable Energy', 'Smart Buildings', 'LEED Platinum']
    },
    {
      id: '3',
      title: 'Coastal Flood Defense',
      category: 'Infrastructure',
      image: '/images/projects/flood-defense.jpg',
      description: 'Advanced coastal protection system combining natural and engineered solutions to protect 50km of shoreline.',
      stats: [
        { label: 'Protection', value: '50km' },
        { label: 'Storm Rating', value: 'Category 5' }
      ],
      tags: ['Climate Resilience', 'Coastal Engineering', 'Environmental']
    },
    {
      id: '4',
      title: 'High-Rise Innovation Tower',
      category: 'Residential',
      image: '/images/projects/innovation-tower.jpg',
      description: 'Award-winning 60-story residential tower featuring cutting-edge seismic resistance and energy efficiency.',
      stats: [
        { label: 'Height', value: '280m' },
        { label: 'Units', value: '450' }
      ],
      tags: ['High-Rise', 'Seismic Design', 'Luxury Living']
    },
    {
      id: '5',
      title: 'Industrial Automation Complex',
      category: 'Industrial',
      image: '/images/projects/automation-complex.jpg',
      description: 'State-of-the-art manufacturing facility with fully automated systems and Industry 4.0 integration.',
      stats: [
        { label: 'Automation', value: '95%' },
        { label: 'Efficiency', value: '+40%' }
      ],
      tags: ['Industry 4.0', 'Automation', 'Smart Manufacturing']
    },
    {
      id: '6',
      title: 'Transit Hub Redevelopment',
      category: 'Infrastructure',
      image: '/images/projects/transit-hub.jpg',
      description: 'Complete modernization of central transit station serving 100,000+ daily passengers.',
      stats: [
        { label: 'Capacity', value: '100k/day' },
        { label: 'Platforms', value: '24' }
      ],
      tags: ['Public Transit', 'Urban Mobility', 'Accessibility']
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'Infrastructure', label: 'Infrastructure' },
    { id: 'Commercial', label: 'Commercial' },
    { id: 'Residential', label: 'Residential' },
    { id: 'Industrial', label: 'Industrial' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.querySelector('#projects')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const masonryItems = filteredProjects.map((project, index) => ({
    id: project.id,
    content: (
      <ProjectCard
        {...project}
        onClick={() => {
          // Handle project detail modal or navigation
          console.log('Open project:', project.id)
        }}
      />
    ),
    className: index === 0 ? 'lg:col-span-2' : '' // Make first item larger
  }))

  return (
    <section id="projects" className={`relative py-24 overflow-hidden ${className}`}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[var(--background-tertiary)] to-[var(--secondary-gray)]" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-[var(--accent-teal)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--primary-blue)]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-[var(--primary-blue)]/10 rounded-full px-6 py-2 mb-6">
              <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full animate-pulse" />
              <span className="text-[var(--primary-blue)] text-sm font-medium tracking-wider uppercase">
                Featured Work
              </span>
            </div>

            {/* Title */}
            <h2 className="heading-1 text-[var(--text-primary)] mb-6 max-w-4xl mx-auto">
              Projects That Shape{' '}
              <span className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-teal)] bg-clip-text text-transparent">
                The Future
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-10">
              Explore our portfolio of groundbreaking engineering projects that demonstrate 
              our commitment to innovation, sustainability, and excellence.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`
                    px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105
                    ${activeFilter === filter.id
                      ? 'bg-[var(--primary-blue)] text-white shadow-lg'
                      : 'bg-white text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent-teal)] hover:text-[var(--accent-teal)]'
                    }
                  `}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Masonry Grid */}
        <div className={`transform transition-all duration-1000 delay-600 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <MasonryGrid
            items={masonryItems}
            columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
            gap={32}
            className="mb-16"
            animationDelay={150}
          />
        </div>

        {/* Call to Action */}
        <div className={`text-center transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-[var(--border)] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-teal)] rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--primary-blue)] rounded-full blur-3xl transform -translate-x-24 translate-y-24" />
            </div>

            <div className="relative">
              <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                Have a Project in Mind?
              </h3>
              <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                From concept to completion, we're here to bring your engineering vision to life. 
                Let's discuss how we can help.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={ROUTES.projects}>
                  <button className="group px-8 py-4 bg-[var(--primary-blue)] text-white rounded-xl font-semibold text-lg hover:bg-[var(--accent-teal)] transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <span>View All Projects</span>
                    <svg className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>
                <Link href={ROUTES.contact}>
                  <button className="group px-8 py-4 border-2 border-[var(--border-secondary)] text-[var(--text-primary)] rounded-xl font-semibold text-lg hover:border-[var(--accent-teal)] hover:text-[var(--accent-teal)] transition-all duration-300 transform hover:scale-105">
                    <span>Start Your Project</span>
                    <svg className="w-5 h-5 ml-2 inline group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-center divide-x divide-[var(--border)] mt-8 pt-8">
                <div className="px-6 text-center">
                  <div className="text-2xl font-bold text-[var(--primary-blue)]">500+</div>
                  <div className="text-sm text-[var(--text-secondary)]">Completed</div>
                </div>
                <div className="px-6 text-center">
                  <div className="text-2xl font-bold text-[var(--primary-blue)]">25</div>
                  <div className="text-sm text-[var(--text-secondary)]">Countries</div>
                </div>
                <div className="px-6 text-center">
                  <div className="text-2xl font-bold text-[var(--primary-blue)]">$2B+</div>
                  <div className="text-sm text-[var(--text-secondary)]">Project Value</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}