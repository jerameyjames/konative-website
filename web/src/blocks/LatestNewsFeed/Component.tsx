import React from "react";

type NewsItem = {
  id: string | number;
  title?: string;
  url?: string;
  summary?: string;
  sourceName?: string;
  publishedAt?: string;
  countries?: string[];
};

type Props = {
  heading: string;
  intro?: string;
  maxItems?: number;
  countryFilter?: "all" | "us" | "ca";
  showSource?: boolean;
  showPublishedDate?: boolean;
  ctaLabel?: string;
  ctaLink?: string;
  __newsItems?: NewsItem[];
};

const prettyDate = (value?: string) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return null;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export const LatestNewsFeedBlock: React.FC<Props> = ({
  heading,
  intro,
  maxItems = 8,
  countryFilter = "all",
  showSource = true,
  showPublishedDate = true,
  ctaLabel,
  ctaLink,
  __newsItems = [],
}) => {
  const filteredItems = __newsItems
    .filter((item) => {
      if (countryFilter === "all") return true;
      return Array.isArray(item.countries) && item.countries.includes(countryFilter);
    })
    .slice(0, maxItems);

  return (
    <section className="latest-news-feed">
      <div className="latest-news-feed__inner">
        <div className="latest-news-feed__header">
          <h2>{heading}</h2>
          {intro && <p>{intro}</p>}
        </div>

        {filteredItems.length === 0 ? (
          <p className="latest-news-feed__empty">
            No news items have been ingested yet. Run the ingestion script to populate this feed.
          </p>
        ) : (
          <ul className="latest-news-feed__list">
            {filteredItems.map((item) => {
              const itemDate = prettyDate(item.publishedAt);
              return (
                <li key={String(item.id)} className="latest-news-feed__item">
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                  {item.summary && <p>{item.summary}</p>}
                  <div className="latest-news-feed__meta">
                    {showSource && item.sourceName && <span>{item.sourceName}</span>}
                    {showPublishedDate && itemDate && <span>{itemDate}</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {ctaLabel && ctaLink && (
          <a href={ctaLink} className="latest-news-feed__cta">
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
};
