import { Metadata } from 'next'
import MyLayout from '@/components/MyLayout'
import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google'

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
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID as string} />
      </body>
    </html>
  )
}
