import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface NewsletterPost {
  id: string
  title: string
  subtitle: string
  content_html: string
  thumbnail_url: string | null
  web_url: string
  publish_date: string
}

export async function GET() {
  const posts: NewsletterPost[] = []

  // Beehiiv integration
  if (process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID) {
    try {
      const res = await fetch(
        `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/posts?status=confirmed&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
          },
        },
      )
      if (res.ok) {
        const data = await res.json()
        for (const p of data.data || []) {
          posts.push({
            id: p.id,
            title: p.title || '',
            subtitle: p.subtitle || '',
            content_html: p.content?.free?.web || '',
            thumbnail_url: p.thumbnail_url || null,
            web_url: p.web_url || '',
            publish_date: p.publish_date
              ? new Date(p.publish_date * 1000).toISOString()
              : '',
          })
        }
      }
    } catch (err) {
      console.error('Beehiiv posts fetch error:', err)
    }
  }

  return NextResponse.json({ posts })
}
