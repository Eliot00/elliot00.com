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
      <h2 className="text-gray-800 px-2 text-2xl">{title}</h2>
      <ul className="divide-y divide-gray-100 font-serif">
        {posts.map((post) => (
          <li key={post.slug} className="py-4">
            <Link
              href={`/posts/${post.slug}`}
              className="link font-meduim text-2xl"
            >
              <h2 className="p-2">{post.title}</h2>
            </Link>
            <div className="flex">
              {post.tags.map((tag) => (
                <div className="px-2 text-gray-500" key={tag}>
                  {tag}
                </div>
              ))}
              <time className="px-2 text-gray-500" title={post.createdAt}>
                {timeInterval(post.createdAt)}
              </time>
              <time className="px-2 text-gray-500" title={post.publishedAt}>
                {timeInterval(post.publishedAt)}
              </time>
            </div>
            <Summary summary={post.summary} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostsList
