import groupBy from '@/lib/groupBy'
import range from '@/lib/range'
import Link from 'next/link'
import { yearToTaiSui } from '@/lib/time'
import type { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: '归档 - Elliot',
}

const START = 2020

export default function Archives() {
  const articlesTimeline = getTimeline()
  const now = new Date().getFullYear()

  return (
    <div className="flex flex-col gap-4 flex-1 w-full">
      {range(START, now + 1)
        .reverse()
        .map((year) => {
          const articlesOfThisYear = articlesTimeline[year]
          if (!articlesOfThisYear) {
            return null
          }

          return (
            <div key={year} className="w-full">
              <h2 className="ps-2 mb-2 font-serif font-semibold text-2xl">
                {yearToTaiSui(year)}
              </h2>

              {articlesOfThisYear
                .toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt))
                .map((article) => (
                  <Link
                    href={article.url}
                    key={article.slug}
                    className="flex gap-x-3 relative group rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
                  >
                    <div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700 dark:group-hover:after:bg-neutral-600">
                      <div className="relative z-10 size-7 flex justify-center items-center">
                        <div className="size-2 rounded-full bg-white border-2 border-gray-300 group-hover:border-gray-600 dark:bg-neutral-800 dark:border-neutral-600 dark:group-hover:border-neutral-600"></div>
                      </div>
                    </div>

                    <div className="font-semibold text-gray-800 dark:text-white">
                      {article.title}
                    </div>
                  </Link>
                ))}
            </div>
          )
        })}
    </div>
  )
}

function getTimeline() {
  return groupBy(allPosts, (item) => {
    const publishedAt = new Date(item.publishedAt)
    return publishedAt.getFullYear()
  })
}
