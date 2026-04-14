import type { Metadata } from "next";
import { ComparisonBlock } from "@/components/stitch/blocks";
import { BottomCtaBand, StitchMain } from "@/components/stitch/ui";
import { homepageContent as c } from "@/content/homepage";

export const metadata: Metadata = {
  title: "Compare",
  description: `${c.comparison.title} — Konative vs. typical fragmented diligence paths.`,
};

export default function ComparePage() {
  return (
    <StitchMain>
      <ComparisonBlock />
      <BottomCtaBand headline={c.bottomCta.headline} sub={c.bottomCta.sub} />
    </StitchMain>
  );
}
