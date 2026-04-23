import { BuilderVisualPage } from "../../../builder/BuilderVisualPage";
import { getBuilderPageContent } from "@/lib/builder/get-page-content";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ path?: string[] }>;
};

export default async function BuilderCatchAll({ params }: Props) {
  const { path = [] } = await params;
  const suffix = path.length ? path.join("/") : "";
  const urlPath = suffix ? `/${suffix}` : "/";

  const initialContent = await getBuilderPageContent(urlPath);
  return <BuilderVisualPage urlPath={urlPath} initialContent={initialContent} />;
}
