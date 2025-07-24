import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Project } from '@/modules/shared/utils/types'
import { CaseStudy, ProjectGallery } from '@/modules/projects/components'
import { Container, Section } from '@/modules/shared/components/common'
import { Button } from '@/modules/shared/components/ui'

interface ProjectDetailPageProps {
  params: Promise<{
    id: string
  }>
}

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Skyline Tower Complex',
    description: 'A comprehensive structural engineering project for a 40-story residential tower complex featuring innovative seismic resistance design and sustainable building practices. This project involved complex foundation engineering, advanced material selection, and cutting-edge construction methodologies to ensure structural integrity while maintaining environmental sustainability standards.',
    shortDescription: 'Structural engineering for a 40-story residential tower with innovative seismic resistance.',
    category: 'Structural Engineering',
    tags: ['High-rise', 'Seismic Design', 'Residential', 'Sustainable'],
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
        alt: 'Skyline Tower Complex exterior view',
        isPrimary: true,
        caption: 'Completed tower showcasing modern architectural design'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
        alt: 'Tower under construction',
        isPrimary: false,
        caption: 'Construction phase showing structural framework'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1590725175207-5d72a68b7e9c?w=600&h=400&fit=crop',
        alt: 'Interior structural details',
        isPrimary: false,
        caption: 'Interior view of advanced structural systems'
      },
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&h=400&fit=crop',
        alt: 'Foundation engineering',
        isPrimary: false,
        caption: 'Deep foundation system installation'
      }
    ],
    client: 'Metropolitan Development Corp',
    duration: '18 months',
    budget: '2.5M EGP',
    status: 'completed',
    featured: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-06-30')
  },
  {
    id: '2',
    title: 'Industrial Bridge Infrastructure',
    description: 'Design and project management for a steel truss bridge connecting two industrial facilities, featuring load optimization and environmental impact assessment. The project required detailed structural analysis, material optimization, and coordination with multiple stakeholders to ensure seamless integration with existing infrastructure.',
    shortDescription: 'Steel truss bridge design connecting industrial facilities with optimized load capacity.',
    category: 'Project Management',
    tags: ['Bridge Design', 'Industrial', 'Steel Structure', 'Environmental'],
    images: [
      {
        id: '5',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        alt: 'Industrial bridge spanning between facilities',
        isPrimary: true,
        caption: 'Completed bridge connecting industrial facilities'
      },
      {
        id: '6',
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
        alt: 'Bridge construction progress',
        isPrimary: false,
        caption: 'Steel truss assembly in progress'
      }
    ],
    client: 'TechCorp Industries',
    duration: '12 months',
    budget: '1.8M EGP',
    status: 'completed',
    featured: false,
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: '3',
    title: 'Smart City Infrastructure Review',
    description: 'Comprehensive engineering consulting and design review for smart city infrastructure including traffic management systems, utilities integration, and public safety enhancements. This ongoing project involves coordination with multiple city departments and technology vendors to ensure seamless integration of smart systems.',
    shortDescription: 'Consulting and design review for smart city infrastructure and utilities integration.',
    category: 'Engineering Consulting',
    tags: ['Smart City', 'Infrastructure', 'Traffic Management', 'Utilities'],
    images: [
      {
        id: '7',
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        alt: 'Smart city infrastructure overview',
        isPrimary: true,
        caption: 'Modern city infrastructure with integrated smart systems'
      }
    ],
    client: 'City Planning Department',
    duration: '24 months',
    budget: '3.2M EGP',
    status: 'in-progress',
    featured: true,
    createdAt: new Date('2023-08-10'),
    updatedAt: new Date('2024-12-01')
  }
]

async function getProject(id: string): Promise<Project | null> {
  return sampleProjects.find(project => project.id === id) || null
}

export async function generateStaticParams() {
  return sampleProjects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const project = await getProject(id)
  
  if (!project) {
    return {
      title: 'Project Not Found - Precom',
      description: 'The requested project could not be found.',
    }
  }

  const primaryImage = project.images.find(img => img.isPrimary)

  return {
    title: `${project.title} - Precom Engineering Projects`,
    description: project.shortDescription,
    keywords: project.tags,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: primaryImage ? [primaryImage.url] : [],
      type: 'article',
    },
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Section className="bg-white" padding="xl">
        <Container>
          <div className="mb-8">
            <Link href="/projects">
              <Button
                variant="outline"
                className="mb-6"
              >
                ← Back to Projects
              </Button>
            </Link>
          </div>

          <CaseStudy project={project} />
        </Container>
      </Section>

      <Section className="bg-white" padding="lg">
        <Container>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Project Gallery
            </h2>
            <p className="text-gray-600">
              Visual documentation of the project from planning to completion
            </p>
          </div>

          <ProjectGallery 
            images={project.images}
            projectTitle={project.title}
          />
        </Container>
      </Section>

      <Section className="bg-gray-50" padding="lg">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Interested in Similar Projects?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contact us to discuss how we can help with your engineering project needs
            </p>
            <div className="space-x-4">
              <Link href="/contact">
                <Button>
                  Get in Touch
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline">
                  View More Projects
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}