import Head from "next/head"
import { FunctionComponent } from "react"

type Props = {
    title: string
    description?: string
}

const SEO: FunctionComponent<Props> = props => {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name="title" content={props.title} />
            <meta name="description" content={props.description} />
        </Head>
    )
}

export default SEO