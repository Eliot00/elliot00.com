'use client'

import Link from 'next/link'
import { AdBlock } from '@/components/Ads'
import { usePathname } from 'next/navigation'

export function DefaultHeader() {
  const pathname = usePathname()

  return (
    <header className="lg:pl-16 lg:pb-16 flex flex-col items-start justify-between lg:col-start-3 lg:col-span-1 lg:row-start-1">
      <Link
        href="/"
        className="px-4 lg:writing-vertical font-serif hover:text-zinc-700 hover:bg-zinc-100 hover:pt-4 pb-8 hover:pb-4 duration-700 ease-in-out"
      >
        <hgroup>
          <h1 className="text-2xl font-semibold">Elliot</h1>
          <p className="text-4xl font-bold">编码与禅</p>
        </hgroup>
      </Link>
      <AdBlock />
      <nav className="flex flex-row lg:flex-col text-zinc-700">
        <Link
          href="/posts"
          className={`${pathname === '/posts' ? 'bg-zinc-200' : 'bg-zinc-50 hover:bg-zinc-100'} rounded-l-md lg:rounded-t-md py-1 px-2`}
        >
          文章
        </Link>
        <Link
          href="/archives"
          className={`${pathname === '/archives' ? 'bg-zinc-200' : 'bg-zinc-50 hover:bg-zinc-100'} py-1 px-2`}
        >
          归档
        </Link>
        <Link
          href="/about"
          className={`${pathname === '/about' ? 'bg-zinc-200' : 'bg-zinc-50 hover:bg-zinc-100'} rounded-r-md lg:rounded-b-md py-1 px-2`}
        >
          关于
        </Link>
      </nav>
    </header>
  )
}
