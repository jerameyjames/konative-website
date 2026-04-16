import React from "react";
import Link from "next/link";

const servicesLinks = [
  { label: "Site Selection", url: "/market-intel" },
  { label: "Power Strategy", url: "/market-intel" },
  { label: "Project Development", url: "/deals" },
  { label: "Capital Advisory", url: "/deals" },
];

const companyLinks = [
  { label: "About Us", url: "/about" },
  { label: "Our Process", url: "/assessment" },
  { label: "Insights", url: "/blog" },
  { label: "Contact", url: "/contact" },
];

const connectLinks = [
  { label: "LinkedIn", url: "https://linkedin.com" },
  { label: "Twitter", url: "https://twitter.com" },
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
            The connective tissue between capital and deployed infrastructure.
          </p>
        </div>

        <div className="site-footer__links">
          <div className="site-footer__link-group">
            <h4 className="site-footer__link-heading">Services</h4>
            <nav className="site-footer__nav">
              {servicesLinks.map((link) => (
                <Link key={link.label} href={link.url} className="site-footer__link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="site-footer__link-group">
            <h4 className="site-footer__link-heading">Company</h4>
            <nav className="site-footer__nav">
              {companyLinks.map((link) => (
                <Link key={link.label} href={link.url} className="site-footer__link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="site-footer__link-group">
            <h4 className="site-footer__link-heading">Connect</h4>
            <nav className="site-footer__nav">
              {connectLinks.map((link) => (
                <Link key={link.label} href={link.url} className="site-footer__link" target="_blank" rel="noopener noreferrer">
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
