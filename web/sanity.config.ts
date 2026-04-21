import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";

import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "konative",
  title: "Konative",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool(), unsplashImageAsset()],
  schema: {
    types: schemaTypes,
  },
});
