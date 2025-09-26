import { allPosts, Post } from '@docube/generated'
import { notFound } from 'next/navigation'
import Divider from '@/components/Divider'
import Link from 'next/link'
import { Lightning } from '@/components/icons'
import Copyright from '@/components/Copyright'
import { Metadata } from 'next'
import reactParse, { Text } from 'html-react-parser'
import CopyCodeButton from '@/components/typography/CopyCodeButton'
import Comment from '@/components/Comment'
import SmartImage from '@/components/typography/SmartImage'
import 'rehype-callouts/theme/obsidian'
import {
  COMMON_LINK_CLASS_NAME,
  COMMON_PROSE_CLASS_NAME,
} from '@/lib/constants'
import { COPY_BUTTON_ID } from '@/lib/copyButtonSlotTransformer'
import { ExternalLink } from '@/components/ExternalLink'
import { BackToTopButton } from '@/components/BackToTop'
import { lightFormat } from 'date-fns'

type Props = {
  params: Promise<{ slug: string }>
}

const MJX_CLASS_NAME =
  '[&_mjx-container]:flex! [&_mjx-container]:justify-center [&_mjx-container]:overflow-auto prose-p:[&_mjx-container]:inline! prose-p:[&_mjx-container]:align-middle prose-p:[&_mjx-container]:leading-none prose-p:[&_mjx-container_svg]:inline!'

export default async function PostDetail(props: Props) {
  const params = await props.params
  // Find the post for the current page.
  const post = allPosts.find((post) => post._meta.slug === params.slug)

  // 404 if the post does not exist.
  if (!post) notFound()

  const {
    title,
    series,
    createdAt,
    publishedAt,
    _meta: { slug },
  } = post

  return (
    <>
      <article
        className={`${COMMON_PROSE_CLASS_NAME} ${MJX_CLASS_NAME} lg:prose-h1:text-center prose-pre:relative prose-pre:border prose-pre:border-solid prose-pre:border-border`}
      >
        <header>
          <h1>{title}</h1>
          <div className="not-prose flex flex-col justify-center items-start gap-2 lg:gap-4 lg:items-center lg:flex-row text-secondary-foreground mx-auto my-6">
            <span className="text-center">
              起筆於：
              <time dateTime={createdAt}>
                {lightFormat(new Date(createdAt), 'yyyy-MM-dd')}
              </time>
            </span>
            <span className="text-center">
              發佈於：
              <time dateTime={publishedAt}>
                {lightFormat(new Date(publishedAt), 'yyyy-MM-dd')}
              </time>
            </span>
            <span className="text-center">
              文集：
              <Link href="/series" className={COMMON_LINK_CLASS_NAME}>
                {series}
              </Link>
            </span>
          </div>
        </header>
        <PostContent post={post} />
        <BackToTopButton />
      </article>
      <Divider>EOF</Divider>
      <div className="text-center font-medium">
        <Link
          className="text-foreground/80 hover:text-foreground"
          href="/sponsor"
        >
          文章有帮助？为我充个
          <Lightning />吧
        </Link>
      </div>
      <Copyright slug={slug} title={title} />
      <Comment />
    </>
  )
}

function PostContent({ post }: { post: Post }) {
  return (
    <>
      {reactParse(post.body, {
        replace: (dom) => {
          if (
            'attribs' in dom &&
            dom.name === 'button' &&
            dom.attribs['buttonId'] === COPY_BUTTON_ID
          ) {
            return <CopyCodeButton code={dom.attribs.data} />
          }

          if ('attribs' in dom && dom.name === 'img') {
            return (
              <SmartImage
                src={dom.attribs.src}
                alt={dom.attribs.alt}
                width={
                  dom.attribs.width ? Number(dom.attribs.width) : undefined
                }
                height={
                  dom.attribs.height ? Number(dom.attribs.height) : undefined
                }
                unoptimized={dom.attribs.unoptimized === 'true'}
              />
            )
          }

          if ('attribs' in dom && dom.name == 'a' && !dom.attribs.ariaHidden) {
            if (dom.children[0] instanceof Text) {
              const text = dom.children[0].data
              const href = dom.attribs.href || ''

              if (href.startsWith('/')) {
                return (
                  <Link
                    {...dom.attribs}
                    href={href}
                    className={`not-prose ${COMMON_LINK_CLASS_NAME}`}
                  >
                    {text}
                  </Link>
                )
              } else if (href.startsWith('https')) {
                return <ExternalLink {...dom.attribs}>{text}</ExternalLink>
              }
            }
          }
        },
      })}
    </>
  )
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.slug,
  }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { slug } = params
  const post = allPosts.find((post) => post._meta.slug === slug)

  if (!post) notFound()

  const title = `${post.title} - Elliot`
  const description = post.summary

  return {
    title,
    keywords: post.tags as string[],
    description,
    openGraph: {
      title,
      description,
      images: post.cover ? [post.cover] : undefined,
    },
  }
}
