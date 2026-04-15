import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "author" },
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "author", type: "text", required: true },
    { name: "title", type: "text" },
    { name: "company", type: "text" },
    { name: "featured", type: "checkbox", defaultValue: false },
  ],
};
