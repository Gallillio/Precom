'use client'
import { usePathname } from 'next/navigation'
import { Header } from './Header'

interface HeaderWrapperProps {
  className?: string
}

export const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ className }) => {
  const pathname = usePathname()
  // Enable transparent header behavior on all pages
  const isHomePage = true

  return <Header isHomePage={isHomePage} className={className} />
}