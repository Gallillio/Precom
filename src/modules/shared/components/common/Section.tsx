import React from 'react'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  background?: 'white' | 'gray' | 'blue' | 'transparent'
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  padding = 'lg',
  background = 'transparent',
}) => {
  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20',
  }

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    transparent: '',
  }

  return (
    <section 
      id={id}
      className={`${paddingClasses[padding]} ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </section>
  )
}

export default Section