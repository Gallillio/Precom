"use client"

import React, { useState, useEffect } from 'react'
import { HeroSection, ServicesOverview, StatsSection, ProjectShowcase } from '../components'
import { ContentLoader } from '@/modules/shared/components/common'

export const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Allow time for animations and content to initialize
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section Skeleton */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-lg mb-6 max-w-4xl mx-auto"></div>
                <div className="h-6 bg-gray-200 rounded-lg mb-4 max-w-3xl mx-auto"></div>
                <div className="h-6 bg-gray-200 rounded-lg mb-8 max-w-2xl mx-auto"></div>
                <div className="h-12 bg-gray-200 rounded-lg max-w-xs mx-auto"></div>
              </div>
            </div>
            
            {/* Hero Images Grid Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-48 md:h-64"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section Skeleton */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg mb-4 max-w-2xl mx-auto"></div>
              <div className="h-6 bg-gray-200 rounded-lg max-w-3xl mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-xl p-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Loading Component */}
        <ContentLoader text="Loading home content..." />
      </div>
    )
  }

  return (
    <div>
      <HeroSection />
      <ServicesOverview />
      <StatsSection />
      <ProjectShowcase />
    </div>
  )
}