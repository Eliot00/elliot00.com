import { ContentConverter, Unified } from 'docube'
import { makeMarkdownConverter } from '@docube/markdown'
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
import rehypePrettyCode from 'rehype-pretty-code'
import slug from 'rehype-slug-custom-id'
import parse from 'uniorg-parse'
import uniorg2rehype from 'uniorg-rehype'
import stringify from 'rehype-stringify'
import extractKeywords from 'uniorg-extract-keywords'
import { unified } from 'unified'
import raw from 'rehype-raw'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeMathjax from 'rehype-mathjax'
import rehypeCallouts from 'rehype-callouts'

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

const rehypePrettyOptions = {
  theme: {
    light: 'material-theme-lighter',
    dark: 'nord',
  },
  bypassInlineCode: true,
  transformers: [copyButtonSlotTransformer()],
}

const orgProcessor = unified()
  .use(parse)
  .use(extractKeywords)
  .use(uniorg2rehype)
  .use(raw)
  .use(rehypeProbeImageSize)
  .use(rehypeShiftHeading, { shift: 1 })
  // @ts-expect-error unknown cache error
  .use(rehypePrettyCode, rehypePrettyOptions)
  .use(slug)
  .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
  .use(rehypeMathjax)
  .use(rehypeCallouts)
  .use(stringify)

const UnifiedLive = Layer.succeed(
  Unified,
  Unified.of({
    process(content) {
      return Effect.promise(() => orgProcessor.process(content))
    },
  })
)

const MarkdownConverterLive = makeMarkdownConverter({
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeProbeImageSize,
    [rehypePrettyCode, rehypePrettyOptions],
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
