import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

// Collections
import { Pages } from "./src/collections/Pages";
import { Services } from "./src/collections/Services";
import { Testimonials } from "./src/collections/Testimonials";
import { TeamMembers } from "./src/collections/TeamMembers";
import { FormSubmissions } from "./src/collections/FormSubmissions";
import { Media } from "./src/collections/Media";

// Globals
import { SiteSettings } from "./src/globals/SiteSettings";
import { Navigation } from "./src/globals/Navigation";
import { Theme } from "./src/globals/Theme";
import { SEODefaults } from "./src/globals/SEODefaults";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
  collections: [Pages, Services, Testimonials, TeamMembers, FormSubmissions, Media],
  globals: [SiteSettings, Navigation, Theme, SEODefaults],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "CHANGE_ME",
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI ||
        process.env.POSTGRES_URL ||
        process.env.DATABASE_URL ||
        "",
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
});
