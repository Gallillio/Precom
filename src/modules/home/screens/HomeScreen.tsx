import React from 'react'
import { HeroSection, ServicesOverview, StatsSection, ProjectShowcase, CallToAction } from '../components'

export const HomeScreen: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <ServicesOverview />
      <StatsSection />
      <ProjectShowcase />
      <CallToAction />
    </div>
  )
}