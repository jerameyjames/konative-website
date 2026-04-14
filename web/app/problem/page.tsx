import type { Metadata } from "next";
import { ProblemBlock, StalledBlock } from "@/components/stitch/blocks";
import { BottomCtaBand, StitchMain } from "@/components/stitch/ui";
import { homepageContent as c } from "@/content/homepage";

export const metadata: Metadata = {
  title: "Problem",
  description: c.problemDeepDive.paragraphs[0],
};

export default function ProblemPage() {
  return (
    <StitchMain>
      <ProblemBlock />
      <StalledBlock />
      <BottomCtaBand headline={c.bottomCta.headline} sub={c.bottomCta.sub} />
    </StitchMain>
  );
}
