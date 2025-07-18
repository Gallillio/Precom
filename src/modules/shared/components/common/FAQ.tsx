'use client'
import React, { useState } from 'react'
import { Card } from '@/modules/shared/components/ui'

interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

interface FAQProps {
  className?: string
  faqs?: FAQItem[]
  title?: string
  description?: string
  showCategories?: boolean
  variant?: 'default' | 'accordion' | 'grid'
}

const defaultFAQs: FAQItem[] = [
  {
    id: '1',
    question: 'What types of engineering services does Precom provide?',
    answer: 'Precom offers comprehensive engineering consulting services including structural engineering, project management, design review, and engineering consulting. We specialize in commercial, residential, and industrial projects.',
    category: 'Services'
  },
  {
    id: '2',
    question: 'How long does a typical engineering consultation take?',
    answer: 'The duration varies based on project complexity. Initial consultations typically take 1-2 hours, while comprehensive project reviews can take 1-3 weeks. We provide detailed timelines during the initial consultation.',
    category: 'Process'
  },
  {
    id: '3',
    question: 'Do you provide emergency engineering services?',
    answer: 'Yes, we offer emergency engineering services for urgent structural assessments, safety evaluations, and critical project issues. Our team is available 24/7 for emergency consultations.',
    category: 'Services'
  },
  {
    id: '4',
    question: 'What is included in your project management services?',
    answer: 'Our project management services include project planning, timeline development, budget oversight, quality control, stakeholder communication, and risk management. We ensure projects are completed on time and within budget.',
    category: 'Services'
  },
  {
    id: '5',
    question: 'How do you ensure quality in your engineering work?',
    answer: 'We maintain strict quality standards through peer reviews, adherence to industry codes and standards, regular quality audits, and continuous professional development. All our engineers are licensed and experienced.',
    category: 'Quality'
  },
  {
    id: '6',
    question: 'What are your typical project costs?',
    answer: 'Project costs vary based on scope, complexity, and timeline. We provide detailed quotes after initial consultation. Our pricing is competitive and transparent with no hidden fees.',
    category: 'Pricing'
  },
  {
    id: '7',
    question: 'Do you work with other contractors and consultants?',
    answer: 'Absolutely! We collaborate with architects, contractors, other engineers, and consultants to ensure seamless project execution. We believe in teamwork and integrated project delivery.',
    category: 'Process'
  },
  {
    id: '8',
    question: 'What software and tools do you use for engineering analysis?',
    answer: 'We use industry-standard software including AutoCAD, Revit, SAP2000, ETABS, and other specialized engineering tools. Our team stays current with the latest technology and methodologies.',
    category: 'Technology'
  },
  {
    id: '9',
    question: 'How do you handle project changes and modifications?',
    answer: 'We have a structured change management process that includes impact assessment, cost evaluation, and timeline adjustment. All changes are documented and approved before implementation.',
    category: 'Process'
  },
  {
    id: '10',
    question: 'What certifications and licenses do your engineers hold?',
    answer: 'Our engineers hold Professional Engineer (PE) licenses and are members of relevant professional organizations like ASCE, AISC, and ACI. We maintain continuous education and certification requirements.',
    category: 'Qualifications'
  }
]

export const FAQ: React.FC<FAQProps> = ({
  className = '',
  faqs = defaultFAQs,
  title = 'Frequently Asked Questions',
  description = 'Find answers to common questions about our engineering services and processes.',
  showCategories = true,
  variant = 'accordion'
}) => {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category).filter((category): category is string => Boolean(category))))]
  
  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const renderFAQItem = (faq: FAQItem, index: number) => (
    <Card key={faq.id} className="mb-4">
      <div className="p-6">
        <button
          onClick={() => toggleItem(faq.id)}
          className="w-full text-left flex items-center justify-between hover:text-blue-600 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-900 pr-4">
            {faq.question}
          </h3>
          <div className="flex-shrink-0">
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${
                openItems.includes(faq.id) ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        
        {openItems.includes(faq.id) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              {faq.answer}
            </p>
            {faq.category && (
              <div className="mt-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {faq.category}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )

  if (variant === 'grid') {
    return (
      <div className={`${className}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {showCategories && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFAQs.map((faq, index) => (
            <Card key={faq.id} className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
              {faq.category && (
                <div className="mt-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {faq.category}
                  </span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {showCategories && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {filteredFAQs.map((faq, index) => renderFAQItem(faq, index))}
      </div>

      <div className="mt-12 text-center">
        <Card className="p-8 bg-blue-50 border-blue-200">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Can&apos;t find the answer you&apos;re looking for? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Contact Our Team
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}