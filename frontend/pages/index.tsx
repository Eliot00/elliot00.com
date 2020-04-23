import MyLayout from "../components/MyLayout"
import ArticleList from "../components/ArticleList"
import {APIRoot} from "../utils/auth"
import axios from 'axios'

const Home = props => (
  <MyLayout
    title="公子政的宅日常"
    leftContent={<ArticleList initialList={props.data}/>}
    rightContent="右边"/>
)

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