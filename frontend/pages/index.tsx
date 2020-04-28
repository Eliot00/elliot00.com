import MyLayout from "../components/MyLayout"
import {APIRoot} from "../utils/auth"
import axios from 'axios'
import React, {Dispatch, useState} from "react";
import {GetServerSideProps} from "next";
import {Button, Empty, List, Tag} from "antd";
import Link from "next/link";
import {BookTwoTone, ClockCircleTwoTone, EditTwoTone, FireTwoTone} from "@ant-design/icons/lib";
import {timeInterval} from "../utils/time";

interface ArticleItem {
  id: number,
  column: string,
  tags: Array<string>,
  series: number,
  title: string,
  views: number,
  summary: string,
  created: string,
  updated: string
}

interface Props {
  initialList: Array<ArticleItem>,
  setArticles: Dispatch<any>,
}

const ArticleList = (props: Props) => {
  const seriesName: Array<string> = [
    "",
    "Django+React全栈开发"
  ]
  const { setArticles } = props

  const articles = props.initialList

  const filterArticles = async (key, value) => {
    const response = await axios.get(APIRoot + `articles/?omit=author,body&${key}=${value}`)
    const data = await response.data
    setArticles(await data)
  }

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
            <div className="list-classify">
              <Button
                style={{margin: "0 .3rem"}}
                size={"small"}
                onClick={event => filterArticles("column", item.column)}
              >{item.column}</Button>
              {item.tags.map(tag => (
                <Tag color="volcano"
                     key={item.id+tag}
                     onClick={event => filterArticles("tags", tag)}>{tag}</Tag>
              ))}
            </div>
            <div className="list-icon">
              <span><ClockCircleTwoTone twoToneColor="#ff6666" /> {timeInterval(item.created)}</span>
              <span><EditTwoTone twoToneColor="#8c1aff"/> {timeInterval(item.updated)}</span>
              <span><FireTwoTone twoToneColor="#ff471a" /> {item.views}</span>
              {item.series !== 0
                ? <span><BookTwoTone twoToneColor="#00cccc" /> {seriesName[item.series]}</span>
                : ''}
            </div>
            <div className="list-content">{item.summary}</div>
          </List.Item>
        )}
      />
      <style jsx>{`
        .list-title {
          font-size: 1.3rem;
          color: #1e90ff;
          padding: 0 0.5rem;
        }
        .list-classify{
          padding: .3rem .2rem;
        }
        .list-content {
          color: #777;
          padding:.5rem;
        }
        .list-icon{
          padding:.5rem 0;
          color: #AAA;
        }
        .list-icon span{
          display: inline-block;
          padding: 0 10px;
        }
        `}</style>
    </div>
  )
}

const Home = props => {
  const [articles, setArticles] = useState(props.data)
  return (
    <MyLayout
      title="公子政的宅日常"
      leftContent={<ArticleList
        initialList={articles}
        setArticles={setArticles}
      />}
      rightContent={<div className="common-box">Hello World!</div>}/>
  )
}

export const getServerSideProps:GetServerSideProps=  async () => {
  const response = await axios.get(APIRoot + 'articles/?omit=author,body')
  const data = await response.data
  return {
    props: {
      data,
    },
  }
}

export default Home