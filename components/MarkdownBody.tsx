import react, { ReactNode } from "react"
import style from "./MarkdownBody.module.css"
import "prismjs/themes/prism-solarizedlight.css";

type Props = {
    content: string,
    children?: never
} | {
    content?: never,
    children: ReactNode
}

const MarkdownBody: react.FC<Props> = ({ content, children }) => {

    if (content) {
        return (
            <div className={style.markdown} dangerouslySetInnerHTML={{ __html: content }}></div>
        )

    }
    return (
        <div className={style.markdown}>
            {children}
        </div>
    )
}

export default MarkdownBody