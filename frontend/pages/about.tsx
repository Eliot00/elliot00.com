import MyLayout from "../components/MyLayout"
import Social from "../components/Social"
import {Typography} from "antd"

const {Title, Paragraph, Text} = Typography

const About = () => (
  <MyLayout
    title="关于 - 公子政的宅日常"
    leftContent={
      <Typography>
        <Title level={2}>关于博客</Title>
        <Paragraph>
          <Text strong>前端部分</Text>：<Text mark>NextJs</Text>、<Text mark>Ant Design</Text>
        </Paragraph>
        <Paragraph>
          <Text strong>后端部分</Text>：<Text mark>Django</Text>、<Text mark>Django REST framework</Text>
        </Paragraph>
        <Paragraph><Text strong>源码地址</Text>：<a href="https://github.com/Eliot00/elliot00.com">https://github.com/Eliot00/elliot00.com</a></Paragraph>
        <Title level={2}>关于博主</Title>
        <Paragraph>沉迷于技术海洋中的95后，喜欢尝试新鲜事物，目前在鼓捣<Text mark>deno</Text>。</Paragraph>
        <Title level={2}>友情链接</Title>
        <Paragraph>
          <ul>
            <li><a href="https://www.dusaiphoto.com/">杜塞的个人网站</a></li>
            <li><a href="http://jackypy.xyz/">Jacky的个人网站</a></li>
          </ul>
        </Paragraph>
      </Typography>
    }
    rightContent={<Social />}
  />
)

export default About