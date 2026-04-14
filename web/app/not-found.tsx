import { PrimaryCta, SecondaryCta, StitchContainer } from "@/components/stitch/ui";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col justify-center bg-[var(--stitch-page)] py-16 text-[var(--stitch-body)]">
      <StitchContainer>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
          404
        </p>
        <h1 className="font-[family-name:var(--font-display)] mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-[color:var(--on-surface)] sm:text-4xl md:text-5xl">
          This page is not on the map.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-[color:var(--on-surface-variant)]">
          The URL may have moved. Start from the home narrative or jump straight to
          a readiness conversation.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <PrimaryCta href="/">Back to home</PrimaryCta>
          <SecondaryCta href="/contact">{site.ctaLabel}</SecondaryCta>
        </div>
      </StitchContainer>
    </main>
  );
}
