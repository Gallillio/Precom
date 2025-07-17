import { ContactScreen } from '@/modules/contact/screens/ContactScreen'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Precom Engineering Consultancy',
  description: 'Get in touch with our professional engineering team for consultation, project planning, or technical support. Free initial consultations available.',
  keywords: ['contact', 'engineering consultation', 'project planning', 'technical support', 'Precom'],
}

export default function ContactPage() {
  return <ContactScreen />
}