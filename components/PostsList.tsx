import Link from 'next/link'
import { timeInterval } from '@/lib/time'
import Summary from '@/components/Summary'
import { type Post } from 'contentlayer/generated'

interface Props {
  posts: Post[]
  title?: string
}

const PostsList: React.FC<Props> = ({ posts, title = '最新文章' }) => {
  return (
    <>
      <h2 className="text-gray-800 text-2xl">{title}</h2>
      <ul className="divide-y divide-gray-100 font-serif">
        {posts.map((post) => (
          <li key={post.slug} className="py-4">
            <Link
              href={`/posts/${post.slug}`}
              className="text-black font-meduim text-2xl hover:text-indigo-700 transition duration-150 ease-in-out"
            >
              <h2 className="py-2">{post.title}</h2>
            </Link>
            <span className="flex gap-2 items-center text-sm">
              {post.tags.map((tag) => (
                <Link
                  href={`/tags/${tag}`}
                  className="rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700"
                  key={tag}
                >
                  #{tag}
                </Link>
              ))}
              <time title={post.publishedAt}>
                {timeInterval(post.publishedAt)}
              </time>
            </span>
            <Summary summary={post.summary} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostsList
