import Link from "next/link";
import { KonativeLogo } from "@/components/stitch/konative-logo";
import { navItems, navMoreItems, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--stitch-line)] bg-[color:var(--surface)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <KonativeLogo />
        <nav
          aria-label="Primary"
          className="ml-auto hidden min-w-0 flex-1 items-center justify-end gap-x-0.5 overflow-x-auto md:flex lg:gap-x-1"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md px-2 py-1.5 text-xs font-medium text-[var(--stitch-muted)] transition-colors hover:bg-black/[0.04] hover:text-[var(--stitch-ink)] whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
          <span
            className="mx-1 hidden h-4 w-px shrink-0 bg-[color:var(--stitch-line)] lg:block"
            aria-hidden
          />
          {navMoreItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md px-2 py-1.5 text-xs font-medium text-[var(--stitch-faint)] transition-colors hover:bg-black/[0.04] hover:text-[var(--stitch-ink)] whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-[var(--stitch-cta)] px-3 py-2 text-xs font-semibold text-[var(--stitch-cta-text)] shadow-sm ring-1 ring-black/5 transition hover:bg-[#151d33] hover:ring-[color:var(--stitch-accent-2)]/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--stitch-accent-2)] md:ml-2"
        >
          <span className="max-w-[10rem] truncate sm:max-w-none">{site.ctaLabel}</span>
        </Link>
      </div>
      <div className="border-t border-[color:var(--stitch-line)] px-4 py-2 md:hidden">
        <nav
          aria-label="Primary mobile"
          className="flex flex-wrap justify-center gap-1"
        >
          {[...navItems, ...navMoreItems].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1 text-[11px] font-medium text-[var(--stitch-muted)] hover:bg-black/[0.04] hover:text-[var(--stitch-ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
