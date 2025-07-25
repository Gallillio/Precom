import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'hover' | 'elevated' | 'bordered'
  onClick?: () => void
  header?: React.ReactNode
  footer?: React.ReactNode
  style?: React.CSSProperties
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  variant = 'default',
  onClick,
  header,
  footer,
  style,
}) => {
  const baseClasses = `
    bg-white rounded-lg border border-[var(--border)]
    transition-all duration-300 ease-in-out
    overflow-hidden
  `.replace(/\s+/g, ' ').trim()
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }
  
  const variantClasses = {
    default: `
      shadow-[var(--shadow-sm)]
    `,
    hover: `
      shadow-[var(--shadow-sm)] cursor-pointer
      hover:shadow-[var(--shadow-lg)] hover:-translate-y-1
      hover:border-[var(--accent-teal)] hover:border-opacity-50
      active:transform active:scale-98
    `,
    elevated: `
      shadow-[var(--shadow-lg)]
      border-[var(--border-secondary)]
    `,
    bordered: `
      shadow-none border-2 border-[var(--border-secondary)]
      hover:border-[var(--accent-teal)] hover:border-opacity-50
    `,
  }
  
  const contentPadding = padding !== 'none' ? paddingClasses[padding] : ''
  
  return (
    <div 
      className={`
        ${baseClasses}
        ${variantClasses[variant].replace(/\s+/g, ' ').trim()}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      onClick={onClick}
      style={style}
    >
      {header && (
        <div className={`
          border-b border-[var(--border)] 
          ${padding !== 'none' ? 'px-6 py-4' : ''}
          bg-[var(--background-tertiary)]
        `.replace(/\s+/g, ' ').trim()}>
          {header}
        </div>
      )}
      
      <div className={contentPadding}>
        {children}
      </div>
      
      {footer && (
        <div className={`
          border-t border-[var(--border)] 
          ${padding !== 'none' ? 'px-6 py-4' : ''}
          bg-[var(--background-tertiary)]
        `.replace(/\s+/g, ' ').trim()}>
          {footer}
        </div>
      )}
    </div>
  )
}