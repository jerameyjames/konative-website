export const CTABand = {
  slug: "cta-band",
  labels: { singular: "CTA Band", plural: "CTA Bands" },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Ready to grow your brand in the Pacific Northwest?" },
    { name: "ctaLabel", type: "text", defaultValue: "Start the Conversation" },
    { name: "ctaLink", type: "text", defaultValue: "/contact" },
    {
      name: "style",
      type: "select",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Warm", value: "warm" },
        { label: "Neutral", value: "neutral" },
      ],
      defaultValue: "primary",
    },
  ],
};
