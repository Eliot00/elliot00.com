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

export interface IArticleItem {
  slug: string,
  column: IColumn,
  tags: Array<ITag>,
  serie: ISerie,
  title: string,
  views: number,
  summary: string,
  created: string,
  updated: string
}

export interface IHomeProps {
  loading: boolean,
  articles: IArticleItem[]
}
