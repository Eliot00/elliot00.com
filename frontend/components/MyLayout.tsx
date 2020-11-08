import { Row, Col, Skeleton } from 'antd'
import Head from "next/head";

const MyLayout = props => (
  <Row className="common-main" justify="center">
    <Head><title>{props.title}</title></Head>
    <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
      <Skeleton loading={props.loading} active>{props.leftContent}</Skeleton>
    </Col>
    <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={5}>
      {props.rightContent}
    </Col>
    <style jsx global>{`
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
      `}
    </style>
  </Row>
)

export default MyLayout