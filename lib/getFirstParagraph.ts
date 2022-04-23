/* eslint-disable */
import marked from 'marked'

const YAMLFrontMatter = /---(.|\n)*---/
export default function getFirstParagraph(raw: string): string {
  const tokens = (marked as any).lexer(raw.replace(YAMLFrontMatter, ''))
  for (const token of tokens) {
    if (token.type === 'paragraph') {
      return token.text
    }
  }
  return raw
}
