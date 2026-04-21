export const LatestNewsFeed = {
  slug: "latest-news-feed",
  labels: { singular: "Latest News Feed", plural: "Latest News Feeds" },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Datacenter News and Policy Feed",
    },
    {
      name: "intro",
      type: "textarea",
    },
    {
      name: "maxItems",
      type: "number",
      defaultValue: 8,
      min: 1,
      max: 20,
    },
    {
      name: "countryFilter",
      type: "select",
      options: [
        { label: "US + Canada", value: "all" },
        { label: "United States only", value: "us" },
        { label: "Canada only", value: "ca" },
      ],
      defaultValue: "all",
    },
    {
      name: "showSource",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "showPublishedDate",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "ctaLabel",
      type: "text",
    },
    {
      name: "ctaLink",
      type: "text",
    },
  ],
};
