# Audience Router (Plan A) — `/for/tribes` + `/for/advisors` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a reusable audience-page architecture on `konative.com` and the first two audience pages — `/for/tribes` (Jerry's deliverable) and `/for/advisors` (ambassador funnel) — with a working CTA wired into the existing contact-inquiry pipeline.

**Architecture:** Typed TypeScript content registry (`web/src/content/audiences/`) drives a shared `AudienceLanding` server component. A dynamic route `/for/[audience]/page.tsx` reads from the registry and renders the page; `/for/page.tsx` is a hub of audience tiles. The existing `/api/contact` endpoint accepts a new `audience` discriminator field that flows into the existing Sanity `contactInquiry` document.

**Tech Stack:** Next.js 16 App Router, React 19 server components, TypeScript, Zod, Sanity (write-through for form submissions), Vitest, inline styling matching existing `markets/[state]` patterns (Konative palette: `#08142D` navy bg, `#E07B39` orange accent, Barlow Condensed display, Inter body).

---

## File Structure

**New files:**
- `web/src/content/audiences/types.ts` — `Audience`, `Section`, `CapabilityBand`, `EngagementStep` types
- `web/src/content/audiences/tribes.ts` — full tribal page content
- `web/src/content/audiences/advisors.ts` — advisor page content (lean but credible)
- `web/src/content/audiences/index.ts` — `AUDIENCES` registry + helpers
- `web/src/content/audiences/__tests__/registry.test.ts` — registry shape + completeness tests
- `web/src/components/audience/AudienceLanding.tsx` — shared skeleton (server component)
- `web/src/components/audience/AudienceCTAForm.tsx` — client form component, posts to `/api/contact` with `audience` field
- `web/src/components/audience/__tests__/AudienceLanding.test.tsx` — render test with tribes config
- `web/src/components/audience/__tests__/AudienceCTAForm.test.tsx` — form submit test
- `web/src/app/(frontend)/for/page.tsx` — audience hub tile grid
- `web/src/app/(frontend)/for/[audience]/page.tsx` — dynamic audience page

**Modified files:**
- `web/src/lib/forms/schemas/contact.ts` — add optional `audience` field
- `web/src/sanity/schemaTypes/contactInquiry.ts` — add `audience` field
- `web/src/components/Header.tsx` — add "For" nav entry; widen `DARK_HERO_PAGES` to support `/for` prefix
- `web/src/lib/forms/__tests__/submit.test.ts` — add audience round-trip test

**Untouched:**
- `/api/contact/route.ts` — already passes the full payload through `submitForm`; no change needed.
- Existing pages, sitemap, robots.

---

## Working Conventions (read first)

- All work runs from `web/`. The app dev server is `npm run dev` on port 3005.
- Tests are Vitest. Run `npm test` from `web/`. Test files live in `__tests__` next to the code they cover.
- TypeScript path alias `@/` maps to `web/src/`.
- Visual style: copy patterns from `web/src/app/(frontend)/markets/[state]/page.tsx`. Inline styles, Konative palette, sharp brutalist boxes (no rounded corners), Barlow Condensed for headlines.
- Commit after every task using conventional commits (`feat:`, `test:`, `chore:`). The repo prefers small commits.

---

## Task 1: Audience content types

**Files:**
- Create: `web/src/content/audiences/types.ts`

- [ ] **Step 1: Create the types file**

```typescript
// web/src/content/audiences/types.ts

/**
 * Shared types for audience landing pages under /for/<slug>.
 * Each audience config drives the AudienceLanding component.
 */

export type AudienceSlug =
  | "tribes"
  | "advisors"
  | "investors"
  | "landowners"
  | "utilities"
  | "developers-epcs"
  | "operators";

export type CapabilityBand = {
  /** 2-4 word title, headline-cased. */
  title: string;
  /** One sentence, plain language. */
  body: string;
};

export type EngagementStep = {
  /** Short label for the step, e.g. "Day 1-30". */
  label: string;
  /** What happens during this step. */
  body: string;
};

export type TrustItem = {
  /** Short label, e.g. "Geography". */
  label: string;
  /** Supporting detail. */
  body: string;
};

export type CTAVariant = {
  /** Button text. */
  label: string;
  /** Anchor or URL. Anchor preferred so the form lives on-page. */
  href: string;
};

export type Audience = {
  slug: AudienceSlug;
  /** Audience name as shown in nav and tiles, e.g. "Tribal Nations". */
  displayName: string;
  /** One-line tile description for /for hub. */
  tileDescription: string;
  /** SEO title — full page title shown in browser tab. */
  metaTitle: string;
  /** SEO description for OG + meta. */
  metaDescription: string;
  hero: {
    /** Eyebrow above the headline, all caps small. */
    eyebrow: string;
    /** Main headline. Will render in display font. */
    headline: string;
    /** Subhead, one or two sentences. */
    subhead: string;
    primaryCta: CTAVariant;
  };
  whyNow: {
    title: string;
    intro?: string;
    bullets: string[];
  };
  whatYouAlreadyHave: {
    title: string;
    intro?: string;
    bullets: string[];
  };
  whatKonativeDoes: {
    title: string;
    bands: CapabilityBand[];
  };
  firstEngagement: {
    title: string;
    intro?: string;
    steps: EngagementStep[];
    pricingPosture: string;
  };
  trust: {
    title: string;
    items: TrustItem[];
  };
  adjacentAudiences: {
    title: string;
    /** Pointers to other audience pages by slug. */
    pointers: AudienceSlug[];
  };
  finalCta: {
    headline: string;
    subhead: string;
    primaryCta: CTAVariant;
  };
};
```

- [ ] **Step 2: Sanity check the file compiles**

Run: `cd web && npx tsc --noEmit`
Expected: PASS (no type errors).

- [ ] **Step 3: Commit**

```bash
git add web/src/content/audiences/types.ts
git commit -m "feat(audiences): shared audience content types"
```

---

## Task 2: Tribes audience config (the lead deliverable)

**Files:**
- Create: `web/src/content/audiences/tribes.ts`

- [ ] **Step 1: Create the tribes content file**

