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

  // New UI state
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

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

  async function handleSubscribe() {
    if (!email || subscribing || subscribed) return;
    setSubscribing(true);
    try {
      await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "market_intel_page" }),
      });
      setSubscribed(true);
    } catch {
      // silently fail
    } finally {
      setSubscribing(false);
    }
  }

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ background: "#0A0A0A", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#C84B1F",
              marginBottom: 16,
            }}
          >
            LIVE INTELLIGENCE
          </div>
          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(48px, 7vw, 88px)",
              lineHeight: 0.92,
              textTransform: "uppercase",
              color: "#FFFFFF",
              letterSpacing: "0.01em",
              margin: 0,
            }}
          >
            MARKET{" "}
            <span style={{ color: "#C84B1F" }}>INTELLIGENCE</span>
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 560,
              marginTop: 16,
              marginBottom: 0,
            }}
          >
            Curated data center industry analysis with practitioner commentary.
            Real signal for development teams, not recycled press releases.
          </p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div
        style={{
          position: "sticky",
          top: 64,
          zIndex: 100,
          background: "#fff",
          borderBottom: "1px solid #E0DDD8",
          padding: "0 32px",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            gap: 0,
          }}
        >
          {posts.length > 0 && (
            <>
              {(["all", ...usedCategories] as string[]).map((tabValue) => {
                const isActive = activeCategory === tabValue;
                const label =
                  tabValue === "all"
                    ? "ALL"
                    : (categoryLabels[tabValue] || tabValue).toUpperCase();
                return (
                  <button
                    key={tabValue}
                    onClick={() => setActiveCategory(tabValue)}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      padding: "14px 20px",
                      background: "transparent",
                      border: "none",
                      borderBottom: isActive
                        ? "2px solid #C84B1F"
                        : "2px solid transparent",
                      color: isActive ? "#C84B1F" : "#555",
                      cursor: "pointer",
                      marginBottom: -1,
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: "40px 32px 120px" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 80,
          }}
        >
          {/* Left column — article grid */}
          <div>
            {loading ? (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: "#888",
                  padding: "40px 0",
                }}
              >
                Loading intelligence feed...
              </p>
            ) : filtered.length === 0 ? (
              <div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 32,
                    textTransform: "uppercase",
                    color: "#111111",
                    marginBottom: 12,
                  }}
                >
                  COMING SOON
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    color: "#555",
                    margin: 0,
                  }}
                >
                  Our curated market intelligence feed is launching soon.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  border: "1px solid #E0DDD8",
                }}
              >
                {filtered.map((post, i) => {
                  const isHovered = hoveredCard === post.id;
                  const isLastRow =
                    i >= filtered.length - ((filtered.length % 3) || 3);
                  const isLastInRow = i % 3 === 2;
                  return (
                    <article
                      key={post.id}
                      onMouseEnter={() => setHoveredCard(post.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        borderLeft: isHovered
                          ? "3px solid #C84B1F"
                          : "3px solid transparent",
                        borderRight: isLastInRow
                          ? "none"
                          : "1px solid #E0DDD8",
                        borderBottom: isLastRow
                          ? "none"
                          : "1px solid #E0DDD8",
                        boxShadow: isHovered
                          ? "0 4px 16px rgba(0,0,0,0.08)"
                          : "none",
                        transition:
                          "border-left 0.15s ease, box-shadow 0.15s ease",
                      }}
                    >
                      {/* Thumbnail placeholder */}
                      <div
                        className="infra-photo"
                        style={{ height: 140, width: "100%" }}
                      />

                      {/* Card body */}
                      <div
                        style={{
                          padding: "20px 20px 24px",
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                        }}
                      >
                        <div style={{ marginBottom: 12 }}>
                          <span
                            style={{
                              display: "inline-block",
                              background: "#C84B1F",
                              color: "#fff",
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 500,
                              fontSize: 10,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              padding: "3px 8px",
                            }}
                          >
                            {categoryLabels[post.category] || post.category}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 11,
                              color: "#888",
                              marginLeft: 8,
                            }}
                          >
                            {new Date(post.publishedDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>

                        <div
                          style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 700,
                            fontSize: 19,
                            lineHeight: 1.15,
                            textTransform: "uppercase",
                            color: "#111111",
                            marginBottom: 12,
                            letterSpacing: "0.01em",
                          }}
                        >
                          {post.title}
                        </div>

                        {post.summary && (
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 14,
                              lineHeight: 1.6,
                              color: "#555",
                              marginBottom: 12,
                              margin: "0 0 12px 0",
                            }}
                          >
                            {post.summary}
                          </p>
                        )}

                        {post.curatorNote && (
                          <div
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 13,
                              lineHeight: 1.6,
                              color: "#444",
                              borderLeft: "3px solid #C84B1F",
                              paddingLeft: 12,
                              marginBottom: 12,
                            }}
                          >
                            {post.curatorNote}
                          </div>
                        )}

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "auto",
                            paddingTop: 12,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 11,
                              color: "#888",
                            }}
                          >
                            {post.sourceName}
                          </span>
                          <a
                            href={post.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 600,
                              fontSize: 11,
                              color: "#C84B1F",
                              textDecoration: "none",
                            }}
                          >
                            Read →
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right column — Newsletter rail */}
          <div
            style={{
              background: "#F2F0EB",
              padding: "40px 32px",
              position: "sticky",
              top: 128,
              alignSelf: "start",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#C84B1F",
                marginBottom: 16,
              }}
            >
              THE INTELLIGENCE BRIEF
            </div>

            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 28,
                textTransform: "uppercase",
                color: "#111111",
                marginBottom: 16,
                lineHeight: 1,
                margin: "0 0 16px 0",
              }}
            >
              GET THE INTELLIGENCE IN YOUR INBOX
            </h3>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                lineHeight: 1.6,
                color: "#555",
                marginBottom: 24,
                margin: "0 0 24px 0",
              }}
            >
              Join decision-makers tracking the modular DC buildout. 2x/week.
            </p>

            {subscribed ? (
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#C84B1F",
                  padding: "14px 0",
                }}
              >
                Subscribed! ✓
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #E0DDD8",
                    background: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    marginBottom: 10,
                    outline: "none",
                    boxSizing: "border-box",
                    borderRadius: 0,
                  }}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={subscribing}
                  style={{
                    width: "100%",
                    padding: 14,
                    background: "#C84B1F",
                    color: "#fff",
                    border: "none",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    cursor: subscribing ? "not-allowed" : "pointer",
                    opacity: subscribing ? 0.7 : 1,
                    borderRadius: 0,
                  }}
                >
                  SUBSCRIBE FREE
                </button>
              </>
            )}

            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: "#888",
                marginTop: 12,
              }}
            >
              Updated daily · 16 live feeds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
