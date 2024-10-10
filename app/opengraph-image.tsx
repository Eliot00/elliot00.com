import { ImageResponse } from 'next/og'
import OpenGraphImage from '@/components/OpenGraphImage'

export const alt = 'Elliot'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(<OpenGraphImage />, {
    ...size,
  })
}
