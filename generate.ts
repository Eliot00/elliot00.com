import { transform } from '@docube/mdx'
import rehypeProbeImageSize from './lib/rehypeImage'
import remarkGfm from 'remark-gfm'

transform({
  name: 'Post',
  directory: './posts',
  include: '**/*.mdx',
  fields: (s) => ({
    title: s.String,
    tags: s.Array(s.String),
    series: s.String,
    createdAt: s.String,
    publishedAt: s.String,
    summary: s.String,
  }),
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeProbeImageSize],
})
