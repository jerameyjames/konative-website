"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StepForm } from "@/components/ui/StepForm";
import { FormField, FormInput, FormSelect } from "@/components/ui/FormShell";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
  "AB","BC","MB","NB","NL","NS","ON","PE","QC","SK",
];

export default function LandSubmitPage() {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleComplete(data: Record<string, unknown>) {
    setSubmitState("loading");
    try {
      const payload = {
        ...data,
        acreage: data.acreage ? Number(data.acreage) : undefined,
        substationDistanceMiles: data.substationDistanceMiles ? Number(data.substationDistanceMiles) : undefined,
        fiberDistanceMiles: data.fiberDistanceMiles ? Number(data.fiberDistanceMiles) : undefined,
        hasTalkedToBrokers: data.hasTalkedToBrokers === "yes",
      };

      const res = await fetch("/api/land/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/land/process");
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
      title: "Property",
      content: (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            <FormField label="County" name="county" required>
              <FormInput name="county" required placeholder="e.g. Loudoun" />
            </FormField>
            <FormField label="State" name="state" required>
              <FormSelect name="state" placeholder="Select state" options={US_STATES.map(s => ({ label: s, value: s }))} />
            </FormField>
          </div>
          <FormField label="Total acreage" name="acreage" required>
            <FormInput name="acreage" type="number" min="1" required placeholder="e.g. 250" />
          </FormField>
          <FormField label="Parcel APN" name="apn" helpText="Optional — helps us pull GIS records faster">
            <FormInput name="apn" placeholder="Optional" />
          </FormField>
          <FormField label="Ownership type" name="ownershipType">
            <FormSelect name="ownershipType" placeholder="Select…" options={[
              { label: "Sole owner", value: "sole" },
              { label: "Partnership", value: "partnership" },
              { label: "Trust", value: "trust" },
              { label: "LLC / Corp", value: "llc" },
              { label: "Other", value: "other" },
            ]} />
          </FormField>
          <FormField label="Have you spoken with other brokers?" name="hasTalkedToBrokers">
            <FormSelect name="hasTalkedToBrokers" placeholder="Select…" options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]} />
          </FormField>
        </>
      ),
    },
    {
      title: "Power",
      content: (
        <>
          <FormField label="Distance to nearest substation" name="substationDistanceMiles" helpText="Approximate miles">
            <FormInput name="substationDistanceMiles" type="number" min="0" step="0.1" placeholder="e.g. 2.5" />
          </FormField>
          <FormField label="Known transmission voltage" name="transmissionVoltage">
            <FormSelect name="transmissionVoltage" placeholder="Select…" options={[
              { label: "Under 115kV", value: "<115kV" },
              { label: "115–230kV", value: "115-230kV" },
              { label: "230–500kV", value: "230-500kV" },
              { label: "500kV+", value: "500+kV" },
              { label: "Unknown", value: "unknown" },
            ]} />
          </FormField>
          <FormField label="Water access" name="waterAccess">
            <FormSelect name="waterAccess" placeholder="Select…" options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
              { label: "Unknown", value: "unknown" },
            ]} />
          </FormField>
          <FormField label="Zoning" name="zoning">
            <FormSelect name="zoning" placeholder="Select…" options={[
              { label: "Agricultural", value: "agricultural" },
              { label: "Industrial", value: "industrial" },
              { label: "Mixed use", value: "mixed" },
              { label: "Unknown", value: "unknown" },
            ]} />
          </FormField>
          <FormField label="Distance to fiber backbone" name="fiberDistanceMiles" helpText="Optional, approximate miles">
            <FormInput name="fiberDistanceMiles" type="number" min="0" step="0.1" placeholder="Optional" />
          </FormField>
        </>
      ),
    },
    {
      title: "Intent",
      content: (
        <>
          <FormField label="Your timeline" name="timeline">
            <FormSelect name="timeline" placeholder="Select…" options={[
              { label: "Ready now", value: "now" },
              { label: "Within 6 months", value: "6months" },
              { label: "Within 12 months", value: "12months" },
              { label: "Just exploring", value: "exploring" },
            ]} />
          </FormField>
          <FormField label="Price expectation" name="priceExpectation" helpText="A range is fine, or leave blank and we'll tell you what it's worth">
            <FormInput name="priceExpectation" placeholder="e.g. $5M–$10M or 'tell me what it's worth'" />
          </FormField>
          <FormField label="Preferred deal structure" name="preferredStructure">
            <FormSelect name="preferredStructure" placeholder="Select…" options={[
              { label: "Sell outright", value: "sell" },
              { label: "Ground lease", value: "ground-lease" },
              { label: "Joint venture", value: "jv" },
              { label: "Open to all", value: "open" },
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
              { label: "Property owner", value: "owner" },
              { label: "Owner's agent / attorney", value: "agent" },
              { label: "Family representative", value: "family-rep" },
              { label: "Other", value: "other" },
            ]} />
          </FormField>
          <FormField label="How did you hear about us?" name="referralSource">
            <FormInput name="referralSource" placeholder="Optional" />
          </FormField>
        </>
      ),
    },
  ];

  return (
    <main className="land-submit">
      <div className="land-submit__inner">
        <div className="land-submit__header">
          <p className="land-hub__eyebrow">Land submission</p>
          <h1 className="land-submit__headline">Tell us about your land</h1>
          <p className="land-submit__sub">
            Five minutes. No obligation. We&rsquo;ll review your submission and reach out within 48 hours.
          </p>
        </div>
        <StepForm
          steps={steps}
          onComplete={handleComplete}
          submitState={submitState}
          submitLabel="Submit your land"
          errorMessage={errorMsg}
        />
      </div>
    </main>
  );
}
