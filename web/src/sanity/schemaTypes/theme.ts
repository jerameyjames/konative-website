import { defineField, defineType } from "sanity";

export const theme = defineType({
  name: "theme",
  title: "Theme",
  type: "document",
  fields: [
    defineField({ name: "primaryColor", type: "string", title: "Primary (hex)" }),
    defineField({ name: "accentColor", type: "string", title: "Accent (hex)" }),
    defineField({ name: "tokens", type: "json", description: "Optional extended design tokens." }),
  ],
});
