import React from 'react'
import { Button } from '@/modules/shared/components/ui'

interface ProjectHeroProps {
  title?: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  onCTAClick?: () => void
  ctaText?: string
  stats?: Array<{
    label: string
    value: string
  }>
  className?: string
}

const ProjectHero: React.FC<ProjectHeroProps> = ({
  title = "Our Projects",
  subtitle = "Engineering Excellence in Action",
  description = "Explore our portfolio of successful engineering projects that demonstrate our commitment to innovation, quality, and client satisfaction.",
  backgroundImage,
  onCTAClick,
  ctaText = "View All Projects",
  stats = [
    { label: "Projects Completed", value: "200+" },
    { label: "Years of Experience", value: "15+" },
    { label: "Client Satisfaction", value: "98%" },
    { label: "Industries Served", value: "12+" }
  ],
  className = '',
}) => {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"
        style={backgroundImage ? {
          backgroundImage: `linear-gradient(rgba(29, 78, 216, 0.8), rgba(67, 56, 202, 0.8)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : {}}
      >
      </div>
      
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {title}
            </h1>
            
            <p className="mt-4 text-xl md:text-2xl text-blue-100 font-medium">
              {subtitle}
            </p>
            
            <p className="mt-6 text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
            
            {onCTAClick && (
              <div className="mt-8">
                <Button
                  onClick={onCTAClick}
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                >
                  {ctaText}
                </Button>
              </div>
            )}
          </div>
          
          {stats && stats.length > 0 && (
            <div className="mt-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-blue-100 text-sm md:text-base font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          className="w-full h-16 text-white" 
          preserveAspectRatio="none" 
          viewBox="0 0 1200 120" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            fill="currentColor"
          />
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            fill="currentColor"
          />
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}

export default ProjectHero