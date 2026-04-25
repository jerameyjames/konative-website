import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export interface ExtractedProject {
  name: string
  operator?: string
  city?: string
  state?: string
  country: 'US' | 'CA'
  status: 'operational' | 'construction' | 'announced'
  capacityMw?: number
  confidence: number
}

const SYSTEM_PROMPT = `You extract structured data center project information from news articles.

Return JSON: { "projects": [...] } where each project has:
- name (required, string): the project or campus name
- operator (optional, string): the developer/operator
- city, state (optional, strings): location
- country: "US" or "CA"
- status: "operational" | "construction" | "announced"
- capacityMw (optional, number): power capacity in MW
- confidence: 0-1 — how confident you are this is an actual data center project (not speculation)

Rules:
- Only extract concrete projects with at least name + country + status
- Skip speculation or general industry trends
- Skip projects outside US or Canada
- If multiple projects mentioned, return all
- If no projects, return { "projects": [] }
- Return ONLY valid JSON, no markdown fences`

export async function extractProjects(article: {
  title: string
  summary?: string
  url: string
}): Promise<ExtractedProject[]> {
  const userMsg = `Title: ${article.title}\n\nSummary: ${article.summary || '(no summary)'}\n\nURL: ${article.url}`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMsg }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const parsed = JSON.parse(text)
    return parsed.projects || []
  } catch (err) {
    console.error('Extraction error for', article.url, err)
    return []
  }
}
