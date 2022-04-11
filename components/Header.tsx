import React from 'react'
import Link from 'next/link'

const Header: React.FC = () => {
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
        <div className="-mr-2 flex items-center lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <title>Menu</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
        </div>
        <ul className="hidden lg:flex md:ml-10 items-end">
          <li>
            <Link href="/posts">
              <a className="font-medium link">Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/archives">
              <a className="ml-10 font-medium link">Archive</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className="ml-10 font-medium link">About</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden">
        <div className="rounded-lg shadow-md">
          <div className="rounded-lg bg-white shadow-xs overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <Link href="/">
                <a className="items-center font-thin font-sans text-gray-900 leading-tight text-2xl sm:text-3xl">
                  公子政
                </a>
              </Link>{' '}
              <div className="-mr-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                >
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
                </button>
              </div>
            </div>
            <div className="px-2 pt-4 pb-3">
              <Link href="/posts">
                <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">
                  Blog
                </a>
              </Link>
              <Link href="/archives">
                <a className="block px-3 py-2 rounded-md text-base upppercase font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">
                  Archive
                </a>
              </Link>
              <Link href="/about">
                <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">
                  About
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
