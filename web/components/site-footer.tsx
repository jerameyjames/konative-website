import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0f1720]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
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
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <Link
            href="/privacy"
            className="font-medium text-slate-300 underline-offset-4 hover:text-white hover:underline"
          >
            Privacy
          </Link>
          <Link
            href="/legal"
            className="font-medium text-slate-300 underline-offset-4 hover:text-white hover:underline"
          >
            Legal
          </Link>
          <a
            href="#contact"
            className="font-medium text-slate-300 underline-offset-4 hover:text-white hover:underline"
          >
            Contact
          </a>
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
