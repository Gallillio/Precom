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
      title: 'El Nasr Electric Vehicle Project',
      category: 'Electric Vehicles',
      image: '/images/projects/electric-sedan.jpg',
      description: 'Revolutionary electric vehicle developed for Egyptian market featuring 400km range, solar charging integration, and desert-climate optimization.',
      stats: [
        { label: 'Range', value: '400km' },
        { label: 'Solar Integration', value: '15% boost' },
        { label: 'Development', value: '18 months' }
      ],
      tags: ['Electric Drivetrain', 'Solar Power', 'Egyptian Design'],
      featured: true
    },
    {
      id: '2',
      title: 'Cairo Rally Championship Car',
      category: 'Performance Vehicles',
      image: '/images/projects/sports-car.jpg',
      description: 'High-performance rally car engineered for Egyptian terrain, featuring sand-resistant systems and enhanced cooling for desert conditions.',
      stats: [
        { label: 'Power', value: '420hp' },
        { label: 'Desert Rating', value: '50°C+' }
      ],
      tags: ['Desert Engineering', 'Rally Performance', 'Egyptian Terrain']
    },
    {
      id: '3',
      title: 'Egyptian Postal Service Fleet',
      category: 'Fleet Vehicles',
      image: '/images/projects/fleet-vehicles.jpg',
      description: 'Complete redesign of Egypt Post delivery vehicles optimized for Egyptian road conditions, fuel efficiency, and payload capacity.',
      stats: [
        { label: 'Fleet Size', value: '5,000+' },
        { label: 'Efficiency Gain', value: '+40%' }
      ],
      tags: ['Egyptian Roads', 'Fuel Efficiency', 'Postal Service']
    },
    {
      id: '4',
      title: 'Uber Egypt Autonomous Pilot',
      category: 'Autonomous Systems',
      image: '/images/projects/autonomous-delivery.jpg',
      description: 'Autonomous vehicle pilot program for Cairo traffic conditions, featuring advanced AI for Egyptian driving patterns and navigation.',
      stats: [
        { label: 'Pilot Vehicles', value: '50' },
        { label: 'Cairo Routes', value: '25' }
      ],
      tags: ['Cairo Traffic', 'AI Navigation', 'Egyptian Roads']
    },
    {
      id: '5',
      title: 'Ghabbour Auto Assembly Line',
      category: 'Manufacturing',
      image: '/images/projects/auto-manufacturing.jpg',
      description: 'Modernization of automotive assembly line in 6th of October City with robotic systems and quality control for Egyptian automotive industry.',
      stats: [
        { label: 'Automation', value: '85%' },
        { label: 'Production Increase', value: '+50%' }
      ],
      tags: ['6th October City', 'Egyptian Manufacturing', 'Ghabbour Auto']
    },
    {
      id: '6',
      title: 'Cairo BRT Electric Buses',
      category: 'Public Transport',
      image: '/images/projects/electric-bus.jpg',
      description: 'Electric bus system for Cairo BRT with charging stations and route optimization for Greater Cairo metropolitan area.',
      stats: [
        { label: 'Fleet Size', value: '100 buses' },
        { label: 'Daily Passengers', value: '50k+' }
      ],
      tags: ['Cairo BRT', 'Egyptian Public Transit', 'Greater Cairo']
    }
  ]

  const filters = [
    { id: 'all', label: 'All Vehicles' },
    { id: 'Electric Vehicles', label: 'Electric Vehicles' },
    { id: 'Performance Vehicles', label: 'Performance' },
    { id: 'Autonomous Systems', label: 'Autonomous' },
    { id: 'Manufacturing', label: 'Manufacturing' }
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
              Vehicles That Shape{' '}
              <span className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-teal)] bg-clip-text text-transparent">
                Tomorrow&apos;s Mobility
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-10">
              Explore our portfolio of groundbreaking automotive engineering projects that demonstrate 
              our commitment to automotive innovation, sustainable mobility, and vehicle excellence.
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
                Have a Vehicle Project in Mind?
              </h3>
              <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                From concept to production, we&apos;re here to bring your automotive vision to life. 
                Let&apos;s discuss how we can help develop your next vehicle.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={ROUTES.projects}>
                  <button className="group px-8 py-4 bg-[var(--primary-blue)] text-white rounded-xl font-semibold text-lg hover:bg-[var(--accent-teal)] transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <span>View All Vehicles</span>
                    <svg className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>
                <Link href={ROUTES.contact}>
                  <button className="group px-8 py-4 border-2 border-[var(--border-secondary)] text-[var(--text-primary)] rounded-xl font-semibold text-lg hover:border-[var(--accent-teal)] hover:text-[var(--accent-teal)] transition-all duration-300 transform hover:scale-105">
                    <span>Start Your Vehicle Project</span>
                    <svg className="w-5 h-5 ml-2 inline group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-center divide-x divide-[var(--border)] mt-8 pt-8">
                <div className="px-6 text-center">
                  <div className="text-2xl font-bold text-[var(--primary-blue)]">150+</div>
                  <div className="text-sm text-[var(--text-secondary)]">Vehicles Developed</div>
                </div>
                <div className="px-6 text-center">
                  <div className="text-2xl font-bold text-[var(--primary-blue)]">35+</div>
                  <div className="text-sm text-[var(--text-secondary)]">Egyptian Clients</div>
                </div>
                <div className="px-6 text-center">
                  <div className="text-2xl font-bold text-[var(--primary-blue)]">500M</div>
                  <div className="text-sm text-[var(--text-secondary)]">EGP Project Value</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}