import SEO from '@/components/SEO'
import { gql, request } from 'graphql-request'
import { GetStaticProps } from 'next'
import { GraphQLEndpoint } from '@/lib/auth'
import groupBy from '@/lib/groupBy'
import range from '@/lib/range'
import Link from 'next/link'
import { yearToDiZhi } from '@/lib/time'
import type { NextPage } from 'next'

type ArticleTimelineItem = {
  slug: string
  created: string
  title: string
}

type ArchivesProps = {
  articlesTimeline: Record<string, ArticleTimelineItem[]>
}

const START = 2020

const Archives: NextPage<ArchivesProps> = ({ articlesTimeline }) => {
  const now = new Date().getFullYear()
  return (
    <div className="container mx-auto w-full h-full">
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
                    isEven ? 'bg-red-400' : 'bg-purple-400'
                  }`}
                >
                  <h3 className="mb-3 font-bold text-gray-800 text-xl">
                    {year}
                  </h3>
                  <p>
                    <ul className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                      {articlesTimeline[`${year}`].map((item) => {
                        // CSS更优雅实现
                        return (
                          <li key={item.slug} style={{ width: '1000px' }}>
                            <Link href={`/posts/${item.slug}`}>
                              <a className="hover:underline">{item.title}</a>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </p>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (_context) => {
  const query = gql`
    {
      article(order_by: { created: desc }) {
        slug
        title
        created
      }
    }
  `
  const response = await request(GraphQLEndpoint, query)
  const articles: ArticleTimelineItem[] = response.article
  const articlesTimeline = groupBy(articles, (item) => {
    const createdAt = new Date(item.created)
    return createdAt.getFullYear()
  })
  return {
    props: {
      articlesTimeline,
    },
  }
}

export default Archives
