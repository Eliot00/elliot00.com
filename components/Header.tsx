'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import logo from '@/app/icon.svg'
import { COMMON_CONTAINER_CLASS_NAME } from '@/lib/constants'

const LINKS = [
  {
    href: '/posts',
    text: '文章',
  },
  {
    href: '/archives',
    text: '歸檔',
  },
  {
    href: '/about',
    text: '關於',
  },
]

const ACTIVE_NAV_CLASS = 'underline decoration-wavy decoration-2'

export function Header() {
  const pathname = usePathname()

  return (
    <header
      className={`${COMMON_CONTAINER_CLASS_NAME} py-4 flex items-center justify-between flex-col sm:flex-row sm:py-6`}
    >
      <Link href="/" className="w-8 h-8">
        <Image src={logo} alt="logo" />
      </Link>
      <nav className="flex flex-col gap-2 sm:flex-row sm:gap-4 font-bold text-lg">
        {LINKS.map((link) => (
          <Link
            className={`${pathname === link.href ? ACTIVE_NAV_CLASS : ''} hover:text-primary`}
            key={link.href}
            href={link.href}
          >
            {link.text}
          </Link>
        ))}
      </nav>
    </header>
  )
}
