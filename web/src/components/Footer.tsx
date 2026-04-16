import React from "react";
import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";

const platformLinks = [
  { label: "Market Intel", url: "/market-intel" },
  { label: "Blog", url: "/blog" },
  { label: "Deals", url: "/deals" },
  { label: "Dashboard", url: "/dashboard" },
];

const companyLinks = [
  { label: "Assessment", url: "/assessment" },
  { label: "Contact", url: "/contact" },
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
            The intelligence platform for modular data center development.
          </p>
        </div>

        <div className="site-footer__links">
          <div className="site-footer__link-group">
            <h4 className="site-footer__link-heading">Platform</h4>
            <nav className="site-footer__nav">
              {platformLinks.map((link) => (
                <Link key={link.url} href={link.url} className="site-footer__link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="site-footer__link-group">
            <h4 className="site-footer__link-heading">Company</h4>
            <nav className="site-footer__nav">
              {companyLinks.map((link) => (
                <Link key={link.url} href={link.url} className="site-footer__link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="site-footer__newsletter">
          <NewsletterSignup variant="inline" source="footer" />
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>&copy; {new Date().getFullYear()} Konative. All rights reserved.</p>
      </div>
    </footer>
  );
}
