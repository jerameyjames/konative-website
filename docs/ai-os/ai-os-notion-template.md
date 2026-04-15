# AI OS — Business Scaling Operating System
## Notion Template & Implementation Guide

> **For:** Tolowa Studio Incubator — Jake & Katrina Jones
> **Version:** 1.0 — April 15, 2026
> **System Tools:** Claude Desktop (Chat / Agentic / Code), Notion, Obsidian

---

## What This Is

AI OS is a structured operating system inside Notion that takes any business project from raw idea to live, revenue-generating execution. It is not a template to look at — it is a system to operate inside of every day. Every project, every site, every business decision flows through this system.

The AI OS combines three proven frameworks with a custom execution layer:

| Framework | Role in AI OS | When Invoked |
|---|---|---|
| **Garry Tan's GStack /office-hours** | Idea validation — forces founder-level clarity on problem, user, market, unfair advantage | Before committing to any new project |
| **Addy Osmani's 7 Steps** | Technical architecture and execution planning — structured decomposition of complex builds | After validation, before building |
| **Liam Ottley's AAA Business OS** | Business operations, sales systems, delivery workflows, scaling playbooks | Ongoing operations and client delivery |
| **WebOS (custom)** | Website production system — URL-to-live-site in days using Payload CMS + Next.js | Whenever a project needs a website |

---

## Part 1: Notion Workspace Architecture

### Top-Level Structure

```
🏠 AI OS Hub (Dashboard)
│
├── 🧠 Command Center
│   ├── 📊 Active Projects Dashboard
│   ├── 📋 Weekly Sprint Board
│   └── 🎯 Quarterly OKRs
│
├── 💡 Idea Pipeline
│   ├── 📊 Ideas Database
│   ├── 📄 Office Hours Session Template
│   └── 📄 Validation Scorecard Template
│
├── 🏗️ Project Execution
│   ├── 📊 Projects Database (Master)
│   ├── 📊 Tasks Database
│   ├── 📊 Milestones Database
│   └── 📄 Project Brief Template
│
├── 🌐 WebOS — Website Production
│   ├── 📊 Site Registry Database
│   ├── 📊 Block Library Database
│   ├── 📊 Content Schema Registry
│   ├── 📄 New Site Launch Checklist
│   ├── 📄 Design Extraction Workflow
│   ├── 📄 Editor Guide Template
│   └── 📄 Handoff Playbook
│
├── 💰 Revenue & Clients
│   ├── 📊 Client Database
│   ├── 📊 Revenue Tracker
│   ├── 📊 Proposals & Contracts
│   └── 📄 Client Onboarding Template
│
├── 🤖 AI Skills Library
│   ├── 📄 /office-hours (Garry Tan — Validation)
│   ├── 📄 /7-steps (Addy Osmani — Architecture)
│   ├── 📄 /biz-os (Liam Ottley — Operations)
│   ├── 📄 /webos-launch (Custom — Website Production)
│   ├── 📄 /deploy-preflight (Custom — Deployment QA)
│   └── 📄 /content-ops (Custom — Content Operations)
│
├── 📚 Knowledge Base
│   ├── 📄 Tech Stack Decisions Log
│   ├── 📄 Design System Documentation
│   ├── 📄 Vendor & Tool Registry
│   └── 📄 Post-Mortems & Lessons Learned
│
└── ⚙️ System Config
    ├── 📄 Claude Desktop Modes Guide
    ├── 📄 Notion ↔ Obsidian Sync Protocol
    └── 📄 Environment Variables Vault
```

---

## Part 2: Database Schemas

### 2.1 Ideas Database

This is where every idea enters the system. Nothing gets built until it passes through /office-hours validation.

| Property | Type | Options / Notes |
|---|---|---|
| Idea Name | Title | Short, clear name |
| Status | Select | 💭 Raw / 🔍 Validating / ✅ Validated / 🚫 Killed / 🏗️ Promoted to Project |
| Category | Select | Website / SaaS / Service / Content / Internal Tool |
| One-Liner | Text | "For [who], we do [what] so they can [outcome]" |
| Problem Statement | Rich Text | What specific pain does this solve? |
| Target User | Text | Specific person, not a demographic |
| Revenue Model | Select | Managed Hosting / Build & Handoff / SaaS / Subscription / One-Time |
| Estimated Revenue | Number (Currency) | Monthly or one-time, label clearly |
| Office Hours Score | Number (1-10) | Assigned after running /office-hours |
| Office Hours Notes | Rich Text | Key insights from validation session |
| Reference URLs | URL | Inspiration sites or competitors |
| Created | Created Time | Auto |
| Promoted To | Relation → Projects | Links to project if promoted |

**Views:**
- **Pipeline** (Board): grouped by Status
- **Scoring** (Table): sorted by Office Hours Score descending
- **This Week** (Table): filtered by Created = this week

### 2.2 Projects Database (Master)

Every validated idea becomes a project. This is the single source of truth for all active work.

| Property | Type | Options / Notes |
|---|---|---|
| Project Name | Title | e.g., "Konative.com", "SpokaneWire", "TolowaPacific" |
| Status | Select | 📋 Planning / 🏗️ Building / 🧪 Testing / 🚀 Live / ⏸️ Paused / 📦 Archived |
| Phase | Select | Validation / Architecture / Build / Deploy / Operate / Scale |
| Type | Select | Website / Platform / Service / Internal |
| Owner | Person | Primary responsible |
| Domain | URL | If applicable |
| GitHub Repo | URL | Source code |
| Live URL | URL | Production URL |
| Admin URL | URL | CMS or admin panel |
| Notion Hub | URL | Link to project's detailed Notion page |
| Tech Stack | Multi-Select | Next.js / Payload CMS / Postgres / Vercel / GCP / n8n / etc. |
| Revenue Model | Select | Managed / Handoff / SaaS / Internal |
| Monthly Revenue | Number (Currency) | Current MRR from this project |
| Build Cost | Number (Currency) | Total investment to build |
| Launch Date | Date | Target or actual go-live |
| Related Ideas | Relation → Ideas | Origin idea |
| Related Site | Relation → Site Registry | WebOS site entry |
| Tasks | Relation → Tasks | All tasks for this project |
| Milestones | Relation → Milestones | Key milestones |
| Client | Relation → Clients | If client-owned |
| Notes | Rich Text | Running context |

**Views:**
- **Active Board** (Board): grouped by Status, filtered to exclude Archived
- **Portfolio** (Gallery): card shows domain, status, MRR
- **Revenue** (Table): sorted by Monthly Revenue, shows totals
- **Timeline** (Timeline): by Launch Date

### 2.3 Tasks Database

Granular execution tasks that live under projects.

| Property | Type | Options / Notes |
|---|---|---|
| Task | Title | Clear, actionable ("Build HeroRotating block", not "Work on hero") |
| Status | Select | ⬜ Backlog / 🔵 This Week / 🟡 In Progress / 🟢 Done / 🔴 Blocked |
| Priority | Select | 🔴 P0 — Today / 🟠 P1 — This Week / 🟡 P2 — This Sprint / ⚪ P3 — Someday |
| Project | Relation → Projects | Parent project |
| Milestone | Relation → Milestones | Parent milestone |
| Assigned To | Person | Who does this |
| Due Date | Date | Deadline |
| Claude Mode | Select | 💬 Chat / 🤖 Agentic / 💻 Code / 👤 Manual | Which Claude mode or manual |
| Skill Used | Select | /office-hours / /7-steps / /biz-os / /webos-launch / /deploy-preflight / None |
| Time Estimate | Number | Hours |
| Completed | Date | When done |
| Notes | Rich Text | Context, blockers, links |

**Views:**
- **Sprint Board** (Board): grouped by Status, filtered to This Week + In Progress
- **By Project** (Table): grouped by Project
- **Today** (List): filtered to P0 + In Progress
- **Blocked** (Table): filtered to Blocked status

### 2.4 Milestones Database

Major checkpoints within projects.

| Property | Type | Options / Notes |
|---|---|---|
| Milestone | Title | e.g., "Konative Phase 1 Live", "Block Library v1 Complete" |
| Status | Select | ⬜ Not Started / 🟡 In Progress / 🟢 Complete |
| Project | Relation → Projects | Parent project |
| Target Date | Date | When this should be done |
| Completion Date | Date | When actually done |
| Tasks | Relation → Tasks | All tasks under this milestone |
| Success Criteria | Rich Text | How do we know this is done? |
| Dependencies | Relation → Milestones | What must be done first? |

### 2.5 Site Registry Database (WebOS)

Every website in the studio portfolio.

| Property | Type | Options / Notes |
|---|---|---|
| Domain | Title | e.g., konative.com |
| Status | Select | 📋 Planning / 🏗️ Building / 🚀 Live / ⏸️ Paused / 📦 Archived |
| Deployment Mode | Select | 🏠 Studio Managed / 🤝 Client Managed / 📦 Handoff / 🔧 Internal |
| Project | Relation → Projects | Parent project |
| Client | Relation → Clients | If client-owned |
| Admin URL | URL | Payload admin panel |
| Live URL | URL | Public URL |
| Hosting | Select | Vercel / GCP / Client-Hosted |
| Tenant ID | Text | Multi-tenant identifier (future) |
| Reference URL | URL | Design inspiration source |
| Block Count | Number | Blocks used on this site |
| Monthly Revenue | Number (Currency) | Hosting/management revenue |
| Launch Date | Date | Go-live date |
| Last Updated | Date | Last content or code update |
| GitHub Repo | URL | Source code |
| Editor Guide | URL | Link to editing documentation |
| Notes | Rich Text | Site-specific context |

### 2.6 Block Library Database (WebOS)

Every reusable component in the WebOS system.

| Property | Type | Options / Notes |
|---|---|---|
| Block Name | Title | e.g., HeroRotating, ThreeCardGrid |
| Status | Select | ✅ Stable / 🧪 Beta / 📋 Planned / ⚠️ Deprecated |
| Category | Select | Hero / Content / Social Proof / CTA / Navigation / Form / Media / Layout |
| Description | Rich Text | What it does, when to use, configurable fields |
| Config Path | Text | src/blocks/HeroRotating/config.ts |
| Screenshot | Files | Visual reference |
| Sites Using | Relation → Site Registry | Which sites include this block |
| Fields Summary | Rich Text | List of editor-configurable fields |
| Variants | Number | How many visual variants exist |
| Created | Date | First built |
| Last Updated | Date | Last modification |

### 2.7 Client Database

| Property | Type | Options / Notes |
|---|---|---|
| Client Name | Title | Company or individual |
| Contact | Text | Primary contact name |
| Email | Email | Primary email |
| Phone | Phone | Primary phone |
| Type | Select | Website Client / Consulting / Internal |
| Status | Select | 🟢 Active / 🟡 Prospecting / 🔴 Churned / ⏸️ Paused |
| Projects | Relation → Projects | All projects for this client |
| Sites | Relation → Site Registry | All sites for this client |
| Monthly Revenue | Rollup | Sum of site monthly revenue |
| Contract Value | Number (Currency) | Total contract value |
| Start Date | Date | Relationship start |
| Notes | Rich Text | Relationship context |

### 2.8 Revenue Tracker

| Property | Type | Options / Notes |
|---|---|---|
| Entry | Title | e.g., "Konative.com — April 2026" |
| Month | Date | Billing month |
| Client | Relation → Clients | Source |
| Project | Relation → Projects | Source project |
| Type | Select | Managed Hosting / Build Fee / Consulting / Retainer |
| Amount | Number (Currency) | Revenue amount |
| Status | Select | 🟢 Collected / 🟡 Invoiced / ⬜ Scheduled |
| Notes | Text | Context |

---

## Part 3: AI Skills Library — Prompt Templates

Each skill is a documented prompt + workflow stored as a Notion page in the Skills Library. These are invoked through Claude Desktop in the appropriate mode.

### Skill: /office-hours

**Based on:** Garry Tan's GStack /office-hours
**Claude Mode:** 💬 Chat (conversational, Socratic questioning)
**When:** Before committing resources to any new idea

**Trigger phrase for Claude:**
> "Run /office-hours on this idea: [one-liner description]"

**What it does:**
1. Forces 6 critical questions about the idea (problem clarity, specific user, market size, unfair advantage, founder-market fit, path to first dollar)
2. Scores the idea on a 1-10 scale based on response quality
3. Identifies the single biggest risk and what would need to be true for the idea to work
4. Gives a clear "pursue / pivot / kill" recommendation

**Output → Notion:**
- Update Ideas Database: Office Hours Score, Office Hours Notes
- If score ≥ 7: promote to "Validated" status
- If score < 5: move to "Killed" with notes on why

**Scoring rubric:**
- 9-10: Specific user named, clear pain, obvious path to revenue, founder has domain edge
- 7-8: Solid concept, some assumptions to test, but worth building an MVP
- 5-6: Interesting but vague — needs sharper user definition or revenue clarity
- 1-4: Solution looking for a problem, or no founder-market fit

### Skill: /7-steps

**Based on:** Addy Osmani's structured technical planning
**Claude Mode:** 🤖 Agentic (structured decomposition, file generation)
**When:** After validation, before writing any code

**Trigger phrase for Claude:**
> "Run /7-steps on [project name]. Here's the brief: [link or paste]"

**The 7 steps:**
1. **Define scope boundaries** — what's in v1, what's explicitly NOT in v1
2. **Identify users and their jobs-to-be-done** — map each user type to their core workflow
3. **Choose the tech stack with rationale** — every choice justified against alternatives
4. **Design the data model** — collections, relationships, access patterns
5. **Map the page/screen architecture** — routes, layouts, component hierarchy
6. **Define the build sequence** — what gets built first and why (dependency order)
7. **Set success criteria** — measurable outcomes that define "done"

**Output → Notion:**
- Create project brief page under Projects
- Populate Milestones database with build sequence
- Generate initial Tasks from step 6

### Skill: /biz-os

**Based on:** Liam Ottley's AAA Business OS concepts
**Claude Mode:** 💬 Chat (strategic, operational)
**When:** Setting up business operations, sales systems, delivery workflows

**Trigger phrase for Claude:**
> "Run /biz-os for [business name]. Model: [managed service / build & handoff / SaaS]. Target: [client type]."

**What it covers:**
1. **Offer design** — package the service into clear tiers with pricing
2. **Sales pipeline** — lead sources, qualification criteria, proposal template, close process
3. **Delivery workflow** — step-by-step from signed contract to delivered product
4. **Client communication** — onboarding sequence, update cadence, review meetings
5. **Scaling triggers** — when to hire, when to raise prices, when to systematize

**Output → Notion:**
- Revenue model added to project
- Client onboarding template created
- Delivery milestones added to project

### Skill: /webos-launch

**Custom skill — built from the Konative.com build brief**
**Claude Mode:** 💻 Code (scaffold, build, deploy)
**When:** Any project needs a website

**Trigger phrase for Claude:**
> "Run /webos-launch for [domain]. Business: [description]. Goal: [primary action]. Reference: [URL]. Assets available: [list]."

**Execution steps:**
1. Generate site brief (auto-populated from input)
2. Analyze reference URL → extract design tokens + section patterns
3. Map sections to existing Block Library entries → identify gaps
4. Scaffold Payload project from Studio Starter
5. Configure site-specific globals (theme, nav, settings)
6. Compose pages from blocks
7. Enter real content
8. Deploy to Vercel/GCP
9. Document in Site Registry + update Block Library
10. Create Editor Guide + record Loom

**Output → Notion:**
- New entry in Site Registry
- Project updated with live URLs
- Block Library updated with any new blocks
- Editor Guide linked

### Skill: /deploy-preflight

**Custom skill**
**Claude Mode:** 💻 Code (automated checks)
**When:** Before any production deployment

**Trigger phrase for Claude:**
> "Run /deploy-preflight on [repo/URL]"

**Checklist (automated where possible):**
- [ ] All pages render at 375px and 1440px without overflow
- [ ] Contact/lead forms submit and route correctly
- [ ] Meta tags and OG images present on all pages
- [ ] Sitemap.xml and robots.txt exist
- [ ] SSL certificate active
- [ ] Analytics tracking firing
- [ ] Lighthouse score: Performance ≥ 90, Accessibility ≥ 95
- [ ] All images have alt text, width, height, loading="lazy"
- [ ] Dark mode toggle works (if applicable)
- [ ] Favicon displays correctly
- [ ] 404 page exists and is styled
- [ ] Console has zero errors

---

## Part 4: Claude Desktop Mode Guide

Every task in the AI OS has a designated Claude mode. Using the right mode for the right task is critical for quality and speed.

| Mode | Icon | Best For | Examples |
|---|---|---|---|
| **Chat** | 💬 | Strategy, validation, brainstorming, Socratic questioning, writing | /office-hours, /biz-os, content writing, decision-making |
| **Agentic** | 🤖 | Structured planning, research, multi-step reasoning, document generation | /7-steps, competitive analysis, brief generation, Notion page creation |
| **Code** | 💻 | Building, deploying, debugging, file operations, automation | /webos-launch, /deploy-preflight, block development, CI/CD |

### Mode Selection Rules

- If the task requires **judgment or conversation** → 💬 Chat
- If the task requires **research, planning, or document output** → 🤖 Agentic
- If the task requires **code, files, or terminal commands** → 💻 Code
- If unsure → start with 💬 Chat to clarify, then escalate

### The Daily Loop

