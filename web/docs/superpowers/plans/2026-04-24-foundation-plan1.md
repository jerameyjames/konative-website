# Konative Brokerage Rebuild — Plan 1: Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all broken forms, build the shared submission pipeline, add five lead-capture Sanity schemas, build the landholder four-step funnel, add placeholder investor + occupier doors, update the header nav, and seed news sources — so every lead that hits the site is captured and the intelligence pipeline is running.

**Architecture:** All form submissions flow through a single `src/lib/forms/submit.ts` module that validates with Zod, persists to Sanity (source of truth), then fires a Resend notification. Pages for `/land/*`, `/invest`, `/capacity` use two new shared UI components (`FormShell`, `StepForm`). The existing `/api/ingest-news` + `newsIngestion.ts` machinery is already correct; this plan adds a seed script to populate `newsSource` documents in Sanity so the pipeline has sources to fetch.

**Tech Stack:** Next.js 16, Sanity (write client already wired), Zod (new dep), Resend, Vitest (new dev dep for pipeline unit tests), TypeScript

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `src/sanity/schemaTypes/landSubmission.ts` | Sanity schema for landholder intake |
| Create | `src/sanity/schemaTypes/investorProfile.ts` | Sanity schema for investor intake |
| Create | `src/sanity/schemaTypes/capacityRequest.ts` | Sanity schema for occupier RFP |
| Create | `src/sanity/schemaTypes/contactInquiry.ts` | Sanity schema for general contact (replaces no-persist route) |
| Create | `src/sanity/schemaTypes/newsletterSubscriber.ts` | Sanity schema for newsletter subs (Supabase-independent) |
| Create | `src/sanity/schemaTypes/marketReport.ts` | Sanity schema for metro market reports |
| Modify | `src/sanity/schemaTypes/index.ts` | Register all six new schemas |
| Create | `src/lib/forms/schemas/land.ts` | Zod schema for land intake (4 steps) |
| Create | `src/lib/forms/schemas/investor.ts` | Zod schema for investor profile |
| Create | `src/lib/forms/schemas/capacity.ts` | Zod schema for occupier RFP |
| Create | `src/lib/forms/schemas/contact.ts` | Zod schema for general contact |
| Create | `src/lib/forms/schemas/newsletter.ts` | Zod schema for newsletter subscribe |
| Create | `src/lib/forms/submit.ts` | Shared submission pipeline (validate → persist → notify) |
| Create | `src/components/ui/FormShell.tsx` | Shared form wrapper (label, input, textarea, select, error, submit) |
| Create | `src/components/ui/StepForm.tsx` | Multi-step wizard wrapper |
| Modify | `src/app/(frontend)/api/contact/route.ts` | Rewrite to use shared pipeline |
| Modify | `src/app/(frontend)/api/newsletter/subscribe/route.ts` | Rewrite Sanity-first, Supabase optional |
| Create | `src/app/(frontend)/api/land/submit/route.ts` | Land intake API |
| Create | `src/app/(frontend)/api/investor/submit/route.ts` | Investor intake API |
| Create | `src/app/(frontend)/api/capacity/submit/route.ts` | Capacity RFP API |
| Create | `src/app/(frontend)/land/page.tsx` | Land hub page |
| Create | `src/app/(frontend)/land/submit/page.tsx` | 4-step land intake form |
| Create | `src/app/(frontend)/land/process/page.tsx` | Post-submit confirmation + timeline |
| Create | `src/app/(frontend)/land/what-its-worth/page.tsx` | Valuation framework explainer |
| Create | `src/app/(frontend)/invest/page.tsx` | Investor placeholder door |
| Create | `src/app/(frontend)/capacity/page.tsx` | Occupier placeholder door |
| Modify | `src/components/Header.tsx` | Update nav links to Land/Invest/Capacity/Intel/Services/About + rust CTA |
| Modify | `vercel.json` | Add daily ingest cron |
| Create | `scripts/seed-news-sources.ts` | Seed 12 newsSource docs into Sanity |
| Create | `src/lib/forms/__tests__/submit.test.ts` | Unit tests for submit pipeline |
| Create | `vitest.config.ts` | Vitest configuration |

---

## Task 1: Add Zod and Vitest

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install dependencies**

From `web/`:
```bash
npm install zod
npm install -D vitest @vitest/coverage-v8
```

- [ ] **Step 2: Create vitest config**

Create `web/vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/__tests__/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 3: Add test script to package.json**

In `web/package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Verify vitest runs (no tests yet)**

```bash
cd web && npm test
```
Expected: `No test files found` (exit 0 or 1 depending on vitest version — no crash).

---

## Task 2: New Sanity Schemas — Lead Capture

**Files:**
- Create: `src/sanity/schemaTypes/landSubmission.ts`
- Create: `src/sanity/schemaTypes/investorProfile.ts`
- Create: `src/sanity/schemaTypes/capacityRequest.ts`
- Create: `src/sanity/schemaTypes/contactInquiry.ts`
- Create: `src/sanity/schemaTypes/newsletterSubscriber.ts`

- [ ] **Step 1: Create `landSubmission.ts`**

Create `web/src/sanity/schemaTypes/landSubmission.ts`:
```typescript
import { defineField, defineType } from "sanity";

export const landSubmission = defineType({
  name: "landSubmission",
  title: "Land Submission",
  type: "document",
  fields: [
    // Step 1 — Property
    defineField({ name: "county", title: "County", type: "string", validation: r => r.required() }),
    defineField({ name: "state", title: "State", type: "string", validation: r => r.required() }),
    defineField({ name: "apn", title: "Parcel APN", type: "string" }),
    defineField({ name: "acreage", title: "Acreage", type: "number", validation: r => r.required().positive() }),
    defineField({
      name: "ownershipType",
      title: "Ownership Type",
      type: "string",
      options: { list: ["sole", "partnership", "trust", "llc", "other"] },
    }),
    defineField({ name: "hasTalkedToBrokers", title: "Talked to other brokers?", type: "boolean" }),
    // Step 2 — Power & Infrastructure
    defineField({ name: "substationDistanceMiles", title: "Distance to substation (miles)", type: "number" }),
    defineField({
      name: "transmissionVoltage",
      title: "Transmission voltage",
      type: "string",
      options: { list: ["<115kV", "115-230kV", "230-500kV", "500+kV", "unknown"] },
    }),
    defineField({ name: "fiberDistanceMiles", title: "Distance to fiber (miles)", type: "number" }),
    defineField({
      name: "waterAccess",
      title: "Water access",
      type: "string",
      options: { list: ["yes", "no", "unknown"] },
    }),
    defineField({
      name: "zoning",
      title: "Zoning",
      type: "string",
      options: { list: ["agricultural", "industrial", "mixed", "unknown"] },
    }),
    // Step 3 — Intent
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "string",
      options: { list: ["now", "6months", "12months", "exploring"] },
    }),
    defineField({ name: "priceExpectation", title: "Price expectation", type: "string" }),
    defineField({
      name: "preferredStructure",
      title: "Preferred structure",
      type: "string",
      options: { list: ["sell", "ground-lease", "jv", "open"] },
    }),
    // Step 4 — Contact
    defineField({ name: "name", title: "Name", type: "string", validation: r => r.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: r => r.required().email() }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: { list: ["owner", "agent", "family-rep", "other"] },
    }),
    defineField({ name: "referralSource", title: "Referral source", type: "string" }),
    // Meta
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["new", "contacted", "qualified", "dead"] },
      initialValue: "new",
    }),
    defineField({ name: "utmSource", type: "string", title: "UTM Source" }),
    defineField({ name: "utmMedium", type: "string", title: "UTM Medium" }),
    defineField({ name: "submittedAt", type: "datetime", title: "Submitted At" }),
  ],
  preview: {
    select: { name: "name", county: "county", state: "state", status: "status" },
    prepare({ name, county, state, status }) {
      return { title: name || "Unknown", subtitle: `${county || ""}, ${state || ""} · ${status || "new"}` };
    },
  },
});
```

- [ ] **Step 2: Create `investorProfile.ts`**

Create `web/src/sanity/schemaTypes/investorProfile.ts`:
```typescript
import { defineField, defineType } from "sanity";

export const investorProfile = defineType({
  name: "investorProfile",
  title: "Investor Profile",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: r => r.required() }),
    defineField({ name: "firm", type: "string" }),
    defineField({ name: "email", type: "string", validation: r => r.required().email() }),
    defineField({ name: "phone", type: "string" }),
    defineField({
      name: "aumBand",
      title: "AUM Band",
      type: "string",
      options: { list: ["<$100M", "$100M-$500M", "$500M-$2B", "$2B-$10B", "$10B+"] },
    }),
    defineField({
      name: "checkSize",
      title: "Check Size",
      type: "string",
      options: { list: ["<$10M", "$10M-$50M", "$50M-$200M", "$200M-$1B", "$1B+"] },
    }),
    defineField({
      name: "assetPreferences",
      title: "Asset Preferences",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ["powered-land", "stabilized-colo", "development-jv", "platform"] },
    }),
    defineField({ name: "geographyPreferences", title: "Geography", type: "text" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["new", "contacted", "qualified", "dead"] },
      initialValue: "new",
    }),
    defineField({ name: "utmSource", type: "string" }),
    defineField({ name: "utmMedium", type: "string" }),
    defineField({ name: "submittedAt", type: "datetime" }),
  ],
  preview: {
    select: { name: "name", firm: "firm", status: "status" },
    prepare({ name, firm, status }) {
      return { title: name || "Unknown", subtitle: `${firm || ""} · ${status || "new"}` };
    },
  },
});
```

- [ ] **Step 3: Create `capacityRequest.ts`**

