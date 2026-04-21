import { createClient, type SanityClient } from "@sanity/client";

import { apiVersion, assertSanityEnv } from "./env";

let _client: SanityClient | null = null;

/** Token-backed client for ingestion and server-side writes. */
export function getSanityWriteClient(): SanityClient {
  if (_client) return _client;
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    throw new Error("Missing SANITY_API_TOKEN for write operations");
  }
  const { projectId, dataset } = assertSanityEnv();
  _client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
  return _client;
}
