'use client'
import React, { useState } from 'react'
import { Card } from '@/modules/shared/components/ui'

interface TabContent {
  id: string
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
  details?: {
    duration?: string
    complexity?: string
    expertise?: string
  }
}

interface ServiceTabsProps {
  serviceId: string
  serviceTitle: string
  tabs: TabContent[]
  className?: string
}

export const ServiceTabs: React.FC<ServiceTabsProps> = ({
  serviceId,
  serviceTitle,
  tabs,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')

  const activeTabContent = tabs.find(tab => tab.id === activeTab) || tabs[0]

  return (
    <div className={`${className}`}>
      <Card className="overflow-hidden">
        {/* Tab Headers */}
        <div className="border-b border-[var(--border)]">
          <div className="p-6 pb-0">
            <h3 className="heading-3 text-xl mb-4">
              {serviceTitle} Specializations
            </h3>
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-[var(--accent-teal)] text-white shadow-md transform scale-105'
                      : 'bg-[var(--secondary-gray)] text-[var(--text-secondary)] hover:bg-[var(--accent-teal)]/10 hover:text-[var(--accent-teal)]'
                  }`}
                >
                  <div className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : ''}`}>
                    {tab.icon}
                  </div>
                  <span className="text-sm">{tab.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: `var(--accent-teal)20`,
                      color: 'var(--accent-teal)'
                    }}
                  >
                    {activeTabContent.icon}
                  </div>
                  <div>
                    <h4 className="heading-3 text-lg">{activeTabContent.title}</h4>
                    <p className="text-sm text-body-secondary">Specialized {serviceTitle.toLowerCase()} service</p>
                  </div>
                </div>
                
                <p className="text-body-secondary leading-relaxed text-lg mb-6">
                  {activeTabContent.description}
                </p>
              </div>

              {/* Features Grid */}
              <div>
                <h5 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Key Capabilities
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeTabContent.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-[var(--secondary-gray)] rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-[var(--accent-teal)] flex-shrink-0" />
                      <span className="text-sm text-[var(--text-primary)]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Service Details */}
                {activeTabContent.details && (
                  <div className="bg-gradient-to-br from-[var(--primary-blue)]/5 to-[var(--accent-teal)]/5 rounded-xl p-6 border border-[var(--accent-teal)]/20">
                    <h5 className="font-semibold mb-4" style={{ color: 'var(--primary-blue)' }}>
                      Service Details
                    </h5>
                    <div className="space-y-4">
                      {activeTabContent.details.duration && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-body-secondary">Typical Duration:</span>
                          <span className="text-sm font-medium">{activeTabContent.details.duration}</span>
                        </div>
                      )}
                      {activeTabContent.details.complexity && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-body-secondary">Complexity Level:</span>
                          <span className="text-sm font-medium">{activeTabContent.details.complexity}</span>
                        </div>
                      )}
                      {activeTabContent.details.expertise && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-body-secondary">Expertise Required:</span>
                          <span className="text-sm font-medium">{activeTabContent.details.expertise}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white border border-[var(--border)] rounded-xl p-4">
                  <h5 className="font-semibold mb-4">Quick Actions</h5>
                  <div className="space-y-3">
                    <button 
                      onClick={() => window.location.href = `/contact?service=${encodeURIComponent(activeTabContent.title)}`}
                      className="btn-primary w-full text-sm py-3"
                    >
                      Request Quote
                    </button>
                    <button 
                      onClick={() => window.location.href = '/contact'}
                      className="btn-outline w-full text-sm py-3"
                    >
                      Schedule Consultation
                    </button>
                  </div>
                </div>

                {/* Related Services */}
                <div className="bg-[var(--secondary-gray)] rounded-xl p-4">
                  <h5 className="font-semibold mb-3">Related Services</h5>
                  <div className="space-y-2">
                    {tabs
                      .filter(tab => tab.id !== activeTab)
                      .slice(0, 2)
                      .map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className="w-full text-left p-3 bg-white rounded-lg hover:bg-[var(--accent-teal)]/5 hover:border-[var(--accent-teal)]/20 border border-transparent transition-all duration-300 flex items-center gap-3"
                        >
                          <div className="w-6 h-6 text-[var(--text-secondary)]">
                            {tab.icon}
                          </div>
                          <span className="text-sm font-medium">{tab.title}</span>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}