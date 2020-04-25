import MyLayout from "../components/MyLayout"
import ArticleList from "../components/ArticleList"
import {APIRoot} from "../utils/auth"
import axios from 'axios'
import {useState} from "react";

const Home = props => {
  const originalArticles = props.data.slice()
  const [articles, setArticles] = useState(props.data)
  const resetHome = () => setArticles(originalArticles)
  return (
    <MyLayout
      title="公子政的宅日常"
      resetHome={resetHome}
      leftContent={<ArticleList initialList={articles} setArticles={setArticles}/>}
      rightContent="右边"/>
  )
}

export async function getStaticProps() {
  const response = await axios.get(APIRoot + 'articles/?omit=author,body')
  const data = await response.data
  return {
    props: {
      data,
    },
  }
}

export default Home