Create `web/src/sanity/schemaTypes/capacityRequest.ts`:
```typescript
import { defineField, defineType } from "sanity";

export const capacityRequest = defineType({
  name: "capacityRequest",
  title: "Capacity Request",
  type: "document",
  fields: [
    defineField({ name: "company", type: "string", validation: r => r.required() }),
    defineField({ name: "name", type: "string", validation: r => r.required() }),
    defineField({ name: "email", type: "string", validation: r => r.required().email() }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "mwRequired", title: "MW Required", type: "number" }),
    defineField({ name: "targetOnlineDate", type: "string" }),
    defineField({
      name: "marketPreferences",
      title: "Target Markets",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "workloadType",
      title: "Workload Type",
      type: "string",
      options: { list: ["training", "inference", "general-compute", "colocation"] },
    }),
    defineField({ name: "connectivityNeeds", type: "text" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["new", "contacted", "qualified", "dead"] },
      initialValue: "new",
    }),
    defineField({ name: "utmSource", type: "string" }),
    defineField({ name: "utmMedium", type: "string" }),
    defineField({ name: "submittedAt", type: "datetime" }),
  ],
  preview: {
    select: { company: "company", name: "name", mw: "mwRequired", status: "status" },
    prepare({ company, name, mw, status }) {
      return { title: company || name || "Unknown", subtitle: `${mw ? mw + "MW" : ""} · ${status || "new"}` };
    },
  },
});
```

- [ ] **Step 4: Create `contactInquiry.ts`**

Create `web/src/sanity/schemaTypes/contactInquiry.ts`:
```typescript
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
      name: "status",
      type: "string",
      options: { list: ["new", "contacted", "qualified", "dead"] },
      initialValue: "new",
    }),
    defineField({ name: "utmSource", type: "string" }),
    defineField({ name: "submittedAt", type: "datetime" }),
  ],
  preview: {
    select: { name: "name", org: "organization", status: "status" },
    prepare({ name, org, status }) {
      return { title: name || "Unknown", subtitle: `${org || ""} · ${status || "new"}` };
    },
  },
});
```

- [ ] **Step 5: Create `newsletterSubscriber.ts`**

Create `web/src/sanity/schemaTypes/newsletterSubscriber.ts`:
```typescript
import { defineField, defineType } from "sanity";

export const newsletterSubscriber = defineType({
  name: "newsletterSubscriber",
  title: "Newsletter Subscriber",
  type: "document",
  fields: [
    defineField({ name: "email", type: "string", validation: r => r.required().email() }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "source", type: "string" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["active", "unsubscribed"] },
      initialValue: "active",
    }),
    defineField({ name: "utmSource", type: "string" }),
    defineField({ name: "utmMedium", type: "string" }),
    defineField({ name: "subscribedAt", type: "datetime" }),
  ],
  preview: {
    select: { email: "email", source: "source", status: "status" },
    prepare({ email, source, status }) {
      return { title: email || "Unknown", subtitle: `${source || ""} · ${status || "active"}` };
    },
  },
});
```

- [ ] **Step 6: Verify no TypeScript errors so far**

```bash
cd web && npx tsc --noEmit --skipLibCheck 2>&1 | head -20
```
Expected: no errors in new schema files (they're plain Sanity types).

---

## Task 3: New Sanity Schema — Market Report

**Files:**
- Create: `src/sanity/schemaTypes/marketReport.ts`

- [ ] **Step 1: Create `marketReport.ts`**

Create `web/src/sanity/schemaTypes/marketReport.ts`:
```typescript
import { defineField, defineType } from "sanity";

export const marketReport = defineType({
  name: "marketReport",
  title: "Market Report",
  type: "document",
  fields: [
    defineField({ name: "metro", type: "string", title: "Metro Name", validation: r => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "metro", maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({ name: "state", type: "string" }),
    defineField({ name: "country", type: "string", options: { list: ["us", "ca"] }, initialValue: "us" }),
    defineField({ name: "powerAvailability", title: "Power availability summary", type: "text" }),
    defineField({ name: "pricingRange", title: "Pricing range ($/kW-mo)", type: "string" }),
    defineField({ name: "vacancyNotes", title: "Vacancy notes", type: "text" }),
    defineField({ name: "plannedCapacity", title: "Planned capacity notes", type: "text" }),
    defineField({ name: "transmissionConstraints", title: "Transmission constraints", type: "text" }),
    defineField({ name: "keyUtilities", title: "Key utilities", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "notableTransactions", title: "Notable transactions", type: "text" }),
    defineField({ name: "whatWeAreHearing", title: "What we're hearing", type: "text" }),
    defineField({ name: "lastUpdated", type: "date" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["draft", "published"] },
      initialValue: "draft",
    }),
  ],
  preview: {
    select: { metro: "metro", country: "country", status: "status" },
    prepare({ metro, country, status }) {
      return { title: metro || "Unknown", subtitle: `${country?.toUpperCase() || ""} · ${status || "draft"}` };
    },
  },
});
```

---

## Task 4: Register All New Schemas

**Files:**
- Modify: `src/sanity/schemaTypes/index.ts`

- [ ] **Step 1: Add imports and register**

Replace `web/src/sanity/schemaTypes/index.ts` with:
```typescript
import type { SchemaTypeDefinition } from "sanity";

import { capacityRequest } from "./capacityRequest";
import { contactInquiry } from "./contactInquiry";
import { deal } from "./deal";
import { ingestionRun } from "./ingestionRun";
import { investorProfile } from "./investorProfile";
import { landSubmission } from "./landSubmission";
import { marketIntelPost } from "./marketIntelPost";
import { marketReport } from "./marketReport";
import { navigation } from "./navigation";
import { newsletterSubscriber } from "./newsletterSubscriber";
import { newsItem } from "./newsItem";
import { newsSource } from "./newsSource";
import { page } from "./page";
import { seoDefaults } from "./seoDefaults";
import { service } from "./service";
import { siteSettings } from "./siteSettings";
import { teamMember } from "./teamMember";
import { testimonial } from "./testimonial";
import { theme } from "./theme";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Lead capture
  landSubmission,
  investorProfile,
  capacityRequest,
  contactInquiry,
  newsletterSubscriber,
  // Intelligence
  newsSource,
  newsItem,
  ingestionRun,
  marketReport,
  marketIntelPost,
  deal,
  // Site structure
  page,
  service,
  testimonial,
  teamMember,
  siteSettings,
  navigation,
  theme,
  seoDefaults,
];
```

- [ ] **Step 2: Type check**

```bash
cd web && npx tsc --noEmit --skipLibCheck 2>&1 | head -20
```
Expected: no errors.

- [ ] **Step 3: Commit schemas**

```bash
git add web/src/sanity/schemaTypes/ && git commit -m "feat(sanity): add lead-capture and market-report schemas"
```

---

## Task 5: Zod Form Schemas

**Files:**
- Create: `src/lib/forms/schemas/land.ts`
- Create: `src/lib/forms/schemas/investor.ts`
- Create: `src/lib/forms/schemas/capacity.ts`
- Create: `src/lib/forms/schemas/contact.ts`
- Create: `src/lib/forms/schemas/newsletter.ts`

- [ ] **Step 1: Create `land.ts`**

Create `web/src/lib/forms/schemas/land.ts`:
```typescript
import { z } from "zod";

export const landStep1Schema = z.object({
  county: z.string().min(1, "County is required"),
  state: z.string().min(2, "State is required"),
  apn: z.string().optional(),
  acreage: z.number({ invalid_type_error: "Enter a number" }).positive("Must be positive"),
  ownershipType: z.enum(["sole", "partnership", "trust", "llc", "other"]).optional(),
  hasTalkedToBrokers: z.boolean().optional(),
});

export const landStep2Schema = z.object({
  substationDistanceMiles: z.number({ invalid_type_error: "Enter a number" }).nonnegative().optional(),
  transmissionVoltage: z.enum(["<115kV", "115-230kV", "230-500kV", "500+kV", "unknown"]).optional(),
  fiberDistanceMiles: z.number({ invalid_type_error: "Enter a number" }).nonnegative().optional(),
  waterAccess: z.enum(["yes", "no", "unknown"]).optional(),
  zoning: z.enum(["agricultural", "industrial", "mixed", "unknown"]).optional(),
});

export const landStep3Schema = z.object({
  timeline: z.enum(["now", "6months", "12months", "exploring"]).optional(),
  priceExpectation: z.string().optional(),
  preferredStructure: z.enum(["sell", "ground-lease", "jv", "open"]).optional(),
});

export const landStep4Schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  role: z.enum(["owner", "agent", "family-rep", "other"]).optional(),
  referralSource: z.string().optional(),
});

export const landFullSchema = landStep1Schema
  .merge(landStep2Schema)
  .merge(landStep3Schema)
  .merge(landStep4Schema);

export type LandFormData = z.infer<typeof landFullSchema>;
```

- [ ] **Step 2: Create `investor.ts`**

Create `web/src/lib/forms/schemas/investor.ts`:
```typescript
import { z } from "zod";

export const investorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  firm: z.string().optional(),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  aumBand: z.enum(["<$100M", "$100M-$500M", "$500M-$2B", "$2B-$10B", "$10B+"]).optional(),
  checkSize: z.enum(["<$10M", "$10M-$50M", "$50M-$200M", "$200M-$1B", "$1B+"]).optional(),
  assetPreferences: z.array(z.enum(["powered-land", "stabilized-colo", "development-jv", "platform"])).optional(),
  geographyPreferences: z.string().optional(),
});

export type InvestorFormData = z.infer<typeof investorSchema>;
```

- [ ] **Step 3: Create `capacity.ts`**

Create `web/src/lib/forms/schemas/capacity.ts`:
```typescript
import { z } from "zod";

export const capacitySchema = z.object({
  company: z.string().min(1, "Company is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  mwRequired: z.number({ invalid_type_error: "Enter a number" }).positive().optional(),
  targetOnlineDate: z.string().optional(),
  marketPreferences: z.array(z.string()).optional(),
  workloadType: z.enum(["training", "inference", "general-compute", "colocation"]).optional(),
  connectivityNeeds: z.string().optional(),
});

export type CapacityFormData = z.infer<typeof capacitySchema>;
```

- [ ] **Step 4: Create `contact.ts`**

Create `web/src/lib/forms/schemas/contact.ts`:
```typescript
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
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

- [ ] **Step 5: Create `newsletter.ts`**

Create `web/src/lib/forms/schemas/newsletter.ts`:
```typescript
import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Valid email required"),
  name: z.string().optional(),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
```

---

## Task 6: Shared Submission Pipeline

**Files:**
- Create: `src/lib/forms/submit.ts`
- Create: `src/lib/forms/__tests__/submit.test.ts`

- [ ] **Step 1: Write the failing test first**

Create `web/src/lib/forms/__tests__/submit.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { z } from "zod";

// Mock Sanity write client
vi.mock("@/sanity/writeClient", () => ({
  getSanityWriteClient: () => ({
    create: vi.fn().mockResolvedValue({ _id: "mock-id-123" }),
  }),
}));

// Mock Resend fetch
const mockFetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
vi.stubGlobal("fetch", mockFetch);

// Import after mocks
const { submitForm } = await import("@/lib/forms/submit");

const testSchema = z.object({ name: z.string().min(1), email: z.string().email() });

describe("submitForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = "test-key";
    process.env.RESEND_FROM = "test@example.com";
    process.env.RESEND_TO = "owner@example.com";
  });

  it("returns ok:true with an id when valid data is submitted", async () => {
    const result = await submitForm({
      schemaType: "contactInquiry",
      zodSchema: testSchema,
      payload: { name: "Jane Doe", email: "jane@example.com" },
      emailSubject: "Test Contact",
    });
    expect(result.ok).toBe(true);
    expect(result.id).toBe("mock-id-123");
  });

  it("returns ok:false with errors when validation fails", async () => {
    const result = await submitForm({
      schemaType: "contactInquiry",
      zodSchema: testSchema,
      payload: { name: "", email: "not-an-email" },
      emailSubject: "Test Contact",
    });
    expect(result.ok).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors!.length).toBeGreaterThan(0);
  });

  it("still returns ok:true if Resend key is missing (no crash)", async () => {
    delete process.env.RESEND_API_KEY;
    const result = await submitForm({
      schemaType: "contactInquiry",
      zodSchema: testSchema,
      payload: { name: "Jane Doe", email: "jane@example.com" },
      emailSubject: "Test Contact",
    });
    expect(result.ok).toBe(true);
    expect(result.id).toBe("mock-id-123");
  });
});
```

- [ ] **Step 2: Run test — confirm it fails (module not found)**

```bash
cd web && npm test 2>&1 | tail -10
```
Expected: error like `Cannot find module '@/lib/forms/submit'`

- [ ] **Step 3: Create `submit.ts`**

Create `web/src/lib/forms/submit.ts`:
```typescript
import { z, ZodSchema } from "zod";
import { getSanityWriteClient } from "@/sanity/writeClient";

