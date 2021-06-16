import MarkdownBody from "../components/MarkdownBody"
import SEO from "../components/SEO"

const About = ({ loading }) => {
  return (
    <article>
      <SEO title="关于 - 公子政的宅日常" />
      <MarkdownBody>
        <h2>关于博主</h2>
        <p>技术宅，爱好折腾各种新奇事物，积极的开源贡献者。</p>
        <p>爱喝茶，早睡早起的养生90后。</p>
        <p>棋力不如小学生，但还是爱下的围棋爱好者。</p>
        <p>偶尔打游戏，因为血精灵而叛变的前联盟玩家，风暴英雄刺客专精。</p>
      </MarkdownBody>
      <div className="flex space-x-2">
        <img alt="Rust" src="https://img.shields.io/badge/rust-%23000000.svg?&style=for-the-badge&logo=rust&logoColor=white" />
        <img alt="CSharp" src="https://img.shields.io/badge/c%23%20-%23239120.svg?&style=for-the-badge&logo=c-sharp&logoColor=white" />
        <img alt="Python" src="https://img.shields.io/badge/python%20-%2314354C.svg?&style=for-the-badge&logo=python&logoColor=white" />
        <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white" />
      </div>
      <MarkdownBody>
        <h2>关于博客</h2>
        <p>
          我的博客技术栈经过了很多次改动，经常遇到一些新技术都会在博客上试验一下，可以通过<a href="https://github.com/Eliot00/elliot00.com">Github代码仓库</a>查看变更历史。
        </p>
        <h3>当前技术栈（2021-04）</h3>
        <ul>
          <li>前端：TypeScript、NextJS、TailwindCSS</li>
          <li>后端：Serverless，hasura</li>
          <li>后台：Blazor（未完工）</li>
        </ul>
        <h2>友情链接</h2>
        <ul>
          <li><a href="https://www.dusaiphoto.com/">杜塞的个人网站</a></li>
          <li><a href="http://jackypy.xyz/">Jacky的个人网站</a></li>
        </ul>
      </MarkdownBody>
    </article>
  )
}

export default About