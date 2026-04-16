import type { CollectionConfig } from "payload";

export const IngestionRuns: CollectionConfig = {
  slug: "ingestion-runs",
  admin: {
    useAsTitle: "runLabel",
    defaultColumns: ["runLabel", "status", "itemsCreated", "startedAt"],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => false,
  },
  fields: [
    {
      name: "runLabel",
      type: "text",
      required: true,
      admin: {
        description: "Human-readable run identifier.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "running",
      options: [
        { label: "Running", value: "running" },
        { label: "Succeeded", value: "succeeded" },
        { label: "Partial", value: "partial" },
        { label: "Failed", value: "failed" },
      ],
    },
    {
      name: "source",
      type: "relationship",
      relationTo: "news-sources",
      admin: {
        description: "Set for per-source runs; blank for global runs.",
      },
    },
    {
      name: "startedAt",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: "completedAt",
      type: "date",
    },
    {
      name: "itemsDiscovered",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "itemsCreated",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "itemsSkipped",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "errorLog",
      type: "textarea",
    },
  ],
};
