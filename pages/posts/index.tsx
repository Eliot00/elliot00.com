import { GetStaticProps } from 'next'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import React from 'react'
import ArticleList from '@/components/ArticleList'
import SEO from '@/components/SEO'
import type { NextPage } from 'next'
import { ArticleSummary, getSlugs } from '@/lib/mdx'
import fs from 'fs'
import path from 'path'
import getFirstParagraph from '@/lib/getFirstParagraph'
import type { MetaData } from '@/lib/mdx'

const Posts: NextPage<{ articles: ArticleSummary[] }> = ({ articles }) => {
  return (
    <>
      <SEO title="博客 - Elliot" description="博客文章列表" />
      <ArticleList articles={articles} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const slugs = await getSlugs()
  const articles: ArticleSummary[] = slugs.map(slug => {
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

  articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  return {
    props: {
      articles,
    },
  }
}

export default Posts
