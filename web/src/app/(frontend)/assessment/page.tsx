"use client";

import React, { useState } from "react";

interface Question {
  id: number;
  text: string;
  options: { label: string; value: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Do you have a site, or are you site-hunting?",
    options: [
      { label: "Site identified", value: "site_identified", score: 3 },
      { label: "Site hunting", value: "site_hunting", score: 1 },
      { label: "Not sure", value: "not_sure", score: 0 },
    ],
  },
  {
    id: 2,
    text: "What's your target capacity?",
    options: [
      { label: "< 5 MW", value: "lt_5mw", score: 1 },
      { label: "5–20 MW", value: "5_20mw", score: 2 },
      { label: "20–100 MW", value: "20_100mw", score: 3 },
      { label: "100+ MW", value: "100plus_mw", score: 3 },
    ],
  },
  {
    id: 3,
    text: "Do you have a power interconnection commitment?",
    options: [
      { label: "Yes", value: "yes", score: 3 },
      { label: "In progress", value: "in_progress", score: 2 },
      { label: "No", value: "no", score: 0 },
    ],
  },
  {
    id: 4,
    text: "What's your fiber proximity?",
    options: [
      { label: "On-net", value: "on_net", score: 3 },
      { label: "Near-net", value: "near_net", score: 2 },
      { label: "Off-net", value: "off_net", score: 1 },
      { label: "Unknown", value: "unknown", score: 0 },
    ],
  },
  {
    id: 5,
    text: "What's your timeline?",
    options: [
      { label: "< 6 months", value: "lt_6mo", score: 3 },
      { label: "6–12 months", value: "6_12mo", score: 2 },
      { label: "12–24 months", value: "12_24mo", score: 1 },
      { label: "24+ months", value: "24plus_mo", score: 0 },
    ],
  },
  {
    id: 6,
    text: "Do you have capital committed?",
    options: [
      { label: "Fully funded", value: "fully_funded", score: 3 },
      { label: "Partially funded", value: "partially_funded", score: 2 },
      { label: "Seeking capital", value: "seeking_capital", score: 1 },
      { label: "Pre-capital", value: "pre_capital", score: 0 },
    ],
  },
  {
    id: 7,
    text: "Is this a tribal / indigenous land project?",
    options: [
      { label: "Yes", value: "yes", score: 2 },
      { label: "No", value: "no", score: 1 },
      { label: "Exploring", value: "exploring", score: 1 },
    ],
  },
  {
    id: 8,
    text: "What region?",
    options: [
      { label: "US West", value: "us_west", score: 2 },
      { label: "US East", value: "us_east", score: 2 },
      { label: "US Central", value: "us_central", score: 2 },
      { label: "Canada", value: "canada", score: 1 },
    ],
  },
  {
    id: 9,
    text: "Have you engaged other DC consultants?",
    options: [
      { label: "Yes", value: "yes", score: 1 },
      { label: "No", value: "no", score: 2 },
    ],
  },
  {
    id: 10,
    text: "What's your primary need?",
    options: [
      { label: "Full development readiness", value: "full_readiness", score: 3 },
      { label: "Connectivity only", value: "connectivity", score: 2 },
      { label: "Market intelligence", value: "market_intel", score: 1 },
      { label: "Not sure", value: "not_sure", score: 0 },
    ],
  },
];

type ResultTier = "development_ready" | "needs_prerequisites" | "earlier_stage";

