'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <StatsSection />
      <CTASection />
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION - Rotating words like Kimley-Horn
   ═══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const words = ['PRECISION', 'VELOCITY', 'INFRASTRUCTURE', 'EXECUTION']
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <section className="kh-hero">
      <div className="kh-hero__container">
        <p className="kh-hero__expect">Expect More</p>
        <div className="kh-hero__words">
          {words.map((word, index) => (
            <span
              key={word}
              className={`kh-hero__word ${index === currentIndex ? 'kh-hero__word--active' : ''}`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   INTRO SECTION - Company description
   ═══════════════════════════════════════════════════════════════════════════ */
function IntroSection() {
  return (
    <section className="kh-intro">
      <div className="kh-intro__container">
        <h2 className="kh-intro__headline">
          Simply a better experience. We are Konative.
        </h2>
        <p className="kh-intro__text">
          We don&apos;t just advise on data center development, we orchestrate it. Our strategic teams 
          have partnered with institutional investors, hyperscalers, and energy companies to transform 
          complex infrastructure challenges into operational reality since 2019. Experience a new 
          standard in data center development, where precision meets execution and every project 
          exceeds expectations.
        </p>
        <p className="kh-intro__subtext">
          With Konative, clients can expect more and deploy faster.
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SERVICES SECTION - Three column cards
   ═══════════════════════════════════════════════════════════════════════════ */
function ServicesSection() {
  const services = [
    {
      title: 'Our Process',
      description: 'We architect the path from concept to commissioned facility—synchronizing capital, land, power, and talent on timelines that actually work.',
      link: '/assessment',
      linkText: 'EXPLORE OUR PROCESS',
    },
    {
      title: 'Our Services',
      description: 'From site selection to power interconnection, our integrated approach delivers support for projects of all scales. Enjoy specialized expertise with national reach.',
      link: '/market-intel',
      linkText: 'LEARN ABOUT OUR SERVICES',
    },
    {
      title: 'Our Team',
      description: 'We believe in pioneering the next generation of digital infrastructure—and that starts with our team. Our partners are defining the solutions of tomorrow.',
      link: '/contact',
      linkText: 'MEET OUR TEAM',
    },
  ]

  return (
    <section className="kh-services">
      <div className="kh-services__container">
        {services.map((service) => (
          <div key={service.title} className="kh-services__card">
            <h3 className="kh-services__title">{service.title}</h3>
            <div className="kh-services__divider" />
            <p className="kh-services__description">{service.description}</p>
            <Link href={service.link} className="kh-services__link">
              {service.linkText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   ABOUT SECTION - Why Konative
   ═══════════════════════════════════════════════════════════════════════════ */
function AboutSection() {
  return (
    <section className="kh-about">
      <div className="kh-about__container">
        <div className="kh-about__content">
          <h2 className="kh-about__headline">About Us: Why Konative?</h2>
          <p className="kh-about__text">
            At Konative, we lead with precision and purpose. Whether you&apos;re an institutional 
            investor or an enterprise deploying AI infrastructure, you&apos;ll feel the difference 
            in how we work—because your timeline is our priority.
          </p>
        </div>
        <div className="kh-about__culture">
          <h3 className="kh-about__culture-headline">
            Our Approach: We build infrastructure that powers the future.
          </h3>
          <p className="kh-about__culture-text">
            Come see why leading capital allocators trust us with their most ambitious projects.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECTS SECTION - Featured work
   ═══════════════════════════════════════════════════════════════════════════ */
function ProjectsSection() {
  const projects = [
    {
      location: 'Southwest US',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
      link: '/deals',
    },
    {
      location: 'Pacific Northwest',
      image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800&h=600&fit=crop',
      link: '/deals',
    },
    {
      location: 'Mountain West',
      image: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=800&h=600&fit=crop',
      link: '/deals',
    },
    {
      location: 'Texas Triangle',
      image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800&h=600&fit=crop',
      link: '/deals',
    },
    {
      location: 'Southeast Region',
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&h=600&fit=crop',
      link: '/deals',
    },
  ]

  return (
    <section className="kh-projects">
      <div className="kh-projects__header">
        <h2 className="kh-projects__headline">
          Inspired work begins with ambitious clients.
        </h2>
      </div>
      <div className="kh-projects__grid">
        {projects.map((project, index) => (
          <Link key={index} href={project.link} className="kh-projects__card">
            <div className="kh-projects__image">
              <Image
                src={project.image}
                alt={`Project in ${project.location}`}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="kh-projects__overlay" />
            </div>
            <div className="kh-projects__info">
              <span className="kh-projects__location">{project.location}</span>
              <span className="kh-projects__link-text">LEARN MORE</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS SECTION - Key metrics
   ═══════════════════════════════════════════════════════════════════════════ */
function StatsSection() {
  return (
    <section className="kh-stats">
      <div className="kh-stats__container">
        <div className="kh-stats__content">
          <blockquote className="kh-stats__quote">
            &ldquo;Konative transformed what we thought was impossible into an operational 
            reality—18 months ahead of our original timeline.&rdquo;
          </blockquote>
          <p className="kh-stats__attribution">
            Infrastructure Investment Partner, Major PE Firm
          </p>
        </div>
        <div className="kh-stats__metric">
          <span className="kh-stats__number">1.2 GW</span>
          <div className="kh-stats__divider" />
          <p className="kh-stats__description">
            With over 1.2 gigawatts of capacity secured across strategic markets, 
            we can support any project, any scale, anywhere.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA SECTION - Final call to action
   ═══════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="kh-cta">
      <div className="kh-cta__container">
        <h2 className="kh-cta__headline">Ready to accelerate your infrastructure vision?</h2>
        <p className="kh-cta__text">
          Whether you&apos;re deploying your first data center or scaling an existing portfolio, 
          our team is ready to architect your path to operational reality.
        </p>
        <div className="kh-cta__actions">
          <Link href="/contact" className="kh-cta__btn kh-cta__btn--primary">
            Start a Conversation
          </Link>
          <Link href="/assessment" className="kh-cta__btn kh-cta__btn--outline">
            View Our Process
          </Link>
        </div>
      </div>
    </section>
  )
}
