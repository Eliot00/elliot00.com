import { GithubIcon, MastodonIcon } from '@/components/icons'

const ICON_CLASS =
  'inline-block text-gray-600 transition ease-in-out hover:text-purple-600 hover:rotate-6 hover:scale-110'

const Footer = () => (
  <div className="text-center p-4 text-sm">
    <div className="space-x-2 mb-4">
      <a className={ICON_CLASS} href="https://github.com/Eliot00">
        <GithubIcon />
      </a>
      <a className={ICON_CLASS} href="https://mastodon.social/@CoderElliot">
        <MastodonIcon />
      </a>
    </div>
    <div className="text-gray-600">Copyright © 2020-2024 Elliot</div>
  </div>
)

export default Footer
