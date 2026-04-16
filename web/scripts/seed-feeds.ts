import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tcbworxmlmxoyzcvdjhh.supabase.co'
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYndvcnhtbG14b3l6Y3ZkamhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyODczMTksImV4cCI6MjA5MTg2MzMxOX0.bAU-JCOSEH5RuJZcpDR5WTSU7zTjOEQ4sn6kaY8UIYg'

const supabase = createClient(supabaseUrl, supabaseKey)

const feeds = [
  {
    name: 'Data Center Frontier',
    url: 'https://www.datacenterfrontier.com/rss.xml',
    source_type: 'rss',
    is_active: true,
  },
  {
    name: 'Utility Dive',
    url: 'https://www.utilitydive.com/feeds/news/',
    source_type: 'rss',
    is_active: true,
  },
  {
    name: 'Data Center Knowledge',
    url: 'https://www.datacenterknowledge.com/rss.xml',
    source_type: 'rss',
    is_active: true,
  },
  {
    name: 'The Register',
    url: 'https://www.theregister.com/data_centre/headlines.atom',
    source_type: 'atom',
    is_active: true,
  },
  {
    name: 'Capacity Media',
    url: 'https://www.capacitymedia.com/rss',
    source_type: 'rss',
    is_active: true,
  },
]

async function main() {
  console.log('Seeding feed sources...')
  const { data, error } = await supabase.from('feed_sources').upsert(feeds, {
    onConflict: 'url',
  })
  if (error) {
    console.error('Error seeding feeds:', error)
    process.exit(1)
  }
  console.log('Seeded', feeds.length, 'feed sources')
}

main()
