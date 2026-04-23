'use client'

const members = [
  {
    name: 'Jeramey James',
    role: 'Founder & Principal',
    bio: 'Former CIO turned Gartner advisor. Solutions architect and infrastructure operations background spanning ISP, tribal enterprise, and enterprise consulting. Brings the technical depth and boardroom credibility to get deals done.',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
    linkedin: 'https://www.linkedin.com/in/jerameyjames/',
  },
  {
    name: 'Scott Swartzbaugh',
    role: 'Partner — Supply Chain & Procurement',
    bio: "20+ years building high-performance supply chains and strategic supplier partnerships. The person who knows what's available, what's on lead time, and how to move equipment when everyone else is waiting.",
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    linkedin: 'https://www.linkedin.com/in/scott-swartzbaugh-ab156b1/',
  },
  {
    name: 'Jerry Borlin',
    role: 'Partner — Relationships & Deal Creation',
    bio: 'Enterprise deal closer with a career record of winning the most complex, highest-stakes engagements. Genuine, proactive, and the kind of partner who shows up before you ask. He builds the relationships that open the rooms.',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80',
    linkedin: 'https://www.linkedin.com/in/jerryborlin/',
  },
]

export default function TeamSection() {
  return (
    <section id="team" style={{ background: '#0C2046', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 48px' }}>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          fontFamily: 'Inter, sans-serif', fontWeight: 600,
          fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
          color: '#E07B39', marginBottom: 20,
        }}>
          <span style={{ display: 'block', width: 28, height: 1, background: '#E07B39' }} />
          The Team
        </div>

        <h2 style={{
          fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800,
          fontSize: 'clamp(44px, 5.5vw, 80px)', lineHeight: 0.9,
          textTransform: 'uppercase', letterSpacing: '0.01em',
          color: '#fff', marginBottom: 60,
        }}>
          TOP TALENT.<br /><span style={{ color: '#E07B39' }}>REAL EXPERIENCE.</span>
        </h2>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1, background: 'rgba(255,255,255,0.08)',
        }}>
          {members.map((member, i) => (
            <div key={i} style={{ background: '#0C2046', overflow: 'hidden' }}>
              <div style={{
                height: 260, position: 'relative',
                backgroundImage: `url('${member.photo}')`,
                backgroundSize: 'cover', backgroundPosition: 'center top',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(12,32,70,0.92) 100%)',
                }} />
              </div>
              <div style={{ padding: '28px 32px 36px' }}>
                <div style={{
                  fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700,
                  fontSize: 28, textTransform: 'uppercase', color: '#fff',
                  marginBottom: 4, lineHeight: 1,
                }}>
                  {member.name}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 600,
                  fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: '#F0A050', marginBottom: 14,
                }}>
                  {member.role}
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13,
                  lineHeight: 1.7, color: 'rgba(255,255,255,0.45)',
                }}>
                  {member.bio}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block', marginTop: 16,
                    fontFamily: 'Inter, sans-serif', fontWeight: 600,
                    fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)', textDecoration: 'none',
                  }}
                >
                  LinkedIn →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 1,
          background: 'rgba(255,255,255,0.02)',
          border: '1px dashed rgba(255,255,255,0.08)',
          padding: '32px 40px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13,
            color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em',
          }}>
            More advisors and partners joining the team
          </span>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 11,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(224,123,57,0.35)',
          }}>
            Expanding 2026
          </span>
        </div>

      </div>
    </section>
  )
}
