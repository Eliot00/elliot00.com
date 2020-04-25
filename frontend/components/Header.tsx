import React from 'react'
import Link from "next/link"
import {Row,Col, Menu} from 'antd'
import {HomeOutlined, GroupOutlined, InfoCircleOutlined} from '@ant-design/icons'

const Header = () => (
  <div className="header">
    <Row justify="center">
        <Col  xs={24} sm={24} md={10} lg={15} xl={12}>
            <span className="header-logo"><Link href="/"><a>公子政</a></Link></span>
            <span className="header-txt">致虚极&nbsp;守静笃</span>
        </Col>

        <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
            <Menu  mode="horizontal">
                <Menu.Item key="home">
                    <HomeOutlined />
                    <Link href="/"><a>首页</a></Link>
                </Menu.Item>
                <Menu.Item key="video">
                    <GroupOutlined />
                    教程
                </Menu.Item>
                <Menu.Item key="life">
                    <InfoCircleOutlined />
                    关于
                </Menu.Item>
            </Menu>
        </Col>
    </Row>
    <style jsx>{`
    .header{
        background-color: #fff;
        padding: .4rem;
        overflow: hidden;
        height: 3.2rem;
        border-bottom:1px solid #eee;
    }
    .header-logo{
        color:#1e90ff;
        font-size: 1.4rem;
        text-align: left;
    }
    .header-txt{
        font-size: 0.6rem;
        color: #999;
        display: inline-block;
        padding-left: 0.3rem;
    }
    .ant-meu{
        line-height: 2.8rem;
    }
    .ant-menu-item{
        font-size:1rem !important;
        padding-left:1rem;
        padding-right:1rem;
    
    }
    `}</style>
 </div>
)

export default Header