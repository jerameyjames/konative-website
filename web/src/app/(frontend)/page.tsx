'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <>
      <HeroTissue />
      <CrisisSection />
      <ProblemSection />
      <PlaybookSection />
      <SegmentsSection />
      <CasesSection />
      <FinalCTA />
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO - "Connective Tissue" Section
   ═══════════════════════════════════════════════════════════════════════════ */
function HeroTissue() {
  return (
    <section className="hero-tissue">
      <div className="hero-tissue__container">
        <div className="hero-tissue__content">
          <span className="hero-tissue__eyebrow">ARCHITECTURE PRECISION</span>
          <h1 className="hero-tissue__headline">
            Konative is the<br />
            <span className="hero-tissue__accent">Connective Tissue</span>
          </h1>
          <p className="hero-tissue__description">
            Not advisors. Not contractors. Not brokers. We are the people who orchestrate capital, land, 
            power, and talent into deployed infrastructure—on a timeline that actually works.
          </p>
          <div className="hero-tissue__actions">
            <Link href="/contact" className="btn btn--primary">
              Start a Conversation
            </Link>
            <Link href="/assessment" className="btn btn--outline">
              Explore Our Process
            </Link>
          </div>
        </div>

        <aside className="hero-tissue__sidebar">
          <div className="hero-tissue__sidebar-card">
            <p className="hero-tissue__sidebar-text">
              See how we compress 24+ month timelines into 12-18 months of precision execution.
            </p>
            <Link href="/assessment" className="hero-tissue__sidebar-link">
              View the Playbook →
            </Link>
          </div>
        </aside>
      </div>

      <div className="hero-tissue__stats">
        <div className="hero-tissue__stat">
          <span className="hero-tissue__stat-value">Strategic</span>
          <span className="hero-tissue__stat-label">Sourcing</span>
        </div>
        <div className="hero-tissue__stat hero-tissue__stat--highlight">
          <span className="hero-tissue__stat-value">1.2 GW</span>
          <span className="hero-tissue__stat-label">Secured</span>
        </div>
        <div className="hero-tissue__stat">
          <span className="hero-tissue__stat-value">Turnkey</span>
          <span className="hero-tissue__stat-label">Execution</span>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CRISIS SECTION - Dark dramatic hero
   ═══════════════════════════════════════════════════════════════════════════ */
function CrisisSection() {
  return (
    <section className="crisis-section">
      <div className="crisis-section__hero">
        <div className="crisis-section__hero-image">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop"
            alt="Data center corridor"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="crisis-section__hero-overlay" />
        </div>

        <div className="crisis-section__hero-content">
          <div className="crisis-section__hero-headline">
            <span className="crisis-section__hero-small">INFRASTRUCTURE</span>
            <span className="crisis-section__hero-large">CRISIS</span>
            <span className="crisis-section__hero-accent">NOBODY TALKS ABOUT</span>
          </div>
          <div className="crisis-section__hero-sidebar">
            <span className="crisis-section__hero-label">THE TECHNICAL STANDARD</span>
            <p className="crisis-section__hero-text">
              The gap between demand and deployable capacity is widening. 
              AI workloads require infrastructure that does not yet exist at scale.
            </p>
          </div>
        </div>
      </div>

      <div className="crisis-section__content">
        <div className="crisis-section__grid">
          <div className="crisis-section__stats">
            <div className="crisis-section__stat-card">
              <span className="crisis-section__stat-value">1.2 GW</span>
              <span className="crisis-section__stat-label">Capacity secured across strategic markets</span>
              <Link href="/deals" className="crisis-section__stat-link">ALL DETAILS →</Link>
            </div>
            <div className="crisis-section__image-card">
              <Image
                src="https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800&h=600&fit=crop"
                alt="Server infrastructure"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="crisis-section__technical">
            <div className="crisis-section__technical-header">
              <span className="crisis-section__technical-eyebrow">THE</span>
              <h3 className="crisis-section__technical-title">TECHNICAL STANDARD</h3>
            </div>
            <p className="crisis-section__technical-text">
              The enterprise technology landscape demands infrastructure capable of 
              supporting next-generation AI workloads. We architect solutions at the 
              intersection of power, land, and capital.
            </p>
            <ul className="crisis-section__technical-list">
              <li>High-density compute environments</li>
              <li>Sustainable power procurement</li>
              <li>Strategic land positioning</li>
              <li>Accelerated permitting pathways</li>
            </ul>
            <div className="crisis-section__technical-image">
              <Image
                src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=800&h=500&fit=crop"
                alt="Data center facility"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROBLEM SECTION - "Why 12-18 Months"
   ═══════════════════════════════════════════════════════════════════════════ */
function ProblemSection() {
  return (
    <section className="problem-section">
      <div className="problem-section__hero">
        <div className="problem-section__hero-image">
          <Image
            src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=1920&h=1080&fit=crop"
            alt="Data center infrastructure"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="problem-section__hero-overlay" />
        </div>
        <div className="problem-section__hero-content">
          <h2 className="problem-section__hero-headline">
            Why <span className="problem-section__hero-accent">12-18 Months</span> Instead of 24+?
          </h2>
          <p className="problem-section__hero-text">
            The traditional 24+ month timeline is a framework. We synchronize the 
            levers of regulatory, human capital, and critical infrastructure 
            optimization to deploy faster.
          </p>
        </div>
      </div>

      <div className="problem-section__pillars">
        <div className="problem-section__pillar">
          <div className="problem-section__pillar-image">
            <Image
              src="https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&h=600&fit=crop"
              alt="Supply chain"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h3 className="problem-section__pillar-title">SUPPLY CHAIN</h3>
        </div>
        <div className="problem-section__pillar">
          <div className="problem-section__pillar-image">
            <Image
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=600&fit=crop"
              alt="Stakeholders"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h3 className="problem-section__pillar-title">STAKEHOLDERS</h3>
        </div>
        <div className="problem-section__pillar">
          <div className="problem-section__pillar-image">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop"
              alt="Timeline"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h3 className="problem-section__pillar-title">TIMELINE</h3>
        </div>
        <div className="problem-section__stats">
          <div className="problem-section__stat">
            <span className="problem-section__stat-value">1.8</span>
            <span className="problem-section__stat-label">Avg. Timeline Compression</span>
          </div>
          <div className="problem-section__stat">
            <span className="problem-section__stat-value">2.4x</span>
            <span className="problem-section__stat-label">Faster Deployment</span>
          </div>
        </div>
      </div>

      <div className="problem-section__systems">
        <div className="problem-section__systems-content">
          <h3 className="problem-section__systems-title">
            Integrated Systems<br />Architecture
          </h3>
          <p className="problem-section__systems-text">
            Beyond the standard development playbook: We create an integrated 
            approach that synchronizes power procurement, site development, 
            and construction with the precision of a single, unified team.
          </p>
          <Link href="/assessment" className="btn btn--primary">
            PHASE 1.0
          </Link>
        </div>
        <div className="problem-section__systems-image">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop"
            alt="Systems architecture"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className="problem-section__cta">
        <h3 className="problem-section__cta-headline">READY TO ACCELERATE?</h3>
        <Link href="/contact" className="btn btn--outline-light">
          Book a Technical Consultation
        </Link>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PLAYBOOK SECTION - Three phases
   ═══════════════════════════════════════════════════════════════════════════ */
function PlaybookSection() {
  const phases = [
    {
      number: 'PHASE 01',
      title: 'QUALIFICATION',
      description: 'Market analysis, site identification, and power availability assessment to establish project viability.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=600&fit=crop',
    },
    {
      number: 'PHASE 02',
      title: 'DE-RISKING',
      description: 'Due diligence, entitlement strategy, and interconnection planning to remove development obstacles.',
      image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=400&h=600&fit=crop',
    },
    {
      number: 'PHASE 03',
      title: 'EXECUTION',
      description: 'Construction oversight, commissioning support, and operational handoff to deliver on schedule.',
      image: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=400&h=600&fit=crop',
    },
  ]

  return (
    <section className="playbook-section">
      <header className="playbook-section__header">
        <span className="playbook-section__eyebrow">THE KONATIVE PLAYBOOK</span>
        <div className="playbook-section__hero-image">
          <Image
            src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=1400&h=600&fit=crop"
            alt="Data center overview"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </header>

      <div className="playbook-section__phases">
        {phases.map((phase) => (
          <div key={phase.number} className="playbook-section__phase">
            <div className="playbook-section__phase-image">
              <Image
                src={phase.image}
                alt={phase.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="playbook-section__phase-content">
              <span className="playbook-section__phase-number">{phase.number}</span>
              <h3 className="playbook-section__phase-title">{phase.title}</h3>
              <p className="playbook-section__phase-description">{phase.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="playbook-section__cta">
        <h3 className="playbook-section__cta-headline">
          Ready to Architect Your <span className="playbook-section__cta-accent">Next Project</span>?
        </h3>
        <div className="playbook-section__cta-actions">
          <Link href="/assessment" className="btn btn--primary">
            Review Our Process
          </Link>
          <Link href="/contact" className="btn btn--outline">
            Schedule with an Architect
          </Link>
        </div>
        <div className="playbook-section__cta-image">
          <Image
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1400&h=400&fit=crop"
            alt="Team collaboration"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      <footer className="playbook-section__footer">
        <p className="playbook-section__footer-text">KONATIVE ARCHITECTURE TECH</p>
      </footer>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SEGMENTS SECTION - Customer segments
   ═══════════════════════════════════════════════════════════════════════════ */
function SegmentsSection() {
  const segments = [
    {
      number: '01',
      title: 'INSTITUTIONAL INVESTORS',
      subtitle: 'INSTITUTIONAL INVESTOR DESIGN PLAY',
      description: 'Strategic portfolio development for infrastructure-focused capital allocators seeking deployment-ready opportunities.',
      link: '/market-intel',
    },
    {
      number: '02',
      title: 'ENTERPRISE AI PLATFORMS',
      subtitle: 'AI INFRASTRUCTURE SOLUTIONS',
      description: 'Purpose-built environments for AI/ML workloads requiring high-density compute and sustainable power.',
      link: '/market-intel',
    },
    {
      number: '03',
      title: 'ENERGY & UTILITY COMPANIES',
      subtitle: 'UTILITY INFRASTRUCTURE SERVICES',
      description: 'Infrastructure for the energy transition, from high-voltage substations to renewable power integration.',
      link: '/market-intel',
    },
  ]

  return (
    <section className="segments-section">
      <header className="segments-section__header">
        <h2 className="segments-section__headline">
          PRECISION DESIGNED FOR<br />
          THE MOST AMBITIOUS<br />
          <span className="segments-section__accent">CAPITAL VENTURES.</span>
        </h2>
      </header>

      <div className="segments-section__grid">
        <div className="segments-section__hero-image">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=1000&fit=crop"
            alt="Data center infrastructure"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="segments-section__cards">
          {segments.map((segment) => (
            <div key={segment.number} className="segments-section__card">
              <span className="segments-section__card-number">{segment.number}</span>
              <h3 className="segments-section__card-title">{segment.title}</h3>
              <span className="segments-section__card-subtitle">{segment.subtitle}</span>
              <p className="segments-section__card-description">{segment.description}</p>
              <Link href={segment.link} className="segments-section__card-link">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="segments-section__stats">
        <div className="segments-section__stat">
          <span className="segments-section__stat-value">$38+</span>
          <span className="segments-section__stat-label">BILLION IN PROJECTS</span>
        </div>
        <div className="segments-section__stat">
          <span className="segments-section__stat-value">$4.2B</span>
          <span className="segments-section__stat-label">ACTIVE PIPELINE</span>
        </div>
        <div className="segments-section__stat">
          <span className="segments-section__stat-value">100%</span>
          <span className="segments-section__stat-label">NET-ZERO TARGETS</span>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CASE STUDIES SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function CasesSection() {
  const cases = [
    {
      number: '01',
      title: 'CRITICAL DATA DISCOVERY',
      description: 'How we identified and secured a 200MW site in the Pacific Northwest within 90 days.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    },
    {
      number: '02',
      title: 'UTILITY INFRASTRUCTURE NAVIGATE',
      description: 'Navigating complex interconnection requirements to deliver 150MW of capacity ahead of schedule.',
      image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&h=400&fit=crop',
    },
    {
      number: '03',
      title: 'ENERGY & UTILITY COMPANIES',
      description: 'Partnering with utility providers to unlock stranded renewable energy assets.',
      image: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=600&h=400&fit=crop',
    },
  ]

  return (
    <section className="cases-section">
      <header className="cases-section__header">
        <span className="cases-section__eyebrow">KONATIVE</span>
        <h2 className="cases-section__headline">
          From Stalled to<br />Deployed.
        </h2>
      </header>

      <div className="cases-section__grid">
        {cases.map((caseStudy) => (
          <div key={caseStudy.number} className="cases-section__card">
            <div className="cases-section__card-image">
              <Image
                src={caseStudy.image}
                alt={caseStudy.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <span className="cases-section__card-number">{caseStudy.number}</span>
            <h3 className="cases-section__card-title">{caseStudy.title}</h3>
            <p className="cases-section__card-description">{caseStudy.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FINAL CTA SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="final-cta__container">
        <span className="final-cta__eyebrow">KONATIVE ARCHITECTURE</span>
        <h2 className="final-cta__headline">
          Ready to deploy infrastructure<br />at the speed of demand?
        </h2>
        <p className="final-cta__description">
          Whether you are deploying your first data center or scaling an existing portfolio, 
          our team is ready to architect your path to operational reality.
        </p>
        <div className="final-cta__actions">
          <Link href="/contact" className="btn btn--primary">
            Start a Conversation
          </Link>
          <Link href="/assessment" className="btn btn--outline">
            Explore the Playbook
          </Link>
        </div>

        <div className="final-cta__stats">
          <div className="final-cta__stat">
            <span className="final-cta__stat-value">1.2 GW</span>
            <span className="final-cta__stat-label">Capacity Secured</span>
          </div>
          <div className="final-cta__stat">
            <span className="final-cta__stat-value">12-18 mo</span>
            <span className="final-cta__stat-label">Accelerated Timelines</span>
          </div>
          <div className="final-cta__stat">
            <span className="final-cta__stat-value">100%</span>
            <span className="final-cta__stat-label">Net-Zero Commitment</span>
          </div>
        </div>
      </div>
    </section>
  )
}
