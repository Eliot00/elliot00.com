import { List } from 'antd'
import { useState } from "react";
import { FieldTimeOutlined, FireOutlined } from "@ant-design/icons/lib";
import Link from "next/link";

const ArticleList = () => {

  const [articles, setArticles] = useState([
    {
      "id": 2,
      "author": "elliot",
      "title": "现在时间",
      "body": "时间测试",
      "created": "2020-04-05T11:47:49.087547+08:00",
      "updated": "2020-04-05T11:47:49.087580+08:00"
    },
    {
      "id": 1,
      "author": "elliot",
      "title": "第一天",
      "body": "现在是4月5日11点10分",
      "created": "2020-04-05T11:10:56.880622+08:00",
      "updated": "2020-04-05T11:10:56.880674+08:00"
    }
  ])

  return (
    <div>
      <List
        header={<div>最新文章</div>}
        itemLayout="vertical"
        dataSource={articles}
        renderItem={item =>(
          <List.Item>
            <div className="list-title">
              <Link href="/detail/[id]" as={`/detail/${item.id}`}><a>{item.title}</a></Link>
            </div>
            <div className="list-icon">
              <span><FieldTimeOutlined />{item.created}</span>
              <span><FireOutlined />100</span>
            </div>
            <div className="list-content">{item.body}</div>
          </List.Item>
        )}
        />
        <style jsx>{`
        .list-title{
            font-size:1.3rem;
            color: #1e90ff;
            padding: 0 0.5rem;
        }
        .list-content{
            color:#777;
            padding:.5rem;
        }
        .list-icon{
            padding:.5rem 0;
            color:#AAA;
        }
        .list-icon span{
            display: inline-block;
            padding: 0 10px;
        }
        `}</style>
    </div>
  )
}

export default ArticleList