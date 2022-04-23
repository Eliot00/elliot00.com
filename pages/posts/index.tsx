import { GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'
import ArticleList from '@/components/ArticleList'
import SEO from '@/components/SEO'
import type { NextPage } from 'next'
import { ArticleSummary, getSlugs } from '@/lib/mdx'
import fs from 'fs'
import path from 'path'
import getFirstParagraph from '@/lib/getFirstParagraph'

const Posts: NextPage<{ articles: ArticleSummary[] }> = ({ articles }) => {
  return (
    <>
      <SEO title="博客 - 公子政的宅日常" description="博客文章列表" />
      <ArticleList articles={articles} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const slugs = await getSlugs()
  const articles: ArticleSummary[] = []
  for (const slug of slugs) {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'data/articles', `${slug}.mdx`),
      'utf-8'
    )
    const mdxSource = await serialize(source, { parseFrontmatter: true })
    const metaData: any = mdxSource.frontmatter
    articles.push({
      slug,
      ...metaData,
      summary: getFirstParagraph(source),
    })
  }

  articles.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
  return {
    props: {
      articles,
    },
  }
}

export default Posts
