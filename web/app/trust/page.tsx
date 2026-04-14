import type { Metadata } from "next";
import {
  NextStepsBlock,
  PageLeadBlock,
  QualificationBlock,
  TrustBlock,
} from "@/components/stitch/blocks";
import { BottomCtaBand, StitchMain } from "@/components/stitch/ui";
import { homepageContent as c } from "@/content/homepage";

export const metadata: Metadata = {
  title: "Trust",
  description: c.trust.body,
};

export default function TrustPage() {
  return (
    <StitchMain>
      <PageLeadBlock slug="trust" />
      <TrustBlock />
      <NextStepsBlock />
      <QualificationBlock />
      <BottomCtaBand headline={c.bottomCta.headline} sub={c.bottomCta.sub} />
    </StitchMain>
  );
}
