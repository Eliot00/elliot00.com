import SEO from '@/components/SEO'
import fs from 'fs'
import path from 'path'
import { GetStaticProps } from 'next'
import groupBy from '@/lib/groupBy'
import range from '@/lib/range'
import Link from 'next/link'
import { yearToDiZhi } from '@/lib/time'
import type { NextPage } from 'next'
import { getSlugs } from '@/lib/mdx'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'

type ArticleTimelineItem = {
  slug: string
  updatedAt: string
  title: string
}

type ArchivesProps = {
  articlesTimeline: Record<string, ArticleTimelineItem[]>
}

const START = 2020

const Archives: NextPage<ArchivesProps> = ({ articlesTimeline }) => {
  const now = new Date().getFullYear()
  return (
    <div className="mx-auto w-full h-full">
      <SEO title="归档 - 公子政的宅日常" />
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div
          className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
          style={{ left: '50%' }}
        ></div>
        {range(START, now + 1)
          .reverse()
          .map((year) => {
            const isEven = year % 2 === 0
            return (
              <div
                key={year}
                className={`mb-8 flex justify-between items-center w-full ${
                  isEven ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                  <h2 className="mx-auto font-semibold text-lg text-white">
                    {yearToDiZhi(year)}
                  </h2>
                </div>
                <div
                  className={`order-1 rounded-lg shadow-xl w-5/12 px-6 py-4 ${
                    isEven ? 'bg-rose-400' : 'bg-violet-400'
                  }`}
                >
                  <h3 className="mb-3 font-bold text-gray-800 text-xl">
                    {year}
                  </h3>
                    <ul className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100 break-all">
                      {articlesTimeline[`${year}`].map((item) => {
                        return (
                          <li key={item.slug} className="my-2">
                            <Link href={`/posts/${item.slug}`}>
                              <a className="underline">{item.title}</a>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const slugs = await getSlugs()
  const articles: ArticleTimelineItem[] = slugs.map(slug => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'data/articles', `${slug}.mdx`),
      'utf-8'
    )
    const vfile = new VFile({ value: source })
    matter(vfile, { strip: true })
    return (vfile.data.matter as ArticleTimelineItem | undefined) ?? {slug, title: '', updatedAt: ''}
  })

  const articlesTimeline = groupBy(articles, (item) => {
    const updatedAt = new Date(item.updatedAt)
    return updatedAt.getFullYear()
  })
  return {
    props: {
      articlesTimeline,
    },
  }
}

export default Archives
