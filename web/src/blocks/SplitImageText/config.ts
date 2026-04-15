import type { Block } from "payload";

export const SplitImageText: Block = {
  slug: "split-image-text",
  labels: { singular: "Split Image + Text", plural: "Split Image + Text" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
    { name: "ctaLabel", type: "text" },
    { name: "ctaLink", type: "text" },
    { name: "image", type: "upload", relationTo: "media", required: true },
    {
      name: "imagePosition",
      type: "select",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
      defaultValue: "right",
    },
  ],
};
