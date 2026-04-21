import { defineField, defineType } from "sanity";

export const newsSource = defineType({
  name: "newsSource",
  title: "News source",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sourceType",
      type: "string",
      options: {
        list: [
          { title: "RSS/Atom Feed", value: "rss" },
          { title: "Official Newsroom", value: "newsroom" },
          { title: "Government Portal", value: "government" },
          { title: "Industry Site", value: "industry" },
        ],
        layout: "radio",
      },
      initialValue: "rss",
      validation: (r) => r.required(),
    }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
    defineField({
      name: "priority",
      type: "number",
      initialValue: 50,
      validation: (r) => r.min(1).max(100),
    }),
    defineField({ name: "sourceUrl", type: "url", validation: (r) => r.required() }),
    defineField({ name: "feedUrl", type: "url" }),
    defineField({
      name: "countries",
      type: "array",
      of: [{ type: "string" }],
      options: { list: [{ title: "US", value: "us" }, { title: "Canada", value: "ca" }] },
    }),
    defineField({
      name: "topics",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "lastIngestedAt", type: "datetime" }),
    defineField({ name: "lastIngestError", type: "text" }),
  ],
  preview: {
    select: { title: "name", active: "active" },
    prepare({ title, active }) {
      return { title: title || "Source", subtitle: active ? "Active" : "Inactive" };
    },
  },
});
