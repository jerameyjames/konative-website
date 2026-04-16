'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import NewsletterSignup from '@/components/NewsletterSignup'

const rotatingWords = ['Modular Data Centers', 'Investment Groups', 'Tribal Nations']

interface Article {
  id: string
  title: string
  summary: string
  url: string
  source_name: string
  category: string
  published_at: string
}

interface Deal {
  id: string
  entity_name: string
  deal_type: string
  deal_value_usd: number | null
  summary: string
}

function formatCurrency(val: number | null): string {
  if (val == null) return 'Undisclosed'
  if (val >= 1_000_000_000) return `$${(val / 1_000_000_000).toFixed(1)}B`
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(0)}M`
  return `$${val.toLocaleString()}`
}

export default function HomePage() {
  const [wordIndex, setWordIndex] = useState(0)
  const [articles, setArticles] = useState<Article[]>([])
  const [deals, setDeals] = useState<Deal[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      'https://tcbworxmlmxoyzcvdjhh.supabase.co'
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYndvcnhtbG14b3l6Y3ZkamhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyODczMTksImV4cCI6MjA5MTg2MzMxOX0.bAU-JCOSEH5RuJZcpDR5WTSU7zTjOEQ4sn6kaY8UIYg'

    const headers = {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    }

    fetch(
      `${supabaseUrl}/rest/v1/market_intel_articles?select=id,title,summary,url,source_name,category,published_at&is_published=eq.true&order=published_at.desc&limit=3`,
      { headers },
    )
      .then((r) => r.json())
      .then((data) => setArticles(Array.isArray(data) ? data : []))
      .catch(() => {})

    fetch(
      `${supabaseUrl}/rest/v1/investment_deals?select=id,entity_name,deal_type,deal_value_usd,summary&order=deal_value_usd.desc.nullslast&limit=3`,
      { headers },
    )
      .then((r) => r.json())
      .then((data) => setDeals(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  const categoryLabels: Record<string, string> = {
    power_grid: 'Power / Grid',
    investment_ma: 'Investment / M&A',
    modular_build: 'Modular Build',
    tribal_indigenous: 'Tribal / Indigenous',
    saudi_gulf: 'Saudi / Gulf',
    supply_chain: 'Supply Chain',
    industry_news: 'Industry News',
    regulatory: 'Regulatory',
  }

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
                background:
                  'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover, #0f766e))',
              }}
            />
          </div>
        </div>
      </section>

      {/* Latest Intelligence */}
      {articles.length > 0 && (
        <section className="home-intel">
          <div className="home-intel__inner">
            <h2 className="home-intel__title">Latest Intelligence</h2>
            <div className="home-intel__grid">
              {articles.map((article) => (
                <article key={article.id} className="home-intel__card">
                  <span className="home-intel__badge">
                    {categoryLabels[article.category] || article.category}
                  </span>
                  <h3 className="home-intel__card-title">{article.title}</h3>
                  <p className="home-intel__card-summary">{article.summary}</p>
                  <div className="home-intel__card-footer">
                    <span className="home-intel__source">{article.source_name}</span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-intel__link"
                    >
                      Read more →
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="home-intel__view-all">
              <Link href="/market-intel" className="home-intel__view-all-link">
                View All Intelligence →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Track the Deals */}
      {deals.length > 0 && (
        <section className="home-deals">
          <div className="home-deals__inner">
            <h2 className="home-deals__title">Track the Deals</h2>
            <div className="home-deals__grid">
              {deals.map((deal) => (
                <article key={deal.id} className="home-deals__card">
                  <h3 className="home-deals__card-title">{deal.entity_name}</h3>
                  <span className="home-deals__card-type">{deal.deal_type}</span>
                  <span className="home-deals__card-value">
                    {formatCurrency(deal.deal_value_usd)}
                  </span>
                  <p className="home-deals__card-summary">{deal.summary}</p>
                </article>
              ))}
            </div>
            <div className="home-deals__view-all">
              <Link href="/deals" className="home-deals__view-all-link">
                View All Deals →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <NewsletterSignup variant="banner" source="homepage" />

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
