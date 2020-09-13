import Header from "../components/Header"
import { BackTop } from "antd"
import { Fragment } from "react"
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import Footer from "../components/Footer"

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Fragment>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <BackTop />
      <style jsx global>{`
        body {
          background-color: #f6f6f6
        };
      `}</style>
    </Fragment>
  )
}

export default MyApp