import Image from 'next/image'
import { imageDimensionsFromStream } from 'image-dimensions'
import styles from './SmartImage.module.css'

export default async function SmartImage({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  const size = await getImageSize(src)

  if (size) {
    return (
      <Image
        className={styles.img}
        src={src}
        alt={alt}
        width={size.width}
        height={size.height}
      />
    )
  }

  return <img className={styles.img} src={src} alt={alt} />
}

async function getImageSize(src: string) {
  if (src.startsWith('https://elliot-blog.oss-cn-shanghai.aliyuncs.com')) {
    try {
      const { body } = await fetch(src)

      if (!body) {
        return null
      }

      const size = await imageDimensionsFromStream(body)
      return size
    } catch (e) {
      return null
    }
  }

  return null
}
