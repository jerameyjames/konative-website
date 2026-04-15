import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "summary", type: "textarea" },
    { name: "description", type: "richText" },
    { name: "icon", type: "text", admin: { description: "Lucide icon name" } },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
