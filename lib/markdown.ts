import MarkdownIt from "markdown-it"
import prism from "markdown-it-prism"

import "prismjs/components/prism-clike"
import "prismjs/components/prism-rust"
import "prismjs/components/prism-python"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-toml"
import "prismjs/components/prism-json"
import "prismjs/components/prism-yaml"

function markdonw(raw: string): string {
    const md = MarkdownIt()
    md.use(prism, { defaultLanguageForUnknown: "python" })
    return md.render(raw)
}

export default markdonw