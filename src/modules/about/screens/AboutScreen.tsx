'use client'
import React from 'react'
import Link from 'next/link'
import { TeamSection } from '../components/TeamSection'
import { MissionVision } from '../components/MissionVision'
import { CompanyTimeline } from '../components/CompanyTimeline'
import { ValuesSection } from '../components/ValuesSection'
import { AboutHero } from '../components/AboutHero'
import { TeamMember } from '@/modules/shared/utils/types'

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
      
      <section className="section-padding-lg section-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-2 mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-large mb-12 max-w-2xl mx-auto text-white/90">
            Let&apos;s discuss how our industrial and business consulting expertise can help transform your operations and accelerate growth. 
            Contact us today for a comprehensive business consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/contact"
              className="btn-teal px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Get in Touch
            </Link>
            <Link 
              href="/services"
              className="btn-outline bg-transparent border-white/30 text-white hover:bg-black/20 hover:border-white/50 px-12 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}