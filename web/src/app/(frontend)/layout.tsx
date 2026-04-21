import React from "react";

import Footer from "../../components/Footer";
import Header from "../../components/Header";

import "./globals.css";

export const metadata = {
  title: "Konative | AI Infrastructure Development",
  description:
    "The development quarterback for modular data centers, investment groups, and tribal nations. We navigate site, power, connectivity, and capital so you can move from opportunity to operating infrastructure.",
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
