import React from "react";
import "./globals.css";

export const metadata = {
  title: "Konative | Premium Sales Representation",
  description:
    "Woman-owned sales representation and marketing for the outdoor living, surfaces, and fabrication industry.",
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* TODO: Header component */}
        <main>{children}</main>
        {/* TODO: Footer component */}
      </body>
    </html>
  );
}
