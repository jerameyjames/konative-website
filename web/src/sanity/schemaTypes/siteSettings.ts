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
