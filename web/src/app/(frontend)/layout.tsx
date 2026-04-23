import React from "react";

import Footer from "../../components/Footer";
import Header from "../../components/Header";

import "./globals.css";

export const metadata = {
  title: "Konative | Energy Infrastructure Brokerage & Development",
  description:
    "End-to-end energy infrastructure deal facilitation — connecting investors, landholders, supply chain, power sourcing, and the right teams. Bring us your project. We take it from here.",
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Barlow Condensed — Display & Headlines | Inter — Body */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
