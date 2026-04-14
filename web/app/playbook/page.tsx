import type { Metadata } from "next";
import { PlaybookTimelineBlock, QualificationBlock } from "@/components/stitch/blocks";
import { BottomCtaBand, StitchMain } from "@/components/stitch/ui";
import { homepageContent as c } from "@/content/homepage";

export const metadata: Metadata = {
  title: "Playbook",
  description: c.playbookTimeline.intro,
};

export default function PlaybookPage() {
  return (
    <StitchMain>
      <PlaybookTimelineBlock />
      <QualificationBlock />
      <BottomCtaBand headline={c.bottomCta.headline} sub={c.bottomCta.sub} />
    </StitchMain>
  );
}
