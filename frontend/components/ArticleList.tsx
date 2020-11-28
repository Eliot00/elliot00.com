import { BookTwoTone, ClockCircleTwoTone, EditTwoTone, FireTwoTone } from "@ant-design/icons/lib"
import { Button, List, Tag, Tooltip } from "antd"
import Link from "next/link"
import { useRouter } from "next/router"
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
  serie: ISerie,
  title: string,
  views: number,
  summary: string,
  created: string,
  updated: string
}

const ArticleList = (props) => {
  const route = useRouter()
  const articles: IArticleItem[] = props.articles

  return (
    <div>
      <List
        header={<div>最新文章</div>}
        itemLayout="vertical"
        dataSource={articles}
        pagination={{ pageSize: 20 }}
        renderItem={item => (
          <List.Item>
            <div className="list-title">
              <Link href={`/posts/detail/${item.id}`}><a>{item.title}</a></Link>
            </div>
            <div className="list-classify">
              <Button
                style={{ margin: "0 .3rem" }}
                size={"small"}
                onClick={() => route.push(`/posts?column=${item.column.name}`, undefined, { shallow: true })}
              >{item.column.name}</Button>
              {item.tags.map(tag => (
                <Tag
                  color="volcano"
                  key={`${item.id} ${tag.tag.name}`}
                  onClick={() => route.push(`/posts?tag=${tag.tag.name}`, undefined, { shallow: true })}
                >
                  {tag.tag.name}
                </Tag>
              ))}
            </div>
            <div className="list-icon">
              <span><ClockCircleTwoTone twoToneColor="#ff6666" /> {timeInterval(item.created)}</span>
              <span><EditTwoTone twoToneColor="#8c1aff" /> {timeInterval(item.updated)}</span>
              <span><FireTwoTone twoToneColor="#ff471a" /> {item.views}</span>
              <span>
                <Tooltip title={item.serie.name}>
                  <BookTwoTone
                    twoToneColor="#00cccc"
                    onClick={() => { route.push(`/posts?serie=${item.serie.name}`, undefined, { shallow: true }) }}
                  />
                </Tooltip>
              </span>
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

export default ArticleList
