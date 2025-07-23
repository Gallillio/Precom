'use client'
import { usePathname } from 'next/navigation'
import { Header } from './Header'

interface HeaderWrapperProps {
  className?: string
}

export const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ className }) => {
  const pathname = usePathname()
  // Enable transparent header behavior on all pages
  const transparentPages = ['/', '/about', '/services', '/projects', '/blog', '/contact']
  const isHomePage = transparentPages.includes(pathname)

  return <Header isHomePage={isHomePage} className={className} />
}