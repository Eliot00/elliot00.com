import { useEffect, useState } from "react"
import type { AppProps } from 'next/app'
import { useRouter } from "next/router"
import MyLayout from "../components/MyLayout"
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <MyLayout>
      <Component {...pageProps} />
    </MyLayout>
  )
}

export default MyApp