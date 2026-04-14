"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

const field =
  "mt-1 w-full rounded-md border-0 border-b-2 border-b-[color:var(--outline-variant)] bg-[color:var(--surface-container-high)] px-4 py-2.5 text-sm text-[color:var(--on-surface)] shadow-[inset_0_1px_2px_rgba(43,52,55,0.04)] outline-none placeholder:text-[color:var(--outline)] focus:border-b-[color:var(--primary)] focus:bg-[color:var(--surface-container-lowest)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--primary)_14%,transparent)]";

export function InquiryForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const website = String(data.get("website") ?? "").trim();
    if (website) {
      setState({ status: "success" });
      return;
    }

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      orgType: String(data.get("orgType") ?? "").trim(),
      geography: String(data.get("geography") ?? "").trim(),
      projectStage: String(data.get("projectStage") ?? "").trim(),
      timelineUrgency: String(data.get("timelineUrgency") ?? "").trim(),
      projectNote: String(data.get("projectNote") ?? "").trim(),
    };

    if (!payload.name || !payload.email) {
      setState({
        status: "error",
        message: "Name and email are required.",
      });
      return;
    }

    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Something went wrong.");
      }
      form.reset();
      setState({ status: "success" });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 grid gap-5 sm:grid-cols-2 [&_option]:bg-[color:var(--surface-container-lowest)] [&_option]:text-[color:var(--on-surface)]"
      noValidate
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="name" className="block text-sm font-medium text-[color:var(--on-surface)]">
          Full name <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={field}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="email" className="block text-sm font-medium text-[color:var(--on-surface)]">
          Work email <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="orgType" className="block text-sm font-medium text-[color:var(--on-surface)]">
          Organization type
        </label>
        <select id="orgType" name="orgType" className={field} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option value="investment-group">Investment group</option>
          <option value="indigenous-development-corporation">
            Indigenous Development Corporation
          </option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="geography" className="block text-sm font-medium text-[color:var(--on-surface)]">
          Geography / site context
        </label>
        <input
          id="geography"
          name="geography"
          type="text"
          className={field}
          placeholder="Province, region, or site description"
        />
      </div>

      <div>
        <label htmlFor="projectStage" className="block text-sm font-medium text-[color:var(--on-surface)]">
          Project stage
        </label>
        <select id="projectStage" name="projectStage" className={field} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option value="early">Early opportunity / land + capital forming</option>
          <option value="active">Active pursuit / procurement pressure</option>
          <option value="advanced">Advanced planning / vendor conversations</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="timelineUrgency"
          className="block text-sm font-medium text-[color:var(--on-surface)]"
        >
          Timeline urgency
        </label>
        <select id="timelineUrgency" name="timelineUrgency" className={field} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option value="immediate">Immediate (this quarter)</option>
          <option value="near-term">Near-term (2-3 quarters)</option>
          <option value="exploratory">Exploratory</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="projectNote" className="block text-sm font-medium text-[color:var(--on-surface)]">
          Project note
        </label>
        <textarea
          id="projectNote"
          name="projectNote"
          rows={4}
          className={field}
          placeholder="MW target, interconnection stage, capital stack, or what you need to decide in 60–90 days"
        />
      </div>

      <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-[color:var(--on-surface-variant)]">
          By submitting, you agree we may contact you about your project. See{" "}
          <a
            href="/privacy"
            className="font-medium text-[color:var(--primary)] underline underline-offset-2 hover:opacity-80"
          >
            Privacy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--primary-dim)] px-6 py-3 text-sm font-semibold text-[color:var(--on-primary)] shadow-[0_20px_40px_-12px_rgba(43,52,55,0.15)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--primary)]"
        >
          {state.status === "submitting" ? "Sending…" : site.ctaLabel}
        </button>
      </div>

      {state.status === "success" ? (
        <p className="sm:col-span-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Thank you. We will review fit and follow up shortly.
        </p>
      ) : null}

      {state.status === "error" ? (
        <p className="sm:col-span-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
