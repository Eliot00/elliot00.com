import MyLayout from "../components/MyLayout"
import Social from "../components/Social"

const About = () => (
    <MyLayout
      title="关于-公子政的宅日常"
      leftContent={<div>hello</div>}
      rightContent={<Social />}
    />
)

export default About