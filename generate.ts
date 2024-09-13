import { ContentConverter, Unified } from 'docube'
import { makeMdxConverter } from '@docube/mdx'
import {
  makeTransformer,
  makeAppConfig,
  LoaderLive,
  makeOutputMeta,
  FileConverterLive,
  ContentValidatorLive,
  ModuleResolverLive,
} from '@docube/common'
import { makeUnifiedLive } from '@docube/org'
import remarkGfm from 'remark-gfm'
import { Effect, Layer } from 'effect'
import rehypeShiftHeading from 'rehype-shift-heading'
import rehypePrettyCode from 'rehype-pretty-code'
import { transformerCopyButton } from '@rehype-pretty/transformers'

import rehypeProbeImageSize from './lib/rehypeImage'

const AppConfigLive = makeAppConfig({
  name: 'Post',
  directory: './posts',
  include: '**/*.{mdx,org}',
  fields: (s) => ({
    title: s.String,
    tags: s.Array(s.String),
    series: s.String,
    createdAt: s.String,
    publishedAt: s.String,
    summary: s.String,
  }),
})

const rehypePrettyOptions = {
  theme: {
    light: 'material-theme-lighter',
    dark: 'nord',
  },
  bypassInlineCode: true,
  transformers: [transformerCopyButton()],
}

const UnifiedLive = makeUnifiedLive({
  rehypePlugins: [
    [rehypeShiftHeading, { shift: 1 }],
    [rehypePrettyCode, rehypePrettyOptions],
  ],
})

const MdxConverterLive = makeMdxConverter({
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeProbeImageSize,
    [rehypePrettyCode, rehypePrettyOptions],
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
          if (file._meta.fileName.endsWith('mdx')) {
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
).pipe(Layer.provide(MdxConverterLive), Layer.provide(UnifiedLive))

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
