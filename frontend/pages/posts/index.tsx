import { gql, request } from 'graphql-request'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react"
import ArticleList from "../../components/ArticleList"
import MyLayout from "../../components/MyLayout"
import Social from '../../components/Social'
import { GraphQLEndpoint } from "../../utils/auth"
import _ from 'lodash'

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
  serie: ISerie,
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

const Posts = (props: IHomeProps) => {
  const { loading, articles: sourceArticles } = props
  const [articles, setArticles] = useState(sourceArticles)
  const route = useRouter()
  const { column, tag, serie } = route.query

  useEffect(() => {
    if (column) {
      setArticles(articles => sourceArticles.filter(article => article.column.name === route.query.column))
    }
    console.log(articles)
  }, [column])

  useEffect(() => {
    if (tag) {
      setArticles(articles => sourceArticles.filter(article => _.findIndex(article.tags, obj => obj.tag.name === route.query.tag) !== -1))
    }
  }, [tag])

  useEffect(() => {
    if (serie) {
      setArticles(articles => sourceArticles.filter(article => article.serie.name === serie))
    }
  }, [serie])

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

export default Posts