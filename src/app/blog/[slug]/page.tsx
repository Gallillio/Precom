import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BlogPost } from '@/modules/blog/components/BlogPost'
import { BlogPost as BlogPostType } from '@/modules/shared/utils/types'

// Sample blog data - in a real app, this would come from a CMS or database
const samplePosts: BlogPostType[] = [
  {
    id: '1',
    title: 'The Future of Structural Engineering: Embracing Digital Transformation',
    slug: 'future-structural-engineering-digital-transformation',
    excerpt: 'Explore how digital technologies like BIM, AI, and IoT are revolutionizing structural engineering practices and improving project outcomes.',
    content: `The engineering industry is experiencing a digital revolution that's transforming how we design, build, and maintain structures. From Building Information Modeling (BIM) to artificial intelligence and IoT sensors, these technologies are not just changing our tools—they're fundamentally altering our approach to engineering challenges.

Building Information Modeling has become the cornerstone of modern engineering projects. BIM allows us to create detailed 3D models that encompass not just the physical aspects of a structure, but also time schedules, cost information, and material specifications. This holistic approach reduces errors, improves collaboration, and enables better decision-making throughout the project lifecycle.

Artificial Intelligence is another game-changer in our field. AI algorithms can analyze vast amounts of structural data to identify patterns and potential issues that might escape human observation. Machine learning models can predict structural behavior under various conditions, optimize designs for cost and performance, and even identify maintenance needs before problems become critical.

The Internet of Things (IoT) is bringing our structures to life with smart sensors that continuously monitor structural health. These sensors can detect minute changes in stress, vibration, temperature, and other critical parameters, providing real-time insights into structural performance and safety.

As we embrace these digital transformation trends, we're not replacing human expertise—we're augmenting it. Engineers who adapt to these new tools will find themselves more efficient, more accurate, and better equipped to tackle the complex challenges of modern construction projects.

The future of structural engineering lies in the seamless integration of these digital technologies with traditional engineering expertise. By embracing this transformation, we can deliver better outcomes for our clients while advancing the profession as a whole.`,
    author: {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      bio: 'Principal Engineer at Precom',
      avatar: '/images/team/sarah-johnson.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sarah-johnson'
      }
    },
    category: 'Technology',
    tags: ['BIM', 'AI', 'Digital Transformation', 'Structural Engineering'],
    published: true,
    publishedAt: new Date('2024-01-15'),
    readingTime: 8,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
    coverImage: '/images/blog/digital-transformation.jpg'
  },
  {
    id: '2',
    title: 'Sustainable Engineering: Building for a Greener Tomorrow',
    slug: 'sustainable-engineering-building-greener-tomorrow',
    excerpt: 'Learn about sustainable engineering practices, green building certifications, and how we can reduce the environmental impact of construction projects.',
    content: `Sustainability has moved from a nice-to-have to an essential requirement in modern engineering. As climate change concerns grow and environmental regulations tighten, engineers must prioritize eco-friendly solutions that minimize environmental impact while maintaining structural integrity and cost-effectiveness.

Green building certifications like LEED, BREEAM, and Green Star have established frameworks for sustainable construction. These standards guide engineers in selecting materials, designing energy-efficient systems, and implementing water conservation strategies. Achieving these certifications not only benefits the environment but also provides economic advantages through reduced operating costs and increased property values.

Material selection plays a crucial role in sustainable engineering. We're seeing increased use of recycled materials, locally sourced products, and innovative eco-friendly alternatives. Engineered bamboo, recycled steel, and bio-based insulation materials are just a few examples of how the industry is evolving.

Energy efficiency is another critical aspect of sustainable engineering. Passive design strategies, renewable energy integration, and smart building systems all contribute to reducing a structure's carbon footprint. Heat recovery systems, solar panels, and geothermal heating are becoming standard features in sustainable projects.

Water management is equally important. Rainwater harvesting, greywater recycling, and permeable paving systems help reduce water consumption and manage stormwater runoff effectively.

The transition to sustainable engineering requires collaboration between architects, engineers, contractors, and clients. By working together and prioritizing environmental considerations from the project's inception, we can create structures that serve both human needs and environmental stewardship.

Looking ahead, sustainable engineering will continue to evolve with new technologies and materials. Carbon capture systems, bio-based composites, and circular economy principles will shape the future of green construction.`,
    author: {
      id: 'emily-rodriguez',
      name: 'Emily Rodriguez',
      bio: 'Senior Design Engineer at Precom',
      avatar: '/images/team/emily-rodriguez.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/emily-rodriguez'
      }
    },
    category: 'Sustainability',
    tags: ['Green Building', 'LEED', 'Sustainable Materials', 'Environmental Engineering'],
    published: true,
    publishedAt: new Date('2024-01-20'),
    readingTime: 6,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-20'),
    coverImage: '/images/blog/sustainable-engineering.jpg'
  }
  // Add more sample posts as needed
]

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = samplePosts.find(p => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span>›</span>
              <Link href="/blog" className="hover:text-blue-600 transition-colors">
                Blog
              </Link>
              <span>›</span>
              <span className="text-gray-900">{post.title}</span>
            </div>
          </nav>

          {/* Blog Post */}
          <BlogPost post={post} showFullContent={true} />

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {samplePosts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 2)
                .map((relatedPost) => (
                  <a 
                    key={relatedPost.id} 
                    href={`/blog/${relatedPost.slug}`}
                    className="block group"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      {relatedPost.coverImage && (
                        <div className="aspect-video overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={relatedPost.coverImage} 
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          {relatedPost.excerpt.slice(0, 120)}...
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{relatedPost.readingTime} min read</span>
                          <span className="mx-2">•</span>
                          <span>{relatedPost.category}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Engineering Expertise?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team of experienced engineers is ready to help with your next project. 
              From structural design to project management, we deliver excellence at every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get in Touch
              </a>
              <a 
                href="/services"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

// Generate static params for known blog posts
export async function generateStaticParams() {
  return samplePosts.map((post) => ({
    slug: post.slug,
  }))
}