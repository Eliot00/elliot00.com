import { FunctionComponent } from 'react'

type Props = {
  summary: string
}

const Summary: FunctionComponent<Props> = ({ summary }) => {
  return <p className="py-2 font-serif font-thin text-gray-500">{summary}</p>
}

export default Summary
