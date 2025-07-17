import React from 'react'
import { BlogPost as BlogPostType } from '@/modules/shared/utils/types'
import { Card } from '@/modules/shared/components/ui'

interface BlogPostProps {
  post: BlogPostType
  className?: string
  showFullContent?: boolean
}

export const BlogPost: React.FC<BlogPostProps> = ({ 
  post, 
  className = '', 
  showFullContent = false 
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date))
  }

  const formatReadingTime = (minutes: number) => {
    return `${minutes} min read`
  }

  return (
    <article className={`${className}`}>
      <Card className="h-full">
        <div className="p-8">
          {post.coverImage && (
            <div className="mb-6 -mx-8 -mt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </div>
          )}

          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mr-3">
                {post.category}
              </span>
              <time dateTime={post.publishedAt?.toISOString()}>
                {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
              </time>
              <span className="mx-2">•</span>
              <span>{formatReadingTime(post.readingTime)}</span>
            </div>

            <h1 className={`font-bold text-gray-900 mb-3 ${showFullContent ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
              {post.title}
            </h1>

            {!showFullContent && (
              <p className="text-gray-600 leading-relaxed mb-4">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="flex items-center mb-6">
            {post.author.avatar && (
              <div className="w-10 h-10 mr-3 rounded-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              {post.author.bio && (
                <p className="text-sm text-gray-500">{post.author.bio}</p>
              )}
            </div>
          </div>

          {showFullContent ? (
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{post.tags.length - 3} more
                  </span>
                )}
              </div>
              
              <a 
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
              >
                Read More →
              </a>
            </div>
          )}

          {showFullContent && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {post.author.socialLinks && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Follow the author:</span>
                  {post.author.socialLinks.linkedin && (
                    <a 
                      href={post.author.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                  {post.author.socialLinks.twitter && (
                    <a 
                      href={post.author.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                  {post.author.socialLinks.github && (
                    <a 
                      href={post.author.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </article>
  )
}