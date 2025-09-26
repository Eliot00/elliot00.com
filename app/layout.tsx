import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from '@/components/Footer'
import AdSense from '@/components/AdSense'
import { LXGW_WenKai_TC } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'

const lxgw = LXGW_WenKai_TC({
  variable: '--font-lxgw-serif',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'optional',
})

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
    <html lang="zh-CN" className={`${lxgw.variable} antialiased scroll-smooth`}>
      <head>
        <AdSense pid="4587152222007322" />
      </head>
      <body className="font-serif">
        <Header />
        <main className="mx-auto max-w-3xl" role="main">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
