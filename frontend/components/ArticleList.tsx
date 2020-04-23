import { List, Empty, Tag } from 'antd'
import React, { useState } from "react";
import {ClockCircleTwoTone, EditTwoTone, FireTwoTone, BookTwoTone} from "@ant-design/icons/lib";
import Link from "next/link";
import { timeInterval } from "../utils/time";

interface ArticleItem {
  id: number,
  author: string,
  series: number,
  title: string,
  body: string,
  views: number,
  summary: string,
  created: string,
  updated: string
}

interface Props {
  initialList: Array<ArticleItem>
}

const ArticleList = (props: Props) => {
  const seriesName = [
    "",
    "Django+React全栈开发"
  ]

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
              <span><ClockCircleTwoTone twoToneColor="#ff6666" />{timeInterval(item.created)}</span>
              <span><EditTwoTone twoToneColor="#8c1aff"/>{timeInterval(item.updated)}</span>
              <span><FireTwoTone twoToneColor="#ff471a" />{item.views}</span>
              {item.series !== 0
                ? <span><BookTwoTone twoToneColor="#00cccc" />{seriesName[item.series]}</span>
                : ''}
            </div>
            <div className="list-content">{item.summary}</div>
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