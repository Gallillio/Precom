'use client'
import React from 'react'
import { TeamSection } from '../components/TeamSection'
import { MissionVision } from '../components/MissionVision'
import { CompanyTimeline } from '../components/CompanyTimeline'
import { ValuesSection } from '../components/ValuesSection'
import { AboutHero } from '../components/AboutHero'
import { TeamMember } from '@/modules/shared/utils/types'

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Principal Engineer',
    bio: 'With over 15 years of experience in structural engineering, Sarah leads our technical team and ensures the highest standards of engineering excellence.',
    avatar: '/images/team/sarah-johnson.jpg',
    email: 'sarah.johnson@precom.com',
    specialties: ['Structural Design', 'Seismic Analysis', 'Steel Structures'],
    experience: 15,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarah-johnson'
    }
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'Project Manager',
    bio: 'Michael brings exceptional project management skills and technical expertise to deliver complex engineering projects on time and within budget.',
    avatar: '/images/team/michael-chen.jpg',
    email: 'michael.chen@precom.com',
    specialties: ['Project Management', 'Construction Administration', 'Quality Control'],
    experience: 12,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/michael-chen'
    }
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    position: 'Senior Design Engineer',
    bio: 'Emily specializes in innovative design solutions and sustainable engineering practices, helping clients achieve their environmental goals.',
    avatar: '/images/team/emily-rodriguez.jpg',
    email: 'emily.rodriguez@precom.com',
    specialties: ['Sustainable Design', 'LEED Consulting', 'MEP Systems'],
    experience: 10,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/emily-rodriguez'
    }
  },
  {
    id: '4',
    name: 'David Kim',
    position: 'Technology Lead',
    bio: 'David leads our digital transformation initiatives, integrating cutting-edge technology with traditional engineering practices.',
    avatar: '/images/team/david-kim.jpg',
    email: 'david.kim@precom.com',
    specialties: ['Digital Engineering', 'BIM Modeling', 'Automation Systems'],
    experience: 8,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/david-kim',
      github: 'https://github.com/david-kim'
    }
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    position: 'Quality Assurance Manager',
    bio: 'Lisa ensures all our projects meet the highest quality standards through rigorous testing and comprehensive review processes.',
    avatar: '/images/team/lisa-thompson.jpg',
    email: 'lisa.thompson@precom.com',
    specialties: ['Quality Control', 'Standards Compliance', 'Risk Assessment'],
    experience: 14,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/lisa-thompson'
    }
  },
  {
    id: '6',
    name: 'Robert Wilson',
    position: 'Client Relations Director',
    bio: 'Robert manages client relationships and ensures exceptional service delivery, building long-term partnerships with our valued clients.',
    avatar: '/images/team/robert-wilson.jpg',
    email: 'robert.wilson@precom.com',
    specialties: ['Client Management', 'Business Development', 'Strategic Planning'],
    experience: 16,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/robert-wilson'
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
            Let&apos;s discuss how our engineering expertise can help bring your project to life. 
            Contact us today for a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/contact"
              className="btn-teal px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Get in Touch
            </a>
            <a 
              href="/services"
              className="btn-outline bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-12 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
            >
              Our Services
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}