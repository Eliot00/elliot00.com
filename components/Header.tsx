'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
    <header className="mx-auto py-4 max-w-3xl flex items-center justify-between flex-col sm:flex-row sm:py-6">
      <Link href="/" className="font-bold text-3xl">
        編碼與禪
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
