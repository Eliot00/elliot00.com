import Image from 'next/image'

const IMAGE_STYLES = 'mx-auto my-2 shadow-lg dark:shadow-black/30'

export default function SmartImage({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width?: number
  height?: number
}) {
  if (width && height) {
    return (
      <Image
        className={IMAGE_STYLES}
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    )
  }

  return <img className={IMAGE_STYLES} src={src} alt={alt} />
}