export type SubmitResult =
  | { ok: true; id: string }
  | { ok: false; errors: { path: string; message: string }[] }
  | { ok: false; errors: undefined; message: string };

export interface SubmitOptions<T> {
  schemaType: string;
  zodSchema: ZodSchema<T>;
  payload: unknown;
  emailSubject: string;
  emailHtml?: string;
}

/** Validate, persist to Sanity, then notify via Resend. */
export async function submitForm<T extends Record<string, unknown>>(
  options: SubmitOptions<T>
): Promise<SubmitResult> {
  const { schemaType, zodSchema, payload, emailSubject, emailHtml } = options;

  // 1. Validate
  const parsed = zodSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.errors.map(e => ({
        path: e.path.join("."),
        message: e.message,
      })),
    };
  }

  // 2. Persist to Sanity (source of truth — always first)
  let docId: string;
  try {
    const client = getSanityWriteClient();
    const doc = await client.create({
      _type: schemaType,
      ...parsed.data,
      submittedAt: new Date().toISOString(),
    });
    docId = doc._id;
  } catch (err) {
    console.error(`[submitForm] Sanity write failed for ${schemaType}:`, err);
    return {
      ok: false,
      errors: undefined,
      message: "Failed to save submission. Please try again.",
    };
  }

  // 3. Notify via Resend (non-blocking, loud-fail in logs but don't surface to user)
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO || "jeramey.james@gmail.com";
  const from = process.env.RESEND_FROM || "Konative <team@konative.com>";

  if (!apiKey) {
    console.warn(`[submitForm] RESEND_API_KEY not set — skipping email for ${schemaType} (doc ${docId})`);
  } else {
    const html =
      emailHtml ||
      `<h2>${emailSubject}</h2><pre>${JSON.stringify(parsed.data, null, 2)}</pre><p>Sanity doc: ${docId}</p>`;
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject: emailSubject, html }),
    }).catch(err => console.error(`[submitForm] Resend error for ${schemaType}:`, err));
  }

  return { ok: true, id: docId };
}
```

- [ ] **Step 4: Run tests — confirm all three pass**

```bash
cd web && npm test 2>&1 | tail -15
```
Expected: `3 passed`

- [ ] **Step 5: Commit**

```bash
git add web/src/lib/forms/ web/vitest.config.ts web/package.json web/package-lock.json && \
git commit -m "feat(forms): shared submit pipeline with Zod validation + Sanity persistence"
```

---

## Task 7: FormShell UI Component

**Files:**
- Create: `src/components/ui/FormShell.tsx`
- Modify: `src/app/(frontend)/globals.css`

- [ ] **Step 1: Create `FormShell.tsx`**

Create `web/src/components/ui/FormShell.tsx`:
```typescript
"use client";

import React from "react";

