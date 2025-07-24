'use client'
import React from 'react'

interface ProjectHeroProps {
  title?: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  backgroundImages?: string[]
  onCTAClick?: () => void
  ctaText?: string
  stats?: Array<{
    label: string
    value: string
  }>
  className?: string
}

const ProjectHero: React.FC<ProjectHeroProps> = ({
  title = "Engineering Portfolio",
  subtitle = "OUR PROJECTS",
  description = "Discover our comprehensive portfolio of successful automotive engineering projects that demonstrate technical expertise, innovative solutions, and commitment to client success.",
  className = ''
}) => {
  return (
    <section className={`bg-white pt-32 pb-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wider text-[#003366] mb-8">
            {subtitle}
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#003366] leading-tight max-w-4xl mx-auto mb-8">
            Engineering 
            <span className="text-[#00B4A6]"> Portfolio</span>
          </h1>
          
          <p className="text-xl text-[#003366]/70 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProjectHero