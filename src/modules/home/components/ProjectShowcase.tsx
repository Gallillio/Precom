'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ProjectCard, MasonryGrid } from '@/modules/shared/components/ui/MasonryGrid'
import { ROUTES } from '@/modules/shared/utils/constants'

const useCountAnimation = (endValue: number, duration: number = 2000, startAnimation: boolean = false) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startAnimation) return

    let startTime: number
    const startValue = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOut)
      
      setCount(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [endValue, duration, startAnimation])

  return count
}

const AnimatedCTAStat: React.FC<{
  value: number
  suffix?: string
  prefix?: string
  label: string
}> = ({ value, suffix = '', prefix = '', label }) => {
  const [isVisible, setIsVisible] = useState(false)
  const statRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (statRef.current) {
      observer.observe(statRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animatedValue = useCountAnimation(value, 2000, isVisible)
  const displayValue = isVisible ? animatedValue : 0

  return (
    <div ref={statRef} className="px-6 text-center">
      <div className="text-2xl font-bold text-[var(--primary-blue)]">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-[var(--text-secondary)]">{label}</div>
    </div>
  )
}

interface ProjectShowcaseProps {
  className?: string
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  // Featured projects from /projects page - only showing the 3 featured ones
  const projectsData = [
    {
      id: '1',
      title: 'Digital Manufacturing Implementation',
      category: 'Technology Operations',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&h=600&fit=crop',
      description: 'Comprehensive technology operations consulting for a major manufacturing company to implement Industry 4.0 solutions, including IoT integration, automated production lines, and real-time monitoring systems.',
      stats: [
        { label: 'Duration', value: '18 months' },
        { label: 'Budget', value: '$3.2M' },
        { label: 'Status', value: 'Completed' }
      ],
      tags: ['Industry 4.0', 'IoT Integration', 'Automation', 'Manufacturing'],
      featured: true
    },
    {
      id: '3',
      title: 'Renewable Energy Park Feasibility Study',
      category: 'Feasibility Studies',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop',
      description: 'Comprehensive feasibility analysis for a 500MW solar and wind energy park, including technical assessments, financial modeling, environmental impact studies, and regulatory compliance evaluation.',
      stats: [
        { label: 'Duration', value: '8 months' },
        { label: 'Capacity', value: '500MW' },
        { label: 'Status', value: 'In Progress' }
      ],
      tags: ['Renewable Energy', 'Financial Modeling', 'Environmental Impact', 'Regulatory Compliance']
    },
    {
      id: '6',
      title: 'International Market Entry Strategy',
      category: 'Business Representation',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      description: 'Business representation and market entry consulting for European companies expanding into emerging markets, including regulatory compliance, local partnerships, and strategic positioning.',
      stats: [
        { label: 'Duration', value: '10 months' },
        { label: 'Markets', value: 'Emerging' },
        { label: 'Status', value: 'In Progress' }
      ],
      tags: ['Market Entry', 'International Business', 'Regulatory Compliance', 'Strategic Partnerships']
    }
  ]

  // Show all featured projects (no filtering needed)
  const filteredProjects = projectsData

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
          // Navigate to projects page and open the project details
          router.push(`/projects?project=${project.id}`)
        }}
      />
    ),
    className: index === 0 ? 'lg:col-span-2' : '' // Make first item larger
  }))

  return (
    <section id="projects" className={`relative py-24 overflow-hidden ${className}`}>
      {/* Floating Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
      
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

            {/* Service Areas Showcase */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <p className="text-lg text-[var(--text-secondary)] mb-6">
                  Our expertise spans across diverse industrial and business consulting areas
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-5xl mx-auto">
                {[
                  { 
                    name: 'Technology Operations', 
                    color: 'from-blue-500 to-blue-600',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )
                  },
                  { 
                    name: 'Supply Chain', 
                    color: 'from-green-500 to-green-600',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    )
                  },
                  { 
                    name: 'Feasibility Studies', 
                    color: 'from-purple-500 to-purple-600',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )
                  },
                  { 
                    name: 'Tender Services', 
                    color: 'from-orange-500 to-orange-600',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )
                  },
                  { 
                    name: 'Training & Development', 
                    color: 'from-teal-500 to-teal-600',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )
                  },
                  { 
                    name: 'Business Representation', 
                    color: 'from-indigo-500 to-indigo-600',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )
                  },
                  { 
                    name: 'Project Management', 
                    color: 'from-red-500 to-red-600',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    )
                  },
                  { 
                    name: 'Strategic Consulting', 
                    color: 'from-yellow-500 to-yellow-600',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    )
                  }
                ].map((service, index) => (
                  <div
                    key={service.name}
                    className={`group relative bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                      index % 2 === 0 ? 'animate-float' : 'animate-float-delayed'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h4 className="text-xs font-semibold text-[var(--text-primary)] text-center leading-tight">
                      {service.name}
                    </h4>
                  </div>
                ))}
              </div>
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
                <AnimatedCTAStat 
                  value={200} 
                  suffix="+" 
                  label="Projects Completed" 
                />
                <AnimatedCTAStat 
                  value={50} 
                  suffix="+" 
                  label="Industrial Clients" 
                />
                <AnimatedCTAStat 
                  value={2} 
                  prefix="$" 
                  suffix="B" 
                  label="Project Value Managed" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}