import { gql, request } from 'graphql-request'
import { GetStaticProps } from 'next'
import React, { Fragment } from 'react'
import { GraphQLEndpoint } from '@/lib/auth'
import SEO from '@/components/SEO'

interface ArticleSlug {
  slug: string
  title: string
}
interface Serie {
  id: number
  name: string
  articles: ArticleSlug[]
}

interface Props {
  series: Serie[]
}

const Series: React.FC<Props> = ({ series }) => {
  return (
    <>
      <SEO title="文集 - 公子政的宅日常" description="公子政的宅日常" />
      <div>
        <ul className="text-center">
          {series.map((item) => (
            <Fragment key={item.id}>
              <li className="text-2xl py-2">{item.name}</li>
              <ul>
                {item.articles.map((a) => {
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
          ))}
        </ul>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = gql`
    {
      serie {
        name
        id
        articles(order_by: { created: asc }) {
          slug
          title
        }
      }
    }
  `
  const response = await request(GraphQLEndpoint, query)
  return {
    props: {
      series: response.serie,
    },
  }
}

export default Series
