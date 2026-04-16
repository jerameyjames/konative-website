'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const rotatingWords = ['Modular Data Centers', 'Investment Groups', 'Tribal Nations']

export default function HomePage() {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="hero-rotating">
        <h1 className="hero-rotating__headline">
          The Development Quarterback for{' '}
          <span className="hero-rotating__accent">{rotatingWords[wordIndex]}</span>
        </h1>
        <p className="hero-rotating__subtitle">
          We navigate site, power, connectivity, and capital so investment groups and Indigenous
          Development Corporations can move from opportunity to operating infrastructure.
        </p>
        <Link href="/contact" className="hero-rotating__cta">
          Request a Project Readiness Review
        </Link>
      </section>

      {/* Stat Bar */}
      <section className="stat-bar">
        <div className="stat-bar__inner">
          <div className="stat-bar__item">
            <span className="stat-bar__value">$1T+</span>
            <span className="stat-bar__label">Saudi AI Infrastructure Commitment</span>
          </div>
          <div className="stat-bar__item">
            <span className="stat-bar__value">15.6 GW</span>
            <span className="stat-bar__label">North American DC Absorption (2025)</span>
          </div>
          <div className="stat-bar__item">
            <span className="stat-bar__value">4 Years</span>
            <span className="stat-bar__label">Large Transformer Lead Time</span>
          </div>
          <div className="stat-bar__item">
            <span className="stat-bar__value">8–10 Wks</span>
            <span className="stat-bar__label">Development Readiness Timeline</span>
          </div>
        </div>
      </section>

      {/* Three Card Grid */}
      <section className="three-card-grid">
        <h2 className="three-card-grid__title">What We Do</h2>
        <div className="three-card-grid__cards">
          <div className="three-card-grid__card">
            <h3>Development Readiness Engagement</h3>
            <p>
              An 8–10 week deep-dive into your project&apos;s site, power, connectivity, and
              capital stack. We deliver a build-ready assessment, risk map, and partner
              introductions.
            </p>
            <Link href="/contact">Learn More →</Link>
          </div>
          <div className="three-card-grid__card">
            <h3>Connectivity Brokerage</h3>
            <p>
              Fiber route identification, carrier negotiation, and last-mile solution design for
              modular data center sites. We have relationships with the carriers who matter.
            </p>
            <Link href="/contact">Talk to Us →</Link>
          </div>
          <div className="three-card-grid__card">
            <h3>Market Intelligence</h3>
            <p>
              Real-time visibility into North American power availability, ISO pricing, equipment
              lead times, and investment flows — the data your team needs to make decisions with
              confidence.
            </p>
            <Link href="/market-intel">Request Access →</Link>
          </div>
        </div>
      </section>

      {/* Split Image Text */}
      <section className="split-image-text">
        <div className="split-image-text__inner">
          <div className="split-image-text__content">
            <h2>We Know Where the Bottlenecks Are</h2>
            <p>
              Power interconnection queues are 2–4 years in Virginia. Transformers are 4 years out.
              But stranded power exists in tribal lands, rural fiber corridors, and secondary
              markets — if you know where to look. Our methodology starts where other consultants
              stop: at the intersection of land, power, fiber, and capital.
            </p>
            <Link href="/assessment" className="split-image-text__cta">
              See Our Assessment Tool →
            </Link>
          </div>
          <div className="split-image-text__media">
            <div
              style={{
                width: '100%',
                aspectRatio: '4/3',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover, #0f766e))',
              }}
            />
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band cta-band--primary">
        <div className="cta-band__inner">
          <h2>Your project deserves a quarterback, not another vendor pitch.</h2>
          <Link href="/contact" className="cta-band__button">
            Request a Review
          </Link>
        </div>
      </section>
    </>
  )
}
