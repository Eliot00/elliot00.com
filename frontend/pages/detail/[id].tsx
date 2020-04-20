import React from 'react'
import MyLayout from "../../components/MyLayout";
import { FieldTimeOutlined, FireTwoTone } from "@ant-design/icons/lib"
import marked from 'marked'
import hljs from 'highlight.js'
import { Affix } from "antd";
import Tocify from "../../components/tocify";
import 'highlight.js/styles/monokai-sublime.css'

let markdown = '# P01:课程介绍和环境搭建\n\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
  '# P01:课程介绍和环境搭建\n\n' +
  '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n'+
  '\`console.log(111)\` \n\n'+
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '#5 p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  `
  \`\`\` 
  import React from 'react';
  var a=11; 
  class Ex extends Component {
  }
  \`\`\`
  `
const tocify = new Tocify()

const Article = () => {
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
          React实战视频教程-技术胖Blog开发(更新08集)
        </div>

        <div className="detail-icon center">
          <span><FieldTimeOutlined /> 2019-06-28</span>
          <span><FireTwoTone twoToneColor="#ff471a" /> 5498人</span>
        </div>

        <div className="detail-content" dangerouslySetInnerHTML={{__html: marked(markdown)}}></div>
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

const Detail = () => (
  <MyLayout
    title="详情"
    leftContent={<Article />}
    rightContent={<ArticleNav />}
    />
)

export default Detail