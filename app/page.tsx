import PostsList from '@/components/PostsList'
import Link from 'next/link'
import type { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

export const metadata: Metadata = {
  title: 'Elliot',
  description: "Elliot's blog.",
}

export default function Home() {
  const posts = allPosts
    .sort((a, b) =>
      compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
    )
    .slice(0, 5)
  return (
    <>
      <PostsList posts={posts} />
      <Link href="/posts" className="link px-2">
        查看更多
      </Link>
    </>
  )
}
