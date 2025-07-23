'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Card } from '@/modules/shared/components/ui'

interface MissionVisionProps {
  className?: string
}

export const MissionVision: React.FC<MissionVisionProps> = ({ className = '' }) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => Array.from(new Set([...prev, index])))
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
    <section className={`section-padding-lg ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-6">
            Our Mission & Vision
          </h2>
          <p className="text-large text-body-secondary max-w-3xl mx-auto">
            Driving innovation and excellence in engineering solutions that transform 
            businesses and communities worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* Mission Card */}
          <div 
            ref={el => { cardRefs.current[0] = el; }}
            className={`transform transition-all duration-700 ${
              visibleCards.includes(0) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <Card className="card-hover h-full relative overflow-hidden group">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--accent-teal)]/10 to-transparent rounded-full transform translate-x-8 -translate-y-8 transition-transform duration-300 group-hover:scale-125" />
              
              <div className="p-8 h-full flex flex-col relative z-10">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-[var(--accent-teal)]/10 rounded-2xl flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-[var(--accent-teal)]/20 group-hover:scale-110">
                    <svg className="w-8 h-8" style={{ color: 'var(--accent-teal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="heading-3 text-2xl group-hover:text-[var(--accent-teal)] transition-colors duration-300">Our Mission</h3>
                </div>
                
                <p className="text-body-secondary leading-relaxed mb-8 flex-grow text-lg">
                  To deliver innovative engineering solutions that transform businesses and communities. 
                  We are committed to excellence, sustainability, and creating lasting value for our clients 
                  through cutting-edge technology and expert consulting.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Provide world-class engineering consultation",
                    "Foster innovation and sustainable practices", 
                    "Build long-term partnerships with clients",
                    "Drive positive impact through technology"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start group/item">
                      <div className="w-3 h-3 rounded-full mr-4 mt-2 flex-shrink-0 transition-all duration-300 group/item-hover:scale-125" style={{ backgroundColor: 'var(--accent-teal)' }} />
                      <span className="text-body-secondary group/item-hover:text-[var(--text-primary)] transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          {/* Vision Card */}
          <div 
            ref={el => { cardRefs.current[1] = el; }}
            className={`transform transition-all duration-700 delay-200 ${
              visibleCards.includes(1) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <Card className="card-hover h-full relative overflow-hidden group">
              {/* Background Decoration */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[var(--primary-blue)]/10 to-transparent rounded-full transform -translate-x-8 -translate-y-8 transition-transform duration-300 group-hover:scale-125" />
              
              <div className="p-8 h-full flex flex-col relative z-10">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-[var(--primary-blue)]/10 rounded-2xl flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-[var(--primary-blue)]/20 group-hover:scale-110">
                    <svg className="w-8 h-8" style={{ color: 'var(--primary-blue)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="heading-3 text-2xl group-hover:text-[var(--primary-blue)] transition-colors duration-300">Our Vision</h3>
                </div>
                
                <p className="text-body-secondary leading-relaxed mb-8 flex-grow text-lg">
                  To be the leading engineering consultancy recognized globally for innovation, 
                  reliability, and transformative solutions. We envision a future where our expertise 
                  shapes industries and contributes to a more efficient and sustainable world.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Lead the industry in innovative solutions",
                    "Expand globally while maintaining excellence",
                    "Pioneer sustainable engineering practices", 
                    "Shape the future of engineering consulting"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start group/item">
                      <div className="w-3 h-3 rounded-full mr-4 mt-2 flex-shrink-0 transition-all duration-300 group/item-hover:scale-125" style={{ backgroundColor: 'var(--primary-blue)' }} />
                      <span className="text-body-secondary group/item-hover:text-[var(--text-primary)] transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>

        {/* Principles Overview */}
        <div 
          ref={el => { cardRefs.current[2] = el; }}
          className={`transform transition-all duration-700 delay-400 ${
            visibleCards.includes(2) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <Card className="card-elevated bg-gradient-to-br from-[var(--secondary-gray)] to-white max-w-5xl mx-auto">
            <div className="p-12">
              <h3 className="heading-3 text-center mb-12">Guiding Principles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: (
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: "Excellence",
                    description: "Delivering exceptional quality in every project through rigorous standards and continuous improvement.",
                    color: "var(--success)"
                  },
                  {
                    icon: (
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ),
                    title: "Collaboration", 
                    description: "Working together with clients and partners to achieve shared goals and create mutual success.",
                    color: "var(--primary-blue)"
                  },
                  {
                    icon: (
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    ),
                    title: "Innovation",
                    description: "Pioneering new solutions and technologies to solve complex engineering challenges.",
                    color: "var(--warning)"
                  }
                ].map((principle, index) => (
                  <div key={index} className="text-center group">
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ backgroundColor: `${principle.color}20`, color: principle.color }}
                    >
                      {principle.icon}
                    </div>
                    <h4 className="text-xl font-semibold mb-4 group-hover:text-[var(--primary-blue)] transition-colors duration-300">
                      {principle.title}
                    </h4>
                    <p className="text-body-secondary leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}