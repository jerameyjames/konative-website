import { stitchImages } from "@/content/media";

/** Rich page intros — modular data center readiness / Indigenous economic context */
export const pageLeads = {
  playbook: {
    eyebrow: "How Konative runs the front end",
    title: "A playbook built for compressed schedules",
    body:
      "Most modular programs do not fail on ambition — they fail on sequencing. Interconnection queues slip, long-lead switchgear moves, and cooling assumptions change while capital is already watching the clock. This playbook is how Konative keeps diligence, procurement narrative, and governance cadence aligned so your team can say “go” or “no-go” with evidence instead of hope.",
    pullQuote:
      "If the story changes every week, the project does not need another vendor — it needs a single owner of the readiness narrative.",
    image: stitchImages.playbook,
  },
  problem: {
    eyebrow: "Why readiness stalls",
    title: "Fragmentation is expensive when the window is finite",
    body:
      "Land and capital can align faster than many teams expect — then the real work begins: proving power path, cooling strategy, supply chain feasibility, and schedule integrity in a way lenders, partners, and communities can trust. When those threads are owned by different consultants with different assumptions, you get motion without convergence. Konative exists to collapse that fragmentation into one disciplined path to a decision-grade readout.",
    pullQuote:
      "Six months of ‘almost ready’ is often just five competing models nobody has reconciled.",
    image: stitchImages.problem,
  },
  segments: {
    eyebrow: "Who we are built for",
    title: "Different mandates, same bottleneck: execution clarity",
    body:
      "Investment groups need a diligence spine they can defend in IC. Indigenous Development Corporations need a partner who respects governance timelines and the reality that opportunity must translate into durable community benefit, not just headlines. Infrastructure-backed developers need someone who speaks fluently across site, interconnection, and long-lead equipment. Konative’s engagement model flexes across those contexts while keeping deliverables consistent: integrated memo, risk register, and explicit next commitments.",
    pullQuote:
      "The segment changes. The requirement does not: one coherent readiness story.",
    image: stitchImages.segmentsInvestors,
  },
  services: {
    eyebrow: "What we coordinate",
    title: "From site reality to board-ready framing",
    body:
      "Konative is not a general contractor and not a single-point vendor for one subsystem. We orchestrate the cross-disciplinary inputs that determine whether a modular data center program is real: land constraints, grid headroom and upgrade path, thermal envelope and water posture, procurement critical path, and the pro forma bridge that ties assumptions to evidence. The output is not a stack of siloed PDFs — it is a single narrative your leadership can act on.",
    pullQuote:
      "We translate ‘everyone agrees in the room’ into ‘everyone agrees in the memo’.",
    image: stitchImages.services,
  },
  compare: {
    eyebrow: "Konative vs. typical paths",
    title: "Ownership, integration, and tempo",
    body:
      "Traditional diligence can be thorough and still miss the integration problem: who owns contradictions between the power study, the cooling sketch, and the supplier letter? Konative’s model is designed for that ownership gap. Compared with ad hoc consulting, you get fewer handoffs, fewer reconciliations, and a faster path to a go/no-go that is explicit about what must be true for the project to proceed.",
    pullQuote:
      "Speed without integration is just expensive optimism.",
    image: stitchImages.compare,
  },
  engagement: {
    eyebrow: "Phase one",
    title: "Development Readiness Engagement — scope and intent",
    body:
      "The Development Readiness Engagement is a bounded, decision-oriented pass meant to answer whether the program should advance now, what the top risks are, and what commitments must land next. It is structured so leadership can see the whole picture: site and land path, power and cooling implications, supply chain and schedule exposure, and the financial framing that connects assumptions to evidence. When the engagement ends, you should know what you believe — and what you still need to prove.",
    pullQuote:
      "We are not optimizing for billable hours; we are optimizing for a defensible decision.",
    image: stitchImages.engagement,
  },
  trust: {
    eyebrow: "How we earn confidence",
    title: "Discipline, domain literacy, and transparent posture",
    body:
      "Trust in this category is earned through specificity: naming the risks that actually move outcomes, showing how conclusions were derived, and being clear about what is evidence versus judgment. Konative’s posture is conservative where it should be — on schedule, interconnection, and long-lead assumptions — and direct about tradeoffs. As credentials and references are approved for public use, they will appear here alongside sample artifact patterns where confidentiality allows.",
    pullQuote:
      "Marketing adjectives do not cool a megawatt — rigor does.",
    image: stitchImages.trust,
  },
  contact: {
    eyebrow: "Start with fit",
    title: "Request a Project Readiness Review",
    body:
      "If you are evaluating modular capacity against a real land position, a credible power story, and a capital timeline that will not wait for perfect information, start here. Share enough context for us to understand stage, geography, urgency, and constraints. We respond with honest fit, realistic sequencing, and — when it makes sense — a clear path into the Development Readiness Engagement.",
    pullQuote:
      "If we are not the right partner, we will say so quickly.",
    image: stitchImages.contact,
  },
} as const;

export type PageLeadSlug = keyof typeof pageLeads;

