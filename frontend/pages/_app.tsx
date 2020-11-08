import Header from "../components/Header"
import { BackTop } from "antd"
import { Fragment, useEffect, useState } from "react"
import type { AppProps } from 'next/app'
import Footer from "../components/Footer"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const startLoading = () => {
    console.log('route change start')
    setLoading(true)
  }

  const stopLoading = () => {
    console.log('route change complete')
    setLoading(false)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', startLoading)
    router.events.on('routeChangeComplete', stopLoading)

    return () => {
      router.events.off('routeChangeStart', startLoading)
      router.events.off('routeChangeComplete', stopLoading)
    }

  }, [])

  return (
    <Fragment>
      <Header />
        <Component loading={loading} {...pageProps} />
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