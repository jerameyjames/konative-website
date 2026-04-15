import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

/** Subset of `pg.Pool` options we pass through (avoids depending on `@types/pg`). */
type PgPoolInput =
  | { connectionString: string }
  | {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
      ssl: boolean;
    };

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
 * Resolve pg Pool options without ever passing an empty `connectionString` (pg would then
 * fall back to raw `process.env.DATABASE_URL`, which can be a broken integration value).
 */
function resolvePostgresPoolConfig(): PgPoolInput {
  const keys = [
    "POSTGRES_PRISMA_URL",
    "DATABASE_URL",
    "POSTGRES_URL",
    "DATABASE_URI",
  ] as const;

  for (const key of keys) {
    const raw = process.env[key];
    const ok = tryPostgresConnectionString(raw);
    if (ok) return { connectionString: ok };
  }
  const discrete = tryDiscretePoolConfig();
  if (discrete) return discrete;
  // Never return `{}` or `{ connectionString: "" }` — `pg` would then read raw `process.env.DATABASE_URL`.
  // Last resort: explicit localhost so failures are connection refused, not a bogus hostname from env.
  return {
    connectionString: "postgres://127.0.0.1:65535/__konative_db_unresolved__",
  };
}

/** When integration URLs are wrong, Neon/Vercel still expose PG* discrete variables. */
function tryDiscretePoolConfig(): PgPoolInput | null {
  const host =
    process.env.PGHOST?.trim() ??
    process.env.PGHOST_UNPOOLED?.trim() ??
    process.env.POSTGRES_HOST?.trim();
  const user = process.env.PGUSER?.trim() ?? process.env.POSTGRES_USER?.trim();
  const password = process.env.PGPASSWORD ?? process.env.POSTGRES_PASSWORD;
  const database =
    process.env.PGDATABASE?.trim() ??
    process.env.POSTGRES_DATABASE?.trim() ??
    process.env.POSTGRES_DB?.trim();
  if (!host || !user || password === undefined || password === "" || !database) return null;
  if (!isPlausiblePostgresHostname(host)) return null;
  const port = Number.parseInt(process.env.PGPORT?.trim() || "5432", 10);
  return {
    host,
    port,
    user,
    password,
    database,
    ssl: true,
  };
}

function tryPostgresConnectionString(raw: string | undefined): string | null {
  const s = raw?.trim();
  if (!s || !/^postgres(ql)?:\/\//i.test(s)) return null;
  try {
    const u = new URL(s);
    const host = u.hostname;
    if (!isPlausiblePostgresHostname(host)) return null;
    return s;
  } catch {
    return null;
  }
}

/** Reject placeholders, encrypted Vercel blobs pasted as URLs, and non-DNS-looking hosts. */
function isPlausiblePostgresHostname(host: string): boolean {
  if (!host || host === "base") return false;
  // Mistaken encrypted integration value used as URL (hostname becomes a long eyJ… blob).
  if (host.startsWith("eyJ") && host.length > 40) return false;
  if (host.length > 200) return false;
  if (host === "localhost" || host === "127.0.0.1") return true;
  // Real RDS / Neon / Supabase hosts are DNS names with a TLD.
  return host.includes(".");
}

const dbAdapter = postgresAdapter({
  pool: resolvePostgresPoolConfig(),
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
