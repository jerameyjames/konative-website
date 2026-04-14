import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function StitchMain({ children }: { children: ReactNode }) {
  return (
    <main className="bg-[var(--stitch-page)] text-[var(--stitch-body)]">{children}</main>
  );
}

/** Full-bleed breakout for image-first bands (100vw, centered) */
export function StitchBleed({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="bg-gradient-to-r from-[var(--stitch-accent)] to-[var(--stitch-violet)] bg-clip-text text-xs font-semibold uppercase tracking-[0.28em] text-transparent">
      {children}
    </p>
  );
}

export function StitchContainer({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function PrimaryCta({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-lg bg-[var(--stitch-cta)] px-6 py-3.5 text-sm font-semibold text-[var(--stitch-cta-text)] shadow-[0_0_32px_rgba(34,211,238,0.35)] ring-1 ring-cyan-300/40 transition hover:bg-[#5eead4] hover:shadow-[0_0_40px_rgba(94,234,212,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--stitch-accent)]"
    >
      {children}
    </Link>
  );
}

export function SecondaryCta({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex rounded-lg border border-cyan-400/35 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-200 backdrop-blur-sm transition hover:border-cyan-300/55 hover:bg-cyan-400/15"
    >
      {children}
    </Link>
  );
}

export function BottomCtaBand({
  headline,
  sub,
}: {
  headline: string;
  sub: string;
}) {
  return (
    <section className="border-t border-cyan-500/20 bg-[var(--stitch-footer)] text-[var(--stitch-ink)]">
      <StitchContainer className="py-16">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {headline}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[var(--stitch-footer-muted)]">{sub}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[var(--stitch-cta)] px-6 py-3.5 text-sm font-semibold text-[var(--stitch-cta-text)] shadow-[0_0_28px_rgba(34,211,238,0.3)] transition hover:bg-[#5eead4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--stitch-accent)]"
          >
            {site.ctaLabel}
          </Link>
        </div>
      </StitchContainer>
    </section>
  );
}