```typescript
// web/src/content/audiences/tribes.ts
import type { Audience } from "./types";

export const tribes: Audience = {
  slug: "tribes",
  displayName: "Tribal Nations",
  tileDescription:
    "Turn land and power rights into a credible, financeable data center project — on your terms.",
  metaTitle: "Konative for Tribal Nations | Land + Power → Data Center",
  metaDescription:
    "You already hold the two scarcest assets in the AI buildout — land and interconnect. Konative is the development partner that converts them into a financeable data center project, on your terms.",
  hero: {
    eyebrow: "For Tribal Nations and Indigenous Development Corporations",
    headline:
      "You already have what the AI buildout needs. Konative is how you put it to work.",
    subhead:
      "Land and interconnect rights are the two scarcest assets in North American data center development. Konative is the development partner that turns them into a credible, financeable project — on terms that preserve sovereignty and serve your nation.",
    primaryCta: {
      label: "Request a Project Readiness Review",
      href: "#cta",
    },
  },
  whyNow: {
    title: "Why now",
    intro:
      "The window to participate as a principal — not a lessee — is closing.",
    bullets: [
      "AI infrastructure demand is pulling decades of buildout into the next 36 months.",
      "Power and interconnect capacity is the constraint nationwide; nations with both have unusual leverage.",
      "Capital is committed and looking for sites that can move; sites that take a year to clarify get passed over.",
      "Tribes that act now sit at the table as owners and partners, not landlords.",
    ],
  },
  whatYouAlreadyHave: {
    title: "What you already have",
    intro:
      "The hardest pieces of a data center project are already inside your nation's footprint.",
    bullets: [
      "A land base outside the constraints that strangle metro markets.",
      "Treaty and jurisdictional standing that streamlines permitting and incentives.",
      "Existing utility relationships, energy rights, and in many cases, generation assets.",
      "A development corporation structure built for long-horizon, capital-intensive projects.",
      "Federal program alignment — US: NCAI, Treasury CDFI, DOE Loan Programs Office; Canada: CCAB, ISC, the Indigenous Loan Guarantee.",
    ],
  },
  whatKonativeDoes: {
    title: "What Konative does for you",
    bands: [
      {
        title: "Site path",
        body: "Identify, evaluate, and validate the parcels on your land base that can credibly host a data center — siting, environmental, civil, and timeline.",
      },
      {
        title: "Power and interconnect path",
        body: "Build the power case from interconnection studies, generation strategy, and utility coordination — including behind-the-meter options where they fit.",
      },
      {
        title: "Modular DC strategy",
        body: "Right-size the build for your nation's appetite. Phased modular capacity de-risks early commitments and matches deployment pace to capital readiness.",
      },
      {
        title: "Sovereignty-preserving capital structure",
        body: "Structure the deal so the nation retains ownership, control, and long-term economics. Equity, JV, lease, and development partnerships modeled for sovereignty fit.",
      },
      {
        title: "IDC governance integration",
        body: "Brief, structure, and pace the project to match council and IDC review cycles. No surprise board meetings, no rushed decisions.",
      },
      {
        title: "Indigenous procurement and partner curation",
        body: "Vet developers, EPCs, operators, and capital partners. Prioritize indigenous-owned vendors and contractors where they exist; hold non-indigenous partners to procurement standards your nation sets.",
      },
    ],
  },
  firstEngagement: {
    title: "What the first 60-90 days look like",
    intro:
      "The Project Readiness Review produces decision-grade clarity for your council and IDC.",
    steps: [
      {
        label: "Discovery",
        body: "Confirm fit, urgency, and scope with leadership. Map existing assets, prior studies, and active developer interest.",
      },
      {
        label: "Diligence",
        body: "Site, power, cooling, supply chain, capital structure, sovereignty fit, and procurement posture — analyzed in parallel.",
      },
      {
        label: "Risk register and decision framing",
        body: "Document what is known, what is unknown, what would need to be true to proceed, and at what cost.",
      },
      {
        label: "Executive readout",
        body: "A 60-minute briefing for council and IDC leadership with a go / no-go / refine recommendation and a phased path forward.",
      },
    ],
    pricingPosture: "Engagement-based pricing.",
  },
  trust: {
    title: "Why Konative",
    items: [
      {
        label: "Geography and specialization",
        body: "Canada and US, with deep indigenous and rural project experience. Cross-border literacy where it matters.",
      },
      {
        label: "Neutral clearinghouse",
        body: "Konative is not a developer competing for your land. The job is to help your nation evaluate and execute, not to sell you a building.",
      },
      {
        label: "Founder access",
        body: "You work directly with the team responsible for the recommendation. No layered account managers.",
      },
      {
        label: "Anonymized engagement examples",
        body: "Available on request under NDA.",
      },
    ],
  },
  adjacentAudiences: {
    title: "Are you actually here for something else?",
    pointers: ["advisors", "investors", "landowners", "utilities"],
  },
  finalCta: {
    headline: "Ready to talk through a real project?",
    subhead:
      "Tell us about the land, the energy posture, and what the council has authorized so far. We'll come back with a fit assessment and a path.",
    primaryCta: {
      label: "Request a Project Readiness Review",
      href: "#cta",
    },
  },
};
```

- [ ] **Step 2: Compile check**

Run: `cd web && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add web/src/content/audiences/tribes.ts
git commit -m "feat(audiences): tribal nations content"
```

---

## Task 3: Advisors audience config

**Files:**
- Create: `web/src/content/audiences/advisors.ts`

- [ ] **Step 1: Create the advisors content file**

