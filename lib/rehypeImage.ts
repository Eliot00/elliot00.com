import { visit } from 'unist-util-visit'
// @ts-ignore
import probe from 'probe-image-size'
import path from 'node:path'
import fs from 'node:fs/promises'

const CACHE_FILE = path.join(process.cwd(), 'image-size-cache.json')

interface ImageSize {
  width: number
  height: number
}

interface Cache {
  [src: string]: ImageSize
}

const anyVisit = visit as any

export default function rehypeProbeImageSize() {
  return transformer

  async function transformer(tree: any, _file: any) {
    const promises: any[] = []
    anyVisit(tree, 'element', visitor)
    await Promise.all(promises)

    function visitor(node: any) {
      if (node.tagName !== 'img') {
        return
      }

      const src = node.properties.src

      if (
        src &&
        src.startsWith('https://elliot-blog.oss-cn-shanghai.aliyuncs.com')
      ) {
        const promise = setImageSize(src, node)
        promises.push(promise)
      }
    }
  }
}

async function setImageSize(src: string, node: any) {
  const result = await probeCache(src)

  node.properties.width = result.width
  node.properties.height = result.height
}

async function probeCache(src: string): Promise<ImageSize> {
  const cache = await readCache()

  if (cache[src]) {
    return cache[src]
  }

  const result = await probe(src)
  cache[src] = { width: result.width, height: result.height }

  await writeCache(cache)

  return cache[src]
}

async function readCache(): Promise<Cache> {
  try {
    const data = await fs.readFile(CACHE_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return {}
  }
}

async function writeCache(cache: Cache): Promise<void> {
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2))
}