function getResultTier(score: number): ResultTier {
  if (score >= 20) return "development_ready";
  if (score >= 12) return "needs_prerequisites";
  return "earlier_stage";
}

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { value: string; score: number }>>({});
  const [showResult, setShowResult] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const totalScore = Object.values(answers).reduce((sum, a) => sum + a.score, 0);
  const tier = getResultTier(totalScore);
  const progress = ((currentStep) / questions.length) * 100;

  function selectAnswer(value: string, score: number) {
    setAnswers((prev) => ({ ...prev, [currentStep]: { value, score } }));

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 200);
    } else {
      setTimeout(() => setShowResult(true), 200);
    }
  }

  function goBack() {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }

  function restart() {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setShowContactForm(false);
    setContactSubmitted(false);
  }

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          message: `Assessment result: ${tier} (score: ${totalScore}/30). ${data.message || ""}`,
        }),
      });
      setContactSubmitted(true);
    } catch {
      // silent fail — user can still navigate
    } finally {
      setSubmitting(false);
    }
  }

  if (showResult) {
    return (
      <section className="assessment">
        <div className="assessment__inner">
          <div className="assessment__result">
            {tier === "development_ready" && (
              <>
                <div className="assessment__result-badge assessment__result-badge--ready">
                  Development-Ready
                </div>
                <h2>Your project shows strong readiness signals.</h2>
                <p>
                  You have the key ingredients — site, power trajectory, and capital direction
                  — for a structured development review. Konative can help compress your
                  timeline and de-risk the remaining steps.
                </p>
                {!showContactForm && !contactSubmitted && (
                  <button
                    className="assessment__cta"
                    onClick={() => setShowContactForm(true)}
                  >
                    Request a Readiness Review
                  </button>
                )}
              </>
            )}

            {tier === "needs_prerequisites" && (
              <>
                <div className="assessment__result-badge assessment__result-badge--prereq">
                  Needs Prerequisites
                </div>
                <h2>You&rsquo;re on the path, but there are gaps to close.</h2>
                <p>
                  Key areas like power interconnection, site control, or capital structure
                  likely need attention before a full development push. Konative can help
                  you identify exactly what&rsquo;s needed and map a path forward.
                </p>
                {!showContactForm && !contactSubmitted && (
                  <button
                    className="assessment__cta"
                    onClick={() => setShowContactForm(true)}
                  >
                    Discuss Next Steps
                  </button>
                )}
              </>
            )}

            {tier === "earlier_stage" && (
              <>
                <div className="assessment__result-badge assessment__result-badge--early">
                  Earlier Stage
                </div>
                <h2>You&rsquo;re in the exploration phase.</h2>
                <p>
                  That&rsquo;s a great place to build your understanding of the market.
                  Start with our curated market intelligence to understand power availability,
                  modular build timelines, and regional dynamics before committing resources.
                </p>
                <div className="assessment__cta-group">
                  <a href="/market-intel" className="assessment__cta">
                    Explore Market Intel
                  </a>
                  {!showContactForm && !contactSubmitted && (
                    <button
                      className="assessment__cta assessment__cta--secondary"
                      onClick={() => setShowContactForm(true)}
                    >
                      Get in Touch Anyway
                    </button>
                  )}
                </div>
              </>
            )}

            {showContactForm && !contactSubmitted && (
              <form className="assessment__contact-form" onSubmit={handleContactSubmit}>
                <h3>Leave your details</h3>
                <input type="text" name="name" placeholder="Full Name *" required />
                <input type="email" name="email" placeholder="Email *" required />
                <input type="text" name="organization" placeholder="Organization *" required />
                <textarea name="message" placeholder="Anything else you'd like to share?" rows={3} />
                <button type="submit" disabled={submitting}>
                  {submitting ? "Sending..." : "Submit"}
                </button>
              </form>
            )}

            {contactSubmitted && (
              <p className="assessment__submitted">
                Thanks! We&rsquo;ll be in touch within one business day.
              </p>
            )}

            <button className="assessment__restart" onClick={restart}>
              Retake Assessment
            </button>
          </div>
        </div>
      </section>
    );
  }

  const question = questions[currentStep];

  return (
    <section className="assessment">
      <div className="assessment__inner">
        <div className="assessment__header">
          <h1>DC Development Readiness Assessment</h1>
          <p>
            Answer 10 quick questions to understand where your modular data center
            project stands — and what steps come next.
          </p>
        </div>

        <div className="assessment__progress">
          <div className="assessment__progress-bar">
            <div
              className="assessment__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="assessment__progress-label">
            Question {currentStep + 1} of {questions.length}
          </span>
        </div>

        <div className="assessment__question">
          <h2>{question.text}</h2>
          <div className="assessment__options">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                className={`assessment__option${
                  answers[currentStep]?.value === opt.value
                    ? " assessment__option--selected"
                    : ""
                }`}
                onClick={() => selectAnswer(opt.value, opt.score)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {currentStep > 0 && (
          <button className="assessment__back" onClick={goBack}>
            &larr; Back
          </button>
        )}
      </div>
    </section>
  );
}
