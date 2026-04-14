import Link from "next/link";

/** Inline mark — no external raster required for builds and previews */
function Mark() {
  return (
    <svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
      aria-hidden
    >
      <defs>
        <linearGradient id="kn-mark-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5f5e5e" />
          <stop offset="100%" stopColor="#535252" />
        </linearGradient>
      </defs>
      <rect
        width={40}
        height={40}
        rx={10}
        fill="url(#kn-mark-grad)"
        className="shadow-[0_12px_28px_-8px_rgba(43,52,55,0.2)] ring-1 ring-[color:var(--stitch-border-ghost)]"
      />
      <text
        x="50%"
        y="52%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#faf7f6"
        fillOpacity={0.95}
        fontSize="19"
        fontWeight="800"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        K
      </text>
    </svg>
  );
}

export function KonativeLogo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2.5 rounded-md outline-none ring-offset-2 ring-offset-[color:var(--background)] focus-visible:ring-2 focus-visible:ring-[color:var(--primary)]"
      aria-label="Konative home"
    >
      <Mark />
      <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-xl">
        Konative
      </span>
    </Link>
  );
}
