// Common Types
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

// Navigation Types
export interface NavigationItem {
  name: string
  href: string
  description?: string
  icon?: string
  children?: NavigationItem[]
}

// Company & Contact Types
export interface ContactInfo {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  subject?: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface CompanyInfo {
  name: string
  tagline: string
  description: string
  email: string
  phone: string
  address: Address
}

// Service Types
export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features?: string[]
  price?: string
  duration?: string
}

export interface ServiceCategory {
  id: string
  name: string
  description: string
  services: Service[]
}

// Project Types
export interface Project extends BaseEntity {
  title: string
  description: string
  shortDescription: string
  category: string
  tags: string[]
  images: ProjectImage[]
  client?: string
  duration?: string
  budget?: string
  status: 'completed' | 'in-progress' | 'planned'
  featured: boolean
}

export interface ProjectImage {
  id: string
  url: string
  alt: string
  caption?: string
  isPrimary: boolean
}

// Blog Types
export interface BlogPost extends BaseEntity {
  title: string
  slug: string
  excerpt: string
  content: string
  author: Author
  category: string
  tags: string[]
  coverImage?: string
  published: boolean
  publishedAt?: Date
  readingTime: number
}

export interface Author {
  id: string
  name: string
  bio?: string
  avatar?: string
  email?: string
  socialLinks?: SocialLinks
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  postCount: number
}

// Team Types
export interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  avatar?: string
  email?: string
  phone?: string
  socialLinks?: SocialLinks
  specialties: string[]
  experience: number
}

// Social Media Types
export interface SocialLinks {
  twitter?: string
  linkedin?: string
  github?: string
  facebook?: string
  instagram?: string
  website?: string
}

// Form Types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio'
  placeholder?: string
  required: boolean
  validation?: ValidationRules
  options?: FormOption[]
}

export interface FormOption {
  value: string
  label: string
}

export interface ValidationRules {
  required?: boolean
  email?: boolean
  phone?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
}

export interface FormErrors {
  [key: string]: string | null
}

// API Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// UI Component Types
export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export interface CardProps {
  children: React.ReactNode
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  href?: string
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  shadow?: 'sm' | 'md' | 'lg'
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

// Search & Filter Types
export interface SearchFilters {
  query?: string
  category?: string
  tags?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface SearchResult<T> {
  item: T
  score: number
  highlights?: string[]
}

// SEO Types
export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogType?: string
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
}

// Theme Types
export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
    border: string
  }
  fonts: {
    sans: string
    serif: string
    mono: string
  }
  breakpoints: {
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
  }
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Status Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'
export type Status = 'draft' | 'published' | 'archived'

// Event Types
export interface CustomEvent<T = any> {
  type: string
  payload: T
  timestamp: Date
}