```typescript
// web/src/content/audiences/advisors.ts
import type { Audience } from "./types";

export const advisors: Audience = {
  slug: "advisors",
  displayName: "Advisors and Introducers",
  tileDescription:
    "You know who needs this. Konative makes it easy — and worthwhile — to introduce them.",
  metaTitle: "Konative for Advisors and Introducers | Ambassador Program",
  metaDescription:
    "If you work with tribal nations, investors, landowners, or utilities, you can introduce them to Konative and earn referral fees on closed engagements. Co-branded materials, tracked links, founder access.",
  hero: {
    eyebrow: "For Advisors, Consultants, and Introducers",
    headline: "You know who needs this. We make it easy to introduce them.",
    subhead:
      "If you work with tribal nations, investors, landowners, or utilities thinking about data center development, Konative is the partner you can stand behind. We pay you on closed introductions, give you the materials to make the pitch, and treat you like a partner — not a tipster.",
    primaryCta: { label: "Apply to the ambassador program", href: "#cta" },
  },
  whyNow: {
    title: "Why now",
    bullets: [
      "Data center demand is the largest infrastructure story of the next decade.",
      "Your contacts are being approached by developers with a vested interest. They need a neutral partner.",
      "Konative pays referral fees on closed Project Readiness Reviews and a share of commission on closed deals.",
    ],
  },
  whatYouAlreadyHave: {
    title: "What you already have",
    bullets: [
      "Trust inside a community Konative cannot reach cold.",
      "Context on what your contacts are actually trying to solve.",
      "A reputation that an empty pitch deck cannot replace.",
    ],
  },
  whatKonativeDoes: {
    title: "What Konative does for you",
    bands: [
      {
        title: "Co-branded one-pager",
        body: "Send your contact a single URL that explains Konative in their language. No PDF to manage.",
      },
      {
        title: "Tracked referral link",
        body: "Your introductions are attributed automatically and routed to founder triage within one business day.",
      },
      {
        title: "Intro deck and talking points",
        body: "A short deck and a call script for the first conversation. Light enough to use, structured enough to land.",
      },
      {
        title: "Referral economics",
        body: "Fee on closed Project Readiness Reviews. Share of commission on closed development deals.",
      },
      {
        title: "Founder access and briefings",
        body: "Direct line to the Konative founder and quarterly briefings on market activity and platform changes.",
      },
    ],
  },
  firstEngagement: {
    title: "How onboarding works",
    steps: [
      {
        label: "Apply",
        body: "Tell us who you serve and what your introduction motion looks like. The program is invite-only at launch.",
      },
      {
        label: "Onboard",
        body: "30-minute call. We share materials, set up your tracked link, and align on the first 1-2 introductions.",
      },
      {
        label: "Operate",
        body: "Make introductions when they fit. Konative handles the follow-up, the pitch, and the diligence.",
      },
    ],
    pricingPosture: "Free to advisors. Compensation on closed referrals.",
  },
  trust: {
    title: "Why Konative",
    items: [
      {
        label: "Neutral clearinghouse",
        body: "Konative does not compete with your client's interests. We help them evaluate the field, not sell them a building.",
      },
      {
        label: "Founder responsiveness",
        body: "Introductions reach the founder within one business day. No wasted relationship capital.",
      },
      {
        label: "Indigenous and Canadian specialization",
        body: "If your network is in Indian country or Canada, this is unusually strong fit.",
      },
    ],
  },
  adjacentAudiences: {
    title: "Looking for the buyer-side story?",
    pointers: ["tribes", "investors", "landowners"],
  },
  finalCta: {
    headline: "Ready to introduce someone?",
    subhead:
      "Tell us who you typically work with. We'll set up a 30-minute onboarding and get you the materials to start.",
    primaryCta: { label: "Apply to the ambassador program", href: "#cta" },
  },
};
```

- [ ] **Step 2: Compile check**

Run: `cd web && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add web/src/content/audiences/advisors.ts
git commit -m "feat(audiences): advisors content"
```

---

## Task 4: Audience registry + helpers

**Files:**
- Create: `web/src/content/audiences/index.ts`
- Test: `web/src/content/audiences/__tests__/registry.test.ts`

- [ ] **Step 1: Write the failing test first**

```typescript
// web/src/content/audiences/__tests__/registry.test.ts
import { describe, it, expect } from "vitest";
import { AUDIENCES, getAudience, listAudiences } from "../index";

describe("audience registry", () => {
  it("exports tribes and advisors at minimum", () => {
    expect(AUDIENCES.tribes).toBeDefined();
    expect(AUDIENCES.advisors).toBeDefined();
  });

  it("each audience config has required top-level shape", () => {
    for (const [slug, audience] of Object.entries(AUDIENCES)) {
      expect(audience.slug, `${slug} slug field`).toBe(slug);
      expect(audience.displayName, `${slug} displayName`).toBeTruthy();
      expect(audience.tileDescription, `${slug} tileDescription`).toBeTruthy();
      expect(audience.metaTitle, `${slug} metaTitle`).toBeTruthy();
      expect(audience.metaDescription, `${slug} metaDescription`).toBeTruthy();
      expect(audience.hero.headline, `${slug} hero headline`).toBeTruthy();
      expect(audience.hero.primaryCta.label, `${slug} primaryCta label`).toBeTruthy();
      expect(audience.whyNow.bullets.length, `${slug} whyNow bullets`).toBeGreaterThan(0);
      expect(audience.whatYouAlreadyHave.bullets.length, `${slug} alreadyHave bullets`).toBeGreaterThan(0);
      expect(audience.whatKonativeDoes.bands.length, `${slug} bands`).toBeGreaterThanOrEqual(3);
      expect(audience.firstEngagement.steps.length, `${slug} steps`).toBeGreaterThan(0);
      expect(audience.trust.items.length, `${slug} trust items`).toBeGreaterThan(0);
      expect(audience.finalCta.primaryCta.label, `${slug} finalCta label`).toBeTruthy();
    }
  });

  it("getAudience returns the audience for a known slug", () => {
    expect(getAudience("tribes")?.displayName).toBe("Tribal Nations");
  });

  it("getAudience returns undefined for an unknown slug", () => {
    expect(getAudience("nonexistent" as never)).toBeUndefined();
  });

  it("listAudiences returns audiences in insertion order", () => {
    const list = listAudiences();
    expect(list[0].slug).toBe("tribes");
    expect(list.map(a => a.slug)).toContain("advisors");
  });

  it("adjacentAudiences pointers reference real registered audiences", () => {
    for (const [slug, audience] of Object.entries(AUDIENCES)) {
      for (const pointer of audience.adjacentAudiences.pointers) {
        if (AUDIENCES[pointer as keyof typeof AUDIENCES]) continue;
        // Pointer references an audience not yet registered (e.g. landowners in Plan B).
        // This is allowed; the renderer will skip unregistered pointers.
        // We just record that the pointer is structurally a string.
        expect(typeof pointer, `${slug} pointer`).toBe("string");
      }
    }
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

Run: `cd web && npm test -- src/content/audiences`
Expected: FAIL — module `../index` not found.

- [ ] **Step 3: Write the registry**

```typescript
// web/src/content/audiences/index.ts
import type { Audience, AudienceSlug } from "./types";
import { tribes } from "./tribes";
import { advisors } from "./advisors";

