import type { GlobalConfig } from "payload";

export const SEODefaults: GlobalConfig = {
  slug: "seo-defaults",
  fields: [
    { name: "defaultTitle", type: "text", defaultValue: "Konative | Premium Sales Representation" },
    {
      name: "defaultDescription",
      type: "textarea",
      defaultValue:
        "Woman-owned sales representation and marketing for the outdoor living, surfaces, and fabrication industry.",
    },
    { name: "defaultImage", type: "upload", relationTo: "media" },
    { name: "gtmId", type: "text", admin: { description: "Google Tag Manager ID" } },
  ],
};
