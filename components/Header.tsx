'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const ENTRIES = [
  {
    href: '/posts',
    content: 'Blog',
  },
  {
    href: '/archives',
    content: 'Archive',
  },
  {
    href: '/about',
    content: 'About',
  },
] as const

const Header: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-3xl flex flex-wrap items-center justify-between p-4 sm:px-6 md:px-8 lg:px-0">
        <Link href="/" className="flex items-center">
          <div className="font-sans text-gray-900 text-3xl">Elliot</div>
        </Link>
        <ul className="hidden lg:flex gap-10 items-end">
          {ENTRIES.map((entry) => (
            <li key={entry.href}>
              <Link href={entry.href} className="font-medium link">
                {entry.content}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="flex items-center lg:hidden"
          onClick={() => setMenuVisible((v) => !v)}
        >
          <div className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:(text-gray-500 bg-gray-100) focus:(outline-none bg-gray-100 text-gray-500) transition duration-150 ease-in-out">
            {menuVisible ? (
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            )}
          </div>
        </button>
      </nav>
      {menuVisible && (
        <div className="px-2 py-3 transition ease-in-out lg:hidden">
          {ENTRIES.map(({ href, content }) => (
            <Link
              href={href}
              key={href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 transition duration-150 ease-in-out"
            >
              {content}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
