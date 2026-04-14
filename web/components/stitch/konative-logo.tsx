import Image from "next/image";
import Link from "next/link";

/**
 * Full brand lockup from raster (K mark + “Konative” wordmark).
 * Container clips the lower portion of the portrait asset so taglines stay off-screen.
 * Clip height = ~58% of scaled image height (see math in layout classes).
 */
export function KonativeLogo() {
  return (
    <Link
      href="/"
      className="block shrink-0 rounded-md outline-none ring-offset-2 ring-offset-slate-950 focus-visible:ring-2 focus-visible:ring-cyan-400"
      aria-label="Konative home"
    >
      <div className="h-16 w-[86px] overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/10 sm:h-[72px] sm:w-[96px] md:h-[81px] md:w-[108px]">
        <Image
          src="/konative-logo.png"
          alt="Konative"
          width={792}
          height={1024}
          priority
          draggable={false}
          className="block h-auto w-full select-none"
          sizes="(max-width: 640px) 86px, (max-width: 768px) 96px, 108px"
        />
      </div>
    </Link>
  );
}
