'use client'

import { useEffect } from 'react'

export function AdBlock() {
  useEffect(() => {
    try {
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      )
    } catch (error: any) {
      console.log(error.message)
    }
  }, [])

  return (
    <div className="max-w-full">
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
