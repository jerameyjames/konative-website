export const site = {
  name: "Konative",
  title: "Konative — Modular data center development readiness",
  description:
    "Decision-grade diligence and development orchestration for investment groups and Indigenous Development Corporations moving modular data center projects forward.",
  ctaLabel: "Request a Project Readiness Review",
} as const;

/** Primary header — wraps on small screens */
export const navItems = [
  { href: "/", label: "Home" },
  { href: "/playbook", label: "Playbook" },
  { href: "/problem", label: "Problem" },
  { href: "/services", label: "Services" },
  { href: "/engagement", label: "Engagement" },
  { href: "/contact", label: "Contact" },
] as const;

/** Secondary pages linked in header (compact) + footer sitemap */
export const navMoreItems = [
  { href: "/segments", label: "Segments" },
  { href: "/compare", label: "Compare" },
  { href: "/trust", label: "Trust" },
] as const;

export const footerLegal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/legal", label: "Legal" },
] as const;
