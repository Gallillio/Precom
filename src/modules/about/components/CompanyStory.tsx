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
                    <div className="text-blue-600 font-bold text-lg mb-2">Founded 2010</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">The Beginning</h3>
                  </div>
                  <div className="lg:w-2/3">
                    <p className="text-gray-600 leading-relaxed">
                      Precom was founded with a simple yet ambitious vision: to bridge the gap between 
                      traditional engineering practices and cutting-edge technology. Our founders, 
                      seasoned engineers with decades of experience, recognized the need for a 
                      consultancy that could deliver both innovation and reliability.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-8">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="lg:w-1/3">
                    <div className="text-green-600 font-bold text-lg mb-2">2015 - 2018</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Growth & Expansion</h3>
                  </div>
                  <div className="lg:w-2/3">
                    <p className="text-gray-600 leading-relaxed">
                      As our reputation grew, so did our team and capabilities. We expanded our 
                      service offerings to include digital transformation, sustainable engineering 
                      solutions, and advanced automation systems. During this period, we successfully 
                      completed over 200 projects across various industries.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-8">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="lg:w-1/3">
                    <div className="text-purple-600 font-bold text-lg mb-2">2019 - Present</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation Leadership</h3>
                  </div>
                  <div className="lg:w-2/3">
                    <p className="text-gray-600 leading-relaxed">
                      Today, Precom stands as a leader in engineering consultancy, known for our 
                      innovative approaches and commitment to excellence. We&apos;ve embraced emerging 
                      technologies like AI, IoT, and sustainable energy solutions, helping our 
                      clients stay ahead of the curve in an rapidly evolving technological landscape.
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
                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                    <div className="text-gray-600">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
                    <div className="text-gray-600">Happy Clients</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
                    <div className="text-gray-600">Expert Engineers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
                    <div className="text-gray-600">Years of Excellence</div>
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
                  engineering solutions that drive innovation and create lasting value. We&apos;re excited 
                  about the future and the opportunity to partner with forward-thinking organizations 
                  to tackle tomorrow&apos;s challenges today.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}