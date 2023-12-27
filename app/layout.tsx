import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Elliot',
  description: "Elliot's blog.",
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
      <body>
        <Header />
        <main className="max-w-3xl mx-auto p-4 sm:px-6 md:px-8 lg:px-0">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
