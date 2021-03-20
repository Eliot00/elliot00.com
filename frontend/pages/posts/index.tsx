import { gql, request } from 'graphql-request'
import { GetStaticProps } from 'next'
import React from "react"
import ArticleList from "../../components/ArticleList"
import { IArticleItem } from "../../types/ArticleItem"
import { GraphQLEndpoint } from "../../utils/auth"

const Posts = (props: { loading: boolean, articles: IArticleItem[] }) => {
  const { loading, articles } = props
  return (
    <ArticleList
      articles={articles}
    />
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = gql`
  {
    article(order_by: {created: desc}) {
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
      articles: response.article,
    },
  }
}

export default Posts