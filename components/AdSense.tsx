import Script from 'next/script'

type AdSenseProps = {
  pid: string
}

export default function AdSense({ pid }: AdSenseProps) {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pid}`}
      crossOrigin="anonymous"
      async
    />
  )
}
