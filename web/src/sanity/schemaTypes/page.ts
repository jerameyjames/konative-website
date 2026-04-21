import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "layout",
      type: "text",
      title: "Layout blocks (JSON)",
      description:
        'JSON array of blocks. Each item uses Payload-style { "blockType": "hero-rotating" | …, …fields }.',
      rows: 24,
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || typeof value !== "string") return true;
          try {
            const parsed = JSON.parse(value) as unknown;
            if (!Array.isArray(parsed)) return "Must be a JSON array";
          } catch {
            return "Invalid JSON";
          }
          return true;
        }),
    }),
    defineField({
      name: "meta",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text" },
        { name: "image", type: "image", options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return { title: title || "Untitled", subtitle: slug ? `/${slug}` : "" };
    },
  },
});
