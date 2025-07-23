'use client'

// Performance-aware animation utilities
export const isReducedMotionPreferred = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 768
}

export const shouldReduceAnimations = (): boolean => {
  return isReducedMotionPreferred() || isMobile()
}

// Performance-optimized intersection observer
export const createPerformantObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  }

  return new IntersectionObserver(callback, defaultOptions)
}

// Optimized scroll listener with throttling
export const createThrottledScrollListener = (
  callback: () => void,
  delay: number = 16 // ~60fps
): () => void => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0

  const throttledCallback = () => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      callback()
      lastExecTime = currentTime
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        callback()
        lastExecTime = Date.now()
        timeoutId = null
      }, delay - (currentTime - lastExecTime))
    }
  }

  return throttledCallback
}

// Performance-aware CSS animation classes
export const getAnimationClasses = (animationName: string): string => {
  if (shouldReduceAnimations()) {
    return 'motion-reduce:animate-none'
  }
  
  const baseClasses = 'transform-gpu will-change-transform'
  return `${baseClasses} ${animationName}`
}

// Optimized parallax calculations
export const calculateParallaxOffset = (
  element: HTMLElement,
  speed: number = 0.5
): number => {
  if (shouldReduceAnimations()) return 0
  
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const elementTop = rect.top
  const elementHeight = rect.height
  
  // Only calculate offset when element is in viewport
  if (elementTop > windowHeight || elementTop + elementHeight < 0) {
    return 0
  }
  
  const scrolled = window.pageYOffset
  const rate = scrolled * speed
  return rate
}

// Performance monitoring utilities
export class AnimationPerformanceMonitor {
  private frameCount = 0
  private lastFrameTime = performance.now()
  private fps = 60
  private isMonitoring = false

  start() {
    if (this.isMonitoring) return
    this.isMonitoring = true
    this.monitor()
  }

  stop() {
    this.isMonitoring = false
  }

  getFPS(): number {
    return this.fps
  }

  isPerformant(): boolean {
    return this.fps >= 30 // Consider 30+ FPS as performant
  }

  private monitor() {
    if (!this.isMonitoring) return

    const currentTime = performance.now()
    const deltaTime = currentTime - this.lastFrameTime
    
    this.frameCount++
    
    if (deltaTime >= 1000) { // Calculate FPS every second
      this.fps = Math.round((this.frameCount * 1000) / deltaTime)
      this.frameCount = 0
      this.lastFrameTime = currentTime
    }

    requestAnimationFrame(() => this.monitor())
  }
}

// Global performance monitor instance
export const performanceMonitor = new AnimationPerformanceMonitor()

// CSS-in-JS optimized animations
export const optimizedAnimations = {
  // Fade animations
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  
  fadeInUp: {
    from: { 
      opacity: 0, 
      transform: shouldReduceAnimations() ? 'translateY(0)' : 'translateY(20px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateY(0)' 
    }
  },

  // Scale animations (reduced on mobile)
  scaleIn: {
    from: { 
      opacity: 0, 
      transform: shouldReduceAnimations() ? 'scale(1)' : 'scale(0.95)' 
    },
    to: { 
      opacity: 1, 
      transform: 'scale(1)' 
    }
  },

  // Slide animations
  slideInLeft: {
    from: { 
      opacity: 0, 
      transform: shouldReduceAnimations() ? 'translateX(0)' : 'translateX(-20px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateX(0)' 
    }
  },

  slideInRight: {
    from: { 
      opacity: 0, 
      transform: shouldReduceAnimations() ? 'translateX(0)' : 'translateX(20px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateX(0)' 
    }
  }
}

// Performance-aware CSS classes generator
export const generatePerformantClasses = (baseClasses: string): string => {
  const performanceClasses = [
    'transform-gpu',
    'will-change-transform',
    'motion-reduce:transform-none',
    'motion-reduce:animate-none'
  ]

  return `${baseClasses} ${performanceClasses.join(' ')}`
}

