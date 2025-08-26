import { ContentConverter, Unified } from 'docube'
import { makeMarkdownConverter } from '@docube/markdown'
import { makeUnifiedLive } from '@docube/org'
import {
  makeTransformer,
  makeAppConfig,
  LoaderLive,
  makeOutputMeta,
  FileConverterLive,
  ContentValidatorLive,
  ModuleResolverLive,
} from '@docube/common'
import remarkGfm from 'remark-gfm'
import { Effect, Layer } from 'effect'
import rehypeShiftHeading from 'rehype-shift-heading'
import slug from 'rehype-slug-custom-id'
import raw from 'rehype-raw'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeMathjax from 'rehype-mathjax'
import rehypeCallouts from 'rehype-callouts'
import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype'

import rehypeProbeImageSize from './lib/rehypeImage'
import { copyButtonSlotTransformer } from './lib/copyButtonSlotTransformer'

const AppConfigLive = makeAppConfig({
  name: 'Post',
  directory: './posts',
  include: '**/*.{md,org}',
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
})

const rehypeShikiOptions = {
  themes: {
    light: 'material-theme-lighter',
    dark: 'nord',
  },
  transformers: [copyButtonSlotTransformer()],
  defaultColor: 'light-dark()',
} satisfies RehypeShikiOptions

const UnifiedLive = makeUnifiedLive({
  rehypePlugins: [
    raw,
    rehypeProbeImageSize,
    [rehypeShiftHeading, { shift: 1 }],
    [rehypeShiki, rehypeShikiOptions],
    slug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    rehypeMathjax,
    rehypeCallouts,
  ],
})

const MarkdownConverterLive = makeMarkdownConverter({
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeProbeImageSize,
    [rehypeShiki, rehypeShikiOptions],
    slug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
  ],
})

const MyContentConverterLive = Layer.effect(
  ContentConverter,
  Effect.gen(function* () {
    const mdxConverter = yield* ContentConverter
    const unified = yield* Unified
    return {
      convert: (file) =>
        Effect.gen(function* () {
          if (file._meta.fileName.endsWith('md')) {
            return yield* mdxConverter.convert(file)
          } else {
            const parsed = yield* file.text.pipe(
              Effect.andThen(unified.process)
            )
            const {
              published_at: publishedAt,
              created_at: createdAt,
              tags,
              ...rest
            } = parsed.data
            return {
              ...rest,
              publishedAt,
              createdAt,
              tags: (tags as string).trim().split(' '),
              _meta: makeOutputMeta(file),
              body: parsed.toString(),
            }
          }
        }),
    }
  })
).pipe(Layer.provide(MarkdownConverterLive), Layer.provide(UnifiedLive))

const transformer = makeTransformer({
  loader: LoaderLive.pipe(Layer.provide(AppConfigLive)),
  fileConverter: FileConverterLive.pipe(
    Layer.provide(AppConfigLive),
    Layer.provide(MyContentConverterLive),
    Layer.provide(ContentValidatorLive.pipe(Layer.provide(AppConfigLive)))
  ),
  moduleResolver: ModuleResolverLive.pipe(Layer.provide(AppConfigLive)),
})

Effect.runPromiseExit(transformer).then(console.log, console.error)
