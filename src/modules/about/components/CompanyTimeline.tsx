'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Card } from '@/modules/shared/components/ui'

interface TimelineItem {
  year: string
  title: string
  description: string
  color: string
  icon: React.ReactNode
  achievements?: string[]
}

interface CompanyTimelineProps {
  className?: string
}

export const CompanyTimeline: React.FC<CompanyTimelineProps> = ({ className = '' }) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const timelineData: TimelineItem[] = [
    {
      year: "2010",
      title: "The Foundation",
      description: "Precom was founded with a vision to bridge traditional engineering practices with cutting-edge technology. Our founders brought together decades of experience to create a consultancy focused on innovation and reliability.",
      color: "var(--accent-teal)",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      achievements: ["Established core engineering principles", "Assembled founding team of 5 experts", "Secured first major infrastructure project"]
    },
    {
      year: "2013",
      title: "First Expansion",
      description: "Growing demand led to our first major expansion. We doubled our team size and established specialized divisions for structural, mechanical, and electrical engineering services.",
      color: "var(--primary-blue)",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      achievements: ["Team grew to 12 professionals", "Opened second office location", "Launched digital design services"]
    },
    {
      year: "2016",
      title: "Innovation Drive", 
      description: "We embraced digital transformation, incorporating BIM modeling, AI-assisted design, and sustainable engineering solutions. This period marked our evolution into a technology-forward consultancy.",
      color: "var(--success)",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      achievements: ["Implemented BIM technology across all projects", "Achieved LEED certification expertise", "Launched sustainability consulting division"]
    },
    {
      year: "2019",
      title: "Global Reach",
      description: "International expansion brought Precom to new markets across 25 countries. We established partnerships with leading construction firms and completed our most ambitious projects to date.",
      color: "var(--warning)",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      achievements: ["Expanded to 25+ countries", "Completed 100+ international projects", "Established global partnership network"]
    },
    {
      year: "2022",
      title: "Industry Leadership",
      description: "Today, Precom stands as an industry leader in engineering consultancy, known for innovative approaches, cutting-edge technology integration, and unwavering commitment to excellence.",
      color: "var(--primary-blue)",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      achievements: ["Reached 500+ completed projects", "Won 'Engineering Firm of the Year'", "Launched AI-powered design tools"]
    }
  ]

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => Array.from(new Set([...prev, index])))
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
    <section className={`section-padding-lg section-secondary ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-6">Our Journey Through Time</h2>
          <p className="text-large text-body-secondary max-w-3xl mx-auto">
            From humble beginnings to industry leadership, discover the milestones that shaped Precom into the innovative engineering consultancy we are today.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[var(--accent-teal)] via-[var(--primary-blue)] to-[var(--success)] rounded-full" />

          {/* Timeline Items */}
          <div className="space-y-24">
            {timelineData.map((item, index) => {
              const isVisible = visibleItems.includes(index)
              const isLeft = index % 2 === 0

              return (
                <div 
                  key={index}
                  ref={el => { itemRefs.current[index] = el; }}
                  className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Timeline Dot */}
                  <div 
                    className={`absolute left-1/2 transform -translate-x-1/2 z-20 w-16 h-16 rounded-full border-4 border-white shadow-lg transition-all duration-700 ${
                      isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                    style={{ backgroundColor: item.color }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${isLeft ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <Card 
                      className={`card-hover relative overflow-hidden transform transition-all duration-700 delay-200 ${
                        isVisible 
                          ? `translate-x-0 opacity-100` 
                          : `${isLeft ? '-translate-x-8' : 'translate-x-8'} opacity-0`
                      }`}
                    >
                      {/* Year Badge */}
                      <div 
                        className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} px-6 py-2 text-white font-bold text-lg rounded-bl-lg ${isLeft ? 'rounded-br-none' : 'rounded-br-lg rounded-bl-none'}`}
                        style={{ backgroundColor: item.color }}
                      >
                        {item.year}
                      </div>

                      <div className="p-8 pt-16">
                        <h3 className="heading-3 mb-4" style={{ color: item.color }}>
                          {item.title}
                        </h3>
                        <p className="text-body-secondary mb-6 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Achievements */}
                        {item.achievements && (
                          <div className="space-y-3">
                            <h4 className="font-semibold text-[var(--text-primary)] text-sm uppercase tracking-wider">
                              Key Achievements:
                            </h4>
                            <ul className="space-y-2">
                              {item.achievements.map((achievement, achievementIndex) => (
                                <li 
                                  key={achievementIndex}
                                  className={`flex items-center text-sm text-body-secondary transform transition-all duration-500 delay-${(achievementIndex + 1) * 100} ${
                                    isVisible ? 'translate-x-0 opacity-100' : `${isLeft ? '-translate-x-4' : 'translate-x-4'} opacity-0`
                                  }`}
                                >
                                  <div 
                                    className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                                    style={{ backgroundColor: item.color }}
                                  />
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Decorative Corner */}
                      <div 
                        className={`absolute ${isLeft ? 'bottom-0 left-0' : 'bottom-0 right-0'} w-24 h-24 transform rotate-45 -translate-x-12 translate-y-12 opacity-10`}
                        style={{ backgroundColor: item.color }}
                      />
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Timeline End Dot */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[var(--success)] rounded-full border-4 border-white shadow-lg" />
        </div>
      </div>
    </section>
  )
}