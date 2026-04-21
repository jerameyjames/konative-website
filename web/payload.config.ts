import { buildConfig } from "payload";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

// Collections
import { Pages } from "./src/collections/Pages";
import { Services } from "./src/collections/Services";
import { Testimonials } from "./src/collections/Testimonials";
import { TeamMembers } from "./src/collections/TeamMembers";
import { FormSubmissions } from "./src/collections/FormSubmissions";
import { MarketIntelPosts } from "./src/collections/MarketIntelPosts";
import { Media } from "./src/collections/Media";
import { NewsSources } from "./src/collections/NewsSources";
import { NewsItems } from "./src/collections/NewsItems";
import { IngestionRuns } from "./src/collections/IngestionRuns";

// Globals
import { SiteSettings } from "./src/globals/SiteSettings";
import { Navigation } from "./src/globals/Navigation";
import { Theme } from "./src/globals/Theme";
import { SEODefaults } from "./src/globals/SEODefaults";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Vercel + Neon integration stores env values as integration tokens in the dashboard;
 * `@vercel/postgres` resolves them at runtime. Do not pass a manual `pool` here unless
 * you are using a plain `postgres://` URL (e.g. local Docker). See Payload docs:
 * `vercelPostgresAdapter()` with no args uses `POSTGRES_URL` / platform defaults.
 */
const dbAdapter = vercelPostgresAdapter({ push: true });

export default buildConfig({
  admin: {
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL}${data?.slug === "home" ? "/" : `/${data?.slug}`}`,
      collections: ["pages"],
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    Pages,
    Services,
    Testimonials,
    TeamMembers,
    FormSubmissions,
    MarketIntelPosts,
    Media,
    NewsSources,
    NewsItems,
    IngestionRuns,
  ],
  globals: [SiteSettings, Navigation, Theme, SEODefaults],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "CHANGE_ME",
  db: dbAdapter,
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
});
