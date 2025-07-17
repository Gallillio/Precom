import React from 'react'
import { TeamMember } from '@/modules/shared/utils/types'
import { Card } from '@/modules/shared/components/ui'

interface TeamSectionProps {
  teamMembers: TeamMember[]
  className?: string
}

export const TeamSection: React.FC<TeamSectionProps> = ({ teamMembers, className = '' }) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our experienced engineers and consultants bring decades of expertise 
            to deliver exceptional results for your projects.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
              <div className="p-6">
                {member.avatar && (
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                
                <p className="text-blue-600 font-medium mb-2">
                  {member.position}
                </p>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                
                {member.specialties.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-sm text-gray-500">
                  {member.experience} years experience
                </div>
                
                {member.socialLinks && (
                  <div className="flex justify-center space-x-3 mt-4">
                    {member.socialLinks.linkedin && (
                      <a 
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {member.socialLinks.github && (
                      <a 
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Email
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}