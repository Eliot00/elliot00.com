import { ImageResponse } from 'next/og'
import OpenGraphImage from '@/components/OpenGraphImage'
import { allPosts } from '@docube/generated'
import { notFound } from 'next/navigation'
import uniqolor from 'uniqolor'

export const alt = 'Elliot'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p._meta.slug === params.slug)

  if (!post) {
    notFound()
  }

  const seed = Math.random().toString(36).substring(7)
  const bgAccent = uniqolor(seed, {
    saturation: [30, 35],
    lightness: [60, 70],
  }).color

  const bgAccentLight = uniqolor(seed, {
    saturation: [30, 35],
    lightness: [80, 90],
  }).color

  const bgAccentUltraLight = uniqolor(seed, {
    saturation: [30, 35],
    lightness: [95, 96],
  }).color

  return new ImageResponse(
    (
      <OpenGraphImage
        background={{
          accent: bgAccent,
          light: bgAccentLight,
          ultraLight: bgAccentUltraLight,
        }}
        title={post.title}
      />
    ),
    {
      ...size,
      headers: new Headers([
        [
          'cache-control',
          'max-age=3600, s-maxage=3600, stale-while-revalidate=600',
        ],
        ['cdn-cache-control', 'max-age=3600, stale-while-revalidate=600'],
      ]),
    }
  )
}