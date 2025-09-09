import { COMMON_LINK_CLASS_NAME } from '@/lib/constants'
import { ExternalLinkIcon } from 'lucide-react'
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'

export function ExternalLink({
  children,
  ...attribs
}: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return (
    <span className="not-prose inline-flex items-baseline leading-[normal]">
      <a {...attribs} target="_blank" className={COMMON_LINK_CLASS_NAME}>
        {children}
      </a>
      <ExternalLinkIcon size="0.8em" className="inline ml-1 self-center" />
    </span>
  )
}
