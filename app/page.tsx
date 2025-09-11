import PostsList from '@/components/PostsList'
import { allPosts } from '@docube/generated'
import { compareDesc } from 'date-fns'
import ProjectsWall from '@/components/ProjectLink'
import ReadMore from '@/components/ReadMore'

export default function Home() {
  const posts = allPosts
    .sort((a, b) =>
      compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
    )
    .slice(0, 5)
  return (
    <>
      <hr className="mx-auto max-w-3xl border-border" />
      <section className="my-4">
        <h1 className="my-4 inline-block text-4xl font-bold font-serif sm:my-8 sm:text-5xl">
          編碼與禪
        </h1>
      </section>
      <hr className="mx-auto max-w-3xl border-border" />
      <section className="my-4">
        <PostsList title="文字" posts={posts} />
        <div className="text-center my-2">
          <ReadMore href="/posts" />
        </div>
      </section>
      <section className="my-4">
        <h2 className="font-medium text-2xl underline decoration-2">代码</h2>
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
        <div className="my-2">
          <ReadMore href="https://github.com/Eliot00?tab=repositories" />
        </div>
      </section>
      <hr className="mx-auto max-w-3xl border-border" />
    </>
  )
}
