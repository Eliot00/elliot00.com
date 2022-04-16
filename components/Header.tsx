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
  const [menuDisplay, setMenuDisplay] = useState('hidden')
  const openMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuDisplay('block')
  }
  const closeMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuDisplay('hidden')
  }

  return (
    <header className="relative z-10 bg-white shadow-sm">
      <nav className="mx-auto max-w-screen-lg flex flex-wrap items-center justify-between p-4 sm:px-6 md:px-8 lg:px-0">
        <Link href="/">
          <a className="flex items-center">
            <div className="font-thin font-sans text-gray-900 text-3xl">
              公子政
            </div>
          </a>
        </Link>
        <ul className="hidden lg:flex gap-10 items-end">
          {ENTRIES.map((entry) => (
            <li key={entry.href}>
              <Link href={entry.href}>
                <a className="font-medium link">{entry.content}</a>
              </Link>
            </li>
          ))}
        </ul>
        <button className="flex items-center lg:hidden" onClick={openMenu}>
          <div className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:(text-gray-500 bg-gray-100) focus:(outline-none bg-gray-100 text-gray-500) transition duration-150 ease-in-out">
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
          </div>
        </button>
      </nav>
      <div
        className={`${menuDisplay} absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden`}
      >
        <div className="rounded-lg shadow-md">
          <div className="rounded-lg bg-white shadow-xs overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <Link href="/">
                <a className="font-thin text-gray-900 leading-tight text-2xl sm:text-3xl tracking-tight">
                  公子政
                </a>
              </Link>
              <button onClick={closeMenu}>
                <div className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:(text-gray-500 bg-gray-100) focus:(outline-none bg-gray-100 text-gray-500) transition duration-150 ease-in-out">
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
                </div>
              </button>
            </div>
            <div className="px-2 pt-4 pb-3">
              {ENTRIES.map(({ href, content }) => (
                <Link href={href} key={href}>
                  <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:(text-gray-900 bg-gray-50) focus:(outline-none text-gray-900 bg-gray-50) transition duration-150 ease-in-out">
                    {content}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
