import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string", initialValue: "Konative" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "address", type: "text" }),
    defineField({
      name: "heroImage",
      type: "image",
      title: "Hero background image",
      description: "Full-bleed datacenter/infrastructure photo shown behind the homepage hero. High-res landscape image recommended (min 1600px wide). Falls back to Unsplash photo-1558618666-fcd25c85cd64 if empty.",
      options: { hotspot: true },
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string" },
            { name: "url", type: "url" },
          ],
        },
      ],
    }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "favicon", type: "image" }),
  ],
});
