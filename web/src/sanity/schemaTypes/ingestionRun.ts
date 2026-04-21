import { defineField, defineType } from "sanity";

export const ingestionRun = defineType({
  name: "ingestionRun",
  title: "Ingestion run",
  type: "document",
  fields: [
    defineField({ name: "runLabel", type: "string" }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Running", value: "running" },
          { title: "Succeeded", value: "succeeded" },
          { title: "Partial", value: "partial" },
          { title: "Failed", value: "failed" },
        ],
      },
    }),
    defineField({ name: "source", type: "reference", to: [{ type: "newsSource" }] }),
    defineField({ name: "startedAt", type: "datetime" }),
    defineField({ name: "completedAt", type: "datetime" }),
    defineField({ name: "itemsDiscovered", type: "number" }),
    defineField({ name: "itemsCreated", type: "number" }),
    defineField({ name: "itemsSkipped", type: "number" }),
    defineField({ name: "errorLog", type: "text" }),
  ],
});
