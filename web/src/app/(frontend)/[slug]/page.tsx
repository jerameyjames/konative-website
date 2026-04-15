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

  const payload = await getPayload({ config })
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: decodedSlug } },
    limit: 1,
  })

  const pageData = page.docs[0]

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

  return <RenderBlocks blocks={(pageData.layout as any) || []} />
}
