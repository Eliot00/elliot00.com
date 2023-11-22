import PostsList from '@/components/PostsList'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { type Metadata } from 'next'

export default function Posts() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
  )

  return <PostsList posts={posts} />
}

export const metadata: Metadata = {
  title: '博客 - Elliot',
  description: '博客文章列表',
}
