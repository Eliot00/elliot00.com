import Link from 'next/link'
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
            <span className="flex gap-2 items-center text-sm font-mono">
              {post.tags.map((tag) => (
                <Link
                  href={`/tags/${tag}`}
                  className="inline-flex items-center justify-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700"
                  key={tag}
                >
                  <svg
                    height="16px"
                    width="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                  >
                    <path
                      d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="whitespace-nowrap text-sm">{tag}</span>
                </Link>
              ))}
              <span className="inline-flex items-center justify-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                >
                  <path
                    d="M12 7V12L9.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <time title={post.publishedAt}>
                  {new Intl.DateTimeFormat('zh-Hans-CN').format(
                    new Date(post.publishedAt)
                  )}
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
