import React from "react";
import Link from "next/link";

const platformLinks = [
  { label: "Market Intel", url: "/market-intel" },
  { label: "Deals", url: "/deals" },
  { label: "Blog", url: "/blog" },
  { label: "Dashboard", url: "/dashboard" },
];

const companyLinks = [
  { label: "Process", url: "/assessment" },
  { label: "Contact", url: "/contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link href="/" className="site-footer__logo">
            KONATIVE
          </Link>
          <p className="site-footer__tagline">
            The connective tissue for ambitious infrastructure projects.
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
      </div>

      <div className="site-footer__bottom">
        <p>&copy; {new Date().getFullYear()} Konative. All rights reserved.</p>
      </div>
    </footer>
  );
}
