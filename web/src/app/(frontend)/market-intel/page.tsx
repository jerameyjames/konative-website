"use client";

import React, { useState, useEffect } from "react";

interface MarketIntelPost {
  id: string;
  title: string;
  summary: string;
  sourceUrl: string;
  sourceName: string;
  category: string;
  publishedDate: string;
  curatorNote?: string;
}

const categoryLabels: Record<string, string> = {
  power_grid: "Power / Grid",
  investment_ma: "Investment / M&A",
  modular_build: "Modular Build",
  tribal_indigenous: "Tribal / Indigenous",
  saudi_gulf: "Saudi / Gulf",
  supply_chain: "Supply Chain",
  industry_news: "Industry News",
  regulatory: "Regulatory",
};

export default function MarketIntelPage() {
  const [posts, setPosts] = useState<MarketIntelPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/market-intel")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.docs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const usedCategories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <section className="market-intel">
      <div className="market-intel__inner">
        <div className="market-intel__header">
          <h1>Market Intelligence</h1>
          <p>
            Curated data center industry analysis with practitioner commentary.
            Real signal for development teams, not recycled press releases.
          </p>
        </div>

        {!loading && posts.length > 0 && (
          <div className="market-intel__filters">
            <button
              className={`market-intel__filter${activeCategory === "all" ? " market-intel__filter--active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All
            </button>
            {usedCategories.map((cat) => (
              <button
                key={cat}
                className={`market-intel__filter${activeCategory === cat ? " market-intel__filter--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="market-intel__loading">Loading articles...</p>
        ) : filtered.length === 0 ? (
          <div className="market-intel__empty">
            <h2>Coming Soon</h2>
            <p>
              Our curated market intelligence feed is launching soon. Check back
              for practitioner analysis on data center development, power
              markets, and modular infrastructure.
            </p>
          </div>
        ) : (
          <div className="market-intel__grid">
            {filtered.map((post) => (
              <article key={post.id} className="market-intel__card">
                <div className="market-intel__card-top">
                  <span className="market-intel__badge">
                    {categoryLabels[post.category] || post.category}
                  </span>
                  <time className="market-intel__date">
                    {new Date(post.publishedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h3 className="market-intel__card-title">{post.title}</h3>
                <p className="market-intel__card-summary">{post.summary}</p>
                {post.curatorNote && (
                  <blockquote className="market-intel__curator-note">
                    <strong>Practitioner Note:</strong> {post.curatorNote}
                  </blockquote>
                )}
                <div className="market-intel__card-footer">
                  <span className="market-intel__source">{post.sourceName}</span>
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="market-intel__read-more"
                  >
                    Read source &rarr;
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
