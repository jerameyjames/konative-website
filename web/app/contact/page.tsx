import type { Metadata } from "next";
import {
  ContactFormBlock,
  PageLeadBlock,
  QualificationBlock,
} from "@/components/stitch/blocks";
import { BottomCtaBand, StitchMain } from "@/components/stitch/ui";
import { homepageContent as c } from "@/content/homepage";

export const metadata: Metadata = {
  title: "Contact",
  description: `${c.contact.headline} ${c.contact.supporting}`,
};

export default function ContactPage() {
  return (
    <StitchMain>
      <PageLeadBlock slug="contact" />
      <QualificationBlock />
      <ContactFormBlock />
      <BottomCtaBand headline={c.bottomCta.headline} sub={c.bottomCta.sub} />
    </StitchMain>
  );
}
