import { transform } from '@docube/org'
import rehypeShiftHeading from 'rehype-shift-heading'
import slug from 'rehype-slug-custom-id'
import raw from 'rehype-raw'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeMathjax from 'rehype-mathjax'
import rehypeCallouts from 'rehype-callouts'
import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype'

import rehypeProbeImageSize from './lib/rehypeImage'
import { copyButtonSlotTransformer } from './lib/copyButtonSlotTransformer'

const rehypeShikiOptions = {
  themes: {
    light: 'min-light',
    dark: 'night-owl',
  },
  transformers: [copyButtonSlotTransformer()],
  defaultColor: 'light-dark()',
  langAlias: {
    C: 'c',
  },
} satisfies RehypeShikiOptions

async function main() {
  await transform({
    name: 'Post',
    directory: './posts',
    include: '**/*.org',
    fields: (s) => ({
      title: s.String,
      tags: s.Array(s.String),
      series: s.String,
      createdAt: s.String,
      publishedAt: s.String,
      updatedAt: s.optional(s.String),
      summary: s.String,
      cover: s.optional(s.String),
    }),
    rehypePlugins: [
      raw,
      rehypeProbeImageSize,
      [rehypeShiftHeading, { shift: 1 }],
      [rehypeShiki, rehypeShikiOptions],
      slug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          content: { type: 'text', value: '#' },
          headingProperties: { className: 'group' },
          properties: {
            class:
              'ms-2 no-underline opacity-75 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100 hover:text-primary',
            ariaHidden: true,
            tabIndex: -1,
          },
        },
      ],
      rehypeMathjax,
      rehypeCallouts,
    ],
    contentTransform: (converted) => {
      const { published_at, created_at, tags, ...rest } = converted
      return {
        ...rest,
        publishedAt: published_at,
        createdAt: created_at,
        tags: String(tags).trim().split(' '),
      }
    },
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
