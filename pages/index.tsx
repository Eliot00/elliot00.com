import { gql, request } from 'graphql-request'
import { GetStaticProps } from 'next'
import React from "react"
import ArticleList from "../components/ArticleList"
import { GraphQLEndpoint } from "../utils/auth"
import { ArticleItem } from "../types/ArticleItem"
import SEO from "../components/SEO"
import Link from 'next/link'
import getFirstParagraph from '../utils/getFirstParagraph'

interface Props {
  latestArticles: ArticleItem[]
}

const Home = (props: Props) => {
  const { latestArticles } = props

  return (
    <>
      <SEO title="公子政的宅日常" description="公子政的宅日常" />
      <ArticleList articles={latestArticles} />
      <Link href="/posts"><a className="link px-2">查看更多</a></Link>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = gql`
  {
    article(limit: 5, order_by: {updated: desc}) {
      slug
      serie {
        name
      }
      tags {
        tag {
          name
        }
      }
      title
      body
      created
      updated
    }
  }
`
  const response = await request(GraphQLEndpoint, query)
  const latestArticles = response.article.map(
    ({ slug, serie, tags, title, body, created, updated }) => ({
      slug, serie, tags, title, summary: getFirstParagraph(body), created, updated
    })
  )
  return {
    props: {
      latestArticles,
    },
    revalidate: 600,
  }
}

export default Home