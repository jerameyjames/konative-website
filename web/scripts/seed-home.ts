import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload } from 'payload'
import config from '../payload.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function ensureMediaRecord(payload: Awaited<ReturnType<typeof getPayload>>) {
  const existing = await payload.find({
    collection: 'media',
    limit: 1,
  })

  if (existing.docs[0]) return existing.docs[0]

  const filePath = path.resolve(__dirname, '../public/logo.svg')

  return payload.create({
    collection: 'media',
    data: {
      alt: 'Konative placeholder image',
    },
    filePath,
  })
}

async function upsertHomePage(payload: Awaited<ReturnType<typeof getPayload>>, mediaId: number | string) {
  const homeLayout = [
    {
      blockType: 'hero-rotating',
      headline: 'Expect More',
      rotatingWords: [{ word: 'Results' }, { word: 'Reach' }, { word: 'Revenue' }, { word: 'Representation' }],
      subtitle:
        'Konative helps outdoor living, surface, and fabrication manufacturers win stronger territory coverage, grow dealer relationships, and convert market presence into measurable performance across the Pacific Northwest.',
      ctaLabel: 'Start Partnership Inquiry',
      ctaLink: '/contact',
    },
    {
      blockType: 'stat-bar',
      stats: [
        { value: '12+', label: 'Brands represented' },
        { value: '3-state', label: 'Pacific Northwest footprint' },
        { value: '18+', label: 'Years of representation experience' },
        { value: '250+', label: 'Dealer and showroom contacts' },
      ],
    },
    {
      blockType: 'three-card-grid',
      sectionTitle: 'How Konative Drives Territory Performance',
      cards: [
        {
          title: 'Territory Representation',
          description:
            'Structured field coverage and account planning to turn scattered opportunities into focused territory momentum.',
          linkLabel: 'Explore Territory Representation',
          linkUrl: '/services',
        },
        {
          title: 'Channel Development',
          description:
            'Dealer onboarding, showroom strategy, and accountable partner communication that improves sell-through.',
          linkLabel: 'Explore Channel Development',
          linkUrl: '/services',
        },
        {
          title: 'Market Activation',
          description:
            'Launches, education, and regional enablement that align manufacturer goals with local channel execution.',
          linkLabel: 'Explore Market Activation',
          linkUrl: '/services',
        },
      ],
    },
    {
      blockType: 'split-image-text',
      heading: 'Why Konative',
      body:
        'Konative combines senior rep discipline with practical Pacific Northwest market intelligence. We align dealer networks, protect brand position, and build repeatable sales motion across each territory with clear communication and accountable execution.',
      ctaLabel: 'Learn About Konative',
      ctaLink: '/about',
      image: mediaId,
      imagePosition: 'right',
    },
    {
      blockType: 'cta-band',
      heading: 'Ready to expand your Pacific Northwest representation with a partner built for measurable channel growth?',
      ctaLabel: 'Start Partnership Inquiry',
      ctaLink: '/contact',
      style: 'primary',
    },
  ]

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  if (existing.docs[0]) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: {
        title: 'Home',
        slug: 'home',
        layout: homeLayout,
        meta: {
          title: 'Konative | Premium Sales Representation',
          description:
            'Woman-owned sales representation and marketing for outdoor living, surfaces, and fabrication across the Pacific Northwest.',
        },
      },
    })
    return 'updated'
  }

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      layout: homeLayout,
      meta: {
        title: 'Konative | Premium Sales Representation',
        description:
          'Woman-owned sales representation and marketing for outdoor living, surfaces, and fabrication across the Pacific Northwest.',
      },
    },
  })
  return 'created'
}

async function main() {
  const payload = await getPayload({ config })
  const media = await ensureMediaRecord(payload)
  const result = await upsertHomePage(payload, media.id)
  console.log(`Home page ${result}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
