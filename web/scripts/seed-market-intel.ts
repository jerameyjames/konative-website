import { getPayload } from 'payload'
import config from '../payload.config'

const posts = [
  {
    title: "Saudi Arabia Commits ~$1 Trillion to US AI Infrastructure",
    summary:
      "Saudi Arabia has announced a massive commitment of approximately $1 trillion toward AI and data center infrastructure in the United States, signaling one of the largest single-country technology investments in US history. The deal spans compute facilities, semiconductor fabrication, and energy infrastructure.",
    sourceUrl: "https://www.reuters.com/technology/",
    sourceName: "Reuters",
    category: "saudi_gulf" as const,
    publishedDate: "2025-05-14",
    curatorNote:
      "This reshapes the capital stack for every North American DC project. Saudi sovereign wealth isn't just buying capacity — they're buying the development pipeline. If you're in pre-development, your capital introduction conversations just changed. The question is no longer 'where is the money' but 'how do you position to receive it.'",
    isPublished: true,
  },
  {
    title: "MGX Acquires Aligned Data Centers for $40 Billion",
    summary:
      "Abu Dhabi's MGX sovereign wealth fund has completed a $40 billion acquisition of Aligned Data Centers, one of the largest data center platform acquisitions ever. The deal includes Aligned's portfolio of hyperscale and enterprise facilities across the US.",
    sourceUrl: "https://www.datacenterdynamics.com/",
    sourceName: "Data Center Dynamics",
    category: "investment_ma" as const,
    publishedDate: "2025-04-22",
    curatorNote:
      "The MGX/Aligned deal sets a new valuation benchmark for operating DC platforms. For development-stage projects, this means your exit multiples just expanded — but so did the bar for what 'institutional quality' looks like in a development package. Power certainty and fiber connectivity are now table-stakes for institutional capital.",
    isPublished: true,
  },
  {
    title: "HUMAIN and xAI Announce 500 MW AI Training Partnership",
    summary:
      "Saudi Arabia's HUMAIN and Elon Musk's xAI have announced a joint venture to build 500 MW of AI training infrastructure. The partnership will develop purpose-built facilities optimized for large-scale model training across multiple North American sites.",
    sourceUrl: "https://www.datacenterknowledge.com/",
    sourceName: "Data Center Knowledge",
    category: "saudi_gulf" as const,
    publishedDate: "2025-05-01",
    curatorNote:
      "500 MW of purpose-built training capacity is a market-moving commitment. The partnership structure — sovereign capital plus the largest AI compute consumer — signals that future DC development will increasingly be demand-led rather than spec-built. Site selection for these projects prioritizes power availability over network density.",
    isPublished: true,
  },
  {
    title: "North American Data Center Absorption Reaches 15.6 GW",
    summary:
      "According to Colliers' 2025 market report, North American data center absorption has reached 15.6 GW, driven by hyperscale AI workloads, cloud expansion, and enterprise hybrid deployments. Primary markets are at or near full capacity.",
    sourceUrl: "https://www.colliers.com/",
    sourceName: "Colliers Research",
    category: "industry_news" as const,
    publishedDate: "2025-03-18",
    curatorNote:
      "15.6 GW of absorption means primary markets are effectively full. The development opportunity has shifted to secondary and tertiary markets where power is available. If you're sitting on a site with interconnection capacity in a non-primary market, your asset just got significantly more valuable.",
    isPublished: true,
  },
  {
    title: "DOE Launches Tribal Land + Data Center Partnership Program",
    summary:
      "The US Department of Energy has announced a new program to support data center development on tribal and indigenous lands, offering expedited permitting, renewable energy credits, and direct technical assistance for qualifying projects.",
    sourceUrl: "https://www.energy.gov/",
    sourceName: "US Department of Energy",
    category: "tribal_indigenous" as const,
    publishedDate: "2025-02-28",
    curatorNote:
      "This is the most significant federal signal yet that tribal land DC development has moved from concept to policy priority. The combination of expedited permitting and renewable energy credits directly addresses two of the biggest friction points in DC development. Projects that have tribal partnerships in place are now ahead of the curve.",
    isPublished: true,
  },
  {
    title: "Large Power Transformer Lead Times Reach 4 Years",
    summary:
      "CBRE's latest infrastructure report confirms that large power transformer lead times have extended to approximately 4 years, creating a critical bottleneck for new data center developments requiring utility-scale power interconnection.",
    sourceUrl: "https://www.cbre.com/",
    sourceName: "CBRE Research",
    category: "power_grid" as const,
    publishedDate: "2025-01-15",
    curatorNote:
      "4-year transformer lead times are the single biggest constraint in DC development right now. This is why modular approaches are gaining ground — you can energize a facility with temporary or modular power infrastructure while waiting for permanent utility interconnection. If you're not planning around this constraint, your timeline is already wrong.",
    isPublished: true,
  },
  {
    title: "PJM Interconnection Queue Congestion Threatens East Coast DC Pipeline",
    summary:
      "PJM Interconnection, the regional transmission organization serving 13 eastern US states, is experiencing severe queue congestion with over 250 GW of interconnection requests pending. New data center projects face 3-5 year wait times for grid connection.",
    sourceUrl: "https://www.pjm.com/",
    sourceName: "PJM Interconnection",
    category: "regulatory" as const,
    publishedDate: "2025-03-05",
    curatorNote:
      "The PJM queue situation is redirecting development capital westward and into markets with available interconnection capacity. For developers in ERCOT, SPP, or MISO territories, this is a competitive tailwind. The projects that win will be the ones that already have interconnection agreements or can demonstrate a credible path to energization without sitting in a 5-year queue.",
    isPublished: true,
  },
  {
    title: "InfraPartners Launches Flex-Ready Modular Data Center Platform",
    summary:
      "InfraPartners has unveiled its Flex-Ready modular data center platform, promising 8-10 week deployment from order to energization. The prefabricated units ship in standard containers and can scale from 1 MW to 100+ MW configurations.",
    sourceUrl: "https://www.infrapartners.com/",
    sourceName: "InfraPartners",
    category: "modular_build" as const,
    publishedDate: "2025-04-10",
    curatorNote:
      "8-10 week deployment cycles fundamentally change the development calculus. Instead of a 2-3 year stick-built timeline, modular lets you phase capacity to match demand. The key question for developers isn't 'modular vs. stick-built' anymore — it's 'how do I structure the power and connectivity to support rapid modular deployment at my site.'",
    isPublished: true,
  },
]

async function main() {
  const payload = await getPayload({ config })

  for (const post of posts) {
    const existing = await payload.find({
      collection: 'market-intel-posts',
      where: { title: { equals: post.title } },
      limit: 1,
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'market-intel-posts',
        id: existing.docs[0].id,
        data: post,
      })
      console.log(`Updated: ${post.title}`)
    } else {
      await payload.create({
        collection: 'market-intel-posts',
        data: post,
      })
      console.log(`Created: ${post.title}`)
    }
  }

  console.log(`Seeded ${posts.length} market intel posts.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
