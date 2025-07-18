'use client'
import React, { useState, useEffect, Suspense } from 'react'
import { ContactInfo as ContactInfoType } from '@/modules/shared/utils/types'
import { ContactHero } from '../components/ContactHero'
import { ContactForm } from '../components/ContactForm'
import { ContactInfo } from '../components/ContactInfo'
import { LocationMap } from '../components/LocationMap'
import { ContentLoader, CardLoader } from '@/modules/shared/components/common'

export const ContactScreen: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div id="contact-form">
                <Suspense fallback={<CardLoader />}>
                  <ContactForm 
                    onSubmit={handleFormSubmit}
                    title="Send Us a Message"
                    description="Fill out the form below and we'll get back to you within 24 hours. For urgent matters, please call our emergency line."
                  />
                </Suspense>
              </div>
            </div>

            {/* Contact Information */}
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

      {/* Location Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about our services and consultation process
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How quickly can you start my project?
                  </h3>
                  <p className="text-gray-600">
                    We typically begin new projects within 1-2 weeks of contract signing. 
                    For urgent projects, we can often accommodate faster timelines.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Do you offer free consultations?
                  </h3>
                  <p className="text-gray-600">
                    Yes, we provide free initial consultations to discuss your project 
                    requirements and determine how we can best assist you.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What types of projects do you handle?
                  </h3>
                  <p className="text-gray-600">
                    We work on residential, commercial, and industrial projects including 
                    structural design, project management, and engineering consulting.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Are you licensed and insured?
                  </h3>
                  <p className="text-gray-600">
                    Yes, all our engineers are licensed professionals and we carry 
                    comprehensive liability insurance for all projects.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What information should I prepare?
                  </h3>
                  <p className="text-gray-600">
                    Please gather any existing drawings, project requirements, timeline, 
                    and budget information to help us provide accurate guidance.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Do you work with other professionals?
                  </h3>
                  <p className="text-gray-600">
                    Absolutely! We collaborate with architects, contractors, and other 
                    consultants to ensure project success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Don&apos;t wait to bring your engineering project to life. Contact us today 
            for a free consultation and let&apos;s discuss how we can help achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const formElement = document.getElementById('contact-form')
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Send Us a Message
            </button>
            <a 
              href="tel:+20 1234567890"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              Call Now: +20 1234567890
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}