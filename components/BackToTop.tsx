'use client'

import { ArrowUpIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

const BASE_CN =
  'flex items-center fixed bottom-8 end-4 z-50 rounded-md bg-background/35 bg-clip-padding backdrop-blur-lg'
const MD_BASE_CN = 'md:sticky md:end-auto md:float-end md:me-1'
const ANIMATE_CN = 'transition duration-500 ease-in-out'
const VISIBLE_CN = 'translate-y-0 opacity-100'
const INVISIBLE_CN = 'translate-y-14 opacity-0'

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <button
      type="button"
      className={`${BASE_CN} ${MD_BASE_CN} ${ANIMATE_CN} ${isVisible ? VISIBLE_CN : INVISIBLE_CN}`}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      <ArrowUpIcon size="1em" /> Back To Top
    </button>
  )
}
