'use client'

// Accessibility testing and enhancement utilities

export interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info'
  message: string
  element: HTMLElement | null
  rule: string
}

// Color contrast checker
export const checkColorContrast = (
  foregroundColor: string,
  backgroundColor: string,
  isLargeText: boolean = false
): { ratio: number; passes: boolean; level: 'AA' | 'AAA' | 'FAIL' } => {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16) / 255
    const g = parseInt(hex.substr(2, 2), 16) / 255
    const b = parseInt(hex.substr(4, 2), 16) / 255

    // Calculate relative luminance
    const getRGB = (val: number) => {
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    }

    return 0.2126 * getRGB(r) + 0.7152 * getRGB(g) + 0.0722 * getRGB(b)
  }

  const l1 = getLuminance(foregroundColor)
  const l2 = getLuminance(backgroundColor)
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)

  const minRatio = isLargeText ? 3 : 4.5
  const aaRatio = isLargeText ? 4.5 : 7

  if (ratio >= aaRatio) return { ratio, passes: true, level: 'AAA' }
  if (ratio >= minRatio) return { ratio, passes: true, level: 'AA' }
  return { ratio, passes: false, level: 'FAIL' }
}

// Check for proper heading hierarchy
export const checkHeadingHierarchy = (container: HTMLElement = document.body): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = []
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  
  let previousLevel = 0
  
  headings.forEach((heading, index) => {
    const currentLevel = parseInt(heading.tagName.charAt(1))
    
    if (index === 0 && currentLevel !== 1) {
      issues.push({
        type: 'error',
        message: 'Page should start with h1',
        element: heading as HTMLElement,
        rule: 'heading-hierarchy'
      })
    }
    
    if (currentLevel - previousLevel > 1) {
      issues.push({
        type: 'warning',
        message: `Heading level jumps from h${previousLevel} to h${currentLevel}`,
        element: heading as HTMLElement,
        rule: 'heading-hierarchy'
      })
    }
    
    previousLevel = currentLevel
  })
  
  return issues
}

// Check for missing alt text on images
export const checkImageAltText = (container: HTMLElement = document.body): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = []
  const images = container.querySelectorAll('img')
  
  images.forEach(img => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      issues.push({
        type: 'error',
        message: 'Image missing alt text',
        element: img,
        rule: 'img-alt'
      })
    }
    
    if (img.alt && img.alt.length > 125) {
      issues.push({
        type: 'warning',
        message: 'Alt text is very long (>125 characters)',
        element: img,
        rule: 'img-alt'
      })
    }
  })
  
  return issues
}

// Check for proper form labels
export const checkFormLabels = (container: HTMLElement = document.body): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = []
  const inputs = container.querySelectorAll('input, select, textarea')
  
  inputs.forEach(input => {
    const hasLabel = container.querySelector(`label[for="${input.id}"]`)
    const hasAriaLabel = input.getAttribute('aria-label')
    const hasAriaLabelledby = input.getAttribute('aria-labelledby')
    
    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledby) {
      issues.push({
        type: 'error',
        message: 'Form control missing label',
        element: input as HTMLElement,
        rule: 'form-label'
      })
    }
  })
  
  return issues
}

// Check for keyboard accessibility
export const checkKeyboardAccess = (container: HTMLElement = document.body): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = []
  const interactiveElements = container.querySelectorAll('button, a, input, select, textarea, [tabindex]')
  
  interactiveElements.forEach(element => {
    const tabIndex = element.getAttribute('tabindex')
    
    if (tabIndex && parseInt(tabIndex) > 0) {
      issues.push({
        type: 'warning',
        message: 'Avoid positive tabindex values',
        element: element as HTMLElement,
        rule: 'tabindex'
      })
    }
    
    // Check for click handlers without keyboard support
    if (element.tagName === 'DIV' || element.tagName === 'SPAN') {
      const hasClickHandler = element.getAttribute('onclick') || 
                             element.addEventListener.toString().includes('click')
      
      if (hasClickHandler && !element.getAttribute('role') && tabIndex !== '0') {
        issues.push({
          type: 'error',
          message: 'Clickable element not keyboard accessible',
          element: element as HTMLElement,
          rule: 'keyboard-access'
        })
      }
    }
  })
  
  return issues
}

// Check for proper ARIA attributes
export const checkAriaAttributes = (container: HTMLElement = document.body): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = []
  const elementsWithAria = container.querySelectorAll('[aria-expanded], [aria-hidden], [role]')
  
  elementsWithAria.forEach(element => {
    // Check aria-expanded
    const ariaExpanded = element.getAttribute('aria-expanded')
    if (ariaExpanded && !['true', 'false'].includes(ariaExpanded)) {
      issues.push({
        type: 'error',
        message: 'aria-expanded must be true or false',
        element: element as HTMLElement,
        rule: 'aria-expanded'
      })
    }
    
    // Check for elements with aria-hidden and focusable content
    const ariaHidden = element.getAttribute('aria-hidden')
    if (ariaHidden === 'true') {
      const focusableElements = element.querySelectorAll('button, a, input, select, textarea, [tabindex]')
      if (focusableElements.length > 0) {
        issues.push({
          type: 'warning',
          message: 'aria-hidden element contains focusable content',
          element: element as HTMLElement,
          rule: 'aria-hidden'
        })
      }
    }
  })
  
  return issues
}

