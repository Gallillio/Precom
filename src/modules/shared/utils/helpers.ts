import { VALIDATION } from './constants'

// String Utilities
export const formatText = {
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  },
  
  titleCase: (str: string): string => {
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
  },
  
  truncate: (str: string, length: number): string => {
    if (str.length <= length) return str
    return str.substring(0, length) + '...'
  },
  
  slug: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  }
}

// Date Utilities
export const formatDate = {
  relative: (date: Date): string => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
    
    return date.toLocaleDateString()
  },
  
  standard: (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  },
  
  short: (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
}

// Validation Utilities
export const validate = {
  email: (email: string): boolean => {
    return VALIDATION.email.pattern.test(email)
  },
  
  phone: (phone: string): boolean => {
    return VALIDATION.phone.pattern.test(phone)
  },
  
  required: (value: string | null | undefined): boolean => {
    return value !== null && value !== undefined && value.trim() !== ''
  },
  
  minLength: (value: string, minLength: number): boolean => {
    return value.length >= minLength
  },
  
  maxLength: (value: string, maxLength: number): boolean => {
    return value.length <= maxLength
  }
}

// Form Utilities
export const form = {
  getErrorMessage: (field: string, value: string, rules: any = {}): string | null => {
    if (rules.required && !validate.required(value)) {
      return VALIDATION.required.message
    }
    
    if (rules.email && value && !validate.email(value)) {
      return VALIDATION.email.message
    }
    
    if (rules.phone && value && !validate.phone(value)) {
      return VALIDATION.phone.message
    }
    
    if (rules.minLength && value && !validate.minLength(value, rules.minLength)) {
      return `${field} must be at least ${rules.minLength} characters long`
    }
    
    if (rules.maxLength && value && !validate.maxLength(value, rules.maxLength)) {
      return `${field} must be no more than ${rules.maxLength} characters long`
    }
    
    return null
  },
  
  serializeFormData: (formData: FormData): Record<string, string> => {
    const data: Record<string, string> = {}
    const entries = Array.from(formData.entries())
    for (const [key, value] of entries) {
      data[key] = value.toString()
    }
    return data
  }
}

// URL Utilities
export const url = {
  isExternal: (url: string): boolean => {
    try {
      const parsedUrl = new URL(url)
      return parsedUrl.origin !== window.location.origin
    } catch {
      return false
    }
  },
  
  addParams: (baseUrl: string, params: Record<string, string>): string => {
    const url = new URL(baseUrl, window.location.origin)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
    return url.toString()
  },
  
  removeParams: (baseUrl: string, paramsToRemove: string[]): string => {
    const url = new URL(baseUrl, window.location.origin)
    paramsToRemove.forEach(param => {
      url.searchParams.delete(param)
    })
    return url.toString()
  }
}

// Array Utilities
export const array = {
  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  },
  
  unique: <T>(array: T[]): T[] => {
    return Array.from(new Set(array))
  },
  
  groupBy: <T>(array: T[], key: keyof T): Record<string, T[]> => {
    return array.reduce((groups, item) => {
      const group = String(item[key])
      groups[group] = groups[group] || []
      groups[group].push(item)
      return groups
    }, {} as Record<string, T[]>)
  }
}

// Local Storage Utilities
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Handle storage full or other errors silently
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.removeItem(key)
    } catch {
      // Handle errors silently
    }
  }
}

// Debounce Utility
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Throttle Utility
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0
  
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

// Copy to Clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!navigator.clipboard) {
    return false
  }
  
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}