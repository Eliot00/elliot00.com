import fs from 'fs'
import path from 'path'
import { sync } from 'glob'

const articlesPath = path.join(process.cwd(), 'data/articles')

export async function getSlugs() {
  const paths = sync(`${articlesPath}/*.mdx`)

  return paths.map(getSlugFromPath)
}

export async function getInexactRecentArticlesSlugs() {
  const paths = sync(`${articlesPath}/*.mdx`)
  const sortedPaths = paths
    .map((path) => ({ path, ctime: fs.statSync(path).ctime }))
    .sort((a, b) => b.ctime.getTime() - a.ctime.getTime())
    .map((obj) => obj.path)
  return sortedPaths.map(getSlugFromPath).slice(0, 5)
}

const getSlugFromPath = (path: string): string => {
  // holds the paths to the directory of the article
  const pathContent = path.split('/')
  const fileName = pathContent[pathContent.length - 1]
  const [slug] = fileName.split('.')

  return slug
}

export type MetaData = {
  title: string
  tags: string[]
  series: string
  createdAt: string
  publishedAt: string
}

export type ArticleSummary = {
  slug: string
  summary: string
} & MetaData
