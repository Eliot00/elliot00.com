'use client'

import { type PropsWithoutRef, useState } from 'react'

export default function CopyCodeButton({
  code,
}: PropsWithoutRef<{ code: string }>) {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2500)
  }

  return (
    <button
      className="absolute right-4 top-0 -translate-y-1/2 py-1 px-2 rounded-sm bg-secondary hover:bg-secondary/80 text-xs"
      title="Copy code"
      aria-label="Copy code"
      onClick={copy}
    >
      {isCopied ? 'Copied' : 'Copy'}
    </button>
  )
}