```
Morning (15 min):
  💬 Chat → "What are my P0 tasks today across all projects?"
  Review Sprint Board in Notion

Build blocks (2-4 hours):
  💻 Code → Execute highest-priority build tasks
  Each completed task → update Notion status

Afternoon strategy (30 min):
  🤖 Agentic → Process new ideas through /office-hours
  💬 Chat → Client communication, content review

End of day (10 min):
  Update Notion: task statuses, blockers, tomorrow's priorities
  Push any new knowledge to Obsidian vault
```

---

## Part 5: Notion ↔ Obsidian Protocol

Notion is the operational system of record. Obsidian is the personal knowledge graph and thinking space. They serve different purposes and should not duplicate each other.

### What Lives Where

| Content | Notion | Obsidian |
|---|---|---|
| Project status, tasks, milestones | ✅ | ❌ |
| Client data, revenue, contracts | ✅ | ❌ |
| Site Registry, Block Library | ✅ | ❌ |
| Checklists and SOPs | ✅ | ❌ |
| Deep technical notes and learnings | ❌ | ✅ |
| Design system evolution thinking | ❌ | ✅ |
| Personal reflections and founder journal | ❌ | ✅ |
| Research notes and reference links | ❌ | ✅ |
| Meeting notes (raw) | ❌ | ✅ |
| Meeting decisions and action items | ✅ | ❌ |
| Claude conversation summaries | ❌ | ✅ |
| Skill prompt templates | ✅ | Mirrored for offline |

### Sync Protocol

**Notion → Obsidian (weekly):**
- Export key decisions and architecture choices as permanent notes
- Link to Notion pages using URL references, not content duplication

**Obsidian → Notion (as needed):**
- When a thinking note produces an actionable decision, create the corresponding Notion task/milestone
- When a research note validates a new skill or workflow, add it to the AI Skills Library in Notion

**Rule:** If it needs to be *acted on*, it lives in Notion. If it needs to be *thought about*, it lives in Obsidian. Never store the same content in both places — use links.

---

## Part 6: Project Lifecycle — Complete Flow

This is the full lifecycle of any project in the AI OS, from idea to scaled operation.

### Stage 1: Ideation → Ideas Database
```
Trigger: "I have an idea for..."
Action:  Create entry in Ideas Database with one-liner
Status:  💭 Raw
```

### Stage 2: Validation → /office-hours
```
Trigger: Idea seems worth exploring
Action:  Open Claude 💬 Chat → "Run /office-hours on [idea]"
Output:  Score (1-10), risk assessment, pursue/pivot/kill
Status:  🔍 Validating → ✅ Validated or 🚫 Killed
```

### Stage 3: Architecture → /7-steps
```
Trigger: Idea scores ≥ 7 in Office Hours
Action:  Open Claude 🤖 Agentic → "Run /7-steps on [project]"
Output:  Project brief, tech stack, data model, build sequence
Status:  Create Project in Projects Database → 📋 Planning
Notion:  Create project hub page, milestones, initial tasks
```

### Stage 4: Business Setup → /biz-os
```
Trigger: Project has clear scope from /7-steps
Action:  Open Claude 💬 Chat → "Run /biz-os for [business]"
Output:  Pricing tiers, sales pipeline, delivery workflow
Status:  Project phase → Architecture
```

### Stage 5: Build → /webos-launch (if website) or direct 💻 Code
```
Trigger: Architecture complete, tasks defined
Action:  Open Claude 💻 Code → Execute build tasks in sequence
         If website: "Run /webos-launch for [domain]"
Output:  Working product / live website
Status:  🏗️ Building → 🧪 Testing
```

### Stage 6: Deploy → /deploy-preflight
```
Trigger: Build complete, ready for production
Action:  Open Claude 💻 Code → "Run /deploy-preflight on [repo]"
Output:  QA checklist passed, production deployment
Status:  🧪 Testing → 🚀 Live
Notion:  Update all URLs, launch date, status
```

### Stage 7: Operate → Ongoing
```
Trigger: Site is live
Action:  Monitor analytics, respond to leads, iterate content
         Weekly: review metrics in Notion dashboard
         Monthly: revenue reconciliation in Revenue Tracker
Status:  🚀 Live (ongoing)
```

### Stage 8: Scale → /biz-os (revisit)
```
Trigger: Revenue or demand exceeds current capacity
Action:  Open Claude 💬 Chat → "Revisit /biz-os for [business] — scaling"
Output:  Hiring plan, pricing adjustment, automation opportunities
Status:  Project phase → Scale
```

