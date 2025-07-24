// Company Information
export const COMPANY_INFO = {
  name: 'Precom',
  tagline: 'Industrial & Business Consultancy',
  description: 'Leading industrial and business consultancy in Egypt specializing in technology operations, supply chain management, feasibility studies, project management, and strategic business solutions.',
  email: 'info@precom-egypt.com',
  phone: '+20 2 2735 4567',
  mobile: '+20 100 123 4567',
  address: {
    street: '15 Industrial Zone, 6th of October City',
    city: 'Giza',
    governorate: 'Giza',
    postalCode: '12573',
    country: 'Egypt'
  }
} as const

// Navigation Routes
export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  projects: '/projects',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  cookies: '/cookies'
} as const

// Industrial & Business Services Categories
export const SERVICES = {
  technologyOperations: {
    title: 'Technology Operations',
    description: 'Factory operations optimization, manufacturing technology, and industrial process management',
    icon: 'cog'
  },
  supplyChainManagement: {
    title: 'Supply Chain Management',
    description: 'End-to-end supply chain optimization, logistics planning, and procurement strategies',
    icon: 'truck'
  },
  feasibilityStudies: {
    title: 'Feasibility Studies',
    description: 'Comprehensive technical, financial, and economic analysis for project viability assessment',
    icon: 'chart-bar'
  },
  tenderServices: {
    title: 'Tender Services',
    description: 'Professional tender preparation, documentation, and submission support services',
    icon: 'document-text'
  },
  trainingDevelopment: {
    title: 'Training & Development',
    description: 'Employee training programs, skills development, and technical capacity building',
    icon: 'academic-cap'
  },
  businessRepresentation: {
    title: 'Business Representation',
    description: 'Local and foreign company representation, market entry, and business development',
    icon: 'globe'
  },
  projectManagement: {
    title: 'Project Management',
    description: 'Professional project planning, execution, and delivery management services',
    icon: 'clipboard-list'
  },
  strategicConsulting: {
    title: 'Strategic Consulting',
    description: 'Market studies, business development, strategic management, and HR planning services',
    icon: 'lightbulb'
  }
} as const

// Social Media Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/precom',
  linkedin: 'https://linkedin.com/company/precom',
  facebook: 'https://facebook.com/precom',
  instagram: 'https://instagram.com/precom'
} as const

// UI Constants
export const UI_CONSTANTS = {
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  animations: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms'
  },
  zIndex: {
    dropdown: 1000,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
  }
} as const

// Form Validation
export const VALIDATION = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Please enter a valid phone number'
  },
  required: {
    message: 'This field is required'
  },
  minLength: {
    name: 2,
    message: 8,
    subject: 5
  }
} as const

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  contact: '/api/contact',
  newsletter: '/api/newsletter',
  projects: '/api/projects'
} as const

// SEO Defaults
export const SEO_DEFAULTS = {
  title: 'Precom - Leading Industrial & Business Consultancy in Egypt',
  description: 'Leading industrial and business consultancy in Egypt specializing in technology operations, supply chain management, feasibility studies, project management, and strategic business solutions.',
  keywords: ['industrial consultancy', 'business consulting', 'Egypt', 'technology operations', 'supply chain management', 'feasibility studies', 'project management', 'tender services', 'business development', 'strategic management', 'manufacturing', 'industrial engineering', 'Egyptian industry', 'Cairo', 'business solutions Egypt'],
  ogImage: '/images/og-image.jpg',
  twitterCard: 'summary_large_image'
} as const