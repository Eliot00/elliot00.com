import { gql, request } from 'graphql-request'
import { GetStaticProps } from 'next'
import React from "react"
import ArticleList from "../components/ArticleList"
import { GraphQLEndpoint } from "../utils/auth"
import { ArticleItem } from "../types/ArticleItem"

interface Props {
  latestArticles: ArticleItem
}

const Home = (props: Props) => {
  const { latestArticles } = props

  return (
    <ArticleList articles={latestArticles} />
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = gql`
  {
    article(limit: 5, order_by: {updated: desc}) {
      slug
      column {
        name
      }
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