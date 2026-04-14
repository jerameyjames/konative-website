import Link from "next/link";
import { footerLegal, navItems, navMoreItems, site } from "@/lib/site";

export function SiteFooter() {
  const allPages = [...navItems, ...navMoreItems];

  return (
    <footer className="border-t border-white/10 bg-[#0f1720]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-md space-y-2">
            <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-white">
              {site.name}
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
              Development readiness for modular data center projects — coordinating
              site, power, cooling, supply chain, and decision-grade pro forma
              work for qualified buyers.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Site
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {allPages.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-medium text-slate-300 underline-offset-4 hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {footerLegal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-medium text-slate-400 underline-offset-4 hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 bg-[#0a0f14]">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Konative. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
