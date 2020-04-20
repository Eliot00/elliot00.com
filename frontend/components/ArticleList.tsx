import { List, Empty } from 'antd'
import React, { useState } from "react";
import { FieldTimeOutlined, FireOutlined } from "@ant-design/icons/lib";
import Link from "next/link";

interface ArticleItem {
  id: Number,
  author: string,
  series: Number,
  title: string,
  body: string,
  created: string,
  updated: string
}

interface Props {
  initialList: Array<ArticleItem>
}

const ArticleList = (props: Props) => {

  const [articles, setArticles] = useState(props.initialList)

  if (articles.length === 0) {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    )
  }

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