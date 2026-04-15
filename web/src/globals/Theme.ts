import type { GlobalConfig } from "payload";

export const Theme: GlobalConfig = {
  slug: "theme",
  fields: [
    {
      name: "primaryColor",
      type: "text",
      defaultValue: "#01696f",
      admin: { description: "Hex color for primary accent" },
    },
    {
      name: "accentColor",
      type: "text",
      defaultValue: "#964219",
      admin: { description: "Hex color for warm accent" },
    },
    {
      name: "fontDisplay",
      type: "text",
      defaultValue: "Instrument Serif",
      admin: { description: "Google Fonts or Fontshare display font name" },
    },
    {
      name: "fontBody",
      type: "text",
      defaultValue: "Satoshi",
      admin: { description: "Google Fonts or Fontshare body font name" },
    },
  ],
};
