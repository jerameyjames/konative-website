"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks: { label: string; url: string }[] = [
  { label: "Services", url: "/#capabilities" },
  { label: "Team", url: "/#team" },
  { label: "Deals", url: "/deals" },
  { label: "Market Intel", url: "/market-intel" },
];

/** Pages that have a full-bleed dark hero under the header */
const DARK_HERO_PAGES = new Set(["/"]);

export default function Header() {
  const pathname = usePathname();
  const hasDarkHero = DARK_HERO_PAGES.has(pathname);

  const [scrolled, setScrolled] = useState(!hasDarkHero);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    if (!hasDarkHero) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasDarkHero]);

  const linkColor = "#fff";

  const headerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    zIndex: 1000,
    background: scrolled ? "rgba(8,20,45,0.97)" : "transparent",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
    backdropFilter: scrolled ? "blur(8px)" : "none",
    transition: "background 0.3s, border-color 0.3s",
  };

  const innerStyle: React.CSSProperties = {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    height: 64,
    gap: 24,
  };

  const wordmarkStyle: React.CSSProperties = {
    textDecoration: "none",
    display: "flex",
    alignItems: "baseline",
    flexShrink: 0,
  };

  const wordmarkKoStyle: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: 22,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "#fff",
    transition: "color 0.3s",
  };

  const wordmarkNativeStyle: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: 22,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "#E07B39",
  };

  const navStyle: React.CSSProperties = {
    display: "flex",
    gap: 22,
    flex: 1,
    justifyContent: "center",
    minWidth: 0,
  };

  const actionsStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  };

  const ctaStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    background: ctaHovered ? "#2a5fd0" : "#1E4FBF",
    color: "#fff",
    padding: "10px 20px",
    textDecoration: "none",
    flexShrink: 0,
    transition: "background 0.2s",
  };

  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        {/* Wordmark */}
        <Link href="/" style={wordmarkStyle}>
          <span style={wordmarkKoStyle}>KO</span>
          <span style={wordmarkNativeStyle}>NATIVE</span>
        </Link>

        {/* Center nav */}
        <nav style={navStyle}>
          {navLinks.map((link) => {
            const isHovered = hoveredLink === link.url;
            const navLinkStyle: React.CSSProperties = {
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: isHovered ? "#E07B39" : linkColor,
              opacity: isHovered ? 1 : 0.85,
              transition: "color 0.2s, opacity 0.2s",
            };
            return (
              <Link
                key={link.url}
                href={link.url}
                style={navLinkStyle}
                onMouseEnter={() => setHoveredLink(link.url)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div style={actionsStyle}>
          <Link
            href="/contact"
            style={ctaStyle}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
          >
            START YOUR PROJECT
          </Link>
        </div>
      </div>
    </header>
  );
}
