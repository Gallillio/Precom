import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Footer } from '@/modules/shared/components/layout'
import { HeaderWrapper } from '@/modules/shared/components/layout/HeaderWrapper'
import { ErrorBoundary, ChatWidget } from '@/modules/shared/components/common'
import { ScrollProgress } from '@/modules/shared/components/ui'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Precom - Professional Engineering Consultancy',
    template: '%s | Precom'
  },
  description: 'Professional engineering consultancy providing innovative solutions for construction and infrastructure projects.',
  keywords: ['engineering', 'consultancy', 'construction', 'infrastructure', 'design', 'structural'],
  authors: [{ name: 'Precom' }],
  viewport: 'width=device-width, initial-scale=1',
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
        
        {/* Global Chat Widget */}
        <ChatWidget variant="default" position="bottom-right" />
      </body>
    </html>
  )
}