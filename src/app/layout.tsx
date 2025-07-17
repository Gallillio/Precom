import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Header, Footer } from '@/modules/shared/components/layout'

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
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}