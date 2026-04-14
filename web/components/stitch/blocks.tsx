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
  StitchContainer,
} from "@/components/stitch/ui";

export function PageLeadBlock({ slug }: { slug: PageLeadSlug }) {
  const p = pageLeads[slug];
  return (
    <section className="border-b border-white/10 bg-gradient-to-b from-[#0f1720]/90 to-[#0a0f14]">
      <StitchContainer className="py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Eyebrow>{p.eyebrow}</Eyebrow>
            <h1 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl sm:leading-tight">
              {p.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              {p.body}
            </p>
            <blockquote className="mt-8 border-l-4 border-[#00E5FF]/70 pl-5 text-sm italic leading-relaxed text-slate-400 sm:text-base">
              {p.pullQuote}
            </blockquote>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
            <StitchImage
              src={p.image.src}
              alt={p.image.alt}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0a0f14]/50 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function HeroBlock() {
  return (
    <section className="border-b border-white/10 bg-gradient-to-b from-[#0f1720] to-[#0a0f14]">
      <StitchContainer className="py-16 sm:py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>{c.hero.eyebrow}</Eyebrow>
            <h1 className="font-[family-name:var(--font-display)] mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-tight">
              {c.hero.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              {c.hero.subhead}
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {c.hero.aside}
            </p>
            <ul className="mt-8 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
              {c.hero.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00E5FF]"
                    aria-hidden
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryCta href="/contact">{site.ctaLabel}</PrimaryCta>
              <p className="max-w-xl text-sm leading-relaxed text-slate-400">
                {c.hero.ctaSupporting}
              </p>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 lg:aspect-[4/5]">
            <StitchImage
              src={stitchImages.hero.src}
              alt={stitchImages.hero.alt}
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0f14]/80 via-transparent to-[#0a0f14]/20"
              aria-hidden
            />
            <p className="absolute bottom-4 left-4 right-4 text-xs leading-relaxed text-slate-300/90 sm:text-sm">
              Placeholder imagery — replace with program-specific photography,
              partner-approved site visuals, or licensed stock aligned to your
              brand guidelines.
            </p>
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function ExploreGridBlock() {
  return (
    <section className="border-t border-white/10">
      <StitchContainer className="py-16 sm:py-20">
        <Eyebrow>Explore</Eyebrow>
        <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
          Decision-grade readiness, screen by screen
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Each route is filled with modular data center development context —
          copy lives in{" "}
          <code className="text-[#00E5FF]/90">web/content/homepage.ts</code> and{" "}
          <code className="text-[#00E5FF]/90">web/content/pages.ts</code>, imagery
          in <code className="text-[#00E5FF]/90">web/content/media.ts</code>.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.exploreScreens.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0f1720]/50 transition hover:border-[#00E5FF]/35 hover:bg-[#0f1720]/80"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5">
                <StitchImage
                  src={card.image.src}
                  alt={`${card.title} — ${card.image.alt}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="transition duration-500 group-hover:scale-[1.03]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0f14]/70 to-transparent"
                  aria-hidden
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#00E5FF] group-hover:text-[#33ebff]">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {card.blurb}
                </p>
                <span className="mt-4 inline-block text-xs font-medium text-slate-500 group-hover:text-slate-300">
                  Open page →
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
      <StitchContainer className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 lg:order-2">
            <StitchImage
              src={stitchImages.playbook.src}
              alt={stitchImages.playbook.alt}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="lg:order-1">
            <Eyebrow>{c.playbookTimeline.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {c.playbookTimeline.title}
            </h2>
            <p className="mt-4 max-w-3xl text-slate-300">
              {c.playbookTimeline.intro}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {c.playbookTimeline.secondaryIntro}
            </p>
          </div>
        </div>
        <ol className="mt-12 space-y-6 border-l border-[#00E5FF]/40 pl-6 lg:mt-14">
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
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
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
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
            <StitchImage
              src={stitchImages.contact.src}
              alt={stitchImages.contact.alt}
              sizes="(max-width: 1024px) 100vw, 38vw"
            />
          </div>
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
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {c.customerSegments.segments.map((s) => (
            <article
              key={s.title}
              className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0f1720]/60 shadow-lg shadow-black/20"
            >
              <div className="relative aspect-[16/10] border-b border-white/5">
                <StitchImage
                  src={s.image.src}
                  alt={s.image.alt}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#00E5FF]">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {s.value}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">
                  {s.detail}
                </p>
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
    <section className="border-t border-white/10">
      <StitchContainer className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>{c.problemDeepDive.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
              {c.problemDeepDive.title}
            </h2>
            <div className="mt-6 space-y-4 text-slate-300">
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
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 lg:sticky lg:top-8">
            <StitchImage
              src={stitchImages.problem.src}
              alt={stitchImages.problem.alt}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
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
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>{c.connectiveTissue.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
              {c.connectiveTissue.title}
            </h2>
            <p className="mt-8 max-w-3xl border-l-4 border-[#00E5FF] pl-6 text-lg leading-relaxed text-slate-200">
              {c.connectiveTissue.statement}
            </p>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {c.connectiveTissue.supporting}
            </p>
          </div>
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10">
            <StitchImage
              src={stitchImages.explorePower.src}
              alt={stitchImages.explorePower.alt}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function WhatWeDoBlock() {
  return (
    <section className="border-t border-white/10">
      <StitchContainer className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
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
          <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-2xl border border-white/10 lg:justify-self-end">
            <StitchImage
              src={stitchImages.services.src}
              alt={stitchImages.services.alt}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
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
        <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:items-start">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 lg:col-span-1">
            <StitchImage
              src={stitchImages.compare.src}
              alt={stitchImages.compare.alt}
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
          </div>
          <div className="overflow-x-auto rounded-xl border border-white/10 lg:col-span-2">
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
                    <td className="px-4 py-3 font-medium text-white">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-slate-300">{row.konative}</td>
                    <td className="px-4 py-3 text-slate-500">{row.others}</td>
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
    <section className="border-t border-white/10">
      <StitchContainer className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
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
          </div>
          <div className="relative aspect-[16/12] overflow-hidden rounded-2xl border border-white/10">
            <StitchImage
              src={stitchImages.engagement.src}
              alt={stitchImages.engagement.alt}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function TrustBlock() {
  return (
    <section className="border-t border-white/10 bg-[#0f1720]/30">
      <StitchContainer className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
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
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10">
            <StitchImage
              src={stitchImages.trust.src}
              alt={stitchImages.trust.alt}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function NextStepsBlock() {
  return (
    <section className="border-t border-white/10">
      <StitchContainer className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>{c.nextSteps.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
              {c.nextSteps.title}
            </h2>
            <p className="mt-6 max-w-3xl text-slate-300">{c.nextSteps.body}</p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
            <StitchImage
              src={stitchImages.exploreCooling.src}
              alt={stitchImages.exploreCooling.alt}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </StitchContainer>
    </section>
  );
}

export function ContactFormBlock() {
  return (
    <section className="border-t border-white/10 bg-[#0f1720]/60">
      <StitchContainer className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>{c.contact.eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-semibold text-white sm:text-3xl">
              {c.contact.headline}
            </h2>
            <p className="mt-6 max-w-2xl text-slate-300">{c.contact.supporting}</p>
          </div>
          <div className="relative hidden aspect-[16/12] overflow-hidden rounded-2xl border border-white/10 lg:block">
            <StitchImage
              src={stitchImages.hero.src}
              alt={stitchImages.hero.alt}
              sizes="40vw"
            />
          </div>
        </div>
        <div className="mt-10 rounded-xl border border-white/10 bg-[#0a0f14]/80 p-6 sm:p-8 lg:mt-12">
          <InquiryForm />
        </div>
      </StitchContainer>
    </section>
  );
}
