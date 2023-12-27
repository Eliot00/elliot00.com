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
            <span className="flex gap-2 items-center text-sm font-thin text-gray-500">
              {post.tags.map((tag) => (
                <div key={tag}>#{tag}</div>
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
