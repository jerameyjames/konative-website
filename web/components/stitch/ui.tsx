import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function StitchMain({ children }: { children: ReactNode }) {
  return (
    <main className="bg-[var(--stitch-page)] text-[var(--stitch-body)]">{children}</main>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--stitch-accent-2)]">
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
    <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
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
      className="inline-flex items-center justify-center rounded-md bg-[var(--stitch-cta)] px-5 py-3 text-sm font-semibold text-[var(--stitch-cta-text)] shadow-md shadow-stone-900/15 ring-1 ring-black/5 transition hover:bg-[#151d33] hover:ring-[color:var(--stitch-accent-2)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--stitch-accent-2)]"
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
      className="inline-flex rounded-md border border-[color:var(--stitch-accent-2)]/55 bg-[color:var(--stitch-accent-2)]/10 px-5 py-2.5 text-sm font-semibold text-[color:var(--stitch-accent)] transition hover:bg-[color:var(--stitch-accent-2)]/18"
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
    <section className="border-t border-[color:var(--stitch-accent-2)]/25 bg-[var(--stitch-ink)] text-[var(--stitch-cta-text)]">
      <StitchContainer className="py-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#f5f0e6] sm:text-2xl">
              {headline}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--stitch-footer-muted)]">
              {sub}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-md border border-[color:var(--stitch-accent-2)]/60 bg-[color:var(--stitch-accent-2)]/15 px-5 py-3 text-sm font-semibold text-[color:var(--stitch-accent-2)] transition hover:bg-[color:var(--stitch-accent-2)]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--stitch-accent-2)]"
          >
            {site.ctaLabel}
          </Link>
        </div>
      </StitchContainer>
    </section>
  );
}
