import type { GlobalConfig } from "payload";

const linkField = {
  name: "links",
  type: "array" as const,
  fields: [
    { name: "label", type: "text" as const, required: true },
    { name: "url", type: "text" as const, required: true },
    { name: "newTab", type: "checkbox" as const, defaultValue: false },
  ],
};

export const Navigation: GlobalConfig = {
  slug: "navigation",
  fields: [
    { ...linkField, name: "headerLinks", label: "Header Links" },
    { ...linkField, name: "footerLinks", label: "Footer Links" },
  ],
};
