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
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
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
      className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--primary-dim)] px-6 py-3.5 text-sm font-semibold text-[color:var(--on-primary)] shadow-[0_24px_48px_-12px_rgba(43,52,55,0.12)] ring-1 ring-black/[0.06] transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--primary)]"
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
      className="inline-flex rounded-md bg-[color:var(--secondary-container)] px-5 py-2.5 text-sm font-semibold text-[color:var(--on-surface)] transition hover:bg-[color:var(--surface-container-high)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--outline-variant)]"
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
    <section className="border-t border-[color:var(--stitch-line)] bg-[color:var(--stitch-footer)] text-[color:var(--inverse-primary)]">
      <StitchContainer className="py-16">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[color:var(--inverse-primary)] md:text-3xl">
              {headline}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[color:var(--stitch-footer-muted)]">{sub}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--primary-dim)] px-6 py-3.5 text-sm font-semibold text-[color:var(--on-primary)] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)] transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--inverse-primary)]"
          >
            {site.ctaLabel}
          </Link>
        </div>
      </StitchContainer>
    </section>
  );
}
