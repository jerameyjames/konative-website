"use client";

import React, { useState, useEffect } from "react";

interface PremiumGateProps {
  isPremium: boolean;
  children: React.ReactNode;
}

export default function PremiumGate({ isPremium, children }: PremiumGateProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    if (!isPremium) {
      setHasAccess(true);
      return;
    }
    try {
      const sub = localStorage.getItem("konative_subscription");
      if (sub) {
        const parsed = JSON.parse(sub);
        if (parsed.status === "active") setHasAccess(true);
      }
    } catch {
      // ignore
    }
  }, [isPremium]);

  if (hasAccess) return <>{children}</>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "premium-gate" }),
      });
      localStorage.setItem(
        "konative_subscription",
        JSON.stringify({ email, status: "active" }),
      );
      setHasAccess(true);
      setStatus("success");
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div className="premium-gate">
      <div className="premium-gate__preview">{children}</div>
      <div className="premium-gate__overlay">
        <div className="premium-gate__cta">
          <h3>Premium Content</h3>
          <p>Subscribe to access this content and our full intelligence feed.</p>
          <form className="premium-gate__form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "..." : "Get Access"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
