import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-md space-y-2">
          <p className="text-sm font-semibold text-slate-900">{site.name}</p>
          <p className="text-sm leading-relaxed text-slate-600">
            Development readiness for modular data center projects — coordinating
            site, power, cooling, supply chain, and decision-grade pro forma
            work for qualified buyers.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <Link
            href="/privacy"
            className="font-medium text-slate-700 underline-offset-4 hover:text-slate-900 hover:underline"
          >
            Privacy
          </Link>
          <Link
            href="/legal"
            className="font-medium text-slate-700 underline-offset-4 hover:text-slate-900 hover:underline"
          >
            Legal
          </Link>
          <a
            href="#contact"
            className="font-medium text-slate-700 underline-offset-4 hover:text-slate-900 hover:underline"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="border-t border-stone-100 bg-stone-50/80">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Konative. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
