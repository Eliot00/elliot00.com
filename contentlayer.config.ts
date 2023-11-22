// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import getFirstParagraph from './lib/getFirstParagraph'

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
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
    summary: {
      type: 'string',
      resolve: (post) => getFirstParagraph(post.body.raw),
    },
    slug: { type: 'string', resolve: (post) => post._raw.flattenedPath },
  },
}))

export default makeSource({ contentDirPath: 'posts', documentTypes: [Post] })
