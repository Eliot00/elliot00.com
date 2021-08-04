import { FunctionComponent } from "react"

type Props = {
    raw: string
}


const Summary: FunctionComponent<Props> = ({ raw }) => {
    return <p className="p-2 font-serif font-thin text-gray-500" dangerouslySetInnerHTML={ { __html: raw } }></p>
}

export default Summary
