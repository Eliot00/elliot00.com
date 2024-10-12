import { ImageResponse } from 'next/og'
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
  const { slug } = params
  const post = allPosts.find((p) => p._meta.slug === slug)

  if (!post) {
    notFound()
  }

  const bgAccent = uniqolor(slug, {
    saturation: [30, 35],
    lightness: [60, 70],
  }).color

  const bgAccentLight = uniqolor(slug, {
    saturation: [30, 35],
    lightness: [80, 90],
  }).color

  const bgAccentUltraLight = uniqolor(slug, {
    saturation: [30, 35],
    lightness: [95, 96],
  }).color

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          fontFamily: 'Noto Sans, Inter, "Material Icons"',
          padding: '80px 12rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: `linear-gradient(37deg, ${bgAccent} 27.82%, ${bgAccentLight} 79.68%, ${bgAccentUltraLight} 100%)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '128px',
            width: '128px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                padding: '4px',
                width: '40px',
                height: '40px',
                boxShadow: `4px 4px 8px ${bgAccentLight}, -4px -4px 8px ${bgAccent}`,
              }}
            ></div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                padding: '4px',
                width: '40px',
                height: '40px',
                boxShadow: `4px 4px 8px ${bgAccentLight}, -4px -4px 8px ${bgAccent}`,
              }}
            ></div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <div
              style={{
                padding: '4px',
                width: '40px',
                height: '40px',
                boxShadow: `4px 4px 8px ${bgAccentLight}, -4px -4px 8px ${bgAccent}`,
              }}
            ></div>
            <div
              style={{
                padding: '4px',
                width: '40px',
                height: '40px',
                boxShadow: `4px 4px 8px ${bgAccentLight}, -4px -4px 8px ${bgAccent}`,
              }}
            ></div>
            <div
              style={{
                padding: '4px',
                width: '40px',
                height: '40px',
                boxShadow: `4px 4px 8px ${bgAccentLight}, -4px -4px 8px ${bgAccent}`,
              }}
            ></div>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flexDirection: 'column',
            textAlign: 'right',
          }}
        >
          <h1
            style={{
              color: 'rgba(255, 255, 255, 0.92)',
              fontSize: '50px',
              overflow: 'hidden',
              maxHeight: '150px',
              fontWeight: 'bold',
            }}
          >
            {post.title}
          </h1>
          <h2
            style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '38px',
              fontWeight: 'lighter',
            }}
          >
            Elliot
          </h2>
        </div>
      </div>
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
