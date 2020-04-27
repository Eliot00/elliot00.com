const Record = () => (
  <div className="record">
    <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41010302002599">
      <img src="/record.png"/>
      <p>豫公网安备 41010302002599号</p>
    </a>
    <style jsx>{`
      .record {
        width: 300px;
        margin: 0 auto;
      }
      a {
        display: inline-block;
        text-decoration: none;
        height: 20px;
        line-height: 20px;
      }
      a > img {
        float: left;
      }
      a > p {
        float: left;
        height: 20px;
        line-height: 20px;
        margin: 0px 0px 0px 5px;
        color: #939393;
      }
    `}</style>
  </div>
)

const Footer = () => (
  <div className="footer-div">
    <div>CopyRight © 2020 公子政的宅日常</div>
    <div>Powered by Django & React <a href="http://www.beian.miit.gov.cn/">豫ICP备20009380号-1</a></div>
    <Record />
    <style jsx>{`
    .footer-div{
      text-align: center;
      width: 100%;
      padding: 1rem;
      color:#888;
    }
  `}</style>
  </div>
)

export default Footer