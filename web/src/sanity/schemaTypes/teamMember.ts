import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "role", type: "string", description: "e.g. Founder & Principal" }),
    defineField({ name: "bio", type: "text", description: "Short bio shown on the homepage team card" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "linkedin",
      type: "url",
      title: "LinkedIn URL",
      description: "Full URL — https://www.linkedin.com/in/...",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured on homepage",
      initialValue: false,
    }),
    defineField({ name: "order", type: "number", description: "Lower numbers appear first" }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
