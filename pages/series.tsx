import groupBy from '@/lib/groupBy'
import type { MetaData } from '@/lib/mdx'
import { GetStaticProps } from 'next'
import React, { Fragment } from 'react'
import SEO from '@/components/SEO'
import ALL_BLOG_META_DATA from '../data/manifest.json'

type Props = {
  series: Record<string, MetaData[]>
}

const Series: React.FC<Props> = ({ series }) => {
  return (
    <>
      <SEO title="文集 - Elliot" description="Elliot's blog." />
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
  const series = groupBy(ALL_BLOG_META_DATA, item => item.series)

  return {
    props: {
      series
    },
  }
}

export default Series
