import type { Metadata } from "next";
import { SegmentsBlock } from "@/components/stitch/blocks";
import { BottomCtaBand, StitchMain } from "@/components/stitch/ui";
import { homepageContent as c } from "@/content/homepage";

export const metadata: Metadata = {
  title: "Segments",
  description: `${c.customerSegments.title} — investment groups, Indigenous Development Corporations, infrastructure-backed developers.`,
};

export default function SegmentsPage() {
  return (
    <StitchMain>
      <SegmentsBlock />
      <BottomCtaBand headline={c.bottomCta.headline} sub={c.bottomCta.sub} />
    </StitchMain>
  );
}
