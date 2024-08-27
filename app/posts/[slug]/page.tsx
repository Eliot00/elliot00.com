import { allPosts } from '@docube/generated'
import { getMDXComponent } from 'mdx-bundler/client'
import { notFound } from 'next/navigation'
import components from '@/components/typography'
import styles from '@/styles/Typography.module.css'
import Divider from '@/components/Divider'
import Link from 'next/link'
import { Lightning } from '@/components/icons'
import Copyright from '@/components/Copyright'
import { Metadata } from 'next'
import Script from 'next/script'

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
    body,
    _meta: { slug },
  } = post
  const MDXContent = getMDXComponent(body)

  return (
    <>
      <article className={styles.typography}>
        <header>
          <h1 className="font-serif text-center text-3xl">{title}</h1>
          <div className="text-center text-gray-400 my-4">
            <span className="px-2">
              创建于：
              <time className="link">
                {new Intl.DateTimeFormat('zh-Hans-CN').format(
                  new Date(createdAt)
                )}
              </time>
            </span>
            <span className="px-2">
              发布于：
              <time className="link">
                {new Intl.DateTimeFormat('zh-Hans-CN').format(
                  new Date(publishedAt)
                )}
              </time>
            </span>
            <span className="px-2">
              文集：
              <Link href="/series" className="link">
                {series}
              </Link>
            </span>
          </div>
        </header>
        <MDXContent components={components} />
        <Divider>EOF</Divider>
        <div className="text-center font-medium">
          <Link className="link" href="/sponsor">
            文章有帮助？为我充个
            <Lightning />吧
          </Link>
        </div>
        <Copyright slug={slug} title={title} />
      </article>
      <div
        id="cusdis_thread"
        data-host="https://cusdis-gules.vercel.app"
        data-app-id="032168ca-8f97-4fc7-9b42-c6419edac968"
        data-page-id={slug}
        data-page-url={`https://elliot00.com/posts/${slug}`}
        data-page-title={title}
      ></div>
      <Script
        async
        defer
        src="https://cusdis-gules.vercel.app/js/cusdis.es.js"
      ></Script>
    </>
  )
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

  return {
    title: `${post.title} - Elliot`,
    keywords: post.tags as string[],
    description: post.summary,
  }
}
