'use client'
import React, { Suspense, useState, useEffect } from 'react'
import { BlogPost, BlogCategory } from '@/modules/shared/utils/types'
import { BlogList } from '../components/BlogList'
import { BlogCategories } from '../components/BlogCategories'
import { ContentLoader, CardLoader } from '@/modules/shared/components/common'

// Sample blog data for development
const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Structural Engineering: Embracing Digital Transformation',
    slug: 'future-structural-engineering-digital-transformation',
    excerpt: 'Explore how digital technologies like BIM, AI, and IoT are revolutionizing structural engineering practices and improving project outcomes.',
    content: `The engineering industry is experiencing a digital revolution that's transforming how we design, build, and maintain structures. From Building Information Modeling (BIM) to artificial intelligence and IoT sensors, these technologies are not just changing our tools—they're fundamentally altering our approach to engineering challenges.

Building Information Modeling has become the cornerstone of modern engineering projects. BIM allows us to create detailed 3D models that encompass not just the physical aspects of a structure, but also time schedules, cost information, and material specifications. This holistic approach reduces errors, improves collaboration, and enables better decision-making throughout the project lifecycle.

Artificial Intelligence is another game-changer in our field. AI algorithms can analyze vast amounts of structural data to identify patterns and potential issues that might escape human observation. Machine learning models can predict structural behavior under various conditions, optimize designs for cost and performance, and even identify maintenance needs before problems become critical.

The Internet of Things (IoT) is bringing our structures to life with smart sensors that continuously monitor structural health. These sensors can detect minute changes in stress, vibration, temperature, and other critical parameters, providing real-time insights into structural performance and safety.

As we embrace these digital transformation trends, we're not replacing human expertise—we're augmenting it. Engineers who adapt to these new tools will find themselves more efficient, more accurate, and better equipped to tackle the complex challenges of modern construction projects.`,
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

