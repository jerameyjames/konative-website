import type { Metadata } from "next";
import { EngagementBlock, QualificationBlock } from "@/components/stitch/blocks";
import { BottomCtaBand, StitchMain } from "@/components/stitch/ui";
import { homepageContent as c } from "@/content/homepage";

export const metadata: Metadata = {
  title: "Engagement",
  description: c.engagement.body,
};

export default function EngagementPage() {
  return (
    <StitchMain>
      <EngagementBlock />
      <QualificationBlock />
      <BottomCtaBand headline={c.bottomCta.headline} sub={c.bottomCta.sub} />
    </StitchMain>
  );
}
