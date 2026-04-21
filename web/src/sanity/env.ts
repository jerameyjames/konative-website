export const apiVersion = "2024-01-01";

export function assertSanityEnv(): { projectId: string; dataset: string } {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  }
  return { projectId, dataset };
}
