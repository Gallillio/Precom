export interface ServiceDetail {
  title: string
  description: string
  icon: string
  overview: string
  keyBenefits: string[]
  features: {
    title: string
    description: string
    icon: string
  }[]
  process: {
    step: number
    title: string
    description: string
    icon: string
  }[]
  caseStudies?: {
    title: string
    description: string
    result: string
    image: string
  }[]
  technologies?: string[]
  deliverables: string[]
}

export const DETAILED_SERVICES: Record<string, ServiceDetail> = {
  technologyOperations: {
    title: 'Technology Operations',
    description: 'Optimizing industrial operations through advanced manufacturing technology and process management',
    icon: 'cog',
    overview: 'Our comprehensive technology operations services transform industrial facilities through cutting-edge manufacturing technology, process optimization, and industrial automation. We specialize in factory operations enhancement, leveraging advanced IoT solutions, ERP systems, and performance monitoring to maximize efficiency, reduce costs, and improve overall operational excellence across diverse industrial sectors.',
    keyBenefits: [
      'Increased operational efficiency by up to 35%',
      'Reduced manufacturing costs and waste',
      'Enhanced quality control and consistency',
      'Improved worker safety and compliance',
      'Advanced automation and digital integration'
    ],
    features: [
      {
        title: 'Factory Optimization & Lean Manufacturing',
        description: 'Comprehensive facility optimization using lean manufacturing principles and advanced process engineering.',
        icon: 'factory'
      },
      {
        title: 'Industrial Technology Integration',
        description: 'Seamless integration of cutting-edge industrial technologies including IoT, AI, and automation systems.',
        icon: 'cpu'
      },
      {
        title: 'Process Management Systems',
        description: 'Implementation of robust process management frameworks with real-time monitoring and control.',
        icon: 'workflow'
      },
      {
        title: 'Performance Monitoring & KPIs',
        description: 'Advanced analytics and KPI dashboards for continuous performance tracking and optimization.',
        icon: 'chart-line'
      },
      {
        title: 'Automation Implementation',
        description: 'End-to-end automation solutions from basic mechanization to full Industry 4.0 integration.',
        icon: 'robot'
      },
      {
        title: 'Quality Control Systems',
        description: 'Integrated quality management systems with automated inspection and compliance monitoring.',
        icon: 'shield-check'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Assessment & Analysis',
        description: 'Comprehensive evaluation of current operations, identifying bottlenecks and improvement opportunities.',
        icon: 'magnifying-glass'
      },
      {
        step: 2,
        title: 'System Design',
        description: 'Custom design of optimized systems and processes tailored to your specific industrial requirements.',
        icon: 'blueprint'
      },
      {
        step: 3,
        title: 'Implementation',
        description: 'Systematic deployment of new technologies and processes with minimal operational disruption.',
        icon: 'gear'
      },
      {
        step: 4,
        title: 'Testing & Optimization',
        description: 'Rigorous testing protocols and fine-tuning to ensure optimal performance and reliability.',
        icon: 'beaker'
      },
      {
        step: 5,
        title: 'Monitoring & Support',
        description: 'Ongoing monitoring, maintenance, and continuous improvement support for sustained excellence.',
        icon: 'support'
      }
    ],
    technologies: ['Industrial IoT Sensors', 'ERP Systems (SAP, Oracle)', 'SCADA Systems', 'PLC Programming', 'MES Integration', 'Predictive Analytics'],
    deliverables: [
      'Factory optimization strategy and roadmap',
      'Technology integration documentation',
      'Process management system implementation',
      'Performance monitoring dashboards',
      'Training materials and operator manuals',
      'Ongoing support and maintenance plans'
    ]
  },
  supplyChainManagement: {
    title: 'Supply Chain Management',
    description: 'End-to-end supply chain optimization, logistics planning, and procurement strategy',
    icon: 'truck',
    overview: 'Our supply chain management services deliver comprehensive optimization across your entire value chain. From strategic procurement and inventory management to logistics optimization and distribution network design, we leverage advanced analytics, AI-driven forecasting, and proven methodologies to reduce costs, improve delivery times, and enhance overall supply chain resilience and efficiency.',
    keyBenefits: [
      'Reduced logistics costs by up to 25%',
      'Improved delivery times and reliability',
      'Enhanced supplier relationships and partnerships',
      'Optimized inventory management and reduced waste',
      'Increased supply chain visibility and control'
    ],
    features: [
      {
        title: 'Logistics Planning & Optimization',
        description: 'Advanced logistics planning with route optimization, capacity planning, and cost-effective transportation solutions.',
        icon: 'map'
      },
      {
        title: 'Procurement Strategy Development',
        description: 'Strategic procurement planning including supplier selection, contract negotiation, and sourcing optimization.',
        icon: 'handshake'
      },
      {
        title: 'Inventory Management Systems',
        description: 'Smart inventory management with demand forecasting, stock optimization, and automated replenishment systems.',
        icon: 'warehouse'
      },
      {
        title: 'Distribution Network Design',
        description: 'Optimal distribution network design and hub location planning for maximum efficiency and coverage.',
        icon: 'network'
      },
      {
        title: 'Supplier Management',
        description: 'Comprehensive supplier relationship management including performance monitoring and risk assessment.',
        icon: 'users'
      },
      {
        title: 'Demand Forecasting',
        description: 'AI-powered demand forecasting and analytics for accurate planning and inventory optimization.',
        icon: 'trend-up'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Supply Chain Analysis',
        description: 'Comprehensive analysis of current supply chain operations, costs, and performance metrics.',
        icon: 'analytics'
      },
      {
        step: 2,
        title: 'Strategy Development',
        description: 'Development of customized supply chain strategy aligned with business objectives and market requirements.',
        icon: 'strategy'
      },
      {
        step: 3,
        title: 'System Implementation',
        description: 'Implementation of optimized processes, systems, and technologies across the supply chain.',
        icon: 'implementation'
      },
      {
        step: 4,
        title: 'Integration & Testing',
        description: 'System integration, testing, and validation to ensure seamless operations and data flow.',
        icon: 'integration'
      },
      {
        step: 5,
        title: 'Optimization & Monitoring',
        description: 'Continuous monitoring, performance tracking, and ongoing optimization for sustained excellence.',
        icon: 'monitor'
      }
    ],
    technologies: ['SAP SCM', 'Oracle SCM Cloud', 'WMS Systems', 'TMS Solutions', 'EDI Integration', 'Blockchain Tracking'],
    deliverables: [
      'Supply chain strategy and optimization plan',
      'Procurement policies and supplier agreements',
      'Inventory management system implementation',
      'Logistics optimization and routing solutions',
      'Performance dashboards and KPI tracking',
      'Training programs and operational documentation'
    ]
  },
  feasibilityStudies: {
    title: 'Feasibility Studies',
    description: 'Comprehensive technical, financial, and economic analysis for project viability assessment',
    icon: 'chart-pie',
    overview: 'Our feasibility study services provide thorough, data-driven analysis to assess project viability and investment potential. Combining technical expertise, financial modeling, and market intelligence, we deliver comprehensive reports covering technical feasibility, economic impact, financial projections, and risk assessment to support informed decision-making and successful project outcomes.',
    keyBenefits: [
      'Risk mitigation through comprehensive analysis',
      'Investment optimization and ROI maximization',
      'Market insights and competitive intelligence',
      'Technical validation and proof of concept',
      'Strategic decision support and recommendations'
    ],
    features: [
      {
        title: 'Technical Analysis & Assessment',
        description: 'Detailed technical evaluation including engineering analysis, technology assessment, and implementation requirements.',
        icon: 'engineering'
      },
      {
        title: 'Financial Modeling & ROI',
        description: 'Comprehensive financial modeling with cash flow analysis, ROI calculations, and sensitivity analysis.',
        icon: 'calculator'
      },
      {
        title: 'Economic Impact Analysis',
        description: 'Thorough economic impact assessment including market conditions, competitive landscape, and growth potential.',
        icon: 'economy'
      },
      {
        title: 'Risk Assessment & Mitigation',
        description: 'Systematic risk identification, probability assessment, and mitigation strategy development.',
        icon: 'shield'
      },
      {
        title: 'Market Viability Studies',
        description: 'Comprehensive market research including demand analysis, competitor assessment, and market entry strategies.',
        icon: 'market'
      },
      {
        title: 'Regulatory Compliance Review',
        description: 'Complete regulatory and compliance assessment including permits, licenses, and legal requirements.',
        icon: 'compliance'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Project Scoping',
        description: 'Define project scope, objectives, and key success criteria with stakeholder alignment.',
        icon: 'scope'
      },
      {
        step: 2,
        title: 'Data Collection & Analysis',
        description: 'Comprehensive data gathering including market research, technical specifications, and financial data.',
        icon: 'data'
      },
      {
        step: 3,
        title: 'Financial Modeling',
        description: 'Development of detailed financial models with multiple scenarios and sensitivity analysis.',
        icon: 'model'
      },
      {
        step: 4,
        title: 'Risk Assessment',
        description: 'Systematic risk identification, quantification, and mitigation strategy development.',
        icon: 'risk'
      },
      {
        step: 5,
        title: 'Report & Recommendations',
        description: 'Comprehensive feasibility report with clear recommendations and implementation roadmap.',
        icon: 'report'
      }
    ],
    technologies: ['Monte Carlo Simulation', 'Financial Modeling Tools', 'Market Research Platforms', 'Risk Assessment Software', 'Statistical Analysis', 'Business Intelligence'],
    deliverables: [
      'Comprehensive feasibility study report',
      'Financial models and projections',
      'Risk assessment and mitigation plans',
      'Market analysis and competitive landscape',
      'Technical specifications and requirements',
      'Implementation roadmap and recommendations'
    ]
  },
  tenderServices: {
    title: 'Tender Services',
    description: 'Professional tender preparation, documentation, and submission management services',
    icon: 'document-text',
    overview: 'Our tender services provide end-to-end support for complex procurement processes, ensuring your proposals stand out in competitive bidding environments. From tender analysis and documentation preparation to compliance verification and submission management, we combine industry expertise with proven methodologies to maximize your success rates and streamline the entire tender process.',
    keyBenefits: [
      'Higher success rates in competitive tenders',
      'Professional documentation and presentation',
      'Complete compliance assurance and verification',
      'Significant time savings and resource optimization',
      'Expert guidance throughout the entire process'
    ],
    features: [
      {
        title: 'Tender Preparation & Strategy',
        description: 'Comprehensive tender analysis, strategy development, and competitive positioning for maximum impact.',
        icon: 'strategy'
      },
      {
        title: 'Technical Documentation',
        description: 'Professional preparation of all technical documents, specifications, and supporting materials.',
        icon: 'document'
      },
      {
        title: 'Compliance Review & Verification',
        description: 'Thorough compliance checking against all tender requirements, regulations, and submission criteria.',
        icon: 'check-circle'
      },
      {
        title: 'Submission Management',
        description: 'Complete submission process management including deadlines, formats, and delivery requirements.',
        icon: 'upload'
      },
      {
        title: 'Bid Optimization',
        description: 'Strategic bid optimization including pricing analysis, value engineering, and competitive positioning.',
        icon: 'optimization'
      },
      {
        title: 'Post-Submission Support',
        description: 'Ongoing support including clarifications, presentations, and negotiation assistance.',
        icon: 'support'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Tender Analysis',
        description: 'Comprehensive analysis of tender requirements, evaluation criteria, and competitive landscape.',
        icon: 'analysis'
      },
      {
        step: 2,
        title: 'Documentation Preparation',
        description: 'Professional preparation of all required documents, technical specifications, and supporting materials.',
        icon: 'preparation'
      },
      {
        step: 3,
        title: 'Compliance Review',
        description: 'Thorough review and verification of all requirements, regulations, and submission criteria.',
        icon: 'review'
      },
      {
        step: 4,
        title: 'Submission Management',
        description: 'Complete management of the submission process including formatting, deadlines, and delivery.',
        icon: 'submission'
      },
      {
        step: 5,
        title: 'Follow-up & Support',
        description: 'Post-submission support including clarifications, presentations, and ongoing assistance.',
        icon: 'followup'
      }
    ],
    technologies: ['Document Management Systems', 'Compliance Tracking Tools', 'Project Management Software', 'Electronic Submission Platforms', 'Version Control Systems', 'Collaboration Tools'],
    deliverables: [
      'Complete tender documentation package',
      'Compliance verification and checklists',
      'Submission confirmations and receipts',
      'Technical specifications and drawings',
      'Pricing and commercial proposals',
      'Post-submission support and follow-up'
    ]
  },
  trainingDevelopment: {
    title: 'Training & Development',
    description: 'Comprehensive workforce development and professional training programs',
    icon: 'academic-cap',
    overview: 'Our training and development services enhance organizational capabilities through customized learning solutions, skills assessment, and professional development programs. We combine industry expertise with modern learning methodologies to deliver effective training that improves productivity, reduces costs, enhances employee satisfaction, and builds sustainable competitive advantages through human capital development.',
    keyBenefits: [
      'Enhanced employee skills and competencies',
      'Improved productivity and performance',
      'Reduced training costs through efficiency',
      'Better retention rates and job satisfaction',
      'Customized programs aligned with business needs'
    ],
    features: [
      {
        title: 'Technical Skills Training',
        description: 'Specialized technical training programs covering industry-specific skills, tools, and methodologies.',
        icon: 'tools'
      },
      {
        title: 'Leadership Development',
        description: 'Comprehensive leadership and management development programs for all organizational levels.',
        icon: 'leadership'
      },
      {
        title: 'Skills Assessment & Gap Analysis',
        description: 'Thorough skills assessment and gap analysis to identify development needs and priorities.',
        icon: 'assessment'
      },
      {
        title: 'Custom Training Programs',
        description: 'Tailored training solutions designed specifically for your organization\'s unique requirements.',
        icon: 'custom'
      },
      {
        title: 'Certification Programs',
        description: 'Professional certification programs with industry-recognized credentials and continuing education.',
        icon: 'certificate'
      },
      {
        title: 'E-Learning Platforms',
        description: 'Modern e-learning solutions with interactive content, progress tracking, and flexible delivery.',
        icon: 'elearning'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Needs Assessment',
        description: 'Comprehensive assessment of training needs, skill gaps, and organizational development priorities.',
        icon: 'assessment'
      },
      {
        step: 2,
        title: 'Program Design',
        description: 'Custom design of training programs aligned with learning objectives and business goals.',
        icon: 'design'
      },
      {
        step: 3,
        title: 'Content Development',
        description: 'Development of engaging training content, materials, and resources using modern methodologies.',
        icon: 'content'
      },
      {
        step: 4,
        title: 'Delivery & Implementation',
        description: 'Effective training delivery through multiple channels including classroom, online, and blended learning.',
        icon: 'delivery'
      },
      {
        step: 5,
        title: 'Evaluation & Improvement',
        description: 'Continuous evaluation, feedback collection, and program improvement for sustained effectiveness.',
        icon: 'evaluation'
      }
    ],
    technologies: ['Learning Management Systems', 'Virtual Training Platforms', 'Assessment Tools', 'Content Creation Software', 'Video Conferencing', 'Progress Tracking Systems'],
    deliverables: [
      'Customized training curricula and materials',
      'Professional certifications and credentials',
      'Skills assessment reports and development plans',
      'E-learning platform and content library',
      'Training effectiveness reports and analytics',
      'Ongoing support and program updates'
    ]
  },
  businessRepresentation: {
    title: 'Business Representation',
    description: 'Professional market entry, partnerships, and local/foreign company representation services',
    icon: 'handshake',
    overview: 'Our business representation services facilitate successful market entry and expansion through local expertise, regulatory guidance, and strategic partnerships. We serve as your trusted local partner, providing cultural bridge services, regulatory compliance support, and access to established networks to accelerate market penetration and ensure sustainable business growth in new markets.',
    keyBenefits: [
      'Local market expertise and cultural understanding',
      'Faster market entry and reduced time-to-market',
      'Complete regulatory compliance and legal support',
      'Strategic partnership facilitation and management',
      'Cultural bridge services and communication support'
    ],
    features: [
      {
        title: 'Market Entry Strategy',
        description: 'Comprehensive market entry planning including regulatory requirements, competitive analysis, and go-to-market strategies.',
        icon: 'globe'
      },
      {
        title: 'Partnership Development',
        description: 'Strategic partnership identification, negotiation, and management with local and regional partners.',
        icon: 'partnership'
      },
      {
        title: 'Regulatory Support & Compliance',
        description: 'Complete regulatory guidance, compliance management, and government relations support.',
        icon: 'regulation'
      },
      {
        title: 'Cultural Bridge Services',
        description: 'Cultural consultation, communication facilitation, and relationship building across cultural boundaries.',
        icon: 'bridge'
      },
      {
        title: 'Local Network Access',
        description: 'Access to established local networks including suppliers, distributors, and industry contacts.',
        icon: 'network'
      },
      {
        title: 'Business Development Support',
        description: 'Ongoing business development support including market intelligence, opportunity identification, and relationship management.',
        icon: 'development'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Market Analysis',
        description: 'Comprehensive market analysis including opportunities, challenges, competitive landscape, and entry barriers.',
        icon: 'analysis'
      },
      {
        step: 2,
        title: 'Strategy Development',
        description: 'Development of customized market entry and representation strategy aligned with business objectives.',
        icon: 'strategy'
      },
      {
        step: 3,
        title: 'Partnership Identification',
        description: 'Identification and evaluation of potential partners, distributors, and strategic alliances.',
        icon: 'identification'
      },
      {
        step: 4,
        title: 'Implementation Support',
        description: 'Hands-on implementation support including negotiations, legal processes, and operational setup.',
        icon: 'implementation'
      },
      {
        step: 5,
        title: 'Ongoing Management',
        description: 'Continuous relationship management, performance monitoring, and strategic support.',
        icon: 'management'
      }
    ],
    technologies: ['CRM Systems', 'Market Research Tools', 'Communication Platforms', 'Document Management', 'Collaboration Software', 'Analytics Platforms'],
    deliverables: [
      'Market entry strategy and roadmap',
      'Partnership agreements and contracts',
      'Regulatory compliance documentation',
      'Local network introductions and connections',
      'Cultural integration and communication guidelines',
      'Ongoing representation and support services'
    ]
  },
  projectManagement: {
    title: 'Project Management',
    description: 'Professional project planning, execution, and delivery management for industrial projects',
    icon: 'clipboard-list',
    overview: 'Our project management services ensure successful project delivery through proven methodologies, expert planning, and comprehensive execution management. We combine traditional project management principles with modern tools and techniques to deliver projects on time, within budget, and to the highest quality standards while managing risks and maintaining stakeholder satisfaction throughout the project lifecycle.',
    keyBenefits: [
      'On-time delivery with 95% success rate',
      'Budget adherence and cost optimization',
      'Proactive risk mitigation and management',
      'Comprehensive quality assurance and control',
      'Enhanced stakeholder satisfaction and communication'
    ],
    features: [
      {
        title: 'Project Planning & Scheduling',
        description: 'Comprehensive project planning with detailed schedules, resource allocation, and milestone management.',
        icon: 'calendar'
      },
      {
        title: 'Resource Management',
        description: 'Optimal resource planning, allocation, and utilization across all project phases and activities.',
        icon: 'resources'
      },
      {
        title: 'Risk Management & Mitigation',
        description: 'Proactive risk identification, assessment, and mitigation strategies with contingency planning.',
        icon: 'shield'
      },
      {
        title: 'Quality Assurance',
        description: 'Comprehensive quality management with systematic reviews, testing, and compliance verification.',
        icon: 'quality'
      },
      {
        title: 'Stakeholder Communication',
        description: 'Effective stakeholder management with regular communication, reporting, and relationship building.',
        icon: 'communication'
      },
      {
        title: 'Performance Monitoring',
        description: 'Real-time performance tracking with KPI monitoring, dashboard reporting, and corrective actions.',
        icon: 'monitoring'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Project Initiation',
        description: 'Project charter development, scope definition, stakeholder identification, and initial planning.',
        icon: 'initiation'
      },
      {
        step: 2,
        title: 'Planning & Design',
        description: 'Detailed project planning including schedules, budgets, resource allocation, and risk assessment.',
        icon: 'planning'
      },
      {
        step: 3,
        title: 'Execution & Monitoring',
        description: 'Project execution with continuous monitoring, progress tracking, and performance management.',
        icon: 'execution'
      },
      {
        step: 4,
        title: 'Quality Control',
        description: 'Systematic quality control with testing, reviews, and compliance verification throughout delivery.',
        icon: 'control'
      },
      {
        step: 5,
        title: 'Closure & Handover',
        description: 'Project closure with deliverable handover, documentation, lessons learned, and stakeholder sign-off.',
        icon: 'closure'
      }
    ],
    technologies: ['Microsoft Project', 'Primavera P6', 'Agile Tools (Jira, Scrum)', 'Dashboard Systems', 'Collaboration Platforms', 'Risk Management Software'],
    deliverables: [
      'Comprehensive project plans and schedules',
      'Regular status reports and dashboards',
      'Quality documentation and test reports',
      'Risk registers and mitigation plans',
      'Stakeholder communication materials',
      'Project closure and lessons learned reports'
    ]
  },
  strategicConsulting: {
    title: 'Strategic Consulting',
    description: 'Comprehensive strategic consulting for business growth, market studies, and organizational development',
    icon: 'lightbulb',
    overview: 'Our strategic consulting services provide comprehensive business guidance to accelerate growth, enhance competitiveness, and achieve sustainable success. Through market analysis, strategic planning, organizational development, and performance optimization, we help organizations navigate complex challenges, identify opportunities, and implement strategies that drive measurable results and long-term value creation.',
    keyBenefits: [
      'Strategic clarity and focused direction',
      'Accelerated growth and market expansion',
      'Deep market insights and competitive intelligence',
      'Sustainable competitive advantage development',
      'Enhanced organizational alignment and performance'
    ],
    features: [
      {
        title: 'Market Studies & Analysis',
        description: 'Comprehensive market research, competitive analysis, and industry intelligence for informed decision-making.',
        icon: 'research'
      },
      {
        title: 'Business Development Strategy',
        description: 'Strategic business development planning including growth strategies, market expansion, and revenue optimization.',
        icon: 'growth'
      },
      {
        title: 'Strategic Planning & Roadmaps',
        description: 'Comprehensive strategic planning with clear roadmaps, objectives, and implementation frameworks.',
        icon: 'roadmap'
      },
      {
        title: 'HR Planning & Organizational Design',
        description: 'Strategic human resources planning, organizational design, and talent management strategies.',
        icon: 'organization'
      },
      {
        title: 'Performance Optimization',
        description: 'Systematic performance improvement including process optimization, efficiency enhancement, and cost reduction.',
        icon: 'optimization'
      },
      {
        title: 'Change Management',
        description: 'Comprehensive change management support including transformation planning, communication, and implementation.',
        icon: 'change'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Strategic Assessment',
        description: 'Comprehensive strategic assessment including SWOT analysis, competitive positioning, and capability evaluation.',
        icon: 'assessment'
      },
      {
        step: 2,
        title: 'Market Research & Analysis',
        description: 'In-depth market research, trend analysis, and competitive intelligence gathering.',
        icon: 'research'
      },
      {
        step: 3,
        title: 'Strategy Formulation',
        description: 'Development of comprehensive strategies aligned with business objectives and market opportunities.',
        icon: 'formulation'
      },
      {
        step: 4,
        title: 'Implementation Planning',
        description: 'Detailed implementation planning with timelines, resources, and performance metrics.',
        icon: 'planning'
      },
      {
        step: 5,
        title: 'Monitoring & Adjustment',
        description: 'Continuous monitoring, performance tracking, and strategic adjustments for optimal results.',
        icon: 'monitoring'
      }
    ],
    technologies: ['Strategic Planning Software', 'Market Research Platforms', 'Analytics Tools', 'Survey Platforms', 'Business Intelligence', 'Performance Dashboards'],
    deliverables: [
      'Comprehensive strategic plans and roadmaps',
      'Market research reports and competitive analysis',
      'Organizational design and HR strategies',
      'Performance improvement recommendations',
      'Change management plans and communication strategies',
      'Ongoing strategic advisory and support services'
    ]
  }
}