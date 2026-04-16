import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tcbworxmlmxoyzcvdjhh.supabase.co'
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYndvcnhtbG14b3l6Y3ZkamhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyODczMTksImV4cCI6MjA5MTg2MzMxOX0.bAU-JCOSEH5RuJZcpDR5WTSU7zTjOEQ4sn6kaY8UIYg'

const supabase = createClient(supabaseUrl, supabaseKey)

const sponsors = [
  {
    sponsor_name: 'Vertiv',
    tagline: 'Critical digital infrastructure and continuity solutions.',
    target_url: 'https://www.vertiv.com',
    slot_type: 'banner',
    is_active: true,
    start_date: '2024-01-01',
    end_date: '2026-12-31',
    impressions: 0,
    clicks: 0,
  },
  {
    sponsor_name: 'Schneider Electric',
    tagline: 'Powering the data centers of tomorrow.',
    target_url: 'https://www.se.com',
    slot_type: 'card',
    is_active: true,
    start_date: '2024-01-01',
    end_date: '2026-12-31',
    impressions: 0,
    clicks: 0,
  },
  {
    sponsor_name: 'Eaton',
    tagline: 'Intelligent power management for the digital age.',
    target_url: 'https://www.eaton.com',
    slot_type: 'banner',
    is_active: true,
    start_date: '2024-01-01',
    end_date: '2026-12-31',
    impressions: 0,
    clicks: 0,
  },
]

async function main() {
  console.log('Seeding sponsorship placements...')
  const { error } = await supabase.from('sponsorship_placements').insert(sponsors)
  if (error) {
    console.error('Error seeding sponsors:', error)
    process.exit(1)
  }
  console.log('Seeded', sponsors.length, 'sponsor placements')
}

main()
