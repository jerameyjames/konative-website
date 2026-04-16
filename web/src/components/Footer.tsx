import React from "react";
import Link from "next/link";

const footerLinks = [
  { label: "About", url: "/about" },
  { label: "Services", url: "/services" },
  { label: "Market Intel", url: "/market-intel" },
  { label: "Contact", url: "/contact" },
  { label: "Assessment", url: "/assessment" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link href="/" className="site-footer__logo">
            Konative
          </Link>
          <p className="site-footer__tagline">
            Modular data center development brokerage.
          </p>
        </div>

        <nav className="site-footer__nav">
          {footerLinks.map((link) => (
            <Link key={link.url} href={link.url} className="site-footer__link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="site-footer__bottom">
        <p>&copy; {new Date().getFullYear()} Konative. All rights reserved.</p>
      </div>
    </footer>
  );
}
