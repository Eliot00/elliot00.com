import type { FCWithChildren } from '@/lib/types'

export function Separator() {
  return <hr className="mx-auto max-w-3xl border-separator" />
}

const Divider: FCWithChildren = (props) => {
  return (
    <div className="relative flex py-5 items-center">
      <div className="grow border-t border-gray-400" />
      <span className="shrink mx-4 text-gray-400">{props.children}</span>
      <div className="grow border-t border-gray-400" />
    </div>
  )
}

export default Divider
