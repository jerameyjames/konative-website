import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { stitchImages } from "@/content/media";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Konative collects, uses, and protects personal information submitted through konative.com.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-[50vh] bg-[color:var(--background)] py-10 sm:py-14">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[color:var(--stitch-border-ghost)] bg-[color:var(--surface-container-lowest)] shadow-[0_32px_64px_-24px_rgba(43,52,55,0.12)] backdrop-blur-xl">
        <div className="relative aspect-[21/9] w-full">
          <Image
            src={stitchImages.trust.src}
            alt={stitchImages.trust.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--stitch-scrim-strong)] via-[color:var(--stitch-scrim-mid)] to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--on-surface-variant)]">
              Privacy
            </p>
            <h1 className="font-[family-name:var(--font-display)] mt-1 text-2xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-3xl">
              Privacy policy
            </h1>
          </div>
        </div>
        <div className="px-4 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <p className="text-sm text-[color:var(--on-surface-variant)]">
            Last updated: April 13, 2026. This page is written as a realistic B2B
            infrastructure placeholder — have counsel review before publishing
            broadly or using it as a compliance artifact.
          </p>
          <div className="mt-10 max-w-none space-y-8 text-[color:var(--on-surface-variant)]">
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-[color:var(--on-surface)]">Who we are</h2>
              <p>
                Konative (“we”, “us”) operates konative.com to describe modular
                data center development readiness services and to receive project
                inquiries from qualified counterparties. Konative is used as a
                business name under Tolowa Pacific; registered address and
                corporate identifiers will be published here when finalized with
                counsel.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-[color:var(--on-surface)]">
                What we collect
              </h2>
              <p>
                When you submit the Project Readiness Review form, we collect the
                fields you choose to provide — commonly name, email, organization
                type, geography, project stage, urgency, and free-text project
                notes. We may also collect technical metadata typical of web
                forms and hosting logs (for example IP address, user agent, and
                timestamps) as needed for security and abuse prevention.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-[color:var(--on-surface)]">
                How we use information
              </h2>
              <p>We use inquiry information to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>respond to you about your project and next steps</li>
                <li>evaluate whether Konative is an appropriate fit and timing</li>
                <li>coordinate follow-up with our team and any explicitly involved partners</li>
                <li>improve the clarity of our qualification process based on aggregate patterns</li>
              </ul>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-[color:var(--on-surface)]">
                Sensitive or Indigenous-nation context
              </h2>
              <p>
                If you disclose nation, community, or governance-sensitive details,
                we treat that information as confidential project context unless
                you direct otherwise. Do not submit information you are not
                authorized to share; when in doubt, describe the situation at a
                level your counsel and leadership are comfortable circulating.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-[color:var(--on-surface)]">Legal basis</h2>
              <p>
                Depending on your jurisdiction, processing may be based on
                legitimate interests (responding to business inquiries),
                pre-contractual steps, or consent where required. Final legal
                basis statements should be confirmed with counsel for each market
                you actively serve.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-[color:var(--on-surface)]">Retention</h2>
              <p>
                We retain inquiry records for as long as needed to operate the
                business, defend claims, and meet legal obligations. Engineering
                and hosting backups may persist for a window after deletion
                requests — your counsel can help define retention schedules and
                deletion SLAs appropriate to your risk posture.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-[color:var(--on-surface)]">Sharing</h2>
              <p>
                We do not sell your personal information. We may share information
                with subprocessors who help us operate the website, email, CRM, or
                hosting (for example Vercel for web delivery), under agreements
                that require appropriate safeguards. A subprocessors list can be
                published here as your vendor stack stabilizes.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-[color:var(--on-surface)]">Security</h2>
              <p>
                We use reasonable administrative and technical measures to protect
                information submitted through this site. No method of transmission
                over the Internet is completely secure; high-sensitivity materials
                should be shared through channels your team approves explicitly.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-[color:var(--on-surface)]">Your choices</h2>
              <p>
                You may request access, correction, or deletion where applicable
                law provides those rights. We will verify requests to reduce fraud
                and accidental disclosure. Response timelines depend on jurisdiction
                and operational capacity — counsel can align this section to GDPR,
                PIPEDA, or other regimes you target.
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-[color:var(--on-surface)]">Contact</h2>
              <p>
                For privacy questions, use the contact path published on this site
                once finalized, or reach through your existing Konative
                relationship.
              </p>
              <p>
                <Link
                  href="/"
                  className="font-medium text-[color:var(--primary)] underline decoration-[color:var(--outline-variant)] underline-offset-4 hover:opacity-80"
                >
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
