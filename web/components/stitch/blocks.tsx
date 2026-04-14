import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { StitchImage } from "@/components/stitch/stitch-image";
import { homepageContent as c } from "@/content/homepage";
import { stitchImages } from "@/content/media";
import { pageLeads, type PageLeadSlug } from "@/content/pages";
import { site } from "@/lib/site";
import {
  Eyebrow,
  PrimaryCta,
  SecondaryCta,
  StitchBleed,
  StitchContainer,
} from "@/components/stitch/ui";

const glass =
  "rounded-3xl border border-white/10 bg-slate-950/55 p-8 shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-10";

export function PageLeadBlock({ slug }: { slug: PageLeadSlug }) {
  const p = pageLeads[slug];
  return (
    <section className="border-b border-white/10 pb-12 md:pb-20">
      <StitchBleed>
        <div className="relative min-h-[56vh] sm:min-h-[60vh] md:min-h-[min(76vh,920px)]">
          <StitchImage
            src={p.image.src}
            alt={p.image.alt}
            fill
            priority
            sizes="100vw"
            className="scale-105 brightness-[0.72] saturate-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/25 md:bg-gradient-to-r md:from-slate-950 md:via-slate-950/65 md:to-slate-950/20" />
        </div>
      </StitchBleed>
      <StitchContainer className="relative z-10 -mt-28 sm:-mt-36 md:-mt-40">
        <div className={`max-w-3xl ${glass}`}>
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h1 className="font-[family-name:var(--font-display)] mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.08]">
            {p.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">
            {p.body}
          </p>
          <blockquote className="mt-8 border-l-4 border-cyan-400/70 pl-5 text-sm italic leading-relaxed text-slate-300 sm:text-base">
            {p.pullQuote}
          </blockquote>
        </div>
      </StitchContainer>
    </section>
  );
}

export function HeroBlock() {
  return (
    <section className="border-b border-white/10 pb-14 md:pb-24">
      <StitchBleed>
        <div className="relative min-h-[58vh] sm:min-h-[62vh] md:min-h-[min(88vh,980px)]">
          <StitchImage
            src={stitchImages.hero.src}
            alt={stitchImages.hero.alt}
            fill
            priority
            sizes="100vw"
            className="scale-105 brightness-[0.68] saturate-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-cyan-950/20 md:bg-gradient-to-r md:from-slate-950 md:via-slate-950/55 md:to-cyan-950/25" />
        </div>
      </StitchBleed>
      <StitchContainer className="relative z-10 -mt-32 sm:-mt-40 md:-mt-48">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className={`lg:col-span-7 ${glass}`}>
            <Eyebrow>{c.hero.eyebrow}</Eyebrow>
            <h1 className="font-[family-name:var(--font-display)] mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.05]">
              {c.hero.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
              {c.hero.subhead}
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {c.hero.aside}
            </p>
            <ul className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              {c.hero.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-gradient-to-br from-cyan-400 to-violet-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                    aria-hidden
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <PrimaryCta href="/contact">{site.ctaLabel}</PrimaryCta>
              <p className="max-w-xl text-sm leading-relaxed text-slate-400">
                {c.hero.ctaSupporting}
              </p>
            </div>
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function ExploreGridBlock() {
  return (
    <section className="border-t border-white/10 bg-slate-950/40 py-16 md:py-24">
      <StitchContainer>
        <Eyebrow>Explore</Eyebrow>
        <h2 className="font-[family-name:var(--font-display)] mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Image-first routes through the readiness stack
        </h2>
        <p className="mt-5 max-w-3xl text-lg text-slate-400">
          Each page pairs large architectural or capital-market plates with dense
          technical narrative — built for teams who think in MW, quarters, and
          IC decks.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {c.exploreScreens.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 shadow-xl shadow-black/40 transition hover:border-cyan-400/35 hover:shadow-cyan-500/10"
            >
              <div className="relative min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]">
                <StitchImage
                  src={card.image.src}
                  alt={`${card.title} — ${card.image.alt}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="transition duration-700 group-hover:scale-[1.04] group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
                <span className="absolute bottom-4 left-4 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white drop-shadow-lg md:text-3xl">
                  {card.title}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <p className="flex-1 text-sm leading-relaxed text-slate-400 md:text-base">
                  {card.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300/90 group-hover:text-cyan-200">
                  Enter
                  <span aria-hidden>→</span>
                </span>
              </div>
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
      <StitchBleed>
        <div className="relative min-h-[48vh] md:min-h-[min(58vh,640px)]">
          <StitchImage
            src={stitchImages.playbook.src}
            alt={stitchImages.playbook.alt}
            fill
            sizes="100vw"
            className="brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
        </div>
      </StitchBleed>
      <StitchContainer className="py-16 md:py-24">
        <div className="max-w-3xl">
          <Eyebrow>{c.playbookTimeline.eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            {c.playbookTimeline.title}
          </h2>
          <p className="mt-6 text-lg text-slate-300">{c.playbookTimeline.intro}</p>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            {c.playbookTimeline.secondaryIntro}
          </p>
        </div>
        <ol className="mt-14 space-y-8 border-l border-cyan-400/40 pl-8 md:mt-20">
          {c.playbookTimeline.phases.map((phase) => (
            <li key={phase.phase} className="relative">
              <span className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-sm bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_16px_rgba(34,211,238,0.45)] ring-4 ring-slate-950" />
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                {phase.phase}
              </p>
              <p className="mt-2 max-w-3xl text-slate-400">{phase.detail}</p>
            </li>
          ))}
        </ol>
      </StitchContainer>
    </section>
  );
}

export function QualificationBlock() {
  return (
    <section className="border-t border-white/10 bg-slate-950/35 py-16 md:py-24">
      <StitchContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{c.qualificationCta.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {c.qualificationCta.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-slate-300">{c.qualificationCta.body}</p>
            <ul className="mt-8 list-disc space-y-3 pl-6 text-slate-400">
              {c.qualificationCta.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-10">
              <SecondaryCta href="/contact">{site.ctaLabel}</SecondaryCta>
            </div>
          </div>
          <div className="relative min-h-[min(52vh,560px)] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 lg:min-h-[min(64vh,720px)]">
            <StitchImage
              src={stitchImages.contact.src}
              alt={stitchImages.contact.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="brightness-[0.75]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function SegmentsBlock() {
  return (
    <section className="border-t border-white/10 py-16 md:py-24">
      <StitchContainer>
        <Eyebrow>{c.customerSegments.eyebrow}</Eyebrow>
        <h2 className="font-[family-name:var(--font-display)] mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          {c.customerSegments.title}
        </h2>
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {c.customerSegments.segments.map((s) => (
            <article
              key={s.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 shadow-xl shadow-black/40"
            >
              <div className="relative min-h-[min(38vh,420px)] sm:min-h-[320px]">
                <StitchImage
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="brightness-[0.78]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <h3 className="absolute bottom-5 left-5 right-5 font-[family-name:var(--font-display)] text-2xl font-semibold text-white drop-shadow-md">
                  {s.title}
                </h3>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-base leading-relaxed text-slate-300">{s.value}</p>
                <p className="mt-5 text-sm leading-relaxed text-slate-500">{s.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </StitchContainer>
    </section>
  );
}

export function ProblemBlock() {
  return (
    <section className="border-t border-white/10 py-16 md:py-24">
      <StitchContainer>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Eyebrow>{c.problemDeepDive.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              {c.problemDeepDive.title}
            </h2>
            <div className="mt-8 space-y-5 text-lg text-slate-300">
              {c.problemDeepDive.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <ul className="mt-10 list-disc space-y-3 pl-6 text-slate-400">
              {c.problemDeepDive.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[min(50vh,520px)] lg:sticky lg:top-24 lg:col-span-7 lg:min-h-[min(72vh,780px)]">
            <div className="relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
              <StitchImage
                src={stitchImages.problem.src}
                alt={stitchImages.problem.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="brightness-[0.72]"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-slate-950/40" />
            </div>
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function StalledBlock() {
  return (
    <section className="border-t border-white/10 bg-slate-950/45 py-16 md:py-24">
      <StitchContainer>
        <Eyebrow>{c.stalledToDeployed.eyebrow}</Eyebrow>
        <h2 className="font-[family-name:var(--font-display)] mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {c.stalledToDeployed.title}
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {c.stalledToDeployed.steps.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-7 backdrop-blur-md"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                {s.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{s.copy}</p>
            </div>
          ))}
        </div>
      </StitchContainer>
    </section>
  );
}

export function ConnectiveBlock() {
  return (
    <section className="border-t border-white/10 py-16 md:py-24">
      <StitchBleed>
        <div className="relative min-h-[min(50vh,560px)] md:min-h-[min(56vh,620px)]">
          <StitchImage
            src={stitchImages.explorePower.src}
            alt={stitchImages.explorePower.alt}
            fill
            sizes="100vw"
            className="brightness-[0.65]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/30" />
          <StitchContainer className="relative z-10 flex min-h-[min(50vh,560px)] items-center py-20 md:min-h-[min(56vh,620px)] md:py-28">
            <div className="max-w-2xl">
              <Eyebrow>{c.connectiveTissue.eyebrow}</Eyebrow>
              <h2 className="font-[family-name:var(--font-display)] mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                {c.connectiveTissue.title}
              </h2>
              <p className="mt-8 border-l-4 border-cyan-400 pl-6 text-xl leading-relaxed text-slate-100">
                {c.connectiveTissue.statement}
              </p>
              <p className="mt-8 text-base leading-relaxed text-slate-400">
                {c.connectiveTissue.supporting}
              </p>
            </div>
          </StitchContainer>
        </div>
      </StitchBleed>
    </section>
  );
}

export function WhatWeDoBlock() {
  return (
    <section className="border-t border-white/10 py-16 md:py-24">
      <StitchContainer>
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>{c.whatKonativeDoes.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              {c.whatKonativeDoes.title}
            </h2>
            <p className="mt-8 text-lg text-slate-300">{c.whatKonativeDoes.body}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {c.whatKonativeDoes.pillars.map((pillar) => (
                <div
                  key={pillar}
                  className="rounded-xl border border-white/10 bg-slate-950/50 px-4 py-4 text-sm font-medium text-slate-200 backdrop-blur-sm"
                >
                  {pillar}
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[min(48vh,520px)] lg:col-span-6 lg:min-h-[min(70vh,760px)]">
            <div className="relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
              <StitchImage
                src={stitchImages.services.src}
                alt={stitchImages.services.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="brightness-[0.7]"
              />
            </div>
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function ComparisonBlock() {
  return (
    <section className="border-t border-white/10 py-16 md:py-24">
      <StitchContainer>
        <Eyebrow>{c.comparison.eyebrow}</Eyebrow>
        <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          {c.comparison.title}
        </h2>
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-12">
          <div className="relative min-h-[min(44vh,480px)] lg:col-span-5 lg:min-h-[min(64vh,700px)]">
            <div className="relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
              <StitchImage
                src={stitchImages.compare.src}
                alt={stitchImages.compare.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="brightness-[0.72]"
              />
            </div>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/50 shadow-xl lg:col-span-7">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-black/60">
                  <th className="px-5 py-4 font-semibold text-slate-500"> </th>
                  <th className="px-5 py-4 font-semibold text-cyan-300">
                    {c.comparison.columns.konative}
                  </th>
                  <th className="px-5 py-4 font-semibold text-slate-500">
                    {c.comparison.columns.others}
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.comparison.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-4 font-medium text-white">{row.feature}</td>
                    <td className="px-5 py-4 text-slate-300">{row.konative}</td>
                    <td className="px-5 py-4 text-slate-500">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function EngagementBlock() {
  return (
    <section className="border-t border-white/10 py-16 md:py-24">
      <StitchContainer>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>{c.engagement.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              {c.engagement.title}
            </h2>
            <p className="mt-8 text-lg text-slate-300">{c.engagement.body}</p>
            <ul className="mt-8 list-disc space-y-3 pl-6 text-slate-400">
              {c.engagement.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="mt-8 font-semibold text-cyan-300">{c.engagement.pricingNote}</p>
            <div className="mt-10">
              <PrimaryCta href="/contact">{site.ctaLabel}</PrimaryCta>
            </div>
          </div>
          <div className="relative min-h-[min(50vh,540px)] lg:col-span-6 lg:min-h-[min(72vh,800px)]">
            <div className="relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
              <StitchImage
                src={stitchImages.engagement.src}
                alt={stitchImages.engagement.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="brightness-[0.68]"
              />
            </div>
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function TrustBlock() {
  return (
    <section className="border-t border-white/10 bg-slate-950/40 py-16 md:py-24">
      <StitchContainer>
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>{c.trust.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              {c.trust.title}
            </h2>
            <p className="mt-8 text-lg text-slate-300">{c.trust.body}</p>
            <ul className="mt-8 list-disc space-y-3 pl-6 text-slate-400">
              {c.trust.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[min(48vh,500px)] lg:col-span-6 lg:min-h-[min(70vh,760px)]">
            <div className="relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
              <StitchImage
                src={stitchImages.trust.src}
                alt={stitchImages.trust.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function NextStepsBlock() {
  return (
    <section className="border-t border-white/10 py-16 md:py-24">
      <StitchBleed>
        <div className="relative min-h-[min(48vh,520px)] md:min-h-[min(54vh,600px)]">
          <StitchImage
            src={stitchImages.exploreCooling.src}
            alt={stitchImages.exploreCooling.alt}
            fill
            sizes="100vw"
            className="brightness-[0.62]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/25" />
          <StitchContainer className="relative z-10 flex min-h-[inherit] flex-col justify-end py-16 md:py-24">
            <div className={`max-w-2xl ${glass}`}>
              <Eyebrow>{c.nextSteps.eyebrow}</Eyebrow>
              <h2 className="font-[family-name:var(--font-display)] mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {c.nextSteps.title}
              </h2>
              <p className="mt-6 text-lg text-slate-300">{c.nextSteps.body}</p>
            </div>
          </StitchContainer>
        </div>
      </StitchBleed>
    </section>
  );
}

export function ContactFormBlock() {
  return (
    <section className="border-t border-white/10 bg-slate-950/35 py-16 md:py-24">
      <StitchContainer>
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>{c.contact.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              {c.contact.headline}
            </h2>
            <p className="mt-8 text-lg text-slate-300">{c.contact.supporting}</p>
          </div>
          <div className="relative hidden min-h-[min(52vh,560px)] lg:col-span-7 lg:block">
            <div className="relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
              <StitchImage
                src={stitchImages.hero.src}
                alt={stitchImages.hero.alt}
                fill
                sizes="50vw"
                className="brightness-[0.7]"
              />
            </div>
          </div>
        </div>
        <div className="mt-12 rounded-2xl border border-white/10 bg-slate-950/50 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10 md:mt-16">
          <InquiryForm />
        </div>
      </StitchContainer>
    </section>
  );
}
