import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { homepageContent as c } from "@/content/homepage";
import { site } from "@/lib/site";
import {
  Eyebrow,
  PrimaryCta,
  SecondaryCta,
  StitchContainer,
} from "@/components/stitch/ui";

export function HeroBlock() {
  return (
    <section className="border-b border-white/10 bg-gradient-to-b from-[#0f1720] to-[#0a0f14]">
      <StitchContainer className="py-16 sm:py-20 lg:py-28">
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
          <PrimaryCta href="/contact">{site.ctaLabel}</PrimaryCta>
          <p className="max-w-xl text-sm leading-relaxed text-slate-400">
            {c.hero.ctaSupporting}
          </p>
        </div>
      </StitchContainer>
    </section>
  );
}

export function ExploreGridBlock() {
  const cards = [
    {
      href: "/playbook",
      title: "Playbook",
      blurb:
        "From first conversation to a decision-grade readout — qualify, frame, diligence, decide.",
    },
    {
      href: "/problem",
      title: "Problem",
      blurb: c.problemDeepDive.title,
    },
    {
      href: "/segments",
      title: "Segments",
      blurb: "Investment groups, Indigenous Development Corporations, and infrastructure-backed developers.",
    },
    {
      href: "/services",
      title: "Services",
      blurb:
        "Connective tissue across site, power, cooling, supply chain, and pro forma — one readiness narrative.",
    },
    {
      href: "/compare",
      title: "Compare",
      blurb: "Konative vs. typical fragmented paths — ownership, timing, deliverables, engagement model.",
    },
    {
      href: "/engagement",
      title: "Engagement",
      blurb: `${c.engagement.title} ${c.engagement.pricingNote}`,
    },
    {
      href: "/trust",
      title: "Trust",
      blurb:
        "Clarity and discipline — domain understanding of site, power, cooling, supply chain, and timing.",
    },
    {
      href: "/contact",
      title: "Contact",
      blurb: "Request a Project Readiness Review and next steps.",
    },
  ] as const;

  return (
    <section className="border-t border-white/10">
      <StitchContainer className="py-16 sm:py-20">
        <Eyebrow>Explore</Eyebrow>
        <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
          Decision-grade readiness, screen by screen
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Each page mirrors the Konative.com Stitch build — structured for
          editing in <code className="text-[#00E5FF]/90">web/content/homepage.ts</code>.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-white/10 bg-[#0f1720]/50 p-5 transition hover:border-[#00E5FF]/35 hover:bg-[#0f1720]/80"
            >
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#00E5FF] group-hover:text-[#33ebff]">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {card.blurb}
              </p>
              <span className="mt-3 inline-block text-xs font-medium text-slate-500 group-hover:text-slate-300">
                Open page →
              </span>
            </Link>
          ))}
        </div>
      </StitchContainer>
    </section>
  );
}

export function PlaybookTimelineBlock() {
  return (
    <section className="border-t border-white/10">
      <StitchContainer className="py-16 sm:py-20">
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
      </StitchContainer>
    </section>
  );
}

export function QualificationBlock() {
  return (
    <section className="border-t border-white/10 bg-[#0f1720]/80">
      <StitchContainer className="py-14">
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
          <SecondaryCta href="/contact">{site.ctaLabel}</SecondaryCta>
        </div>
      </StitchContainer>
    </section>
  );
}

export function SegmentsBlock() {
  return (
    <section className="border-t border-white/10">
      <StitchContainer className="py-16 sm:py-20">
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
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.value}</p>
            </div>
          ))}
        </div>
      </StitchContainer>
    </section>
  );
}

export function ProblemBlock() {
  return (
    <section className="border-t border-white/10">
      <StitchContainer className="py-16 sm:py-20">
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
      </StitchContainer>
    </section>
  );
}

export function StalledBlock() {
  return (
    <section className="border-t border-white/10 bg-[#0f1720]/40">
      <StitchContainer className="py-16 sm:py-20">
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
      </StitchContainer>
    </section>
  );
}

export function ConnectiveBlock() {
  return (
    <section className="border-t border-white/10">
      <StitchContainer className="py-16 sm:py-20">
        <Eyebrow>{c.connectiveTissue.eyebrow}</Eyebrow>
        <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
          {c.connectiveTissue.title}
        </h2>
        <p className="mt-8 max-w-3xl border-l-4 border-[#00E5FF] pl-6 text-lg leading-relaxed text-slate-200">
          {c.connectiveTissue.statement}
        </p>
      </StitchContainer>
    </section>
  );
}

export function WhatWeDoBlock() {
  return (
    <section className="border-t border-white/10">
      <StitchContainer className="py-16 sm:py-20">
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
      </StitchContainer>
    </section>
  );
}

export function ComparisonBlock() {
  return (
    <section className="border-t border-white/10">
      <StitchContainer className="py-16 sm:py-20">
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
      </StitchContainer>
    </section>
  );
}

export function EngagementBlock() {
  return (
    <section className="border-t border-white/10">
      <StitchContainer className="py-16 sm:py-20">
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
        <div className="mt-6">
          <PrimaryCta href="/contact">{site.ctaLabel}</PrimaryCta>
        </div>
      </StitchContainer>
    </section>
  );
}

export function TrustBlock() {
  return (
    <section className="border-t border-white/10 bg-[#0f1720]/30">
      <StitchContainer className="py-16 sm:py-20">
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
      </StitchContainer>
    </section>
  );
}

export function NextStepsBlock() {
  return (
    <section className="border-t border-white/10">
      <StitchContainer className="py-16 sm:py-20">
        <Eyebrow>{c.nextSteps.eyebrow}</Eyebrow>
        <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
          {c.nextSteps.title}
        </h2>
        <p className="mt-6 max-w-3xl text-slate-300">{c.nextSteps.body}</p>
      </StitchContainer>
    </section>
  );
}

export function ContactFormBlock() {
  return (
    <section className="border-t border-white/10 bg-[#0f1720]/60">
      <StitchContainer className="py-16 sm:py-20">
        <Eyebrow>{c.contact.eyebrow}</Eyebrow>
        <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
          {c.contact.headline}
        </h2>
        <p className="mt-6 max-w-2xl text-slate-300">{c.contact.supporting}</p>
        <div className="mt-10 rounded-xl border border-white/10 bg-[#0a0f14]/80 p-6 sm:p-8">
          <InquiryForm />
        </div>
      </StitchContainer>
    </section>
  );
}
