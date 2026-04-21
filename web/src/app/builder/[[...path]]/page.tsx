import { BuilderVisualPage } from "../../../builder/BuilderVisualPage";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ path?: string[] }>;
};

export default async function BuilderCatchAll({ params }: Props) {
  const { path = [] } = await params;
  const suffix = path.length ? path.join("/") : "";
  const urlPath = suffix ? `/${suffix}` : "/";

  return <BuilderVisualPage urlPath={urlPath} />;
}
