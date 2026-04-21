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
import { Users } from "./src/collections/Users";

// Migrations
import * as InitMigration from "./src/migrations/20240421_000000_init";

// Globals
import { SiteSettings } from "./src/globals/SiteSettings";
import { Navigation } from "./src/globals/Navigation";
import { Theme } from "./src/globals/Theme";
import { SEODefaults } from "./src/globals/SEODefaults";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Non-pooling URL required for DDL — PgBouncer blocks CREATE TABLE.
const dbAdapter = vercelPostgresAdapter({
  pool: {
    connectionString:
      process.env.POSTGRES_URL_NON_POOLING ??
      process.env.DATABASE_URL_UNPOOLED ??
      process.env.POSTGRES_URL,
  },
  // prodMigrations runs on every cold start in production and applies any
  // pending migrations. InitMigration pushes the full schema on first deploy.
  prodMigrations: [InitMigration],
});

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
    Users,
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
