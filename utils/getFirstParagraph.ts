import marked from "marked";

export default function getFirstParagraph(raw: string): string {
  const tokens = marked.lexer(raw)
  for (const token of tokens) {
    if (token.type === "paragraph") {
      return token.text
    }
  }
  return raw
}