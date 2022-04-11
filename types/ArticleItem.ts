interface Tag {
  tag: {
    name: string
  }
}

interface Column {
  name: string
}

interface Serie {
  name: string
}

export interface ArticleItem {
  slug: string
  column: Column
  tags: Array<Tag>
  serie: Serie
  title: string
  body: string
  summary: string
  created: string
  updated: string
}
