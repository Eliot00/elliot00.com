import { allPosts, Post } from '@docube/generated'
import { getMDXComponent } from 'mdx-bundler/client'
import { notFound } from 'next/navigation'
import components from '@/components/typography'
import styles from '@/styles/Typography.module.css'
import Divider from '@/components/Divider'
import Link from 'next/link'
import { Lightning } from '@/components/icons'
import Copyright from '@/components/Copyright'
import { Metadata } from 'next'
import reactParse from 'html-react-parser'
import CopyCodeButton from '@/components/typography/CopyCodeButton'
import Comment from '@/components/Comment'
import SmartImage from '@/components/typography/SmartImage'

type Props = {
  params: { slug: string }
}

export default function PostDetail({ params }: Props) {
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
      <article className={styles.typography}>
        <header>
          <h1 className="font-serif lg:text-center text-3xl">{title}</h1>
          <div className="flex flex-col justify-center items-start gap-2 lg:gap-4 lg:items-center lg:flex-row text-gray-400 mx-auto py-4">
            <span className="text-center">
              创建于：
              <time className="link">
                {new Intl.DateTimeFormat('zh-Hans-CN').format(
                  new Date(createdAt)
                )}
              </time>
            </span>
            <span className="text-center">
              发布于：
              <time className="link">
                {new Intl.DateTimeFormat('zh-Hans-CN').format(
                  new Date(publishedAt)
                )}
              </time>
            </span>
            <span className="text-center">
              文集：
              <Link href="/series" className="link">
                {series}
              </Link>
            </span>
          </div>
        </header>
        <DualContent post={post} />
        <Divider>EOF</Divider>
        <div className="text-center font-medium">
          <Link className="link" href="/sponsor">
            文章有帮助？为我充个
            <Lightning />吧
          </Link>
        </div>
        <Copyright slug={slug} title={title} />
      </article>
      <Comment />
    </>
  )
}

function DualContent({ post }: { post: Post }) {
  if (post._meta.sourceFileType === 'mdx') {
    const MDXContent = getMDXComponent(post.body)
    return <MDXContent components={components} />
  } else {
    return (
      <>
        {reactParse(post.body, {
          replace: (dom) => {
            if (
              'attribs' in dom &&
              dom.name === 'button' &&
              dom.attribs['class'] === 'rehype-pretty-copy'
            ) {
              delete dom.attribs.onclick
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
                />
              )
            }
          },
        })}
      </>
    )
  }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
    },
  }
}
