import { useEffect } from "react"
import type { AppProps } from 'next/app'
import { useRouter } from "next/router"
import MyLayout from "../components/MyLayout"
import * as gtag from "../lib/gtag"
import { MDXProvider } from "@mdx-js/react"
import components from "../components/typography"
import '../styles/globals.css'


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
    <MDXProvider components={components}>
      <MyLayout>
        <Component {...pageProps} />
      </MyLayout>
    </MDXProvider>
  )
}

export default MyApp
