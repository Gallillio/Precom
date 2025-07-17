import React from 'react'
import { BlogPost } from '@/modules/shared/utils/types'
import { Card } from '@/modules/shared/components/ui'

interface BlogCardProps {
  post: BlogPost
  className?: string
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, className = '' }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date))
  }

  return (
    <Card className={`h-full hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <a href={`/blog/${post.slug}`} className="block h-full">
        <div className="h-full flex flex-col">
          {post.coverImage && (
            <div className="relative overflow-hidden rounded-t-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-48 object-cover transition-transform duration-200 hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {post.category}
                </span>
              </div>
            </div>
          )}
          
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <time dateTime={post.publishedAt?.toISOString()}>
                {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
              </time>
              <span className="mx-2">•</span>
              <span>{post.readingTime} min read</span>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
              {post.title}
            </h3>

            <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center">
                {post.author.avatar && (
                  <div className="w-8 h-8 mr-2 rounded-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <span className="text-sm text-gray-700 font-medium">
                  {post.author.name}
                </span>
              </div>

              <div className="flex flex-wrap gap-1 max-w-32">
                {post.tags.slice(0, 2).map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="text-xs text-gray-400">
                    +{post.tags.length - 2}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors">
                Read More →
              </span>
            </div>
          </div>
        </div>
      </a>
    </Card>
  )
}