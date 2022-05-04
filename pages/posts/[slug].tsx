import fs from 'fs'
import path from 'path'
import { getSlugs } from '@/lib/mdx'
import SEO from '@/components/SEO'
import Copyright from '@/components/Copyright'
import Link from 'next/link'
import { ReactCusdis } from 'react-cusdis'
import components from '@/components/typography'
import { Lightning } from '@/components/icons'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import type { NextPage } from 'next'
import Divider from '@/components/Divider'
import styles from '@/styles/Typography.module.css'

type MetaData = {
  slug: string
  title: string
  series: string
  createdAt: string
  publishedAt: string
}

const MDArticle: NextPage<{ mdxSource: MDXRemoteSerializeResult }> = ({
  mdxSource,
}) => {
  const { title, slug, series, createdAt, publishedAt } =
    mdxSource.frontmatter as MetaData

  return (
    <>
      <SEO title={`${title} - 公子政的宅日常`} />
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
              <Link href="/series">
                <a className="link">{series}</a>
              </Link>
            </span>
          </div>
        </header>
        {/* @ts-ignore */}
        <MDXRemote {...mdxSource} components={components} />
        <Divider>EOF</Divider>
        <div className="text-center font-medium">
          <a className="link" href="https://afdian.net/@Elliot?tab=home">
            文章有帮助？为我充个
            <Lightning />吧
          </a>
        </div>
        <Copyright slug={slug} title={title} />
      </article>
      <div>
        <ReactCusdis
          attrs={{
            host: 'https://cusdis-p65vpouz7-eliot00.vercel.app',
            appId: 'f73edaa5-cdc2-486e-9cda-6360f7d3b907',
            pageId: slug,
            pageTitle: title,
            pageUrl: `https://elliot.com/posts/${slug}`,
          }}
        />
      </div>
    </>
  )
}

export default MDArticle

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getSlugs()).map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const source = fs.readFileSync(
    path.join(process.cwd(), 'data/articles', `${slug}.mdx`),
    'utf-8'
  )
  const mdxSource = await serialize(source, { parseFrontmatter: true })
  return { props: { mdxSource } }
}
