import React from 'react'
import { BlogPost } from '@/modules/shared/utils/types'

interface BlogCardProps {
  post: BlogPost
  className?: string
  variant?: 'default' | 'featured' | 'compact'
}

export const BlogCard: React.FC<BlogCardProps> = ({ 
  post, 
  className = '',
  variant = 'default'
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date))
  }

  if (variant === 'compact') {
    return (
      <article className={`group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#00B4A6]/20 ${className}`}>
        <a href={`/blog/${post.slug}`} className="block">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-gradient-to-r from-[#003366] to-[#00B4A6] text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readingTime} min read</span>
                </div>
                <h3 className="text-lg font-bold text-[#003366] mb-2 group-hover:text-[#00B4A6] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#003366] to-[#00B4A6] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {post.author.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-700 font-medium">{post.author.name}</span>
                  </div>
                  <time className="text-xs text-gray-500">
                    {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </a>
      </article>
    )
  }

  return (
    <article className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#00B4A6]/30 overflow-hidden hover:-translate-y-2 ${className}`}>
      <a href={`/blog/${post.slug}`} className="block h-full">
        <div className="h-full flex flex-col">
          {/* Premium Image Container */}
          <div className="relative overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-[#003366] to-[#00B4A6] relative">
              {post.coverImage && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </>
              )}
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#00B4A6] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {post.category}
                </span>
              </div>
              
              {/* Reading Time */}
              <div className="absolute top-4 right-4 flex items-center text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readingTime} min read
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/20 to-transparent group-hover:from-[#003366]/10 transition-all duration-500" />
            </div>
          </div>
          
          {/* Premium Content */}
          <div className="p-8 flex flex-col flex-grow">
            {/* Author and Date */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#003366] to-[#00B4A6] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-[#003366] text-sm">{post.author.name}</p>
                  <p className="text-xs text-gray-600">{post.author.bio}</p>
                </div>
              </div>
              <time className="text-sm text-gray-500 font-medium">
                {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
              </time>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-[#003366] mb-4 leading-tight group-hover:text-[#00B4A6] transition-colors line-clamp-3">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-700 mb-6 line-clamp-3 flex-grow leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium hover:bg-[#00B4A6] hover:text-white transition-colors"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-400 flex items-center px-2">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>

            {/* Premium CTA */}
            <div className="mt-auto pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between group-hover:justify-center transition-all duration-300">
                <span className="bg-gradient-to-r from-[#003366] to-[#00B4A6] bg-clip-text text-transparent font-bold text-sm group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-[#00B4A6] group-hover:to-[#003366] group-hover:bg-clip-border group-hover:px-4 group-hover:py-2 group-hover:rounded-xl transition-all duration-300">
                  Read Full Article
                </span>
                <div className="group-hover:hidden">
                  <svg className="w-5 h-5 text-[#00B4A6] group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </article>
  )
}