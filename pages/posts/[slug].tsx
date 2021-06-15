import { gql, request } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import React from 'react'
import { GraphQLEndpoint } from "../../utils/auth"
import ErrorPage from "next/error"
import markdonw from "../../lib/markdown"
import "prismjs/themes/prism.css"
import SEO from "../../components/SEO"
import MarkdownBody from "../../components/MarkdownBody"
import Copyright from "../../components/Copyright"

const Article = props => {
  const { slug, title, body, created, updated } = props.source

  return (
    <>
      <SEO title={`${title} - 公子政的宅日常`} description={body.substring(0, 100)} />
      <article>
        <header>
          <h1 className="font-sans text-center text-3xl p-4">{title}</h1>
          <div className="text-center text-gray-400">
            <span className="px-2">创建于<time>{new Intl.DateTimeFormat("zh-Hans-CN").format(new Date(created))}</time></span>
            <span className="px-2">更新于<time>{new Intl.DateTimeFormat("zh-Hans-CN").format(new Date(updated))}</time></span>
          </div>
        </header>

        <MarkdownBody content={body} />
        <div className="text-center font-medium">
          <a className="link" href="https://afdian.net/@Elliot?tab=home">
            文章有帮助？为我充个<svg className="h-6 w-6 inline-block" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2546"><path d="M331.847372 1007.871774L429.243621 539.355352H166.632786a17.780942 17.780942 0 0 1-16.584147-24.220834L332.075333 44.68043A52.089041 52.089041 0 0 1 380.687972 11.398154h287.857492a22.796079 22.796079 0 0 1 21.314335 31.116648L584.940843 312.192421l281.47459 1.310775a8.776491 8.776491 0 0 1 6.895814 14.190559l-534.568061 683.42646a3.932324 3.932324 0 0 1-6.895814-3.248441z" fill="#FFF100" p-id="2547"></path><path d="M166.632786 539.355352h35.447904L395.049502 11.398154h-14.36153a52.089041 52.089041 0 0 0-48.612639 33.282276L150.048639 515.134518a17.780942 17.780942 0 0 0 16.584147 24.220834z" fill="#FFFFFF" p-id="2548"></path><path d="M868.638051 310.938637h-43.255561L350.711127 925.406957l-16.641137 79.786278a3.932324 3.932324 0 0 0 6.952804 3.191451l534.511071-683.25549a8.776491 8.776491 0 0 0-6.895814-14.190559z" fill="#F8B62D" p-id="2549"></path><path d="M275.256105 202.999201a11.39804 11.39804 0 0 1-10.657167-15.558324l21.428314-55.394473a11.39804 11.39804 0 0 1 21.257344 8.206588L285.628321 195.704456a11.39804 11.39804 0 0 1-10.372216 7.294745zM335.722705 1024a15.558324 15.558324 0 0 1-6.496882-1.424755 15.330363 15.330363 0 0 1-8.54853-17.09706l94.546739-454.724793H166.632786a29.178982 29.178982 0 0 1-27.184324-39.893139l99.732847-257.880648a11.39804 11.39804 0 1 1 21.257344 8.206589L160.705806 519.237812a6.382902 6.382902 0 0 0 5.69902 8.719501h276.858384l-93.748877 450.84946 69.129111-88.334808a11.39804 11.39804 0 1 1 17.951913 14.019589L347.747637 1018.13001a15.216383 15.216383 0 0 1-12.024932 5.86999z" fill="#231815" p-id="2550"></path><path d="M482.016545 839.351757a11.39804 11.39804 0 0 1-9.004452-18.407834L861.229325 324.844245l-292.92962-1.367765 110.902926-284.950992a11.39804 11.39804 0 0 0-1.196794-10.600177 11.39804 11.39804 0 0 0-9.460373-5.129118H380.687972A40.975953 40.975953 0 0 0 342.618519 48.840714l-15.387353 39.893139a11.39804 11.39804 0 1 1-21.257344-8.206589l15.387353-39.893139A63.943003 63.943003 0 0 1 380.687972 0.000114h287.857492a34.194119 34.194119 0 0 1 31.914511 46.674973l-98.877994 254.176285 264.890443 1.253784a20.23152 20.23152 0 0 1 15.843275 32.598394L490.793035 834.963512a11.39804 11.39804 0 0 1-8.77649 4.388245z" fill="#231815" p-id="2551"></path></svg>吧
          </a>
        </div>
        <Copyright slug={slug} title={title} />
      </article>
    </>
  )
}

const Detail = ({ detail, loading }) => {
  const route = useRouter()
  if (!route.isFallback && !detail?.title) {
    return <ErrorPage statusCode={404} />
  }
  return (
    route.isFallback
      ?
      <div>Loading</div>
      :
      <Article source={detail} />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    query GetSlug {
      article {
        slug
      }
    }
  `
  const response = await request(GraphQLEndpoint, query)
  const slugs = response.article
  const paths = slugs.map((item) => ({ params: { slug: item.slug } }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = gql`
    query GetArticle($articleSlug: String!) {
      article(where: {slug: {_eq: $articleSlug}}) {
        title
        slug
        created
        updated
        body
      }
    }
  `

  const variables = {
    articleSlug: params.slug
  }

  const response = await request(GraphQLEndpoint, query, variables)
  const detail = response.article[0]
  detail.body = markdonw(detail.body)
  return { props: { detail } }
}

export default Detail