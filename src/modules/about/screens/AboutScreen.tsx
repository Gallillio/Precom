'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { TeamSection } from '../components/TeamSection'
import { MissionVision } from '../components/MissionVision'
import { CompanyTimeline } from '../components/CompanyTimeline'
import { ValuesSection } from '../components/ValuesSection'
import { AboutHero } from '../components/AboutHero'
import { TeamMember } from '@/modules/shared/utils/types'

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

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Amira Hassan',
    position: 'Chief Executive Officer',
    bio: 'With over 15 years of experience in industrial and business consulting, Amira leads our strategic direction and ensures the highest standards of consulting excellence across all service areas.',
    avatar: '/images/team/Amira Hassan (Chief Executive Officer).png',
    email: 'amira.hassan@precom-egypt.com',
    specialties: ['Strategic Leadership', 'Business Transformation', 'Industrial Consulting'],
    experience: 15,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/amira-hassan'
    }
  },
  {
    id: '2',
    name: 'Ahmed Mostafa',
    position: 'Head of Technology Operations',
    bio: 'Ahmed brings exceptional technical expertise and operational excellence to transform manufacturing facilities through IoT integration, automation systems, and digital optimization.',
    avatar: '/images/team/Ahmed Mostafa (Head of Technology Operations).png',
    email: 'ahmed.mostafa@precom-egypt.com',
    specialties: ['Technology Operations', 'IoT Integration', 'Process Automation'],
    experience: 12,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ahmed-mostafa'
    }
  },
  {
    id: '3',
    name: 'Omar Farouk',
    position: 'Strategic Consulting Director',
    bio: 'Omar leads our strategic consulting initiatives, helping organizations achieve business transformation through comprehensive market analysis, organizational design, and growth strategies.',
    avatar: '/images/team/Omar Farouk (Strategic Consulting Director).png',
    email: 'omar.farouk@precom-egypt.com',
    specialties: ['Strategic Planning', 'Business Analysis', 'Market Expansion'],
    experience: 10,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/omar-farouk'
    }
  }
]

export const AboutScreen: React.FC = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <CompanyTimeline />
      <MissionVision />
      <ValuesSection />
      <TeamSection teamMembers={teamMembers} />
      
      <section className="section-padding-lg">
        <div className="container mx-auto px-4 text-center">
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
                <Link href="/projects">
                  <button className="group px-8 py-4 bg-[var(--primary-blue)] text-white rounded-xl font-semibold text-lg hover:bg-[var(--accent-teal)] transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <span>View All Projects</span>
                    <svg className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>
                <Link href="/contact">
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
      </section>
    </div>
  )
}