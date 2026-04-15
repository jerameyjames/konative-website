#!/usr/bin/env node
/**
 * One-time / ops: point konative-site at web/, copy env from konative-website,
 * move apex + www from konative-website → konative-site.
 *
 * Requires Vercel CLI login (token read from local auth.json). Does not print secret values.
 * Usage: node scripts/vercel-migrate-konative-site.mjs
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEAM_ID = "team_VXgn8H1ps59Gt0dAIPFrn2JG";
const SOURCE_PROJECT = "konative-website";
const DEST_PROJECT = "konative-site";
const DEST_PROJECT_ID = "prj_QW1tBoVik3QDoTu6vY8sMJS2xBZ5";
const DOMAINS = ["konative.com", "www.konative.com"];

function getToken() {
  const authPath = path.join(
    os.homedir(),
    "Library/Application Support/com.vercel.cli/auth.json",
  );
  if (!fs.existsSync(authPath)) {
    throw new Error(`Vercel auth not found at ${authPath} — run: vercel login`);
  }
  return JSON.parse(fs.readFileSync(authPath, "utf8")).token;
}

async function vercelFetch(url, options = {}) {
  const token = getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { _raw: text };
  }
  if (!res.ok) {
    const msg = json?.error?.message || json?.message || text.slice(0, 800);
    throw new Error(`${options.method || "GET"} ${url} → ${res.status}: ${msg}`);
  }
  return json;
}

async function patchRootDirectory() {
  await vercelFetch(
    `https://api.vercel.com/v9/projects/${DEST_PROJECT_ID}?teamId=${TEAM_ID}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rootDirectory: "web" }),
    },
  );
  console.log("OK: konative-site rootDirectory → web");
}

async function listAllEnvs(projectName, decrypt) {
  const out = [];
  let next = `https://api.vercel.com/v10/projects/${encodeURIComponent(projectName)}/env?teamId=${TEAM_ID}${decrypt ? "&decrypt=true" : ""}`;
  while (next) {
    const json = await vercelFetch(next);
    out.push(...(json.envs || []));
    next = json.pagination?.next      ? `https://api.vercel.com${json.pagination.next}`
      : null;
  }
  return out;
}

function postType(from) {
  if (from === "encrypted" || from === "sensitive") return "encrypted";
  return "plain";
}

async function syncEnv() {
  const source = await listAllEnvs(SOURCE_PROJECT, true);
  const dest = await listAllEnvs(DEST_PROJECT, false);
  const destKeyTargets = new Set(
    dest.flatMap((e) => {
      const t = Array.isArray(e.target) ? e.target : [e.target];
      return t.filter(Boolean).map((x) => `${e.key}@${x}`);
    }),
  );

  let n = 0;
  for (const e of source) {
    if (e.type === "system") continue;
    if (String(e.key).startsWith("VERCEL_")) continue;
    const targets = (Array.isArray(e.target) ? e.target : [e.target]).filter(
      (t) => t === "production" || t === "preview" || t === "development",
    );
    if (!targets.length) continue;
    const body = {
      key: e.key,
      value: e.value,
      type: postType(e.type),
      target: targets,
    };
    if (e.gitBranch) body.gitBranch = e.gitBranch;

    const needs = targets.some((t) => !destKeyTargets.has(`${e.key}@${t}`));
    if (!needs) continue;

    await vercelFetch(
      `https://api.vercel.com/v10/projects/${encodeURIComponent(DEST_PROJECT)}/env?teamId=${TEAM_ID}&upsert=true`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    n += 1;
    console.log(`OK: env upsert ${e.key} → ${targets.join(",")}`);
  }
  console.log(`OK: synced ${n} env upserts (skipped system / VERCEL_* / unchanged)`);
}

async function removeDomainFrom(project, domain) {
  const enc = encodeURIComponent(domain);
  await vercelFetch(
    `https://api.vercel.com/v9/projects/${encodeURIComponent(project)}/domains/${enc}?teamId=${TEAM_ID}`,
    { method: "DELETE" },
  );
  console.log(`OK: removed ${domain} from ${project}`);
}

async function addDomainTo(project, domain) {
  await vercelFetch(
    `https://api.vercel.com/v10/projects/${encodeURIComponent(project)}/domains?teamId=${TEAM_ID}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: domain }),
    },
  );
  console.log(`OK: added ${domain} to ${project}`);
}

async function moveDomains() {
  for (const d of DOMAINS) {
    try {
      await removeDomainFrom(SOURCE_PROJECT, d);
    } catch (e) {
      console.warn(`warn: remove ${d} from ${SOURCE_PROJECT}: ${e.message}`);
    }
  }
  for (const d of DOMAINS) {
    await addDomainTo(DEST_PROJECT, d);
  }
}

async function main() {
  await patchRootDirectory();
  await syncEnv();
  console.log(
    "\nNext: deploy production for konative-site (Git push or `vercel deploy --prod` from repo root), then run domain move if this is the first good production build.\n",
  );
  const doMove = process.argv.includes("--move-domains");
  if (doMove) {
    await moveDomains();
    console.log(
      "OK: domains moved. Verify DNS at registrar matches Vercel (see CLAUDE.md).",
    );
  } else {
    console.log(
      "Skip domain move (pass --move-domains after a successful production deployment).",
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
