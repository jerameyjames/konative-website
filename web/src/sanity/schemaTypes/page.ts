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
      type: "json",
      title: "Layout blocks",
      description: "Array of blocks: each item uses Payload-style { blockType, ...fields }.",
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
