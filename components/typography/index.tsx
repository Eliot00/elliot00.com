import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-ignore
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import SmartImage from './SmartImage'
import StyledTable from './StyledTable'

const components: any = {
  code: ({ className, ...props }: any) => {
    if (!className) {
      return (
        <code className="bg-slate-100 px-1.5 text-red-600 rounded" {...props} />
      )
    }

    const match = /language-(\w+)/.exec(className) ?? []
    return (
      // @ts-ignore
      <SyntaxHighlighter language={match[1]} style={oneLight} {...props} />
    )
  },
  a: ({ children, href }: any) => (
    <a
      href={href}
      className="text-indigo-500 hover:text-indigo-900 underline transition duration-150 ease-in-out"
    >
      {children}
    </a>
  ),
  img: SmartImage,
  table: StyledTable,
}

export default components
