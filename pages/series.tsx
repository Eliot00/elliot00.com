import { gql, request } from 'graphql-request'
import { GetStaticProps } from 'next'
import React from "react"
import { GraphQLEndpoint } from "../utils/auth"
import SEO from "../components/SEO"

interface ArticleSlug {
    slug: string,
}
interface Serie {
    id: number,
    name: string,
    articles: ArticleSlug[],
}

interface Props {
    series: Serie[],
}

const Series: React.FC<Props> = ({ series }) => {

  return (
    <>
      <SEO title="文集 - 公子政的宅日常" description="公子政的宅日常" />
      {series.map(item => (
          <div key={item.id}>{item.name}</div>
      ))}
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = gql`
  {
    serie {
      name
      id
      articles {
      slug
    }
  }
`
  const response = await request(GraphQLEndpoint, query)
  return {
    props: {
      series: response.serie,
    },
  }
}

export default Series