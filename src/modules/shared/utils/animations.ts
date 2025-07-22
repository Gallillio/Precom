'use client'

/**
 * Animation utilities for the Precom engineering consultancy website
 * Provides consistent scroll-triggered animations, micro-interactions, and performance optimization
 */

// Animation configuration constants
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 800,
  slowest: 1000
} as const

export const ANIMATION_EASING = {
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  bounceOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  smoothOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  premium: 'cubic-bezier(0.16, 1, 0.3, 1)'
} as const

export const SCROLL_ANIMATION_THRESHOLD = 0.1
export const SCROLL_ANIMATION_ROOT_MARGIN = '-10% 0px -20% 0px'

// Scroll animation observer instance
let scrollObserver: IntersectionObserver | null = null

/**
 * Initialize scroll-triggered animations with Intersection Observer
 */
export function initializeScrollAnimations(
  callback?: (entries: IntersectionObserverEntry[]) => void
): IntersectionObserver | null {
  // Don't initialize on server-side
  if (typeof window === 'undefined') return null

  // Create observer if it doesn't exist
  if (!scrollObserver) {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: SCROLL_ANIMATION_ROOT_MARGIN,
      threshold: SCROLL_ANIMATION_THRESHOLD
    }

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement
        
        if (entry.isIntersecting) {
          // Add animation classes when element enters viewport
          element.classList.add('animate-in')
          element.classList.remove('animate-out')
          
          // Trigger custom callback if provided
          callback?.(entries)
        } else {
          // Remove animation classes when element exits viewport (optional)
          element.classList.remove('animate-in')
          element.classList.add('animate-out')
        }
      })
    }, observerOptions)
  }

  return scrollObserver
}

/**
 * Add scroll animation to an element
 */
export function addScrollAnimation(
  element: HTMLElement,
  animationType: 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale-in' | 'rotate-in' = 'fade-in',
  delay: number = 0
): void {
  if (!element || !scrollObserver) return

  // Add base animation classes
  element.classList.add('scroll-animate', `scroll-${animationType}`)
  
  // Add delay if specified
  if (delay > 0) {
    element.style.animationDelay = `${delay}ms`
  }

  // Observe the element
  scrollObserver.observe(element)
}

/**
 * Remove scroll animation from an element
 */
export function removeScrollAnimation(element: HTMLElement): void {
  if (!element || !scrollObserver) return
  
  scrollObserver.unobserve(element)
  element.classList.remove(
    'scroll-animate',
    'scroll-fade-in',
    'scroll-slide-up',
    'scroll-slide-down',
    'scroll-slide-left',
    'scroll-slide-right',
    'scroll-scale-in',
    'scroll-rotate-in',
    'animate-in',
    'animate-out'
  )
}

/**
 * Batch add scroll animations to multiple elements with staggered delays
 */
export function addStaggeredScrollAnimations(
  elements: HTMLElement[],
  animationType: 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale-in' | 'rotate-in' = 'fade-in',
  staggerDelay: number = 100
): void {
  elements.forEach((element, index) => {
    addScrollAnimation(element, animationType, index * staggerDelay)
  })
}

/**
 * Enhanced hover animation for buttons and interactive elements
 */
export function addHoverAnimation(
  element: HTMLElement,
  type: 'lift' | 'scale' | 'glow' | 'slide' | 'bounce' | 'premium' = 'premium'
): void {
  if (!element) return

  element.classList.add('hover-animate', `hover-${type}`)
}

/**
 * Add loading animation to an element
 */
export function addLoadingAnimation(
  element: HTMLElement,
  type: 'pulse' | 'spin' | 'bounce' | 'wave' | 'skeleton' = 'pulse'
): void {
  if (!element) return

  element.classList.add('loading-animate', `loading-${type}`)
}

/**
 * Remove loading animation from an element
 */
