/**
 * Marketing copy — konative.com / Stitch screen set.
 * Edit this file to change site-wide messaging; inner routes import blocks from `@/components/stitch/blocks`.
 */
import { stitchImages } from "@/content/media";

export const homepageContent = {
  hero: {
    eyebrow: "Modular data center development readiness",
    headline:
      "Turn modular MW ambition into a capital-ready story before the next interconnection slip costs you another year.",
    subhead:
      "Konative compresses time-to-decision for buyers who think in megawatts, basis points, and IC memos — by owning the integrated diligence path across site, grid headroom, thermal reality, long-lead procurement, and the pro forma bridge that ties assumptions to evidence.",
    aside:
      "If your program is already in motion — land secured, capital engaged, interconnection in flight — the risk is not ‘whether modular works.’ The risk is whether your team can integrate assumptions fast enough to keep the schedule credible with lenders, vendors, and communities.",
    bullets: [
      "Focused on modular data center development readiness — not generic IT colocation",
      "Built for urgent, infrastructure-backed decisions where MW, timeline, and procurement are inseparable",
      "Strong fit where land, capital, and timing are already in motion and ambiguity is the real enemy",
      "Canada, rural, remote, and Indigenous economic development contexts welcome in scope",
    ],
    ctaSupporting:
      "For qualified projects, Konative begins with a decision-grade engagement designed to clarify viability, risks, and next commitments. Engagement-based pricing; scope is bounded to produce a board- and partner-defensible readout.",
  },

  exploreScreens: [
    {
      href: "/playbook",
      title: "Playbook",
      blurb:
        "Qualify → frame → diligence → decide. A single orchestrated path with artifacts you can take to IC, partners, and council — without reconciling five conflicting PDFs.",
      image: stitchImages.playbook,
    },
    {
      href: "/problem",
      title: "Problem",
      blurb:
        "Why programs stall before steel: fragmented specialists, drifting assumptions, and nobody who owns the integrated go/no-go narrative when the window is finite.",
      image: stitchImages.problem,
    },
    {
      href: "/segments",
      title: "Segments",
      blurb:
        "Investment mandates, Indigenous Development Corporation realities, and infrastructure-backed developers — different stakeholders, same requirement: execution clarity.",
      image: stitchImages.segmentsInvestors,
    },
    {
      href: "/services",
      title: "Services",
      blurb:
        "Site, power, cooling, supply chain, and pro forma — coordinated into one readiness story instead of disconnected workstreams.",
      image: stitchImages.services,
    },
    {
      href: "/compare",
      title: "Compare",
      blurb:
        "Konative vs. typical fragmented diligence: ownership, tempo, deliverables, and what ‘done’ means for phase one.",
      image: stitchImages.compare,
    },
    {
      href: "/engagement",
      title: "Engagement",
      blurb:
        "Development Readiness Engagement — bounded scope, explicit outputs, engagement-based pricing.",
      image: stitchImages.engagement,
    },
    {
      href: "/trust",
      title: "Trust",
      blurb:
        "How we earn confidence: specificity, discipline, domain literacy, and transparent legal/privacy posture.",
      image: stitchImages.trust,
    },
    {
      href: "/contact",
      title: "Contact",
      blurb:
        "Request a Project Readiness Review. We answer with fit, timing, and realistic next steps — not a generic sales cycle.",
      image: stitchImages.contact,
    },
  ] as const,

  playbookTimeline: {
    eyebrow: "Konative playbook",
    title: "From first conversation to a decision-grade readout.",
    intro:
      "A single orchestrated path replaces ad hoc calls and conflicting opinions. Each phase produces artifacts you can take to capital, partners, and council.",
    secondaryIntro:
      "Along the way, Konative pressure-tests the assumptions that actually move schedule: interconnection realism, thermal and water posture, long-lead equipment exposure, and the procurement narrative that must hold together under scrutiny.",
    phases: [
      {
        phase: "01 — Qualify",
        detail:
          "Fit, urgency, and land/capital posture. Clear go/no-go on whether a structured readiness pass makes sense now — and what minimum facts must be true before deeper spend.",
      },
      {
        phase: "02 — Frame",
        detail:
          "Project brief, constraints, and success definition. Align on what ‘ready’ means for this site, this grid headroom story, and this capital stack — in writing.",
      },
      {
        phase: "03 — Diligence",
        detail:
          "Site, power, cooling, supply chain, and schedule risk in one integrated memo — not five disconnected PDFs that you still have to reconcile yourself.",
      },
      {
        phase: "04 — Decide",
        detail:
          "Go / no-go recommendation, executive readout, and explicit next commitments for qualified projects — including what must be secured next if the answer is ‘go.’",
      },
    ],
  },

  qualificationCta: {
    eyebrow: "Qualification",
    title: "Start with a Project Readiness Review.",
    body:
      "We review project context, timing, and fit. Qualified opportunities move into a structured discussion on the phase-one engagement — not a generic sales call. If we are not the right partner or the timing is wrong, we will say so directly.",
    bullets: [
      "No long slide decks before fit is clear",
      "Direct response on timing, sequencing, and realistic next steps",
      "Clear path to the Development Readiness Engagement when it makes sense",
      "Confidentiality respected; share what you can — we will work with partial information where appropriate",
    ],
  },

  customerSegments: {
    eyebrow: "Who we serve",
    title: "Customer segments and value",
    segments: [
      {
        title: "Investment groups",
        value:
          "Put capital to work with a single orchestrated diligence path instead of fragmented specialist invoices and drift.",
        detail:
          "IC-ready framing requires integration: how power upgrades, procurement letters, and schedule risk connect to returns. Konative builds the spine your deal team can defend.",
        image: stitchImages.segmentsInvestors,
      },
      {
        title: "Indigenous Development Corporations",
        value:
          "Turn land and opportunity into a credible development path with a partner who respects governance and timeline pressure.",
        detail:
          "Economic development is not a slide — it is a sequence of defensible decisions. Konative aligns technical readiness with the pace and formality communities and boards expect.",
        image: stitchImages.segmentsIdc,
      },
      {
        title: "Infrastructure-backed developers",
        value:
          "When turbines, cooling, and long-lead equipment are on the critical path, Konative aligns decisions before delay costs quarters.",
        detail:
          "If your edge is execution speed, the enemy is silent assumption drift across disciplines. We keep the readiness narrative tight while you keep the site relationship real.",
        image: stitchImages.segmentsInfra,
      },
    ],
  },

  problemDeepDive: {
    eyebrow: "Problem",
    title: "Why projects stall before the real build.",
    paragraphs: [
      "The market window is open now, but traditional build paths are too slow. When power, cooling, and supply-chain commitments slip, the project does not just slow down — it can lose another 6–12 months while everyone argues about whose model was ‘more conservative.’",
      "Most teams are stuck between long timelines and fragmented expertise. Buyers wait on traditional data center timelines while piecing together specialists — and still lack one partner who owns the decision path end to end.",
      "Modular compounds the integration problem: factory throughput, transport envelopes, on-site assembly interfaces, and commissioning dependencies have to align with grid realities — not wishful interconnection dates.",
    ],
    bullets: [
      "Capital and land can be available now; execution clarity is the bottleneck",
      "Specialist workstreams do not integrate themselves — contradictions surface late unless someone owns reconciliation",
      "Early uncertainty creates stalled motion instead of confident action — and stalled motion reads as risk to capital",
      "A beautiful narrative without procurement evidence does not survive first vendor diligence",
    ],
  },

  stalledToDeployed: {
    eyebrow: "From stalled to deployed",
    title: "Move from fragmented inputs to a single readiness narrative.",
    steps: [
      {
        label: "Stalled",
        copy: "Multiple vendors, unclear interfaces, no single owner of the go/no-go story — and weekly status meetings that recycle the same open questions.",
      },
      {
        label: "Aligned",
        copy: "Shared brief, integrated diligence memo, and explicit risks across site, power, and supply chain — with named dependencies and testable assumptions.",
      },
      {
        label: "Ready",
        copy: "Decision-grade recommendation, executive readout, and next commitments defined for capital and partners — including what you will prove in the next 90 days if the answer is go.",
      },
    ],
  },

  connectiveTissue: {
    eyebrow: "Connective tissue",
    title: "One partner to coordinate what used to fragment.",
    statement:
      "Konative is the connective tissue between land, capital, and infrastructure reality — so your team makes one coordinated decision instead of reconciling five conflicting stories the night before a board meeting.",
    supporting:
      "That coordination is not ‘project management theater.’ It is technical literacy plus narrative discipline: what must be true, what we believe today, what we must verify next, and what would change our minds.",
  },

  comparison: {
    eyebrow: "Konative vs. typical paths",
    title: "How Konative compares",
    columns: { konative: "Konative", others: "Typical fragmented path" },
    rows: [
      {
        feature: "Ownership of the decision narrative",
        konative: "Single orchestrated readiness path and readout",
        others: "Multiple consultants; your team integrates competing conclusions",
      },
      {
        feature: "Timing fit",
        konative: "Built for urgent capital and land windows",
        others: "Generalist or slow-cycle timelines that miss market inflection points",
      },
      {
        feature: "Deliverables",
        konative: "Integrated memo, risk register, decision framing",
        others: "Siloed reports, duplicated assumptions, integration left to you",
      },
      {
        feature: "Engagement model",
        konative: "Structured phase-one engagement; engagement-based pricing",
        others: "Open-ended hourly work that rewards drift",
      },
      {
        feature: "Procurement realism",
        konative: "Critical path and long-lead exposure tied to schedule narrative",
        others: "Procurement often treated as a footnote until it becomes the headline",
      },
    ],
  },

  whatKonativeDoes: {
    eyebrow: "What Konative does",
    title: "Development partner that brings the moving parts together.",
    body:
      "Konative helps qualified buyers move from early opportunity to decision-grade clarity. We coordinate the front-end diligence required to understand viability, major risks, and what must be secured next — including the uncomfortable questions that are cheaper to answer now than after deposits and political capital are spent.",
    pillars: [
      "Site and land path — access, constraints, and delivery realism",
      "Power path and infrastructure constraints — headroom, upgrades, and timeline credibility",
      "Cooling and remote-environment implications — water, climate load, operations",
      "Supply-chain and long-lead review — what must be reserved, when, and why",
      "Pro forma and decision framing — assumptions tied to evidence, sensitivities explicit",
      "Development-readiness orchestration — one owner of the integrated narrative",
    ],
  },

  engagement: {
    eyebrow: "Phase one",
    title: "Development Readiness Engagement.",
    body:
      "A decision-grade engagement designed to answer whether the project should move forward now, what the major risks are, and what commitments must be secured next. The intent is not to ‘study forever’ — it is to produce an executive-grade readout your leadership can act on with clear next steps.",
    deliverables: [
      "Project framing brief — success definition, constraints, and decision criteria",
      "Site and infrastructure diligence memo — integrated, not siloed by discipline",
      "Supply-chain and critical-path review — long-lead exposure named and sequenced",
      "Risk register — likelihood, impact, owner, and mitigation path where possible",
      "Decision-grade pro forma bridge — assumptions mapped to evidence and tests",
      "Go / no-go recommendation — explicit, with conditions if applicable",
      "Executive readout — tight telling of the story for non-technical stakeholders",
    ],
    pricingNote: "Engagement-based pricing.",
  },

  trust: {
    eyebrow: "Trust",
    title: "Clarity, discipline, and domain understanding.",
    body:
      "Trust comes from a clear read of the market, a disciplined engagement structure, and evidence that the team understands site, power, cooling, supply chain, and timing — not from marketing theater. Konative is built for buyers who have been burned by pretty decks that collapsed the first time a lender asked a boring technical question.",
    bullets: [
      "Founder and team credentials (add specifics as approved for public use)",
      "Canada, rural, remote, and Indigenous economic development context",
      "Anonymized sample deliverable patterns where confidentiality allows",
      "Clear privacy, legal, and contact posture — see /privacy and /legal",
      "Direct communication: if we cannot add value, we will not consume your timeline",
    ],
  },

  nextSteps: {
    eyebrow: "Next step",
    title: "A clear path for qualified projects.",
    body:
      "When you request a Project Readiness Review, Konative reviews fit, urgency, and context. Qualified opportunities move into structured discussion on the phase-one engagement and the decision path to move forward — including what information we need next and what ‘good’ looks like at the end of phase one.",
  },

  contact: {
    eyebrow: "Request",
    headline:
      "If the window is open now, the front-end decision work cannot wait.",
    supporting:
      "Konative helps qualified buyers move from opportunity to decision-grade clarity before delay costs more time. Share geography, stage, urgency, and constraints — we respond with fit and realistic sequencing.",
  },

  bottomCta: {
    headline: "Ready for a structured readiness conversation?",
    sub:
      "Share context below. We respond with fit, timing, and next steps for qualified projects.",
  },
} as const;
