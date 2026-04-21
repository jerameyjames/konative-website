import type { Metadata } from "next";
import Link from "next/link";

import {
  getBeehiivDashboardUrl,
  getGhostAdminUrl,
  getIntegrationHealth,
} from "@/lib/system-tools";

export const metadata: Metadata = {
  title: "System & content tools | Konative",
  description:
    "Sanity, Builder, Beehiiv, Ghost, and live previews — shortcuts for the Konative team.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function StatusBadge({
  label,
  tone,
}: {
  label: string;
  tone: "ok" | "warn" | "muted" | "neutral";
}) {
  return <span className={`cms-hub__badge cms-hub__badge--${tone}`}>{label}</span>;
}

export default async function CmsSystemPage() {
  const health = await getIntegrationHealth();
  const ghostAdmin = getGhostAdminUrl();
  const beehiivApp = getBeehiivDashboardUrl();

  return (
    <section className="cms-hub">
      <div className="cms-hub__inner">
        <header className="cms-hub__header">
          <h1 className="cms-hub__title">System &amp; content tools</h1>
          <p className="cms-hub__lede">
            Internal shortcuts for CMS, newsletter, and publishing. Each service uses its own
            login; status below reflects environment variables on this deployment and a quick API
            check where applicable.
          </p>
        </header>

        <div className="cms-hub__sections">
          {/* Site CMS */}
          <section className="cms-hub__section" aria-labelledby="cms-site-heading">
            <h2 id="cms-site-heading" className="cms-hub__section-title">
              Site CMS
            </h2>
            <ul className="cms-hub__grid">
              <li className="cms-hub__card">
                <div className="cms-hub__card-top">
                  <h3 className="cms-hub__card-title">Sanity Studio</h3>
                  <StatusBadge
                    tone={
                      health.sanity.configured && health.sanity.reachable
                        ? "ok"
                        : health.sanity.configured
                          ? "warn"
                          : "muted"
                    }
                    label={
                      health.sanity.configured && health.sanity.reachable
                        ? "Connected"
                        : health.sanity.configured
                          ? "Check dataset"
                          : "Not configured"
                    }
                  />
                </div>
                <p className="cms-hub__card-desc">
                  Structured content, pages, and site data for the Next.js app.
                </p>
                <Link href="/studio" className="cms-hub__card-link">
                  Open Studio
                  <span aria-hidden="true" className="cms-hub__card-arrow">
                    →
                  </span>
                </Link>
              </li>

              <li className="cms-hub__card">
                <div className="cms-hub__card-top">
                  <h3 className="cms-hub__card-title">Builder.io</h3>
                  <StatusBadge
                    tone={health.builder.configured ? "ok" : "muted"}
                    label={health.builder.configured ? "API key set" : "Not configured"}
                  />
                </div>
                <p className="cms-hub__card-desc">
                  Visual pages and sections where Builder is wired (including homepage when enabled).
                </p>
                <Link href="/builder" className="cms-hub__card-link">
                  Open Builder
                  <span aria-hidden="true" className="cms-hub__card-arrow">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </section>

          {/* Newsletter & publishing */}
          <section className="cms-hub__section" aria-labelledby="cms-publish-heading">
            <h2 id="cms-publish-heading" className="cms-hub__section-title">
              Newsletter &amp; publishing
            </h2>
            <ul className="cms-hub__grid">
              <li className="cms-hub__card">
                <div className="cms-hub__card-top">
                  <h3 className="cms-hub__card-title">Beehiiv</h3>
                  <StatusBadge
                    tone={
                      health.beehiiv.configured && health.beehiiv.reachable
                        ? "ok"
                        : health.beehiiv.configured
                          ? "warn"
                          : "muted"
                    }
                    label={
                      health.beehiiv.configured && health.beehiiv.reachable
                        ? "API OK"
                        : health.beehiiv.configured
                          ? "Check API"
                          : "Keys missing"
                    }
                  />
                </div>
                <p className="cms-hub__card-desc">
                  Newsletter posts for <Link href="/blog">/blog</Link>; subscribe flows use the
                  Beehiiv API when keys are set.
                </p>
                <a
                  href={beehiivApp}
                  className="cms-hub__card-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Beehiiv
                  <span aria-hidden="true" className="cms-hub__card-arrow">
                    ↗
                  </span>
                </a>
              </li>

              <li className="cms-hub__card">
                <div className="cms-hub__card-top">
                  <h3 className="cms-hub__card-title">Ghost</h3>
                  <StatusBadge
                    tone={
                      health.ghost.configured && health.ghost.reachable
                        ? "ok"
                        : health.ghost.configured
                          ? "warn"
                          : "muted"
                    }
                    label={
                      health.ghost.configured && health.ghost.reachable
                        ? "Content API OK"
                        : health.ghost.configured
                          ? "Check keys / URL"
                          : "Keys missing"
                    }
                  />
                </div>
                <p className="cms-hub__card-desc">
                  Long-form posts at <code className="cms-hub__code">/blog/[slug]</code> when
                  public Ghost env vars are set. Admin is on your Ghost host.
                </p>
                {ghostAdmin ? (
                  <a
                    href={ghostAdmin}
                    className="cms-hub__card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Ghost Admin
                    <span aria-hidden="true" className="cms-hub__card-arrow">
                      ↗
                    </span>
                  </a>
                ) : (
                  <p className="cms-hub__card-note">
                    Set <code className="cms-hub__code">NEXT_PUBLIC_GHOST_URL</code> or{" "}
                    <code className="cms-hub__code">GHOST_URL</code> to enable the admin link.
                  </p>
                )}
              </li>
            </ul>
          </section>

          {/* Live previews */}
          <section className="cms-hub__section" aria-labelledby="cms-preview-heading">
            <h2 id="cms-preview-heading" className="cms-hub__section-title">
              Live previews
            </h2>
            <ul className="cms-hub__grid cms-hub__grid--compact">
              <li className="cms-hub__card cms-hub__card--compact">
                <h3 className="cms-hub__card-title">Market intelligence</h3>
                <p className="cms-hub__card-desc">Sanity-backed news feed.</p>
                <Link href="/news" className="cms-hub__card-link">
                  View /news
                  <span aria-hidden="true" className="cms-hub__card-arrow">
                    →
                  </span>
                </Link>
              </li>
              <li className="cms-hub__card cms-hub__card--compact">
                <h3 className="cms-hub__card-title">Blog &amp; newsletter archive</h3>
                <p className="cms-hub__card-desc">Beehiiv-powered list at /blog.</p>
                <Link href="/blog" className="cms-hub__card-link">
                  View /blog
                  <span aria-hidden="true" className="cms-hub__card-arrow">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
