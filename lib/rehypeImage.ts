import { visit } from 'unist-util-visit'
// @ts-ignore
import probe from 'probe-image-size'

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
  const result = await probe(src)

  node.properties.width = result.width
  node.properties.height = result.height
}
