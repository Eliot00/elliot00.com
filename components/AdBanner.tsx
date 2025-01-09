'use client'

import { useEffect } from 'react'

type AdBannerTypes = {
  dataAdSlot: string
  dataAdFormat: string
  dataFullWidthResponsive: boolean
}

const AdBanner = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
}: AdBannerTypes) => {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error: unknown) {
      console.log(error)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-4587152222007322"
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-ad-layout-key="-fc+5d+7t-di-2l"
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    ></ins>
  )
}

export default AdBanner
