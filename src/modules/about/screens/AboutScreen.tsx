import React from 'react'
import { TeamSection } from '../components/TeamSection'
import { MissionVision } from '../components/MissionVision'
import { CompanyStory } from '../components/CompanyStory'
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
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Precom
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a leading engineering consultancy dedicated to delivering innovative, 
            sustainable, and reliable solutions for complex engineering challenges. 
            Our expertise spans across multiple disciplines, ensuring comprehensive 
            support for all your engineering needs.
          </p>
        </div>
      </div>

      <CompanyStory />
      <MissionVision />
      <TeamSection teamMembers={teamMembers} />
      
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how our engineering expertise can help bring your project to life. 
            Contact us today for a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get in Touch
            </a>
            <a 
              href="/services"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Our Services
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}