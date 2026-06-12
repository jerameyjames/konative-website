import type { AudiencePage } from "../types";

export const investorsSeed: AudiencePage = {
  slug: "investors",
  displayName: "Investors",
  tileDescription:
    "Access site-qualified, structurally de-risked data center development opportunities in underserved North American markets.",
  metaTitle: "Konative for Investors | Data Center Deal Flow in Indigenous and Canadian Markets",
  metaDescription:
    "Konative sources and qualifies data center development sites in tribal, rural, and Canadian markets — then structures deals that are ready for capital deployment. No cold origination. No unqualified land.",
  order: 30,
  hero: {
    eyebrow: "For Infrastructure Investors and Capital Partners",
    headline: "The deal flow your competitors are not seeing.",
    subhead:
      "The highest-yield data center sites in North America are not on LoopNet. They are held by tribal nations, rural landowners, and Canadian First Nations who have never been approached correctly. Konative is the origination and structuring partner that brings you qualified, investment-ready opportunities from markets that institutional capital has systematically missed.",
    primaryCta: { label: "Request deal flow access", href: "/call" },
  },
  whyNow: {
    title: "Why now",
    intro: "The data center investment thesis is well understood. The edge is in origination.",
    bullets: [
      "AI infrastructure demand has compressed a decade of absorption into 36 months — every credible site is now contested.",
      "Gateway markets are overpriced and power-constrained; the return profile has compressed significantly.",
      "Tribal and Canadian sites offer power, land, and grid access that gateway markets cannot match — at a fraction of the basis.",
      "First-mover institutional capital in these markets will set the comp stack. That window is open now.",
    ],
  },
  whatYouAlreadyHave: {
    title: "What you bring",
    bullets: [
      "Capital ready to deploy into data center development or ground-up construction.",
      "Underwriting discipline and operational due diligence capability.",
      "An appetite for risk-adjusted returns in emerging markets that most funds have not yet mapped.",
      "The ability to move decisively when a qualified site is in front of you.",
    ],
  },
  whatKonativeDoes: {
    title: "What Konative does",
    bands: [
      {
        title: "Proprietary Site Origination",
        body: "We identify and engage landowners, tribal nations, and Canadian First Nations before they reach the open market — building a pipeline that institutional capital cannot access cold.",
      },
      {
        title: "Site Qualification",
        body: "Every site is assessed against actual operator requirements: power capacity, interconnect, fiber, water, permitting path, and ownership clarity. You see only qualified opportunities.",
      },
      {
        title: "Deal Structuring",
        body: "We design the investment structure — ground lease, JV, preferred equity, or development agreement — that aligns landowner and investor incentives and creates a clean path to close.",
      },
      {
        title: "Operator Introductions",
        body: "We connect qualified sites to the hyperscalers, colocation providers, and enterprise operators who are actively seeking capacity. Anchored deals before you close reduces development risk.",
      },
      {
        title: "Ongoing Market Intelligence",
        body: "Quarterly briefings on power pricing, interconnect availability, operator demand signals, and transaction comps in the markets we cover.",
      },
    ],
  },
  firstEngagement: {
    title: "How we work with investors",
    intro:
      "We maintain a selective LP-style relationship with capital partners. Introductions are made when a qualified site matches your deployment criteria.",
    steps: [
      {
        label: "Intake call",
        body: "30 minutes to understand your deployment size, target markets, preferred structures, and timeline. We do not share deal flow with every interested party.",
      },
      {
        label: "Criteria alignment",
        body: "We map your parameters — geography, MW range, return thresholds, structure preferences — and flag sites as they qualify.",
      },
      {
        label: "Deal introduction",
        body: "When a site matches, you receive a site brief, power assessment, and preliminary structure. We facilitate introductions and support diligence.",
      },
    ],
    pricingPosture:
      "No retainer. Konative earns an advisory fee on closed transactions. Aligned economics throughout.",
  },
  trust: {
    title: "Why Konative",
    items: [
      {
        label: "Origination depth others lack",
        body: "Our relationships inside tribal nations, indigenous development corporations, and Canadian First Nations produce opportunities that are not visible through standard broker channels.",
      },
      {
        label: "Structuring that protects all parties",
        body: "We have seen tribal and rural deals collapse at the finish line due to inadequate structuring. Our deal architecture anticipates governance, legal, and political requirements that external developers miss.",
      },
      {
        label: "No developer conflict",
        body: "Konative is an advisory and origination firm — not a competing developer. We work for aligned outcomes, not to win the deal for ourselves.",
      },
      {
        label: "Selective access",
        body: "We do not distribute deal flow broadly. Capital partners are vetted and matched to specific opportunities. This protects the relationships that produce the pipeline.",
      },
    ],
  },
  adjacentAudiences: {
    title: "Also working with",
    pointers: ["tribes", "landowners", "developers-epcs"],
  },
  finalCta: {
    headline: "Ready to see what we are sourcing?",
    subhead:
      "Tell us your deployment criteria. We will share relevant opportunities as they qualify.",
    primaryCta: { label: "Request deal flow access", href: "/call" },
  },
};
