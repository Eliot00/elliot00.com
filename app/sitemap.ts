import { MetadataRoute } from 'next'
import { allPosts } from 'contentlayer/generated'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://elliot00.com',
      priority: 1,
    },
    {
      url: 'https://elliot00.com/about',
      priority: 0.7,
    },
    {
      url: 'https://elliot00.com/posts',
      priority: 0.7,
    },
    ...allPosts.map((p) => ({
      url: `https://elliot00.com/posts/${p.slug}`,
      lastModified: new Date(p.publishedAt),
    })),
  ]
}
