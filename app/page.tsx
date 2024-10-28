import PostsList from '@/components/PostsList'
import Link from 'next/link'
import { allPosts } from '@docube/generated'
import { compareDesc } from 'date-fns'
import ProjectsWall from '@/components/ProjectLink'

export default function Home() {
  const posts = allPosts
    .sort((a, b) =>
      compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
    )
    .slice(0, 5)
  return (
    <>
      <PostsList title="文字" posts={posts} />
      <div className="text-center my-2">
        <Link
          href="/posts"
          className="text-center underline relative transition duration-700 after:content-['>>>'] after:absolute after:opacity-0 after:transition-opacity after:duration-700 hover:after:opacity-100 after:left-full after:ml-2"
        >
          查看更多
        </Link>
      </div>
      <section className="mt-4">
        <h2 className="font-sans font-medium text-2xl underline decoration-2">
          代码
        </h2>
        <ProjectsWall
          projects={[
            {
              title: 'liushu',
              description: '安全、自由的输入法',
              link: 'https://github.com/liushu-project/liushu',
            },
            {
              title: 'docube',
              description: 'A libre content SDK',
              link: 'https://codeberg.org/Elliot00/docube',
            },
            {
              title: 'mp-org',
              description: 'Org微信公众号排版工具',
              link: 'https://github.com/Eliot00/mp-org',
            },
          ]}
        />
        <div className="text-center my-2">
          <a
            href="https://github.com/Eliot00?tab=repositories"
            className="text-center underline relative transition duration-700 after:content-['>>>'] after:absolute after:opacity-0 after:transition-opacity after:duration-700 hover:after:opacity-100 after:left-full after:ml-2"
          >
            查看更多
          </a>
        </div>
      </section>
    </>
  )
}
