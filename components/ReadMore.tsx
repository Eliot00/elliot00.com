import Link from 'next/link'
import { ChevronsRight } from 'lucide-react'

export default function ReadMore({ href }: { href: string }) {
  return (
    <div className="w-full flex justify-center items-center">
      <Link
        href={href}
        className="flex items-center justify-center group w-fit"
      >
        <span className="underline">查看更多</span>{' '}
        <ChevronsRight className="w-0 opacity-0 transition-all duration-300 ease-in-out group-hover:w-6 group-hover:opacity-100" />
      </Link>
    </div>
  )
}
