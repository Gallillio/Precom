import React from 'react'
import { Metadata } from 'next'
import { ProjectsScreen } from '@/modules/projects'

export const metadata: Metadata = {
  title: 'Projects - Precom Engineering Consultancy',
  description: 'Explore our portfolio of successful engineering projects across structural engineering, project management, consulting, and design review.',
  keywords: ['engineering projects', 'structural engineering', 'project management', 'engineering consulting', 'design review', 'portfolio'],
}

export default function ProjectsPage() {
  return <ProjectsScreen />
}