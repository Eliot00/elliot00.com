import { ClockCircleTwoTone, FireTwoTone } from "@ant-design/icons/lib"
import { Affix, Alert, Divider } from "antd"
import { gql, request } from 'graphql-request'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import marked from 'marked'
import { GetStaticPaths, GetStaticProps } from "next"
import Link from 'next/link'
import { useRouter } from "next/router"
import React from 'react'
import MyLayout from "../../components/MyLayout"
import Social from "../../components/Social"
import Tocify from "../../components/tocify"
import { GraphQLEndpoint } from "../../utils/auth"
import ErrorPage from "next/error"

const Article = props => {
  const { slug, title, body, views, created } = props.source
  const renderer = new marked.Renderer()
  // @ts-ignore
  renderer.heading = function (text, level, raw) {
    const anchor = props.tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    breaks: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  })
  const markedHtml = marked(body)

  return (
    <div>
      <div className="detail-title">
        {title}
      </div>

      <div className="detail-icon center">
        <span><ClockCircleTwoTone twoToneColor="#ff6666" /> {created.slice(0, 10)}发布</span>
        <span><FireTwoTone twoToneColor="#ff471a" /> {views}</span>
      </div>

      <div className="detail-content" dangerouslySetInnerHTML={{ __html: markedHtml }}></div>
      <Divider>全文完</Divider>
      <Alert
        message="版权声明"
        description={<Copyright slug={slug} title={title} />}
        type="warning"
        showIcon
      />
      <style jsx global>{`
      .detail-title {
        font-size: 1.8rem;
        text-align: center;
        padding: 1rem;
      }
      .detail-icon {
        padding:.5rem 0;
        color:#AAA;
      }
      .detail-icon span {
        display: inline-block;
        padding: 0 10px;
      }
      .center {
        text-align: center;
      }
      .detail-content {
        padding: 1.3rem;
        font-size: 1rem;
      }
      pre {
        display: block;
        background-color:#f3f3f3;
        padding: .5rem !important;
        overflow-y: auto;
        font-weight: 300;
        font-family: Menlo, monospace;
        border-radius: .3rem;
      }
      pre {
        background-color: #283646 !important;
      }
      pre >code {
        border:0px !important;
        background-color: #283646 !important;
        color:#FFF;
      }
      code {
        display: inline-block ;
        background-color:#f3f3f3;
        border:1px solid #fdb9cc;
        border-radius:3px;
        font-size: 14px;
        padding-left: 5px;
        padding-right: 5px;
        color:#4f4f4f;
        margin: 0px 3px;
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
    </div>
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
        body
      }
    }
  `

  const variables = {
    articleSlug: params.slug
  }

  const response = await request(GraphQLEndpoint, query, variables)
  const detail = response.article[0]
  return { props: { detail } }
}

export default Detail