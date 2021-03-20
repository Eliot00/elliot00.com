import { Affix, Alert, Divider } from "antd"
import { gql, request } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from "next"
import Link from 'next/link'
import { useRouter } from "next/router"
import React from 'react'
import MyLayout from "../../components/MyLayout"
import Social from "../../components/Social"
import Tocify from "../../components/tocify"
import { GraphQLEndpoint } from "../../utils/auth"
import ErrorPage from "next/error"
import markdonw from "../../lib/markdown"
import "prismjs/themes/prism.css"

const Article = props => {
  const { slug, title, body, views, created, updated } = props.source

  return (
    <article>
      <header>
        <h1 className="font-sans text-center text-3xl p-4">{title}</h1>
        <div className="text-center text-gray-400">
          <span className="px-2">创建于<time>{new Intl.DateTimeFormat("zh-Hans-CN").format(new Date(created))}</time></span>
          <span className="px-2">更新于<time>{new Intl.DateTimeFormat("zh-Hans-CN").format(new Date(updated))}</time></span>
        </div>
      </header>

      <div className="detail-content" dangerouslySetInnerHTML={{ __html: body }}></div>
      <Divider>全文完</Divider>
      <Alert
        message="版权声明"
        description={<Copyright slug={slug} title={title} />}
        type="warning"
        showIcon
      />
      <style jsx global>{`
      .detail-content {
        padding: 1.3rem;
        font-size: 1rem;
      }
      .title-anchor {
        color:#888 !important;
        padding:4px !important;
        margin: 0rem !important;
        height: auto !important;
        line-height: 1.2rem !important;
        font-size: .7rem !important;
        border-bottom: 1px dashed #eee;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .active {
        color:rgb(30, 144, 255) !important;
      }
      .nav-title {
        text-align: center;
        color: #888;
        border-bottom: 1px solid rgb(30, 144, 255);
      }
      .detail-content img {
        width: 100%;
        border:1px solid #f3f3f3;
      }
    `}</style>
    </article>
  )
}

const ArticleNav = ({ tocify }) => (
  <Affix offsetTop={5}>
    <div className="detail-nav common-box">
      <div className="nav-title">文章目录</div>
      <div className="toc-list">
        {tocify && tocify.render()}
      </div>
      <style jsx>{`
        .common-box{
          background-color: #FFF;
          margin-left: .5rem;
          padding:.3rem;
          border-radius: .3rem;
          border:1px solid #eee;
        }
      `}</style>
    </div>
  </Affix>
)

const Copyright = ({ slug, title }) => {
  const selfUrl = `https://www.elliot00.com/posts/${slug}`
  return (
    <div>
      <span>原文标题：<a href={selfUrl}>{title}</a></span>
      <br />
      <span>原文作者：<Link href="/about"><a>公子政</a></Link></span>
      <br />
      <span>原文链接：<a href={selfUrl}>{selfUrl}</a></span>
      <br />
      <span>许可协议：<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">署名-非商业性使用-相同方式共享 4.0 国际</a></span>
    </div>
  )
}

const Detail = ({ detail, loading }) => {
  const route = useRouter()
  if (!route.isFallback && !detail?.title) {
    return <ErrorPage statusCode={404} />
  }
  const tocify = new Tocify()
  return (
    route.isFallback
      ?
      <MyLayout
        loading={true}
        title={'加载中 - 公子政的宅日常'}
        leftContent={<div>Loading</div>}
        rightContent={<Social />}
      />
      :
      <MyLayout
        loading={loading || route.isFallback}
        title={detail?.title + ' - 公子政的宅日常'}
        leftContent={<Article source={detail} tocify={tocify} />}
        rightContent={<ArticleNav tocify={tocify} />}
      />
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
        views
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