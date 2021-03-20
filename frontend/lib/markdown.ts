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

interface MarkdownBody {
    firstPara
}

function markdonw(raw: string): string {
    const md = MarkdownIt()
    md.use(prism)
    return md.render(raw)
}

export default markdonw