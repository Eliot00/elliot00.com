import { gql, request } from 'graphql-request'
import { GetStaticProps } from 'next'
import React from "react"
import ArticleList from "../components/ArticleList"
import { GraphQLEndpoint } from "../utils/auth"
import { ArticleItem } from "../types/ArticleItem"
import SEO from "../components/SEO"

interface Props {
  latestArticles: ArticleItem
}

const Home = (props: Props) => {
  const { latestArticles } = props

  return (
    <>
      <SEO title="公子政的宅日常" description="公子政的宅日常" />
      <ArticleList articles={latestArticles} />
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
      views
      summary
      created
      updated
    }
  }
`
  const response = await request(GraphQLEndpoint, query)
  return {
    props: {
      latestArticles: response.article,
    },
    revalidate: 600,
  }
}

export default Home