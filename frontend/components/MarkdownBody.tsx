import react from "react"
import style from "./MarkdownBody.module.css"

interface Props {
    content: string
}

const MarkdownBody: react.FC<Props> = ({content}) => {
    return (
        <div className={style.markdown} dangerouslySetInnerHTML={{ __html: content }}></div>
    )
}

export default MarkdownBody