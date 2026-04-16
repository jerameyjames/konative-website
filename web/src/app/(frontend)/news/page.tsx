import Link from "next/link";
import { getPayload } from "payload";

import config from "@payload-config";
import { NEWS_SOURCE_COUNTRY_OPTIONS, NEWS_TOPIC_OPTIONS } from "../../../collections/NewsSources";

export const dynamic = "force-dynamic";

type NewsPageProps = {
  searchParams: Promise<{
    country?: string;
    topic?: string;
    page?: string;
  }>;
};

const ITEMS_PER_PAGE = 24;

const buildQueryString = (params: Record<string, string | number | undefined>) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  return query.toString();
};

const formatDate = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;

  const country = params.country === "us" || params.country === "ca" ? params.country : "all";
  const validTopicValues = new Set(NEWS_TOPIC_OPTIONS.map((option) => option.value));
  const topic = params.topic && validTopicValues.has(params.topic) ? params.topic : "all";
  const page = Number.parseInt(params.page || "1", 10);
  const currentPage = Number.isNaN(page) || page < 1 ? 1 : page;

  const andConditions: any[] = [{ status: { equals: "published" } }];
  if (country !== "all") andConditions.push({ countries: { contains: country } });
  if (topic !== "all") andConditions.push({ topics: { contains: topic } });

  let isDataUnavailable = false;
  let news: {
    docs: any[];
    page?: number;
    totalPages?: number;
  } = {
    docs: [],
    page: currentPage,
    totalPages: 1,
  };

  try {
    const payload = await getPayload({ config });
    news = await payload.find({
      collection: "news-items",
      where: { and: andConditions },
      sort: "-publishedAt",
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    });
  } catch (_error) {
    isDataUnavailable = true;
  }

  const activeFilterCount = (country !== "all" ? 1 : 0) + (topic !== "all" ? 1 : 0);

  return (
    <main className="news-page">
      <section className="news-page__hero">
        <h1>Datacenter Intelligence Hub</h1>
        <p>
          US and Canada coverage for datacenter construction, permitting, regulations, and capital announcements.
        </p>
      </section>

      <section className="news-page__filters">
        <div className="news-page__filter-group">
          <span>Country</span>
          <div className="news-page__chips">
            {["all", ...NEWS_SOURCE_COUNTRY_OPTIONS.map((option) => option.value)].map((value) => {
              const label =
                value === "all"
                  ? "All"
                  : NEWS_SOURCE_COUNTRY_OPTIONS.find((option) => option.value === value)?.label || value;
              const isActive = country === value;
              const query = buildQueryString({
                country: value === "all" ? undefined : value,
                topic: topic === "all" ? undefined : topic,
              });

              return (
                <Link
                  key={value}
                  href={query ? `/news?${query}` : "/news"}
                  className={`news-page__chip ${isActive ? "is-active" : ""}`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="news-page__filter-group">
          <span>Topic</span>
          <div className="news-page__chips">
            {["all", ...NEWS_TOPIC_OPTIONS.map((option) => option.value)].map((value) => {
              const label =
                value === "all"
                  ? "All"
                  : NEWS_TOPIC_OPTIONS.find((option) => option.value === value)?.label || value;
              const isActive = topic === value;
              const query = buildQueryString({
                country: country === "all" ? undefined : country,
                topic: value === "all" ? undefined : value,
              });

              return (
                <Link
                  key={value}
                  href={query ? `/news?${query}` : "/news"}
                  className={`news-page__chip ${isActive ? "is-active" : ""}`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="news-page__meta">
        {isDataUnavailable ? (
          <p>
            Live feed is temporarily unavailable while the CMS data connection is recovering. Please refresh in a few
            minutes.
          </p>
        ) : (
          <p>
            Showing {news.docs.length} items on page {news.page ?? 1} of {news.totalPages ?? 1}
            {activeFilterCount > 0 ? " with active filters." : "."}
          </p>
        )}
      </section>

      <section className="news-page__list">
        {news.docs.length === 0 ? (
          <article className="news-page__item">
            <h2>{isDataUnavailable ? "Feed unavailable" : "No news items match these filters yet."}</h2>
            <p>
              {isDataUnavailable
                ? "Our ingestion and CMS services are reconnecting."
                : "Try broadening your country/topic filters or run ingestion to populate fresh stories."}
            </p>
          </article>
        ) : (
          news.docs.map((item: any) => (
            <article key={item.id} className="news-page__item">
              <h2>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </h2>
              {item.summary && <p>{item.summary}</p>}
              <div className="news-page__item-meta">
                <span>{item.sourceName}</span>
                <span>{formatDate(item.publishedAt)}</span>
                {Array.isArray(item.countries) && item.countries.length > 0 && (
                  <span>{item.countries.map((entry: string) => entry.toUpperCase()).join(", ")}</span>
                )}
              </div>
            </article>
          ))
        )}
      </section>

      {(news.totalPages ?? 1) > 1 && (
        <nav className="news-page__pagination" aria-label="Pagination">
          {Array.from({ length: news.totalPages ?? 1 }).map((_, index) => {
            const targetPage = index + 1;
            const query = buildQueryString({
              country: country === "all" ? undefined : country,
              topic: topic === "all" ? undefined : topic,
              page: targetPage === 1 ? undefined : targetPage,
            });
            return (
              <Link
                key={targetPage}
                href={query ? `/news?${query}` : "/news"}
                className={`news-page__page-link ${targetPage === currentPage ? "is-current" : ""}`}
              >
                {targetPage}
              </Link>
            );
          })}
        </nav>
      )}
    </main>
  );
}
