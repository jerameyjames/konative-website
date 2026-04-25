import Link from "next/link";

export const metadata = {
  title: "RFP Received — Konative",
  description: "Your capacity RFP has been received. Here's what happens next.",
};

export default function CapacityProcessPage() {
  return (
    <main className="land-process">
      <div className="land-process__inner">
        <div className="land-process__check">✓</div>
        <h1 className="land-process__headline">RFP received</h1>
        <p className="land-process__sub">
          We review every RFP personally. Here is what happens next.
        </p>

        <ol className="land-process__timeline">
          {[
            { period: "48 hours", title: "Requirements review", body: "We'll reach out to confirm your requirements and ask any follow-up questions." },
            { period: "7 days", title: "Site identification", body: "We identify powered sites and operators that match your MW, market, and timeline." },
            { period: "14 days", title: "Shortlist + introductions", body: "We introduce you to qualified operators and owners. You talk to people, not RFP portals." },
            { period: "30–60 days", title: "Proposal negotiation", body: "We negotiate pricing, SLAs, and deal structure on your behalf." },
            { period: "60–90 days", title: "LOI and close", body: "We drive the deal to execution — letter of intent, due diligence, and contract." },
          ].map(item => (
            <li key={item.period} className="land-process__item">
              <div className="land-process__period">{item.period}</div>
              <div>
                <strong className="land-process__item-title">{item.title}</strong>
                <p className="land-process__item-body">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="land-process__footer">
          <p>
            Questions in the meantime? Email us at{" "}
            <a href="mailto:capacity@konative.com">capacity@konative.com</a>
          </p>
          <Link href="/" className="land-hub__cta-primary" style={{ marginTop: 24, display: "inline-block" }}>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
