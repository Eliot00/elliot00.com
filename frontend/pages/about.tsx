import { Space, Typography } from "antd"

const { Title, Paragraph, Text } = Typography

const About = ({ loading }) => (
  <Typography>
    <Title level={2}>关于博客</Title>
    <Paragraph>
      <Text strong>前端部分</Text>：<Text mark>NextJs</Text>、<Text mark>Ant Design</Text>
    </Paragraph>
    <Paragraph>
      <Text strong>管理后台</Text>：<Text mark>Blazor</Text>
    </Paragraph>
    <Paragraph>
      <Text strong>后端部分</Text>：<Text mark>Hasura</Text>
    </Paragraph>
    <Paragraph><Text strong>源码地址</Text>：<a href="https://github.com/Eliot00/elliot00.com">https://github.com/Eliot00/elliot00.com</a></Paragraph>
    <Title level={2}>关于博主</Title>
    <Paragraph>沉迷于技术海洋中的95后，喜欢尝试新鲜事物，热爱文学，时空枢纽远刺玩家，围棋棋渣，不善社交</Paragraph>
    <Space>
      <img src="https://img.shields.io/badge/rust-%23000000.svg?&style=for-the-badge&logo=rust&logoColor=white" />
      <img src="https://img.shields.io/badge/c%23%20-%23239120.svg?&style=for-the-badge&logo=c-sharp&logoColor=white" />
      <img src="https://img.shields.io/badge/python%20-%2314354C.svg?&style=for-the-badge&logo=python&logoColor=white" />
    </Space>
    <Title level={2}>友情链接</Title>
    <Paragraph>
      <ul>
        <li><a href="https://www.dusaiphoto.com/">杜塞的个人网站</a></li>
        <li><a href="http://jackypy.xyz/">Jacky的个人网站</a></li>
      </ul>
    </Paragraph>
  </Typography>
)

export default About