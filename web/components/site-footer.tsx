import Link from "next/link";
import { footerLegal, navItems, navMoreItems, site } from "@/lib/site";

export function SiteFooter() {
  const allPages = [...navItems, ...navMoreItems];

  return (
    <footer className="border-t border-cyan-500/15 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-lg space-y-3">
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-white">
              {site.name}
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
              Image-first development readiness for modular MW programs — site,
              interconnection, thermal physics, supply chain, and capital-grade
              narrative in one motion.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80">
              Site
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {allPages.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-medium text-slate-300 underline-offset-4 hover:text-cyan-300 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {footerLegal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-medium text-slate-500 underline-offset-4 hover:text-cyan-300/90 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 bg-black/80">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-slate-500 sm:px-6 lg:px-10">
          © {new Date().getFullYear()} Konative. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
