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
    default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    secondary: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    success: 'bg-green-100 text-green-800 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    error: 'bg-red-100 text-red-800 hover:bg-red-200',
    info: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'
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
    online: { color: 'bg-green-500', text: 'Online' },
    offline: { color: 'bg-gray-400', text: 'Offline' },
    busy: { color: 'bg-red-500', text: 'Busy' },
    away: { color: 'bg-yellow-500', text: 'Away' }
  }

  const config = statusConfig[status]

  return (
    <div className={`inline-flex items-center ${className}`}>
      <div className={`w-2 h-2 rounded-full ${config.color} ${showText ? 'mr-1.5' : ''}`} />
      {showText && (
        <span className="text-xs text-gray-600">{config.text}</span>
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
          className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
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