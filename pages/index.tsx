import { GetStaticProps } from 'next'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import type { MetaData } from '@/lib/mdx'
import fs from 'fs'
import path from 'path'
import ArticleList from '@/components/ArticleList'
import SEO from '@/components/SEO'
import Link from 'next/link'
import { ArticleSummary } from '@/lib/mdx'
import getFirstParagraph from '@/lib/getFirstParagraph'
import type { NextPage } from 'next'
import ALL_BLOG_META_DATA from '../data/manifest.json'

type HomeProps = {
  recentArticles: ArticleSummary[]
}

const Home: NextPage<HomeProps> = ({ recentArticles }) => {
  return (
    <>
      <SEO title="Elliot" description="Elliot's blog." />
      <ArticleList articles={recentArticles} />
      <Link href="/posts" className="link px-2">
        查看更多
      </Link>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const slugs = ALL_BLOG_META_DATA.slice(0, 5).map(value => value.slug)
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
