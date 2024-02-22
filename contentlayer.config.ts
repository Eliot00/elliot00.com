// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeProbeImageSize from './lib/rehypeImage'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    series: { type: 'string', required: true },
    createdAt: { type: 'date', required: true },
    publishedAt: { type: 'date', required: true },
    summary: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
    slug: { type: 'string', resolve: (post) => post._raw.flattenedPath },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: { rehypePlugins: [rehypeProbeImageSize] },
})
