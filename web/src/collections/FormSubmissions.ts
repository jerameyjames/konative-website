import type { CollectionConfig } from "payload";

export const FormSubmissions: CollectionConfig = {
  slug: "form-submissions",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "company", "type", "createdAt"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "company", type: "text" },
    { name: "phone", type: "text" },
    { name: "message", type: "textarea" },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Partnership Inquiry", value: "partnership" },
        { label: "General", value: "general" },
        { label: "Career", value: "career" },
      ],
      defaultValue: "general",
    },
  ],
};
