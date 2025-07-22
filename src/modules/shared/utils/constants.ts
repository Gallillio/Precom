// Company Information
export const COMPANY_INFO = {
  name: 'Precom',
  tagline: 'Automotive Engineering Consultancy',
  description: 'Leading automotive engineering consultancy in Egypt specializing in vehicle development, automotive technology solutions, and automotive systems engineering.',
  email: 'info@precom-egypt.com',
  phone: '+20 2 2735 4567',
  mobile: '+20 100 123 4567',
  address: {
    street: '15 Automotive Industry Zone, 6th of October City',
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
  blog: '/blog',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  cookies: '/cookies'
} as const

// Automotive Services Categories
export const SERVICES = {
  vehicleEngineering: {
    title: 'Vehicle Engineering',
    description: 'Complete vehicle design, development, and optimization services',
    icon: 'cog'
  },
  performanceTesting: {
    title: 'Performance Testing',
    description: 'Comprehensive vehicle testing, validation, and performance analysis',
    icon: 'beaker'
  },
  automotiveConsulting: {
    title: 'Automotive Consulting',
    description: 'Expert automotive technical consulting and strategic advisory services',
    icon: 'lightbulb'
  },
  qualityAssurance: {
    title: 'Quality Assurance',
    description: 'Rigorous automotive quality control, inspection, and certification services',
    icon: 'shield-check'
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
  projects: '/api/projects',
  blog: '/api/blog'
} as const

// SEO Defaults
export const SEO_DEFAULTS = {
  title: 'Precom - Leading Automotive Engineering Consultancy in Egypt',
  description: 'Leading automotive engineering consultancy in Egypt specializing in vehicle development, automotive technology solutions, and automotive systems engineering. Serving Egyptian automotive industry.',
  keywords: ['automotive', 'engineering', 'consultancy', 'Egypt', 'vehicle', 'development', 'automotive technology', 'vehicle design', 'performance testing', 'automotive systems', 'Egyptian automotive', 'Cairo', 'automotive industry Egypt'],
  ogImage: '/images/og-image.jpg',
  twitterCard: 'summary_large_image'
} as const