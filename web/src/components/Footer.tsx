'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

function NavLink({ href, children }: NavLinkProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{
        display: 'block',
        fontFamily: 'Inter, sans-serif',
        fontSize: 13,
        color: hovered ? '#ffffff' : 'rgba(255,255,255,0.55)',
        textDecoration: 'none',
        marginBottom: 10,
        transition: 'color 0.15s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

type BottomLinkProps = {
  href: string;
  children: React.ReactNode;
};

function BottomLink({ href, children }: BottomLinkProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 11,
        color: hovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)',
        textDecoration: 'none',
        transition: 'color 0.15s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', padding: '80px 32px 0' }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
          gap: 64,
          paddingBottom: 64,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Column 1 — Brand */}
        <div>
          <div
            style={{
              fontFamily: "'Barlow Condensed', 'Barlow', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(32px, 3.5vw, 48px)',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: 20,
            }}
          >
            DIGITAL INFRASTRUCTURE{' '}
            <span style={{ color: '#C84B1F' }}>EXECUTION.</span>
          </div>

          <div
            style={{
              fontFamily: "'Barlow Condensed', 'Barlow', sans-serif",
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>KO</span>
            <span style={{ color: '#C84B1F' }}>NATIVE</span>
          </div>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.35)',
              maxWidth: 320,
              margin: 0,
            }}
          >
            Intelligence platform, development brokerage, and media property for
            the North American modular data center industry.
          </p>
        </div>

        {/* Column 2 — Platform */}
        <div>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: 20,
            }}
          >
            PLATFORM
          </div>
          <nav>
            <NavLink href="/market-intel">Market Intel</NavLink>
            <NavLink href="/news">Blog</NavLink>
            <NavLink href="/deals">Deals</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/power-markets">Power Markets</NavLink>
          </nav>
        </div>

        {/* Column 3 — Company */}
        <div>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: 20,
            }}
          >
            COMPANY
          </div>
          <nav>
            <NavLink href="/assessment">Assessment</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Sponsorship</NavLink>
          </nav>
        </div>

        {/* Column 4 — Newsletter */}
        <div>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: 20,
            }}
          >
            INTELLIGENCE BRIEF
          </div>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.6,
              marginBottom: 16,
              marginTop: 0,
            }}
          >
            Get the weekly intelligence digest.
          </p>

          <div style={{ display: 'flex', gap: 0 }}>
            <input
              type="email"
              placeholder="Email address"
              style={{
                flex: 1,
                padding: '10px 12px',
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRight: 'none',
                color: '#ffffff',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                outline: 'none',
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 16px',
                background: '#C84B1F',
                color: '#ffffff',
                border: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '24px 0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          © 2026 Konative. All rights reserved.
        </span>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 24 }}>
          <BottomLink href="/privacy">Privacy Policy</BottomLink>
          <BottomLink href="/terms">Terms of Service</BottomLink>
        </div>
      </div>
    </footer>
  );
}
