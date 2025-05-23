'use client'

import Script from 'next/script'

export default function Comment() {
  return (
    <div>
      <div id="tcomment"></div>
      <Script
        src="https://cdn.jsdelivr.net/npm/twikoo@1.6.44/dist/twikoo.min.js"
        onReady={() => {
          window.twikoo.init({
            envId: 'https://twikoojs-zeta.vercel.app',
            el: '#tcomment',
            lang: 'zh-CN',
          })
        }}
      />
    </div>
  )
}
