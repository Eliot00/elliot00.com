import { GithubIcon, XIcon } from '@/components/icons'
import { COMMON_CONTAINER_CLASS_NAME } from '@/lib/constants'

const ICON_CLASS =
  'inline-block transition ease-in-out hover:rotate-6 hover:scale-110 hover:text-primary'

export default function Footer() {
  return (
    <footer
      className={`${COMMON_CONTAINER_CLASS_NAME} flex items-center justify-between py-6 sm:py-4 font-sans`}
    >
      <div className="">Copyright © 2020-2025 Elliot</div>
      <div className="flex items-center gap-2">
        <a className={ICON_CLASS} href="https://github.com/Eliot00">
          <GithubIcon />
        </a>
        <a className={ICON_CLASS} href="https://x.com/CoderElliot">
          <XIcon />
        </a>
      </div>
    </footer>
  )
}
