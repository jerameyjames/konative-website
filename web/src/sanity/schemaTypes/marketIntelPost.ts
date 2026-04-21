import { defineField, defineType } from "sanity";

export const marketIntelPost = defineType({
  name: "marketIntelPost",
  title: "Market intel post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "sourceUrl", type: "url" }),
    defineField({ name: "sourceName", type: "string" }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "curatorNote", type: "text" }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "isPublished", type: "boolean", initialValue: true }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
  ],
});
