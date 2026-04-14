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
  "rounded-3xl border border-[color:var(--stitch-border-ghost)] bg-[color:var(--surface-container-lowest)]/95 p-8 shadow-[0_40px_80px_-28px_rgba(43,52,55,0.1)] backdrop-blur-2xl md:p-10";

/** Light scrim over photography — readable type, Stitch “tonal” feel */
const scrimPhotoLr =
  "bg-gradient-to-t from-[color:var(--stitch-scrim-strong)] via-[color:var(--stitch-scrim-mid)] to-[color:var(--stitch-scrim-soft)] md:bg-gradient-to-r md:from-[color:var(--stitch-scrim-strong)] md:via-[color:var(--stitch-scrim-mid)] md:to-[color:var(--stitch-scrim-soft)]";
const scrimPhotoTb =
  "bg-gradient-to-t from-[color:var(--stitch-scrim-strong)] via-[color:var(--stitch-scrim-mid)] to-[color:var(--stitch-scrim-soft)]";
const scrimPhotoRl =
  "bg-gradient-to-r from-[color:var(--stitch-scrim-strong)] via-[color:var(--stitch-scrim-mid)] to-transparent";

export function MarketWindowBlock() {
  const m = c.marketWindow;
  return (
    <section className="border-t border-[color:var(--stitch-line)]">
      <StitchBleed>
        <div className="relative min-h-[min(56vh,620px)] md:min-h-[min(62vh,720px)]">
          <StitchImage
            src={stitchImages.marketWindow.src}
            alt={stitchImages.marketWindow.alt}
            fill
            sizes="100vw"
            className="brightness-[0.9] saturate-[1.02]"
          />
          <div className={`absolute inset-0 ${scrimPhotoLr}`} />
          <StitchContainer className="relative z-10 flex min-h-[inherit] flex-col justify-center py-16 md:py-24">
            <Eyebrow>{m.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl md:text-5xl md:leading-[1.08]">
              {m.title}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[color:var(--on-surface)] md:text-xl">
              {m.body}
            </p>
            <ul className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed text-[color:var(--on-surface-variant)] sm:text-base">
              {m.bullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--primary)]"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {m.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[color:var(--stitch-border-ghost)] bg-[color:var(--surface-container-lowest)]/92 p-5 shadow-[0_20px_40px_-16px_rgba(43,52,55,0.08)] backdrop-blur-xl"
                >
                  <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[color:var(--on-surface)] md:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[color:var(--on-surface-variant)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </StitchContainer>
        </div>
      </StitchBleed>
    </section>
  );
}

export function PageLeadBlock({ slug }: { slug: PageLeadSlug }) {
  const p = pageLeads[slug];
  return (
    <section className="border-b border-[color:var(--stitch-line)] pb-12 md:pb-20">
      <StitchBleed>
        <div className="relative min-h-[56vh] sm:min-h-[60vh] md:min-h-[min(76vh,920px)]">
          <StitchImage
            src={p.image.src}
            alt={p.image.alt}
            fill
            priority
            sizes="100vw"
            className="scale-105 brightness-[0.9] saturate-[1.05]"
          />
          <div className={`absolute inset-0 ${scrimPhotoLr}`} />
        </div>
      </StitchBleed>
      <StitchContainer className="relative z-10 -mt-28 sm:-mt-36 md:-mt-40">
        <div className={`max-w-3xl ${glass}`}>
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h1 className="font-[family-name:var(--font-display)] mt-5 text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl md:text-5xl md:leading-[1.08]">
            {p.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[color:var(--on-surface)] sm:text-lg">
            {p.body}
          </p>
          <blockquote className="mt-8 border-l-4 border-[color:var(--primary)] pl-5 text-sm italic leading-relaxed text-[color:var(--on-surface-variant)] sm:text-base">
            {p.pullQuote}
          </blockquote>
        </div>
      </StitchContainer>
    </section>
  );
}

export function HeroBlock() {
  return (
    <section className="border-b border-[color:var(--stitch-line)] pb-14 md:pb-24">
      <StitchBleed>
        <div className="relative min-h-[58vh] sm:min-h-[62vh] md:min-h-[min(88vh,980px)]">
          <StitchImage
            src={stitchImages.hero.src}
            alt={stitchImages.hero.alt}
            fill
            priority
            sizes="100vw"
            className="scale-105 brightness-[0.88] saturate-[1.06]"
          />
          <div className={`absolute inset-0 ${scrimPhotoLr}`} />
        </div>
      </StitchBleed>
      <StitchContainer className="relative z-10 -mt-32 sm:-mt-40 md:-mt-48">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className={`lg:col-span-7 ${glass}`}>
            <Eyebrow>{c.hero.eyebrow}</Eyebrow>
            <h1 className="font-[family-name:var(--font-display)] mt-5 text-4xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-5xl md:text-6xl md:leading-[1.05]">
              {c.hero.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--on-surface)]">
              {c.hero.subhead}
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[color:var(--on-surface-variant)] sm:text-base">
              {c.hero.aside}
            </p>
            <ul className="mt-8 grid gap-3 text-sm text-[color:var(--on-surface-variant)] sm:grid-cols-2">
              {c.hero.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-[color:var(--primary)]"
                    aria-hidden
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <PrimaryCta href="/contact">{site.ctaLabel}</PrimaryCta>
              <SecondaryCta href="/engagement">Phase-one deliverables</SecondaryCta>
              <p className="w-full max-w-xl text-sm leading-relaxed text-[color:var(--on-surface-variant)] sm:mt-1">
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
    <section className="border-t border-[color:var(--stitch-line)] bg-[color:var(--surface-container-low)] py-16 md:py-24">
      <StitchContainer>
        <Eyebrow>{c.exploreSection.eyebrow}</Eyebrow>
        <h2 className="font-[family-name:var(--font-display)] mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl md:text-5xl">
          {c.exploreSection.title}
        </h2>
        <p className="mt-5 max-w-3xl text-lg text-[color:var(--on-surface-variant)]">{c.exploreSection.sub}</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {c.exploreScreens.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--stitch-border-ghost)] bg-[color:var(--surface-container-lowest)] shadow-[0_24px_48px_-16px_rgba(43,52,55,0.08)] transition hover:border-[color:var(--primary)] hover:shadow-[0_28px_56px_-18px_rgba(43,52,55,0.12)]"
            >
              <div className="relative min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]">
                <StitchImage
                  src={card.image.src}
                  alt={`${card.title} — ${card.image.alt}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="transition duration-700 group-hover:scale-[1.04] group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--stitch-scrim-strong)] via-[color:var(--stitch-scrim-soft)] to-transparent opacity-95" />
                <span className="absolute bottom-4 left-4 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[color:var(--on-surface)] drop-shadow-sm md:text-3xl">
                  {card.title}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <p className="flex-1 text-sm leading-relaxed text-[color:var(--on-surface-variant)] md:text-base">
                  {card.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--primary)] group-hover:opacity-80">
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
    <section className="border-t border-[color:var(--stitch-line)]">
      <StitchBleed>
        <div className="relative min-h-[48vh] md:min-h-[min(58vh,640px)]">
          <StitchImage
            src={stitchImages.playbook.src}
            alt={stitchImages.playbook.alt}
            fill
            sizes="100vw"
            className="brightness-[0.88]"
          />
          <div className={`absolute inset-0 ${scrimPhotoRl}`} />
        </div>
      </StitchBleed>
      <StitchContainer className="py-16 md:py-24">
        <div className="max-w-3xl">
          <Eyebrow>{c.playbookTimeline.eyebrow}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl md:text-5xl">
            {c.playbookTimeline.title}
          </h2>
          <p className="mt-6 text-lg text-[color:var(--on-surface-variant)]">{c.playbookTimeline.intro}</p>
          <p className="mt-5 text-base leading-relaxed text-[color:var(--on-surface-variant)]">
            {c.playbookTimeline.secondaryIntro}
          </p>
        </div>
        <ol className="mt-14 space-y-8 border-l border-[color:color-mix(in_srgb,var(--primary)_45%,var(--outline-variant))] pl-8 md:mt-20">
          {c.playbookTimeline.phases.map((phase) => (
            <li key={phase.phase} className="relative">
              <span className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-sm bg-[color:var(--primary)] ring-4 ring-[color:var(--background)]" />
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--on-surface)]">
                {phase.phase}
              </p>
              <p className="mt-2 max-w-3xl text-[color:var(--on-surface-variant)]">{phase.detail}</p>
            </li>
          ))}
        </ol>
      </StitchContainer>
    </section>
  );
}

export function QualificationBlock() {
  return (
    <section className="border-t border-[color:var(--stitch-line)] bg-[color:var(--surface-container)] py-16 md:py-24">
      <StitchContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{c.qualificationCta.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl">
              {c.qualificationCta.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-[color:var(--on-surface-variant)]">{c.qualificationCta.body}</p>
            <ul className="mt-8 list-disc space-y-3 pl-6 text-[color:var(--on-surface-variant)]">
              {c.qualificationCta.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-10">
              <SecondaryCta href="/contact">{site.ctaLabel}</SecondaryCta>
            </div>
          </div>
          <div className="relative min-h-[min(52vh,560px)] overflow-hidden rounded-2xl border border-[color:var(--stitch-border-ghost)] shadow-[0_32px_64px_-20px_rgba(43,52,55,0.1)] lg:min-h-[min(64vh,720px)]">
            <StitchImage
              src={stitchImages.contact.src}
              alt={stitchImages.contact.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="brightness-[0.88]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--stitch-scrim-strong)] via-transparent to-transparent" />
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function SegmentsBlock() {
  return (
    <section className="border-t border-[color:var(--stitch-line)] py-16 md:py-24">
      <StitchContainer>
        <Eyebrow>{c.customerSegments.eyebrow}</Eyebrow>
        <h2 className="font-[family-name:var(--font-display)] mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl md:text-5xl">
          {c.customerSegments.title}
        </h2>
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {c.customerSegments.segments.map((s) => (
            <article
              key={s.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-[color:var(--stitch-border-ghost)] bg-[color:var(--surface-container-lowest)] shadow-[0_24px_48px_-16px_rgba(43,52,55,0.08)]"
            >
              <div className="relative min-h-[min(38vh,420px)] sm:min-h-[320px]">
                <StitchImage
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--stitch-scrim-strong)] via-[color:var(--stitch-scrim-soft)] to-transparent" />
                <h3 className="absolute bottom-5 left-5 right-5 font-[family-name:var(--font-display)] text-2xl font-semibold text-[color:var(--on-surface)] drop-shadow-sm">
                  {s.title}
                </h3>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-base leading-relaxed text-[color:var(--on-surface-variant)]">{s.value}</p>
                <p className="mt-5 text-sm leading-relaxed text-[color:var(--outline)]">{s.detail}</p>
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
    <section className="border-t border-[color:var(--stitch-line)] py-16 md:py-24">
      <StitchContainer>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Eyebrow>{c.problemDeepDive.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl md:text-5xl">
              {c.problemDeepDive.title}
            </h2>
            <div className="mt-8 space-y-5 text-lg text-[color:var(--on-surface-variant)]">
              {c.problemDeepDive.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <ul className="mt-10 list-disc space-y-3 pl-6 text-[color:var(--on-surface-variant)]">
              {c.problemDeepDive.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[min(50vh,520px)] lg:sticky lg:top-24 lg:col-span-7 lg:min-h-[min(72vh,780px)]">
            <div className="relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-[color:var(--stitch-border-ghost)] shadow-[0_32px_64px_-20px_rgba(43,52,55,0.1)]">
              <StitchImage
                src={stitchImages.problem.src}
                alt={stitchImages.problem.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[color:var(--stitch-scrim-mid)]" />
            </div>
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function StalledBlock() {
  return (
    <section className="border-t border-[color:var(--stitch-line)] bg-[color:var(--surface-container)] py-16 md:py-24">
      <StitchContainer>
        <Eyebrow>{c.stalledToDeployed.eyebrow}</Eyebrow>
        <h2 className="font-[family-name:var(--font-display)] mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl">
          {c.stalledToDeployed.title}
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {c.stalledToDeployed.steps.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[color:var(--stitch-border-ghost)] bg-[color:var(--surface-container-high)] p-7 backdrop-blur-md"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--primary)]">
                {s.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--on-surface-variant)]">{s.copy}</p>
            </div>
          ))}
        </div>
      </StitchContainer>
    </section>
  );
}

export function ConnectiveBlock() {
  return (
    <section className="border-t border-[color:var(--stitch-line)] py-16 md:py-24">
      <StitchBleed>
        <div className="relative min-h-[min(50vh,560px)] md:min-h-[min(56vh,620px)]">
          <StitchImage
            src={stitchImages.explorePower.src}
            alt={stitchImages.explorePower.alt}
            fill
            sizes="100vw"
            className="brightness-[0.88]"
          />
          <div className={`absolute inset-0 ${scrimPhotoRl}`} />
          <StitchContainer className="relative z-10 flex min-h-[min(50vh,560px)] items-center py-20 md:min-h-[min(56vh,620px)] md:py-28">
            <div className="max-w-2xl">
              <Eyebrow>{c.connectiveTissue.eyebrow}</Eyebrow>
              <h2 className="font-[family-name:var(--font-display)] mt-5 text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl md:text-5xl">
                {c.connectiveTissue.title}
              </h2>
              <p className="mt-8 border-l-4 border-[color:var(--primary)] pl-6 text-xl leading-relaxed text-[color:var(--on-surface)]">
                {c.connectiveTissue.statement}
              </p>
              <p className="mt-8 text-base leading-relaxed text-[color:var(--on-surface-variant)]">
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
    <section className="border-t border-[color:var(--stitch-line)] py-16 md:py-24">
      <StitchContainer>
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>{c.whatKonativeDoes.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl md:text-5xl">
              {c.whatKonativeDoes.title}
            </h2>
            <p className="mt-8 text-lg text-[color:var(--on-surface-variant)]">{c.whatKonativeDoes.body}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {c.whatKonativeDoes.pillars.map((pillar) => (
                <div
                  key={pillar}
                  className="rounded-xl border border-[color:var(--stitch-border-ghost)] bg-[color:var(--surface-container-lowest)] px-4 py-4 text-sm font-medium text-[color:var(--on-surface)] backdrop-blur-sm"
                >
                  {pillar}
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[min(48vh,520px)] lg:col-span-6 lg:min-h-[min(70vh,760px)]">
            <div className="relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-[color:var(--stitch-border-ghost)] shadow-[0_32px_64px_-20px_rgba(43,52,55,0.1)]">
              <StitchImage
                src={stitchImages.services.src}
                alt={stitchImages.services.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="brightness-[0.88]"
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
    <section className="border-t border-[color:var(--stitch-line)] py-16 md:py-24">
      <StitchContainer>
        <Eyebrow>{c.comparison.eyebrow}</Eyebrow>
        <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl md:text-5xl">
          {c.comparison.title}
        </h2>
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-12">
          <div className="relative min-h-[min(44vh,480px)] lg:col-span-5 lg:min-h-[min(64vh,700px)]">
            <div className="relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-[color:var(--stitch-border-ghost)] shadow-[0_32px_64px_-20px_rgba(43,52,55,0.1)]">
              <StitchImage
                src={stitchImages.compare.src}
                alt={stitchImages.compare.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="brightness-[0.88]"
              />
            </div>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-[color:var(--stitch-border-ghost)] bg-[color:var(--surface-container-lowest)] shadow-xl lg:col-span-7">
            <table className="w-full min-w-[600px] text-left text-sm">
              <caption className="sr-only">{c.comparison.title}</caption>
              <thead>
                <tr className="border-b border-[color:var(--stitch-line)] bg-[color:var(--surface-container-high)]">
                  <th scope="col" className="px-5 py-4 font-semibold text-[color:var(--outline)]">
                    {" "}
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold text-[color:var(--primary)]">
                    {c.comparison.columns.konative}
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold text-[color:var(--outline)]">
                    {c.comparison.columns.others}
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.comparison.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-[color:var(--stitch-line)] last:border-0">
                    <td className="px-5 py-4 font-medium text-[color:var(--on-surface)]">{row.feature}</td>
                    <td className="px-5 py-4 text-[color:var(--on-surface-variant)]">{row.konative}</td>
                    <td className="px-5 py-4 text-[color:var(--outline)]">{row.others}</td>
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
    <section className="border-t border-[color:var(--stitch-line)] py-16 md:py-24">
      <StitchContainer>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>{c.engagement.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl md:text-5xl">
              {c.engagement.title}
            </h2>
            <p className="mt-8 text-lg text-[color:var(--on-surface-variant)]">{c.engagement.body}</p>
            <p className="mt-6 border-l-4 border-[color:color-mix(in_srgb,var(--primary)_55%,var(--outline-variant))] pl-5 text-base leading-relaxed text-[color:var(--on-surface-variant)]">
              {c.engagement.timeline}
            </p>
            <ul className="mt-8 list-disc space-y-3 pl-6 text-[color:var(--on-surface-variant)]">
              {c.engagement.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="mt-8 font-semibold text-[color:var(--primary)]">{c.engagement.pricingNote}</p>
            <div className="mt-10">
              <PrimaryCta href="/contact">{site.ctaLabel}</PrimaryCta>
            </div>
          </div>
          <div className="relative min-h-[min(50vh,540px)] lg:col-span-6 lg:min-h-[min(72vh,800px)]">
            <div className="relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-[color:var(--stitch-border-ghost)] shadow-[0_32px_64px_-20px_rgba(43,52,55,0.1)]">
              <StitchImage
                src={stitchImages.engagement.src}
                alt={stitchImages.engagement.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="brightness-[0.88]"
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
    <section className="border-t border-[color:var(--stitch-line)] bg-[color:var(--surface-container-low)] py-16 md:py-24">
      <StitchContainer>
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>{c.trust.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl md:text-5xl">
              {c.trust.title}
            </h2>
            <p className="mt-8 text-lg text-[color:var(--on-surface-variant)]">{c.trust.body}</p>
            <ul className="mt-8 list-disc space-y-3 pl-6 text-[color:var(--on-surface-variant)]">
              {c.trust.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[min(48vh,500px)] lg:col-span-6 lg:min-h-[min(70vh,760px)]">
            <div className="relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-[color:var(--stitch-border-ghost)] shadow-[0_32px_64px_-20px_rgba(43,52,55,0.1)]">
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
    <section className="border-t border-[color:var(--stitch-line)] py-16 md:py-24">
      <StitchBleed>
        <div className="relative min-h-[min(48vh,520px)] md:min-h-[min(54vh,600px)]">
          <StitchImage
            src={stitchImages.exploreCooling.src}
            alt={stitchImages.exploreCooling.alt}
            fill
            sizes="100vw"
            className="brightness-[0.88]"
          />
          <div className={`absolute inset-0 ${scrimPhotoTb}`} />
          <StitchContainer className="relative z-10 flex min-h-[inherit] flex-col justify-end py-16 md:py-24">
            <div className={`max-w-2xl ${glass}`}>
              <Eyebrow>{c.nextSteps.eyebrow}</Eyebrow>
              <h2 className="font-[family-name:var(--font-display)] mt-5 text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl">
                {c.nextSteps.title}
              </h2>
              <p className="mt-6 text-lg text-[color:var(--on-surface-variant)]">{c.nextSteps.body}</p>
            </div>
          </StitchContainer>
        </div>
      </StitchBleed>
    </section>
  );
}

export function ContactFormBlock() {
  return (
    <section className="border-t border-[color:var(--stitch-line)] bg-[color:var(--surface-container)] py-16 md:py-24">
      <StitchContainer>
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>{c.contact.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl md:text-5xl">
              {c.contact.headline}
            </h2>
            <p className="mt-8 text-lg text-[color:var(--on-surface-variant)]">{c.contact.supporting}</p>
          </div>
          <div className="relative hidden min-h-[min(52vh,560px)] lg:col-span-7 lg:block">
            <div className="relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-[color:var(--stitch-border-ghost)] shadow-[0_32px_64px_-20px_rgba(43,52,55,0.1)]">
              <StitchImage
                src={stitchImages.hero.src}
                alt={stitchImages.hero.alt}
                fill
                sizes="50vw"
                className="brightness-[0.88]"
              />
            </div>
          </div>
        </div>
        <div className="mt-12 rounded-2xl border border-[color:var(--stitch-border-ghost)] bg-[color:var(--surface-container-lowest)] p-6 shadow-[0_28px_56px_-18px_rgba(43,52,55,0.09)] backdrop-blur-xl sm:p-10 md:mt-16">
          <InquiryForm />
        </div>
      </StitchContainer>
    </section>
  );
}
