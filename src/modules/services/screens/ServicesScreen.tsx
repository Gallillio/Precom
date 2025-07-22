'use client'
import React, { useState, useEffect } from 'react'
import { ServiceHero } from '../components/ServiceHero'
import { ServicesSidebar } from '../components/ServicesSidebar'
import { AlternatingServiceLayout } from '../components/AlternatingServiceLayout'
import { BeforeAfterSlider } from '../components/BeforeAfterSlider'
import { ServiceFeatures } from '../components/ServiceFeatures'
import { Card, Button } from '@/modules/shared/components/ui'
import Link from 'next/link'

// Comprehensive services data for new design
const servicesData = [
  {
    id: 'structural',
    title: 'Structural Engineering',
    subtitle: 'Building Tomorrow\'s Infrastructure',
    description: 'Comprehensive structural engineering solutions that combine innovative design with proven engineering principles to create safe, efficient, and cost-effective structures.',
    image: '/images/services/structural-engineering.jpg',
    features: [
      {
        title: 'Seismic Analysis',
        description: 'Advanced earthquake-resistant design and retrofitting',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      },
      {
        title: 'Foundation Design',
        description: 'Optimized foundation systems for all soil conditions',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
          </svg>
        )
      },
      {
        title: 'Steel & Concrete',
        description: 'Expert design in both steel and reinforced concrete',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
          </svg>
        )
      },
      {
        title: 'Code Compliance',
        description: 'Adherence to all local and international building codes',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      }
    ],
    stats: [
      { label: 'Success Rate', value: '99.8%' },
      { label: 'Projects Completed', value: '200+' },
      { label: 'Average Timeline', value: '4-8 weeks' }
    ],
    subServices: [
      {
        id: 'seismic',
        title: 'Seismic Engineering',
        description: 'Specialized earthquake-resistant design and structural analysis for high-risk seismic zones.',
        features: ['Dynamic analysis', 'Base isolation design', 'Retrofit solutions', 'Seismic risk assessment'],
        icon: (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>),
        details: { duration: '6-10 weeks', complexity: 'High', expertise: 'Seismic Specialists' }
      },
      {
        id: 'foundation',
        title: 'Foundation Engineering',
        description: 'Comprehensive foundation design for all soil conditions and structural requirements.',
        features: ['Soil analysis', 'Deep foundations', 'Shallow foundations', 'Ground improvement'],
        icon: (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" /></svg>),
        details: { duration: '3-6 weeks', complexity: 'Medium', expertise: 'Geotechnical Engineers' }
      },
      {
        id: 'steel-design',
        title: 'Steel Structure Design',
        description: 'Advanced steel structural systems for commercial and industrial applications.',
        features: ['Moment frames', 'Braced frames', 'Composite design', 'Connection design'],
        icon: (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" /></svg>),
        details: { duration: '4-8 weeks', complexity: 'High', expertise: 'Steel Specialists' }
      }
    ]
  },
  {
    id: 'project-management',
    title: 'Project Management',
    subtitle: 'Delivering Excellence On Time',
    description: 'Professional project management services that ensure your engineering projects are completed on schedule, within budget, and to the highest quality standards.',
    image: '/images/services/project-management.jpg',
    features: [
      {
        title: 'Schedule Management',
        description: 'Detailed planning and timeline optimization',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: 'Budget Control',
        description: 'Cost management and financial oversight',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        )
      },
      {
        title: 'Risk Management',
        description: 'Proactive risk identification and mitigation',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      },
      {
        title: 'Quality Assurance',
        description: 'Comprehensive quality control processes',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      }
    ],
    stats: [
      { label: 'On-Time Delivery', value: '95%' },
      { label: 'Budget Adherence', value: '98%' },
      { label: 'Client Satisfaction', value: '100%' }
    ],
    subServices: [
      {
        id: 'construction-pm',
        title: 'Construction Management',
        description: 'End-to-end construction project management from planning through completion.',
        features: ['Site supervision', 'Contractor coordination', 'Progress monitoring', 'Safety management'],
        icon: (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" /></svg>),
        details: { duration: 'Project-dependent', complexity: 'High', expertise: 'Construction Managers' }
      },
      {
        id: 'design-pm',
        title: 'Design Management',
        description: 'Coordinated management of multi-disciplinary design teams and deliverables.',
        features: ['Design coordination', 'Review management', 'Schedule control', 'Quality oversight'],
        icon: (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707" /></svg>),
        details: { duration: '3-12 months', complexity: 'Medium', expertise: 'Design Managers' }
      }
    ]
  },
  {
    id: 'consulting',
    title: 'Engineering Consulting',
    subtitle: 'Expert Technical Guidance',
    description: 'Independent engineering consulting services providing expert technical advice, feasibility studies, and strategic guidance for complex engineering challenges.',
    image: '/images/services/consulting.jpg',
    features: [
      {
        title: 'Feasibility Studies',
        description: 'Comprehensive technical and economic analysis',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )
      },
      {
        title: 'Expert Witness',
        description: 'Professional testimony and technical expertise',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1" />
          </svg>
        )
      },
      {
        title: 'Value Engineering',
        description: 'Cost optimization without compromising quality',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
          </svg>
        )
      },
      {
        title: 'Code Review',
        description: 'Compliance verification and regulatory guidance',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
          </svg>
        )
      }
    ],
    stats: [
      { label: 'Cost Savings', value: '15-30%' },
      { label: 'Expert Reviews', value: '150+' },
      { label: 'Success Rate', value: '100%' }
    ]
  },
  {
    id: 'design-review',
    title: 'Design Review & QA',
    subtitle: 'Ensuring Design Excellence', 
    description: 'Independent design review services providing thorough verification and validation of engineering designs to ensure optimal performance, safety, and code compliance.',
    image: '/images/services/design-review.jpg',
    features: [
      {
        title: 'Peer Review',
        description: 'Independent verification by senior engineers',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857" />
          </svg>
        )
      },
      {
        title: 'Calculation Check',
        description: 'Detailed verification of structural calculations',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
      },
      {
        title: 'Drawing Review',
        description: 'Comprehensive review of technical drawings',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      },
      {
        title: 'Quality Audit',
        description: 'Systematic quality assurance processes',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      }
    ],
    stats: [
      { label: 'Reviews Completed', value: '300+' },
      { label: 'Issues Identified', value: '2,500+' },
      { label: 'Time Saved', value: '40%' }
    ]
  }
]

