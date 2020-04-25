import MyLayout from "../components/MyLayout"
import ArticleList from "../components/ArticleList"
import {APIRoot} from "../utils/auth"
import axios from 'axios'
import {useState} from "react";
import {GetServerSideProps} from "next";

const Home = props => {
  const [articles, setArticles] = useState(props.data)
  return (
    <MyLayout
      title="公子政的宅日常"
      leftContent={<ArticleList
        initialList={articles}
        setArticles={setArticles}
      />}
      rightContent="右边"/>
  )
}

export const getServerSideProps:GetServerSideProps=  async () => {
  const response = await axios.get(APIRoot + 'articles/?omit=author,body')
  const data = await response.data
  return {
    props: {
      data,
    },
  }
}

export default Home