import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  fields: [
    { name: "siteName", type: "text", defaultValue: "Konative" },
    { name: "tagline", type: "text", defaultValue: "Expect More" },
    { name: "contactEmail", type: "email" },
    { name: "phone", type: "text" },
    { name: "address", type: "textarea" },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        { name: "platform", type: "text" },
        { name: "url", type: "text" },
      ],
    },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "favicon", type: "upload", relationTo: "media" },
  ],
};
