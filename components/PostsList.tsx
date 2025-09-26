import Link from 'next/link'
import Summary from '@/components/Summary'
import { type Post } from '@docube/generated'
import { lightFormat } from 'date-fns'
import { CalendarArrowUpIcon, TagIcon } from 'lucide-react'

interface Props {
  posts: Post[]
  title?: string
}

const PostsList: React.FC<Props> = ({ posts, title = '最新发布' }) => {
  return (
    <>
      <h2 className="font-sans font-medium text-2xl underline decoration-2">
        {title}
      </h2>
      <ul className="divide-y divide-gray-100 font-serif">
        {posts.map((post) => (
          <li key={post._meta.slug} className="py-4">
            <Link
              href={`/posts/${post._meta.slug}`}
              className="font-medium text-xl text-primary hover:underline hover:decoration-dashed transition duration-150 ease-in-out"
            >
              <h3 className="my-2 font-sans">{post.title}</h3>
            </Link>
            <span className="flex gap-2 items-center text-sm font-mono">
              {post.tags.map((tag) => (
                <Link
                  href={`/tags/${tag}`}
                  className="inline-flex items-center justify-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700 hover:bg-purple-200 hover:text-purple-800"
                  key={tag}
                >
                  <TagIcon size="1em" />
                  <span className="whitespace-nowrap">{tag}</span>
                </Link>
              ))}
              <span className="inline-flex items-center justify-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                <CalendarArrowUpIcon size="1em" />
                <time dateTime={post.publishedAt}>
                  {lightFormat(new Date(post.publishedAt), 'yyyy-MM-dd')}
                </time>
              </span>
            </span>
            <Summary summary={post.summary} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostsList
