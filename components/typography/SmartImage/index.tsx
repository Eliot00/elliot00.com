import Image from 'next/image'
import styles from './SmartImage.module.css'

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
        className={styles.img}
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    )
  }

  return <img className={styles.img} src={src} alt={alt} />
}
