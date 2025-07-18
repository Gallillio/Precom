// Company Information
export const COMPANY_INFO = {
  name: 'Precom',
  tagline: 'Professional Engineering Consultancy',
  description: 'Professional engineering consultancy providing innovative solutions for construction and infrastructure projects.',
  email: 'info@precom.com',
  phone: '+20 1234567890',
  address: {
    street: '123 Engineering Street',
    city: 'Tech City',
    state: 'TC',
    zipCode: '12345',
    country: 'United States'
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

// Services Categories
export const SERVICES = {
  structural: {
    title: 'Structural Engineering',
    description: 'Comprehensive structural design and analysis services',
    icon: 'building'
  },
  project: {
    title: 'Project Management',
    description: 'End-to-end project management and coordination',
    icon: 'clipboard'
  },
  consulting: {
    title: 'Engineering Consulting',
    description: 'Expert technical consulting and advisory services',
    icon: 'lightbulb'
  },
  design: {
    title: 'Design Review',
    description: 'Thorough design review and quality assurance',
    icon: 'search'
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
  title: 'Precom - Professional Engineering Consultancy',
  description: 'Professional engineering consultancy providing innovative solutions for construction and infrastructure projects.',
  keywords: ['engineering', 'consultancy', 'construction', 'infrastructure', 'design', 'structural'],
  ogImage: '/images/og-image.jpg',
  twitterCard: 'summary_large_image'
} as const