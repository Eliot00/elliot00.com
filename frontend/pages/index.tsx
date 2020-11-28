import { gql, request } from 'graphql-request'
import { GetStaticProps } from 'next'
import React from "react"
import ArticleList from "../components/ArticleList"
import MyLayout from "../components/MyLayout"
import Social from '../components/Social'
import { GraphQLEndpoint } from "../utils/auth"

interface ITag {
  tag: {
    name: string
  }
}

interface IColumn {
  name: string
}

interface ISerie {
  name: string
}

interface IArticleItem {
  id: number,
  column: IColumn,
  tags: Array<ITag>,
  series: ISerie,
  title: string,
  views: number,
  summary: string,
  created: string,
  updated: string
}

interface IHomeProps {
  loading: boolean,
  articles: IArticleItem[]
}

const Home = (props: IHomeProps) => {
  const { loading, articles } = props


  return (
    <MyLayout
      loading={loading}
      title="公子政的宅日常"
      leftContent={
        <ArticleList
          articles={articles}
        />
      }
      rightContent={<Social />}
    />
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = gql`
  {
    article(order_by: {created: desc}) {
      id
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

export default Home