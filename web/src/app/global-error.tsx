"use client";

// Global error boundary for the App Router. Required by Next.js for top-level
// rendering errors; Sentry recommends this file for React render error reporting.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/error#global-errorjs

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0b1020",
          color: "#f6f7fb",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          textAlign: "center",
          padding: "4rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#C8001F",
              marginBottom: "0.75rem",
            }}
          >
            Konative
          </p>
          <h1 style={{ fontSize: "2rem", margin: "0 0 1rem", fontWeight: 700 }}>
            Something went wrong
          </h1>
          <p style={{ color: "#94a3b8", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            An unexpected error occurred. Try refreshing the page or contact us
            if the issue persists.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#C8001F",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