---

## Part 7: Quick-Start Setup Checklist

Execute these steps in order to set up the AI OS in your Notion workspace today.

### Hour 1: Structure
- [ ] Create top-level "AI OS Hub" page in Notion
- [ ] Create "Command Center" section with linked views
- [ ] Create "Idea Pipeline" section with Ideas Database (schema from 2.1)
- [ ] Create "Project Execution" section with Projects Database (schema from 2.2)
- [ ] Create Tasks Database (schema from 2.3) and Milestones Database (schema from 2.4)

### Hour 2: WebOS
- [ ] Create "WebOS" section with Site Registry (schema from 2.5)
- [ ] Create Block Library database (schema from 2.6)
- [ ] Create Content Schema Registry database
- [ ] Copy New Site Launch Checklist from Konative build brief
- [ ] Copy Design Extraction Workflow from Konative build brief

### Hour 3: Revenue & Clients
- [ ] Create Client Database (schema from 2.7)
- [ ] Create Revenue Tracker (schema from 2.8)
- [ ] Create Proposals & Contracts section

### Hour 4: Skills & Knowledge
- [ ] Create "AI Skills Library" section
- [ ] Add /office-hours skill page with prompt template (Part 3)
- [ ] Add /7-steps skill page with prompt template (Part 3)
- [ ] Add /biz-os skill page with prompt template (Part 3)
- [ ] Add /webos-launch skill page with prompt template (Part 3)
- [ ] Add /deploy-preflight skill page with checklist (Part 3)
- [ ] Create "Knowledge Base" section
- [ ] Create "System Config" section with Claude modes guide

### Hour 5: Populate with Current Projects
- [ ] Add Konative.com to Ideas (Validated) and Projects (Building)
- [ ] Add Konative.com to Site Registry (Building)
- [ ] Add SpokaneWire to Projects (Live) and Site Registry (Live)
- [ ] Add TolowaPacific to Projects (Planning) and Site Registry (Planning)
- [ ] Add initial 14 blocks to Block Library (Planned status)
- [ ] Create first sprint tasks for Konative build

### Hour 6: Dashboard
- [ ] Create AI OS Hub dashboard page with:
  - Linked view: Active Projects (Board, filtered to non-archived)
  - Linked view: This Week's Tasks (Board, filtered to sprint)
  - Linked view: Revenue Summary (Table, current month)
  - Linked view: Live Sites (Gallery from Site Registry)
  - Quick links: each skill page, knowledge base
- [ ] Set AI OS Hub as your Notion sidebar favorite

---

## Part 8: Scaling Triggers

The AI OS includes built-in triggers that tell you when to evolve the system.

| Trigger | Threshold | Action |
|---|---|---|
| Sites in production | > 5 | Evaluate multi-tenant Payload migration |
| Monthly managed revenue | > $3,000 | Hire part-time editor/content manager |
| Block Library size | > 25 blocks | Audit for redundancy, create block variants instead of new blocks |
| Active client projects | > 3 simultaneous | Standardize communication cadence, consider project manager |
| Build time per site | > 5 days (existing blocks only) | Audit workflow for bottlenecks, improve starter template |
| Handoff requests | > 2 per quarter | Automate export/import scripts, productize handoff package |
| Revenue per site | Declining | Review pricing, add value-adds (analytics reports, content updates) |
| Ideas killed rate | > 80% | Sharpen idea sourcing, revisit ICP definition |

---

## Appendix: Notion Database Relations Map

```
Ideas Database
  └── Promoted To → Projects Database

Projects Database
  ├── Related Ideas ← Ideas Database
  ├── Tasks → Tasks Database
  ├── Milestones → Milestones Database
  ├── Related Site → Site Registry
  └── Client → Client Database

Tasks Database
  ├── Project → Projects Database
  └── Milestone → Milestones Database

Milestones Database
  ├── Project → Projects Database
  ├── Tasks → Tasks Database
  └── Dependencies → Milestones Database (self-relation)

Site Registry (WebOS)
  ├── Project → Projects Database
  ├── Client → Client Database
  └── Blocks Using ← Block Library

Block Library (WebOS)
  └── Sites Using → Site Registry

Client Database
  ├── Projects → Projects Database
  └── Sites → Site Registry

Revenue Tracker
  ├── Client → Client Database
  └── Project → Projects Database
```

Every database connects back to the Projects Database as the central hub. No orphan databases. No disconnected data.
