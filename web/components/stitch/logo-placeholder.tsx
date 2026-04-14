import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Temporary mark until official brand assets ship.
 * Replace this component with <Image src="..." /> when logo files are ready.
 */
export function LogoPlaceholder() {
  return (
    <Link
      href="/"
      className="flex min-w-0 items-center gap-2.5 shrink-0 rounded-md outline-none ring-offset-2 ring-offset-[#0f1720] focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
      title="Konative — logo placeholder until official mark is provided"
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#00E5FF]/45 bg-[#0f1720] font-[family-name:var(--font-display)] text-sm font-bold tracking-tight text-[#00E5FF] shadow-[0_0_22px_rgba(0,229,255,0.18)]"
        aria-hidden
      >
        K
      </span>
      <span className="font-[family-name:var(--font-display)] truncate text-sm font-semibold tracking-tight text-white sm:text-base">
        {site.name}
      </span>
      <span className="sr-only">Home — placeholder logo</span>
    </Link>
  );
}