interface FieldProps {
  label: string;
  name: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, name, error, helpText, required, children }: FieldProps) {
  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={name}>
        {label}
        {required && <span className="form-field__required" aria-hidden="true"> *</span>}
      </label>
      {children}
      {helpText && !error && <p className="form-field__help">{helpText}</p>}
      {error && <p className="form-field__error" role="alert">{error}</p>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}
export function FormInput({ name, ...props }: InputProps) {
  return <input id={name} name={name} className="form-field__input" {...props} />;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}
export function FormTextarea({ name, ...props }: TextareaProps) {
  return <textarea id={name} name={name} className="form-field__textarea" {...props} />;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: { label: string; value: string }[];
  placeholder?: string;
}
export function FormSelect({ name, options, placeholder, ...props }: SelectProps) {
  return (
    <select id={name} name={name} className="form-field__select" {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

type SubmitState = "idle" | "loading" | "success" | "error";

interface FormShellProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitState: SubmitState;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  children: React.ReactNode;
}

export function FormShell({
  onSubmit,
  submitState,
  submitLabel = "Submit",
  successMessage = "Submitted successfully.",
  errorMessage,
  children,
}: FormShellProps) {
  if (submitState === "success") {
    return (
      <div className="form-shell__success" role="status">
        <p>{successMessage}</p>
      </div>
    );
  }

  return (
    <form className="form-shell" onSubmit={onSubmit} noValidate>
      {children}
      {submitState === "error" && errorMessage && (
        <p className="form-shell__error" role="alert">{errorMessage}</p>
      )}
      <button
        type="submit"
        className="form-shell__submit"
        disabled={submitState === "loading"}
      >
        {submitState === "loading" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Add CSS to `globals.css`**

Append to the end of `web/src/app/(frontend)/globals.css`:
```css
/* ============================================================
   Form shell shared styles
   ============================================================ */

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}

.form-field__label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.form-field__required {
  color: var(--orange);
}

.form-field__input,
.form-field__textarea,
.form-field__select {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text);
  background: #fff;
  border: 1.5px solid var(--color-divider);
  border-radius: 6px;
  padding: 10px 14px;
  transition: border-color 0.15s;
  width: 100%;
}

.form-field__input:focus,
.form-field__textarea:focus,
.form-field__select:focus {
  outline: none;
  border-color: var(--orange);
}

.form-field__textarea {
  min-height: 100px;
  resize: vertical;
}

.form-field__help {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin: 0;
}

.form-field__error {
  font-size: var(--text-sm);
  color: #c0392b;
  margin: 0;
}

.form-shell {
  display: flex;
  flex-direction: column;
}

.form-shell__submit {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 700;
  background: var(--orange);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 13px 28px;
  cursor: pointer;
  transition: background 0.15s;
  align-self: flex-start;
  margin-top: 8px;
}

.form-shell__submit:hover {
  background: var(--orange-dark);
}

.form-shell__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-shell__error {
  color: #c0392b;
  font-size: var(--text-sm);
  margin-bottom: 12px;
}

.form-shell__success {
  background: #f0faf0;
  border: 1.5px solid #2ecc71;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  color: #1a7a3a;
  font-weight: 600;
}
```

- [ ] **Step 3: Type check**

```bash
cd web && npx tsc --noEmit --skipLibCheck 2>&1 | head -20
```
Expected: no errors.

---

## Task 8: StepForm UI Component

**Files:**
- Create: `src/components/ui/StepForm.tsx`

- [ ] **Step 1: Create `StepForm.tsx`**

Create `web/src/components/ui/StepForm.tsx`:
```typescript
"use client";

import React, { useState } from "react";

interface StepFormProps {
  steps: { title: string; content: React.ReactNode }[];
  onComplete: (allData: Record<string, unknown>) => void;
  onStepValidate?: (stepIndex: number, data: FormData) => { valid: boolean; errors: Record<string, string> };
  submitState: "idle" | "loading" | "success" | "error";
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function StepForm({
  steps,
  onComplete,
  submitState,
  submitLabel = "Submit",
  successMessage = "Thank you — we'll be in touch within one business day.",
  errorMessage,
}: StepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [collectedData, setCollectedData] = useState<Record<string, unknown>>({});

  const isLast = currentStep === steps.length - 1;

  function handleNext(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const stepData: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      // Handle multi-select checkboxes
      if (stepData[key] !== undefined) {
        stepData[key] = [...(Array.isArray(stepData[key]) ? stepData[key] : [stepData[key]]), value];
      } else {
        stepData[key] = value;
      }
    });

    const merged = { ...collectedData, ...stepData };
    setCollectedData(merged);

    if (isLast) {
      onComplete(merged);
    } else {
      setCurrentStep(s => s + 1);
    }
  }

  function handleBack() {
    setCurrentStep(s => Math.max(0, s - 1));
  }

  if (submitState === "success") {
    return (
      <div className="step-form__success" role="status">
        <div className="step-form__success-icon">✓</div>
        <p>{successMessage}</p>
      </div>
    );
  }

  return (
    <div className="step-form">
      {/* Progress indicator */}
      <div className="step-form__progress" aria-label={`Step ${currentStep + 1} of ${steps.length}`}>
        {steps.map((step, i) => (
          <div key={i} className={`step-form__pip ${i <= currentStep ? "step-form__pip--active" : ""}`}>
            <span className="step-form__pip-num">{i + 1}</span>
            <span className="step-form__pip-label">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Current step */}
      <form className="step-form__form" onSubmit={handleNext} noValidate>
        <div className="step-form__fields">
          {steps[currentStep].content}
        </div>

        {submitState === "error" && errorMessage && (
          <p className="step-form__error" role="alert">{errorMessage}</p>
        )}

        <div className="step-form__actions">
          {currentStep > 0 && (
            <button type="button" className="step-form__back" onClick={handleBack}>
              ← Back
            </button>
          )}
          <button
            type="submit"
            className="step-form__next"
            disabled={submitState === "loading"}
          >
            {submitState === "loading"
              ? "Sending…"
              : isLast
              ? submitLabel
              : "Next →"}
          </button>
        </div>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Add StepForm CSS to `globals.css`**

Append to `web/src/app/(frontend)/globals.css`:
```css
/* ============================================================
   StepForm multi-step wizard
   ============================================================ */

.step-form {
  width: 100%;
}

.step-form__progress {
  display: flex;
  gap: 4px;
  margin-bottom: 36px;
}

.step-form__pip {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 6px;
}

.step-form__pip-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-divider);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
}

.step-form__pip--active .step-form__pip-num {
  background: var(--orange);
  color: #fff;
}

.step-form__pip-label {
  font-size: 11px;
  color: var(--color-text-muted);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.step-form__pip--active .step-form__pip-label {
  color: var(--orange);
  font-weight: 600;
}

.step-form__form {
  display: flex;
  flex-direction: column;
}

.step-form__fields {
  display: flex;
  flex-direction: column;
}

.step-form__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.step-form__back {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}

.step-form__next {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 700;
  background: var(--orange);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 13px 28px;
  cursor: pointer;
  transition: background 0.15s;
}

.step-form__next:hover {
  background: var(--orange-dark);
}

.step-form__next:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.step-form__error {
  color: #c0392b;
  font-size: var(--text-sm);
  margin-bottom: 12px;
}

.step-form__success {
  background: #f0faf0;
  border: 1.5px solid #2ecc71;
  border-radius: 8px;
  padding: 40px 24px;
  text-align: center;
  color: #1a7a3a;
}

.step-form__success-icon {
  font-size: 48px;
  margin-bottom: 12px;
}
```

- [ ] **Step 3: Commit UI components**

```bash
git add web/src/components/ui/ web/src/app/\(frontend\)/globals.css && \
git commit -m "feat(ui): FormShell and StepForm components with design-token CSS"
```

---

## Task 9: Rewrite `/api/contact`

**Files:**
- Modify: `src/app/(frontend)/api/contact/route.ts`

- [ ] **Step 1: Rewrite the route**

Replace `web/src/app/(frontend)/api/contact/route.ts`:
```typescript
import { NextResponse } from "next/server";
import { submitForm } from "@/lib/forms/submit";
import { contactSchema } from "@/lib/forms/schemas/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = await submitForm({
    schemaType: "contactInquiry",
    zodSchema: contactSchema,
    payload: body,
    emailSubject: `New Konative Contact: ${(body as Record<string, string>)?.name ?? "Unknown"} from ${(body as Record<string, string>)?.organization ?? "Unknown"}`,
  });

  if (!result.ok) {
    if ("errors" in result && result.errors) {
      return NextResponse.json({ error: "Validation failed", errors: result.errors }, { status: 400 });
    }
    return NextResponse.json({ error: (result as { message?: string }).message ?? "Submission failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: result.id });
}
```

- [ ] **Step 2: Type check**

```bash
cd web && npx tsc --noEmit --skipLibCheck 2>&1 | grep "contact" | head -10
```
Expected: no errors.

---

## Task 10: Rewrite `/api/newsletter/subscribe`

**Files:**
- Modify: `src/app/(frontend)/api/newsletter/subscribe/route.ts`

- [ ] **Step 1: Rewrite the route**

Replace `web/src/app/(frontend)/api/newsletter/subscribe/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { submitForm } from "@/lib/forms/submit";
import { newsletterSchema } from "@/lib/forms/schemas/newsletter";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = await submitForm({
    schemaType: "newsletterSubscriber",
    zodSchema: newsletterSchema,
    payload: body,
    emailSubject: `New newsletter subscriber: ${(body as Record<string, string>)?.email ?? "unknown"}`,
  });

  if (!result.ok) {
    if ("errors" in result && result.errors) {
      return NextResponse.json({ error: "Validation failed", errors: result.errors }, { status: 400 });
    }
    return NextResponse.json({ error: (result as { message?: string }).message ?? "Subscription failed" }, { status: 500 });
  }

  // Optional: Beehiiv sync (non-blocking, never breaks the response)
  const beehiivKey = process.env.BEEHIIV_API_KEY;
  const beehiivPub = process.env.BEEHIIV_PUBLICATION_ID;
  const parsedBody = body as Record<string, string>;
  if (beehiivKey && beehiivPub && parsedBody.email) {
    fetch(`https://api.beehiiv.com/v2/publications/${beehiivPub}/subscriptions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${beehiivKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: parsedBody.email.toLowerCase().trim(),
        utm_source: parsedBody.utmSource || parsedBody.source || "website",
        utm_medium: parsedBody.utmMedium || "organic",
      }),
    }).catch(err => console.error("[newsletter] Beehiiv sync error:", err));
  }

  return NextResponse.json({ success: true, message: "Subscribed!" });
}
```

- [ ] **Step 2: Type check**

```bash
cd web && npx tsc --noEmit --skipLibCheck 2>&1 | grep "newsletter" | head -10
```
Expected: no errors.

---

## Task 11: New Lead API Routes

**Files:**
- Create: `src/app/(frontend)/api/land/submit/route.ts`
- Create: `src/app/(frontend)/api/investor/submit/route.ts`
- Create: `src/app/(frontend)/api/capacity/submit/route.ts`

- [ ] **Step 1: Create `/api/land/submit`**

Create `web/src/app/(frontend)/api/land/submit/route.ts`:
```typescript
import { NextResponse } from "next/server";
import { submitForm } from "@/lib/forms/submit";
import { landFullSchema } from "@/lib/forms/schemas/land";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as Record<string, string>;
  const result = await submitForm({
    schemaType: "landSubmission",
    zodSchema: landFullSchema,
    payload: body,
    emailSubject: `New land submission: ${b?.acreage ?? "?"}ac in ${b?.county ?? "?"}, ${b?.state ?? "?"} from ${b?.name ?? "unknown"}`,
  });

  if (!result.ok) {
    if ("errors" in result && result.errors) {
      return NextResponse.json({ error: "Validation failed", errors: result.errors }, { status: 400 });
    }
    return NextResponse.json({ error: (result as { message?: string }).message ?? "Submission failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: result.id });
}
```

- [ ] **Step 2: Create `/api/investor/submit`**

Create `web/src/app/(frontend)/api/investor/submit/route.ts`:
```typescript
import { NextResponse } from "next/server";
import { submitForm } from "@/lib/forms/submit";
import { investorSchema } from "@/lib/forms/schemas/investor";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as Record<string, string>;
  const result = await submitForm({
    schemaType: "investorProfile",
    zodSchema: investorSchema,
    payload: body,
    emailSubject: `New investor profile: ${b?.name ?? "unknown"} at ${b?.firm ?? "unknown firm"}`,
  });

  if (!result.ok) {
    if ("errors" in result && result.errors) {
      return NextResponse.json({ error: "Validation failed", errors: result.errors }, { status: 400 });
    }
    return NextResponse.json({ error: (result as { message?: string }).message ?? "Submission failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: result.id });
}
```

- [ ] **Step 3: Create `/api/capacity/submit`**

Create `web/src/app/(frontend)/api/capacity/submit/route.ts`:
```typescript
import { NextResponse } from "next/server";
import { submitForm } from "@/lib/forms/submit";
import { capacitySchema } from "@/lib/forms/schemas/capacity";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as Record<string, string | number>;
  const result = await submitForm({
    schemaType: "capacityRequest",
    zodSchema: capacitySchema,
    payload: body,
    emailSubject: `New capacity RFP: ${b?.company ?? "unknown"} — ${b?.mwRequired ?? "?"}MW`,
  });

  if (!result.ok) {
    if ("errors" in result && result.errors) {
      return NextResponse.json({ error: "Validation failed", errors: result.errors }, { status: 400 });
    }
    return NextResponse.json({ error: (result as { message?: string }).message ?? "Submission failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: result.id });
}
```

- [ ] **Step 4: Full type check and commit**

```bash
cd web && npx tsc --noEmit --skipLibCheck 2>&1 | head -20
```
Expected: no errors.

```bash
git add web/src/app/\(frontend\)/api/ && \
git commit -m "feat(api): land/submit, investor/submit, capacity/submit + rewrite contact + newsletter"
```

---

## Task 12: Land Hub Page (`/land`)

**Files:**
- Create: `src/app/(frontend)/land/page.tsx`

- [ ] **Step 1: Create the page**

Create `web/src/app/(frontend)/land/page.tsx`:
```typescript
import Link from "next/link";

export const metadata = {
  title: "Powered Land — Konative",
  description:
    "Own land near a substation or transmission line? Find out what it's worth to the AI buildout. Konative brokers powered land to hyperscalers, developers, and data center operators.",
};

export default function LandPage() {
  return (
    <main className="land-hub">
      {/* Hero */}
      <section className="land-hub__hero">
        <div className="land-hub__hero-inner">
          <p className="land-hub__eyebrow">For Landowners</p>
          <h1 className="land-hub__headline">
            If you own powered land,<br />
            the AI buildout wants to talk to you.
          </h1>
          <p className="land-hub__sub">
            Hyperscalers, data center developers, and AI infrastructure companies are
            racing to find acreage near substations and transmission corridors. Konative
            sources, qualifies, and brokers powered land — and manages the project from
            contract to construction.
          </p>
          <div className="land-hub__ctas">
            <Link href="/land/submit" className="land-hub__cta-primary">
              Submit your land →
            </Link>
            <Link href="/land/what-its-worth" className="land-hub__cta-secondary">
              What is it worth?
            </Link>
          </div>
        </div>
      </section>

      {/* What we look for */}
      <section className="land-hub__criteria">
        <div className="land-hub__criteria-inner">
          <h2 className="land-hub__section-heading">What buyers look for</h2>
          <div className="land-hub__criteria-grid">
            {[
              { icon: "⚡", title: "Power proximity", body: "Within 5 miles of a 115kV+ substation. 230kV+ opens more buyers." },
              { icon: "📐", title: "Acreage", body: "50–5,000+ acres. Utility-scale builds need room for cooling, generation, and buffers." },
              { icon: "🌊", title: "Water access", body: "Evaporative cooling is water-intensive. Access to water supply or non-potable sources matters." },
              { icon: "📡", title: "Fiber connectivity", body: "Within reach of a fiber backbone. Metro adjacency earns a premium." },
              { icon: "🏗️", title: "Zoning", body: "Industrial or heavy commercial zoning is ideal. Agricultural can often be re-zoned." },
              { icon: "🗺️", title: "Geography", body: "US and Canada. Priority markets: Texas, Carolinas, Pacific Northwest, Ontario, Alberta." },
            ].map(item => (
              <div key={item.title} className="land-hub__criterion">
                <div className="land-hub__criterion-icon">{item.icon}</div>
                <h3 className="land-hub__criterion-title">{item.title}</h3>
                <p className="land-hub__criterion-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process teaser */}
      <section className="land-hub__process">
        <div className="land-hub__process-inner">
          <h2 className="land-hub__section-heading">How it works</h2>
          <ol className="land-hub__steps">
            {[
              { n: "01", title: "Submit your parcel", body: "Five minutes. Tell us the basics — location, acreage, power situation, your goals." },
              { n: "02", title: "Qualification call", body: "Within 48 hours we'll review your submission and schedule a call to ask a few questions." },
              { n: "03", title: "Site analysis", body: "We run a full power, transmission, and market analysis. No cost to you." },
              { n: "04", title: "Buyer outreach", body: "We take your parcel to our network of hyperscalers, developers, and infrastructure investors." },
              { n: "05", title: "LOI and negotiation", body: "We negotiate deal structure — sell, ground lease, or JV — to maximize your outcome." },
              { n: "06", title: "Close and project management", body: "We stay on through due diligence, permitting, and construction milestones." },
            ].map(step => (
              <li key={step.n} className="land-hub__step">
                <span className="land-hub__step-num">{step.n}</span>
                <div>
                  <strong className="land-hub__step-title">{step.title}</strong>
                  <p className="land-hub__step-body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/land/submit" className="land-hub__cta-primary" style={{ marginTop: 32, display: "inline-block" }}>
            Submit your land →
          </Link>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Add page CSS to `globals.css`**

Append to `web/src/app/(frontend)/globals.css`:
```css
/* ============================================================
   /land hub
   ============================================================ */

.land-hub__hero {
  background: #08142D;
  color: #fff;
  padding: 120px 24px 80px;
}
.land-hub__hero-inner {
  max-width: 760px;
  margin: 0 auto;
}
.land-hub__eyebrow {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 16px;
}
.land-hub__headline {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
  text-transform: uppercase;
}
.land-hub__sub {
  font-size: var(--text-lg);
  line-height: 1.7;
  color: rgba(255,255,255,0.8);
  max-width: 600px;
  margin-bottom: 36px;
}
.land-hub__ctas {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.land-hub__cta-primary {
  display: inline-block;
  background: var(--orange);
  color: #fff;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 700;
  padding: 14px 28px;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.15s;
}
.land-hub__cta-primary:hover { background: var(--orange-dark); }
.land-hub__cta-secondary {
  display: inline-block;
  color: rgba(255,255,255,0.8);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 600;
  padding: 14px 0;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.land-hub__criteria {
  background: var(--warm-off);
  padding: 80px 24px;
}
.land-hub__criteria-inner, .land-hub__process-inner {
  max-width: 960px;
  margin: 0 auto;
}
.land-hub__section-heading {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 40px;
  color: var(--color-text);
}
.land-hub__criteria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}
.land-hub__criterion {
  background: #fff;
  border-radius: 10px;
  padding: 28px;
  border: 1.5px solid var(--color-divider);
}
.land-hub__criterion-icon { font-size: 28px; margin-bottom: 12px; }
.land-hub__criterion-title {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--color-text);
}
.land-hub__criterion-body {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
}
.land-hub__process {
  padding: 80px 24px;
  background: #fff;
}
.land-hub__steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.land-hub__step {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
.land-hub__step-num {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--orange);
  min-width: 48px;
  line-height: 1;
}
.land-hub__step-title {
  display: block;
  font-size: var(--text-base);
  font-weight: 700;
  margin-bottom: 4px;
}
.land-hub__step-body {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0;
}
```

---

## Task 13: Land Submit Page (`/land/submit`)

**Files:**
- Create: `src/app/(frontend)/land/submit/page.tsx`

- [ ] **Step 1: Create the page**

Create `web/src/app/(frontend)/land/submit/page.tsx`:
```typescript
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StepForm } from "@/components/ui/StepForm";
import { FormField, FormInput, FormSelect } from "@/components/ui/FormShell";

export default function LandSubmitPage() {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleComplete(data: Record<string, unknown>) {
    setSubmitState("loading");
    try {
      // Convert numeric fields
      const payload = {
        ...data,
        acreage: data.acreage ? Number(data.acreage) : undefined,
        substationDistanceMiles: data.substationDistanceMiles ? Number(data.substationDistanceMiles) : undefined,
        fiberDistanceMiles: data.fiberDistanceMiles ? Number(data.fiberDistanceMiles) : undefined,
        hasTalkedToBrokers: data.hasTalkedToBrokers === "yes",
      };

      const res = await fetch("/api/land/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/land/process");
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body.error || "Something went wrong. Please try again.");
        setSubmitState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setSubmitState("error");
    }
  }

  const steps = [
    {
      title: "Property",
      content: (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            <FormField label="County" name="county" required>
              <FormInput name="county" required placeholder="e.g. Loudoun" />
            </FormField>
            <FormField label="State" name="state" required>
              <FormSelect name="state" placeholder="Select state" options={[
                "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
                "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
                "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
                "VA","WA","WV","WI","WY",
                "AB","BC","MB","NB","NL","NS","ON","PE","QC","SK",
              ].map(s => ({ label: s, value: s }))} />
            </FormField>
          </div>
          <FormField label="Total acreage" name="acreage" required>
            <FormInput name="acreage" type="number" min="1" required placeholder="e.g. 250" />
          </FormField>
          <FormField label="Parcel APN" name="apn" helpText="Optional — helps us pull GIS records faster">
            <FormInput name="apn" placeholder="Optional" />
          </FormField>
          <FormField label="Ownership type" name="ownershipType">
            <FormSelect name="ownershipType" placeholder="Select…" options={[
              { label: "Sole owner", value: "sole" },
              { label: "Partnership", value: "partnership" },
              { label: "Trust", value: "trust" },
              { label: "LLC / Corp", value: "llc" },
              { label: "Other", value: "other" },
            ]} />
          </FormField>
          <FormField label="Have you spoken with other brokers?" name="hasTalkedToBrokers">
            <FormSelect name="hasTalkedToBrokers" placeholder="Select…" options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]} />
          </FormField>
        </>
      ),
    },
    {
      title: "Power",
      content: (
        <>
          <FormField label="Distance to nearest substation" name="substationDistanceMiles" helpText="Approximate miles">
            <FormInput name="substationDistanceMiles" type="number" min="0" step="0.1" placeholder="e.g. 2.5" />
          </FormField>
          <FormField label="Known transmission voltage" name="transmissionVoltage">
            <FormSelect name="transmissionVoltage" placeholder="Select…" options={[
              { label: "Under 115kV", value: "<115kV" },
              { label: "115–230kV", value: "115-230kV" },
              { label: "230–500kV", value: "230-500kV" },
              { label: "500kV+", value: "500+kV" },
              { label: "Unknown", value: "unknown" },
            ]} />
          </FormField>
          <FormField label="Water access" name="waterAccess">
            <FormSelect name="waterAccess" placeholder="Select…" options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
              { label: "Unknown", value: "unknown" },
            ]} />
          </FormField>
          <FormField label="Zoning" name="zoning">
            <FormSelect name="zoning" placeholder="Select…" options={[
              { label: "Agricultural", value: "agricultural" },
              { label: "Industrial", value: "industrial" },
              { label: "Mixed use", value: "mixed" },
              { label: "Unknown", value: "unknown" },
            ]} />
          </FormField>
          <FormField label="Distance to fiber backbone" name="fiberDistanceMiles" helpText="Optional, approximate miles">
            <FormInput name="fiberDistanceMiles" type="number" min="0" step="0.1" placeholder="Optional" />
          </FormField>
        </>
      ),
    },
    {
      title: "Intent",
      content: (
        <>
          <FormField label="Your timeline" name="timeline">
            <FormSelect name="timeline" placeholder="Select…" options={[
              { label: "Ready now", value: "now" },
              { label: "Within 6 months", value: "6months" },
              { label: "Within 12 months", value: "12months" },
              { label: "Just exploring", value: "exploring" },
            ]} />
          </FormField>
          <FormField label="Price expectation" name="priceExpectation" helpText="A range is fine, or leave blank and we'll tell you what it's worth">
            <FormInput name="priceExpectation" placeholder="e.g. $5M–$10M or 'tell me what it's worth'" />
          </FormField>
          <FormField label="Preferred deal structure" name="preferredStructure">
            <FormSelect name="preferredStructure" placeholder="Select…" options={[
              { label: "Sell outright", value: "sell" },
              { label: "Ground lease", value: "ground-lease" },
              { label: "Joint venture", value: "jv" },
              { label: "Open to all", value: "open" },
            ]} />
          </FormField>
        </>
      ),
    },
    {
      title: "Contact",
      content: (
        <>
          <FormField label="Your name" name="name" required>
            <FormInput name="name" required autoComplete="name" placeholder="First Last" />
          </FormField>
          <FormField label="Email" name="email" required>
            <FormInput name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
          </FormField>
          <FormField label="Phone" name="phone">
            <FormInput name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
          </FormField>
          <FormField label="Your role" name="role">
            <FormSelect name="role" placeholder="Select…" options={[
              { label: "Property owner", value: "owner" },
              { label: "Owner's agent / attorney", value: "agent" },
              { label: "Family representative", value: "family-rep" },
              { label: "Other", value: "other" },
            ]} />
          </FormField>
          <FormField label="How did you hear about us?" name="referralSource">
            <FormInput name="referralSource" placeholder="Optional" />
          </FormField>
        </>
      ),
    },
  ];

  return (
    <main className="land-submit">
      <div className="land-submit__inner">
        <div className="land-submit__header">
          <p className="land-hub__eyebrow">Step 1 of 4</p>
          <h1 className="land-submit__headline">Tell us about your land</h1>
          <p className="land-submit__sub">
            Five minutes. No obligation. We'll review your submission and reach out within 48 hours.
          </p>
        </div>
        <StepForm
          steps={steps}
          onComplete={handleComplete}
          submitState={submitState}
          submitLabel="Submit your land"
          errorMessage={errorMsg}
        />
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Add page CSS**

Append to `web/src/app/(frontend)/globals.css`:
```css
/* ============================================================
   /land/submit
   ============================================================ */

.land-submit {
  background: var(--warm-off);
  min-height: 100vh;
  padding: 100px 24px 80px;
}
.land-submit__inner {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  border: 1.5px solid var(--color-divider);
  padding: 48px 40px;
}
@media (max-width: 640px) {
  .land-submit__inner { padding: 32px 20px; }
}
.land-submit__headline {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.land-submit__sub {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  margin-bottom: 36px;
  line-height: 1.6;
}
.land-submit__header { margin-bottom: 32px; }
```

---

## Task 14: Land Process Confirmation Page (`/land/process`)

**Files:**
- Create: `src/app/(frontend)/land/process/page.tsx`

- [ ] **Step 1: Create the page**

Create `web/src/app/(frontend)/land/process/page.tsx`:
```typescript
import Link from "next/link";

export const metadata = {
  title: "Submission Received — Konative",
  description: "Your land submission has been received. Here's what happens next.",
};

export default function LandProcessPage() {
  return (
    <main className="land-process">
      <div className="land-process__inner">
        <div className="land-process__check">✓</div>
        <h1 className="land-process__headline">Submission received</h1>
        <p className="land-process__sub">
          We review every submission personally. Here is what happens next.
        </p>

        <ol className="land-process__timeline">
          {[
            { period: "48 hours", title: "Qualification call", body: "We'll reach out by email or phone to ask a few quick follow-up questions and confirm your details." },
            { period: "7 days", title: "Power & site analysis", body: "We pull GIS, transmission queue, and interconnection data for your parcel. No cost, no obligation." },
            { period: "30 days", title: "Buyer outreach", body: "We take your parcel to our network of hyperscalers, infrastructure developers, and investors." },
            { period: "30–90 days", title: "LOI and negotiation", body: "If there is interest, we facilitate LOI negotiation to maximize your outcome — sale, ground lease, or JV." },
            { period: "90–180 days", title: "Due diligence & close", body: "We stay on through environmental review, title, and closing to keep the deal on track." },
          ].map(item => (
            <li key={item.period} className="land-process__item">
              <div className="land-process__period">{item.period}</div>
              <div>
                <strong className="land-process__item-title">{item.title}</strong>
                <p className="land-process__item-body">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="land-process__footer">
          <p>Questions in the meantime? Email us at{" "}
            <a href="mailto:land@konative.com">land@konative.com</a>
          </p>
          <Link href="/" className="land-hub__cta-primary" style={{ marginTop: 24, display: "inline-block" }}>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Add CSS**

Append to `web/src/app/(frontend)/globals.css`:
```css
/* ============================================================
   /land/process
   ============================================================ */

.land-process {
  background: var(--warm-off);
  min-height: 100vh;
  padding: 100px 24px 80px;
}
.land-process__inner {
  max-width: 640px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  border: 1.5px solid var(--color-divider);
  padding: 56px 48px;
  text-align: center;
}
@media (max-width: 640px) {
  .land-process__inner { padding: 36px 20px; }
}
.land-process__check {
  font-size: 56px;
  color: #2ecc71;
  margin-bottom: 16px;
}
.land-process__headline {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.land-process__sub {
  color: var(--color-text-muted);
  margin-bottom: 40px;
}
.land-process__timeline {
  list-style: none;
  padding: 0;
  margin: 0 0 40px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.land-process__item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-divider);
}
.land-process__item:last-child { border-bottom: none; padding-bottom: 0; }
.land-process__period {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  min-width: 100px;
  padding-top: 2px;
}
.land-process__item-title {
  display: block;
  font-size: var(--text-base);
  font-weight: 700;
  margin-bottom: 4px;
}
.land-process__item-body {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0;
}
.land-process__footer {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}
.land-process__footer a { color: var(--orange); }
```

---

## Task 15: Land Valuation Explainer Page (`/land/what-its-worth`)

**Files:**
- Create: `src/app/(frontend)/land/what-its-worth/page.tsx`

- [ ] **Step 1: Create the page**

Create `web/src/app/(frontend)/land/what-its-worth/page.tsx`:
```typescript
import Link from "next/link";

export const metadata = {
  title: "What Is My Powered Land Worth? — Konative",
  description:
    "How data center developers value land: power capacity, substation proximity, acreage, and zoning. A practical framework for landowners and agents.",
};

export default function WhatIsItWorthPage() {
  return (
    <main className="valuation-page">
      <article className="valuation-page__article">
        <header className="valuation-page__header">
          <p className="land-hub__eyebrow">For Landowners</p>
          <h1 className="valuation-page__headline">
            What is powered land worth to a data center developer?
          </h1>
          <p className="valuation-page__lede">
            There is no standard $/acre price for data center land. Value is driven almost entirely
            by power — its availability, proximity, and deliverability. Here is the framework that
            buyers use, and what it means for your parcel.
          </p>
        </header>

        <section className="valuation-page__section">
          <h2>The primary driver: available power</h2>
          <p>
            A data center consumes 20–200 MW of continuous power. The most important question a buyer
            asks is: "Can I get that power, how quickly, and at what cost?" Everything else —
            acreage, zoning, location — is secondary.
          </p>
          <p>
            Land within 2 miles of a 230kV+ substation with available capacity typically commands
            a significant premium. Land 15 miles from the nearest 69kV line may not be financeable
            as a standalone data center site at all.
          </p>
        </section>

        <section className="valuation-page__section">
          <h2>Value factors, in order of importance</h2>
          <div className="valuation-page__factors">
            {[
              { rank: "1", factor: "Power availability", detail: "MW available at the nearest substation without requiring new transmission. Queued interconnection reduces value significantly." },
              { rank: "2", factor: "Substation distance", detail: "Under 1 mile = highest value. 1–5 miles = good. 5–10 miles = feasible with investment. Over 10 miles = typically requires new transmission." },
              { rank: "3", factor: "Transmission voltage", detail: "500kV lines serve the largest buyers. 230kV works for most projects. 115kV supports smaller builds. Under 115kV limits options." },
              { rank: "4", factor: "Acreage and contiguity", detail: "Hyperscalers want 200–2,000+ contiguous acres for multi-phase development. Smaller parcels work for colo developers at 50–150 acres." },
              { rank: "5", factor: "Water access", detail: "Evaporative cooling uses 1–3 million gallons/day per 100 MW. Industrial water rights or proximity to a water source meaningfully affects value." },
              { rank: "6", factor: "Zoning and permitting risk", detail: "Pre-zoned industrial or heavy commercial land transacts at a premium. Agricultural land has re-zoning risk that buyers price in." },
              { rank: "7", factor: "Fiber connectivity", detail: "Within 10 miles of a fiber backbone. Hyperscaler campuses require multi-100G diverse fiber paths." },
              { rank: "8", factor: "Geography and markets", detail: "Texas, Carolinas, Pacific Northwest, Ontario, and Alberta are current priority markets for most buyers." },
            ].map(item => (
              <div key={item.rank} className="valuation-page__factor">
                <span className="valuation-page__factor-rank">{item.rank}</span>
                <div>
                  <strong className="valuation-page__factor-name">{item.factor}</strong>
                  <p className="valuation-page__factor-detail">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="valuation-page__section">
          <h2>Sell vs. ground lease vs. joint venture</h2>
          <p>
            <strong>Sell outright:</strong> Clean exit, immediate liquidity. Typical for sellers who
            want certainty and no ongoing involvement. Buyers typically pay a premium over agricultural
            value but below what the finished facility will support.
          </p>
          <p>
            <strong>Ground lease:</strong> You retain ownership and receive an annual ground rent
            (typically $2,000–$8,000/acre/year, indexed to CPI) for 30–99 years. Upside is retained
            land value appreciation; risk is counterparty creditworthiness and lease complexity.
          </p>
          <p>
            <strong>Joint venture:</strong> You contribute the land; the developer contributes
            capital and expertise. You participate in project upside. Higher complexity, longer
            timeline, and more negotiation, but highest potential return for well-located parcels.
          </p>
        </section>

        <section className="valuation-page__section">
          <h2>How long does it take?</h2>
          <p>
            A straightforward land sale — good power, clean title, willing seller — can close in
            90–180 days from first contact. Projects requiring new transmission interconnection,
            re-zoning, or environmental remediation routinely take 2–4 years from site selection
            to groundbreaking.
          </p>
          <p>
            Konative stages the process to protect your time: we run our analysis first,
            bring you qualified buyers who have already reviewed the basics, and only ask for
            your time when there is genuine interest.
          </p>
        </section>

        <div className="valuation-page__cta-block">
          <h2>Want to know what your specific parcel is worth?</h2>
          <p>Submit it — five minutes, no obligation. We'll run the numbers and get back to you within 48 hours.</p>
          <Link href="/land/submit" className="land-hub__cta-primary">
            Submit your land →
          </Link>
        </div>
      </article>
    </main>
  );
}
```

- [ ] **Step 2: Add CSS**

Append to `web/src/app/(frontend)/globals.css`:
```css
/* ============================================================
   /land/what-its-worth
   ============================================================ */

.valuation-page {
  background: #fff;
  padding: 80px 24px;
}
.valuation-page__article {
  max-width: 760px;
  margin: 0 auto;
}
.valuation-page__header {
  margin-bottom: 48px;
  padding-top: 40px;
}
.valuation-page__headline {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.15;
  margin-bottom: 20px;
}
.valuation-page__lede {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  line-height: 1.7;
}
.valuation-page__section {
  margin-bottom: 48px;
}
.valuation-page__section h2 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 16px;
  color: var(--color-text);
}
.valuation-page__section p {
  font-size: var(--text-base);
  line-height: 1.75;
  color: var(--color-text);
  margin-bottom: 16px;
}
.valuation-page__factors {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}
.valuation-page__factor {
  display: flex;
  gap: 16px;
  padding: 20px;
  border: 1.5px solid var(--color-divider);
  border-radius: 8px;
  align-items: flex-start;
}
.valuation-page__factor-rank {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--orange);
  min-width: 28px;
  line-height: 1;
}
.valuation-page__factor-name {
  display: block;
  font-size: var(--text-base);
  font-weight: 700;
  margin-bottom: 4px;
}
.valuation-page__factor-detail {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0;
}
.valuation-page__cta-block {
  background: #08142D;
  color: #fff;
  border-radius: 12px;
  padding: 48px 40px;
  margin-top: 48px;
  text-align: center;
}
.valuation-page__cta-block h2 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.valuation-page__cta-block p {
  color: rgba(255,255,255,0.8);
  margin-bottom: 24px;
}
```

---

## Task 16: Investor + Occupier Placeholder Pages

**Files:**
- Create: `src/app/(frontend)/invest/page.tsx`
- Create: `src/app/(frontend)/capacity/page.tsx`

- [ ] **Step 1: Create `/invest/page.tsx`**

Create `web/src/app/(frontend)/invest/page.tsx`:
```typescript
"use client";

import { useState } from "react";
import { FormShell, FormField, FormInput } from "@/components/ui/FormShell";

export const metadata = undefined; // suppress static export warning for client component

export default function InvestPage() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitState("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/investor/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "invest_placeholder" }),
      });
      if (res.ok) {
        setSubmitState("success");
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body.error || "Something went wrong.");
        setSubmitState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setSubmitState("error");
    }
  }

  return (
    <main className="placeholder-door">
      <div className="placeholder-door__inner">
        <p className="land-hub__eyebrow">For Investors</p>
        <h1 className="placeholder-door__headline">Deploy capital into the AI infrastructure buildout</h1>
        <p className="placeholder-door__sub">
          We work with infrastructure investors, family offices, and institutional capital deploying
          into powered land, development JVs, and stabilized data center assets. Get early access to
          our deal flow.
        </p>
        <div className="placeholder-door__benefits">
          {[
            "Powered land opportunities before they hit the market",
            "Development JV co-investment alongside operators",
            "Stabilized colo assets with tenant-in-place",
            "Powered land platform acquisitions",
          ].map(b => <p key={b} className="placeholder-door__benefit">✓ {b}</p>)}
        </div>
        <FormShell
          onSubmit={handleSubmit}
          submitState={submitState}
          submitLabel="Request deal flow access"
          successMessage="You're on the list. We'll be in touch within 48 hours."
          errorMessage={errorMsg}
        >
          <FormField label="Name" name="name" required>
            <FormInput name="name" required placeholder="Your name" />
          </FormField>
          <FormField label="Firm" name="firm">
            <FormInput name="firm" placeholder="Fund or family office name" />
          </FormField>
          <FormField label="Email" name="email" required>
            <FormInput name="email" type="email" required placeholder="you@firm.com" />
          </FormField>
        </FormShell>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Create `/capacity/page.tsx`**

Create `web/src/app/(frontend)/capacity/page.tsx`:
```typescript
"use client";

import { useState } from "react";
import { FormShell, FormField, FormInput } from "@/components/ui/FormShell";

export default function CapacityPage() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitState("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/capacity/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "capacity_placeholder" }),
      });
      if (res.ok) {
        setSubmitState("success");
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body.error || "Something went wrong.");
        setSubmitState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setSubmitState("error");
    }
  }

  return (
    <main className="placeholder-door">
      <div className="placeholder-door__inner">
        <p className="land-hub__eyebrow">For Occupiers</p>
        <h1 className="placeholder-door__headline">Find powered capacity in 9–18 months, not 36</h1>
        <p className="placeholder-door__sub">
          Whether you need 5 MW for a regional inference cluster or 500 MW for a hyperscale campus,
          Konative helps you find, negotiate, and occupy the right facility on a timeline that works
          for your buildout.
        </p>
        <div className="placeholder-door__benefits">
          {[
            "Powered shell, build-to-suit, and colo sourcing",
            "Site selection across 12+ US and Canadian markets",
            "RFP management and vendor negotiation",
            "Power and connectivity due diligence",
          ].map(b => <p key={b} className="placeholder-door__benefit">✓ {b}</p>)}
        </div>
        <FormShell
          onSubmit={handleSubmit}
          submitState={submitState}
          submitLabel="Tell us what you need"
          successMessage="Got it — we'll reach out within 48 hours to learn more."
          errorMessage={errorMsg}
        >
          <FormField label="Company" name="company" required>
            <FormInput name="company" required placeholder="Your company" />
          </FormField>
          <FormField label="Name" name="name" required>
            <FormInput name="name" required placeholder="Your name" />
          </FormField>
          <FormField label="Email" name="email" required>
            <FormInput name="email" type="email" required placeholder="you@company.com" />
          </FormField>
        </FormShell>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Add shared placeholder-door CSS**

Append to `web/src/app/(frontend)/globals.css`:
```css
/* ============================================================
   Placeholder door pages (/invest, /capacity)
   ============================================================ */

.placeholder-door {
  background: var(--warm-off);
  min-height: 100vh;
  padding: 100px 24px 80px;
}
.placeholder-door__inner {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  border: 1.5px solid var(--color-divider);
  padding: 48px 40px;
}
@media (max-width: 640px) {
  .placeholder-door__inner { padding: 32px 20px; }
}
.placeholder-door__headline {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.5vw, 2.2rem);
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.15;
  margin-bottom: 16px;
}
.placeholder-door__sub {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 24px;
}
.placeholder-door__benefits {
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.placeholder-door__benefit {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}
```

- [ ] **Step 4: Commit land pages + placeholder doors**

```bash
git add web/src/app/\(frontend\)/land/ web/src/app/\(frontend\)/invest/ web/src/app/\(frontend\)/capacity/ web/src/app/\(frontend\)/globals.css && \
git commit -m "feat(pages): land funnel (hub/submit/process/valuation), invest + capacity doors"
```

---

## Task 17: Update Header Nav

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Replace navLinks and add CTA**

In `web/src/components/Header.tsx`, replace the `navLinks` array and update the JSX to add the rust CTA button:

Find and replace the `navLinks` constant:
```typescript
const navLinks: { label: string; url: string }[] = [
  { label: "Land", url: "/land" },
  { label: "Invest", url: "/invest" },
  { label: "Capacity", url: "/capacity" },
  { label: "Intel", url: "/intel/news" },
  { label: "Services", url: "/services" },
  { label: "About", url: "/about" },
];
```

Find the `return (` block and locate where the nav links are rendered. After the last nav link `<Link>`, add this CTA button before the closing tag of the nav container:

```typescript
<Link
  href="/land/submit"
  style={{
    marginLeft: 16,
    display: "inline-block",
    background: "var(--orange)",
    color: "#fff",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-sm)",
    fontWeight: 700,
    padding: "8px 18px",
    borderRadius: 6,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background 0.15s",
  }}
>
  Submit land →
</Link>
```

Also update `DARK_HERO_PAGES` to include the new pages that have dark heroes:
```typescript
const DARK_HERO_PAGES = new Set(["/", "/land", "/invest", "/capacity"]);
```

- [ ] **Step 2: Type check and verify**

```bash
cd web && npx tsc --noEmit --skipLibCheck 2>&1 | head -10
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add web/src/components/Header.tsx && \
git commit -m "feat(header): update nav to Land/Invest/Capacity/Intel/Services/About + rust CTA"
```

---

## Task 18: Vercel Cron Config

**Files:**
- Modify: `vercel.json`

- [ ] **Step 1: Read current vercel.json**

```bash
cat web/vercel.json
```

- [ ] **Step 2: Add cron entry**

In `web/vercel.json`, add a `"crons"` key at the top level (next to `"rewrites"` or wherever the existing keys are):

```json
"crons": [
  {
    "path": "/api/ingest-news",
    "schedule": "0 6 * * *"
  }
]
```

Note: The ingest route requires `NEWS_INGEST_TOKEN` as a Bearer token. Vercel Cron does not send auth headers natively — you will need to either (a) add a check that allows requests with no token when `CRON_SECRET` matches `x-vercel-cron-secret`, or (b) make the endpoint accept unauthenticated GET requests from Vercel's IP range. For now, the cron will hit the endpoint; the existing token check will reject it. Fix: update `runIngestionRequest` in `/api/ingest-news/route.ts` to also accept the `CRON_SECRET` Vercel sends automatically.

Update `web/src/app/api/ingest-news/route.ts` — add Vercel cron secret support at the top of `runIngestionRequest`:

```typescript
async function runIngestionRequest(request: Request) {
  const configuredToken = process.env.NEWS_INGEST_TOKEN;
  const cronSecret = process.env.CRON_SECRET;

  // Accept Vercel Cron requests (they send x-vercel-cron-secret)
  const vercelCronHeader = request.headers.get("x-vercel-cron-secret");
  if (cronSecret && vercelCronHeader === cronSecret) {
    // Authorized via Vercel Cron — proceed
  } else {
    if (!configuredToken) {
      return NextResponse.json(
        { ok: false, error: "Server missing NEWS_INGEST_TOKEN environment variable." },
        { status: 500 },
      );
    }
    const providedToken = getRequestToken(request);
    if (!providedToken || providedToken !== configuredToken) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }
  // ... rest unchanged
```

- [ ] **Step 3: Add CRON_SECRET to env docs**

In `web/.env.local.example` (or README), add:
```
CRON_SECRET=           # Vercel sets this automatically; also add to Vercel env vars
```

- [ ] **Step 4: Commit**

```bash
git add web/vercel.json web/src/app/api/ingest-news/route.ts && \
git commit -m "feat(cron): daily news ingest at 06:00 UTC via Vercel Cron"
```

---

## Task 19: Seed News Sources Script

**Files:**
- Create: `scripts/seed-news-sources.ts`

- [ ] **Step 1: Create the seed script**

Create `web/scripts/seed-news-sources.ts`:
```typescript
/**
 * Seed news sources into Sanity.
 * Run: cd web && npx tsx scripts/seed-news-sources.ts
 * Requires SANITY_API_TOKEN and NEXT_PUBLIC_SANITY_PROJECT_ID in env.
 */
import { createClient } from "@sanity/client";
import { createHash } from "crypto";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN || "",
  useCdn: false,
});

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const sources = [
  // Trade press
  { name: "Data Center Dynamics", feedUrl: "https://www.datacenterdynamics.com/en/rss/", sourceType: "rss", countries: ["us", "ca"], topics: ["hyperscaler", "capital", "construction"], priority: 90 },
  { name: "Data Center Frontier", feedUrl: "https://datacenterfrontier.com/feed/", sourceType: "rss", countries: ["us", "ca"], topics: ["hyperscaler", "capital", "land"], priority: 90 },
  { name: "Data Center Knowledge", feedUrl: "https://www.datacenterknowledge.com/rss.xml", sourceType: "rss", countries: ["us"], topics: ["hyperscaler", "capital"], priority: 85 },
  // Power + utility
  { name: "Utility Dive", feedUrl: "https://www.utilitydive.com/feeds/news/", sourceType: "rss", countries: ["us"], topics: ["transmission", "utility", "substation"], priority: 85 },
  { name: "T&D World", feedUrl: "https://www.tdworld.com/rss.xml", sourceType: "rss", countries: ["us", "ca"], topics: ["transmission", "substation"], priority: 80 },
  // Regulatory
  { name: "FERC News", feedUrl: "https://www.ferc.gov/news-events/news/rss.xml", sourceType: "rss", countries: ["us"], topics: ["regulatory", "transmission"], priority: 75 },
  // Hyperscaler press rooms (RSS where available)
  { name: "AWS News Blog", feedUrl: "https://aws.amazon.com/blogs/aws/feed/", sourceType: "rss", countries: ["us", "ca"], topics: ["hyperscaler"], priority: 70 },
  { name: "Google Cloud Blog", feedUrl: "https://cloud.google.com/feeds/gcp-news-rss.xml", sourceType: "rss", countries: ["us", "ca"], topics: ["hyperscaler"], priority: 70 },
  { name: "Microsoft Azure Blog", feedUrl: "https://azure.microsoft.com/en-us/blog/feed/", sourceType: "rss", countries: ["us", "ca"], topics: ["hyperscaler"], priority: 70 },
  { name: "Equinix Newsroom", feedUrl: "https://www.equinix.com/newsroom/rss.xml", sourceType: "rss", countries: ["us", "ca"], topics: ["capital", "construction"], priority: 65 },
  { name: "Digital Realty News", feedUrl: "https://investor.digitalrealty.com/rss/news-releases.xml", sourceType: "newsroom", countries: ["us", "ca"], topics: ["capital", "construction"], priority: 65 },
  { name: "Bisnow Data Centers", feedUrl: "https://www.bisnow.com/national/news/data-center/rss", sourceType: "rss", countries: ["us"], topics: ["capital", "land", "construction"], priority: 80 },
];

async function seedSources() {
  console.log(`Seeding ${sources.length} sources into Sanity project ${client.config().projectId}…`);

  for (const source of sources) {
    const slug = slugify(source.name);
    const id = `newsSource-${createHash("md5").update(slug).digest("hex").slice(0, 12)}`;

    try {
      await client.createOrReplace({
        _id: id,
        _type: "newsSource",
        name: source.name,
        slug: { _type: "slug", current: slug },
        feedUrl: source.feedUrl,
        sourceUrl: source.feedUrl.replace("/rss", "").replace("/feed/", "").replace("/feed", "").split("/").slice(0, 3).join("/"),
        sourceType: source.sourceType,
        countries: source.countries,
        topics: source.topics,
        priority: source.priority,
        active: true,
      });
      console.log(`  ✓ ${source.name}`);
    } catch (err) {
      console.error(`  ✗ ${source.name}:`, err instanceof Error ? err.message : err);
    }
  }

  console.log("Done.");
}

seedSources().catch(console.error);
```

- [ ] **Step 2: Run the seed script locally**

```bash
cd web && NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id> NEXT_PUBLIC_SANITY_DATASET=production SANITY_API_TOKEN=<your-token> npx tsx scripts/seed-news-sources.ts
```
Expected: 12–13 lines of `✓ <Source Name>` then `Done.`

- [ ] **Step 3: Verify in Sanity Studio**

```bash
cd web && npm run dev
```
Open `http://localhost:3005/studio` → Content → News source. You should see all 12 sources listed.

- [ ] **Step 4: Trigger a test ingest**

```bash
curl -X POST http://localhost:3005/api/ingest-news \
  -H "x-news-ingest-token: <NEWS_INGEST_TOKEN>"
```
Expected JSON: `{ "ok": true, "summary": { "sourceCount": 12, "created": N, ... } }`

- [ ] **Step 5: Commit**

```bash
git add web/scripts/seed-news-sources.ts && \
git commit -m "feat(ingest): seed 12 news sources — trade press, utility, hyperscaler, regulatory"
```

---

## Task 20: Final Type Check + Build Verify + Commit

- [ ] **Step 1: Full type check**

```bash
cd web && npx tsc --noEmit --skipLibCheck 2>&1
```
Expected: no errors (or only pre-existing errors unrelated to this plan's changes).

- [ ] **Step 2: Run all tests**

```bash
cd web && npm test
```
Expected: `3 passed` (submit pipeline tests).

- [ ] **Step 3: Local build**

```bash
cd web && npm run build 2>&1 | tail -20
```
Expected: `✓ Compiled successfully` with no errors. Note any warnings for reference.

- [ ] **Step 4: Manual smoke test (dev server)**

```bash
cd web && npm run dev
```
Open and verify each route:
- `http://localhost:3005/land` — renders hub page
- `http://localhost:3005/land/submit` — 4-step form works, steps advance, final submit POSTs to `/api/land/submit`
- `http://localhost:3005/land/process` — confirmation page renders
- `http://localhost:3005/land/what-its-worth` — valuation explainer renders
- `http://localhost:3005/invest` — placeholder door renders, form submits
- `http://localhost:3005/capacity` — placeholder door renders, form submits
- `http://localhost:3005/contact` — existing form now persists to Sanity (check Studio for `contactInquiry` docs)
- Header nav links: Land, Invest, Capacity, Intel, Services, About all present + rust "Submit land →" CTA

- [ ] **Step 5: Final commit**

```bash
git add -A && git commit -m "feat(foundation): complete Plan 1 — forms, landholder funnel, placeholder doors, news seed"
```

---

## Plan 2 Preview (Weeks 2–4)

Plan 2 covers the remaining work and will be written once Plan 1 is shipped:

- **Week 2:** Homepage full rebuild (three-door hero, signal ticker, intel preview split panel, market footprint, newsletter banner), `/intel/news` live feed page, `/intel/deals` table + premium gate, `/intel/markets` shell + 3 metro reports (Loudoun, Phoenix, Dallas)
- **Week 3:** Full investor funnel (`/invest/deal-flow`, `/invest/buy-box`), full occupier funnel (`/capacity/rfp`, `/capacity/markets`), `/services` page with fee structure, 6 landholder SEO content pages
- **Week 4:** `/about` team page, remaining metro reports, remaining SEO content pages, full QA pass, DNS + Vercel domain verification, production deploy

> After Plan 1 ships: run `/plan` and reference `docs/superpowers/specs/2026-04-24-konative-brokerage-rebuild-design.md` to generate Plan 2.
