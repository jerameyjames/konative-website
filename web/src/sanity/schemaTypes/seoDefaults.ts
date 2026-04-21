import { defineField, defineType } from "sanity";

export const seoDefaults = defineType({
  name: "seoDefaults",
  title: "SEO defaults",
  type: "document",
  fields: [
    defineField({ name: "defaultTitle", type: "string" }),
    defineField({ name: "defaultDescription", type: "text" }),
    defineField({ name: "ogImage", type: "image", options: { hotspot: true } }),
  ],
});
