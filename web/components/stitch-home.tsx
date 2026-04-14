import { BottomCtaBand, StitchMain } from "@/components/stitch/ui";
import { ExploreGridBlock, HeroBlock } from "@/components/stitch/blocks";
import { homepageContent as c } from "@/content/homepage";

export function StitchHome() {
  return (
    <StitchMain>
      <HeroBlock />
      <ExploreGridBlock />
      <BottomCtaBand headline={c.bottomCta.headline} sub={c.bottomCta.sub} />
    </StitchMain>
  );
}
