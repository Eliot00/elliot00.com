import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-ignore
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const Code: React.FC<React.HTMLAttributes<HTMLPreElement>> = ({
  className,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || '')
  return match ? (
    <SyntaxHighlighter
      language={match[1]}
      style={oneLight}
      showLineNumbers
      {...props}
    />
  ) : (
    <code className={className} {...props} />
  )
}

export default Code
