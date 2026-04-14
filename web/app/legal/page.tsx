import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal",
  description: "Legal notices for konative.com.",
};

export default function LegalPage() {
  return (
    <main className="min-h-[50vh] bg-[#0a0f14] py-10 sm:py-14">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white px-4 py-12 shadow-xl sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          Legal notice
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          Last updated: April 13, 2026. Have counsel review before publishing
          broadly.
        </p>
        <div className="mt-10 max-w-none space-y-6 text-slate-700">
          <h2 className="text-lg font-semibold text-slate-900">
            Informational content
          </h2>
          <p>
            This website is provided for general information about Konative and
            its services. It does not constitute engineering, financial, legal,
            or investment advice. Any project-specific decisions should be
            based on your own diligence and professional advisors.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">No offer</h2>
          <p>
            Nothing on this website constitutes an offer to sell or a
            solicitation to buy securities or any other interest. Engagement
            terms are discussed directly with qualified counterparties.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">Accuracy</h2>
          <p>
            We aim to keep this site accurate, but we do not warrant that
            content is complete or current at all times.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">Trademarks</h2>
          <p>
            “Konative” and related branding are trademarks or trade names used
            in connection with Konative services. All rights reserved.
          </p>
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
        </div>
      </div>
    </main>
  );
}
