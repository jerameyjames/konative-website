import type { CollectionConfig } from "payload";

export const NEWS_SOURCE_COUNTRY_OPTIONS = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
];

export const NEWS_TOPIC_OPTIONS = [
  { label: "Data Center Construction", value: "construction" },
  { label: "Permitting and Zoning", value: "permitting" },
  { label: "Rules and Regulations", value: "regulations" },
  { label: "Capital Spend and Investment", value: "investment" },
  { label: "Utility and Power", value: "power" },
  { label: "Sustainability and Water", value: "sustainability" },
  { label: "Tax and Incentives", value: "tax" },
];

export const NewsSources: CollectionConfig = {
  slug: "news-sources",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "sourceType", "active", "priority", "updatedAt"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "sourceType",
      type: "select",
      required: true,
      defaultValue: "rss",
      options: [
        { label: "RSS/Atom Feed", value: "rss" },
        { label: "Official Newsroom", value: "newsroom" },
        { label: "Government Portal", value: "government" },
        { label: "Industry Site", value: "industry" },
      ],
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "priority",
      type: "number",
      defaultValue: 50,
      min: 1,
      max: 100,
      admin: {
        position: "sidebar",
        description: "Higher values are ingested first.",
      },
    },
    {
      name: "sourceUrl",
      type: "text",
      required: true,
      admin: {
        description: "Canonical website URL for attribution.",
      },
    },
    {
      name: "feedUrl",
      type: "text",
      admin: {
        description: "RSS/Atom endpoint URL.",
      },
    },
    {
      name: "countries",
      type: "select",
      hasMany: true,
      required: true,
      options: NEWS_SOURCE_COUNTRY_OPTIONS,
      defaultValue: ["us", "ca"],
    },
    {
      name: "topics",
      type: "select",
      hasMany: true,
      required: true,
      options: NEWS_TOPIC_OPTIONS,
      defaultValue: ["construction", "regulations", "investment"],
    },
    {
      name: "notes",
      type: "textarea",
    },
    {
      name: "lastIngestedAt",
      type: "date",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "lastIngestError",
      type: "textarea",
      admin: {
        readOnly: true,
      },
    },
  ],
};
