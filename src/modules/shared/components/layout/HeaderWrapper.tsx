'use client'
import { usePathname } from 'next/navigation'
import { Header } from './Header'

interface HeaderWrapperProps {
  className?: string
}

export const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ className }) => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return <Header isHomePage={isHomePage} className={className} />
}