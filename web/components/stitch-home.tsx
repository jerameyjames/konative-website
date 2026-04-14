import { InquiryForm } from "@/components/inquiry-form";
import { homepageContent as c } from "@/content/homepage";
import { site } from "@/lib/site";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00E5FF]/90">
      {children}
    </p>
  );
}

export function StitchHome() {
  return (
    <main className="bg-[#0a0f14] text-slate-100">
      {/* Hero — Konative Professional Hero */}
      <section
        id="hero"
        className="scroll-mt-20 border-b border-white/10 bg-gradient-to-b from-[#0f1720] to-[#0a0f14]"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <Eyebrow>{c.hero.eyebrow}</Eyebrow>
          <h1 className="font-[family-name:var(--font-display)] mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-tight">
            {c.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            {c.hero.subhead}
          </p>
          <ul className="mt-8 flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {c.hero.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00E5FF]"
                  aria-hidden
                />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md bg-[#00E5FF] px-5 py-3 text-sm font-semibold text-[#0a0f14] shadow-[0_0_24px_rgba(0,229,255,0.25)] transition hover:bg-[#33ebff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF]"
            >
              {site.ctaLabel}
            </a>
            <p className="max-w-xl text-sm leading-relaxed text-slate-400">
              {c.hero.ctaSupporting}
            </p>
          </div>
        </div>
      </section>

      {/* Playbook timeline */}
      <section id="playbook" className="scroll-mt-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Eyebrow>{c.playbookTimeline.eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {c.playbookTimeline.title}
          </h2>
          <p className="mt-4 max-w-3xl text-slate-300">{c.playbookTimeline.intro}</p>
          <ol className="mt-10 space-y-6 border-l border-[#00E5FF]/40 pl-6">
            {c.playbookTimeline.phases.map((p) => (
              <li key={p.phase} className="relative">
                <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full bg-[#00E5FF] ring-4 ring-[#0a0f14]" />
                <p className="font-semibold text-white">{p.phase}</p>
                <p className="mt-1 text-slate-400">{p.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Qualification CTA band */}
      <section
        id="qualification"
        className="scroll-mt-20 border-t border-white/10 bg-[#0f1720]/80"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <Eyebrow>{c.qualificationCta.eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {c.qualificationCta.title}
          </h2>
          <p className="mt-4 max-w-3xl text-slate-300">{c.qualificationCta.body}</p>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-400">
            {c.qualificationCta.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-flex rounded-md border border-[#00E5FF]/50 bg-[#00E5FF]/10 px-5 py-2.5 text-sm font-semibold text-[#00E5FF] transition hover:bg-[#00E5FF]/20"
            >
              {site.ctaLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Customer segments */}
      <section id="segments" className="scroll-mt-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Eyebrow>{c.customerSegments.eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {c.customerSegments.title}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {c.customerSegments.segments.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-white/10 bg-[#0f1720]/60 p-6 shadow-lg shadow-black/20"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#00E5FF]">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem deep dive */}
      <section id="problem" className="scroll-mt-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Eyebrow>{c.problemDeepDive.eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {c.problemDeepDive.title}
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-slate-300">
            {c.problemDeepDive.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 list-disc space-y-2 pl-5 text-slate-400">
            {c.problemDeepDive.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stalled → deployed */}
      <section
        id="stalled"
        className="scroll-mt-20 border-t border-white/10 bg-[#0f1720]/40"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Eyebrow>{c.stalledToDeployed.eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {c.stalledToDeployed.title}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {c.stalledToDeployed.steps.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-white/10 bg-[#0a0f14] p-5"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[#00E5FF]">
                  {s.label}
                </p>
                <p className="mt-3 text-sm text-slate-400">{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connective tissue */}
      <section id="connective" className="scroll-mt-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Eyebrow>{c.connectiveTissue.eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {c.connectiveTissue.title}
          </h2>
          <p className="mt-8 max-w-3xl border-l-4 border-[#00E5FF] pl-6 text-lg leading-relaxed text-slate-200">
            {c.connectiveTissue.statement}
          </p>
        </div>
      </section>

      {/* What we do + pillars */}
      <section id="what-we-do" className="scroll-mt-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Eyebrow>{c.whatKonativeDoes.eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {c.whatKonativeDoes.title}
          </h2>
          <p className="mt-6 max-w-3xl text-slate-300">{c.whatKonativeDoes.body}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {c.whatKonativeDoes.pillars.map((p) => (
              <div
                key={p}
                className="rounded-lg border border-white/10 bg-[#0f1720]/50 px-4 py-3 text-sm font-medium text-slate-200"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section id="comparison" className="scroll-mt-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Eyebrow>{c.comparison.eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {c.comparison.title}
          </h2>
          <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#0f1720]">
                  <th className="px-4 py-3 font-semibold text-slate-400"> </th>
                  <th className="px-4 py-3 font-semibold text-[#00E5FF]">
                    {c.comparison.columns.konative}
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-400">
                    {c.comparison.columns.others}
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.comparison.rows.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-white">{row.feature}</td>
                    <td className="px-4 py-3 text-slate-300">{row.konative}</td>
                    <td className="px-4 py-3 text-slate-500">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section id="engagement" className="scroll-mt-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Eyebrow>{c.engagement.eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {c.engagement.title}
          </h2>
          <p className="mt-6 max-w-3xl text-slate-300">{c.engagement.body}</p>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-400">
            {c.engagement.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="mt-6 font-medium text-[#00E5FF]">{c.engagement.pricingNote}</p>
          <a
            href="#contact"
            className="mt-6 inline-flex rounded-md bg-[#00E5FF] px-5 py-2.5 text-sm font-semibold text-[#0a0f14] hover:bg-[#33ebff]"
          >
            {site.ctaLabel}
          </a>
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="scroll-mt-20 border-t border-white/10 bg-[#0f1720]/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Eyebrow>{c.trust.eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {c.trust.title}
          </h2>
          <p className="mt-6 max-w-3xl text-slate-300">{c.trust.body}</p>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-400">
            {c.trust.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next steps */}
      <section id="next-steps" className="scroll-mt-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Eyebrow>{c.nextSteps.eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {c.nextSteps.title}
          </h2>
          <p className="mt-6 max-w-3xl text-slate-300">{c.nextSteps.body}</p>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-20 border-t border-white/10 bg-[#0f1720]/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Eyebrow>{c.contact.eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {c.contact.headline}
          </h2>
          <p className="mt-6 max-w-2xl text-slate-300">{c.contact.supporting}</p>
          <div className="mt-10 rounded-xl border border-white/10 bg-[#0a0f14]/80 p-6 sm:p-8">
            <InquiryForm />
          </div>
        </div>
      </section>

      {/* Bottom CTA — Konative Professional Footer band */}
      <section className="border-t border-[#00E5FF]/20 bg-gradient-to-r from-[#0f1720] to-[#0a0f14]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white sm:text-2xl">
                {c.bottomCta.headline}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                {c.bottomCta.sub}
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#00E5FF] px-5 py-2.5 text-sm font-semibold text-[#0a0f14] shadow-lg transition hover:bg-[#33ebff]"
            >
              {site.ctaLabel}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
