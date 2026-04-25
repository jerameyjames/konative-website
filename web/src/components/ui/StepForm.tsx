"use client";

import React, { useState } from "react";

export type StepFormSubmitState = "idle" | "loading" | "success" | "error";

interface Step {
  title: string;
  content: React.ReactNode;
}

interface StepFormProps {
  steps: Step[];
  onComplete: (allData: Record<string, unknown>) => void;
  submitState: StepFormSubmitState;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function StepForm({
  steps,
  onComplete,
  submitState,
  submitLabel = "Submit",
  successMessage = "Thank you — we'll be in touch within one business day.",
  errorMessage,
}: StepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [collectedData, setCollectedData] = useState<Record<string, unknown>>({});

  const isLast = currentStep === steps.length - 1;

  function handleNext(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const stepData: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      if (stepData[key] !== undefined) {
        stepData[key] = [
          ...(Array.isArray(stepData[key]) ? (stepData[key] as unknown[]) : [stepData[key]]),
          value,
        ];
      } else {
        stepData[key] = value;
      }
    });

    const merged = { ...collectedData, ...stepData };
    setCollectedData(merged);

    if (isLast) {
      onComplete(merged);
    } else {
      setCurrentStep(s => s + 1);
    }
  }

  function handleBack() {
    setCurrentStep(s => Math.max(0, s - 1));
  }

  if (submitState === "success") {
    return (
      <div className="step-form__success" role="status">
        <div className="step-form__success-icon">✓</div>
        <p>{successMessage}</p>
      </div>
    );
  }

  return (
    <div className="step-form">
      <div className="step-form__progress" aria-label={`Step ${currentStep + 1} of ${steps.length}`}>
        {steps.map((step, i) => (
          <div key={i} className={`step-form__pip${i <= currentStep ? " step-form__pip--active" : ""}`}>
            <span className="step-form__pip-num">{i + 1}</span>
            <span className="step-form__pip-label">{step.title}</span>
          </div>
        ))}
      </div>

      <form className="step-form__form" onSubmit={handleNext} noValidate>
        <div className="step-form__fields">
          {steps[currentStep].content}
        </div>

        {submitState === "error" && errorMessage && (
          <p className="step-form__error" role="alert">{errorMessage}</p>
        )}

        <div className="step-form__actions">
          {currentStep > 0 && (
            <button type="button" className="step-form__back" onClick={handleBack}>
              ← Back
            </button>
          )}
          <button
            type="submit"
            className="step-form__next"
            disabled={submitState === "loading"}
          >
            {submitState === "loading" ? "Sending…" : isLast ? submitLabel : "Next →"}
          </button>
        </div>
      </form>
    </div>
  );
}
