'use client'
import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import { ContactInfo as ContactInfoType } from '@/modules/shared/utils/types'
import { ContactHero } from '../components/ContactHero'
import { ContactForm } from '../components/ContactForm'
import { MultiStepContactForm } from '../components/MultiStepContactForm'
import { ContactInfo } from '../components/ContactInfo'
import { LocationMap } from '../components/LocationMap'
import { ContentLoader, CardLoader } from '@/modules/shared/components/common'

const useCountAnimation = (endValue: number, duration: number = 2000, startAnimation: boolean = false) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startAnimation) return

    let startTime: number
    const startValue = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOut)
      
      setCount(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [endValue, duration, startAnimation])

  return count
}

const AnimatedContactStat: React.FC<{
  value: number
  suffix?: string
  prefix?: string
  label: string
}> = ({ value, suffix = '', prefix = '', label }) => {
  const [isVisible, setIsVisible] = useState(false)
  const statRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (statRef.current) {
      observer.observe(statRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animatedValue = useCountAnimation(value, 2000, isVisible)
  const displayValue = isVisible ? animatedValue : 0

  return (
    <div ref={statRef}>
      <div className="text-2xl font-bold text-white mb-1">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-xs text-blue-200 font-medium">{label}</div>
    </div>
  )
}

export const ContactScreen: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  
  // Refs for scroll animations
  const mainContentRef = useRef<HTMLDivElement>(null)
  const mapSectionRef = useRef<HTMLDivElement>(null)
  const faqSectionRef = useRef<HTMLDivElement>(null)
  const ctaSectionRef = useRef<HTMLDivElement>(null)

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
    }, 800)

    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    })

    // Observe all sections after component mounts and loading completes
    const observeElements = () => {
      const elements = [
        mainContentRef.current,
        mapSectionRef.current, 
        faqSectionRef.current,
        ctaSectionRef.current
      ].filter(Boolean)
      
      elements.forEach((element) => {
        if (element) observer.observe(element)
      })
    }

    // Start observing after loading
    const observerTimer = setTimeout(observeElements, 1000)
    
    return () => {
      clearTimeout(timer)
      clearTimeout(observerTimer)
      observer.disconnect()
    }
  }, [observerCallback])

  const faqData = [
    {
      question: "How quickly can you start my project?",
      answer: "We typically begin new projects within 1-2 weeks of contract signing. For urgent projects, we can often accommodate faster timelines. Our initial consultation helps us understand your project timeline and any critical deadlines."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes, we provide free initial consultations to discuss your project requirements and determine how we can best assist you. This includes a preliminary assessment, timeline discussion, and budget estimation."
    },
    {
      question: "What types of projects do you handle?",
      answer: "We work on residential, commercial, and industrial projects including structural design, project management, engineering consulting, feasibility studies, renovations, and new construction projects of all scales."
    },
    {
      question: "Are you licensed and insured?",
      answer: "Yes, all our engineers are licensed professionals with current certifications. We carry comprehensive liability insurance for all projects and maintain bonding as required by local regulations."
    },
    {
      question: "What information should I prepare?",
      answer: "Please gather any existing drawings, project requirements, timeline preferences, budget information, site surveys, and any previous engineering reports to help us provide the most accurate guidance."
    },
    {
      question: "Do you work with other professionals?",
      answer: "Absolutely! We collaborate seamlessly with architects, contractors, consultants, and other engineering firms to ensure project success. Our team approach delivers comprehensive solutions."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const handleFormSubmit = (data: ContactInfoType) => {
    // In a real application, this would send the data to your backend
    console.log('Form submitted:', data)
    
    // You could also integrate with email services, CRM systems, etc.
    // Example integrations:
    // - Send email via EmailJS, SendGrid, etc.
    // - Save to database
    // - Send to CRM like Salesforce, HubSpot
    // - Send notifications to team via Slack, Teams, etc.
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <ContactHero 
          title="Contact Our Engineering Experts"
          subtitle="Ready to Start Your Project?"
          description="Get in touch with our professional engineering team for consultation, project planning, or technical support. We're here to help turn your vision into reality."
          showQuickContact={true}
        />
        <ContentLoader text="Loading contact information..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ContactHero 
        title="Contact Our Engineering Experts"
        subtitle="Ready to Start Your Project?"
        description="Get in touch with our professional engineering team for consultation, project planning, or technical support. We're here to help turn your vision into reality."
        showQuickContact={true}
      />

      {/* Main Content */}
      <section 
        id="main-content" 
        ref={mainContentRef}
        className={`py-16 transition-all duration-1000 transform ${
          visibleSections.has('main-content') 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Multi-Step Contact Form + Visit Our Office */}
            <div className="lg:col-span-2 space-y-12">
              <div id="contact-form">
                <Suspense fallback={<CardLoader />}>
                  <MultiStepContactForm 
                    onSubmit={handleFormSubmit}
                    title="Start Your Engineering Project"
                    description="Tell us about your project needs and we'll provide a comprehensive proposal tailored to your requirements."
                  />
                </Suspense>
              </div>

              {/* Visit Our Office Section - Moved Here */}
              <div id="office-location" className="bg-gray-50 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Visit Our Office
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    We welcome in-person consultations and meetings. Our office is conveniently 
                    located with easy access to parking and public transportation.
                  </p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                  <Suspense fallback={<CardLoader className="h-96" />}>
                    <LocationMap 
                      height="500px"
                      showDirections={true}
                    />
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Information */}
            <div className="lg:col-span-1">
              <div id="contact-info">
                <Suspense fallback={<CardLoader />}>
                  <ContactInfo 
                    showSocialLinks={true}
                    showBusinessHours={true}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Premium FAQ Section with Accordion */}
      <section 
        id="faq-section"
        ref={faqSectionRef}
        className={`py-20 bg-gradient-to-br from-gray-50 to-white transition-all duration-1000 transform ${
          visibleSections.has('faq-section')
            ? 'translate-y-0 opacity-100'
            : 'translate-y-16 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#003366]/10 to-[#00B4A6]/10 rounded-full mb-6">
                <svg className="w-5 h-5 mr-2 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-[#003366]">Got Questions?</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Common questions about our engineering services and consultation process
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-xl transform ${
                    visibleSections.has('faq-section') 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-8 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms` 
                  }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#00B4A6] rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-[#003366] group-hover:text-[#00B4A6] transition-colors duration-300">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`ml-4 transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`}>
                      <svg className="w-6 h-6 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6">
                      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border-l-4 border-[#00B4A6] shadow-inner">
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Help Section */}
            <div className="mt-12 text-center bg-gradient-to-r from-[#003366] to-[#00B4A6] rounded-2xl p-8 shadow-2xl">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Our engineering experts are here to help. Get personalized answers to your specific project needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      const formElement = document.getElementById('contact-form')
                      if (formElement) {
                        formElement.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="bg-white text-[#003366] px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Ask Our Experts
                  </button>
                  <a 
                    href="tel:+20 2 2735 4567"
                    className="bg-black/40 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-xl font-semibold hover:bg-black/50 hover:scale-105 transition-all duration-300"
                  >
                    Call Now: +20 2 2735 4567
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Split-Screen Call to Action Section */}
      <section 
        id="cta-section"
        ref={ctaSectionRef}
        className={`relative py-24 overflow-hidden transition-all duration-1000 transform ${
          visibleSections.has('cta-section')
            ? 'translate-y-0 opacity-100'
            : 'translate-y-20 opacity-0'
        }`}
      >
        {/* Split-screen gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#004080] to-[#00B4A6]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00B4A6]/20 to-transparent" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-16 right-16 w-64 h-64 border-2 border-white/30 rounded-full transform rotate-12 animate-pulse" />
            <div className="absolute bottom-16 left-16 w-48 h-48 border border-white/20 rounded-full transform -rotate-6 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-white/15 rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-45 animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          
          {/* Blueprint-style grid overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" 
                 style={{
                   backgroundImage: `
                     linear-gradient(white 1px, transparent 1px),
                     linear-gradient(90deg, white 1px, transparent 1px)
                   `,
                   backgroundSize: '80px 80px'
                 }}>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-left">
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
                <svg className="w-5 h-5 mr-3 text-[#00B4A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-semibold text-white">Start Your Project Today</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                Ready to Build
                <span className="block bg-gradient-to-r from-[#00B4A6] to-[#00D4C4] bg-clip-text text-transparent">
                  Your Vision?
                </span>
              </h2>
              
              <p className="text-xl text-blue-100 mb-12 leading-relaxed font-medium max-w-lg">
                Transform your engineering challenges into innovative solutions. Our expert team is ready to collaborate 
                with you on projects that shape the future of infrastructure.
              </p>

              {/* Features list */}
              <div className="space-y-6 mb-12">
                {[
                  { icon: "M9 12l2 2 4-4", text: "Free initial consultation and project assessment" },
                  { icon: "M12 8v4l3 3", text: "Rapid project initiation within 1-2 weeks" },
                  { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857", text: "Dedicated engineering team assigned to your project" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00B4A6] to-[#00A098] rounded-xl flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <p className="text-blue-100 font-medium text-lg group-hover:text-white transition-colors duration-300">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Action Cards */}
            <div className={`space-y-8 transition-all duration-1000 transform ${
              visibleSections.has('cta-section')
                ? 'translate-x-0 opacity-100'
                : 'translate-x-12 opacity-0'
            }`} style={{ transitionDelay: '300ms' }}>
              {/* Primary CTA Card */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group cursor-pointer"
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'scale(1.02) rotateY(2deg)'
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'scale(1)'
                   }}>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#003366] to-[#00B4A6] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#003366] mb-4">Start with a Consultation</h3>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    Schedule a comprehensive discussion about your project requirements, timeline, and technical challenges.
                  </p>
                  <button
                    onClick={() => {
                      const formElement = document.getElementById('contact-form')
                      if (formElement) {
                        formElement.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="w-full bg-gradient-to-r from-[#003366] to-[#00B4A6] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg group"
                  >
                    <svg className="w-5 h-5 mr-2 inline group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Send Us a Message
                  </button>
                </div>
              </div>

              {/* Secondary CTA Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
                   style={{ 
                     transitionDelay: '150ms',
                     animation: visibleSections.has('cta-section') ? 'fadeInUp 0.8s ease-out 0.45s both' : 'none'
                   }}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00B4A6] to-[#00D4C4] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#003366] mb-3">Immediate Response</h3>
                  <p className="text-gray-700 mb-6">
                    Need urgent consultation? Call our direct line for immediate engineering support.
                  </p>
                  <a 
                    href="tel:+20 2 2735 4567"
                    className="inline-flex items-center justify-center w-full bg-white text-[#003366] px-6 py-3 rounded-xl font-bold border-2 border-[#003366] hover:bg-[#003366] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call: +20 2 2735 4567
                  </a>
                </div>
              </div>

              {/* Stats Preview */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <AnimatedContactStat 
                    value={24} 
                    suffix="h" 
                    label="Response Time" 
                  />
                  <AnimatedContactStat 
                    value={500} 
                    suffix="+" 
                    label="Projects Delivered" 
                  />
                  <AnimatedContactStat 
                    value={15} 
                    suffix="+" 
                    label="Years Experience" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* CSS Animations */}
      <style jsx>{`
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
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        /* Micro-interactions */
        .micro-bounce {
          transition: transform 0.2s ease;
        }
        
        .micro-bounce:hover {
          transform: translateY(-2px);
        }
        
        .card-hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        /* Enhanced button animations */
        .btn-enhanced {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .btn-enhanced::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s;
        }
        
        .btn-enhanced:hover::before {
          left: 100%;
        }
        
        /* Scroll reveal animations */
        .reveal-up {
          transform: translateY(50px);
          opacity: 0;
          transition: all 0.8s ease-out;
        }
        
        .reveal-up.is-visible {
          transform: translateY(0);
          opacity: 1;
        }
        
        .reveal-left {
          transform: translateX(-50px);
          opacity: 0;
          transition: all 0.8s ease-out;
        }
        
        .reveal-left.is-visible {
          transform: translateX(0);
          opacity: 1;
        }
        
        .reveal-right {
          transform: translateX(50px);
          opacity: 0;
          transition: all 0.8s ease-out;
        }
        
        .reveal-right.is-visible {
          transform: translateX(0);
          opacity: 1;
        }
        
        /* Staggered animation delays */
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        .stagger-6 { transition-delay: 0.6s; }
      `}</style>
    </div>
  )
}