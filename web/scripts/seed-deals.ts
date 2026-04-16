import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tcbworxmlmxoyzcvdjhh.supabase.co'
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYndvcnhtbG14b3l6Y3ZkamhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyODczMTksImV4cCI6MjA5MTg2MzMxOX0.bAU-JCOSEH5RuJZcpDR5WTSU7zTjOEQ4sn6kaY8UIYg'

const supabase = createClient(supabaseUrl, supabaseKey)

const deals = [
  {
    entity_name: 'HUMAIN / PIF',
    deal_type: 'Joint Venture',
    deal_value_usd: 1900000000,
    status: 'announced',
    category: 'saudi_gulf',
    power_capacity_mw: 1900,
    partner_companies: ['Public Investment Fund', 'HUMAIN'],
    summary: 'Saudi AI infrastructure platform targeting 1.9GW of data center capacity.',
  },
  {
    entity_name: 'MGX / Aligned Data Centers',
    deal_type: 'Acquisition',
    deal_value_usd: 40000000000,
    status: 'announced',
    category: 'investment_ma',
    power_capacity_mw: 5000,
    partner_companies: ['MGX', 'Aligned Data Centers'],
    summary: 'Landmark $40B deal for 5GW hyperscale data center portfolio.',
  },
  {
    entity_name: 'G42 / Abu Dhabi',
    deal_type: 'Investment',
    deal_value_usd: 1500000000,
    status: 'active',
    category: 'saudi_gulf',
    power_capacity_mw: null,
    partner_companies: ['G42'],
    summary: 'Abu Dhabi AI fund investing in global data center infrastructure.',
  },
  {
    entity_name: 'QIA / Brookfield',
    deal_type: 'Joint Venture',
    deal_value_usd: 20000000000,
    status: 'announced',
    category: 'investment_ma',
    power_capacity_mw: null,
    partner_companies: ['Qatar Investment Authority', 'Brookfield'],
    summary: 'Sovereign wealth fund partnership for global data center expansion.',
  },
  {
    entity_name: 'DataVolt',
    deal_type: 'Development',
    deal_value_usd: null,
    status: 'active',
    category: 'modular_build',
    power_capacity_mw: null,
    partner_companies: ['DataVolt'],
    summary: 'Multi-GW sustainable data center pipeline with renewable energy focus.',
  },
]

async function main() {
  console.log('Seeding investment deals...')
  const { error } = await supabase.from('investment_deals').insert(deals)
  if (error) {
    console.error('Error seeding deals:', error)
    process.exit(1)
  }
  console.log('Seeded', deals.length, 'investment deals')
}

main()
