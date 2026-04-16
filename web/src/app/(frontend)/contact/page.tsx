"use client";

import React, { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setFormState("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <section className="contact-page">
        <div className="contact-page__inner">
          <div className="contact-page__success">
            <h1>Thank you</h1>
            <p>
              Your inquiry has been submitted. We&rsquo;ll be in touch within one business day.
            </p>
            <a href="/" className="contact-page__back-link">
              Back to home
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="contact-page">
      <div className="contact-page__inner">
        <div className="contact-page__intro">
          <h1>Start a Conversation</h1>
          <p>
            Whether you&rsquo;re exploring a modular data center build, need connectivity
            guidance, or want access to our market intelligence — we&rsquo;re here to help.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="name">Full Name *</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="contact-form__field">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>

          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="organization">Organization *</label>
              <input type="text" id="organization" name="organization" required />
            </div>
            <div className="contact-form__field">
              <label htmlFor="role">Role</label>
              <input type="text" id="role" name="role" />
            </div>
          </div>

          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="projectType">Project Type</label>
              <select id="projectType" name="projectType">
                <option value="">Select...</option>
                <option value="modular_dc_build">Modular Data Center Build</option>
                <option value="connectivity">Connectivity / Fiber</option>
                <option value="tribal_indigenous">Tribal / Indigenous Development</option>
                <option value="market_intel">Market Intelligence Access</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="contact-form__field">
              <label htmlFor="projectStage">Project Stage</label>
              <select id="projectStage" name="projectStage">
                <option value="">Select...</option>
                <option value="exploring">Exploring (no site yet)</option>
                <option value="site_identified">Site identified, power TBD</option>
                <option value="need_connectivity">Site + power, need connectivity</option>
                <option value="fully_sited">Fully sited, need capital intro</option>
                <option value="in_development">Already in development</option>
              </select>
            </div>
          </div>

          <div className="contact-form__field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} />
          </div>

          <div className="contact-form__field">
            <label htmlFor="referralSource">How did you hear about us?</label>
            <input type="text" id="referralSource" name="referralSource" />
          </div>

          {formState === "error" && (
            <p className="contact-form__error">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="contact-form__submit"
            disabled={formState === "submitting"}
          >
            {formState === "submitting" ? "Submitting..." : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}
