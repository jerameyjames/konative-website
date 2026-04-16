import type { CollectionConfig } from "payload";

import { NEWS_SOURCE_COUNTRY_OPTIONS, NEWS_TOPIC_OPTIONS } from "./NewsSources";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const NewsItems: CollectionConfig = {
  slug: "news-items",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "sourceName", "status"],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "published",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "url", type: "text", required: true },
    {
      name: "summary",
      type: "textarea",
    },
    {
      name: "contentType",
      type: "select",
      required: true,
      defaultValue: "news",
      options: [
        { label: "News", value: "news" },
        { label: "Regulatory Update", value: "regulation" },
        { label: "Investment Announcement", value: "investment" },
        { label: "Project Permitting", value: "permit" },
        { label: "Policy Analysis", value: "analysis" },
      ],
    },
    {
      name: "source",
      type: "relationship",
      relationTo: "news-sources",
      required: true,
      index: true,
    },
    {
      name: "sourceName",
      type: "text",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      index: true,
    },
    {
      name: "discoveredAt",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        readOnly: true,
      },
    },
    {
      name: "countries",
      type: "select",
      hasMany: true,
      options: NEWS_SOURCE_COUNTRY_OPTIONS,
      defaultValue: ["us"],
    },
    {
      name: "topics",
      type: "select",
      hasMany: true,
      options: NEWS_TOPIC_OPTIONS,
      defaultValue: ["construction", "regulations"],
    },
    {
      name: "ingestFingerprint",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        description: "Deduplication key from feed source + item metadata.",
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;

        const nextData = { ...data };
        const baseTitle = typeof nextData.title === "string" ? nextData.title : "";

        if (!nextData.slug && baseTitle) {
          const normalizedDate =
            typeof nextData.publishedAt === "string"
              ? nextData.publishedAt.slice(0, 10)
              : new Date().toISOString().slice(0, 10);
          nextData.slug = `${slugify(baseTitle)}-${normalizedDate}`;
        }

        return nextData;
      },
    ],
  },
};