// Sidebar navigation items
const sidebarItems = [
  {
    id: 'structural',
    title: 'Structural Engineering',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
      </svg>
    )
  },
  {
    id: 'project-management',
    title: 'Project Management',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  {
    id: 'consulting',
    title: 'Engineering Consulting',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3" />
      </svg>
    )
  },
  {
    id: 'design-review',
    title: 'Design Review & QA',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  }
]

// Before/After comparison data
const beforeAfterData = [
  {
    id: 'structural-retrofit',
    title: 'Seismic Retrofit Project',
    category: 'Structural Engineering',
    beforeImage: '/images/services/before-after/structural-before.jpg',
    afterImage: '/images/services/before-after/structural-after.jpg',
    beforeDescription: 'Original building with seismic vulnerabilities',
    afterDescription: 'Retrofitted structure with enhanced earthquake resistance',
    improvements: [
      'Increased seismic resistance by 300%',
      'Added base isolation system',
      'Upgraded structural connections',
      'Improved building safety rating to A+'
    ],
    projectDetails: {
      location: 'San Francisco, CA',
      timeline: '6 months',
      budget: '$2.5M'
    }
  },
  {
    id: 'project-optimization',
    title: 'Construction Timeline Optimization',
    category: 'Project Management',
    beforeImage: '/images/services/before-after/pm-before.jpg',
    afterImage: '/images/services/before-after/pm-after.jpg',
    beforeDescription: 'Project facing delays and budget overruns',
    afterDescription: 'Streamlined project delivery with optimized processes',
    improvements: [
      'Reduced timeline by 40%',
      'Saved 25% on project costs',
      'Improved team coordination',
      'Zero safety incidents'
    ],
    projectDetails: {
      location: 'Los Angeles, CA',
      timeline: '18 months',
      budget: '$8.2M'
    }
  }
]

export const ServicesScreen: React.FC = () => {
  const [activeSection, setActiveSection] = useState('structural')

  useEffect(() => {
    // Set up intersection observer for automatic section detection
    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    // Observe all service sections
    sidebarItems.forEach(item => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ServiceHero />

      {/* Main Content Layout */}
      <div className="relative">
        {/* Sticky Sidebar */}
        <ServicesSidebar 
          items={sidebarItems}
          activeSection={activeSection}
          onSectionClick={setActiveSection}
          className="hidden lg:block"
        />

        {/* Main Content Area */}
        <div className="lg:ml-80">
          {/* Services Overview */}
          <section id="services-content" className="section-padding-lg">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="heading-2 mb-6">Comprehensive Engineering Solutions</h2>
                <p className="text-large text-body-secondary max-w-3xl mx-auto">
                  Our integrated approach to engineering services ensures seamless project delivery 
                  from concept to completion, backed by decades of industry expertise.
                </p>
              </div>
            </div>

            {/* Alternating Service Layouts */}
            <AlternatingServiceLayout services={servicesData} />
          </section>

          {/* Before/After Showcase */}
          <section className="section-padding-lg section-secondary">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="heading-2 mb-6">Proven Results</h2>
                <p className="text-large text-body-secondary max-w-3xl mx-auto">
                  See the transformative impact of our engineering solutions through real project case studies 
                  and measurable improvements.
                </p>
              </div>
              <BeforeAfterSlider items={beforeAfterData} />
            </div>
          </section>

          {/* Service Features */}
          <ServiceFeatures />

          {/* Call to Action */}
          <section className="section-padding-lg section-primary">
            <div className="container mx-auto px-4 text-center">
              <h2 className="heading-2 text-white mb-6">
                Ready to Start Your Next Project?
              </h2>
              <p className="text-large text-white/90 mb-12 max-w-3xl mx-auto">
                Let&apos;s discuss your engineering requirements and create a customized solution 
                that delivers exceptional results for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  variant="teal"
                  size="xl"
                  className="px-12 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                  onClick={() => window.location.href = '/contact'}
                >
                  Get Free Consultation
                </Button>
                <Link 
                  href="/about"
                  className="btn-outline bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-12 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
                >
                  Meet Our Team
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}