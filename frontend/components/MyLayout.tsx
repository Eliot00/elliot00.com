import Header from '../components/Header'
import Head from "next/head"
import { Fragment } from 'react'
import { Row, Col } from 'antd'
import Footer from "../components/Footer";

const MyLayout = props => (
  <Fragment>
    <Head>
      <title>{props.title}</title>
    </Head>
    <Header />
    <Row className="common-main" justify="center">
      <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
        {props.leftContent}
      </Col>
      <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={5}>
        {props.rightContent}
      </Col>
    </Row>
    <Footer />
    <style jsx global>{`
    body {
    background-color: #f6f6f6
    };
    .common-left{
      background-color: #FFF;
      padding:.3rem;
      border-radius: .3rem;
      border-bottom:1px solid #eee;
    };
    .common-box{
      background-color: #FFF;
      margin-left: .5rem;
      padding: .3rem;
      border-radius: .3rem;
      border:1px solid #eee;
    }
    .social-card {
      text-align: center;
    }
    .common-main{
      margin-top: .5rem;
    };
    `}</style>
  </Fragment>
)

export default MyLayout