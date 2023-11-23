import { Metadata } from 'next'
import MyLayout from '@/components/MyLayout'
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
  // const router = useRouter()
  // useEffect(() => {
  //     const handleRouteChange = (url: string) => {
  //         gtag.pageview(url)
  //     }
  //     router.events.on('routeChangeComplete', handleRouteChange)
  //     router.events.on('hashChangeComplete', handleRouteChange)
  //     return () => {
  //         router.events.off('routeChangeComplete', handleRouteChange)
  //         router.events.off('hashChangeComplete', handleRouteChange)
  //     }
  // }, [router.events])

  return (
    <html lang="zh-CN">
      {/*
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', '${gtag.GA_TRACKING_ID}', {
                                page_path: window.location.pathname,
                            });
                        `,
                    }}
                />
            </head>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
              */}
      <body>
        <MyLayout>{children}</MyLayout>
      </body>
    </html>
  )
}
