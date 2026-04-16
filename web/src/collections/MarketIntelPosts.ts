import type { CollectionConfig } from "payload";

export const MarketIntelPosts: CollectionConfig = {
  slug: "market-intel-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "sourceName", "publishedDate"],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "summary", type: "textarea", required: true },
    { name: "sourceUrl", type: "text", required: true },
    { name: "sourceName", type: "text", required: true },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Power / Grid", value: "power_grid" },
        { label: "Investment / M&A", value: "investment_ma" },
        { label: "Modular Build", value: "modular_build" },
        { label: "Tribal / Indigenous", value: "tribal_indigenous" },
        { label: "Saudi / Gulf", value: "saudi_gulf" },
        { label: "Supply Chain", value: "supply_chain" },
        { label: "Industry News", value: "industry_news" },
        { label: "Regulatory", value: "regulatory" },
      ],
    },
    { name: "publishedDate", type: "date", required: true },
    {
      name: "curatorNote",
      type: "textarea",
      admin: {
        description:
          "Jeramey's practitioner commentary — this is the IP that differentiates from raw aggregation",
      },
    },
    { name: "isPublished", type: "checkbox", defaultValue: false },
  ],
};
