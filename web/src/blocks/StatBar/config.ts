import type { Block } from "payload";

export const StatBar: Block = {
  slug: "stat-bar",
  labels: { singular: "Stat Bar", plural: "Stat Bars" },
  fields: [
    {
      name: "stats",
      type: "array",
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
      defaultValue: [
        { value: "12+", label: "Brands Represented" },
        { value: "6", label: "Territories" },
        { value: "40+", label: "Years Combined Experience" },
      ],
    },
  ],
};
