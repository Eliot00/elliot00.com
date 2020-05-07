import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {Row,Col, Menu} from 'antd'
import {HomeOutlined, GroupOutlined, InfoCircleOutlined} from '@ant-design/icons'

const Header = () => {
  const router = useRouter()
  let menuKey = "home"
  switch (router.pathname) {
    case '/course':
      menuKey = "course"
      break
    case '/about':
      menuKey = "about"
      break
    default:
      menuKey = "home"
  }
  return (
    <div className="header">
      <Row justify="center" align="middle">
        <Col xs={24} sm={24} md={10} lg={15} xl={13}>
          <span className="header-logo"><Link href="/"><a>公子政</a></Link></span>
          <span className="header-txt">致虚极&nbsp;守静笃</span>
        </Col>

        <Col className="menu-div" xs={0} sm={0} md={14} lg={9} xl={6}>
          <Menu mode="horizontal" selectedKeys={[menuKey]}>
            <Menu.Item key="home">
              <HomeOutlined/>
              <Link href="/"><a>首页</a></Link>
            </Menu.Item>
            <Menu.Item key="course">
              <GroupOutlined/>
              <Link href="/course"><a>教程</a></Link>
            </Menu.Item>
            <Menu.Item key="about">
              <InfoCircleOutlined/>
              <Link href="/about"><a>关于</a></Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      <style jsx global>{`
        .header{
            background-color: #fff;
            padding: .4rem;
            overflow: hidden;
            height: 3.3rem;
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
        .ant-menu{
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
}

export default Header