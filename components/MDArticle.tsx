import React from 'react'
import SEO from "./SEO"
import Copyright from './Copyright'
import Link from "next/link"
import { ReactCusdis } from "react-cusdis"
import { MDXProvider } from "@mdx-js/react"
import components from "../components/typography"
import { Lightning } from './icons'

type MetaData = {
  slug: string;
  title: string;
  series: string;
  createdAt: string;
  updatedAt: string;
}

type Props = {
  meta: MetaData;
}

const MDArticle: React.FC<Props> = props => {
  const { title, slug, series, createdAt, updatedAt } = props.meta;

  return (
    <MDXProvider components={components}>
      <SEO title={`${title} - 公子政的宅日常`} />
      <article>
        <header>
          <h1 className="font-serif text-center text-3xl">{title}</h1>
          <div className="text-center text-gray-400 my-4">
            <span className="px-2">
              创建于：
              <time className="link">{new Intl.DateTimeFormat("zh-Hans-CN").format(new Date(createdAt))}</time>
            </span>
            <span className="px-2">
              更新于：
              <time className="link">{new Intl.DateTimeFormat("zh-Hans-CN").format(new Date(updatedAt))}</time>
            </span>
            <span className="px-2">文集：<Link href="/series"><a className="link">{series}</a></Link></span>
          </div>
        </header>
        {props.children}
        <div className="text-center font-medium">
          <a className="link" href="https://afdian.net/@Elliot?tab=home">
            文章有帮助？为我充个吧<Lightning />
          </a>
        </div>
        <Copyright slug={slug} title={title} />
      </article>
      <div>
        <ReactCusdis
          attrs={{
            host: 'https://cusdis-p65vpouz7-eliot00.vercel.app',
            appId: 'f73edaa5-cdc2-486e-9cda-6360f7d3b907',
            pageId: slug,
            pageTitle: title,
            pageUrl: `https://elliot.com/posts/${slug}`
          }}
        />
      </div>
    </MDXProvider>
  )
}

export default MDArticle
