import { notFound } from 'next/navigation'
import { SERVICES } from '@/modules/shared/utils/constants'
import { ServiceDetailScreen } from '@/modules/services/screens/ServiceDetailScreen'

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({
    slug,
  }))
}

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  
  if (!SERVICES[slug as keyof typeof SERVICES]) {
    notFound()
  }

  return <ServiceDetailScreen serviceSlug={slug} />
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params
  const service = SERVICES[slug as keyof typeof SERVICES]
  
  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.title} | Precom Automotive Engineering`,
    description: service.description,
  }
}