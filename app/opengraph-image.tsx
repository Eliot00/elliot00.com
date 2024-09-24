import { ImageResponse } from 'next/og'

export const alt = 'Elliot'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

const font = 'Helvetica, Arial, sans-serif'
const bgAccent = '#95cb9d'
const bgAccentLight = '#d9ecdc'
const bgAccentUltraLight = '#eef7ef'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: font,
          background: `linear-gradient(37deg, ${bgAccent} 27.82%, ${bgAccentLight} 79.68%, ${bgAccentUltraLight} 100%)`,
          padding: '5rem 15rem',
        }}
        tw="flex h-full w-full items-center justify-center"
      >
        <div tw="flex flex-col">
          <h1
            style={{
              color: '#ffffff99',
              fontSize: '3.5rem',
            }}
          >
            Elliot
          </h1>

          <p
            style={{
              color: '#ffffff89',
              fontSize: '1.8rem',
            }}
          >
            致虛極 守靜篤
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
