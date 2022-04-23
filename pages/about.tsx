import SEO from '@/components/SEO'
import { Heading2, Heading3 } from '@/components/typography/Heading'
import Paragraph from '@/components/typography/Paragraph'

const About: React.FC = () => {
  return (
    <article>
      <SEO title="关于 - 公子政的宅日常" />
      <Heading2>关于博主</Heading2>
      <Paragraph>技术宅，爱好折腾各种新奇事物，积极的开源贡献者。</Paragraph>
      <Paragraph>
        享受创造的乐趣，黑客也是创造者，与画家建筑师作家一样。
      </Paragraph>
      <Paragraph>围棋爱好者、铁佛寺。</Paragraph>
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
      <Paragraph>
        我的博客技术栈经过了很多次改动，经常遇到一些新技术都会在博客上试验一下，可以通过
        <a href="https://github.com/Eliot00/elliot00.com">Github代码仓库</a>
        查看变更历史。
      </Paragraph>
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