export function removeLoadingAnimation(element: HTMLElement): void {
  if (!element) return

  element.classList.remove(
    'loading-animate',
    'loading-pulse',
    'loading-spin',
    'loading-bounce',
    'loading-wave',
    'loading-skeleton'
  )
}

/**
 * Add parallax effect to an element
 */
export function addParallaxEffect(
  element: HTMLElement,
  speed: number = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical'
): void {
  if (!element || typeof window === 'undefined') return

  let ticking = false

  const updateTransform = () => {
    const scrolled = window.pageYOffset
    const rect = element.getBoundingClientRect()
    const elementTop = rect.top + scrolled
    const elementHeight = rect.height
    const windowHeight = window.innerHeight

    // Only apply parallax when element is in viewport
    if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
      const yPos = -(scrolled - elementTop) * speed
      const transform = direction === 'vertical' 
        ? `translate3d(0, ${yPos}px, 0)` 
        : `translate3d(${yPos}px, 0, 0)`
      
      element.style.transform = transform
    }

    ticking = false
  }

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateTransform)
      ticking = true
    }
  }

  // Add parallax class for CSS enhancements
  element.classList.add('parallax-element')

  // Listen to scroll events
  window.addEventListener('scroll', handleScroll, { passive: true })

  // Store cleanup function on element for later removal
  ;(element as any)._parallaxCleanup = () => {
    window.removeEventListener('scroll', handleScroll)
    element.classList.remove('parallax-element')
    element.style.transform = ''
  }
}

/**
 * Remove parallax effect from an element
 */
export function removeParallaxEffect(element: HTMLElement): void {
  if (!element) return

  const cleanup = (element as any)._parallaxCleanup
  if (cleanup && typeof cleanup === 'function') {
    cleanup()
    delete (element as any)._parallaxCleanup
  }
}

/**
 * Create a staggered entrance animation for child elements
 */
export function createStaggeredEntrance(
  container: HTMLElement,
  childSelector: string = '> *',
  delay: number = 100,
  animationType: 'fade-in' | 'slide-up' | 'scale-in' = 'fade-in'
): void {
  if (!container) return

  const children = container.querySelectorAll(childSelector) as NodeListOf<HTMLElement>
  
  children.forEach((child, index) => {
    // Initially hide children
    child.style.opacity = '0'
    child.style.transform = getInitialTransform(animationType)
    
    // Animate them in with delay
    setTimeout(() => {
      child.style.transition = `all ${ANIMATION_DURATION.normal}ms ${ANIMATION_EASING.premium}`
      child.style.opacity = '1'
      child.style.transform = 'none'
    }, index * delay)
  })
}

/**
 * Get initial transform based on animation type
 */
function getInitialTransform(type: 'fade-in' | 'slide-up' | 'scale-in'): string {
  switch (type) {
    case 'slide-up':
      return 'translateY(20px)'
    case 'scale-in':
      return 'scale(0.95)'
    default:
      return 'none'
  }
}

/**
 * Performance-optimized animation function using requestAnimationFrame
 */
export function animateValue(
  element: HTMLElement,
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
): void {
  let startTime: number | null = null

  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime
    
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Use easing function for smooth animation
    const easeProgress = 1 - Math.pow(1 - progress, 3) // Ease-out cubic
    const currentValue = start + (end - start) * easeProgress
    
    callback(currentValue)
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

/**
 * Clean up all animation observers and effects
 */
export function cleanupAnimations(): void {
  if (scrollObserver) {
    scrollObserver.disconnect()
    scrollObserver = null
  }

  // Clean up parallax effects
  document.querySelectorAll('.parallax-element').forEach((element) => {
    removeParallaxEffect(element as HTMLElement)
  })
}

// Auto-initialize on client-side
if (typeof window !== 'undefined') {
  // Initialize scroll animations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializeScrollAnimations()
    })
  } else {
    initializeScrollAnimations()
  }

  // Clean up on page unload
  window.addEventListener('beforeunload', cleanupAnimations)
}