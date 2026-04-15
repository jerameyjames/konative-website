#!/usr/bin/env node
/**
 * Pull production env from SOURCE (CLI resolves Neon strings), upsert plain values to DEST.
 *
 * Usage:
 *   VERCEL_SOURCE=konative-website VERCEL_DEST=konative-site node scripts/vercel-copy-plain-env-from-project.mjs
 *
 * Requires: vercel login. Run from repo root.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEAM_ID = "team_VXgn8H1ps59Gt0dAIPFrn2JG";
const SOURCE = process.env.VERCEL_SOURCE || "konative-website";
const DEST = process.env.VERCEL_DEST || "konative-site";

const KEYS = [
  "POSTGRES_URL",
  "DATABASE_URL",
  "DATABASE_URI",
  "PAYLOAD_SECRET",
  "NEXT_PUBLIC_SITE_URL",
  "BLOB_READ_WRITE_TOKEN",
];

function getToken() {
  const authPath = path.join(
    os.homedir(),
    "Library/Application Support/com.vercel.cli/auth.json",
  );
  return JSON.parse(fs.readFileSync(authPath, "utf8")).token;
}

function parseEnvFile(p) {
  const out = {};
  const raw = fs.readFileSync(p, "utf8");
  for (const line of raw.split("\n")) {
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i === -1) continue;
    const k = line.slice(0, i);
    let v = line.slice(i + 1);
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

async function upsert(key, value, type) {
  const token = getToken();
  const res = await fetch(
    `https://api.vercel.com/v10/projects/${encodeURIComponent(DEST)}/env?teamId=${TEAM_ID}&upsert=true`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
        value,
        type,
        target: ["production", "preview", "development"],
      }),
    },
  );
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${key} → ${res.status}: ${text.slice(0, 400)}`);
  }
}

async function main() {
  console.log(`Copy plain env: ${SOURCE} → ${DEST} (team ${TEAM_ID})`);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "vcenv-"));
  const envPath = path.join(tmp, ".env.pulled");

  try {
    execFileSync(
      "npx",
      [
        "vercel@51.2.1",
        "link",
        "--yes",
        "--scope",
        "tolowastudioincubator",
        "--project",
        SOURCE,
      ],
      { cwd: tmp, stdio: "inherit" },
    );
    execFileSync(
      "npx",
      [
        "vercel@51.2.1",
        "env",
        "pull",
        envPath,
        "--environment",
        "production",
        "--yes",
      ],
      { cwd: tmp, stdio: "inherit" },
    );
    const env = parseEnvFile(envPath);
    for (const key of KEYS) {
      const value = env[key];
      if (!value) {
        console.log("skip (missing in source)", key);
        continue;
      }
      const type = key.startsWith("NEXT_PUBLIC_") ? "plain" : "encrypted";
      await upsert(key, value, type);
      console.log("OK upsert", key);
    }
    console.log("Done.");
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
