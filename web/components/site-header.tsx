import Link from "next/link";
import { navItems, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--surface)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/#hero"
          className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight text-white"
        >
          {site.name}
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex md:flex-wrap md:justify-end"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#00E5FF] px-3 py-2 text-xs font-semibold text-[#0a0f14] shadow-[0_0_16px_rgba(0,229,255,0.2)] transition hover:bg-[#33ebff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF]"
        >
          {site.ctaLabel}
        </a>
      </div>
    </header>
  );
}
