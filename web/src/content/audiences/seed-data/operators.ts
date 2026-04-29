import type { AudiencePage } from "../types";

export const operatorsSeed: AudiencePage = {
  slug: "operators",
  displayName: "Operators",
  tileDescription:
    "Power-qualified, fiber-ready sites in North American markets that are not already on every broker's list.",
  metaTitle: "Konative for Data Center Operators | Indigenous and Canadian Site Sourcing",
  metaDescription:
    "Konative sources power-qualified data center sites in tribal nations, rural markets, and Canadian First Nations territories. Pre-qualified land, established community relationships, and deal structures ready for operator review.",
  order: 70,
  hero: {
    eyebrow: "For Colocation Operators, Hyperscalers, and Enterprise Data Center Teams",
    headline: "Power-qualified sites your site selection team has not seen.",
    subhead:
      "The sites that check your boxes — available grid capacity, large contiguous acreage, fiber proximity, and a clean permitting path — are not being surfaced by your standard broker relationships. They are held by tribal nations, rural landowners, and Canadian First Nations who have never received a credible approach. Konative is the sourcing partner with the relationships and the deal architecture to change that.",
    primaryCta: { label: "Share your site requirements", href: "#cta" },
  },
  whyNow: {
    title: "Why now",
    intro: "Your current pipeline reflects your current relationships. The constraint is sourcing.",
    bullets: [
      "Available power at scale is the limiting factor in North American data center expansion — not capital, not construction capacity.",
      "Operators still relying on broker-sourced sites in established markets are competing for the same constrained inventory at compressed return profiles.",
      "Tribal and First Nations territories with available grid capacity are now operationally competitive with Tier 1 markets for hyperscale and large colocation deployments.",
      "Operators who establish sourcing relationships in these markets now will have defensible pipeline advantage for years.",
    ],
  },
  whatYouAlreadyHave: {
    title: "What you bring",
    bullets: [
      "Defined MW requirements, footprint specifications, and geographic preferences for your next expansion.",
      "The technical, legal, and procurement teams to move quickly when a qualified site is in front of you.",
      "Willingness to evaluate non-traditional markets when the fundamentals — power, land, fiber, permitting — are demonstrated.",
      "Long-term perspective on community-anchored deals that create durable site security.",
    ],
  },
  whatKonativeDoes: {
    title: "What Konative does",
    bands: [
      {
        title: "Requirement-Matched Site Sourcing",
        body: "We source sites specifically against your MW, acreage, fiber, water, and timeline requirements — not a generic land list. You receive only sites that have been pre-qualified against your specification.",
      },
      {
        title: "Power Assessment",
        body: "Every site in our pipeline is assessed for available capacity at the substation level, interconnection queue status, estimated timeline to energize, and utility rate schedule. Power clarity before you spend site selection resources.",
      },
      {
        title: "Fiber and Connectivity Verification",
        body: "We verify fiber access, carrier presence, and latency position for each site so your network architecture team can evaluate routes without a site visit.",
      },
      {
        title: "Permitting Path Analysis",
        body: "We assess local zoning, environmental constraints, and building permit timelines. Indigenous sites often have accelerated permitting paths that standard broker comparables do not reflect.",
      },
      {
        title: "Community Deal Structuring",
        body: "We design and negotiate the ground lease or development agreement with the landowner or tribal community — so you are reviewing a structured term sheet, not starting from a blank page with an unfamiliar counterparty.",
      },
    ],
  },
  firstEngagement: {
    title: "How we work with operators",
    intro:
      "We begin with a requirements intake and match against current and near-term pipeline. If there is a credible match, we move to a site brief and introduction.",
    steps: [
      {
        label: "Requirements intake",
        body: "Tell us your target MW, land area, geography, latency requirements, timeline, and any hard constraints. 30-minute call or structured intake form.",
      },
      {
        label: "Pipeline review",
        body: "We assess current and near-term pipeline against your parameters and identify 1-3 candidate sites worth presenting.",
      },
      {
        label: "Site brief delivery",
        body: "Qualified sites are presented with power assessment, fiber status, permitting summary, land details, community context, and a preliminary deal structure.",
      },
    ],
    pricingPosture:
      "No fee to operators for intake or site briefs. Konative is compensated by the landowner or community on closed transactions.",
  },
  trust: {
    title: "Why Konative",
    items: [
      {
        label: "Pre-qualified before you see it",
        body: "We do not surface a site until it has been assessed against power, fiber, land, permitting, and ownership criteria. Your site selection team reviews qualified candidates, not raw leads.",
      },
      {
        label: "Community relationships already established",
        body: "Introductions to tribal nations and First Nations through Konative carry trust that a cold operator approach never has. Development conversations move faster when the community relationship is already in place.",
      },
      {
        label: "No cost to operators",
        body: "Our advisory fee is paid by the landowner or community on a closed transaction. Operators engage at no cost — which means our incentive is to deliver sites that actually close, not to generate activity.",
      },
      {
        label: "Canadian markets included",
        body: "Our pipeline includes First Nations sites in British Columbia and Alberta. Canadian markets offer hydroelectric power, favorable climate, and government incentive programs that create a compelling TCO profile for operators with global deployment mandates.",
      },
    ],
  },
  adjacentAudiences: {
    title: "Behind the sites we source",
    pointers: ["tribes", "landowners", "utilities"],
  },
  finalCta: {
    headline: "Tell us what you need. We will tell you what we have.",
    subhead:
      "Share your MW, footprint, geography, and timeline. We match against current pipeline and respond within two business days.",
    primaryCta: { label: "Share your site requirements", href: "#cta" },
  },
};