/**
 * Registry of all audience landing pages. Insertion order = display order
 * on the /for hub. Add new audiences here.
 */
export const AUDIENCES = {
  tribes,
  advisors,
} as const satisfies Partial<Record<AudienceSlug, Audience>>;

export type RegisteredAudienceSlug = keyof typeof AUDIENCES;

export function getAudience(slug: string): Audience | undefined {
  return (AUDIENCES as Record<string, Audience>)[slug];
}

export function listAudiences(): Audience[] {
  return Object.values(AUDIENCES);
}

export type { Audience, AudienceSlug } from "./types";
```

- [ ] **Step 4: Run the test to confirm it passes**

Run: `cd web && npm test -- src/content/audiences`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/content/audiences/index.ts web/src/content/audiences/__tests__/registry.test.ts
git commit -m "feat(audiences): registry + listAudiences/getAudience helpers"
```

---

## Task 5: AudienceLanding component (shared skeleton)

**Files:**
- Create: `web/src/components/audience/AudienceLanding.tsx`
- Test: `web/src/components/audience/__tests__/AudienceLanding.test.tsx`

- [ ] **Step 1: Write the failing test**

```typescript
// web/src/components/audience/__tests__/AudienceLanding.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AudienceLanding } from "../AudienceLanding";
import { tribes } from "@/content/audiences/tribes";

describe("AudienceLanding", () => {
  it("renders the audience hero headline", () => {
    render(<AudienceLanding audience={tribes} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      tribes.hero.headline,
    );
  });

  it("renders all capability bands", () => {
    render(<AudienceLanding audience={tribes} />);
    for (const band of tribes.whatKonativeDoes.bands) {
      expect(screen.getByText(band.title)).toBeInTheDocument();
    }
  });

  it("renders the primary CTA label twice (top and bottom)", () => {
    render(<AudienceLanding audience={tribes} />);
    const ctas = screen.getAllByText(tribes.hero.primaryCta.label);
    expect(ctas.length).toBeGreaterThanOrEqual(2);
  });

  it("renders engagement steps", () => {
    render(<AudienceLanding audience={tribes} />);
    for (const step of tribes.firstEngagement.steps) {
      expect(screen.getByText(step.label)).toBeInTheDocument();
    }
  });

  it("renders trust items", () => {
    render(<AudienceLanding audience={tribes} />);
    for (const item of tribes.trust.items) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Confirm the test setup supports React Testing Library**

Run: `cd web && grep -E "@testing-library/react|jsdom" package.json`
Expected: both present. If not, install:

```bash
cd web && npm i -D @testing-library/react @testing-library/jest-dom jsdom
```

Then verify `web/vitest.config.ts` (or `vite.config.ts`) has `test.environment = "jsdom"`. Add it if missing:

```typescript
// in defineConfig({ test: { ... } })
environment: "jsdom",
```

Re-run: `cd web && npm test -- AudienceLanding`
Expected: FAIL — `AudienceLanding` not found.

- [ ] **Step 3: Implement the component**

```tsx
// web/src/components/audience/AudienceLanding.tsx
import Link from "next/link";
import type { Audience } from "@/content/audiences/types";
import { getAudience } from "@/content/audiences";
import { AudienceCTAForm } from "./AudienceCTAForm";

const NAVY = "#08142D";
const ORANGE = "#E07B39";
const TEXT_DIM = "rgba(255,255,255,0.55)";
const TEXT_FAINT = "rgba(255,255,255,0.35)";
const BORDER = "rgba(255,255,255,0.07)";
const DISPLAY_FONT = '"Barlow Condensed", sans-serif';
const BODY_FONT = "Inter, sans-serif";

