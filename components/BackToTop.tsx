'use client'

import { ArrowUpIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

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
      className={`fixed bottom-4 right-4 transition duration-300 ease-in-out ${isVisible ? 'flex items-center' : 'hidden'}`}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      <ArrowUpIcon size="1em" /> Back To Top
    </button>
  )
}
