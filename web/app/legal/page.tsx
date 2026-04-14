import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { stitchImages } from "@/content/media";

export const metadata: Metadata = {
  title: "Legal",
  description: "Legal notices for konative.com.",
};

export default function LegalPage() {
  return (
    <main className="min-h-[50vh] bg-[var(--stitch-page)] py-10 sm:py-14">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[color:var(--stitch-line)] bg-[var(--stitch-card)] shadow-xl shadow-stone-900/10">
        <div className="relative aspect-[21/9] w-full">
          <Image
            src={stitchImages.services.src}
            alt={stitchImages.services.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
              Legal
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Legal notice
            </h1>
          </div>
        </div>
        <div className="px-4 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <p className="text-sm text-slate-600">
            Last updated: April 13, 2026. This is a launch placeholder for a B2B
            infrastructure advisory context — have counsel review before relying on
            it as a compliance posture.
          </p>
          <div className="mt-10 max-w-none space-y-8 text-slate-700">
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Informational content
              </h2>
              <p>
                This website is provided for general information about Konative
                and its services related to modular data center development
                readiness. It does not constitute engineering sign-off, grid
                interconnection advice, financial advice, legal advice, or
                investment advice. Project-specific decisions should be based on
                your own diligence and appropriately licensed professionals.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">No offer</h2>
              <p>
                Nothing on this website constitutes an offer to sell or a
                solicitation to buy securities, partnership interests, or any
                other financial instrument. Engagement terms, scope, fees, and
                liability caps (if any) are discussed directly with qualified
                counterparties and documented in a written agreement when you
                proceed.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Third-party statements and links
              </h2>
              <p>
                The site may reference industry patterns, public data, or
                illustrative scenarios. References to vendors, utilities, or
                technologies are not endorsements unless explicitly stated.
                External links are provided for convenience; we do not control
                third-party sites.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Accuracy</h2>
              <p>
                We aim to keep this site accurate, but infrastructure markets,
                regulatory requirements, and equipment lead times change quickly.
                We do not warrant completeness, merchantability, or fitness for a
                particular purpose.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Limitation of liability
              </h2>
              <p>
                To the maximum extent permitted by law, Konative and its
                personnel disclaim liability for losses arising from reliance on
                this website. Some jurisdictions do not allow certain limitations;
                those limits apply only to the extent permitted.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Trademarks</h2>
              <p>
                “Konative” and related branding are trademarks or trade names used
                in connection with Konative services. All rights reserved.
                Third-party marks belong to their owners.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Governing law</h2>
              <p>
                The governing law and venue for disputes should be specified with
                counsel based on where Konative contracts and where counterparties
                operate. Placeholder text only until finalized.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Contact</h2>
              <p>
                For legal notices, use the contact path published on this site once
                finalized.
              </p>
              <p>
                <Link href="/" className="font-medium text-slate-900 underline">
                  Back to home
                </Link>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
