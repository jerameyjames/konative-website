export const ThreeCardGrid = {
  slug: "three-card-grid",
  labels: { singular: "Three Card Grid", plural: "Three Card Grids" },
  fields: [
    { name: "sectionTitle", type: "text" },
    {
      name: "cards",
      type: "array",
      minRows: 1,
      maxRows: 3,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        { name: "linkLabel", type: "text", defaultValue: "Learn More" },
        { name: "linkUrl", type: "text" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
