import groupBy from '@/lib/groupBy'
import { getAllArticlesMetaData } from '@/lib/mdx'
import type { MetaData } from '@/lib/mdx'
import { GetStaticProps } from 'next'
import React, { Fragment } from 'react'
import SEO from '@/components/SEO'

type Props = {
  series: Record<string, MetaData[]>
}

const Series: React.FC<Props> = ({ series }) => {
  return (
    <>
      <SEO title="文集 - 公子政的宅日常" description="公子政的宅日常" />
      <div>
        <ul className="text-center">
            {Object.entries(series).map(entry => {
              const [seriesName, articles] = entry
              return (
            <Fragment key={seriesName}>
              <li className="text-2xl py-2">{seriesName}</li>
              <ul>
                {articles.map((a) => {
                  return (
                    <li key={a.slug}>
                      <a href={`/posts/${a.slug}`} className="link">
                        {a.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </Fragment>
              )
            })}
        </ul>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getAllArticlesMetaData()
  const series = groupBy(articles, item => item.series)

  return {
    props: {
      series
    },
  }
}

export default Series
