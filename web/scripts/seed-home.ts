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
      headline: 'Navigate',
      rotatingWords: [
        { word: 'Power' },
        { word: 'Connectivity' },
        { word: 'Capital' },
        { word: 'Development' },
      ],
      subtitle:
        'Konative brokers modular data center development — navigating site selection, power interconnection, fiber connectivity, and capital introduction across North America.',
      ctaLabel: 'Request a Readiness Review',
      ctaLink: '/contact',
    },
    {
      blockType: 'stat-bar',
      stats: [
        { value: '$1T+', label: 'Global DC investment pipeline' },
        { value: '15.6 GW', label: 'North American DC absorption' },
        { value: '4 years', label: 'Large transformer lead time' },
        { value: '8–10 wks', label: 'Modular DC deployment' },
      ],
    },
    {
      blockType: 'three-card-grid',
      sectionTitle: 'How Konative Drives DC Development',
      cards: [
        {
          title: 'Development Readiness',
          description:
            'Site evaluation, power interconnection mapping, and capital introduction — structured to compress your timeline from land to energized facility.',
          linkLabel: 'Explore Development Services',
          linkUrl: '/services',
        },
        {
          title: 'Connectivity Brokerage',
          description:
            'Fiber route analysis, carrier negotiation, and dark fiber procurement to ensure your facility meets hyperscale and enterprise connectivity requirements.',
          linkLabel: 'Explore Connectivity',
          linkUrl: '/services',
        },
        {
          title: 'Market Intelligence',
          description:
            'Curated analysis of power markets, modular build trends, and regional dynamics — practitioner insight, not recycled press releases.',
          linkLabel: 'Explore Market Intel',
          linkUrl: '/market-intel',
        },
      ],
    },
    {
      blockType: 'latest-news-feed',
      heading: 'US + Canada Datacenter Intelligence Feed',
      intro:
        'Track datacenter construction, permitting, policy changes, and capital announcements in one place. This feed updates from curated industry, government, and corporate sources.',
      maxItems: 8,
      countryFilter: 'all',
      showSource: true,
      showPublishedDate: true,
      ctaLabel: 'Open Admin News Dashboard',
      ctaLink: '/admin/collections/news-items',
    },
    {
      blockType: 'split-image-text',
      heading: 'Why Konative',
      body:
        'Most data center consultants advise from the outside. Konative operates from inside the development stack — we know the interconnection queues, the modular OEMs, and the capital partners because we work in them daily. We align power, connectivity, and capital so your project moves from concept to energized facility on a compressed timeline.',
      ctaLabel: 'Learn About Our Approach',
      ctaLink: '/about',
      image: mediaId,
      imagePosition: 'right',
    },
    {
      blockType: 'cta-band',
      heading: 'Ready to evaluate your modular data center opportunity with a team that knows the development stack?',
      ctaLabel: 'Request a Readiness Review',
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
          title: 'Konative | Modular Data Center Development Brokerage',
          description:
            'We navigate site, power, connectivity, and capital for modular data center projects across North America.',
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
        title: 'Konative | Modular Data Center Development Brokerage',
        description:
          'We navigate site, power, connectivity, and capital for modular data center projects across North America.',
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
