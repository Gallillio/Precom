'use client'
import React, { useState, useEffect, useRef } from 'react'
import { TeamMember } from '@/modules/shared/utils/types'
import { Card, Modal, Button } from '@/modules/shared/components/ui'

interface TeamSectionProps {
  teamMembers: TeamMember[]
  className?: string
}

interface TeamModalProps {
  member: TeamMember | null
  isOpen: boolean
  onClose: () => void
}

const TeamModal: React.FC<TeamModalProps> = ({ member, isOpen, onClose }) => {
  if (!member) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar */}
          {member.avatar && (
            <div className="w-32 h-32 mx-auto md:mx-0 rounded-full overflow-hidden shadow-xl">
              <img 
                src={member.avatar} 
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Details */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="heading-3 mb-2">{member.name}</h3>
            <p className="text-lg font-medium mb-4" style={{ color: 'var(--accent-teal)' }}>
              {member.position}
            </p>
            <p className="text-body-secondary leading-relaxed mb-6">
              {member.bio}
            </p>
            
            {/* Specialties */}
            <div className="mb-6">
              <h4 className="font-semibold text-[var(--text-primary)] mb-3">Areas of Expertise:</h4>
              <div className="flex flex-wrap gap-2">
                {member.specialties.map((specialty, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] text-sm rounded-full border border-[var(--accent-teal)]/20"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Experience */}
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold" style={{ color: 'var(--primary-blue)' }}>
                  {member.experience}+
                </span>
                <span className="ml-2 text-body-secondary">years of experience</span>
              </div>
            </div>
            
            {/* Social Links */}
            {member.socialLinks && (
              <div className="flex gap-4">
                {member.socialLinks.linkedin && (
                  <a 
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline px-4 py-2 text-sm"
                  >
                    LinkedIn
                  </a>
                )}
                {member.socialLinks.github && (
                  <a 
                    href={member.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline px-4 py-2 text-sm"
                  >
                    GitHub
                  </a>
                )}
                {member.email && (
                  <a 
                    href={`mailto:${member.email}`}
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    Contact
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export const TeamSection: React.FC<TeamSectionProps> = ({ teamMembers, className = '' }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [visibleMembers, setVisibleMembers] = useState<number[]>([])
  const memberRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = memberRefs.current.map((ref, index) => {
      if (!ref) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleMembers(prev => [...new Set([...prev, index])])
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

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedMember(null), 300)
  }

  return (
    <section className={`section-padding-lg section-tertiary ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-6">
            Meet Our Expert Team
          </h2>
          <p className="text-large text-body-secondary max-w-3xl mx-auto">
            Our experienced engineers and consultants bring decades of expertise 
            to deliver exceptional results for your projects.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => {
            const isVisible = visibleMembers.includes(index)
            
            return (
              <div 
                key={member.id}
                ref={el => memberRefs.current[index] = el}
                className={`transform transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <Card className="card-hover h-full cursor-pointer group overflow-hidden relative">
                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--accent-teal)]/10 to-transparent rounded-full transform translate-x-8 -translate-y-8 transition-transform duration-300 group-hover:scale-125" />
                  
                  <div className="p-8 text-center h-full flex flex-col relative z-10" onClick={() => handleMemberClick(member)}>
                    {/* Avatar with Creative Hover Effect */}
                    {member.avatar && (
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        {/* Circular Frame */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent-teal)] to-[var(--primary-blue)] p-1 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                          <div className="w-full h-full rounded-full overflow-hidden bg-white">
                            <img 
                              src={member.avatar} 
                              alt={member.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        </div>
                        {/* Animated Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-[var(--accent-teal)]/20 animate-ping group-hover:border-[var(--accent-teal)]/40" />
                      </div>
                    )}
                    
                    {/* Name and Position */}
                    <div className="mb-4">
                      <h3 className="heading-3 text-xl mb-2 group-hover:text-[var(--primary-blue)] transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-lg font-medium" style={{ color: 'var(--accent-teal)' }}>
                        {member.position}
                      </p>
                    </div>
                    
                    {/* Bio */}
                    <p className="text-body-secondary text-sm mb-6 leading-relaxed flex-grow">
                      {member.bio.length > 120 ? `${member.bio.substring(0, 120)}...` : member.bio}
                    </p>
                    
                    {/* Specialties Preview */}
                    {member.specialties.length > 0 && (
                      <div className="mb-6">
                        <div className="flex flex-wrap justify-center gap-2">
                          {member.specialties.slice(0, 2).map((specialty, specIndex) => (
                            <span 
                              key={specIndex}
                              className="px-3 py-1 bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] text-xs rounded-full transition-all duration-300 group-hover:bg-[var(--accent-teal)]/20"
                            >
                              {specialty}
                            </span>
                          ))}
                          {member.specialties.length > 2 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{member.specialties.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Experience Badge */}
                    <div className="mb-6">
                      <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 rounded-full border border-[var(--primary-blue)]/20 transition-all duration-300 group-hover:bg-[var(--primary-blue)]/20 group-hover:border-[var(--primary-blue)]/30">
                        <span className="text-lg font-bold" style={{ color: 'var(--primary-blue)' }}>
                          {member.experience}+
                        </span>
                        <span className="ml-2 text-sm text-body-secondary">years exp.</span>
                      </div>
                    </div>
                    
                    {/* Click to View More */}
                    <div className="text-center">
                      <div className="inline-flex items-center text-sm font-medium transition-all duration-300 group-hover:text-[var(--accent-teal)]" style={{ color: 'var(--primary-blue)' }}>
                        <span>View Full Profile</span>
                        <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Decoration */}
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--primary-blue)]/5 to-transparent rounded-full transform -translate-x-8 translate-y-8 transition-transform duration-300 group-hover:scale-125" />
                </Card>
              </div>
            )
          })}
        </div>
        
        {/* Team Stats */}
        <div className="mt-16">
          <Card className="card-elevated bg-gradient-to-r from-[var(--primary-blue)]/5 to-[var(--accent-teal)]/5 border-[var(--accent-teal)]/20">
            <div className="p-8 sm:p-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--accent-teal)' }}>25+</div>
                  <div className="text-body-secondary font-medium">Expert Engineers</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--primary-blue)' }}>200+</div>
                  <div className="text-body-secondary font-medium">Combined Years</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--success)' }}>50+</div>
                  <div className="text-body-secondary font-medium">Certifications</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--warning)' }}>15+</div>
                  <div className="text-body-secondary font-medium">Disciplines</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Team Member Modal */}
      <TeamModal 
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}