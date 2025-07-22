'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { addHoverAnimation } from '../../utils/animations'

interface AnimatedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  animation?: 'underline' | 'slide' | 'glow' | 'lift' | 'premium' | 'gradient'
  external?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  variant?: 'default' | 'nav' | 'button' | 'subtle'
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  href,
  children,
  className = '',
  animation = 'underline',
  external = false,
  icon,
  iconPosition = 'right',
  variant = 'default'
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  useEffect(() => {
    if (linkRef.current && animation !== 'underline') {
      addHoverAnimation(linkRef.current, animation as any)
    }
  }, [animation])
  
  const baseClasses = `
    relative inline-flex items-center transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B4A6]/50
    text-decoration-none transform-gpu will-change-transform
  `.replace(/\s+/g, ' ').trim()
  
  const variantClasses = {
    default: `
      text-[#003366] hover:text-[#00B4A6] font-medium
      ${animation === 'underline' ? 'link-underline' : ''}
    `,
    nav: `
      text-gray-700 hover:text-[#003366] font-semibold nav-item
      transition-all duration-300 relative
    `,
    button: `
      px-6 py-3 bg-gradient-to-r from-[#003366] to-[#00B4A6] text-white rounded-2xl
      hover:from-[#00B4A6] hover:to-[#003366] hover:shadow-xl hover:scale-105
      font-bold shadow-lg
    `,
    subtle: `
      text-gray-600 hover:text-[#003366] font-normal
      ${animation === 'underline' ? 'link-subtle-underline' : ''}
    `
  }
  
  const animationClasses = {
    underline: '',
    slide: 'hover:translate-x-1',
    glow: 'hover:shadow-lg hover:shadow-[#00B4A6]/20',
    lift: 'hover:-translate-y-0.5 hover:shadow-lg',
    premium: 'hover:-translate-y-1 hover:shadow-xl hover:shadow-[#003366]/20',
    gradient: 'text-gradient-animate'
  }
  
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)
  
  const renderIcon = () => {
    if (!icon) return null
    
    const iconClasses = `
      w-4 h-4 transition-all duration-300
      ${iconPosition === 'left' ? 'mr-2' : 'ml-2'}
      ${isHovered ? 'transform scale-110' : ''}
    `.replace(/\s+/g, ' ').trim()
    
    return (
      <span className={iconClasses}>
        {icon}
      </span>
    )
  }
  
  const linkProps = {
    ref: linkRef,
    className: `
      ${baseClasses}
      ${variantClasses[variant].replace(/\s+/g, ' ').trim()}
      ${animationClasses[animation]}
      ${className}
    `.replace(/\s+/g, ' ').trim(),
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ...(external && {
      target: '_blank',
      rel: 'noopener noreferrer'
    })
  }
  
  const linkContent = (
    <>
      <style jsx>{`
        .link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #003366, #00B4A6);
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .link-underline:hover::after {
          width: 100%;
        }
        
        .link-subtle-underline::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background: #00B4A6;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .link-subtle-underline:hover::after {
          width: 100%;
        }
        
        .text-gradient-animate {
          background: linear-gradient(
            90deg,
            #003366 0%,
            #00B4A6 50%,
            #003366 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-gradient-flow 3s ease-in-out infinite;
        }
        
        @keyframes text-gradient-flow {
          0%, 100% {
            background-position: 200% 0;
          }
          50% {
            background-position: -200% 0;
          }
        }
      `}</style>
      {iconPosition === 'left' && renderIcon()}
      <span className="relative z-10">{children}</span>
      {iconPosition === 'right' && renderIcon()}
      
      {/* Premium glow effect */}
      {animation === 'premium' && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/0 via-[#00B4A6]/10 to-[#003366]/0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10" />
      )}
    </>
  )
  
  if (external) {
    return (
      <a href={href} {...linkProps}>
        {linkContent}
      </a>
    )
  }
  
  return (
    <Link href={href} {...linkProps}>
      {linkContent}
    </Link>
  )
}