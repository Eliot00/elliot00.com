import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdSense from '@/components/AdSense'
import './globals.css'

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
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full max-w-3xl self-center p-4 sm:px-6 md:px-8 lg:px-0">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
