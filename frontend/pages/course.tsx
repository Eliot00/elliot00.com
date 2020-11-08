import MyLayout from "../components/MyLayout"
import Social from "../components/Social"

const Course = ({loading}) => (
    <MyLayout
      loading={loading}
      title="关于-公子政的宅日常"
      leftContent={<div>todo</div>}
      rightContent={<Social />}
    />
)

export default Course