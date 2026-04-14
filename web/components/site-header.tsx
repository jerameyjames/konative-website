import Link from "next/link";
import { KonativeLogo } from "@/components/stitch/konative-logo";
import { navItems, navMoreItems, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--stitch-line)] bg-[color:color-mix(in_srgb,var(--surface-variant)_58%,var(--surface-container-lowest)_42%)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-10">
        <KonativeLogo />
        <nav
          aria-label="Primary"
          className="ml-auto hidden min-w-0 flex-1 items-center justify-end gap-x-0.5 overflow-x-auto md:flex lg:gap-x-1"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md px-2 py-1.5 text-xs font-medium text-[color:var(--on-surface-variant)] transition-colors hover:bg-[color:var(--surface-container-low)] hover:text-[color:var(--on-surface)] whitespace-nowrap"
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
              className="shrink-0 rounded-md px-2 py-1.5 text-xs font-medium text-[color:var(--outline)] transition-colors hover:bg-[color:var(--surface-container-low)] hover:text-[color:var(--on-surface)] whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--primary-dim)] px-3 py-2 text-xs font-semibold text-[color:var(--on-primary)] shadow-[0_16px_32px_-10px_rgba(43,52,55,0.15)] transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--primary)] md:ml-2"
        >
          <span className="max-w-[10rem] truncate sm:max-w-none">{site.ctaLabel}</span>
        </Link>
      </div>
      <div className="border-t border-[color:var(--stitch-line)] bg-[color:var(--surface-container-low)] px-4 py-2 md:hidden">
        <nav
          aria-label="Primary mobile"
          className="flex flex-wrap justify-center gap-1"
        >
          {[...navItems, ...navMoreItems].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1 text-[11px] font-medium text-[color:var(--on-surface-variant)] hover:bg-[color:var(--surface-container)] hover:text-[color:var(--on-surface)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
