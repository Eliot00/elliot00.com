import { gql, request } from 'graphql-request'
import { GetStaticProps } from 'next'
import React from "react"
import ArticleList from "../../components/ArticleList"
import { ArticleItem } from "../../types/ArticleItem"
import { GraphQLEndpoint } from "../../utils/auth"
import SEO from "../../components/SEO"

const Posts = (props: { loading: boolean, articles: ArticleItem[] }) => {
  const { loading, articles } = props
  return (
    <>
      <SEO title="博客 - 公子政的宅日常" description="博客文章列表"/>
      <ArticleList
        articles={articles}
      />
    </>
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