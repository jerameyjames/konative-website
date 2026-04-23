import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service / Capability",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "pillar",
      type: "string",
      title: "Capability pillar",
      description: "Which of the six end-to-end capabilities does this map to?",
      options: {
        list: [
          { title: "01 — Capital (Investor Matchmaking & Deal Structure)", value: "01-capital" },
          { title: "02 — Land (Site Acquisition & Feasibility)", value: "02-land" },
          { title: "03 — Supply Chain (Buildings & Modular Sourcing)", value: "03-supply-chain" },
          { title: "04 — Power (Turbine & Generation Sourcing)", value: "04-power" },
          { title: "05 — Energy Strategy (Behind-the-Meter Design)", value: "05-energy-strategy" },
          { title: "06 — People (Staffing & Ops Readiness)", value: "06-people" },
        ],
      },
    }),
    defineField({ name: "summary", type: "text", description: "Short description shown in the capability grid" }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }], description: "Full detail — used for future service detail pages" }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
