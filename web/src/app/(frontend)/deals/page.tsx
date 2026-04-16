"use client";

import React, { useState, useEffect } from "react";
import NewsletterSignup from "@/components/NewsletterSignup";

interface Deal {
  id: string;
  entity_name: string;
  deal_type: string;
  deal_value_usd: number | null;
  status: string;
  category: string;
  power_capacity_mw: number | null;
  partner_companies: string | null;
  summary: string;
}

const categoryLabels: Record<string, string> = {
  investment_ma: "Investment / M&A",
  saudi_gulf: "Saudi / Gulf",
  modular_build: "Modular Build",
  power_grid: "Power / Grid",
  supply_chain: "Supply Chain",
};

function formatCurrency(val: number | null): string {
  if (val == null) return "Undisclosed";
  if (val >= 1_000_000_000) return `$${(val / 1_000_000_000).toFixed(1)}B`;
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(0)}M`;
  return `$${val.toLocaleString()}`;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/deals")
      .then((res) => res.json())
      .then((data) => {
        setDeals(data.deals || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "all"
      ? deals
      : deals.filter((d) => d.category === activeCategory);

  const usedCategories = Array.from(new Set(deals.map((d) => d.category)));

  return (
    <section className="deals-page">
      <div className="deals-page__inner">
        <div className="deals-page__header">
          <h1>Investment Deals</h1>
          <p>
            Track the latest data center investment activity, M&A transactions,
            and development partnerships shaping the industry.
          </p>
        </div>

        {!loading && deals.length > 0 && (
          <div className="deals-page__filters">
            <button
              className={`deals-page__filter${activeCategory === "all" ? " deals-page__filter--active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All
            </button>
            {usedCategories.map((cat) => (
              <button
                key={cat}
                className={`deals-page__filter${activeCategory === cat ? " deals-page__filter--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="deals-page__loading">Loading deals...</p>
        ) : filtered.length === 0 ? (
          <div className="deals-page__empty">
            <h2>No Deals Found</h2>
            <p>Check back soon for the latest investment activity.</p>
          </div>
        ) : (
          <div className="deals-page__grid">
            {filtered.map((deal) => (
              <article key={deal.id} className="deals-page__card">
                <div className="deals-page__card-top">
                  <span className="deals-page__badge">
                    {categoryLabels[deal.category] || deal.category}
                  </span>
                  <span className="deals-page__status">{deal.status}</span>
                </div>
                <h3 className="deals-page__card-title">{deal.entity_name}</h3>
                <div className="deals-page__card-details">
                  <div className="deals-page__detail">
                    <span className="deals-page__detail-label">Type</span>
                    <span className="deals-page__detail-value">{deal.deal_type}</span>
                  </div>
                  <div className="deals-page__detail">
                    <span className="deals-page__detail-label">Value</span>
                    <span className="deals-page__detail-value deals-page__detail-value--highlight">
                      {formatCurrency(deal.deal_value_usd)}
                    </span>
                  </div>
                  {deal.power_capacity_mw && (
                    <div className="deals-page__detail">
                      <span className="deals-page__detail-label">Power</span>
                      <span className="deals-page__detail-value">
                        {deal.power_capacity_mw.toLocaleString()} MW
                      </span>
                    </div>
                  )}
                  {deal.partner_companies && (
                    <div className="deals-page__detail">
                      <span className="deals-page__detail-label">Partners</span>
                      <span className="deals-page__detail-value">{deal.partner_companies}</span>
                    </div>
                  )}
                </div>
                <p className="deals-page__card-summary">{deal.summary}</p>
              </article>
            ))}
          </div>
        )}

        <div className="deals-page__cta">
          <NewsletterSignup variant="banner" source="deals" />
        </div>
      </div>
    </section>
  );
}
