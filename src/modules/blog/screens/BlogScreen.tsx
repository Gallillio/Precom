'use client'
import React, { Suspense, useState, useEffect, useRef, useCallback } from 'react'
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
  const [readingProgress, setReadingProgress] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)

  // Ken Burns effect background images for hero
  const heroBackgrounds = [
    '/images/blog/hero-engineering-1.jpg',
    '/images/blog/hero-engineering-2.jpg', 
    '/images/blog/hero-engineering-3.jpg',
    '/images/blog/hero-engineering-4.jpg'
  ]

  // Intersection Observer for scroll animations
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisibleSections(prev => new Set(prev).add(entry.target.id))
      }
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    // Ken Burns effect - cycle through hero background images
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroBackgrounds.length)
    }, 8000)

    // Reading progress tracker
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    })

    // Start observing elements after loading
    const observeElements = () => {
      const elements = [
        heroRef.current,
        contentRef.current,
        featuredRef.current
      ].filter(Boolean)
      
      elements.forEach((element) => {
        if (element) observer.observe(element)
      })
    }

    window.addEventListener('scroll', handleScroll)
    const observerTimer = setTimeout(observeElements, 1200)

    return () => {
      clearTimeout(timer)
      clearInterval(imageInterval)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(observerTimer)
      observer.disconnect()
    }
  }, [observerCallback, heroBackgrounds.length])

  if (loading) {
    return (
      <div className="min-h-screen relative">
        {/* Premium Loading Screen with Brand Colors */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background with brand colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#00456B] to-[#00B4A6]" />
          
          {/* Animated geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-64 h-64 border-2 border-white/30 rounded-full animate-pulse" />
            <div className="absolute bottom-20 left-20 w-48 h-48 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-white/15 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Loading content */}
          <div className="relative z-10 text-center text-white">
            <div className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <svg className="w-6 h-6 mr-3 text-[#00B4A6] animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-lg font-bold">Engineering Knowledge Hub</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Engineering
              <span className="block bg-gradient-to-r from-[#00B4A6] to-[#00D4C4] bg-clip-text text-transparent">
                Insights
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 animate-pulse">
              Loading premium content...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#003366] to-[#00B4A6] transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Premium Magazine-Style Hero Section */}
      <section 
        id="blog-hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Ken Burns Effect Background */}
        <div className="absolute inset-0">
          {heroBackgrounds.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-3000 ${
                index === currentImageIndex ? 'opacity-40' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(0,51,102,0.85) 0%, rgba(0,180,166,0.75) 100%), url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                animation: index === currentImageIndex ? 'kenBurnsZoom 8s ease-in-out' : 'none'
              }}
            />
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 border-2 border-white/30 rounded-full animate-pulse" />
          <div className="absolute bottom-20 left-20 w-48 h-48 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-white/15 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Premium Content Container */}
        <div className={`relative z-10 container mx-auto px-4 text-center transition-all duration-1000 transform ${
          visibleSections.has('blog-hero') 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-12 opacity-0'
        }`}>
          <div className="max-w-5xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <svg className="w-6 h-6 mr-3 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-lg font-bold text-white">Engineering Knowledge Hub</span>
            </div>

            {/* Main Headlines */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
              Engineering
              <span className="block bg-gradient-to-r from-[#00B4A6] to-[#00D4C4] bg-clip-text text-transparent">
                Insights
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-blue-100 font-light">
                & Innovation
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-4xl mx-auto font-light drop-shadow-lg">
              Explore cutting-edge engineering practices, breakthrough technologies, and expert insights from industry leaders. 
              Stay ahead with the latest in structural design, sustainability, and project management excellence.
            </p>

            {/* Premium Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <a 
                href="#featured-articles"
                className="group bg-gradient-to-r from-[#003366] to-[#00B4A6] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <svg className="w-5 h-5 mr-2 inline group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Explore Articles
              </a>
              <a 
                href="/contact"
                className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <svg className="w-5 h-5 mr-2 inline group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19v-7a8 8 0 018-8m4 4v1a2 2 0 01-2 2h-2" />
                </svg>
                Subscribe to Updates
              </a>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{samplePosts.length}+</div>
                <div className="text-blue-200 text-sm uppercase tracking-wider">Expert Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{sampleCategories.length}</div>
                <div className="text-blue-200 text-sm uppercase tracking-wider">Specializations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
                <div className="text-blue-200 text-sm uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-blue-200 text-sm uppercase tracking-wider">Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-8 right-8 flex space-x-2">
          {heroBackgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-[#00B4A6] scale-125' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Articles Section */}
      <section 
        id="featured-articles"
        ref={featuredRef}
        className={`py-20 bg-white transition-all duration-1000 transform ${
          visibleSections.has('featured-articles')
            ? 'translate-y-0 opacity-100'
            : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#003366]/10 to-[#00B4A6]/10 rounded-full mb-6">
              <svg className="w-5 h-5 mr-2 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="text-sm font-semibold text-[#003366]">Latest Insights</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-6">
              Featured Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover cutting-edge engineering insights, breakthrough technologies, and expert analysis 
              from our team of professional engineers and industry specialists.
            </p>
          </div>

          {/* Magazine-Style Featured Layout */}
          <div className="mb-16">
            {samplePosts.slice(0, 1).map((featuredPost, index) => (
              <div key={featuredPost.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/20 to-[#00B4A6]/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                      <div className="aspect-video bg-gradient-to-br from-[#003366] to-[#00B4A6] relative">
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-[#00B4A6] text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {featuredPost.category}
                          </span>
                        </div>
                        <div className="absolute bottom-4 right-4 flex items-center text-white text-sm">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {featuredPost.readingTime} min read
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#00B4A6] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {featuredPost.author.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-[#003366]">{featuredPost.author.name}</p>
                        <p className="text-sm text-gray-600">{featuredPost.author.bio}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6 leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <a 
                      href={`/blog/${featuredPost.slug}`}
                      className="group bg-gradient-to-r from-[#003366] to-[#00B4A6] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      Read Full Article
                      <svg className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <div className="text-sm text-gray-500">
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Articles Grid */}
      <section 
        id="main-content"
        ref={contentRef}
        className={`py-20 bg-gray-50 transition-all duration-1000 transform ${
          visibleSections.has('main-content')
            ? 'translate-y-0 opacity-100'
            : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Blog Content */}
            <div className="lg:w-2/3">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-[#003366] mb-4">Latest Engineering Insights</h2>
                <p className="text-lg text-gray-600">
                  Stay updated with the latest trends, technologies, and best practices in engineering
                </p>
              </div>
              
              <Suspense fallback={<ContentLoader text="Loading articles..." />}>
                <BlogList 
                  posts={samplePosts.slice(1)} // Exclude featured post
                  categories={sampleCategories}
                  showFilters={true}
                  postsPerPage={6}
                />
              </Suspense>
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-8">
                {/* Categories */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-[#003366] mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Specializations
                  </h3>
                  <Suspense fallback={<CardLoader />}>
                    <BlogCategories 
                      categories={sampleCategories}
                      showPostCounts={true}
                    />
                  </Suspense>
                </div>

                {/* Premium Newsletter Signup */}
                <div className="bg-gradient-to-br from-[#003366] to-[#00B4A6] rounded-2xl p-8 text-white shadow-xl">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      Engineering Newsletter
                    </h3>
                    <p className="text-blue-100 mb-6 leading-relaxed">
                      Get exclusive insights, project updates, and industry breakthroughs 
                      delivered monthly to your inbox.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your professional email"
                      className="w-full px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900 placeholder-gray-500"
                    />
                    <button className="w-full bg-white text-[#003366] px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                      Subscribe to Premium Content
                    </button>
                  </div>
                  <p className="text-xs text-blue-200 mt-4 text-center">
                    Join 5,000+ engineering professionals. Unsubscribe anytime.
                  </p>
                </div>

                {/* Contact CTA */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#00B4A6] to-[#00D4C4] rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#003366] mb-4">
                      Need Expert Consultation?
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Our professional engineering team is ready to tackle your most challenging projects. 
                      Schedule a consultation today.
                    </p>
                    <a 
                      href="/contact"
                      className="inline-flex items-center bg-gradient-to-r from-[#003366] to-[#00B4A6] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Start Consultation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes kenBurnsZoom {
          0% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(0.5deg);
          }
          100% {
            transform: scale(1.15) rotate(-0.3deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-5px) rotate(-1deg);
          }
          75% {
            transform: translateY(-15px) rotate(0.5deg);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Enhanced animation classes */
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }

        /* Staggered delays for sequential animations */
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }

        /* Reading progress enhancements */
        .reading-progress {
          backdrop-filter: blur(10px);
          background: rgba(0, 51, 102, 0.1);
        }

        /* Magazine-style hover effects */
        .magazine-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .magazine-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Premium button effects */
        .premium-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .premium-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s;
        }

        .premium-button:hover::before {
          left: 100%;
        }

        /* Scroll reveal animations */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }

        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Custom scrollbar for modern browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #003366, #00B4A6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #004080, #00D4C4);
        }
      `}</style>
    </div>
  )
}