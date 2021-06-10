import { useEffect, useState } from "react"
import type { AppProps } from 'next/app'
import { useRouter } from "next/router"
import MyLayout from "../components/MyLayout"
import '../styles/globals.css'

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
    router.events.on('routeChangeError', stopLoading)

    return () => {
      router.events.off('routeChangeStart', startLoading)
      router.events.off('routeChangeComplete', stopLoading)
      router.events.on('routeChangeError', stopLoading)
    }

  }, [])

  return (
    <MyLayout>
      <Component loading={loading} {...pageProps} />
    </MyLayout>
  )
}

export default MyApp