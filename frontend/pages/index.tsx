import MyLayout from "../components/MyLayout";
import ArticleList from "../components/ArticleList";

const Home = () => (
  <MyLayout
    title="公子政的宅日常"
    leftContent={<ArticleList />}
    rightContent="右边"/>
)

export default Home