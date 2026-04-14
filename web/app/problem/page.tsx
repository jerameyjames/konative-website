import type { Metadata } from "next";
import { PageLeadBlock, ProblemBlock, StalledBlock } from "@/components/stitch/blocks";
import { BottomCtaBand, StitchMain } from "@/components/stitch/ui";
import { homepageContent as c } from "@/content/homepage";

export const metadata: Metadata = {
  title: "Problem",
  description: c.problemDeepDive.paragraphs[0],
};

export default function ProblemPage() {
  return (
    <StitchMain>
      <PageLeadBlock slug="problem" />
      <ProblemBlock />
      <StalledBlock />
      <BottomCtaBand headline={c.bottomCta.headline} sub={c.bottomCta.sub} />
    </StitchMain>
  );
}
