'use client'
import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Card } from '@/modules/shared/components/ui'

interface Value {
  title: string
  description: string
  icon: React.ReactNode
  progress: number
  color: string
  features: string[]
}

interface ValuesSectionProps {
  className?: string
}

export const ValuesSection: React.FC<ValuesSectionProps> = ({ className = '' }) => {
  const [visibleValues, setVisibleValues] = useState<number[]>([])
  const [animateProgress, setAnimateProgress] = useState<number[]>([])
  const valueRefs = useRef<(HTMLDivElement | null)[]>([])

  const values: Value[] = [
    {
      title: "Innovation Excellence",
      description: "We continuously push the boundaries of engineering technology, embracing cutting-edge solutions and creative problem-solving approaches to deliver exceptional results.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      progress: 95,
      color: "var(--accent-teal)",
      features: ["AI-Powered Design Tools", "Advanced BIM Technology", "Sustainable Solutions", "Digital Twin Integration"]
    },
    {
      title: "Quality Assurance",
      description: "Every project undergoes rigorous quality control processes. We maintain the highest standards through comprehensive testing, peer reviews, and adherence to international engineering codes.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      progress: 100,
      color: "var(--primary-blue)",
      features: ["ISO 9001 Certified", "Peer Review Process", "Continuous Testing", "Compliance Standards"]
    },
    {
      title: "Client Partnership",
      description: "We believe in building lasting relationships with our clients through transparent communication, collaborative approaches, and unwavering commitment to their success.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      progress: 98,
      color: "var(--success)",
      features: ["24/7 Client Support", "Transparent Communication", "Regular Progress Updates", "Long-term Partnerships"]
    },
    {
      title: "Sustainability Focus",
      description: "Environmental responsibility is at the core of our engineering practices. We integrate sustainable design principles and green technologies in every project we undertake.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
        </svg>
      ),
      progress: 92,
      color: "var(--success)",
      features: ["LEED Certification", "Carbon Footprint Reduction", "Renewable Energy Integration", "Sustainable Materials"]
    },
    {
      title: "Technical Expertise",
      description: "Our team comprises industry-leading experts with decades of combined experience across all engineering disciplines, ensuring comprehensive technical competency.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      progress: 96,
      color: "var(--warning)",
      features: ["Multi-Disciplinary Team", "Continuous Learning", "Industry Certifications", "Research & Development"]
    },
    {
      title: "Safety First",
      description: "Safety is non-negotiable in our engineering practice. We implement comprehensive safety protocols and risk assessment procedures to ensure zero-incident project delivery.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      progress: 100,
      color: "var(--error)",
      features: ["Zero-Incident Record", "Comprehensive Risk Assessment", "Safety Training Programs", "Emergency Protocols"]
    }
  ]

  useEffect(() => {
    const observers = valueRefs.current.map((ref, index) => {
      if (!ref) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleValues(prev => [...new Set([...prev, index])])
            // Trigger progress animation after a small delay
            setTimeout(() => {
              setAnimateProgress(prev => [...new Set([...prev, index])])
            }, 300 + index * 100)
          }
        },
        { threshold: 0.3 }
      )
      
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [])

  return (
    <section className={`section-padding-xl ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-6">Our Core Values</h2>
          <p className="text-large text-body-secondary max-w-3xl mx-auto">
            These fundamental principles guide every decision we make and every project we undertake, 
            ensuring excellence in all aspects of our engineering consultancy services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {values.map((value, index) => {
            const isVisible = visibleValues.includes(index)
            const shouldAnimateProgress = animateProgress.includes(index)

            return (
              <div 
                key={index}
                ref={el => valueRefs.current[index] = el}
              >
                <Card 
                  className={`card-hover h-full transform transition-all duration-700 delay-${index * 100} ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  <div className="p-8 h-full flex flex-col">
                    {/* Icon and Title */}
                    <div className="flex items-center mb-6">
                      <div 
                        className="p-4 rounded-2xl mr-4 transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${value.color}20`, color: value.color }}
                      >
                        {value.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="heading-3 text-xl" style={{ color: value.color }}>
                          {value.title}
                        </h3>
                        {/* Progress Bar */}
                        <div className="mt-3 relative">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-1000 ease-out"
                              style={{ 
                                backgroundColor: value.color,
                                width: shouldAnimateProgress ? `${value.progress}%` : '0%'
                              }}
                            />
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-body-secondary">Commitment Level</span>
                            <span 
                              className="text-sm font-semibold transition-all duration-300"
                              style={{ color: value.color }}
                            >
                              {value.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-body-secondary leading-relaxed mb-6 flex-grow">
                      {value.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-[var(--text-primary)] text-sm uppercase tracking-wider">
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {value.features.map((feature, featureIndex) => (
                          <li 
                            key={featureIndex}
                            className={`flex items-center text-sm text-body-secondary transform transition-all duration-500 delay-${(featureIndex + 1) * 100} ${
                              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                            }`}
                          >
                            <div 
                              className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                              style={{ backgroundColor: value.color }}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div 
                    className="absolute bottom-0 right-0 w-20 h-20 transform rotate-45 translate-x-10 translate-y-10 opacity-5"
                    style={{ backgroundColor: value.color }}
                  />
                </Card>
              </div>
            )
          })}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-16 text-center">
          <Card className="card-elevated bg-gradient-to-br from-[var(--primary-blue)]/5 to-[var(--accent-teal)]/5 border-[var(--accent-teal)]/20">
            <div className="p-12">
              <h3 className="heading-3 mb-6">Experience Our Values in Action</h3>
              <p className="text-large text-body-secondary mb-8 max-w-2xl mx-auto">
                These aren&apos;t just words on a page – they&apos;re the principles that drive every project, 
                every interaction, and every innovation we deliver.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/projects"
                  className="btn-primary px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                >
                  See Our Work
                </Link>
                <Link 
                  href="/contact"
                  className="btn-outline px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                >
                  Start Your Project
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}