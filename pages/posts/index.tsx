import { gql, request } from 'graphql-request'
import { GetStaticProps } from 'next'
import React from 'react'
import ArticleList from '@/components/ArticleList'
import { ArticleItem } from '../../types/ArticleItem'
import { GraphQLEndpoint } from '@/lib/auth'
import SEO from '@/components/SEO'
import getFirstParagraph from '@/lib/getFirstParagraph'
import type { NextPage } from 'next'

const Posts: NextPage<{ articles: ArticleItem[] }> = ({ articles }) => {
  return (
    <>
      <SEO title="博客 - 公子政的宅日常" description="博客文章列表" />
      <ArticleList articles={articles} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = gql`
    {
      article(order_by: { created: desc }) {
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
  const articles = response.article.map(
    ({ slug, serie, tags, title, body, created, updated }: ArticleItem) => ({
      slug,
      serie,
      tags,
      title,
      summary: getFirstParagraph(body),
      created,
      updated,
    })
  )
  return {
    props: {
      articles,
    },
  }
}

export default Posts
