import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Footer } from '@/modules/shared/components/layout'
import { HeaderWrapper } from '@/modules/shared/components/layout/HeaderWrapper'
import { ErrorBoundary } from '@/modules/shared/components/common'
import { ScrollProgress } from '@/modules/shared/components/ui'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Precom Egypt - Leading Automotive Engineering Consultancy',
    template: '%s | Precom Egypt'
  },
  description: 'Leading automotive engineering consultancy in Egypt specializing in vehicle development, automotive technology solutions, and automotive systems engineering. Serving Egyptian automotive industry from Cairo and 6th of October City.',
  keywords: ['automotive', 'engineering', 'consultancy', 'Egypt', 'vehicle', 'development', 'automotive technology', 'vehicle design', 'performance testing', 'automotive systems', 'Egyptian automotive', 'Cairo', 'automotive industry Egypt', '6th October City', 'Giza', 'Egyptian vehicles'],
  authors: [{ name: 'Precom Egypt' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Precom Egypt - Leading Automotive Engineering Consultancy',
    description: 'Leading automotive engineering consultancy in Egypt specializing in vehicle development, automotive technology solutions, and automotive systems engineering.',
    images: ['/images/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Precom Egypt - Leading Automotive Engineering Consultancy',
    description: 'Leading automotive engineering consultancy in Egypt specializing in vehicle development, automotive technology solutions, and automotive systems engineering.',
    images: ['/images/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ScrollProgress />
        <div className="min-h-screen flex flex-col">
          <HeaderWrapper />
          <ErrorBoundary>
            <main className="flex-grow">
              {children}
            </main>
          </ErrorBoundary>
          <Footer />
        </div>
      </body>
    </html>
  )
}