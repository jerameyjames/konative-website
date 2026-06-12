import type { AudiencePage } from "../types";

export const utilitiesSeed: AudiencePage = {
  slug: "utilities",
  displayName: "Utilities",
  tileDescription:
    "Data centers are your highest-value load growth opportunity. Konative helps you attract and close them.",
  metaTitle: "Konative for Utilities | Attract Data Center Load Growth",
  metaDescription:
    "Electric utilities and rural electric co-ops with available capacity are sitting on the most valuable load growth opportunity in a generation. Konative connects them to the data center operators and developers actively seeking power.",
  order: 50,
  hero: {
    eyebrow: "For Electric Utilities and Rural Electric Co-ops",
    headline: "Available capacity is your most valuable asset right now.",
    subhead:
      "Data center operators are paying premium rates for predictable, large-block load — and they are spending millions trying to find utilities with the capacity, grid stability, and permitting flexibility to support them. If your service territory has available transmission capacity, Konative is the partner that puts you in front of the right operators before your competitors do.",
    primaryCta: { label: "Discuss your capacity position", href: "/call" },
  },
  whyNow: {
    title: "Why now",
    intro: "The power constraint is real. Utilities with available capacity have unusual leverage.",
    bullets: [
      "Hyperscalers and colocation operators are signing 10-20 year power agreements to lock in capacity — the economics are compelling for utilities willing to move.",
      "Operators are expanding beyond gateway markets specifically because constrained utilities can no longer support their growth.",
      "Rural and indigenous service territories with available generation and transmission are now competitive with Tier 1 markets for the right load profile.",
      "Utilities that develop a data center attraction strategy now will set the rate base and revenue story for the next decade.",
    ],
  },
  whatYouAlreadyHave: {
    title: "What you may already have",
    bullets: [
      "Available transmission capacity or planned generation additions in your service territory.",
      "Favorable power rates — industrial rates below the national average are a strong competitive signal.",
      "Underutilized substations, transmission lines, or interconnect points that are not currently fully subscribed.",
      "A service territory that overlaps with indigenous land, rural acreage, or greenfield industrial zones operators are actively scouting.",
    ],
  },
  whatKonativeDoes: {
    title: "What Konative does",
    bands: [
      {
        title: "Capacity Positioning",
        body: "We translate your available capacity, rate structure, and interconnect position into the language data center operators use to make location decisions — MW availability, timeline, reliability data, and rate competitiveness.",
      },
      {
        title: "Operator Matching",
        body: "We identify the hyperscalers, colocation providers, and enterprise operators whose load profile, timeline, and geography align with your service territory — and make direct introductions.",
      },
      {
        title: "Site Partner Coordination",
        body: "We work alongside the landowners, tribal nations, and developers in your territory to present a complete package — power + land + permitting path — rather than just an available substation.",
      },
      {
        title: "Rate and Tariff Strategy",
        body: "We advise on large-load tariff structures, economic development rider programs, and interconnection agreement frameworks that attract the right operators without stranding your rate base.",
      },
      {
        title: "Market Intelligence",
        body: "We provide ongoing visibility into which operators are actively siting, what capacity specifications they are requiring, and where your territory sits relative to competing locations.",
      },
    ],
  },
  firstEngagement: {
    title: "How we start",
    intro:
      "A capacity review takes two weeks and produces a clear picture of your competitive position and the operators most likely to have interest in your territory.",
    steps: [
      {
        label: "Capacity intake",
        body: "Share your available MW capacity, substation and transmission inventory, industrial rate schedule, and any existing large-load interconnection agreements.",
      },
      {
        label: "Market analysis",
        body: "We assess your territory against current operator demand — load size, reliability requirements, geographic preferences, and timeline. We identify the 3-5 most relevant opportunities.",
      },
      {
        label: "Strategy brief",
        body: "We present a positioning summary, recommended operator targets, and a go-to-market approach tailored to your service territory and regulatory environment.",
      },
    ],
    pricingPosture:
      "Fixed-fee capacity review. Ongoing advisory and operator introductions structured on a project basis.",
  },
  trust: {
    title: "Why Konative",
    items: [
      {
        label: "Operator relationships",
        body: "We work directly with data center operators on the location and development side — which means we understand what they need and can advocate for your territory credibly.",
      },
      {
        label: "Indigenous and rural specialization",
        body: "Rural electric co-ops and tribal utility authorities are underrepresented in operator site searches. We specifically bring these utilities into conversations that would otherwise bypass them.",
      },
      {
        label: "Regulatory awareness",
        body: "We understand the FERC interconnection queue, state PUC rate approval processes, and the BIA and tribal utility regulatory frameworks that affect indigenous service territories.",
      },
      {
        label: "No conflict with your members",
        body: "Konative's role is to attract load that serves your rate base and your members' interests. We do not work for the operators we introduce — we work for outcomes that serve the utility.",
      },
    ],
  },
  adjacentAudiences: {
    title: "Also in this conversation",
    pointers: ["tribes", "landowners", "developers-epcs"],
  },
  finalCta: {
    headline: "Available capacity does not market itself.",
    subhead:
      "Tell us about your service territory. We will tell you whether there is an operator opportunity worth pursuing.",
    primaryCta: { label: "Discuss your capacity position", href: "/call" },
  },
};
