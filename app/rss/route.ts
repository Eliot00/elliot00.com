import { allPosts } from '@docube/generated'

const baseUrl = 'https://elliot00.com'

export async function GET() {
  const itemsXml = allPosts
    .sort((a, b) => {
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
        return -1
      }
      return 1
    })
    .map(
      (post) =>
        `<item>
          <title>${post.title}</title>
          <link>${baseUrl}/posts/${post._meta.slug}</link>
          <description>${post.summary}</description>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
          <content:encoded>
          <![CDATA[
            ${post.body}
          ]]>
          </content:encoded>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss
    version="2.0"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>编码与禅</title>
        <link>${baseUrl}</link>
        <description>Elliot's blog feed</description>
        <atom:link href="https://elliot00.com/rss.xml" rel="self" type="application/rss+xml" />
        <language>zh</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <follow_challenge>
            <feedId>67437090448621568</feedId>
            <userId>67386573774055424</userId>
        </follow_challenge>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
