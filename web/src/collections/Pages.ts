import type { CollectionConfig } from "payload";
import { HeroRotating } from "../blocks/HeroRotating/config";
import { ThreeCardGrid } from "../blocks/ThreeCardGrid/config";
import { StatBar } from "../blocks/StatBar/config";
import { SplitImageText } from "../blocks/SplitImageText/config";
import { CTABand } from "../blocks/CTABand/config";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL}${data?.slug === "home" ? "/" : `/${data?.slug}`}`,
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { position: "sidebar" },
    },
    {
      name: "layout",
      type: "blocks",
      blocks: [HeroRotating, ThreeCardGrid, StatBar, SplitImageText, CTABand],
    },
    {
      name: "meta",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
