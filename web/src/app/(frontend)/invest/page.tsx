"use client";

import { useState } from "react";

export default function InvestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "invest-interest" }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true); // optimistic — don't block UX on network error
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="placeholder-door placeholder-door--invest">
      <div className="placeholder-door__inner">
        <p className="land-hub__eyebrow">For Investors</p>
        <h1 className="placeholder-door__headline">
          Institutional-grade data center<br />
          investment opportunities.
        </h1>
        <p className="placeholder-door__sub">
          Konative sources, underwrites, and structures data center investments for family offices,
          private equity, and infrastructure funds. Powered land, build-to-suit, and operating
          assets across North America.
        </p>

        <div className="placeholder-door__pillars">
          {[
            { icon: "⚡", title: "Powered land", body: "Off-market parcels with transmission access — ideal for long-dated ground lease or development play." },
            { icon: "🏗️", title: "Build-to-suit", body: "We source the site, structure the deal, and manage construction on behalf of capital partners." },
            { icon: "📊", title: "Operating assets", body: "Stabilized data center facilities with long-term hyperscaler or colo tenancy." },
          ].map(item => (
            <div key={item.title} className="placeholder-door__pillar">
              <div className="placeholder-door__pillar-icon">{item.icon}</div>
              <strong className="placeholder-door__pillar-title">{item.title}</strong>
              <p className="placeholder-door__pillar-body">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="placeholder-door__cta-block">
          <h2>Investor briefings coming soon.</h2>
          <p>Leave your email and we&rsquo;ll reach out when the investor portal launches.</p>
          {submitted ? (
            <p className="placeholder-door__thanks">✓ You&rsquo;re on the list. We&rsquo;ll be in touch.</p>
          ) : (
            <form onSubmit={handleSubmit} className="placeholder-door__email-form">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="placeholder-door__email-input"
              />
              <button type="submit" disabled={loading} className="land-hub__cta-primary">
                {loading ? "Submitting…" : "Notify me →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
