import { Metadata } from 'next'
import MyLayout from '@/components/MyLayout'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

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
        <MyLayout>{children}</MyLayout>
        <Analytics />
      </body>
    </html>
  )
}
