import { GetStaticProps } from 'next'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import type { MetaData } from '@/lib/mdx'
import fs from 'fs'
import path from 'path'
import ArticleList from '@/components/ArticleList'
import SEO from '@/components/SEO'
import Link from 'next/link'
import { getInexactRecentArticlesSlugs, ArticleSummary } from '@/lib/mdx'
import getFirstParagraph from '@/lib/getFirstParagraph'
import type { NextPage } from 'next'

type HomeProps = {
  recentArticles: ArticleSummary[]
}

const Home: NextPage<HomeProps> = ({ recentArticles }) => {
  return (
    <>
      <SEO title="公子政的宅日常" description="公子政的宅日常" />
      <ArticleList articles={recentArticles} />
      <Link href="/posts">
        <a className="link px-2">查看更多</a>
      </Link>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const slugs = await getInexactRecentArticlesSlugs()
  const recentArticles: ArticleSummary[] = slugs.map(slug => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'data/articles', `${slug}.mdx`),
      'utf-8'
    )
    const vfile = new VFile({ value: source })
    matter(vfile, { strip: true })
    const metaData = vfile.data.matter as MetaData
    return {
      slug,
      ...metaData,
      summary: getFirstParagraph(source),
    }
  })

  return {
    props: {
      recentArticles,
    },
  }
}

export default Home