// Check color usage (not relying solely on color)
export const checkColorUsage = (container: HTMLElement = document.body): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = []
  
  // Look for elements that might be using color alone to convey information
  const colorOnlyElements = container.querySelectorAll('.text-red-500, .text-green-500, .bg-red-500, .bg-green-500')
  
  colorOnlyElements.forEach(element => {
    const hasIcon = element.querySelector('svg, .icon, [class*="icon"]')
    const hasText = element.textContent?.trim()
    
    if (!hasIcon && (!hasText || hasText.length < 3)) {
      issues.push({
        type: 'warning',
        message: 'Element may be relying on color alone to convey information',
        element: element as HTMLElement,
        rule: 'color-usage'
      })
    }
  })
  
  return issues
}

// Comprehensive accessibility audit
export const runAccessibilityAudit = (container: HTMLElement = document.body): {
  issues: AccessibilityIssue[]
  score: number
  recommendations: string[]
} => {
  const allIssues: AccessibilityIssue[] = [
    ...checkHeadingHierarchy(container),
    ...checkImageAltText(container),
    ...checkFormLabels(container),
    ...checkKeyboardAccess(container),
    ...checkAriaAttributes(container),
    ...checkColorUsage(container)
  ]

  const errorCount = allIssues.filter(issue => issue.type === 'error').length
  const warningCount = allIssues.filter(issue => issue.type === 'warning').length
  
  // Simple scoring: 100 - (errors * 10) - (warnings * 5)
  const score = Math.max(0, 100 - (errorCount * 10) - (warningCount * 5))
  
  const recommendations = [
    'Ensure all images have descriptive alt text',
    'Use proper heading hierarchy (h1, h2, h3...)',
    'Provide labels for all form controls',
    'Make interactive elements keyboard accessible',
    'Use sufficient color contrast ratios',
    'Don\'t rely on color alone to convey information',
    'Test with screen readers and keyboard navigation'
  ]

  return {
    issues: allIssues,
    score,
    recommendations
  }
}

// Auto-fix some common accessibility issues
export const autoFixAccessibilityIssues = (container: HTMLElement = document.body): void => {
  // Add missing alt attributes to decorative images
  const decorativeImages = container.querySelectorAll('img:not([alt])')
  decorativeImages.forEach(img => {
    const isDecorative = img.closest('[role="presentation"]') || 
                        img.getAttribute('src')?.includes('decoration') ||
                        img.getAttribute('src')?.includes('pattern')
    
    if (isDecorative) {
      img.setAttribute('alt', '')
    }
  })

  // Add proper ARIA attributes to interactive elements
  const buttons = container.querySelectorAll('button:not([aria-label]):not([aria-labelledby])')
  buttons.forEach(button => {
    const text = button.textContent?.trim()
    if (!text || text.length < 3) {
      button.setAttribute('aria-label', 'Button')
    }
  })

  // Fix tabindex issues
  const positiveTabindex = container.querySelectorAll('[tabindex]:not([tabindex="0"]):not([tabindex="-1"])')
  positiveTabindex.forEach(element => {
    const tabindex = parseInt(element.getAttribute('tabindex') || '0')
    if (tabindex > 0) {
      element.setAttribute('tabindex', '0')
    }
  })
}

// Focus management utilities
export const createFocusTrap = (container: HTMLElement): {
  activate: () => void
  deactivate: () => void
} => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstFocusable = focusableElements[0] as HTMLElement
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault()
        lastFocusable.focus()
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault()
        firstFocusable.focus()
      }
    }
  }

  return {
    activate: () => {
      document.addEventListener('keydown', handleTabKey)
      firstFocusable?.focus()
    },
    deactivate: () => {
      document.removeEventListener('keydown', handleTabKey)
    }
  }
}

// Screen reader announcements
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.style.position = 'absolute'
  announcement.style.left = '-10000px'
  announcement.style.width = '1px'
  announcement.style.height = '1px'
  announcement.style.overflow = 'hidden'
  
  document.body.appendChild(announcement)
  announcement.textContent = message
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// High contrast mode detection
export const isHighContrastMode = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(-ms-high-contrast: active)').matches ||
         window.matchMedia('(prefers-contrast: high)').matches
}

// Enhanced focus indicators
export const enhanceFocusIndicators = (container: HTMLElement = document.body): void => {
  const style = document.createElement('style')
  style.textContent = `
    .enhanced-focus {
      outline: 3px solid #00B4A6 !important;
      outline-offset: 2px !important;
      border-radius: 4px !important;
    }
    
    .enhanced-focus:focus-visible {
      box-shadow: 0 0 0 3px rgba(0, 180, 166, 0.3) !important;
    }
  `
  document.head.appendChild(style)

  const focusableElements = container.querySelectorAll(
    'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )

  focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.classList.add('enhanced-focus')
    })
    
    element.addEventListener('blur', () => {
      element.classList.remove('enhanced-focus')
    })
  })
}