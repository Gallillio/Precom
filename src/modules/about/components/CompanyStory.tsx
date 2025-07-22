import React from 'react'
import { Card } from '@/modules/shared/components/ui'

interface CompanyStoryProps {
  className?: string
}

export const CompanyStory: React.FC<CompanyStoryProps> = ({ className = '' }) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-lg text-gray-600">
              From humble beginnings to industry leadership
            </p>
          </div>

          <div className="space-y-12">
            <Card>
              <div className="p-8">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="lg:w-1/3">
                    <div className="text-blue-600 font-bold text-lg mb-2">Founded 2012</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Egyptian Automotive Vision</h3>
                  </div>
                  <div className="lg:w-2/3">
                    <p className="text-gray-600 leading-relaxed">
                      Precom was founded with a simple yet ambitious vision: to bridge the gap between 
                      traditional automotive engineering practices and cutting-edge vehicle technology. Our founders, 
                      seasoned automotive engineers with decades of vehicle development experience, recognized the need for a 
                      specialized automotive consultancy that could deliver both innovation and reliability in vehicle engineering.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-8">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="lg:w-1/3">
                    <div className="text-green-600 font-bold text-lg mb-2">2015 - 2020</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Egyptian Market Leadership</h3>
                  </div>
                  <div className="lg:w-2/3">
                    <p className="text-gray-600 leading-relaxed">
                      As our automotive reputation grew, so did our team and vehicle engineering capabilities. We expanded our 
                      automotive service offerings to include electric vehicle development, autonomous driving systems, 
                      and advanced automotive manufacturing solutions. During this period, we successfully 
                      developed over 150 vehicles across the Egyptian automotive market.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-8">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="lg:w-1/3">
                    <div className="text-purple-600 font-bold text-lg mb-2">2020 - Present</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Egyptian Automotive Innovation</h3>
                  </div>
                  <div className="lg:w-2/3">
                    <p className="text-gray-600 leading-relaxed">
                      Today, Precom stands as a leader in automotive engineering consultancy, known for our 
                      innovative vehicle approaches and commitment to automotive excellence. We&apos;ve embraced emerging 
                      automotive technologies like AI-powered vehicle systems, connected car IoT, and electric vehicle solutions, helping our 
                      automotive clients stay ahead of the curve in a rapidly evolving automotive landscape.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-16">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Journey in Numbers</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
                    <div className="text-gray-600">Vehicles Developed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">35+</div>
                    <div className="text-gray-600">Egyptian Clients</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
                    <div className="text-gray-600">Automotive Engineers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">12+</div>
                    <div className="text-gray-600">Years in Egypt</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Looking Forward</h3>
                <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  As we continue to grow, our commitment remains unchanged: to deliver exceptional 
                  automotive engineering solutions that drive vehicle innovation and create lasting value. We&apos;re excited 
                  about the automotive future and the opportunity to partner with forward-thinking automotive organizations 
                  to tackle tomorrow&apos;s vehicle challenges today.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}