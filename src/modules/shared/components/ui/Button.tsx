import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'teal'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
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
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-lg border-none cursor-pointer
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    text-decoration-none
  `.replace(/\s+/g, ' ').trim()
  
  const variantClasses = {
    primary: `
      bg-[var(--primary-blue)] text-white
      hover:bg-[var(--accent-teal)] hover:shadow-lg hover:-translate-y-0.5
      focus:ring-[var(--accent-teal)] focus:ring-opacity-50
      active:transform active:scale-95
    `,
    secondary: `
      bg-[var(--text-secondary)] text-white
      hover:bg-[var(--text-primary)] hover:shadow-lg hover:-translate-y-0.5
      focus:ring-[var(--text-primary)] focus:ring-opacity-50
      active:transform active:scale-95
    `,
    outline: `
      bg-transparent text-[var(--primary-blue)] border-2 border-[var(--primary-blue)]
      hover:bg-[var(--primary-blue)] hover:text-white hover:shadow-lg hover:-translate-y-0.5
      focus:ring-[var(--primary-blue)] focus:ring-opacity-50
      active:transform active:scale-95
    `,
    teal: `
      bg-[var(--accent-teal)] text-white
      hover:bg-[var(--primary-blue)] hover:shadow-lg hover:-translate-y-0.5
      focus:ring-[var(--accent-teal)] focus:ring-opacity-50
      active:transform active:scale-95
    `,
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm min-h-[2rem]',
    md: 'px-6 py-3 text-base min-h-[2.75rem]',
    lg: 'px-8 py-4 text-lg min-h-[3.5rem]',
    xl: 'px-10 py-5 text-xl min-h-[4rem]',
  }
  
  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  }
  
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed hover:transform-none' : ''
  
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
    <button
      type={type}
      onClick={onClick}
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
      <span className={loading ? 'opacity-70' : ''}>{children}</span>
      {!loading && icon && iconPosition === 'right' && renderIcon(icon, 'right')}
    </button>
  )
}