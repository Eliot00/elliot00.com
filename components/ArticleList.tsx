import Link from 'next/link'
import { timeInterval } from '@/lib/time'
import Summary from '@/components/Summary'
import { ArticleSummary } from '@/lib/mdx'

interface Props {
  articles: ArticleSummary[]
  title?: string
}

const ArticleList: React.FC<Props> = ({ articles, title = '最新文章' }) => {
  return (
    <>
      <h2 className="text-gray-800 px-2 text-2xl">{title}</h2>
      <ul className="divide-y divide-gray-100 font-serif">
        {articles.map((article) => (
          <li key={article.slug} className="py-4">
            <Link href={`/posts/${article.slug}`}>
              <a className="link font-meduim text-2xl">
                <h2 className="p-2">{article.title}</h2>
              </a>
            </Link>
            <div className="flex">
              {article.tags.map((tag) => (
                <div className="px-2 text-gray-500" key={tag}>
                  {tag}
                </div>
              ))}
              <time className="px-2 text-gray-500" title={article.createdAt}>
                {timeInterval(article.createdAt)}
              </time>
              <time className="px-2 text-gray-500" title={article.updatedAt}>
                {timeInterval(article.updatedAt)}
              </time>
            </div>
            <Summary summary={article.summary} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ArticleList
