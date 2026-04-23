import { builder, type BuilderContent } from "@builder.io/sdk";

const PAGE_MODEL = "page";

/**
 * Fetches Builder page content for a URL path (App Router / server).
 * Use optional BUILDER_PRIVATE_API_KEY on the server so drafts/private models resolve in the visual editor.
 */
export async function getBuilderPageContent(urlPath: string): Promise<BuilderContent | null> {
  const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY?.trim();
  if (!apiKey) return null;

  builder.init(apiKey);
  const privateKey = process.env.BUILDER_PRIVATE_API_KEY?.trim();

  try {
    const content = await builder
      .get(PAGE_MODEL, {
        userAttributes: { urlPath },
        cacheSeconds: 60,
        ...(privateKey ? { authToken: privateKey } : {}),
      })
      .toPromise();

    return content ?? null;
  } catch {
    return null;
  }
}
