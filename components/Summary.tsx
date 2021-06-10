import { FunctionComponent } from "react"
import MarkdownIt from "markdown-it"

type Props = {
    raw: string
}

const summaryMd = MarkdownIt()

const Summary: FunctionComponent<Props> = ({ raw }) => {
    const rendered = summaryMd.renderInline(raw)
    return <p className="p-2 font-serif font-thin text-gray-500" dangerouslySetInnerHTML={ { __html: rendered } }></p>
}

export default Summary
