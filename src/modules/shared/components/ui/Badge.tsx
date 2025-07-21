import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  onClick
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors duration-200'
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }

  const variantClasses = {
    default: 'bg-[var(--secondary-gray)] text-[var(--text-primary)] hover:bg-[var(--background-tertiary)]',
    primary: 'bg-[var(--primary-blue)] bg-opacity-10 text-[var(--primary-blue)] hover:bg-opacity-20',
    secondary: 'bg-[var(--text-secondary)] bg-opacity-10 text-[var(--text-secondary)] hover:bg-opacity-20',
    success: 'bg-[var(--success)] bg-opacity-10 text-[var(--success)] hover:bg-opacity-20',
    warning: 'bg-[var(--warning)] bg-opacity-10 text-[var(--warning)] hover:bg-opacity-20',
    error: 'bg-red-100 text-red-800 hover:bg-red-200',
    info: 'bg-[var(--accent-teal)] bg-opacity-10 text-[var(--accent-teal)] hover:bg-opacity-20'
  }

  const classes = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        {children}
      </button>
    )
  }

  return (
    <span className={classes}>
      {children}
    </span>
  )
}

// Specialized badge variants
interface StatusBadgeProps {
  status: 'online' | 'offline' | 'busy' | 'away'
  showText?: boolean
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showText = false,
  className = ''
}) => {
  const statusConfig = {
    online: { color: 'bg-[var(--success)]', text: 'Online' },
    offline: { color: 'bg-[var(--text-secondary)]', text: 'Offline' },
    busy: { color: 'bg-red-500', text: 'Busy' },
    away: { color: 'bg-[var(--warning)]', text: 'Away' }
  }

  const config = statusConfig[status]

  return (
    <div className={`inline-flex items-center ${className}`}>
      <div className={`w-2 h-2 rounded-full ${config.color} ${showText ? 'mr-1.5' : ''}`} />
      {showText && (
        <span className="text-xs text-[var(--text-secondary)]">{config.text}</span>
      )}
    </div>
  )
}

interface CountBadgeProps {
  count: number
  max?: number
  showZero?: boolean
  className?: string
}

export const CountBadge: React.FC<CountBadgeProps> = ({
  count,
  max = 99,
  showZero = false,
  className = ''
}) => {
  if (count === 0 && !showZero) return null

  const displayCount = count > max ? `${max}+` : count.toString()

  return (
    <Badge 
      variant="error" 
      size="sm" 
      className={`min-w-[1.25rem] justify-center ${className}`}
    >
      {displayCount}
    </Badge>
  )
}

interface TagBadgeProps {
  tag: string
  onRemove?: () => void
  className?: string
}

export const TagBadge: React.FC<TagBadgeProps> = ({
  tag,
  onRemove,
  className = ''
}) => {
  return (
    <Badge 
      variant="default" 
      size="sm" 
      className={`${onRemove ? 'pr-1' : ''} ${className}`}
    >
      <span>{tag}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none transition-colors duration-200"
          aria-label={`Remove ${tag} tag`}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </Badge>
  )
}