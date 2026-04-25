"use client";

import React from "react";

interface FieldProps {
  label: string;
  name: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, name, error, helpText, required, children }: FieldProps) {
  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={name}>
        {label}
        {required && <span className="form-field__required" aria-hidden="true"> *</span>}
      </label>
      {children}
      {helpText && !error && <p className="form-field__help">{helpText}</p>}
      {error && <p className="form-field__error" role="alert">{error}</p>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}
export function FormInput({ name, ...props }: InputProps) {
  return <input id={name} name={name} className="form-field__input" {...props} />;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}
export function FormTextarea({ name, ...props }: TextareaProps) {
  return <textarea id={name} name={name} className="form-field__textarea" {...props} />;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: { label: string; value: string }[];
  placeholder?: string;
}
export function FormSelect({ name, options, placeholder, ...props }: SelectProps) {
  return (
    <select id={name} name={name} className="form-field__select" {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export type SubmitState = "idle" | "loading" | "success" | "error";

interface FormShellProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitState: SubmitState;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  children: React.ReactNode;
}

export function FormShell({
  onSubmit,
  submitState,
  submitLabel = "Submit",
  successMessage = "Submitted successfully.",
  errorMessage,
  children,
}: FormShellProps) {
  if (submitState === "success") {
    return (
      <div className="form-shell__success" role="status">
        <p>{successMessage}</p>
      </div>
    );
  }

  return (
    <form className="form-shell" onSubmit={onSubmit} noValidate>
      {children}
      {submitState === "error" && errorMessage && (
        <p className="form-shell__error" role="alert">{errorMessage}</p>
      )}
      <button
        type="submit"
        className="form-shell__submit"
        disabled={submitState === "loading"}
      >
        {submitState === "loading" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
