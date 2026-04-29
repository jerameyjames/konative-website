import type { AudiencePage } from "../types";

export const landownersSeed: AudiencePage = {
  slug: "landowners",
  displayName: "Landowners",
  tileDescription:
    "Find out if your land qualifies for data center development — and what that is actually worth.",
  metaTitle: "Konative for Landowners | Is Your Land Right for a Data Center?",
  metaDescription:
    "Data center developers are looking for land with power access, low latency fiber, and a clear permitting path. Konative helps landowners understand whether their property qualifies and how to negotiate from strength.",
  order: 40,
  hero: {
    eyebrow: "For Landowners with Large Parcels in Strategic Locations",
    headline: "Developers want land with power. You may have exactly what they need.",
    subhead:
      "Data center operators are paying record ground lease rates for land near transmission infrastructure, fiber routes, and available grid capacity. Most landowners do not know whether their property qualifies — or how to avoid leaving millions on the table in the negotiation. Konative is the advisor who works for you, not the developer.",
    primaryCta: { label: "Get a land assessment", href: "#cta" },
  },
  whyNow: {
    title: "Why now",
    intro: "The demand window is real, and it is moving fast.",
    bullets: [
      "AI infrastructure spending is driving the largest sustained demand surge in data center history — operators need land now.",
      "Sites near available power and fiber are being locked up under long-term ground leases and options; late movers get worse terms.",
      "Landowners who approach developers without independent advice routinely accept below-market structures they do not fully understand.",
      "The right advisor changes the outcome — on price, structure, control, and what happens to your land long-term.",
    ],
  },
  whatYouAlreadyHave: {
    title: "What you may already have",
    bullets: [
      "Acreage near transmission lines, substations, or utility infrastructure.",
      "Land in a rural or peri-urban area with available fiber or telecom routes nearby.",
      "Property in a jurisdiction with favorable permitting, low tax rates, or industrial zoning.",
      "An existing relationship with a utility, co-op, or rural electric association.",
    ],
  },
  whatKonativeDoes: {
    title: "What Konative does",
    bands: [
      {
        title: "Site Assessment",
        body: "We evaluate your land against actual developer criteria: acreage, power proximity, fiber access, water, zoning, and environmental constraints. You get a clear qualification verdict.",
      },
      {
        title: "Market Comparables",
        body: "We provide ground lease rate benchmarks and comparable transactions so you understand what your land is actually worth before any developer is in the room.",
      },
      {
        title: "Developer Introductions",
        body: "We introduce qualified sites to the hyperscalers, colocation operators, and developers who are actively looking — without broadcasting your land to everyone in the market.",
      },
      {
        title: "Negotiation Support",
        body: "We review and advise on ground lease terms, option agreements, development rights, and revenue participation structures. You do not negotiate alone.",
      },
      {
        title: "Structure Guidance",
        body: "Ground lease, outright sale, or retained equity in the development? We walk you through the options and the long-term implications of each before you commit.",
      },
    ],
  },
  firstEngagement: {
    title: "How a land assessment works",
    intro:
      "A preliminary assessment takes one week and tells you whether your land is worth pursuing further — and what that pursuit should look like.",
    steps: [
      {
        label: "Intake",
        body: "Share your parcel location, acreage, power situation, and any existing encumbrances or covenants. All information is held in confidence.",
      },
      {
        label: "Desk review",
        body: "We assess power proximity, fiber routes, zoning, and market demand in your area using GIS, utility maps, and operator location data.",
      },
      {
        label: "Assessment call",
        body: "We walk you through what we found — qualification status, estimated value range, and recommended next steps. No pressure to proceed.",
      },
    ],
    pricingPosture:
      "Preliminary assessment is a flat fixed fee. Full advisory engagement is scoped after the assessment.",
  },
  trust: {
    title: "Why Konative",
    items: [
      {
        label: "We work for you",
        body: "Konative is not a developer and does not represent buyers. We advise landowners — which means our incentive is to maximize your outcome, not close a deal for the other side.",
      },
      {
        label: "Plain-language guidance",
        body: "Ground lease agreements are complex. We explain what every clause means in plain terms before you sign anything.",
      },
      {
        label: "Indigenous land expertise",
        body: "We have specific experience advising tribal nations and indigenous landowners, where standard developer approaches consistently undervalue the asset and misread the governance.",
      },
      {
        label: "No cold introductions",
        body: "We do not blast your parcel to a list. Introductions are made selectively to operators with confirmed interest in your geography and specification.",
      },
    ],
  },
  adjacentAudiences: {
    title: "Related resources",
    pointers: ["tribes", "investors", "utilities"],
  },
  finalCta: {
    headline: "Not sure if your land qualifies? That is exactly what we find out.",
    subhead:
      "A one-week desk assessment gives you a clear answer before you spend time talking to developers.",
    primaryCta: { label: "Get a land assessment", href: "#cta" },
  },
};
