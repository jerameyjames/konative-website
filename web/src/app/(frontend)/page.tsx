import PageTemplate from "./[slug]/page";

export const dynamic = "force-dynamic";

/** `/` is not under `[slug]`; ensure the same page receives an explicit `home` slug. */
export default async function HomePage({
  params,
}: {
  params?: Promise<{ slug?: string }>;
}) {
  return PageTemplate({
    params: params ?? Promise.resolve({ slug: "home" }),
  });
}
