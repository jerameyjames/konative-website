import { InquiryForm } from "@/components/inquiry-form";
import { site } from "@/lib/site";

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-stone-200/80 bg-[color:var(--background)] text-slate-900"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-slate-700">
          {children}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <section
        id="hero"
        className="scroll-mt-20 border-b border-stone-200/80 bg-gradient-to-b from-white to-[color:var(--background)]"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Modular data center development readiness
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl sm:leading-tight">
            De-risk modular data center development before delays cost you
            another 6–12 months.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            Konative helps investment groups and Indigenous Development
            Corporations make real go/no-go decisions faster by coordinating the
            front-end diligence that usually fragments across site, power,
            cooling, supply chain, and pro forma work.
          </p>
          <ul className="mt-8 flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" aria-hidden />
              Focused on modular data center development readiness
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" aria-hidden />
              Built for urgent, infrastructure-backed decisions
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" aria-hidden />
              Strong fit where land, capital, and timing are already in motion
            </li>
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              {site.ctaLabel}
            </a>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">
              For qualified projects, Konative begins with a decision-grade
              engagement designed to clarify viability, risks, and next
              commitments.{" "}
              <span className="font-medium text-slate-800">
                Engagement-based pricing.
              </span>
            </p>
          </div>
        </div>
      </section>

      <Section
        id="window"
        eyebrow="Market timing"
        title="This market is moving now, but the build path is still too slow."
      >
        <p>
          Data center demand is high, capital is ready to move, and viable land
          exists. Traditional build paths are too slow, and critical
          infrastructure decisions cannot wait. When power, turbines, cooling,
          and supply-chain commitments slip, the project does not just slow
          down — it can get pushed out another 6–12 months.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Capital is available now</li>
          <li>Land is available now</li>
          <li>Long-lead infrastructure decisions cannot wait</li>
          <li>Delay creates real timing and opportunity cost</li>
        </ul>
      </Section>

      <Section
        id="status-quo"
        eyebrow="The gap"
        title="Most teams are stuck between long timelines and fragmented expertise."
      >
        <p>
          The problem is rarely interest. The problem is execution clarity.
          Buyers are stuck waiting on traditional data center timelines,
          piecing together specialists across site, power, cooling, and
          infrastructure — and still ending up without one partner who owns
          the decision path.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Traditional timelines are too slow for the current capital window</li>
          <li>Specialist workstreams do not naturally integrate themselves</li>
          <li>
            Early-stage uncertainty creates stalled motion instead of confident
            action
          </li>
        </ul>
      </Section>

      <Section
        id="what-we-do"
        eyebrow="What Konative does"
        title="Konative acts as the development partner that brings the moving parts together."
      >
        <p>
          Konative helps qualified buyers move from early opportunity to
          decision-grade clarity. We coordinate the front-end diligence required
          to understand whether a modular data center project is viable, what
          the major risks are, and what must be secured next.
        </p>
        <div className="not-prose mt-8 grid gap-4 sm:grid-cols-2">
          {[
            "Site and land path",
            "Power path and infrastructure constraints",
            "Cooling and remote-environment implications",
            "Supply-chain and long-lead review",
            "Pro forma and decision framing",
            "Development-readiness orchestration",
          ].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="who-we-serve"
        eyebrow="Who we serve"
        title="Built for buyers who already have urgency, not just curiosity."
      >
        <p>
          Konative is especially focused on buyers who already have real
          pressure to act and need a credible front-end decision path.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold text-slate-900">
              Investment groups
            </span>{" "}
            looking to put capital to work in infrastructure with real urgency
          </li>
          <li>
            <span className="font-semibold text-slate-900">
              Indigenous Development Corporations
            </span>{" "}
            seeking a serious partner to help turn land and opportunity into a
            viable development path
          </li>
        </ul>
        <p className="text-sm text-slate-600">
          If your project is still purely exploratory, Konative may not be the
          right first step. The initial engagement is designed for qualified
          opportunities with real timing pressure.
        </p>
      </Section>

      <Section
        id="engagement"
        eyebrow="Phase one"
        title="The first step is a Development Readiness Engagement."
      >
        <p>
          Konative begins with a decision-grade engagement designed to answer
          the questions that determine whether a project should move forward
          now, what the major risks are, and what commitments must be secured
          next.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Project framing brief</li>
          <li>Site and infrastructure diligence memo</li>
          <li>Supply-chain and critical-path review</li>
          <li>Risk register</li>
          <li>Decision-grade pro forma</li>
          <li>Go / no-go recommendation</li>
          <li>Executive readout</li>
        </ul>
        <p className="font-medium text-slate-900">Engagement-based pricing.</p>
        <div className="not-prose pt-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            {site.ctaLabel}
          </a>
        </div>
      </Section>

      <Section
        id="trust"
        eyebrow="Trust"
        title="Trust should come from clarity, discipline, and domain understanding."
      >
        <p>
          Konative&apos;s first public trust layer does not depend on marketing
          theater. It comes from a clear understanding of the market, a
          disciplined engagement structure, and visible evidence that the team
          understands the complexity of site, power, cooling, supply chain, and
          timing.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Founder and team credentials (add specifics as approved)</li>
          <li>Geography and domain specificity — Canada, rural, and Indigenous context</li>
          <li>Anonymized sample deliverables or engagement patterns (as approved)</li>
          <li>Clear privacy, legal, and contact posture</li>
        </ul>
      </Section>

      <Section
        id="next-steps"
        eyebrow="Next step"
        title="A clear next step for qualified projects."
      >
        <p>
          When you request a Project Readiness Review, Konative reviews fit,
          urgency, and project context. Qualified opportunities move into a
          structured discussion around the phase-one engagement and the
          decision path required to move forward.
        </p>
      </Section>

      <section
        id="contact"
        className="scroll-mt-20 border-t border-stone-200/80 bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Request
          </p>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            If the window is open now, the front-end decision work cannot wait.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-700">
            Konative helps qualified buyers move from opportunity to
            decision-grade clarity before delay costs more time.
          </p>
          <InquiryForm />
        </div>
      </section>

      <section className="border-t border-stone-200/80 bg-slate-900 text-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Ready for a structured readiness conversation?
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
                Share context below. We will respond with fit, timing, and next
                steps for qualified projects.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-stone-100"
            >
              {site.ctaLabel}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
