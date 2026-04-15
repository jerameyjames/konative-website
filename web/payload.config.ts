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

/**
 * Neon/Vercel set several names. Prefer the first *valid* URL — integration vars can be
 * present but wrong (e.g. host literally `base` from an unsubstituted template).
 */
function postgresConnectionString(): string {
  const keys = [
    "POSTGRES_PRISMA_URL",
    "DATABASE_URL",
    "POSTGRES_URL",
    "DATABASE_URI",
  ] as const;

  for (const key of keys) {
    const raw = process.env[key];
    const ok = tryPostgresConnectionString(raw);
    if (ok) return ok;
  }
  return "";
}

function tryPostgresConnectionString(raw: string | undefined): string | null {
  const s = raw?.trim();
  if (!s || !/^postgres(ql)?:\/\//i.test(s)) return null;
  try {
    const u = new URL(s);
    const host = u.hostname;
    // Broken templates / placeholders surface as host "base" (ENOTFOUND base in prod).
    if (!host || host === "base") return null;
    return s;
  } catch {
    return null;
  }
}

const dbAdapter = postgresAdapter({
  pool: { connectionString: postgresConnectionString() },
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
  collections: [Pages, Services, Testimonials, TeamMembers, FormSubmissions, Media],
  globals: [SiteSettings, Navigation, Theme, SEODefaults],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "CHANGE_ME",
  db: dbAdapter,
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
});
