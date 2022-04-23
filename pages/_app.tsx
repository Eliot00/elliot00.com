/* eslint-disable */
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import MyLayout from '@/components/MyLayout'
import * as gtag from '@/lib/gtag'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <MyLayout>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </MyLayout>
  )
}

export default MyApp
