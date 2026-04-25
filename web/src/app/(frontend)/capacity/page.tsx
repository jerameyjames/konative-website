"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepForm } from "@/components/ui/StepForm";
import { FormField, FormInput, FormSelect } from "@/components/ui/FormShell";

const MARKETS = [
  "Northern Virginia", "Dallas–Fort Worth", "Phoenix", "Chicago",
  "Atlanta", "Silicon Valley", "Seattle / Pacific Northwest",
  "New York / New Jersey", "Toronto / Ontario", "Calgary / Alberta",
  "Other North America",
];

export default function CapacityPage() {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleComplete(data: Record<string, unknown>) {
    setSubmitState("loading");
    try {
      const payload = {
        ...data,
        mwRequired: data.mwRequired ? Number(data.mwRequired) : undefined,
        marketPreferences: data.marketPreferences
          ? String(data.marketPreferences).split(",").map(s => s.trim()).filter(Boolean)
          : [],
      };

      const res = await fetch("/api/capacity/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/capacity/process");
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMsg((body as Record<string, string>).error || "Something went wrong. Please try again.");
        setSubmitState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setSubmitState("error");
    }
  }

  const steps = [
    {
      title: "Requirements",
      content: (
        <>
          <FormField label="Company" name="company" required>
            <FormInput name="company" required placeholder="Acme Corp" />
          </FormField>
          <FormField label="MW required" name="mwRequired" required helpText="Critical IT load (MW)">
            <FormInput name="mwRequired" type="number" min="1" required placeholder="e.g. 50" />
          </FormField>
          <FormField label="Target online date" name="targetOnlineDate">
            <FormSelect name="targetOnlineDate" placeholder="Select…" options={[
              { label: "ASAP / already looking", value: "asap" },
              { label: "Within 12 months", value: "12months" },
              { label: "12–24 months", value: "24months" },
              { label: "24–36 months", value: "36months" },
              { label: "Exploratory", value: "exploratory" },
            ]} />
          </FormField>
          <FormField label="Workload type" name="workloadType">
            <FormSelect name="workloadType" placeholder="Select…" options={[
              { label: "AI / GPU training", value: "ai-training" },
              { label: "AI / GPU inference", value: "ai-inference" },
              { label: "General enterprise", value: "enterprise" },
              { label: "HPC", value: "hpc" },
              { label: "Mixed / unknown", value: "mixed" },
            ]} />
          </FormField>
        </>
      ),
    },
    {
      title: "Markets",
      content: (
        <>
          <FormField label="Preferred markets" name="marketPreferences" helpText="Select all that apply — hold Ctrl/Cmd to multi-select">
            <select
              name="marketPreferences"
              multiple
              className="form-input"
              style={{ height: 180 }}
            >
              {MARKETS.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Connectivity needs" name="connectivityNeeds">
            <FormSelect name="connectivityNeeds" placeholder="Select…" options={[
              { label: "Standard enterprise (1–10G)", value: "standard" },
              { label: "High bandwidth (10–100G)", value: "high" },
              { label: "Carrier-neutral / meet-me room", value: "carrier-neutral" },
              { label: "Dark fiber access required", value: "dark-fiber" },
              { label: "No strong preference", value: "none" },
            ]} />
          </FormField>
        </>
      ),
    },
    {
      title: "Contact",
      content: (
        <>
          <FormField label="Your name" name="name" required>
            <FormInput name="name" required autoComplete="name" placeholder="First Last" />
          </FormField>
          <FormField label="Email" name="email" required>
            <FormInput name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
          </FormField>
          <FormField label="Phone" name="phone">
            <FormInput name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
          </FormField>
          <FormField label="Your role" name="role">
            <FormSelect name="role" placeholder="Select…" options={[
              { label: "CTO / VP Infrastructure", value: "cto" },
              { label: "Real estate / facilities", value: "real-estate" },
              { label: "Procurement", value: "procurement" },
              { label: "Consultant / advisor", value: "consultant" },
              { label: "Other", value: "other" },
            ]} />
          </FormField>
        </>
      ),
    },
  ];

  return (
    <main className="land-submit">
      <div className="land-submit__inner">
        <div className="land-submit__header">
          <p className="land-hub__eyebrow">For Occupiers</p>
          <h1 className="land-submit__headline">Find your next data center home</h1>
          <p className="land-submit__sub">
            Tell us your requirements. We&rsquo;ll source powered sites and introduce you to the right
            operators — without the broker runaround.
          </p>
        </div>
        <StepForm
          steps={steps}
          onComplete={handleComplete}
          submitState={submitState}
          submitLabel="Submit RFP →"
          errorMessage={errorMsg}
        />
      </div>
    </main>
  );
}
