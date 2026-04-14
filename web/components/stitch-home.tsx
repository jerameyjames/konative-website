import {
  ComparisonBlock,
  ConnectiveBlock,
  EngagementBlock,
  ExploreGridBlock,
  HeroBlock,
  MarketWindowBlock,
  NextStepsBlock,
  ProblemBlock,
  QualificationBlock,
  SegmentsBlock,
  TrustBlock,
  WhatWeDoBlock,
} from "@/components/stitch/blocks";
import { BottomCtaBand, StitchMain } from "@/components/stitch/ui";
import { homepageContent as c } from "@/content/homepage";

export function StitchHome() {
  return (
    <StitchMain>
      <HeroBlock />
      <MarketWindowBlock />
      <ProblemBlock />
      <WhatWeDoBlock />
      <ConnectiveBlock />
      <SegmentsBlock />
      <EngagementBlock />
      <TrustBlock />
      <ComparisonBlock />
      <ExploreGridBlock />
      <NextStepsBlock />
      <QualificationBlock />
      <BottomCtaBand headline={c.bottomCta.headline} sub={c.bottomCta.sub} />
    </StitchMain>
  );
}
