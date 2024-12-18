import { MetadataRoute } from 'next'
import { allPosts } from '@docube/generated'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://elliot00.com',
      priority: 1,
      lastModified: new Date(),
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
      url: `https://elliot00.com/posts/${p._meta.slug}`,
      lastModified: new Date(p.publishedAt),
    })),
  ]
}
