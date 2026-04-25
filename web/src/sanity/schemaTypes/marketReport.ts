import { defineField, defineType } from "sanity";

export const marketReport = defineType({
  name: "marketReport",
  title: "Market Report",
  type: "document",
  fields: [
    defineField({ name: "metro", type: "string", title: "Metro Name", validation: r => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "metro", maxLength: 96 }, validation: r => r.required() }),
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
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] }, initialValue: "draft" }),
  ],
  preview: {
    select: { metro: "metro", country: "country", status: "status" },
    prepare({ metro, country, status }: Record<string, string>) {
      return { title: metro || "Unknown", subtitle: `${country?.toUpperCase() || ""} · ${status || "draft"}` };
    },
  },
});
