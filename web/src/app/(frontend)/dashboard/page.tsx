"use client";

import React, { useState, useEffect } from "react";

interface HealthData {
  feeds: { total: number; active: number; erroring: number };
  articles: { total: number; published: number };
  subscribers: { total: number };
  last_fetch: string | null;
}

interface FeedSource {
  id: string;
  name: string;
  source_type: string;
  last_fetched_at: string | null;
  error_count: number;
  is_active: boolean;
}

interface Article {
  id: string;
  title: string;
  source_name: string;
  category: string;
  published_at: string;
  url: string;
}

interface Deal {
  id: string;
  entity_name: string;
  deal_type: string;
  deal_value_usd: number | null;
  status: string;
  power_capacity_mw: number | null;
}

interface CategoryCount {
  category: string;
  count: number;
}

function formatCurrency(val: number | null): string {
  if (val == null) return "N/A";
  if (val >= 1_000_000_000) return `$${(val / 1_000_000_000).toFixed(1)}B`;
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(0)}M`;
  return `$${val.toLocaleString()}`;
}

export default function DashboardPage() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [feeds, setFeeds] = useState<FeedSource[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [categories, setCategories] = useState<CategoryCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const supabaseUrl =
        process.env.NEXT_PUBLIC_SUPABASE_URL ;
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ;

      const headers = {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      };

      try {
        const [healthRes, feedsRes, articlesRes, dealsRes] = await Promise.all([
          fetch("/api/v1/health"),
          fetch(`${supabaseUrl}/rest/v1/feed_sources?select=id,name,source_type,last_fetched_at,error_count,is_active&order=name`, { headers }),
          fetch(`${supabaseUrl}/rest/v1/market_intel_articles?select=id,title,source_name,category,published_at,url&is_published=eq.true&order=published_at.desc&limit=10`, { headers }),
          fetch(`${supabaseUrl}/rest/v1/investment_deals?select=id,entity_name,deal_type,deal_value_usd,status,power_capacity_mw&order=deal_value_usd.desc.nullslast`, { headers }),
        ]);

        if (healthRes.ok) setHealth(await healthRes.json());
        if (feedsRes.ok) setFeeds(await feedsRes.json());
        if (articlesRes.ok) {
          const arts: Article[] = await articlesRes.json();
          setArticles(arts);

          // Build category counts from all articles
          const allArtsRes = await fetch(
            `${supabaseUrl}/rest/v1/market_intel_articles?select=category&is_published=eq.true`,
            { headers },
          );
          if (allArtsRes.ok) {
            const allArts: { category: string }[] = await allArtsRes.json();
            const counts: Record<string, number> = {};
            allArts.forEach((a) => {
              counts[a.category] = (counts[a.category] || 0) + 1;
            });
            setCategories(
              Object.entries(counts)
                .map(([category, count]) => ({ category, count }))
                .sort((a, b) => b.count - a.count),
            );
          }
        }
        if (dealsRes.ok) setDeals(await dealsRes.json());
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
      setLoading(false);
    }
    fetchAll();
  }, []);

  if (loading) {
    return (
      <section className="dashboard">
        <div className="dashboard__inner">
          <p className="dashboard__loading">Loading dashboard...</p>
        </div>
      </section>
    );
  }

  const maxCategoryCount = categories.length > 0 ? categories[0].count : 1;

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

  return (
    <section className="dashboard">
      <div className="dashboard__inner">
        <div className="dashboard__header">
          <h1>Dashboard</h1>
          <p>Platform overview and real-time intelligence metrics.</p>
        </div>

        {/* Platform Health */}
        {health && (
          <div className="dashboard__section">
            <h2 className="dashboard__section-title">Platform Health</h2>
            <div className="dashboard__stats">
              <div className="dashboard__stat-card">
                <span className="dashboard__stat-value">{health.articles.total}</span>
                <span className="dashboard__stat-label">Total Articles</span>
              </div>
              <div className="dashboard__stat-card">
                <span className="dashboard__stat-value">{health.articles.published}</span>
                <span className="dashboard__stat-label">Published</span>
              </div>
              <div className="dashboard__stat-card">
                <span className="dashboard__stat-value">{health.feeds.active}</span>
                <span className="dashboard__stat-label">Active Feeds</span>
              </div>
              <div className="dashboard__stat-card">
                <span className="dashboard__stat-value">{health.subscribers.total}</span>
                <span className="dashboard__stat-label">Subscribers</span>
              </div>
              <div className="dashboard__stat-card">
                <span className="dashboard__stat-value">
                  {health.last_fetch
                    ? new Date(health.last_fetch).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Never"}
                </span>
                <span className="dashboard__stat-label">Last Fetch</span>
              </div>
            </div>
          </div>
        )}

        {/* Feed Status */}
        {feeds.length > 0 && (
          <div className="dashboard__section">
            <h2 className="dashboard__section-title">Feed Status</h2>
            <div className="dashboard__table-wrap">
              <table className="dashboard__table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Last Fetched</th>
                    <th>Errors</th>
                    <th>Active</th>
                  </tr>
                </thead>
                <tbody>
                  {feeds.map((feed) => (
                    <tr key={feed.id}>
                      <td>{feed.name}</td>
                      <td>{feed.source_type}</td>
                      <td>
                        {feed.last_fetched_at
                          ? new Date(feed.last_fetched_at).toLocaleDateString()
                          : "Never"}
                      </td>
                      <td>
                        <span
                          className={`dashboard__error-badge ${
                            feed.error_count === 0
                              ? "dashboard__error-badge--ok"
                              : feed.error_count <= 3
                                ? "dashboard__error-badge--warn"
                                : "dashboard__error-badge--error"
                          }`}
                        >
                          {feed.error_count}
                        </span>
                      </td>
                      <td>{feed.is_active ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Content by Category */}
        {categories.length > 0 && (
          <div className="dashboard__section">
            <h2 className="dashboard__section-title">Content by Category</h2>
            <div className="dashboard__chart">
              {categories.map((cat) => (
                <div key={cat.category} className="dashboard__chart-row">
                  <span className="dashboard__chart-label">
                    {categoryLabels[cat.category] || cat.category}
                  </span>
                  <div className="dashboard__chart-bar-wrap">
                    <div
                      className="dashboard__chart-bar"
                      style={{
                        width: `${(cat.count / maxCategoryCount) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="dashboard__chart-count">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Articles */}
        {articles.length > 0 && (
          <div className="dashboard__section">
            <h2 className="dashboard__section-title">Recent Articles</h2>
            <div className="dashboard__article-list">
              {articles.map((article) => (
                <div key={article.id} className="dashboard__article-row">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dashboard__article-title"
                  >
                    {article.title}
                  </a>
                  <div className="dashboard__article-meta">
                    <span className="dashboard__article-source">
                      {article.source_name}
                    </span>
                    <span className="dashboard__article-badge">
                      {categoryLabels[article.category] || article.category}
                    </span>
                    <time className="dashboard__article-date">
                      {new Date(article.published_at).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Investment Deals Tracker */}
        {deals.length > 0 && (
          <div className="dashboard__section">
            <h2 className="dashboard__section-title">Investment Deals Tracker</h2>
            <div className="dashboard__table-wrap">
              <table className="dashboard__table">
                <thead>
                  <tr>
                    <th>Entity</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>Status</th>
                    <th>Power (MW)</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal) => (
                    <tr key={deal.id}>
                      <td>{deal.entity_name}</td>
                      <td>{deal.deal_type}</td>
                      <td>{formatCurrency(deal.deal_value_usd)}</td>
                      <td>
                        <span className="dashboard__status-badge">
                          {deal.status}
                        </span>
                      </td>
                      <td>
                        {deal.power_capacity_mw
                          ? `${deal.power_capacity_mw.toLocaleString()} MW`
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Subscriber Growth */}
        {health && (
          <div className="dashboard__section">
            <h2 className="dashboard__section-title">Subscriber Stats</h2>
            <div className="dashboard__stats">
              <div className="dashboard__stat-card">
                <span className="dashboard__stat-value">{health.subscribers.total}</span>
                <span className="dashboard__stat-label">Total Subscribers</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
