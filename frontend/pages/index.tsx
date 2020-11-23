import { BookTwoTone, ClockCircleTwoTone, EditTwoTone, FireTwoTone } from "@ant-design/icons/lib"
import { Button, List, Tag as ITag } from "antd"
import { gql, request } from 'graphql-request'
import { GetStaticProps } from 'next'
import Link from "next/link"
import React from "react"
import MyLayout from "../components/MyLayout"
import Social from '../components/Social'
import { GraphQLEndpoint } from "../utils/auth"
import { timeInterval } from "../utils/time"

interface ITag {
  tag: {
    name: string
  }
}

interface IColumn {
  name: string
}

interface ISerie {
  name: string
}

interface IArticleItem {
  id: number,
  column: IColumn,
  tags: Array<ITag>,
  series: ISerie,
  title: string,
  views: number,
  summary: string,
  created: string,
  updated: string
}

interface IHomeProps {
  loading: boolean,
  articles: IArticleItem[]
}

// TODO: optimize type declear
const ArticleList = (props) => {
  const articles: IArticleItem[] = props.articles

  return (
    <div>
      <List
        header={<div>最新文章</div>}
        itemLayout="vertical"
        dataSource={articles}
        renderItem={item => (
          <List.Item>
            <div className="list-title">
              <Link href="/detail/[id]" as={`/detail/${item.id}`}><a>{item.title}</a></Link>
            </div>
            <div className="list-classify">
              <Button
                style={{ margin: "0 .3rem" }}
                size={"small"}
              >{item.column.name}</Button>
              {item.tags.map(tag => (
                <ITag color="volcano"
                  key={`${item.id} ${tag.tag.name}`}
                >
                  {tag.tag.name}
                </ITag>
              ))}
            </div>
            <div className="list-icon">
              <span><ClockCircleTwoTone twoToneColor="#ff6666" /> {timeInterval(item.created)}</span>
              <span><EditTwoTone twoToneColor="#8c1aff" /> {timeInterval(item.updated)}</span>
              <span><FireTwoTone twoToneColor="#ff471a" /> {item.views}</span>
              <span><BookTwoTone twoToneColor="#00cccc" /></span>
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

const Home = (props: IHomeProps) => {
  const { loading, articles } = props

  return (
    <MyLayout
      loading={loading}
      title="公子政的宅日常"
      leftContent={
        <ArticleList
          articles={articles}
        />
      }
      rightContent={<Social />}
    />
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = gql`
  {
    article(order_by: {created: desc}) {
      id
      column {
        name
      }
      serie {
        name
      }
      tags {
        tag {
          name
        }
      }
      title
      views
      summary
      created
      updated
    }
  }
`
  const response = await request(GraphQLEndpoint, query)
  return {
    props: {
      articles: response.article,
    },
  }
}

export default Home