'use client'
import React, { useState } from 'react'

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea'
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  disabled?: boolean
  required?: boolean
  className?: string
  label?: string
  error?: string
  name?: string
  id?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'floating' | 'minimal'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  rows?: number
  helpText?: string
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  className = '',
  label,
  error,
  name,
  id,
  size = 'md',
  variant = 'default',
  icon,
  iconPosition = 'left',
  rows = 4,
  helpText,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  
  const baseClasses = `
    w-full transition-all duration-300 ease-in-out
    bg-white text-[var(--text-primary)]
    border-2 rounded-lg
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:bg-[var(--background-secondary)]
  `.replace(/\s+/g, ' ').trim()
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  }
  
  const variantClasses = {
    default: `
      border-[var(--border)]
      focus:border-[var(--accent-teal)]
      focus:ring-4 focus:ring-[var(--accent-teal)] focus:ring-opacity-20
    `,
    floating: `
      border-[var(--border)]
      focus:border-[var(--accent-teal)]
      focus:ring-4 focus:ring-[var(--accent-teal)] focus:ring-opacity-20
    `,
    minimal: `
      border-transparent border-b-[var(--border)]
      rounded-none
      focus:border-b-[var(--accent-teal)]
      focus:ring-0
    `,
  }
  
  const errorClasses = error ? `
    border-[var(--error)] 
    focus:border-[var(--error)]
    focus:ring-[var(--error)] focus:ring-opacity-20
  ` : ''
  
  const iconClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }
  
  const renderIcon = () => {
    if (!icon) return null
    
    const position = iconPosition === 'left' ? 'left-3' : 'right-3'
    
    return (
      <div className={`absolute ${position} top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]`}>
        <span className={iconClasses[size]}>
          {icon}
        </span>
      </div>
    )
  }
  
  const renderFloatingLabel = () => {
    if (variant !== 'floating' || !label) return null
    
    const isActive = isFocused || (value && value.length > 0)
    
    return (
      <label
        htmlFor={id}
        className={`
          absolute left-4 transition-all duration-300 ease-in-out
          pointer-events-none
          ${isActive
            ? 'top-2 text-xs text-[var(--accent-teal)] font-medium'
            : 'top-1/2 -translate-y-1/2 text-base text-[var(--text-secondary)]'
          }
        `.replace(/\s+/g, ' ').trim()}
      >
        {label}
        {required && <span className="text-[var(--error)] ml-1">*</span>}
      </label>
    )
  }
  
  const inputClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant].replace(/\s+/g, ' ').trim()}
    ${errorClasses}
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' ? 'pr-10' : ''}
    ${variant === 'floating' ? 'pt-6 pb-2' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim()
  
  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          name={name}
          id={id}
          placeholder={variant === 'floating' ? '' : placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          rows={rows}
          className={inputClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )
    }
    
    return (
      <input
        type={type}
        name={name}
        id={id}
        placeholder={variant === 'floating' ? '' : placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={inputClasses}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    )
  }
  
  return (
    <div className="space-y-2">
      {label && variant !== 'floating' && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
          {required && <span className="text-[var(--error)] ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {renderInput()}
        {renderIcon()}
        {renderFloatingLabel()}
      </div>
      
      {helpText && !error && (
        <p className="text-sm text-[var(--text-secondary)]">{helpText}</p>
      )}
      
      {error && (
        <p className="text-sm text-[var(--error)] flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}