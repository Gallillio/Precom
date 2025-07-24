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
      title: 'Suez Industrial Zone Optimization',
      category: 'Technology Operations',
      image: '/images/projects/factory-optimization.jpg',
      description: 'Complete digital transformation of manufacturing facility with IoT integration, automated systems, and real-time monitoring for 40% efficiency improvement.',
      stats: [
        { label: 'Efficiency Gain', value: '+40%' },
        { label: 'IoT Sensors', value: '500+' },
        { label: 'ROI Timeline', value: '8 months' }
      ],
      tags: ['Digital Twin', 'IoT Integration', 'Process Automation'],
      featured: true
    },
    {
      id: '2',
      title: 'Egyptian Logistics Network',
      category: 'Supply Chain Management',
      image: '/images/projects/supply-chain-center.jpg',
      description: 'Nationwide supply chain optimization covering 15 distribution centers with advanced WMS implementation and route optimization.',
      stats: [
        { label: 'Centers', value: '15' },
        { label: 'Cost Reduction', value: '25%' }
      ],
      tags: ['WMS Implementation', 'Route Optimization', 'Inventory Management']
    },
    {
      id: '3',
      title: 'New Capital Infrastructure Study',
      category: 'Feasibility Studies',
      image: '/images/projects/feasibility-analysis.jpg',
      description: 'Comprehensive feasibility analysis for New Administrative Capital industrial zone including technical, financial, and economic viability assessment.',
      stats: [
        { label: 'Investment', value: '$500M' },
        { label: 'ROI Analysis', value: '7 years' }
      ],
      tags: ['Economic Analysis', 'Technical Assessment', 'Risk Evaluation']
    },
    {
      id: '4',
      title: 'Government Procurement Success',
      category: 'Tender Services',
      image: '/images/projects/tender-documentation.jpg',
      description: 'Strategic tender preparation and submission management resulting in 12 successful government contract awards worth $50M total value.',
      stats: [
        { label: 'Contracts Won', value: '12' },
        { label: 'Total Value', value: '$50M' }
      ],
      tags: ['Government Contracts', 'Compliance Management', 'Documentation']
    },
    {
      id: '5',
      title: 'Workforce Excellence Program',
      category: 'Training & Development',
      image: '/images/projects/training-facility.jpg',
      description: 'Comprehensive training program for 2,000+ employees across multiple industries with certification and skills development initiatives.',
      stats: [
        { label: 'Employees Trained', value: '2,000+' },
        { label: 'Certification Rate', value: '95%' }
      ],
      tags: ['Skills Development', 'Professional Certification', 'Workforce Planning']
    },
    {
      id: '6',
      title: 'International Partnership Development',
      category: 'Business Representation',
      image: '/images/projects/business-representation.jpg',
      description: 'Facilitated strategic partnerships between Egyptian companies and 8 international firms across Europe and Asia for market expansion.',
      stats: [
        { label: 'Partnerships', value: '8' },
        { label: 'Market Entry', value: '3 countries' }
      ],
      tags: ['International Relations', 'Market Entry', 'Cultural Bridge']
    },
    {
      id: '7',
      title: 'Mega Project Coordination',
      category: 'Project Management',
      image: '/images/projects/project-management-office.jpg',
      description: 'End-to-end project management for $200M industrial complex with 18-month timeline, coordinating 15 contractors and 500+ workers.',
      stats: [
        { label: 'Project Value', value: '$200M' },
        { label: 'On-Time Delivery', value: '100%' }
      ],
      tags: ['PMO Setup', 'Multi-Contractor', 'Timeline Management']
    },
    {
      id: '8',
      title: 'Strategic Business Transformation',
      category: 'Strategic Consulting',
      image: '/images/projects/strategic-planning.jpg',
      description: 'Complete business transformation strategy for manufacturing conglomerate including market analysis, organizational restructuring, and growth planning.',
      stats: [
        { label: 'Revenue Growth', value: '+60%' },
        { label: 'Market Expansion', value: '4 regions' }
      ],
      tags: ['Business Strategy', 'Market Analysis', 'Organizational Design']
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'Technology Operations', label: 'Technology' },
    { id: 'Supply Chain Management', label: 'Supply Chain' },
    { id: 'Feasibility Studies', label: 'Feasibility' },
    { id: 'Strategic Consulting', label: 'Strategic' },
    { id: 'Project Management', label: 'Project Mgmt' }
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
              Projects That Drive{' '}
              <span className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-teal)] bg-clip-text text-transparent">
                Industrial Excellence
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-10">
              Explore our portfolio of transformative industrial and business consulting projects that demonstrate 
              our commitment to operational excellence, strategic innovation, and measurable business results.
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
                Have an Industrial Project in Mind?
              </h3>
              <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                From feasibility studies to full implementation, we&apos;re here to drive your business transformation. 
                Let&apos;s discuss how we can optimize your operations and accelerate growth.
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
                    <span>Start Your Business Project</span>
                    <svg className="w-5 h-5 ml-2 inline group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-center divide-x divide-[var(--border)] mt-8 pt-8">
                <div className="px-6 text-center">
                  <div className="text-2xl font-bold text-[var(--primary-blue)]">200+</div>
                  <div className="text-sm text-[var(--text-secondary)]">Projects Completed</div>
                </div>
                <div className="px-6 text-center">
                  <div className="text-2xl font-bold text-[var(--primary-blue)]">50+</div>
                  <div className="text-sm text-[var(--text-secondary)]">Industrial Clients</div>
                </div>
                <div className="px-6 text-center">
                  <div className="text-2xl font-bold text-[var(--primary-blue)]">$2B</div>
                  <div className="text-sm text-[var(--text-secondary)]">Project Value Managed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}