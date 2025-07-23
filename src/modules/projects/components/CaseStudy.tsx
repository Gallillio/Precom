import React from 'react'
import { Project } from '@/modules/shared/utils/types'
import { Card } from '@/modules/shared/components/ui'

interface CaseStudyProps {
  project: Project
  className?: string
}

interface CaseStudySection {
  title: string
  content: string
  icon?: React.ReactNode
}

const CaseStudy: React.FC<CaseStudyProps> = ({
  project,
  className = '',
}) => {
  const caseStudySections: CaseStudySection[] = [
    {
      title: 'Project Overview',
      content: project.description,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: 'Challenge',
      content: `This ${project.category.toLowerCase()} project required innovative solutions to meet the client's specific requirements while adhering to industry standards and regulations.`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Solution',
      content: `Our team implemented a comprehensive approach utilizing advanced engineering principles and cutting-edge technology to deliver exceptional results for ${project.client || 'the client'}.`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Results',
      content: `The project was successfully completed ${project.duration ? `within the ${project.duration} timeframe` : 'on schedule'}, meeting all quality standards and client expectations.`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  const keyMetrics = [
    { label: 'Project Status', value: project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ') },
    { label: 'Category', value: project.category },
    { label: 'Duration', value: project.duration || 'Not specified' },
    { label: 'Client', value: project.client || 'Confidential' },
  ]

  return (
    <div className={`space-y-8 ${className}`}>
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50" padding="lg">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {project.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {project.shortDescription}
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="text-center" padding="md">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {metric.label}
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {metric.value}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        {caseStudySections.map((section, index) => (
          <Card key={index} padding="lg">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{section.icon}</span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {section.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-50" padding="lg">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Project Technologies & Methodologies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Structural Analysis',
              'CAD Design',
              'Project Management',
              'Quality Assurance',
              'Risk Assessment',
              'Regulatory Compliance',
              'Client Coordination',
              'Documentation'
            ].map((tech, index) => (
              <div key={index} className="bg-white rounded-lg p-3 text-center shadow-sm">
                <span className="text-sm font-medium text-gray-700">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {project.budget && (
        <Card className="border-l-4 border-l-green-500" padding="lg">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">$</span>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Project Investment</h4>
              <p className="text-gray-600">Budget: {project.budget}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default CaseStudy