import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-ignore
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const Code: React.FC<React.HTMLAttributes<HTMLPreElement>> = ({
  className,
  ...props
}) => {
  if (!className) {
    return (
      <code
        className="bg-slate-200 px-2 rounded"
        {...props}
      />
    )
  }

  const match = /language-(\w+)/.exec(className) ?? []
  return (
    <SyntaxHighlighter language={match[1]} style={oneLight} {...props} />
  )
}

export default Code
