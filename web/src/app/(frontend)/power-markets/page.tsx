"use client";

import React from "react";
import NewsletterSignup from "@/components/NewsletterSignup";

const isoRegions = [
  { name: "PJM", region: "Mid-Atlantic", description: "Largest wholesale electricity market in the US, serving 65 million people across 13 states and DC." },
  { name: "CAISO", region: "California", description: "California's independent system operator managing the state's bulk electric power system." },
  { name: "ERCOT", region: "Texas", description: "Manages the flow of electric power to more than 26 million Texas customers." },
  { name: "MISO", region: "Midwest", description: "Manages the electrical grid across 15 states and the Canadian province of Manitoba." },
  { name: "NYISO", region: "New York", description: "Operates New York's bulk electricity grid, administering the state's wholesale electricity markets." },
  { name: "ISONE", region: "New England", description: "Coordinates the flow of electricity across the six New England states." },
  { name: "SPP", region: "Central US", description: "Regional transmission organization covering 14 states in the central United States." },
  { name: "IESO", region: "Ontario", description: "Ontario's Independent Electricity System Operator managing the province's power system." },
];

export default function PowerMarketsPage() {
  return (
    <section className="power-markets">
      <div className="power-markets__inner">
        <div className="power-markets__header">
          <h1>Power Markets</h1>
          <p>
            Real-time power market data and pricing across North American ISO
            regions. Track interconnection queues, capacity pricing, and
            availability for data center development.
          </p>
          <span className="power-markets__coming-soon-badge">Coming Soon</span>
        </div>

        <div className="power-markets__grid">
          {isoRegions.map((iso) => (
            <div key={iso.name} className="power-markets__card">
              <div className="power-markets__card-header">
                <h3 className="power-markets__card-name">{iso.name}</h3>
                <span className="power-markets__card-region">{iso.region}</span>
              </div>
              <p className="power-markets__card-description">
                {iso.description}
              </p>
              <p className="power-markets__card-placeholder">
                Data coming soon
              </p>
            </div>
          ))}
        </div>

        <div className="power-markets__cta">
          <NewsletterSignup variant="banner" source="power-markets" />
        </div>
      </div>
    </section>
  );
}
