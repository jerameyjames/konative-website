import { defineField, defineType } from "sanity";

export const deal = defineType({
  name: "deal",
  title: "Deal",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "entity", type: "string" }),
    defineField({ name: "dealType", type: "string", title: "Type" }),
    defineField({ name: "size", type: "string" }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "ACTIVE" },
          { title: "Announced", value: "ANNOUNCED" },
          { title: "Closed", value: "CLOSED" },
        ],
      },
    }),
    defineField({ name: "geography", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "order", type: "number" }),
  ],
});
