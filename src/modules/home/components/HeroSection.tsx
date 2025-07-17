import React from 'react'
import { Button } from '@/modules/shared/components/ui'
import { COMPANY_INFO } from '@/modules/shared/utils/constants'

interface HeroSectionProps {
  className?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  return (
    <section className={`bg-gradient-to-br from-blue-50 to-gray-100 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 text-gray-900 mb-6">
              {COMPANY_INFO.name}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {COMPANY_INFO.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                className="w-full sm:w-auto"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}