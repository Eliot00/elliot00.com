import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from '@/components/Footer'
import AdSense from '@/components/AdSense'
import './globals.css'
import Link from 'next/link'
import { AdBlock } from '@/components/Ads'

export const metadata: Metadata = {
  title: 'Elliot - 致虛極 守靜篤',
  description: "Elliot's personal website.",
  metadataBase: new URL('https://elliot00.com'),
  openGraph: {
    title: 'Elliot - 致虛極 守靜篤',
    description: "Elliot's personal website.",
  },
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <AdSense pid="4587152222007322" />
      </head>
      <body className="flex p-8 md:h-screen md:max-h-screen md:py-20 md:px-40 md:grid md:grid-cols-3 md:grid-rows-[1fr_auto] md:gap-16">
        <header className="px-4 flex flex-col items-start justify-between md:col-start-3 md:col-span-1 md:row-start-1">
          <Link
            href="/"
            className="px-4 writing-vertical font-serif hover:text-zinc-700 hover:bg-zinc-100 hover:pt-4 pb-8 hover:pb-4 duration-700 ease-in-out"
          >
            <hgroup>
              <h1 className="text-2xl font-semibold">Elliot</h1>
              <p className="text-4xl font-bold">编码与禅</p>
            </hgroup>
          </Link>
          <AdBlock />
          <nav className="flex flex-col text-zinc-700">
            <Link
              href="/posts"
              className="rounded-t-md py-1 px-2 bg-zinc-50 hover:bg-zinc-100"
            >
              文章
            </Link>
            <Link
              href="/archives"
              className="py-1 px-2 bg-zinc-50 hover:bg-zinc-100"
            >
              归档
            </Link>
            <Link
              href="/posts"
              className="rounded-b-md py-1 px-2 bg-zinc-50 hover:bg-zinc-100"
            >
              关于
            </Link>
          </nav>
        </header>
        <main
          className="md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-4 md:overflow-y-auto md:no-scrollbar text-gray-700"
          role="main"
        >
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
