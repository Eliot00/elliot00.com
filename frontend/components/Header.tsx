import React from 'react'
import Link from 'next/link'

const Header = () => {

  return (
    <nav className="mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8">
      <Link href="/">
        <a className="flex items-center">
          <div className="font-sans text-gray-900 text-3xl">公子政</div>
        </a>
      </Link>
      <ul className="flex flex-row px-2 pt-4 pb-3">
        <li className="pr-5">
          <Link href="/posts"><a>博客</a></Link>
        </li>
        <li className="pr-5">
          <Link href="/series"><a>归档</a></Link>
        </li>
        <li className="pr-5">
          <Link href="/"><a>关于</a></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header