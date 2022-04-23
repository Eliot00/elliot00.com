import { GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
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
  const recentArticles: ArticleSummary[] = []
  for (const slug of slugs) {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'data/articles', `${slug}.mdx`),
      'utf-8'
    )
    const mdxSource = await serialize(source, { parseFrontmatter: true })
    const metaData: any = mdxSource.frontmatter
    recentArticles.push({
      slug,
      ...metaData,
      summary: getFirstParagraph(source),
    })
  }
  return {
    props: {
      recentArticles,
    },
  }
}

export default Home
