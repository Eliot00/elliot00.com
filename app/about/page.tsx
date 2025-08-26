import { Metadata } from 'next'
import Image from 'next/image'

import mpWeixin from './mp-weixin.webp'
import { COMMON_PROSE_CLASS_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: '关于 - Elliot',
}

const About: React.FC = () => {
  return (
    <article className={COMMON_PROSE_CLASS_NAME}>
      <h2>关于博主</h2>
      <p>技术宅，爱好折腾各种新奇事物，编程使我快乐。</p>
      <p>
        享受创造的乐趣，支持自由软件，<del>GNU恐怖分子</del>。
      </p>
      <p>围棋爱好者兼铁佛寺。</p>
      <h3>常用语言</h3>
      <p className="flex space-x-2">
        <span className="py-1 px-2 bg-amber-300 rounded-lg font-mono">
          Rust
        </span>
        <span className="py-1 px-2 bg-blue-300 rounded-lg font-mono">
          TypeScript
        </span>
        <span className="py-1 px-2 bg-zinc-300 rounded-lg font-mono">
          Python
        </span>
        <span className="py-1 px-2 bg-violet-300 rounded-lg font-mono">
          CSharp
        </span>
      </p>
      <h2>关于博客</h2>
      <p>
        我的博客技术栈经过了很多次改动，经常遇到一些新技术都会在博客上试验一下，可以通过
        <a href="https://github.com/Eliot00/elliot00.com">Github代码仓库</a>
        查看变更历史。
      </p>
      <h3>当前技术栈（2024-09）</h3>
      <ul>
        <li>NextJS</li>
        <li>
          <a href="https://codeberg.org/Elliot00/docube">docube</a>
        </li>
      </ul>
      <h2>公众号</h2>
      <Image src={mpWeixin} alt="MP Weixin" />
      <h2>友情链接</h2>
      <ul>
        <li>
          <a href="https://www.dusaiphoto.com/">杜塞的个人网站</a>
        </li>
        <li>
          <a href="https://jackyfzh.github.io/">Jacky的个人网站</a>
        </li>
      </ul>
    </article>
  )
}

export default About
