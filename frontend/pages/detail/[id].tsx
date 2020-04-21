import React from 'react'
import MyLayout from "../../components/MyLayout";
import { FieldTimeOutlined, FireTwoTone } from "@ant-design/icons/lib"
import marked from 'marked'
import hljs from 'highlight.js'
import { Affix } from "antd";
import Tocify from "../../components/tocify";
import 'highlight.js/styles/monokai-sublime.css'
import axios from 'axios'
import {APIRoot} from "../../utils/auth";


const tocify = new Tocify()

interface ArticleData {
  id: Number,
  author: string,
  series: Number,
  title: string,
  body: string,
  views: Number,
  summary: string,
  created: string,
  updated: string
}

interface Props {
  detail: ArticleData
}

const Article = props => {
  const {series, title, body, views, created, updated} = props.source
  const renderer = new marked.Renderer()
  // @ts-ignore
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\\n`
  }
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  })

  return (
    <div>
      <div>
        <div className="detail-title">
          {title}
        </div>

        <div className="detail-icon center">
          <span><FieldTimeOutlined /> {created.slice(0, 10)}</span>
          <span><FireTwoTone twoToneColor="#ff471a" /> {views}</span>
        </div>

        <div className="detail-content" dangerouslySetInnerHTML={{__html: marked(body)}}></div>
      </div>
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

const ArticleNav = () => (
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

const Detail = (props: Props) => {
  return (
    <MyLayout
      title="详情"
      leftContent={<Article source={props.detail}/>}
      rightContent={<ArticleNav/>}
    />
  )
}

Detail.getInitialProps = async context => {
  const { id } = context.query
  const response = await axios.get(APIRoot + `articles/${id}`)
  const detail = await response.data
  return {detail: detail}
}

export default Detail