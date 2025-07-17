import React from 'react'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui'
import { COMPANY_INFO } from '@/modules/shared/utils/constants'

interface CallToActionProps {
  className?: string
}

export const CallToAction: React.FC<CallToActionProps> = ({ className = '' }) => {
  return (
    <section className={`bg-blue-600 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-padding">
          <div className="text-center">
            <h2 className="heading-2 text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your engineering needs and create innovative solutions together
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-50"
              >
                <Link href="/contact">Get Free Quote</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Link href="/projects">View Our Work</Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-blue-100">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-blue-100">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-blue-100">Client Satisfaction</div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-blue-100 mb-2">Need immediate assistance?</p>
              <a 
                href={`tel:${COMPANY_INFO.phone}`}
                className="text-white font-semibold hover:text-blue-100 transition-colors duration-200"
              >
                {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}