import { BuilderVisualPage } from "../../builder/BuilderVisualPage";

import LegacyHomePage from "./LegacyHomePage";

export default function HomePage() {
  const useBuilder =
    Boolean(process.env.NEXT_PUBLIC_BUILDER_API_KEY) &&
    process.env.NEXT_PUBLIC_USE_LEGACY_HOME !== "true";

  if (useBuilder) {
    return <BuilderVisualPage urlPath="/" />;
  }
  return <LegacyHomePage />;
}