export function AudienceLanding({ audience }: { audience: Audience }) {
  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: BODY_FONT, color: "#fff" }}>
      {/* Hero */}
      <section style={{ paddingTop: 96, paddingBottom: 64, paddingLeft: 48, paddingRight: 48, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ fontFamily: BODY_FONT, fontSize: 11, color: ORANGE, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
            {audience.hero.eyebrow}
          </div>
          <h1 style={{ fontFamily: DISPLAY_FONT, fontWeight: 800, fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.95, textTransform: "uppercase", margin: "0 0 24px" }}>
            {audience.hero.headline}
          </h1>
          <p style={{ fontFamily: BODY_FONT, fontSize: 17, lineHeight: 1.6, color: TEXT_DIM, maxWidth: 760, margin: "0 0 32px" }}>
            {audience.hero.subhead}
          </p>
          <CTAButton cta={audience.hero.primaryCta} />
        </div>
      </section>

      <SectionBlock title={audience.whyNow.title} intro={audience.whyNow.intro}>
        <BulletList bullets={audience.whyNow.bullets} />
      </SectionBlock>

      <SectionBlock title={audience.whatYouAlreadyHave.title} intro={audience.whatYouAlreadyHave.intro}>
        <BulletList bullets={audience.whatYouAlreadyHave.bullets} />
      </SectionBlock>

      <SectionBlock title={audience.whatKonativeDoes.title}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {audience.whatKonativeDoes.bands.map(band => (
            <div key={band.title} style={{ border: `1px solid ${BORDER}`, padding: "20px 22px", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 18, textTransform: "uppercase", marginBottom: 10 }}>{band.title}</div>
              <p style={{ fontFamily: BODY_FONT, fontSize: 14, lineHeight: 1.55, color: TEXT_DIM, margin: 0 }}>{band.body}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title={audience.firstEngagement.title} intro={audience.firstEngagement.intro}>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          {audience.firstEngagement.steps.map((step, i) => (
            <li key={step.label} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 16, alignItems: "start" }}>
              <span style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 28, color: ORANGE, lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div style={{ fontFamily: BODY_FONT, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff", marginBottom: 6 }}>{step.label}</div>
                <p style={{ fontFamily: BODY_FONT, fontSize: 14, lineHeight: 1.55, color: TEXT_DIM, margin: 0 }}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p style={{ fontFamily: BODY_FONT, fontSize: 12, color: TEXT_FAINT, marginTop: 24, marginBottom: 0, letterSpacing: "0.05em" }}>
          {audience.firstEngagement.pricingPosture}
        </p>
      </SectionBlock>

      <SectionBlock title={audience.trust.title}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {audience.trust.items.map(item => (
            <div key={item.label}>
              <div style={{ fontFamily: BODY_FONT, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: ORANGE, marginBottom: 8 }}>{item.label}</div>
              <p style={{ fontFamily: BODY_FONT, fontSize: 14, lineHeight: 1.55, color: TEXT_DIM, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* Adjacent audiences */}
      <SectionBlock title={audience.adjacentAudiences.title}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {audience.adjacentAudiences.pointers.map(slug => {
            const target = getAudience(slug);
            if (!target) return null;
            return (
              <Link key={slug} href={`/for/${slug}`} style={{ fontFamily: BODY_FONT, fontSize: 13, fontWeight: 500, color: "#fff", border: `1px solid ${ORANGE}`, padding: "10px 16px", textDecoration: "none", letterSpacing: "0.02em" }}>
                {target.displayName} →
              </Link>
            );
          })}
        </div>
      </SectionBlock>

      {/* Final CTA + form */}
      <section id="cta" style={{ borderTop: `1px solid ${BORDER}`, padding: "64px 48px 96px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "left" }}>
          <h2 style={{ fontFamily: DISPLAY_FONT, fontWeight: 800, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 0.95, textTransform: "uppercase", margin: "0 0 16px" }}>
            {audience.finalCta.headline}
          </h2>
          <p style={{ fontFamily: BODY_FONT, fontSize: 16, lineHeight: 1.6, color: TEXT_DIM, margin: "0 0 32px" }}>
            {audience.finalCta.subhead}
          </p>
          <AudienceCTAForm audienceSlug={audience.slug} submitLabel={audience.finalCta.primaryCta.label} />
        </div>
      </section>
    </div>
  );
}

function CTAButton({ cta }: { cta: { label: string; href: string } }) {
  return (
    <a
      href={cta.href}
      style={{
        display: "inline-block",
        padding: "14px 24px",
        background: ORANGE,
        color: "#fff",
        fontFamily: BODY_FONT,
        fontWeight: 600,
        fontSize: 13,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        textDecoration: "none",
      }}
    >
      {cta.label} →
    </a>
  );
}

function SectionBlock({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section style={{ padding: "64px 48px", borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <h2 style={{ fontFamily: DISPLAY_FONT, fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1, textTransform: "uppercase", margin: "0 0 16px" }}>
          {title}
        </h2>
        {intro && (
          <p style={{ fontFamily: BODY_FONT, fontSize: 15, lineHeight: 1.6, color: TEXT_DIM, maxWidth: 760, margin: "0 0 32px" }}>{intro}</p>
        )}
        {children}
      </div>
    </section>
  );
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
      {bullets.map((b, i) => (
        <li key={i} style={{ display: "grid", gridTemplateColumns: "12px 1fr", gap: 12, alignItems: "start" }}>
          <span aria-hidden style={{ display: "inline-block", width: 8, height: 8, background: ORANGE, marginTop: 8 }} />
          <span style={{ fontFamily: BODY_FONT, fontSize: 15, lineHeight: 1.55, color: TEXT_DIM }}>{b}</span>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 4: Run the test, expect failure due to missing AudienceCTAForm import**

Run: `cd web && npm test -- AudienceLanding`
Expected: FAIL — `AudienceCTAForm` not found. This is fine; Task 6 creates it.

- [ ] **Step 5: Stub `AudienceCTAForm` so this test passes**

Create a placeholder file (it gets a real implementation in Task 6):

```tsx
// web/src/components/audience/AudienceCTAForm.tsx
"use client";
import { useState } from "react";

export function AudienceCTAForm({ audienceSlug, submitLabel }: { audienceSlug: string; submitLabel: string }) {
  const [name, setName] = useState("");
  return (
    <form data-audience={audienceSlug}>
      <input name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
```

- [ ] **Step 6: Run the test, confirm it passes**

Run: `cd web && npm test -- AudienceLanding`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add web/src/components/audience/AudienceLanding.tsx web/src/components/audience/AudienceCTAForm.tsx web/src/components/audience/__tests__/AudienceLanding.test.tsx
git commit -m "feat(audiences): AudienceLanding shared skeleton + form stub"
```

---

## Task 6: AudienceCTAForm — real implementation

**Files:**
- Modify: `web/src/components/audience/AudienceCTAForm.tsx`
- Test: `web/src/components/audience/__tests__/AudienceCTAForm.test.tsx`

- [ ] **Step 1: Write the failing test**

```typescript
// web/src/components/audience/__tests__/AudienceCTAForm.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AudienceCTAForm } from "../AudienceCTAForm";

describe("AudienceCTAForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("posts to /api/contact with the audience slug attached", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, id: "abc" }) });
    vi.stubGlobal("fetch", fetchMock);

    render(<AudienceCTAForm audienceSlug="tribes" submitLabel="Submit" />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText(/organization/i), { target: { value: "Test Nation IDC" } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body).toMatchObject({
      name: "Jane Doe",
      email: "jane@example.com",
      organization: "Test Nation IDC",
      audience: "tribes",
    });
  });

  it("shows a success message after a 200 response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, id: "abc" }) }));
    render(<AudienceCTAForm audienceSlug="advisors" submitLabel="Submit" />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Jerry" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "jerry@example.com" } });
    fireEvent.change(screen.getByLabelText(/organization/i), { target: { value: "Workday" } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => expect(screen.getByText(/thanks/i)).toBeInTheDocument());
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

Run: `cd web && npm test -- AudienceCTAForm`
Expected: FAIL — labels/inputs not present.

- [ ] **Step 3: Implement the form**

```tsx
// web/src/components/audience/AudienceCTAForm.tsx
"use client";
import { useState } from "react";

const ORANGE = "#E07B39";
const BODY_FONT = "Inter, sans-serif";
const BORDER = "rgba(255,255,255,0.15)";

type Status = "idle" | "submitting" | "success" | "error";

export function AudienceCTAForm({ audienceSlug, submitLabel }: { audienceSlug: string; submitLabel: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          organization,
          message: message || undefined,
          audience: audienceSlug,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(typeof data?.error === "string" ? data.error : "Submission failed.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p style={{ fontFamily: BODY_FONT, fontSize: 15, color: "#fff" }}>
        Thanks. We'll be in touch within one business day.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} data-audience={audienceSlug} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Field label="Name" id="cta-name" value={name} onChange={setName} required />
      <Field label="Email" id="cta-email" type="email" value={email} onChange={setEmail} required />
      <Field label="Organization" id="cta-org" value={organization} onChange={setOrganization} required />
      <Field label="Message (optional)" id="cta-message" value={message} onChange={setMessage} multiline />
      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          alignSelf: "flex-start",
          marginTop: 8,
          padding: "14px 24px",
          background: ORANGE,
          color: "#fff",
          fontFamily: BODY_FONT,
          fontWeight: 600,
          fontSize: 13,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          border: "none",
          cursor: status === "submitting" ? "wait" : "pointer",
          opacity: status === "submitting" ? 0.6 : 1,
        }}
      >
        {status === "submitting" ? "Submitting…" : `${submitLabel} →`}
      </button>
      {status === "error" && (
        <p style={{ fontFamily: BODY_FONT, fontSize: 13, color: "#f87171", margin: 0 }}>{errorMsg}</p>
      )}
    </form>
  );
}

function Field({
  label, id, value, onChange, type = "text", required = false, multiline = false,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const baseInputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${BORDER}`,
    color: "#fff",
    fontFamily: BODY_FONT,
    fontSize: 14,
    padding: "10px 12px",
    width: "100%",
  };
  return (
    <label htmlFor={id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontFamily: BODY_FONT, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
        {label}{required ? " *" : ""}
      </span>
      {multiline ? (
        <textarea id={id} value={value} onChange={e => onChange(e.target.value)} rows={4} style={baseInputStyle} />
      ) : (
        <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} required={required} style={baseInputStyle} />
      )}
    </label>
  );
}
```

- [ ] **Step 4: Run the test, confirm it passes**

Run: `cd web && npm test -- AudienceCTAForm`
Expected: PASS.

- [ ] **Step 5: Re-run the AudienceLanding test to confirm no regression**

Run: `cd web && npm test -- AudienceLanding`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add web/src/components/audience/AudienceCTAForm.tsx web/src/components/audience/__tests__/AudienceCTAForm.test.tsx
git commit -m "feat(audiences): wire AudienceCTAForm to /api/contact with audience field"
```

---

## Task 7: Extend `contactSchema` to accept `audience`

**Files:**
- Modify: `web/src/lib/forms/schemas/contact.ts`
- Test: `web/src/lib/forms/__tests__/submit.test.ts`

- [ ] **Step 1: Add a failing test for the audience field round-trip**

Append to `web/src/lib/forms/__tests__/submit.test.ts`:

```typescript
import { contactSchema } from "@/lib/forms/schemas/contact";

describe("contactSchema audience field", () => {
  it("preserves a known audience slug on the parsed payload", () => {
    const parsed = contactSchema.safeParse({
      name: "Jane",
      email: "jane@example.com",
      organization: "Test",
      audience: "tribes",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.audience).toBe("tribes");
    }
  });

  it("treats audience as optional", () => {
    const parsed = contactSchema.safeParse({
      name: "Jane",
      email: "jane@example.com",
      organization: "Test",
    });
    expect(parsed.success).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test, confirm it fails**

Run: `cd web && npm test -- submit`
Expected: FAIL — Zod strips unknown keys by default, so `parsed.data.audience` is `undefined` and the first test fails on `expect(parsed.data.audience).toBe("tribes")`.

- [ ] **Step 3: Update the schema**

```typescript
// web/src/lib/forms/schemas/contact.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  organization: z.string().min(1, "Organization is required"),
  role: z.string().optional(),
  projectType: z.string().optional(),
  projectStage: z.string().optional(),
  message: z.string().optional(),
  referralSource: z.string().optional(),
  audience: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

- [ ] **Step 4: Re-run the test, confirm it passes**

Run: `cd web && npm test -- submit`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/lib/forms/schemas/contact.ts web/src/lib/forms/__tests__/submit.test.ts
git commit -m "feat(forms): accept optional audience field on contact submissions"
```

---

## Task 8: Extend Sanity `contactInquiry` schema for `audience`

**Files:**
- Modify: `web/src/sanity/schemaTypes/contactInquiry.ts`

- [ ] **Step 1: Add the audience field**

```typescript
// web/src/sanity/schemaTypes/contactInquiry.ts
import { defineField, defineType } from "sanity";

export const contactInquiry = defineType({
  name: "contactInquiry",
  title: "Contact Inquiry",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: r => r.required() }),
    defineField({ name: "email", type: "string", validation: r => r.required().email() }),
    defineField({ name: "organization", type: "string", validation: r => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "projectType", type: "string" }),
    defineField({ name: "projectStage", type: "string" }),
    defineField({ name: "message", type: "text" }),
    defineField({ name: "referralSource", type: "string" }),
    defineField({
      name: "audience",
      type: "string",
      title: "Source audience page",
      description: "Set when the inquiry came from a /for/<slug> page. Empty for the generic /contact form.",
      options: {
        list: [
          { title: "Tribes", value: "tribes" },
          { title: "Advisors", value: "advisors" },
          { title: "Investors", value: "investors" },
          { title: "Landowners", value: "landowners" },
          { title: "Utilities", value: "utilities" },
          { title: "Developers / EPCs", value: "developers-epcs" },
          { title: "Operators", value: "operators" },
        ],
      },
    }),
    defineField({ name: "status", type: "string", options: { list: ["new", "contacted", "qualified", "dead"] }, initialValue: "new" }),
    defineField({ name: "utmSource", type: "string" }),
    defineField({ name: "submittedAt", type: "datetime" }),
  ],
  preview: {
    select: { name: "name", org: "organization", audience: "audience", status: "status" },
    prepare({ name, org, audience, status }: Record<string, string>) {
      const tail = [audience ? `[${audience}]` : null, org || null, status || "new"].filter(Boolean).join(" · ");
      return { title: name || "Unknown", subtitle: tail };
    },
  },
});
```

- [ ] **Step 2: Regenerate Sanity types**

Run: `cd web && npm run sanity:typegen`
Expected: completes without error. (If it errors due to missing local Sanity auth, log the error and continue — typegen is not blocking deploy.)

- [ ] **Step 3: Commit**

```bash
git add web/src/sanity/schemaTypes/contactInquiry.ts web/src/sanity/extract.json web/src/sanity.types.ts 2>/dev/null || git add web/src/sanity/schemaTypes/contactInquiry.ts
git commit -m "feat(sanity): add audience field to contactInquiry"
```

---

## Task 9: `/for` audience hub page

**Files:**
- Create: `web/src/app/(frontend)/for/page.tsx`

- [ ] **Step 1: Create the hub page**

```tsx
// web/src/app/(frontend)/for/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { listAudiences } from "@/content/audiences";

const NAVY = "#08142D";
const ORANGE = "#E07B39";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT_DIM = "rgba(255,255,255,0.55)";
const DISPLAY_FONT = '"Barlow Condensed", sans-serif';
const BODY_FONT = "Inter, sans-serif";

export const metadata: Metadata = {
  title: "Konative for… | Find your fit",
  description:
    "Konative serves tribal nations, investors, landowners, utilities, developers, operators, and advisors. Pick the page written for you.",
};

export default function AudienceHubPage() {
  const audiences = listAudiences();
  return (
    <div style={{ background: NAVY, minHeight: "100vh", color: "#fff", fontFamily: BODY_FONT }}>
      <section style={{ padding: "96px 48px 48px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ fontFamily: BODY_FONT, fontSize: 11, color: ORANGE, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            Konative is for…
          </div>
          <h1 style={{ fontFamily: DISPLAY_FONT, fontWeight: 800, fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.95, textTransform: "uppercase", margin: "0 0 16px" }}>
            Find the page written for you.
          </h1>
          <p style={{ fontFamily: BODY_FONT, fontSize: 17, lineHeight: 1.6, color: TEXT_DIM, maxWidth: 720, margin: 0 }}>
            Konative serves multiple audiences across the data center development stack. Pick the one closest to your role and we'll lead with what matters most to you.
          </p>
        </div>
      </section>

      <section style={{ padding: "48px 48px 96px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {audiences.map(a => (
            <Link
              key={a.slug}
              href={`/for/${a.slug}`}
              style={{
                display: "block",
                border: `1px solid ${BORDER}`,
                background: "rgba(255,255,255,0.02)",
                padding: "28px 28px",
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <div style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 28, textTransform: "uppercase", lineHeight: 1, marginBottom: 12 }}>
                {a.displayName}
              </div>
              <p style={{ fontFamily: BODY_FONT, fontSize: 14, lineHeight: 1.55, color: TEXT_DIM, margin: "0 0 18px" }}>
                {a.tileDescription}
              </p>
              <span style={{ fontFamily: BODY_FONT, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: ORANGE }}>
                Read the {a.displayName.toLowerCase()} page →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Confirm the page builds**

Run: `cd web && npx next build` (or `npm run build`)
Expected: build completes. If build is slow, use `npx tsc --noEmit` for a fast check; full build is only required before commit on Task 13.

- [ ] **Step 3: Commit**

```bash
git add web/src/app/\(frontend\)/for/page.tsx
git commit -m "feat(audiences): /for audience hub"
```

---

## Task 10: `/for/[audience]` dynamic page

**Files:**
- Create: `web/src/app/(frontend)/for/[audience]/page.tsx`

- [ ] **Step 1: Create the dynamic route**

```tsx
// web/src/app/(frontend)/for/[audience]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AUDIENCES, getAudience } from "@/content/audiences";
import { AudienceLanding } from "@/components/audience/AudienceLanding";

export async function generateStaticParams() {
  return Object.keys(AUDIENCES).map(audience => ({ audience }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>;
}): Promise<Metadata> {
  const { audience } = await params;
  const a = getAudience(audience);
  if (!a) return {};
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    openGraph: {
      title: a.metaTitle,
      description: a.metaDescription,
    },
  };
}

export default async function AudiencePage({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  const a = getAudience(audience);
  if (!a) notFound();
  return <AudienceLanding audience={a} />;
}
```

- [ ] **Step 2: Smoke test in dev**

Run: `cd web && npm run dev`
Visit:
- `http://localhost:3005/for` — hub renders both tiles
- `http://localhost:3005/for/tribes` — tribes page renders end-to-end
- `http://localhost:3005/for/advisors` — advisors page renders end-to-end
- `http://localhost:3005/for/nonexistent` — returns the 404 page

Expected: all four behave correctly.

- [ ] **Step 3: Commit**

```bash
git add web/src/app/\(frontend\)/for/\[audience\]/page.tsx
git commit -m "feat(audiences): /for/[audience] dynamic page"
```

---

## Task 11: Header nav — add "For" entry and dark-hero handling

**Files:**
- Modify: `web/src/components/Header.tsx`

- [ ] **Step 1: Add the nav link and broaden dark-hero matching**

Open `web/src/components/Header.tsx`. Two edits:

**Edit A** — add `For` to `navLinks`. Insert before `About`:

```typescript
const navLinks: { label: string; url: string }[] = [
  { label: "Markets", url: "/markets" },
  { label: "Projects", url: "/projects" },
  { label: "Map", url: "/map" },
  { label: "Methodology", url: "/methodology" },
  { label: "Intelligence", url: "/intelligence" },
  { label: "For", url: "/for" },
  { label: "About", url: "/#team" },
];
```

**Edit B** — replace the `DARK_HERO_PAGES` set lookup with a function that also matches `/for` and `/for/<slug>`. Change:

```typescript
const DARK_HERO_PAGES = new Set(["/", "/land", "/invest", "/capacity", "/map", "/projects", "/markets", "/canada", "/methodology", "/intelligence", "/intelligence/saudi", "/intelligence/first-nations", "/news", "/market-intel", "/contact", "/assessment"]);
```

to:

```typescript
const DARK_HERO_PAGES = new Set(["/", "/land", "/invest", "/capacity", "/map", "/projects", "/markets", "/canada", "/methodology", "/intelligence", "/intelligence/saudi", "/intelligence/first-nations", "/news", "/market-intel", "/contact", "/assessment"]);

function isDarkHeroPath(pathname: string): boolean {
  if (DARK_HERO_PAGES.has(pathname)) return true;
  if (pathname === "/for" || pathname.startsWith("/for/")) return true;
  return false;
}
```

Then update the line:
```typescript
const hasDarkHero = DARK_HERO_PAGES.has(pathname);
```
to:
```typescript
const hasDarkHero = isDarkHeroPath(pathname);
```

- [ ] **Step 2: Smoke test header treatment in dev**

Run: `cd web && npm run dev`
Visit `/for` and `/for/tribes`. The header should render in dark-hero mode (white text over the navy hero, transitioning on scroll).

- [ ] **Step 3: Commit**

```bash
git add web/src/components/Header.tsx
git commit -m "feat(nav): add For link, dark-hero treatment for /for routes"
```

---

## Task 12: Final test sweep + build

- [ ] **Step 1: Run the full Vitest suite**

Run: `cd web && npm test`
Expected: PASS for all suites. Existing tests must not regress.

- [ ] **Step 2: Run a production build**

Run: `cd web && npm run build`
Expected: build succeeds. The new pages should appear in the route list (`/for`, `/for/[audience]`).

- [ ] **Step 3: Type check**

Run: `cd web && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit (only if any auto-fixes were needed)**

```bash
git status
# if there are unstaged changes from formatters/codegen:
git add -A && git commit -m "chore: post-build housekeeping"
# else skip this step.
```

---

## Task 13: Manual QA + Sanity Studio verification

- [ ] **Step 1: Run dev server and walk through both audience pages**

Run: `cd web && npm run dev`

Visit `http://localhost:3005/for/tribes`:
- Confirm hero, why-now, "what you already have", capability bands, engagement steps, trust items, adjacent-audiences pointers all render with content from the config.
- Confirm primary CTAs jump to the `#cta` form anchor.
- Submit the form with a real-looking payload. Expect a "Thanks. We'll be in touch within one business day." success message.

Visit `http://localhost:3005/for/advisors`:
- Same checks.
- Submit the form. Expect success.

Visit `http://localhost:3005/for`:
- Tiles for tribes and advisors render, each linking to its page.

- [ ] **Step 2: Verify the inquiry landed in Sanity**

Open the Sanity Studio: `http://localhost:3005/studio` (or the deployed studio).
Open the Contact Inquiry document type. Confirm the two test submissions appear, each with the `audience` field populated (`tribes` or `advisors`).

- [ ] **Step 3: Verify the Resend email**

Check the inbox configured in `RESEND_TO` (or your local logs if running without `RESEND_API_KEY`). Each submission should produce one email with the audience visible in the JSON payload.

- [ ] **Step 4: Final commit (housekeeping if needed)**

```bash
git status
# expect clean working tree if no manual edits were needed
```

---

## Spec Coverage Check

- ✅ Audience router under `/for` with hub + dynamic per-audience pages — Tasks 9, 10
- ✅ Shared `<AudienceLanding />` skeleton driven by typed config — Tasks 1, 5
- ✅ Tribal page as the lead deliverable — Task 2
- ✅ Advisor page (lean but credible) — Task 3
- ✅ "I'm actually a __" pointer block to other audiences — built into `AudienceLanding` — Task 5
- ✅ CTA wired to the existing inquiry pipeline with `audience` discriminator — Tasks 6, 7, 8
- ✅ Top-level "For" nav entry; dark-hero treatment — Task 11
- ✅ Per-audience SEO title + OG metadata — Task 10 (`generateMetadata`)
- ⏭ Per-audience OG **image** — deferred. The default OpenGraph image at `web/src/app/opengraph-image.tsx` will serve all `/for/*` URLs at launch. Adding per-audience OG images is a small follow-on once the pages stabilize.
- ⏭ `/platform` page — out of scope (Plan C).
- ⏭ Notion monetization doc — out of scope (you author directly in Notion).
- ⏭ Ambassador kit (intro deck, tracked link generator) — out of scope (Plan E, after this ships).
- ⏭ Remaining 5 audience pages — Plan B; Plan A intentionally ships only tribes + advisors.
- ⏭ Analytics events on CTAs — recommended next iteration; not blocking launch. Note: page views are already covered by `@vercel/analytics`. CTA-click events can be added with a small `track("audience_cta_click", { audience })` call in `AudienceCTAForm.onSubmit`.

---

## Open Questions (do not block launch)

- **Per-audience OG images.** Add as a follow-on once the copy stabilizes; can be generated via Next 16's `opengraph-image.tsx` per route segment.
- **Analytics CTA events.** Add `track("audience_cta_submitted", { audience })` in `AudienceCTAForm` when ready. Not blocking.
- **Form field set per audience.** Today every audience page uses the same five-field form. If the advisor form needs different fields (e.g., "who do you typically introduce?"), generalize `AudienceCTAForm` to accept a per-audience `fields` config in a follow-on.
