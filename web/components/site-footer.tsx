import Link from "next/link";
import { footerLegal, navItems, navMoreItems, site } from "@/lib/site";

export function SiteFooter() {
  const allPages = [...navItems, ...navMoreItems];

  return (
    <footer className="border-t border-[color:var(--stitch-line)] bg-[color:var(--inverse-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-lg space-y-3">
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[color:var(--inverse-primary)]">
              {site.name}
            </p>
            <p className="text-sm leading-relaxed text-[color:var(--inverse-on-surface)]">
              Modular data center development readiness: integrated diligence
              across site, interconnection, thermal and water reality, supply
              chain, and decision-grade pro forma — one orchestrated path for
              serious buyers.
            </p>
            <p className="text-xs leading-relaxed text-[color:var(--inverse-on-surface)]">
              Konative is used as a business name under Tolowa Pacific.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--inverse-primary)]">
              Site
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {allPages.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-medium text-[color:var(--inverse-primary)]/90 underline-offset-4 hover:text-[color:var(--inverse-primary)] hover:underline"
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
                    className="font-medium text-[color:var(--inverse-on-surface)] underline-offset-4 hover:text-[color:var(--inverse-primary)] hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-[color:color-mix(in_srgb,var(--inverse-on-surface)_25%,transparent)] bg-[color:color-mix(in_srgb,var(--inverse-surface)_92%,#000)]">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-[color:var(--inverse-on-surface)] sm:px-6 lg:px-10">
          © {new Date().getFullYear()} Konative. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