// Optimized stagger animation helper
export const createStaggeredAnimation = (
  elements: NodeListOf<HTMLElement> | HTMLElement[],
  animationClass: string,
  delay: number = 100,
  options: {
    threshold?: number
    rootMargin?: string
    once?: boolean
  } = {}
): IntersectionObserver => {
  const { threshold = 0.1, rootMargin = '50px', once = true } = options

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement
        
        setTimeout(() => {
          element.classList.add(animationClass)
        }, index * (shouldReduceAnimations() ? 0 : delay))

        if (once) {
          observer.unobserve(element)
        }
      }
    })
  }, { threshold, rootMargin })

  elements.forEach((element) => {
    observer.observe(element)
  })

  return observer
}

// Optimized Ken Burns effect
export const createKenBurnsEffect = (
  element: HTMLElement,
  duration: number = 20000,
  options: {
    scaleStart?: number
    scaleEnd?: number
    rotation?: number
  } = {}
): void => {
  if (shouldReduceAnimations()) return

  const { scaleStart = 1, scaleEnd = 1.1, rotation = 0.5 } = options

  const animation = element.animate([
    { 
      transform: `scale(${scaleStart}) rotate(0deg)`,
      transformOrigin: 'center center'
    },
    { 
      transform: `scale(${scaleEnd}) rotate(${rotation}deg)`,
      transformOrigin: 'center center'
    },
    { 
      transform: `scale(${(scaleStart + scaleEnd) / 2}) rotate(-${rotation / 2}deg)`,
      transformOrigin: 'center center'
    }
  ], {
    duration,
    iterations: Infinity,
    direction: 'alternate',
    easing: 'ease-in-out'
  })

  // Pause animation if user prefers reduced motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  const handleChange = () => {
    if (mediaQuery.matches) {
      animation.pause()
    } else {
      animation.play()
    }
  }

  mediaQuery.addEventListener('change', handleChange)
  handleChange() // Check initial state
}

// Performance-optimized hover animations
export const createOptimizedHoverEffect = (
  element: HTMLElement,
  hoverTransforms: {
    scale?: number
    translateY?: number
    rotate?: number
  } = {}
): void => {
  if (shouldReduceAnimations()) return

  const { scale = 1.05, translateY = -2, rotate = 0 } = hoverTransforms

  const originalTransform = element.style.transform || ''

  element.addEventListener('mouseenter', () => {
    element.style.transform = `${originalTransform} scale(${scale}) translateY(${translateY}px) rotate(${rotate}deg)`
    element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  })

  element.addEventListener('mouseleave', () => {
    element.style.transform = originalTransform
  })

  // Clean up transitions to improve performance
  element.addEventListener('transitionend', () => {
    if (!element.matches(':hover')) {
      element.style.transition = ''
    }
  })
}

// Batch DOM updates for better performance
export const batchDOMUpdates = (callback: () => void): void => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback)
  } else {
    requestAnimationFrame(callback)
  }
}

// CSS Variables for theme-aware animations
export const setPerformantCSSVariables = (element: HTMLElement): void => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const reducedMotion = shouldReduceAnimations()

  element.style.setProperty('--animation-duration', reducedMotion ? '0s' : '0.3s')
  element.style.setProperty('--animation-scale', reducedMotion ? '1' : '1.05')
  element.style.setProperty('--animation-translate', reducedMotion ? '0px' : '4px')
  element.style.setProperty('--brand-primary', isDarkMode ? '#00B4A6' : '#003366')
  element.style.setProperty('--brand-secondary', isDarkMode ? '#003366' : '#00B4A6')
}

// Lazy load animations only when needed
export const lazyLoadAnimation = async (animationName: string): Promise<void> => {
  switch (animationName) {
    case 'kenBurns':
      // TODO: Implement heavy animation module
      console.log('Ken Burns animation would be loaded here')
      return
    
    case 'parallax':
      // TODO: Implement heavy animation module
      console.log('Advanced parallax animation would be loaded here')
      return
    
    default:
      console.warn(`Animation ${animationName} not found`)
  }
}