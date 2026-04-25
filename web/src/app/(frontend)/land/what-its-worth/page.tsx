import Link from "next/link";

export const metadata = {
  title: "What Is My Powered Land Worth? — Konative",
  description:
    "How data center developers value land: power capacity, substation proximity, acreage, and zoning. A practical framework for landowners and agents.",
};

export default function WhatIsItWorthPage() {
  return (
    <main className="valuation-page">
      <article className="valuation-page__article">
        <header className="valuation-page__header">
          <p className="land-hub__eyebrow">For Landowners</p>
          <h1 className="valuation-page__headline">
            What is powered land worth to a data center developer?
          </h1>
          <p className="valuation-page__lede">
            There is no standard $/acre price for data center land. Value is driven almost entirely
            by power — its availability, proximity, and deliverability. Here is the framework that
            buyers use, and what it means for your parcel.
          </p>
        </header>

        <section className="valuation-page__section">
          <h2>The primary driver: available power</h2>
          <p>
            A data center consumes 20–200 MW of continuous power. The most important question a buyer
            asks is: &ldquo;Can I get that power, how quickly, and at what cost?&rdquo; Everything else —
            acreage, zoning, location — is secondary.
          </p>
          <p>
            Land within 2 miles of a 230kV+ substation with available capacity typically commands
            a significant premium. Land 15 miles from the nearest 69kV line may not be financeable
            as a standalone data center site at all.
          </p>
        </section>

        <section className="valuation-page__section">
          <h2>Value factors, in order of importance</h2>
          <div className="valuation-page__factors">
            {[
              { rank: "1", factor: "Power availability", detail: "MW available at the nearest substation without requiring new transmission. Queued interconnection reduces value significantly." },
              { rank: "2", factor: "Substation distance", detail: "Under 1 mile = highest value. 1–5 miles = good. 5–10 miles = feasible with investment. Over 10 miles = typically requires new transmission." },
              { rank: "3", factor: "Transmission voltage", detail: "500kV lines serve the largest buyers. 230kV works for most projects. 115kV supports smaller builds. Under 115kV limits options." },
              { rank: "4", factor: "Acreage and contiguity", detail: "Hyperscalers want 200–2,000+ contiguous acres for multi-phase development. Smaller parcels work for colo developers at 50–150 acres." },
              { rank: "5", factor: "Water access", detail: "Evaporative cooling uses 1–3 million gallons/day per 100 MW. Industrial water rights or proximity to a water source meaningfully affects value." },
              { rank: "6", factor: "Zoning and permitting risk", detail: "Pre-zoned industrial or heavy commercial land transacts at a premium. Agricultural land has re-zoning risk that buyers price in." },
              { rank: "7", factor: "Fiber connectivity", detail: "Within 10 miles of a fiber backbone. Hyperscaler campuses require multi-100G diverse fiber paths." },
              { rank: "8", factor: "Geography and markets", detail: "Texas, Carolinas, Pacific Northwest, Ontario, and Alberta are current priority markets for most buyers." },
            ].map(item => (
              <div key={item.rank} className="valuation-page__factor">
                <span className="valuation-page__factor-rank">{item.rank}</span>
                <div>
                  <strong className="valuation-page__factor-name">{item.factor}</strong>
                  <p className="valuation-page__factor-detail">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="valuation-page__section">
          <h2>Sell vs. ground lease vs. joint venture</h2>
          <p>
            <strong>Sell outright:</strong> Clean exit, immediate liquidity. Typical for sellers who
            want certainty and no ongoing involvement. Buyers typically pay a premium over agricultural
            value but below what the finished facility will support.
          </p>
          <p>
            <strong>Ground lease:</strong> You retain ownership and receive an annual ground rent
            (typically $2,000–$8,000/acre/year, indexed to CPI) for 30–99 years. Upside is retained
            land value appreciation; risk is counterparty creditworthiness and lease complexity.
          </p>
          <p>
            <strong>Joint venture:</strong> You contribute the land; the developer contributes
            capital and expertise. You participate in project upside. Higher complexity, longer
            timeline, and more negotiation, but highest potential return for well-located parcels.
          </p>
        </section>

        <section className="valuation-page__section">
          <h2>How long does it take?</h2>
          <p>
            A straightforward land sale — good power, clean title, willing seller — can close in
            90–180 days from first contact. Projects requiring new transmission interconnection,
            re-zoning, or environmental remediation routinely take 2–4 years from site selection
            to groundbreaking.
          </p>
          <p>
            Konative stages the process to protect your time: we run our analysis first,
            bring you qualified buyers who have already reviewed the basics, and only ask for
            your time when there is genuine interest.
          </p>
        </section>

        <div className="valuation-page__cta-block">
          <h2>Want to know what your specific parcel is worth?</h2>
          <p>Submit it — five minutes, no obligation. We&rsquo;ll run the numbers and get back to you within 48 hours.</p>
          <Link href="/land/submit" className="land-hub__cta-primary">
            Submit your land →
          </Link>
        </div>
      </article>
    </main>
  );
}
