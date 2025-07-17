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
  icon?: string
}

const CaseStudy: React.FC<CaseStudyProps> = ({
  project,
  className = '',
}) => {
  const caseStudySections: CaseStudySection[] = [
    {
      title: 'Project Overview',
      content: project.description,
      icon: '📋'
    },
    {
      title: 'Challenge',
      content: `This ${project.category.toLowerCase()} project required innovative solutions to meet the client's specific requirements while adhering to industry standards and regulations.`,
      icon: '🎯'
    },
    {
      title: 'Solution',
      content: `Our team implemented a comprehensive approach utilizing advanced engineering principles and cutting-edge technology to deliver exceptional results for ${project.client || 'the client'}.`,
      icon: '💡'
    },
    {
      title: 'Results',
      content: `The project was successfully completed ${project.duration ? `within the ${project.duration} timeframe` : 'on schedule'}, meeting all quality standards and client expectations.`,
      icon: '✅'
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