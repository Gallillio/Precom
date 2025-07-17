import React from 'react'
import { HeroSection, ServicesOverview, CallToAction } from '../components'

export const HomeScreen: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <ServicesOverview />
      <CallToAction />
    </div>
  )
}