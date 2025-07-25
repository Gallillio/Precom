'use client'
import React, { useState, useEffect } from 'react'
import { ServiceHero } from '../components/ServiceHero'
import { ServicesSidebar } from '../components/ServicesSidebar'
import { AlternatingServiceLayout } from '../components/AlternatingServiceLayout'
import { BeforeAfterSlider } from '../components/BeforeAfterSlider'
import { ServiceFeatures } from '../components/ServiceFeatures'
import { Card, Button } from '@/modules/shared/components/ui'
import Link from 'next/link'

// Comprehensive industrial and business services data
const servicesData = [
  {
    id: 'technology-operations',
    title: 'Technology Operations',
    subtitle: 'Optimizing Industrial Operations',
    description: 'Complete factory operations optimization, manufacturing technology implementation, and industrial process management services to enhance productivity and efficiency.',
    image: '/images/services/Technology Operations Service.png',
    features: [
      {
        title: 'Factory Optimization',
        description: 'Manufacturing process improvement and automation implementation',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        )
      },
      {
        title: 'Industrial Technology',
        description: 'Advanced manufacturing systems and equipment integration',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
        )
      },
      {
        title: 'Process Management',
        description: 'Workflow optimization and quality control systems',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )
      },
      {
        title: 'Performance Monitoring',
        description: 'KPI tracking and operational efficiency assessment',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      }
    ],
    stats: [
      { label: 'Efficiency Improvement', value: '35%' },
      { label: 'Factories Optimized', value: '50+' },
      { label: 'Cost Reduction', value: '25%' }
    ]
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain Management',
    subtitle: 'Streamlining Operations',
    description: 'End-to-end supply chain optimization, logistics planning, procurement strategies, and distribution management to ensure efficient operations and cost reduction.',
    image: '/images/services/Supply Chain Management Service.png',
    features: [
      {
        title: 'Logistics Planning',
        description: 'Strategic distribution and transportation optimization',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: 'Procurement Strategy',
        description: 'Vendor management and cost-effective sourcing solutions',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        )
      },
      {
        title: 'Inventory Management',
        description: 'Stock optimization and demand forecasting',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        )
      },
      {
        title: 'Distribution Networks',
        description: 'Efficient delivery systems and network optimization',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
          </svg>
        )
      }
    ],
    stats: [
      { label: 'Cost Savings', value: '30%' },
      { label: 'Supply Chains Optimized', value: '40+' },
      { label: 'Delivery Improvement', value: '45%' }
    ]
  },
  {
    id: 'feasibility-studies',
    title: 'Feasibility Studies',
    subtitle: 'Strategic Project Assessment',
    description: 'Comprehensive technical, financial, and economic analysis to assess project viability, investment potential, and strategic decision-making support.',
    image: '/images/services/Feasibility Studies Service.png',
    features: [
      {
        title: 'Technical Analysis',
        description: 'Engineering feasibility and technical requirements assessment',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
      },
      {
        title: 'Financial Modeling',
        description: 'Investment analysis, ROI calculations, and cost-benefit assessment',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )
      },
      {
        title: 'Economic Impact',
        description: 'Market analysis and economic viability assessment',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )
      },
      {
        title: 'Risk Assessment',
        description: 'Project risk identification and mitigation strategies',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      }
    ],
    stats: [
      { label: 'Studies Completed', value: '120+' },
      { label: 'Investment Assessed', value: '$500M+' },
      { label: 'Success Rate', value: '95%' }
    ]
  },
  {
    id: 'tender-services',
    title: 'Tender Services',
    subtitle: 'Professional Tender Management',
    description: 'Comprehensive tender preparation, documentation, and submission support services to maximize your chances of winning contracts and securing business opportunities.',
    image: '/images/services/Tender Services.png',
    features: [
      {
        title: 'Tender Preparation',
        description: 'Professional bid document preparation and strategy development',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      },
      {
        title: 'Documentation Support',
        description: 'Technical specifications and compliance documentation',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        )
      },
      {
        title: 'Compliance Review',
        description: 'Regulatory compliance and quality assurance verification',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: 'Submission Management',
        description: 'Timely submission and follow-up management',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      }
    ],
    stats: [
      { label: 'Tenders Prepared', value: '200+' },
      { label: 'Success Rate', value: '75%' },
      { label: 'Value Won', value: '$250M+' }
    ]
  },
  {
    id: 'training-development',
    title: 'Training & Development',
    subtitle: 'Building Organizational Capacity',
    description: 'Comprehensive employee training programs, skills development initiatives, and technical capacity building to enhance workforce capabilities and organizational performance.',
    image: '/images/services/Training & Development Service.png',
    features: [
      {
        title: 'Technical Training',
        description: 'Specialized technical skills development and certification programs',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      },
      {
        title: 'Leadership Development',
        description: 'Management and leadership skills enhancement programs',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      },
      {
        title: 'Skills Assessment',
        description: 'Competency evaluation and skills gap analysis',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        )
      },
      {
        title: 'Custom Programs',
        description: 'Tailored training solutions for specific organizational needs',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
        )
      }
    ],
    stats: [
      { label: 'Employees Trained', value: '2,500+' },
      { label: 'Training Programs', value: '150+' },
      { label: 'Satisfaction Rate', value: '98%' }
    ]
  },
  {
    id: 'business-representation',
    title: 'Business Representation',
    subtitle: 'Market Entry & Partnership',
    description: 'Professional representation services for local and foreign companies seeking market entry, business development, and strategic partnerships in Egypt and regional markets.',
    image: '/images/services/Business Representation Service.png',
    features: [
      {
        title: 'Market Entry',
        description: 'Strategic market entry planning and execution support',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
          </svg>
        )
      },
      {
        title: 'Partnership Development',
        description: 'Strategic alliance and partnership facilitation',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      },
      {
        title: 'Regulatory Support',
        description: 'Legal compliance and regulatory navigation assistance',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      },
      {
        title: 'Cultural Bridge',
        description: 'Cross-cultural business communication and relationship building',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        )
      }
    ],
    stats: [
      { label: 'Companies Represented', value: '80+' },
      { label: 'Market Entries', value: '45+' },
      { label: 'Success Rate', value: '90%' }
    ]
  },
  {
    id: 'project-management',
    title: 'Project Management',
    subtitle: 'Delivering Excellence On Time',
    description: 'Professional project planning, execution, and delivery management services ensuring projects are completed on schedule, within budget, and to the highest quality standards.',
    image: '/images/services/Project Management Service.png',
    features: [
      {
        title: 'Project Planning',
        description: 'Comprehensive project planning and resource allocation',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        )
      },
      {
        title: 'Schedule Management',
        description: 'Timeline optimization and milestone tracking',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: 'Risk Management',
        description: 'Proactive risk identification and mitigation strategies',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      },
      {
        title: 'Quality Assurance',
        description: 'Comprehensive quality control and performance monitoring',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      }
    ],
    stats: [
      { label: 'Projects Delivered', value: '300+' },
      { label: 'On-Time Delivery', value: '95%' },
      { label: 'Budget Adherence', value: '98%' }
    ]
  },
  {
    id: 'strategic-consulting',
    title: 'Strategic Consulting',
    subtitle: 'Business Growth & Strategy',
    description: 'Comprehensive strategic consulting services including market studies, business development, strategic management, and human resources planning to drive sustainable growth.',
    image: '/images/services/Strategic Consulting Service.png',
    features: [
      {
        title: 'Market Studies',
        description: 'In-depth market analysis and competitive intelligence',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )
      },
      {
        title: 'Business Development',
        description: 'Growth strategies and expansion planning',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )
      },
      {
        title: 'Strategic Planning',
        description: 'Long-term strategic roadmaps and implementation plans',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )
      },
      {
        title: 'HR Planning',
        description: 'Organizational design and human resources strategy',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      }
    ],
    stats: [
      { label: 'Strategies Developed', value: '150+' },
      { label: 'Revenue Growth', value: '40%' },
      { label: 'Client Retention', value: '95%' }
    ]
  }
]

