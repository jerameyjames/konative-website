'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Connective Tissue */}
      <HeroSection />
      
      {/* Infrastructure Crisis Section */}
      <InfrastructureCrisisSection />
      
      {/* Problem Deep Dive Section */}
      <ProblemDeepDiveSection />
      
      {/* Playbook Timeline Section */}
      <PlaybookSection />
      
      {/* Customer Segments Section */}
      <CustomerSegmentsSection />
      
      {/* Case Studies Section */}
      <CaseStudiesSection />
      
      {/* Final CTA */}
      <FinalCTASection />
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION - "Konative is the Connective Tissue"
   ═══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="hero-tissue">
      <div className="hero-tissue__container">
        <div className="hero-tissue__content">
          <p className="hero-tissue__eyebrow">KONATIVE PRECISION</p>
          <h1 className="hero-tissue__headline">
            Konative is the{' '}
            <span className="hero-tissue__accent">Connective Tissue</span>
          </h1>
          <p className="hero-tissue__description">
            Not advisors. Not contractors. Not brokers. We are the people who orchestrate capital, land, power, and talent into deployable infrastructure—on a timeline that actually works.
          </p>
          <div className="hero-tissue__actions">
            <Link href="/contact" className="btn btn--primary">
              Start a Conversation
            </Link>
            <Link href="/assessment" className="btn btn--outline">
              View Our Process
            </Link>
          </div>
        </div>
        
        <aside className="hero-tissue__sidebar">
          <div className="hero-tissue__sidebar-card">
            <p className="hero-tissue__sidebar-text">
              We architect the path from concept to commissioned facility—coordinating every stakeholder, timeline, and technical requirement.
            </p>
            <Link href="/contact" className="hero-tissue__sidebar-link">
              Contact <span aria-hidden="true">→</span>
            </Link>
          </div>
        </aside>
      </div>
      
      {/* Stats Row */}
      <div className="hero-tissue__stats">
        <div className="hero-tissue__stat">
          <span className="hero-tissue__stat-label">Strategic Sourcing</span>
        </div>
        <div className="hero-tissue__stat hero-tissue__stat--highlight">
          <span className="hero-tissue__stat-value">1.2 GW</span>
          <span className="hero-tissue__stat-label">Secured</span>
        </div>
        <div className="hero-tissue__stat">
          <span className="hero-tissue__stat-label">Turnkey Execution</span>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   INFRASTRUCTURE CRISIS SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function InfrastructureCrisisSection() {
  return (
    <section className="crisis-section">
      {/* Hero Image with Overlay Text */}
      <div className="crisis-section__hero">
        <div className="crisis-section__hero-image">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=900&fit=crop"
            alt="Data center corridor with server racks"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="crisis-section__hero-overlay" />
        </div>
        <div className="crisis-section__hero-content">
          <h2 className="crisis-section__hero-headline">
            <span className="crisis-section__hero-small">THE</span>
            <span className="crisis-section__hero-large">INFRASTRUCTURE</span>
            <span className="crisis-section__hero-accent">CRISIS</span>
            <span className="crisis-section__hero-small">NOBODY TALKS</span>
            <span className="crisis-section__hero-large">ABOUT</span>
          </h2>
          <div className="crisis-section__hero-sidebar">
            <p className="crisis-section__hero-label">The Bottleneck Effect</p>
            <p className="crisis-section__hero-text">
              Power interconnection queues stretch 2-4 years. Transformers are backordered 4+ years. The infrastructure gap is widening.
            </p>
          </div>
        </div>
      </div>
      
      {/* Stats and Content Row */}
      <div className="crisis-section__content">
        <div className="crisis-section__grid">
          {/* Left Column - Stats */}
          <div className="crisis-section__stats">
            <div className="crisis-section__stat-card">
              <span className="crisis-section__stat-value">1.2 GW</span>
              <span className="crisis-section__stat-label">Capacity Secured</span>
              <Link href="/deals" className="crisis-section__stat-link">
                ALL DETAILS <span aria-hidden="true">→</span>
              </Link>
            </div>
            
            <div className="crisis-section__image-card">
              <Image
                src="https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&h=400&fit=crop"
                alt="Data center infrastructure"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          
          {/* Right Column - Technical Standard */}
          <div className="crisis-section__technical">
            <div className="crisis-section__technical-header">
              <span className="crisis-section__technical-eyebrow">THE</span>
              <h3 className="crisis-section__technical-title">TECHNICAL STANDARD</h3>
            </div>
            <p className="crisis-section__technical-text">
              Every engagement follows our proprietary methodology—developed through years of navigating the most complex infrastructure deployments in North America.
            </p>
            <ul className="crisis-section__technical-list">
              <li>Site Selection & Due Diligence</li>
              <li>Power Interconnection Strategy</li>
              <li>Connectivity Architecture</li>
              <li>Capital Stack Optimization</li>
            </ul>
            
            <div className="crisis-section__technical-image">
              <Image
                src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=800&h=500&fit=crop"
                alt="Server room with blue lighting"
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
   PROBLEM DEEP DIVE - "Why 12-18 Months Instead of 24+?"
   ═══════════════════════════════════════════════════════════════════════════ */
function ProblemDeepDiveSection() {
  return (
    <section className="problem-section">
      {/* Hero */}
      <div className="problem-section__hero">
        <div className="problem-section__hero-image">
          <Image
            src="https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?w=1600&h=900&fit=crop"
            alt="Modern data center facility"
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
            The traditional data center development timeline is broken. We synchronize the critical paths of expertise, location, capital, and critical infrastructure to cut timelines dramatically.
          </p>
        </div>
      </div>
      
      {/* Pillars Grid */}
      <div className="problem-section__pillars">
        <div className="problem-section__pillar">
          <div className="problem-section__pillar-image">
            <Image
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop"
              alt="Supply chain management"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h3 className="problem-section__pillar-title">SUPPLY CHAIN</h3>
        </div>
        <div className="problem-section__pillar">
          <div className="problem-section__pillar-image">
            <Image
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop"
              alt="Stakeholder meeting"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h3 className="problem-section__pillar-title">STAKEHOLDERS</h3>
        </div>
        <div className="problem-section__pillar">
          <div className="problem-section__pillar-image">
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
              alt="Timeline planning"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h3 className="problem-section__pillar-title">TIMELINE</h3>
        </div>
        
        {/* Stats overlay */}
        <div className="problem-section__stats">
          <div className="problem-section__stat">
            <span className="problem-section__stat-value">1.5</span>
            <span className="problem-section__stat-label">Years Avg. Saved</span>
          </div>
          <div className="problem-section__stat">
            <span className="problem-section__stat-value">2.4x</span>
            <span className="problem-section__stat-label">Faster to Operation</span>
          </div>
        </div>
      </div>
      
      {/* Integrated Systems Architecture */}
      <div className="problem-section__systems">
        <div className="problem-section__systems-content">
          <h3 className="problem-section__systems-title">
            Integrated Systems<br />Architecture
          </h3>
          <p className="problem-section__systems-text">
            Despite the complexity of bringing datacenter projects to life, we simplify by orchestrating every moving part through a single coordination layer.
          </p>
          <Link href="/assessment" className="btn btn--primary">
            PHASE 1.0
          </Link>
        </div>
        <div className="problem-section__systems-image">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop"
            alt="Data center server room"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      
      {/* CTA Banner */}
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
   PLAYBOOK TIMELINE SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function PlaybookSection() {
  const phases = [
    {
      id: 'qualification',
      title: 'QUALIFICATION',
      description: 'We assess your project parameters, market position, and strategic objectives to determine fit and scope.',
      image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=600&h=800&fit=crop',
    },
    {
      id: 'de-risking',
      title: 'DE-RISKING',
      description: 'Systematic identification and mitigation of technical, regulatory, and financial risks across all project dimensions.',
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&h=800&fit=crop',
    },
    {
      id: 'execution',
      title: 'EXECUTION',
      description: 'Full coordination of construction, commissioning, and operational readiness with all stakeholders aligned.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=800&fit=crop',
    },
  ]

  return (
    <section className="playbook-section">
      <div className="playbook-section__header">
        <span className="playbook-section__eyebrow">THE KONATIVE PLAYBOOK</span>
        <div className="playbook-section__hero-image">
          <Image
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=600&fit=crop"
            alt="Technology infrastructure"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      
      <div className="playbook-section__phases">
        {phases.map((phase, index) => (
          <div key={phase.id} className="playbook-section__phase">
            <div className="playbook-section__phase-image">
              <Image
                src={phase.image}
                alt={phase.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="playbook-section__phase-content">
              <span className="playbook-section__phase-number">0{index + 1}</span>
              <h3 className="playbook-section__phase-title">{phase.title}</h3>
              <p className="playbook-section__phase-description">{phase.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="playbook-section__cta">
        <h3 className="playbook-section__cta-headline">
          READY TO ARCHITECT YOUR <span className="playbook-section__cta-accent">NEXT PROJECT?</span>
        </h3>
        <div className="playbook-section__cta-actions">
          <Link href="/assessment" className="btn btn--outline">
            Download Our Playbook
          </Link>
          <Link href="/contact" className="btn btn--outline">
            Schedule With An Architect
          </Link>
        </div>
        <div className="playbook-section__cta-image">
          <Image
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&h=400&fit=crop"
            alt="Modern office building"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      
      <div className="playbook-section__footer">
        <p className="playbook-section__footer-text">KONATIVE ARCHITECTURAL TECH</p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CUSTOMER SEGMENTS SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function CustomerSegmentsSection() {
  const segments = [
    {
      number: '01',
      title: 'INSTITUTIONAL INVESTORS',
      subtitle: 'INSTITUTIONAL INVESTOR DESIGN PLAY',
      description: 'Strategic advisory for institutional capital deploying into digital infrastructure. We architect the path from investment thesis to operational asset.',
      link: '/contact',
    },
    {
      number: '02',
      title: 'ENTERPRISE AI PLATFORMS',
      subtitle: 'UTILITY INFRASTRUCTURE DIVISION',
      description: 'Purpose-built infrastructure solutions for AI/ML workloads. From power requirements to cooling architecture, we design for compute density.',
      link: '/contact',
    },
    {
      number: '03',
      title: 'ENERGY & UTILITY COMPANIES',
      subtitle: '',
      description: 'Infrastructure strategy for energy transition. We help utilities monetize stranded assets and navigate the intersection of power and compute.',
      link: '/contact',
    },
  ]

  return (
    <section className="segments-section">
      <div className="segments-section__header">
        <h2 className="segments-section__headline">
          PRECISION DESIGNED FOR<br />
          THE MOST AMBITIOUS<br />
          <span className="segments-section__accent">CAPITAL VENTURES.</span>
        </h2>
      </div>
      
      <div className="segments-section__grid">
        {/* Hero Image */}
        <div className="segments-section__hero-image">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=1000&fit=crop"
            alt="Modern building architecture"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        
        {/* Segment Cards */}
        <div className="segments-section__cards">
          {segments.map((segment) => (
            <div key={segment.number} className="segments-section__card">
              <span className="segments-section__card-number">{segment.number}</span>
              <h3 className="segments-section__card-title">{segment.title}</h3>
              {segment.subtitle && (
                <p className="segments-section__card-subtitle">{segment.subtitle}</p>
              )}
              <p className="segments-section__card-description">{segment.description}</p>
              <Link href={segment.link} className="segments-section__card-link">
                Learn More <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* Stats Footer */}
      <div className="segments-section__stats">
        <div className="segments-section__stat">
          <span className="segments-section__stat-value">$3B+</span>
          <span className="segments-section__stat-label">Capital Advised</span>
        </div>
        <div className="segments-section__stat">
          <span className="segments-section__stat-value">$4.2B</span>
          <span className="segments-section__stat-label">Project Value</span>
        </div>
        <div className="segments-section__stat">
          <span className="segments-section__stat-value">100%</span>
          <span className="segments-section__stat-label">NET-ZERO Target</span>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CASE STUDIES SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function CaseStudiesSection() {
  const caseStudies = [
    {
      number: '01',
      title: 'From Stalled to Deployed',
      description: 'A 50MW project stuck in interconnection limbo. We restructured the power strategy, secured alternative pathways, and achieved COD 18 months ahead of revised timeline.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
    },
    {
      number: '02',
      title: 'Tribal Partnership Model',
      description: 'Pioneered a new framework for Indigenous data center development, unlocking sovereign advantages while ensuring community benefit and operational excellence.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop',
    },
    {
      number: '03',
      title: 'AI Compute Campus',
      description: 'Designed and delivered a purpose-built AI training facility with 200MW of power capacity, liquid cooling infrastructure, and direct fiber to major cloud regions.',
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&h=500&fit=crop',
    },
  ]

  return (
    <section className="cases-section">
      <div className="cases-section__header">
        <span className="cases-section__eyebrow">Konative</span>
        <h2 className="cases-section__headline">
          From Stalled to<br />Deployed.
        </h2>
      </div>
      
      <div className="cases-section__grid">
        {caseStudies.map((study) => (
          <article key={study.number} className="cases-section__card">
            <div className="cases-section__card-image">
              <Image
                src={study.image}
                alt={study.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="cases-section__card-content">
              <span className="cases-section__card-number">{study.number}</span>
              <h3 className="cases-section__card-title">{study.title}</h3>
              <p className="cases-section__card-description">{study.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FINAL CTA SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function FinalCTASection() {
  return (
    <section className="final-cta">
      <div className="final-cta__container">
        <span className="final-cta__eyebrow">KONATIVE</span>
        <h2 className="final-cta__headline">
          Your project deserves architecture,<br />
          not just advice.
        </h2>
        <p className="final-cta__description">
          We bring the precision, relationships, and execution capability that transforms ambitious projects into operational infrastructure.
        </p>
        <div className="final-cta__actions">
          <Link href="/contact" className="btn btn--primary">
            Start a Conversation
          </Link>
          <Link href="/assessment" className="btn btn--outline">
            Take the Assessment
          </Link>
        </div>
        
        <div className="final-cta__stats">
          <div className="final-cta__stat">
            <span className="final-cta__stat-value">99.4%</span>
            <span className="final-cta__stat-label">On-Time Delivery</span>
          </div>
          <div className="final-cta__stat">
            <span className="final-cta__stat-value">$4.2B</span>
            <span className="final-cta__stat-label">Project Value</span>
          </div>
          <div className="final-cta__stat">
            <span className="final-cta__stat-value">NET-ZERO</span>
            <span className="final-cta__stat-label">Committed</span>
          </div>
        </div>
      </div>
    </section>
  )
}
