import { GithubIcon, TwitterIcon } from '@/components/icons'

const Footer = () => (
  <div className="text-center p-4 text-sm">
    <div className="space-x-2 mb-4">
      <a className="link" href="https://github.com/Eliot00">
        <GithubIcon />
      </a>
      <a className="link" href="https://twitter.com/CoderElliot">
        <TwitterIcon />
      </a>
    </div>
    <div className="text-gray-600">Copyright © 2020-2021 公子政的宅日常</div>
  </div>
)

export default Footer
