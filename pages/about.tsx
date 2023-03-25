import SEO from '@/components/SEO'
import { Heading2, Heading3 } from '@/components/typography/Heading'
import styles from '@/styles/Typography.module.css'

const About: React.FC = () => {
  return (
    <article className={styles.typography}>
      <SEO title="关于 - Elliot" />
      <Heading2>关于博主</Heading2>
      <p>技术宅，爱好折腾各种新奇事物，编程使我快乐。</p>
      <p>享受创造的乐趣，认同GNU的价值观但不激进，渴望成为自由软件世界的Hacker。</p>
      <p>围棋爱好者兼铁佛寺。</p>
      <Heading3>常用语言</Heading3>
      <div className="flex space-x-2 mt-2">
        <img
          alt="Rust"
          src="https://img.shields.io/badge/rust-%23000000.svg?&style=for-the-badge&logo=rust&logoColor=white"
        />
        <img
          alt="Python"
          src="https://img.shields.io/badge/python%20-%2314354C.svg?&style=for-the-badge&logo=python&logoColor=white"
        />
        <img
          alt="TypeScript"
          src="https://img.shields.io/badge/typescript-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white"
        />
        <img
          alt="CSharp"
          src="https://img.shields.io/badge/c%23%20-%23239120.svg?&style=for-the-badge&logo=c-sharp&logoColor=white"
        />
      </div>
      <Heading2>关于博客</Heading2>
      <p>
        我的博客技术栈经过了很多次改动，经常遇到一些新技术都会在博客上试验一下，可以通过
        <a href="https://github.com/Eliot00/elliot00.com">Github代码仓库</a>
        查看变更历史。
      </p>
      <Heading3>当前技术栈（2022-04）</Heading3>
      <ul>
        <li>NextJS</li>
        <li>MDX(next-mdx-remote)</li>
      </ul>
      <Heading2>友情链接</Heading2>
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
