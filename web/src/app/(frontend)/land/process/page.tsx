import Link from "next/link";

export const metadata = {
  title: "Submission Received — Konative",
  description: "Your land submission has been received. Here's what happens next.",
};

export default function LandProcessPage() {
  return (
    <main className="land-process">
      <div className="land-process__inner">
        <div className="land-process__check">✓</div>
        <h1 className="land-process__headline">Submission received</h1>
        <p className="land-process__sub">
          We review every submission personally. Here is what happens next.
        </p>

        <ol className="land-process__timeline">
          {[
            { period: "48 hours", title: "Qualification call", body: "We'll reach out by email or phone to ask a few quick follow-up questions and confirm your details." },
            { period: "7 days", title: "Power & site analysis", body: "We pull GIS, transmission queue, and interconnection data for your parcel. No cost, no obligation." },
            { period: "30 days", title: "Buyer outreach", body: "We take your parcel to our network of hyperscalers, infrastructure developers, and investors." },
            { period: "30–90 days", title: "LOI and negotiation", body: "If there is interest, we facilitate LOI negotiation to maximize your outcome — sale, ground lease, or JV." },
            { period: "90–180 days", title: "Due diligence & close", body: "We stay on through environmental review, title, and closing to keep the deal on track." },
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
            <a href="mailto:land@konative.com">land@konative.com</a>
          </p>
          <Link href="/" className="land-hub__cta-primary" style={{ marginTop: 24, display: "inline-block" }}>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
