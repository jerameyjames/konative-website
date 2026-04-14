import Link from "next/link";
import { LogoPlaceholder } from "@/components/stitch/logo-placeholder";
import { navItems, navMoreItems, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--surface)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <LogoPlaceholder />
        <nav
          aria-label="Primary"
          className="ml-auto hidden min-w-0 flex-1 items-center justify-end gap-x-0.5 overflow-x-auto md:flex lg:gap-x-1"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md px-2 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
          <span
            className="mx-1 hidden h-4 w-px shrink-0 bg-white/15 lg:block"
            aria-hidden
          />
          {navMoreItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md px-2 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-200 whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#00E5FF] px-3 py-2 text-xs font-semibold text-[#0a0f14] shadow-[0_0_16px_rgba(0,229,255,0.2)] transition hover:bg-[#33ebff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF] md:ml-2"
        >
          <span className="max-w-[10rem] truncate sm:max-w-none">{site.ctaLabel}</span>
        </Link>
      </div>
      <div className="border-t border-white/5 px-4 py-2 md:hidden">
        <nav aria-label="Primary mobile" className="flex flex-wrap justify-center gap-1">
          {[...navItems, ...navMoreItems].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1 text-[11px] font-medium text-slate-400 hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
