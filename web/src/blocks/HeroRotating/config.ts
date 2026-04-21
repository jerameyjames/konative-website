export const HeroRotating = {
  slug: "hero-rotating",
  labels: { singular: "Hero Rotating", plural: "Hero Rotating" },
  fields: [
    { name: "headline", type: "text", required: true, defaultValue: "Expect More" },
    {
      name: "rotatingWords",
      type: "array",
      minRows: 2,
      fields: [{ name: "word", type: "text", required: true }],
      defaultValue: [
        { word: "Results" },
        { word: "Reach" },
        { word: "Revenue" },
        { word: "Representation" },
      ],
    },
    { name: "subtitle", type: "textarea" },
    { name: "ctaLabel", type: "text", defaultValue: "Partner With Us" },
    { name: "ctaLink", type: "text", defaultValue: "/contact" },
    { name: "backgroundImage", type: "upload", relationTo: "media" },
  ],
};
