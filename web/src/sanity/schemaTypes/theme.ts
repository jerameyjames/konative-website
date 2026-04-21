import { defineField, defineType } from "sanity";

export const theme = defineType({
  name: "theme",
  title: "Theme",
  type: "document",
  fields: [
    defineField({ name: "primaryColor", type: "string", title: "Primary (hex)" }),
    defineField({ name: "accentColor", type: "string", title: "Accent (hex)" }),
    defineField({
      name: "tokens",
      type: "text",
      title: "Design tokens (JSON)",
      description: "Optional extended design tokens as a JSON object.",
      rows: 12,
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || typeof value !== "string") return true;
          try {
            const parsed = JSON.parse(value) as unknown;
            if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
              return "Must be a JSON object";
            }
          } catch {
            return "Invalid JSON";
          }
          return true;
        }),
    }),
  ],
});
