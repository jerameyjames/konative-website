import { createClient, type SanityClient } from "@sanity/client";

import { apiVersion, assertSanityEnv } from "./env";

let _client: SanityClient | null = null;

/** Read-only client. Safe for Server Components and Route Handlers. */
export function getSanityReadClient(): SanityClient {
  if (_client) return _client;
  const { projectId, dataset } = assertSanityEnv();
  _client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });
  return _client;
}
