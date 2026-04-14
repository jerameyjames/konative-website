"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

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
      className="mt-8 grid gap-4 sm:grid-cols-2"
      noValidate
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="name" className="block text-sm font-medium text-slate-800">
          Full name <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-900/10 placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="email" className="block text-sm font-medium text-slate-800">
          Work email <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-900/10 placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
        />
      </div>

      <div>
        <label htmlFor="orgType" className="block text-sm font-medium text-slate-800">
          Organization type
        </label>
        <select
          id="orgType"
          name="orgType"
          className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
          defaultValue=""
        >
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
        <label htmlFor="geography" className="block text-sm font-medium text-slate-800">
          Geography / site context
        </label>
        <input
          id="geography"
          name="geography"
          type="text"
          className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
          placeholder="Province, region, or site description"
        />
      </div>

      <div>
        <label htmlFor="projectStage" className="block text-sm font-medium text-slate-800">
          Project stage
        </label>
        <select
          id="projectStage"
          name="projectStage"
          className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
          defaultValue=""
        >
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
          className="block text-sm font-medium text-slate-800"
        >
          Timeline urgency
        </label>
        <select
          id="timelineUrgency"
          name="timelineUrgency"
          className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
          defaultValue=""
        >
          <option value="" disabled>
            Select one
          </option>
          <option value="immediate">Immediate (this quarter)</option>
          <option value="near-term">Near-term (2-3 quarters)</option>
          <option value="exploratory">Exploratory</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="projectNote" className="block text-sm font-medium text-slate-800">
          Project note
        </label>
        <textarea
          id="projectNote"
          name="projectNote"
          rows={4}
          className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20"
          placeholder="What are you trying to decide in the next 60–90 days?"
        />
      </div>

      <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-slate-600">
          By submitting, you agree we may contact you about your project. See{" "}
          <a href="/privacy" className="font-medium text-slate-800 underline underline-offset-2">
            Privacy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          {state.status === "submitting" ? "Sending…" : site.ctaLabel}
        </button>
      </div>

      {state.status === "success" ? (
        <p className="sm:col-span-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          Thank you. We will review fit and follow up shortly.
        </p>
      ) : null}

      {state.status === "error" ? (
        <p className="sm:col-span-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
