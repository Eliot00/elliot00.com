import Link from "next/link"
import { ArticleItem } from "../types/ArticleItem"
import { timeInterval } from "../utils/time"
import Summary from "./Summary"

const ArticleList = (props) => {
  const articles: ArticleItem[] = props.articles

  return (
    <ul className="divide-y divide-gray-100 font-sans">
      {articles.map(article => (
        <li key={article.slug}>
          <Link href={`/posts/${article.slug}`}>
            <a className="link hover:underline font-meduim text-2xl">
              <h2 className="p-2">{article.title}</h2>
            </a>
          </Link>
          <div className="flex">
            <div className="px-2">{article.column.name}</div>
            {article.tags.map(tag => (
              <div className="px-2">{tag.tag.name}</div>
            ))}
            <time className="px-2" title={article.created}>
              {timeInterval(article.created)}
            </time>
            <time className="px-2" title={article.updated}>
              {timeInterval(article.updated)}
            </time>
          </div>
          <Summary raw={article.summary} />
        </li>
      ))}
    </ul>
  )
}

export default ArticleList