The transition to sustainable engineering requires collaboration between architects, engineers, contractors, and clients. By working together and prioritizing environmental considerations from the project's inception, we can create structures that serve both human needs and environmental stewardship.`,
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
  },
  {
    id: '3',
    title: 'Project Management Excellence: Delivering Complex Engineering Projects',
    slug: 'project-management-excellence-complex-engineering',
    excerpt: 'Discover best practices for managing large-scale engineering projects, from initial planning to successful delivery.',
    content: `Managing complex engineering projects requires a unique blend of technical expertise, leadership skills, and strategic thinking. The success of these projects depends not just on engineering excellence, but on effective coordination of multiple stakeholders, careful resource management, and proactive risk mitigation.

The foundation of successful project management lies in thorough planning. This involves detailed scope definition, realistic timeline development, and comprehensive resource allocation. We use advanced project management tools and methodologies like Agile and Lean to ensure efficient workflow and continuous improvement.

Communication is perhaps the most critical aspect of project management. Regular stakeholder meetings, clear documentation, and transparent reporting help maintain alignment and prevent misunderstandings. We implement structured communication protocols that ensure all team members and stakeholders stay informed about project progress, challenges, and changes.

Risk management is another crucial element. We conduct thorough risk assessments at the project's outset and maintain dynamic risk registers throughout the project lifecycle. This proactive approach allows us to identify potential issues early and implement mitigation strategies before they impact project delivery.

Quality assurance is integrated into every phase of our projects. Regular quality checks, peer reviews, and compliance audits ensure that deliverables meet the highest standards. We believe that quality cannot be inspected into a project—it must be built in from the beginning.

Technology plays an increasingly important role in project management. We leverage project management software, collaboration platforms, and real-time monitoring tools to maintain visibility and control over project progress. These tools enable better decision-making and faster response to changing conditions.

Successful project delivery also requires flexibility and adaptability. While thorough planning is essential, projects often encounter unexpected challenges that require creative solutions and adjusted approaches. Our experience has taught us that the ability to adapt while maintaining focus on core objectives is crucial for project success.`,
    author: {
      id: 'michael-chen',
      name: 'Michael Chen',
      bio: 'Project Manager at Precom',
      avatar: '/images/team/michael-chen.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/michael-chen'
      }
    },
    category: 'Project Management',
    tags: ['Project Management', 'Leadership', 'Risk Management', 'Quality Assurance'],
    published: true,
    publishedAt: new Date('2024-01-25'),
    readingTime: 7,
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-25'),
    coverImage: '/images/blog/project-management.jpg'
  },
  {
    id: '4',
    title: 'Seismic Design Innovations: Protecting Structures from Earthquakes',
    slug: 'seismic-design-innovations-earthquake-protection',
    excerpt: 'Explore cutting-edge seismic design techniques and technologies that enhance structural resilience against earthquake forces.',
    content: `Seismic design has evolved significantly over the past decades, driven by both devastating earthquake events and advances in our understanding of structural dynamics. Modern seismic design goes beyond merely meeting building codes—it aims to create structures that can withstand major earthquakes while maintaining functionality and protecting human life.

Base isolation systems represent one of the most significant innovations in seismic design. These systems decouple the building from ground motion by placing flexible bearings or dampers between the structure and its foundation. This approach dramatically reduces the seismic forces transmitted to the building, improving both safety and comfort during earthquakes.

Energy dissipation devices, including viscous dampers, friction dampers, and yielding devices, help structures absorb and dissipate earthquake energy. These systems can be integrated into new construction or retrofitted into existing buildings to improve their seismic performance.

Performance-based seismic design represents a paradigm shift from prescriptive code-based approaches to outcome-focused methodologies. This approach allows engineers to design structures to meet specific performance objectives, such as immediate occupancy after moderate earthquakes or collapse prevention during major events.

Advanced analysis techniques, including nonlinear time-history analysis and incremental dynamic analysis, provide deeper insights into structural behavior during earthquakes. These computational tools help engineers optimize designs and better understand the relationship between ground motion characteristics and structural response.

The integration of smart materials and adaptive systems is opening new possibilities for seismic protection. Shape memory alloys, magnetorheological dampers, and semi-active control systems can automatically adjust their properties in response to seismic activity, providing optimal protection under varying conditions.

Retrofit strategies for existing buildings continue to evolve, with new techniques that minimize disruption while maximizing seismic improvement. From steel bracing systems to fiber-reinforced polymer strengthening, these approaches help bring older structures up to modern safety standards.

As our understanding of seismic hazards continues to grow through ongoing research and post-earthquake investigations, seismic design practices will continue to evolve, ensuring that our built environment becomes increasingly resilient to earthquake forces.`,
    author: {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      bio: 'Principal Engineer at Precom',
      avatar: '/images/team/sarah-johnson.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sarah-johnson'
      }
    },
    category: 'Structural Engineering',
    tags: ['Seismic Design', 'Earthquake Engineering', 'Base Isolation', 'Structural Dynamics'],
    published: true,
    publishedAt: new Date('2024-02-01'),
    readingTime: 9,
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-02-01'),
    coverImage: '/images/blog/seismic-design.jpg'
  },
  {
    id: '5',
    title: 'Quality Assurance in Engineering: Best Practices and Standards',
    slug: 'quality-assurance-engineering-best-practices',
    excerpt: 'Understanding the importance of quality assurance in engineering projects and implementing effective QA processes.',
    content: `Quality assurance in engineering is not just about catching errors—it's about building excellence into every aspect of the design and construction process. A robust QA program ensures that projects meet or exceed client expectations while maintaining the highest standards of safety and performance.

The foundation of effective quality assurance lies in establishing clear quality standards and procedures from the project's inception. This includes defining quality objectives, establishing measurement criteria, and creating detailed quality plans that outline specific QA activities for each project phase.

Documentation and traceability are crucial components of QA. Every design decision, calculation, and review must be properly documented and traceable. This not only ensures accountability but also provides valuable information for future projects and continuous improvement efforts.

Peer review processes are essential for maintaining design quality. Independent reviews by qualified engineers help identify potential issues, validate design approaches, and ensure compliance with applicable codes and standards. We implement structured review processes that include design reviews, calculation checks, and drawing reviews.

Quality control testing and inspection ensure that construction work meets design specifications. This includes material testing, construction monitoring, and performance verification. Regular site inspections and testing help identify and address issues before they become costly problems.

Training and competency management ensure that all team members have the necessary skills and knowledge to perform their roles effectively. Regular training updates, professional development opportunities, and competency assessments help maintain high performance standards.

Continuous improvement is a key principle of effective QA. We regularly analyze project outcomes, client feedback, and lessons learned to identify opportunities for improvement. This information is used to update procedures, enhance training programs, and refine quality standards.

Technology plays an increasingly important role in quality assurance. Digital tools for design checking, automated quality control systems, and real-time monitoring technologies help improve accuracy and efficiency while reducing the potential for human error.

Non-conformance management procedures ensure that any deviations from quality standards are properly identified, investigated, and corrected. This includes root cause analysis, corrective action implementation, and preventive measures to avoid similar issues in the future.`,
    author: {
      id: 'lisa-thompson',
      name: 'Lisa Thompson',
      bio: 'Quality Assurance Manager at Precom',
      avatar: '/images/team/lisa-thompson.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/lisa-thompson'
      }
    },
    category: 'Quality Assurance',
    tags: ['Quality Control', 'Standards', 'Best Practices', 'Process Improvement'],
    published: true,
    publishedAt: new Date('2024-02-05'),
    readingTime: 6,
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-02-05'),
    coverImage: '/images/blog/quality-assurance.jpg'
  },
  {
    id: '6',
    title: 'The Role of AI in Modern Engineering Design',
    slug: 'role-ai-modern-engineering-design',
    excerpt: 'How artificial intelligence is transforming engineering design processes and enabling new possibilities in structural analysis.',
    content: `Artificial Intelligence is revolutionizing engineering design, offering unprecedented capabilities for optimization, analysis, and innovation. As AI technologies mature, they're becoming indispensable tools for engineers seeking to push the boundaries of what's possible in structural design and analysis.

Machine learning algorithms can analyze vast datasets of structural performance data to identify patterns and relationships that might escape human observation. This capability enables engineers to make more informed design decisions and predict structural behavior with greater accuracy.

Generative design powered by AI can explore thousands of design alternatives in a fraction of the time required for manual design iterations. These algorithms consider multiple constraints and objectives simultaneously, often producing innovative solutions that human designers might not have considered.

Optimization algorithms help engineers find the best balance between competing objectives such as cost, performance, and sustainability. AI can consider complex interdependencies and trade-offs to identify optimal solutions that satisfy multiple criteria.

Predictive maintenance applications use AI to analyze sensor data from existing structures to predict when maintenance will be needed. This proactive approach helps prevent failures, reduce maintenance costs, and extend structural lifespan.

Computer vision technologies enable automated inspection and quality control. AI systems can analyze images and videos to identify defects, measure dimensions, and assess construction quality with speed and accuracy that surpasses human capabilities.

Natural language processing helps engineers extract insights from technical documents, building codes, and research papers. AI can quickly identify relevant information, summarize key points, and even flag potential conflicts or inconsistencies.

Despite these advances, the role of human engineers remains crucial. AI augments human capabilities rather than replacing them. Engineers provide the creativity, judgment, and ethical considerations that AI currently cannot match.

The integration of AI into engineering practice requires careful consideration of data quality, algorithm transparency, and professional responsibility. Engineers must understand the limitations and assumptions of AI tools to use them effectively and responsibly.

As AI technologies continue to evolve, they will undoubtedly open new possibilities for engineering innovation while helping us tackle increasingly complex challenges in the built environment.`,
    author: {
      id: 'david-kim',
      name: 'David Kim',
      bio: 'Technology Lead at Precom',
      avatar: '/images/team/david-kim.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/david-kim',
        github: 'https://github.com/david-kim'
      }
    },
    category: 'Technology',
    tags: ['Artificial Intelligence', 'Machine Learning', 'Design Optimization', 'Innovation'],
    published: true,
    publishedAt: new Date('2024-02-10'),
    readingTime: 8,
    createdAt: new Date('2024-02-07'),
    updatedAt: new Date('2024-02-10'),
    coverImage: '/images/blog/ai-engineering.jpg'
  }
]

const sampleCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    description: 'Latest technological innovations in engineering',
    postCount: 2
  },
  {
    id: '2',
    name: 'Sustainability',
    slug: 'sustainability',
    description: 'Sustainable engineering practices and green building',
    postCount: 1
  },
  {
    id: '3',
    name: 'Project Management',
    slug: 'project-management',
    description: 'Best practices for managing engineering projects',
    postCount: 1
  },
  {
    id: '4',
    name: 'Structural Engineering',
    slug: 'structural-engineering',
    description: 'Structural design, analysis, and innovations',
    postCount: 1
  },
  {
    id: '5',
    name: 'Quality Assurance',
    slug: 'quality-assurance',
    description: 'Quality control and assurance in engineering',
    postCount: 1
  }
]

export const BlogScreen: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="pt-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Engineering Insights & Innovation
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Stay updated with the latest trends, technologies, and best practices 
                in engineering. Our experts share insights on structural design, 
                project management, sustainability, and emerging technologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#latest-articles"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Browse Articles
                </a>
                <a 
                  href="/contact"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Subscribe to Updates
                </a>
              </div>
            </div>
          </div>
        </div>
        <ContentLoader text="Loading blog content..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="pt-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Engineering Insights & Innovation
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Stay updated with the latest trends, technologies, and best practices 
              in engineering. Our experts share insights on structural design, 
              project management, sustainability, and emerging technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#latest-articles"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Articles
              </a>
              <a 
                href="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Subscribe to Updates
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Blog Content */}
          <div className="lg:w-2/3">
            <div id="latest-articles" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest Articles</h2>
              <p className="text-gray-600">
                Discover the latest insights and innovations in engineering
              </p>
            </div>
            
            <Suspense fallback={<ContentLoader text="Loading articles..." />}>
              <BlogList 
                posts={samplePosts}
                categories={sampleCategories}
                showFilters={true}
                postsPerPage={6}
              />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <Suspense fallback={<CardLoader />}>
                <BlogCategories 
                  categories={sampleCategories}
                  showPostCounts={true}
                />
              </Suspense>

              {/* Featured Content */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Engineering Newsletter
                </h3>
                <p className="text-gray-600 mb-4">
                  Get the latest engineering insights, project updates, and industry news 
                  delivered to your inbox monthly.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>

              {/* Contact CTA */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Need Engineering Consultation?
                </h3>
                <p className="text-gray-600 mb-4">
                  Our expert team is ready to help with your engineering challenges. 
                  Contact us for a consultation.
                </p>
                <a 
                  href="/contact"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}