// Sidebar navigation items
const sidebarItems = [
  {
    id: 'technology-operations',
    title: 'Technology Operations',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    )
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain Management',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    )
  },
  {
    id: 'feasibility-studies',
    title: 'Feasibility Studies',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    id: 'tender-services',
    title: 'Tender Services',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: 'training-development',
    title: 'Training & Development',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    id: 'business-representation',
    title: 'Business Representation',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    id: 'project-management',
    title: 'Project Management',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    id: 'strategic-consulting',
    title: 'Strategic Consulting',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  }
]

// Before/After comparison data - Updated for available assets only
const beforeAfterData = [
  {
    id: 'operations-optimization',
    title: 'Manufacturing Operations Improvement',
    category: 'Technology Operations',
    beforeImage: '/images/services/before-after/Before Operations Optimization.png',
    afterImage: '/images/services/before-after/After Operations Optimization.png',
    beforeDescription: 'Traditional factory setup with manual processes and limited automation',
    afterDescription: 'Optimized automated manufacturing system with IoT integration',
    improvements: [
      'Increased production efficiency by 45%',
      'Reduced operational costs by 30%',
      'Improved quality control systems',
      'Enhanced worker safety standards',
      'Implemented real-time monitoring systems'
    ],
    projectDetails: {
      location: 'Cairo Industrial Zone',
      timeline: '8 months',
      budget: '$1.2M'
    }
  },
  {
    id: 'training-transformation',
    title: 'Workforce Development Program',
    category: 'Training & Development',
    beforeImage: '/images/services/before-after/Before Training Optimization.png',
    afterImage: '/images/services/before-after/After Training Optimization.png',
    beforeDescription: 'Traditional classroom setup with limited interactive learning methods',
    afterDescription: 'Modern interactive training facility with digital learning platforms',
    improvements: [
      'Increased employee competency scores by 60%',
      'Reduced training time by 40%',
      'Achieved 95% certification completion rate',
      'Improved employee retention by 25%',
      'Enhanced learning engagement through technology'
    ],
    projectDetails: {
      location: 'Giza Manufacturing Complex',
      timeline: '6 months',
      budget: '$450K'
    }
  }
]

