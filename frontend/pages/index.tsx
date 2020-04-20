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

Home.getInitialProps = async () => {
  const response = await axios.get(APIRoot + 'articles/')
  const data = await response.data
  return {data: data}
}

export default Home