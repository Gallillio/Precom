'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Card } from '@/modules/shared/components/ui'

interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  content: string
  rating: number
  avatar?: string
}

interface TestimonialsProps {
  className?: string
  testimonials?: Testimonial[]
  showRating?: boolean
  variant?: 'default' | 'grid' | 'carousel'
  title?: string
  description?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Project Manager',
    company: 'BuildCorp Solutions',
    content: 'Precom delivered exceptional engineering consultation that exceeded our expectations. Their attention to detail and technical expertise saved us both time and money on our commercial project.',
    rating: 5,
    avatar: '/images/testimonials/sarah.jpg'
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'Construction Director',
    company: 'Metro Development',
    content: 'Working with Precom was a game-changer for our residential development. Their structural engineering insights and project management guidance were invaluable throughout the entire process.',
    rating: 5,
    avatar: '/images/testimonials/michael.jpg'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    position: 'Facilities Manager',
    company: 'Tech Innovations Inc',
    content: 'The team at Precom provided comprehensive engineering consulting for our office expansion. Their professionalism and technical knowledge made the complex project seamless.',
    rating: 5,
    avatar: '/images/testimonials/emily.jpg'
  },
  {
    id: '4',
    name: 'David Thompson',
    position: 'Owner',
    company: 'Thompson Manufacturing',
    content: 'Precom\'s engineering expertise helped us optimize our manufacturing facility layout. Their recommendations improved efficiency by 30% and reduced operational costs significantly.',
    rating: 5,
    avatar: '/images/testimonials/david.jpg'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    position: 'Development Manager',
    company: 'Urban Planning Associates',
    content: 'Outstanding service and technical excellence. Precom\'s engineering team provided innovative solutions that made our mixed-use development project a success.',
    rating: 5,
    avatar: '/images/testimonials/lisa.jpg'
  },
  {
    id: '6',
    name: 'Robert Martinez',
    position: 'Operations Manager',
    company: 'Energy Solutions Ltd',
    content: 'The engineering consultation from Precom was thorough and professional. They helped us navigate complex regulatory requirements and delivered solutions on time and within budget.',
    rating: 5,
    avatar: '/images/testimonials/robert.jpg'
  }
]

export const Testimonials: React.FC<TestimonialsProps> = ({
  className = '',
  testimonials = defaultTestimonials,
  showRating = true,
  variant = 'default',
  title = 'What Our Clients Say',
  description = 'Don\'t just take our word for it. Here\'s what our clients have to say about working with Precom.'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  const renderTestimonial = (testimonial: Testimonial, index: number) => (
    <Card key={testimonial.id} className="h-full">
      <div className="p-6">
        {showRating && (
          <div className="mb-4">
            {renderStars(testimonial.rating)}
          </div>
        )}
        
        <blockquote className="text-gray-700 mb-6">
          &quot;{testimonial.content}&quot;
        </blockquote>
        
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
                sizes="48px"
                priority={false}
              />
            ) : (
              <span className="text-blue-600 font-semibold text-lg">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-gray-600">
              {testimonial.position} at {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )

  if (variant === 'grid') {
    return (
      <div className={`${className}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => renderTestimonial(testimonial, index))}
        </div>
      </div>
    )
  }

  if (variant === 'carousel') {
    const nextTestimonial = () => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
      <div className={`${className}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  {renderTestimonial(testimonial, index)}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.slice(0, 4).map((testimonial, index) => renderTestimonial(testimonial, index))}
        </div>

        {testimonials.length > 4 && (
          <div className="mt-8 text-center">
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View More Testimonials
            </button>
          </div>
        )}
      </div>
    </div>
  )
}