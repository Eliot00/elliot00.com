import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from '@/components/Footer'
import AdSense from '@/components/AdSense'
import './globals.css'
import { DefaultHeader } from '@/components/Header'

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
      <body className="flex flex-col gap-4 p-8 min-h-screen lg:h-screen lg:max-h-screen lg:gap-0 lg:py-20 lg:px-40 lg:grid lg:grid-cols-3 lg:grid-rows-[1fr_min-content] lg:auto-rows-min">
        <DefaultHeader />
        <main
          className="lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-4 lg:overflow-y-auto lg:no-scrollbar text-gray-700"
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
