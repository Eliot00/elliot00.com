import groupBy from '@/lib/groupBy'
import { Metadata } from 'next'
import React, { Fragment } from 'react'
import { allPosts } from 'contentlayer/generated'

export const metadata: Metadata = {
  title: '文集 - Elliot',
  description: "Elliot's blog.",
}

const Series: React.FC = () => {
  const series = getSeries()

  return (
    <>
      <div>
        <ul className="text-center">
          {Object.entries(series).map((entry) => {
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

function getSeries() {
  return groupBy(allPosts, (item) => item.series)
}

export default Series
