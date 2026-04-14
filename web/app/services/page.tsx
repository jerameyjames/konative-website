import type { Metadata } from "next";
import {
  ConnectiveBlock,
  PageLeadBlock,
  WhatWeDoBlock,
} from "@/components/stitch/blocks";
import { BottomCtaBand, StitchMain } from "@/components/stitch/ui";
import { homepageContent as c } from "@/content/homepage";

export const metadata: Metadata = {
  title: "Services",
  description: c.whatKonativeDoes.body,
};

export default function ServicesPage() {
  return (
    <StitchMain>
      <PageLeadBlock slug="services" />
      <ConnectiveBlock />
      <WhatWeDoBlock />
      <BottomCtaBand headline={c.bottomCta.headline} sub={c.bottomCta.sub} />
    </StitchMain>
  );
}
