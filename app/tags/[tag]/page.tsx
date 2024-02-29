import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import PostsList from '@/components/PostsList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tags - Elliot',
}

type Props = {
  params: { tag: string }
}

export default function TaggedPosts({ params }: Props) {
  const tag = decodeURIComponent(params.tag)
  const posts = allPosts.filter((post) => post.tags.includes(tag))

  if (!posts.length) {
    notFound()
  }

  return <PostsList title={tag} posts={posts} />
}

export async function generateStaticParams() {
  const allTags = allPosts.flatMap((post) => post.tags)
  const uniqueTags = Array.from(new Set(allTags))

  return uniqueTags.map((tag) => ({ tag }))
}
