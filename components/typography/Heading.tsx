import { FCWithChildren } from '@/lib/types'

export const Heading2: FCWithChildren = (props) => (
  <h2
    className="text-2xl leading-tight mt-6 mb-4 font-semibold font-serif border-b-2 pb-1 border-indigo-300 inline-block"
    {...props}
  />
)

export const Heading3: FCWithChildren = (props) => (
  <h3
    className="text-lg leading-snug mt-6 mb-4 font-semibold font-serif border-l-4 pl-2 border-indigo-200"
    {...props}
  />
)

export const Heading4: FCWithChildren = (props) => (
  <h4
    className="leading-none text-base font-semibold mb-4 mt-6 text-indigo-300"
    {...props}
  />
)

// variant 5 and 6 is less commonly used
export const Heading5: FCWithChildren = (props) => (
  <h5 className="leading-tight text-sm font-semibold mb-4 mt-6" {...props} />
)

export const Heading6: FCWithChildren = (props) => (
  <h6
    className="leading-tight text-sm font-semibold text-gray-600 mb-4 mt-6"
    {...props}
  />
)
