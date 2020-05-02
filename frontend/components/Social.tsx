import {Card} from 'antd'
import {useState} from "react";
import {QqOutlined} from '@ant-design/icons'

const tabList = [
  {
    key: 'wechat',
    tab: '公众号',
  },
  {
    key: 'qq',
    tab: 'QQ群',
  }
]

const QqList = () => (
  <>
    <div className="qq-title">加入QQ群 交流讨论</div>
    <div className="qq-list">
      <p>
        <a target="_blank" href="https://jq.qq.com/?_wv=1027&k=5gKsy9k">
          <QqOutlined /> <span>流沙一群：435414286</span>
        </a>
      </p>
      <p>
        <a target="_blank" href="https://jp.qq.com/?_wv=1027&k=5EoKdyo">
          <QqOutlined /> <span>流沙二群：386570528</span>
        </a>
      </p>
    </div>
    <style jsx>{`
      .qq-title {
        text-align: center;
        margin: 5px;
        color: #1890ff;
        font-size: 1.0rem;
      }
      .qq-list {
        padding: 5px;
        line-height: 14px;
        color: #999;
      }
      .qq-list span {
        color: #999;
      }
    `}</style>
  </>
)

const contentList = {
  wechat: <img src="/wechat.jpg" width="100%" />,
  qq: <QqList />,
}

const Social = () => {
  const [activeKey, setActiveKey] = useState('wechat')
  return (
    <div className="social-card common-box">
      <Card
        bordered={false}
        tabList={tabList}
        activeTabKey={activeKey}
        onTabChange={key => setActiveKey(key)}
        style={{width: '100%'}}
        bodyStyle={{padding: '2px 0px 0px 0px'}}
      >
        {contentList[activeKey]}
      </Card>
    </div>
  )
}

export default Social