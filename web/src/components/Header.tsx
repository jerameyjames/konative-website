"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Process", url: "/assessment" },
  { label: "Services", url: "/market-intel" },
  { label: "Projects", url: "/deals" },
  { label: "Insights", url: "/blog" },
  { label: "About", url: "/about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo">
          <span className="site-header__logo-text">KONATIVE</span>
        </Link>

        <nav className={`site-header__nav${menuOpen ? " site-header__nav--open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="site-header__link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="site-header__cta site-header__cta--mobile"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>

        <Link href="/contact" className="site-header__cta site-header__cta--desktop">
          Contact
        </Link>

        <button
          className={`site-header__hamburger${menuOpen ? " site-header__hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
