import { GithubIcon, MastodonIcon, RssIcon } from '@/components/icons'

const ICON_CLASS =
  'inline-block transition ease-in-out hover:rotate-6 hover:scale-110'

export default function Footer() {
  return (
    <footer className="mx-auto max-w-3xl flex items-center justify-between py-6 sm:py-4 font-sans">
      <div className="">Copyright © 2020-2025 Elliot</div>
      <div className="flex items-center gap-2">
        <a className={ICON_CLASS} href="https://github.com/Eliot00">
          <GithubIcon />
        </a>
        <a className={ICON_CLASS} href="https://mastodon.social/@CoderElliot">
          <MastodonIcon />
        </a>
        <a className={ICON_CLASS} href="/rss">
          <RssIcon />
        </a>
      </div>
    </footer>
  )
}
