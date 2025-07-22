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
    name: 'Dr. Amira Hassan',
    position: 'Principal Automotive Engineer',
    bio: 'With over 15 years of experience in automotive engineering, Amira leads our technical team and ensures the highest standards of vehicle engineering excellence in Egypt.',
    avatar: '/images/team/amira-hassan.jpg',
    email: 'amira.hassan@precom-egypt.com',
    specialties: ['Vehicle Design', 'Powertrain Engineering', 'Electric Vehicles'],
    experience: 15,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/amira-hassan'
    }
  },
  {
    id: '2',
    name: 'Ahmed Mostafa',
    position: 'Automotive Project Manager',
    bio: 'Ahmed brings exceptional project management skills and automotive technical expertise to deliver complex vehicle engineering projects on time and within budget.',
    avatar: '/images/team/ahmed-mostafa.jpg',
    email: 'ahmed.mostafa@precom-egypt.com',
    specialties: ['Automotive Project Management', 'Vehicle Testing', 'Quality Control'],
    experience: 12,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ahmed-mostafa'
    }
  },
  {
    id: '3',
    name: 'Yasmin El-Shamy',
    position: 'Senior Vehicle Design Engineer',
    bio: 'Yasmin specializes in innovative automotive design solutions and sustainable vehicle engineering practices, helping Egyptian clients achieve their environmental goals.',
    avatar: '/images/team/yasmin-elshamy.jpg',
    email: 'yasmin.elshamy@precom-egypt.com',
    specialties: ['Sustainable Vehicle Design', 'Electric Vehicle Systems', 'Aerodynamics'],
    experience: 10,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/yasmin-elshamy'
    }
  },
  {
    id: '4',
    name: 'Omar Farouk',
    position: 'Automotive Technology Lead',
    bio: 'Omar leads our automotive digital transformation initiatives, integrating cutting-edge technology with traditional Egyptian automotive engineering practices.',
    avatar: '/images/team/omar-farouk.jpg',
    email: 'omar.farouk@precom-egypt.com',
    specialties: ['Automotive Digital Systems', 'CAD Modeling', 'Vehicle Automation'],
    experience: 8,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/omar-farouk',
      github: 'https://github.com/omar-farouk'
    }
  },
  {
    id: '5',
    name: 'Nadia Sabry',
    position: 'Automotive Quality Assurance Manager',
    bio: 'Nadia ensures all our automotive projects meet the highest Egyptian and international quality standards through rigorous vehicle testing and comprehensive review processes.',
    avatar: '/images/team/nadia-sabry.jpg',
    email: 'nadia.sabry@precom-egypt.com',
    specialties: ['Automotive Quality Control', 'Egyptian Standards Compliance', 'Vehicle Safety Assessment'],
    experience: 14,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/nadia-sabry'
    }
  },
  {
    id: '6',
    name: 'Mahmoud El-Gazzar',
    position: 'Egyptian Client Relations Director',
    bio: 'Mahmoud manages relationships with Egyptian automotive clients and ensures exceptional service delivery, building long-term partnerships with valued Egyptian automotive companies.',
    avatar: '/images/team/mahmoud-elgazzar.jpg',
    email: 'mahmoud.elgazzar@precom-egypt.com',
    specialties: ['Egyptian Market Relations', 'Automotive Business Development', 'Strategic Planning'],
    experience: 16,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mahmoud-elgazzar'
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
            Let&apos;s discuss how our automotive engineering expertise can help bring your vehicle project to life. 
            Contact us today for an Egyptian automotive consultation.
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
              className="btn-outline bg-transparent border-white/30 text-white hover:bg-black/20 hover:border-white/50 px-12 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
            >
              Our Services
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}