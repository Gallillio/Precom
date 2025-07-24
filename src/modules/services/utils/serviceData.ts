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
  vehicleEngineering: {
    title: 'Vehicle Engineering',
    description: 'Complete vehicle design, development, and optimization services',
    icon: 'cog',
    overview: 'Our comprehensive vehicle engineering services cover the entire product development lifecycle, from initial concept design to production-ready vehicles. We combine cutting-edge CAD technology, simulation tools, and decades of automotive expertise to deliver innovative solutions that meet the highest industry standards.',
    keyBenefits: [
      'Reduced development time and costs',
      'Enhanced vehicle performance and efficiency',
      'Compliance with Egyptian and international automotive standards',
      'Advanced simulation and testing capabilities',
      'Expert team with proven track record'
    ],
    features: [
      {
        title: 'Concept Design & Development',
        description: 'Transform your automotive vision into detailed engineering concepts with our advanced design capabilities.',
        icon: 'lightbulb'
      },
      {
        title: 'CAD Modeling & Simulation',
        description: 'Precision 3D modeling and comprehensive simulation to optimize performance before physical prototyping.',
        icon: 'cube'
      },
      {
        title: 'Powertrain Engineering',
        description: 'Complete powertrain design and optimization for maximum efficiency and performance.',
        icon: 'cog'
      },
      {
        title: 'Chassis & Suspension Design',
        description: 'Advanced chassis engineering and suspension systems for optimal handling and ride comfort.',
        icon: 'settings'
      },
      {
        title: 'Safety System Integration',
        description: 'Comprehensive safety system design and integration to meet all regulatory requirements.',
        icon: 'shield'
      },
      {
        title: 'Prototype Development',
        description: 'From digital models to physical prototypes, bringing your automotive concepts to life.',
        icon: 'wrench'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Requirements Analysis',
        description: 'Detailed analysis of your vehicle requirements, market positioning, and technical specifications.',
        icon: 'document'
      },
      {
        step: 2,
        title: 'Concept Design',
        description: 'Initial design concepts and feasibility studies using advanced modeling tools.',
        icon: 'lightbulb'
      },
      {
        step: 3,
        title: 'Detailed Engineering',
        description: 'Comprehensive engineering design with detailed CAD models and technical documentation.',
        icon: 'cog'
      },
      {
        step: 4,
        title: 'Simulation & Testing',
        description: 'Virtual testing and simulation to validate design performance and safety.',
        icon: 'beaker'
      },
      {
        step: 5,
        title: 'Prototype & Validation',
        description: 'Physical prototype development and comprehensive validation testing.',
        icon: 'check'
      }
    ],
    technologies: ['CATIA V5/V6', 'SolidWorks', 'ANSYS', 'CarSim', 'MATLAB/Simulink', 'AutoCAD'],
    deliverables: [
      'Complete vehicle design documentation',
      'CAD models and technical drawings',
      'Performance simulation reports',
      'Manufacturing specifications',
      'Quality assurance protocols',
      'Regulatory compliance documentation'
    ]
  },
  performanceTesting: {
    title: 'Performance Testing',
    description: 'Comprehensive vehicle testing, validation, and performance analysis',
    icon: 'beaker',
    overview: 'Our state-of-the-art performance testing facilities and expert team provide comprehensive automotive testing services. From engine dynamometer testing to full vehicle validation, we ensure your automotive products meet the highest performance and safety standards required in the Egyptian and international markets.',
    keyBenefits: [
      'Comprehensive testing capabilities',
      'ISO/TS 16949 certified testing procedures',
      'Advanced data acquisition and analysis',
      'Egyptian climate and road condition testing',
      'Regulatory compliance validation'
    ],
    features: [
      {
        title: 'Engine Dynamometer Testing',
        description: 'Precision engine performance testing with advanced dynamometer systems.',
        icon: 'cog'
      },
      {
        title: 'Vehicle Dynamics Testing',
        description: 'Comprehensive handling, stability, and ride comfort evaluation.',
        icon: 'car'
      },
      {
        title: 'Emissions Testing',
        description: 'Complete emissions testing to meet Egyptian and Euro standards.',
        icon: 'wind'
      },
      {
        title: 'Durability Testing',
        description: 'Long-term durability and reliability testing under Egyptian conditions.',
        icon: 'clock'
      },
      {
        title: 'Safety Testing',
        description: 'Comprehensive safety testing including crash simulation and analysis.',
        icon: 'shield'
      },
      {
        title: 'Environmental Testing',
        description: 'Testing under various environmental conditions including desert heat.',
        icon: 'sun'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Test Planning',
        description: 'Develop comprehensive test plans based on your specific requirements and standards.',
        icon: 'document'
      },
      {
        step: 2,
        title: 'Test Setup',
        description: 'Configure testing equipment and instrumentation for accurate data collection.',
        icon: 'settings'
      },
      {
        step: 3,
        title: 'Testing Execution',
        description: 'Perform systematic testing following established protocols and procedures.',
        icon: 'play'
      },
      {
        step: 4,
        title: 'Data Analysis',
        description: 'Comprehensive analysis of test data using advanced analytical tools.',
        icon: 'chart'
      },
      {
        step: 5,
        title: 'Reporting',
        description: 'Detailed test reports with recommendations and certification documentation.',
        icon: 'document-text'
      }
    ],
    technologies: ['AVL PUMA', 'NI LabVIEW', 'ETAS INCA', 'Vector CANoe', 'HORIBA MEXA', 'Instron Testing Systems'],
    deliverables: [
      'Comprehensive test reports',
      'Performance certification',
      'Data analysis and recommendations',
      'Compliance documentation',
      'Calibration certificates',
      'Video documentation of testing'
    ]
  },
  automotiveConsulting: {
    title: 'Automotive Consulting',
    description: 'Expert automotive technical consulting and strategic advisory services',
    icon: 'lightbulb',
    overview: 'Our automotive consulting services provide strategic guidance and technical expertise to help automotive companies navigate the complex Egyptian market. From market entry strategies to technical compliance, our consultants bring deep industry knowledge and local market understanding to drive your success.',
    keyBenefits: [
      'Local market expertise and insights',
      'Regulatory compliance guidance',
      'Strategic business development support',
      'Technical advisory services',
      'Risk assessment and mitigation'
    ],
    features: [
      {
        title: 'Market Entry Strategy',
        description: 'Comprehensive market analysis and entry strategies for the Egyptian automotive market.',
        icon: 'globe'
      },
      {
        title: 'Regulatory Compliance',
        description: 'Expert guidance on Egyptian automotive regulations and certification requirements.',
        icon: 'document-check'
      },
      {
        title: 'Technology Assessment',
        description: 'Evaluation of automotive technologies and their suitability for local market conditions.',
        icon: 'cpu'
      },
      {
        title: 'Supply Chain Optimization',
        description: 'Automotive supply chain analysis and optimization for Egyptian operations.',
        icon: 'truck'
      },
      {
        title: 'Investment Advisory',
        description: 'Strategic investment advisory for automotive projects and facilities in Egypt.',
        icon: 'chart-pie'
      },
      {
        title: 'Partnership Development',
        description: 'Facilitate partnerships with Egyptian automotive industry stakeholders.',
        icon: 'users'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Needs Assessment',
        description: 'Comprehensive assessment of your consulting needs and objectives.',
        icon: 'clipboard'
      },
      {
        step: 2,
        title: 'Market Research',
        description: 'In-depth market research and competitive analysis for your specific sector.',
        icon: 'search'
      },
      {
        step: 3,
        title: 'Strategy Development',
        description: 'Development of customized strategies and implementation roadmaps.',
        icon: 'map'
      },
      {
        step: 4,
        title: 'Implementation Support',
        description: 'Ongoing support during strategy implementation and execution.',
        icon: 'support'
      },
      {
        step: 5,
        title: 'Performance Monitoring',
        description: 'Continuous monitoring and optimization of implemented strategies.',
        icon: 'chart-line'
      }
    ],
    technologies: ['Market Intelligence Tools', 'SAP Analytics', 'Tableau', 'Power BI', 'SWOT Analysis', 'Risk Assessment Tools'],
    deliverables: [
      'Market analysis reports',
      'Strategic implementation plans',
      'Regulatory compliance guides',
      'Investment feasibility studies',
      'Partnership opportunity assessments',
      'Ongoing advisory support'
    ]
  },
  qualityAssurance: {
    title: 'Quality Assurance',
    description: 'Rigorous automotive quality control, inspection, and certification services',
    icon: 'shield-check',
    overview: 'Our comprehensive quality assurance services ensure your automotive products meet the highest standards of quality, safety, and reliability. With ISO 9001:2015 certification and expertise in Egyptian automotive standards, we provide end-to-end quality management solutions.',
    keyBenefits: [
      'ISO 9001:2015 certified processes',
      'Comprehensive quality management systems',
      'Advanced inspection and testing capabilities',
      'Regulatory compliance assurance',
      'Continuous improvement programs'
    ],
    features: [
      {
        title: 'Quality Management Systems',
        description: 'Implementation and maintenance of comprehensive quality management systems.',
        icon: 'clipboard-check'
      },
      {
        title: 'Inspection Services',
        description: 'Detailed inspection services using advanced metrology and testing equipment.',
        icon: 'search-circle'
      },
      {
        title: 'Supplier Quality Audits',
        description: 'Comprehensive supplier audits and quality assessment programs.',
        icon: 'building-storefront'
      },
      {
        title: 'Process Optimization',
        description: 'Continuous process improvement and optimization for enhanced quality.',
        icon: 'arrow-trending-up'
      },
      {
        title: 'Certification Support',
        description: 'Support for ISO, IATF, and other automotive industry certifications.',
        icon: 'badge-check'
      },
      {
        title: 'Training Programs',
        description: 'Quality training programs for your team and workforce development.',
        icon: 'academic-cap'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Quality Assessment',
        description: 'Comprehensive assessment of current quality systems and processes.',
        icon: 'magnifying-glass'
      },
      {
        step: 2,
        title: 'System Design',
        description: 'Design of customized quality management systems and procedures.',
        icon: 'cog'
      },
      {
        step: 3,
        title: 'Implementation',
        description: 'Systematic implementation of quality systems and training programs.',
        icon: 'play'
      },
      {
        step: 4,
        title: 'Monitoring',
        description: 'Continuous monitoring and measurement of quality performance.',
        icon: 'chart-bar'
      },
      {
        step: 5,
        title: 'Improvement',
        description: 'Ongoing improvement initiatives and corrective action programs.',
        icon: 'arrow-up'
      }
    ],
    technologies: ['Coordinate Measuring Machines', 'Statistical Process Control', 'Six Sigma Tools', 'Lean Manufacturing', 'SAP QM', 'Minitab'],
    deliverables: [
      'Quality management documentation',
      'Inspection and test reports',
      'Certification documentation',
      'Training materials and programs',
      'Process improvement recommendations',
      'Audit reports and corrective actions'
    ]
  }
}