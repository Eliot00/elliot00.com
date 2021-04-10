import { Alert, Divider } from "antd"
import { gql, request } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import React from 'react'
import { GraphQLEndpoint } from "../../utils/auth"
import ErrorPage from "next/error"
import markdonw from "../../lib/markdown"
import "prismjs/themes/prism.css"
import SEO from "../../components/SEO"
import MarkdownBody from "../../components/MarkdownBody"
import Copyright from "../../components/Copyright"

const Article = props => {
  const { slug, title, body, created, updated } = props.source

  return (
    <>
      <SEO title={`${title} - 公子政的宅日常`} description={body.substring(0, 100)} />
      <article>
        <header>
          <h1 className="font-sans text-center text-3xl p-4">{title}</h1>
          <div className="text-center text-gray-400">
            <span className="px-2">创建于<time>{new Intl.DateTimeFormat("zh-Hans-CN").format(new Date(created))}</time></span>
            <span className="px-2">更新于<time>{new Intl.DateTimeFormat("zh-Hans-CN").format(new Date(updated))}</time></span>
          </div>
        </header>

        <MarkdownBody content={body} />
        <div className="divide-gray-900 divide-y"><div>EOF</div></div>
        <Copyright slug={slug} title={title} />
      </article>
    </>
  )
}

const Detail = ({ detail, loading }) => {
  const route = useRouter()
  if (!route.isFallback && !detail?.title) {
    return <ErrorPage statusCode={404} />
  }
  return (
    route.isFallback
      ?
      <div>Loading</div>
      :
      <Article source={detail} />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    query GetSlug {
      article {
        slug
      }
    }
  `
  const response = await request(GraphQLEndpoint, query)
  const slugs = response.article
  const paths = slugs.map((item) => ({ params: { slug: item.slug } }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = gql`
    query GetArticle($articleSlug: String!) {
      article(where: {slug: {_eq: $articleSlug}}) {
        title
        slug
        created
        updated
        body
      }
    }
  `

  const variables = {
    articleSlug: params.slug
  }

  const response = await request(GraphQLEndpoint, query, variables)
  const detail = response.article[0]
  detail.body = markdonw(detail.body)
  return { props: { detail } }
}

export default Detail