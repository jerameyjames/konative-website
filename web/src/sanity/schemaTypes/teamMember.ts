import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", type: "number" }),
  ],
});
