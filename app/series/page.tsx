import groupBy from '@/lib/groupBy'
import { Metadata } from 'next'
import React, { Fragment } from 'react'
import { allPosts } from '@docube/generated'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '文集 - Elliot',
  description: "Elliot's blog.",
}

const Series: React.FC = () => {
  const series = getSeries()

  return (
    <div>
      <ul>
        {Object.entries(series).map((entry) => {
          const [seriesName, articles] = entry
          return (
            <Fragment key={seriesName}>
              <li className="text-2xl py-2">
                {seriesName}
                <span className="pl-2 text-gray-400">[{articles.length}]</span>
              </li>
              <ul className="border-l border-gray-200 pl-8 space-y-2">
                {articles.map((a) => {
                  return (
                    <li key={a._meta.slug}>
                      <Link
                        href={`/posts/${a._meta.slug}`}
                        className="relative after:bg-gray-950 after:absolute after:h-[1px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
                      >
                        {a.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </Fragment>
          )
        })}
      </ul>
    </div>
  )
}

function getSeries() {
  return groupBy(allPosts, (item) => item.series)
}

export default Series
