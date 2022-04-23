const YAMLFrontMatter = /---(.|\n)*---/
const imageRegex = /(\!\[[^\]]+\]\([^\)]+\))/g

export default function getFirstParagraph(raw: string): string {
  const mdString = raw
    .trim()
    .replace(YAMLFrontMatter, '')
    .replace(imageRegex, '')

  const lines = mdString.split('\n')
  for (const line of lines) {
    if (!line.startsWith('#') && line.length > 20) {
      const pureString = line.replaceAll('*', '').replaceAll('`', '')
      if (pureString.length > 150) {
        return `${pureString.substring(0, 150)}...`
      }
      return pureString
    }
  }
  return mdString
}
