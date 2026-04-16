import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import config from '@payload-config'
import { RenderBlocks } from '../../../blocks/RenderBlocks'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  let pageData: any | undefined
  let newsItems: any[] = []

  try {
    const payload = await getPayload({ config })
    const page = await payload.find({
      collection: 'pages',
      where: { slug: { equals: decodedSlug } },
      limit: 1,
    })

    pageData = page.docs[0]

    const latestNews = await payload.find({
      collection: 'news-items',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 20,
    })

    newsItems = latestNews.docs || []
  } catch (error) {
    if (decodedSlug === 'home') {
      return (
        <main
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            padding: '4rem 1.5rem',
            textAlign: 'center',
            background: '#0b1020',
            color: '#f6f7fb',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <p style={{ marginBottom: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Konative
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', margin: 0 }}>Leadership. Learning. Legacy.</h1>
            <p style={{ marginTop: '1.25rem', lineHeight: 1.6, opacity: 0.9 }}>
              Our production CMS database is reconnecting. The public homepage is online for your demo and full
              content will repopulate as soon as the database connection is restored.
            </p>
          </div>
        </main>
      )
    }

    throw error
  }

  if (!pageData) {
    if (decodedSlug === 'home') {
      return (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          Create a "home" page in the admin panel to get started.
        </div>
      )
    }
    return notFound()
  }

  return <RenderBlocks blocks={(pageData.layout as any) || []} newsItems={newsItems} />
}
