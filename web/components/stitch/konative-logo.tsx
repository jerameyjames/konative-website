import Image from "next/image";
import Link from "next/link";

/**
 * Brand mark from provided artwork: geometric K in a square + wordmark.
 * The raster is cropped to the upper mark only; “Konative” is typeset in the header (taglines omitted).
 */
export function KonativeLogo() {
  return (
    <Link
      href="/"
      className="flex min-w-0 items-center gap-2.5 shrink-0 rounded-md outline-none ring-offset-2 ring-offset-[#0f1720] focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
      aria-label="Konative home"
    >
      <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/10">
        <Image
          src="/konative-logo.png"
          alt=""
          fill
          priority
          className="object-cover object-[center_0%] scale-[1.14]"
          sizes="40px"
        />
      </span>
      <span className="font-[family-name:var(--font-display)] truncate text-base font-semibold tracking-tight text-white sm:text-lg">
        Konative
      </span>
    </Link>
  );
}
