"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about" },
  { label: "Services", url: "/services" },
  { label: "News", url: "/news" },
  { label: "Contact", url: "/contact" },
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
          Konative
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
            Start partnership inquiry
          </Link>
        </nav>

        <Link href="/contact" className="site-header__cta site-header__cta--desktop">
          Start partnership inquiry
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
