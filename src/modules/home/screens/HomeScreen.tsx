import React from 'react'
import { HeroSection, ServicesOverview, StatsSection, ProjectShowcase } from '../components'

export const HomeScreen: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <ServicesOverview />
      <StatsSection />
      <ProjectShowcase />
    </div>
  )
}