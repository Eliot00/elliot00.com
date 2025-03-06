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
      <body className="p-8 max-w-7xl mx-auto min-h-screen lg:px-20 lg:h-screen lg:max-h-screen lg:grid lg:gap-x-6 lg:grid-cols-[3fr_1fr] lg:grid-rows-[1fr_9rem]">
        <DefaultHeader />
        <main
          className="lg:my-20 lg:px-4 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 overflow-y-auto no-scrollbar text-gray-700"
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
