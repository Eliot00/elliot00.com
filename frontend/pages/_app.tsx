import Header from "../components/Header"
import { BackTop } from "antd"
import { Fragment } from "react"
import type { AppProps } from 'next/app'
import Footer from "../components/Footer"

function MyApp({ Component, pageProps }: AppProps) {
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