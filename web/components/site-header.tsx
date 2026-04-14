import Link from "next/link";
import { navItems, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[color:var(--surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/#hero"
          className="text-sm font-semibold tracking-tight text-slate-900"
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
              className="rounded-md px-2 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-stone-100 hover:text-slate-900"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          {site.ctaLabel}
        </a>
      </div>
    </header>
  );
}