export const ServicesScreen: React.FC = () => {
  const [activeSection, setActiveSection] = useState('technology-operations')

  useEffect(() => {
    // Set up intersection observer for automatic section detection
    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    // Observe all service sections
    sidebarItems.forEach(item => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ServiceHero />

      {/* Main Content Layout */}
      <div className="relative">
        {/* Sticky Sidebar */}
        <ServicesSidebar 
          items={sidebarItems}
          activeSection={activeSection}
          onSectionClick={setActiveSection}
          className="hidden lg:block"
        />

        {/* Main Content Area */}
        <div className="lg:ml-80">
          {/* Services Overview */}
          <section id="services-content" className="section-padding-lg">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="heading-2 mb-6">Comprehensive Industrial & Business Solutions</h2>
                <p className="text-large text-body-secondary max-w-3xl mx-auto">
                  Our integrated approach to industrial and business consulting ensures seamless project delivery 
                  from concept to completion, backed by decades of industry expertise across multiple sectors.
                </p>
              </div>
            </div>

            {/* Alternating Service Layouts */}
            <AlternatingServiceLayout services={servicesData} />
          </section>

          {/* Before/After Showcase */}
          <section className="section-padding-lg section-secondary">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="heading-2 mb-6">Proven Industrial Results</h2>
                <p className="text-large text-body-secondary max-w-3xl mx-auto">
                  See the transformative impact of our industrial and business solutions through real project case studies 
                  and measurable improvements across various industries.
                </p>
              </div>
              <BeforeAfterSlider items={beforeAfterData} />
            </div>
          </section>

          {/* Service Features */}
          <ServiceFeatures />

          {/* Call to Action */}
          <section className="section-padding-lg section-primary">
            <div className="container mx-auto px-4 text-center">
              <h2 className="heading-2 text-white mb-6">
                Ready to Transform Your Operations?
              </h2>
              <p className="text-large text-white/90 mb-12 max-w-3xl mx-auto">
                Let&apos;s discuss your industrial and business requirements and create a customized solution 
                that delivers exceptional results for your specific industry needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  variant="teal"
                  size="xl"
                  className="px-12 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                  onClick={() => window.location.href = '/contact'}
                >
                  Get Free Consultation
                </Button>
                <Link 
                  href="/about"
                  className="btn-outline bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-12 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
                >
                  Meet Our Team
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}