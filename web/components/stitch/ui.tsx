import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function StitchMain({ children }: { children: ReactNode }) {
  return <main className="bg-[#0a0f14] text-slate-100">{children}</main>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00E5FF]/90">
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
      className="inline-flex items-center justify-center rounded-md bg-[#00E5FF] px-5 py-3 text-sm font-semibold text-[#0a0f14] shadow-[0_0_24px_rgba(0,229,255,0.25)] transition hover:bg-[#33ebff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF]"
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
      className="inline-flex rounded-md border border-[#00E5FF]/50 bg-[#00E5FF]/10 px-5 py-2.5 text-sm font-semibold text-[#00E5FF] transition hover:bg-[#00E5FF]/20"
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
    <section className="border-t border-[#00E5FF]/20 bg-gradient-to-r from-[#0f1720] to-[#0a0f14]">
      <StitchContainer className="py-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white sm:text-2xl">
              {headline}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">{sub}</p>
          </div>
          <PrimaryCta href="/contact">{site.ctaLabel}</PrimaryCta>
        </div>
      </StitchContainer>
    </section>
  );
}
