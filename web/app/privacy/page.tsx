import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Konative collects, uses, and protects personal information submitted through konative.com.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-[50vh] bg-[#0a0f14] py-10 sm:py-14">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white px-4 py-12 shadow-xl sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Privacy
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          Privacy policy
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          Last updated: April 13, 2026. This is a launch placeholder — have
          counsel review before publishing broadly.
        </p>
        <div className="mt-10 max-w-none space-y-6 text-slate-700">
          <h2 className="text-lg font-semibold text-slate-900">Who we are</h2>
          <p>
            Konative (“we”, “us”) operates this website to provide information
            about our services and to receive project inquiries. Konative is an
            assumed business name; legal entity details will be published here
            as finalized.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">What we collect</h2>
          <p>
            When you submit the Project Readiness Review form, we collect the
            information you provide (such as name, email, organization type,
            geography, project stage, urgency, and project notes) in order to
            evaluate fit and respond to your inquiry.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            How we use information
          </h2>
          <p>We use inquiry information to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>respond to you about your project</li>
            <li>evaluate whether Konative is an appropriate fit</li>
            <li>coordinate follow-up with our team</li>
          </ul>
          <h2 className="text-lg font-semibold text-slate-900">Retention</h2>
          <p>
            We retain inquiry records for as long as needed to operate the
            business and meet legal obligations. Specific retention periods
            should be confirmed with counsel.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">Sharing</h2>
          <p>
            We do not sell your personal information. We may share information
            with service providers who help us operate the website or
            communications (for example, email or hosting), subject to
            appropriate agreements.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">Security</h2>
          <p>
            We use reasonable administrative and technical measures to protect
            information submitted through this site. No method of transmission
            over the Internet is completely secure.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">Contact</h2>
          <p>
            For privacy questions, contact us using the details published on
            this site once finalized, or through your existing Konative
            relationship.
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
