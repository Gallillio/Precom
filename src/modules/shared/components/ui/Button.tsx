'use client'

import React, { useRef, useEffect } from 'react'
import { addHoverAnimation } from '../../utils/animations'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'teal' | 'premium' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  animation?: 'premium' | 'lift' | 'scale' | 'glow' | 'bounce' | 'none'
  ripple?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  icon,
  iconPosition = 'left',
  animation = 'premium',
  ripple = true,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  useEffect(() => {
    if (buttonRef.current && animation !== 'none') {
      addHoverAnimation(buttonRef.current, animation)
    }
  }, [animation])
  const baseClasses = `
    inline-flex items-center justify-center relative overflow-hidden
    font-semibold rounded-2xl border-none cursor-pointer
    transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)
    focus:outline-none focus:ring-4 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    text-decoration-none shadow-lg backdrop-blur-sm
    transform-gpu will-change-transform
    ${ripple ? 'btn-animate' : ''}
    ${animation !== 'none' ? 'hover-animate hover-' + animation : ''}
  `.replace(/\s+/g, ' ').trim()
  
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-[#003366] to-[#00456B] text-white
      hover:from-[#00456B] hover:to-[#00B4A6] hover:shadow-2xl
      focus:ring-[#00B4A6]/30 focus:ring-opacity-100
      active:transform active:scale-98 border-2 border-transparent
    `,
    secondary: `
      bg-gradient-to-r from-gray-600 to-gray-700 text-white
      hover:from-gray-700 hover:to-gray-800 hover:shadow-2xl
      focus:ring-gray-500/30 focus:ring-opacity-100
      active:transform active:scale-98 border-2 border-transparent
    `,
    outline: `
      bg-white/90 backdrop-blur-sm text-[#003366] border-2 border-[#003366]/50
      hover:bg-gradient-to-r hover:from-[#003366] hover:to-[#00B4A6] hover:text-white hover:shadow-2xl hover:border-transparent
      focus:ring-[#003366]/30 focus:ring-opacity-100
      active:transform active:scale-98
    `,
    teal: `
      bg-gradient-to-r from-[#00B4A6] to-[#00D4C4] text-white
      hover:from-[#003366] hover:to-[#00B4A6] hover:shadow-2xl
      focus:ring-[#00B4A6]/30 focus:ring-opacity-100
      active:transform active:scale-98 border-2 border-transparent
    `,
    premium: `
      bg-gradient-to-r from-[#003366] via-[#00456B] to-[#00B4A6] text-white
      hover:shadow-2xl hover:shadow-[#00B4A6]/20
      focus:ring-[#00B4A6]/40 focus:ring-opacity-100
      active:transform active:scale-98 border-2 border-white/20
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
      before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700
    `,
    gradient: `
      bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white
      hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 hover:shadow-2xl
      focus:ring-purple-500/30 focus:ring-opacity-100
      active:transform active:scale-98 border-2 border-transparent
    `,
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[2.5rem] rounded-xl',
    md: 'px-8 py-4 text-base min-h-[3rem] rounded-2xl',
    lg: 'px-10 py-5 text-lg min-h-[3.5rem] rounded-2xl',
    xl: 'px-12 py-6 text-xl min-h-[4rem] rounded-3xl',
  }
  
  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  }
  
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed hover:transform-none filter grayscale' : ''
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return
    
    // Create ripple effect if enabled
    if (ripple && buttonRef.current) {
      const button = buttonRef.current
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      
      const rippleElement = document.createElement('span')
      rippleElement.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
      `
      
      button.appendChild(rippleElement)
      
      // Remove ripple after animation
      setTimeout(() => {
        if (rippleElement.parentNode) {
          rippleElement.parentNode.removeChild(rippleElement)
        }
      }, 600)
    }
    
    onClick?.()
  }
  
  const renderIcon = (iconElement: React.ReactNode, position: 'left' | 'right') => {
    if (!iconElement) return null
    
    const iconClasses = `${iconSizeClasses[size]} ${
      position === 'left' ? 'mr-2' : 'ml-2'
    }`
    
    return (
      <span className={iconClasses}>
        {iconElement}
      </span>
    )
  }
  
  const renderLoadingSpinner = () => (
    <svg 
      className={`animate-spin ${iconSizeClasses[size]} mr-2`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
  
  return (
    <>
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
      <button
        ref={buttonRef}
        type={type}
        onClick={handleClick}
        disabled={disabled || loading}
        className={`
          ${baseClasses}
          ${variantClasses[variant].replace(/\s+/g, ' ').trim()}
          ${sizeClasses[size]}
          ${disabledClasses}
          ${className}
        `.replace(/\s+/g, ' ').trim()}
      >
        {loading && renderLoadingSpinner()}
        {!loading && icon && iconPosition === 'left' && renderIcon(icon, 'left')}
        <span className={`relative z-20 transition-all duration-300 ${loading ? 'opacity-70' : ''}`}>{children}</span>
        {!loading && icon && iconPosition === 'right' && renderIcon(icon, 'right')}
        
        {/* Shine effect for premium variant */}
        {variant === 'premium' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        )}
      </button>
    </>
  )
}