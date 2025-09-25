'use client'

import { useEffect } from 'react'

export function AdBlock() {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error: unknown) {
      console.log(error)
    }
  }, [])

  return (
    <div className="w-full max-h-40">
      <ins
        className="adsbygoogle block"
        data-ad-client="ca-pub-4587152222007322"
        data-ad-slot="2614984300"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  )
}
