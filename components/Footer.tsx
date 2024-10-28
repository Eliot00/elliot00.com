import { GithubIcon, MastodonIcon, RssIcon } from '@/components/icons'

const ICON_CLASS =
  'inline-block transition ease-in-out hover:rotate-6 hover:scale-110'

export default function Footer() {
  return (
    <footer className="text-zinc-700 px-4 text-sm md:pl-16 md:col-start-3 md:col-span-1 md:row-start-2">
      <div className="space-x-2 mb-2">
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
      <div className="">Copyright © 2020-2024 Elliot</div>
    </footer>
  )
}
