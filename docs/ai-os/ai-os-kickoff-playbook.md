# AI OS Kickoff Playbook
## Notion Setup + Execution Plan for Konative and WebOS

This playbook is the immediate operating sequence for turning the AI OS concept into a working system in Notion and using it to launch Konative.com as Site 0 of the WebOS.

---

## What to do first

The goal is not to build the entire empire today. The goal is to create the minimum operational structure that lets you:

1. Run AI OS inside Notion today
2. Track Konative as the first live WebOS project
3. Build the site immediately using the brief already created
4. Reuse this operating structure for every future project

The practical order is:

- Set up the Notion structure
- Create the core databases
- Seed Konative, SpokaneWire, and TolowaPacific into the system
- Add the AI skills pages
- Create the Konative project hub
- Turn the Konative brief into tasks and milestones
- Start the website build from the Site 0 plan

---

## 90-minute kickoff sequence

### Phase 1 — Build the shell (20 minutes)

Create a top-level Notion page called:

**AI OS Hub**

Inside it, create these sub-pages in this exact order:

1. Command Center
2. Idea Pipeline
3. Project Execution
4. WebOS
5. Revenue & Clients
6. AI Skills Library
7. Knowledge Base
8. System Config

Do not overdesign this. Use simple emoji labels and clean titles.

---

### Phase 2 — Create the 5 essential databases (35 minutes)

Create these databases first. Everything else can be layered on later.

#### A. Projects Database

Use these properties:

| Property | Type |
|---|---|
| Project Name | Title |
| Status | Select |
| Phase | Select |
| Type | Select |
| Domain | URL |
| GitHub Repo | URL |
| Live URL | URL |
| Admin URL | URL |
| Revenue Model | Select |
| Monthly Revenue | Number |
| Launch Date | Date |
| Notes | Text |

**Status options:** Planning, Building, Testing, Live, Paused, Archived

**Phase options:** Validation, Architecture, Build, Deploy, Operate, Scale

**Type options:** Website, Platform, Service, Internal

**Revenue Model options:** Managed, Handoff, SaaS, Internal

---

#### B. Tasks Database

| Property | Type |
|---|---|
| Task | Title |
| Status | Select |
| Priority | Select |
| Project | Relation → Projects |
| Due Date | Date |
| Claude Mode | Select |
| Skill Used | Select |
| Time Estimate | Number |
| Notes | Text |

**Status options:** Backlog, This Week, In Progress, Done, Blocked

**Priority options:** P0, P1, P2, P3

**Claude Mode options:** Chat, Agentic, Code, Manual

**Skill Used options:** office-hours, 7-steps, biz-os, webos-launch, deploy-preflight, none

---

#### C. Milestones Database

| Property | Type |
|---|---|
| Milestone | Title |
| Status | Select |
| Project | Relation → Projects |
| Target Date | Date |
| Success Criteria | Text |

**Status options:** Not Started, In Progress, Complete

---

#### D. Site Registry Database

| Property | Type |
|---|---|
| Domain | Title |
| Status | Select |
| Deployment Mode | Select |
| Project | Relation → Projects |
| Admin URL | URL |
| Live URL | URL |
| Hosting | Select |
| Reference URL | URL |
| Block Count | Number |
| Launch Date | Date |
| GitHub Repo | URL |
| Notes | Text |

**Status options:** Planning, Building, Live, Paused, Archived

**Deployment Mode options:** Studio Managed, Client Managed, Handoff, Internal

**Hosting options:** Vercel, GCP, Client Hosted

---

#### E. Block Library Database

| Property | Type |
|---|---|
| Block Name | Title |
| Status | Select |
| Category | Select |
| Description | Text |
| Sites Using | Relation → Site Registry |
| Variants | Number |
| Notes | Text |

**Status options:** Stable, Beta, Planned, Deprecated

**Category options:** Hero, Content, Social Proof, CTA, Navigation, Form, Media, Layout

---

### Phase 3 — Seed the system (20 minutes)

Add these projects into the Projects Database:

#### 1. Konative.com
- Status: Building
- Phase: Build
- Type: Website
- Domain: https://konative.com
- Revenue Model: Managed
- Launch Date: this week
- Notes: Site 0 of WebOS, based on Kimley-Horn structure

#### 2. SpokaneWire
- Status: Live
- Phase: Operate
- Type: Platform
- Domain: https://spokanewire.com
- Revenue Model: Managed
- Notes: advanced community platform, not the primary WebOS starter specimen

#### 3. TolowaPacific.com
- Status: Planning
- Phase: Architecture
- Type: Website
- Domain: https://tolowapacific.com
- Revenue Model: Managed
- Notes: will become Site 1 or Site 2 depending on Konative completion

Then add these sites into Site Registry:

- konative.com
- spokanewire.com
- tolowapacific.com

---

### Phase 4 — Seed the block library (15 minutes)

Add these 14 planned blocks:

1. HeroRotating
2. ThreeCardGrid
3. StatBar
4. SplitImageText
5. ServicesList
6. TestimonialCarousel
7. BrandLogoStrip
8. CTABand
9. RichContent
10. TeamGrid
11. ContactForm
12. MediaFeature
13. FAQAccordion
14. FooterCTA

Set all to:
- Status: Planned
- Variants: 1

---

## AI Skills pages to create in Notion

Create one Notion page for each skill under **AI Skills Library**.

### office-hours
**Purpose:** validate ideas before they become projects

**Prompt:**
> Run /office-hours on this idea: [paste one-line idea]. Ask the hard questions, score it 1-10, identify the biggest risk, and tell me pursue, pivot, or kill.

### 7-steps
**Purpose:** turn a validated idea into an architecture and build sequence

**Prompt:**
> Run /7-steps on this project. Define v1 scope, users, stack, data model, page architecture, build sequence, and success criteria.

### biz-os
**Purpose:** define the offer, pricing, sales process, and delivery model

**Prompt:**
> Run /biz-os for this business. Package the offer, define pricing, describe the sales pipeline, and create a delivery workflow.

### webos-launch
**Purpose:** launch a website from brief to live deployment

**Prompt:**
> Run /webos-launch for [domain]. Business: [description]. Goal: [primary conversion]. Reference: [URL]. Assets available: [list].

### deploy-preflight
**Purpose:** check quality before launch

**Prompt:**
> Run /deploy-preflight on [repo/url]. Check mobile, forms, SEO, analytics, accessibility, images, errors, and deployment readiness.

---

## Konative project hub setup in Notion

Create a page under Project Execution called:

**Konative.com — Site 0**

Put this structure inside the page:

### Sections
1. Executive Summary
2. Site Goal
3. Reference Site
4. Design Direction
5. Page Map
6. CMS Schema
7. Block Plan
8. Launch Milestones
9. Build Tasks
10. Links

### Paste this content into the top of the page

**Executive Summary**
Konative.com is the first live implementation of the WebOS. It is a premium B2B services website for a woman-owned rep business in outdoor living, surfaces, and fabrication. This site establishes the starter system that future studio websites will reuse.

**Site Goal**
Generate qualified manufacturer partnership inquiries and establish immediate credibility.

**Reference Site**
https://www.kimley-horn.com/

**Design Direction**
Warm, confident, spacious, premium professional-services aesthetic. Kimley-Horn structure adapted for sales representation and market expansion.

**Primary CTA**
Partner With Us

**Secondary CTA**
Our Services

---

## Konative milestone plan

Create these milestones in the Milestones Database and relate them to Konative.com.

### Milestone 1 — Notion system live
- Status: In Progress
- Target Date: today
- Success Criteria: AI OS databases created, Konative project entered, skill pages created

### Milestone 2 — Konative starter scaffolded
- Status: Not Started
- Target Date: today
- Success Criteria: Payload project created locally or in Vercel, repo initialized, CMS runs locally

### Milestone 3 — Home page assembled
- Status: Not Started
- Target Date: tomorrow
- Success Criteria: Hero, stat bar, three-card grid, split section, CTA band render with real content

### Milestone 4 — Phase 1 site deployed
- Status: Not Started
- Target Date: this week
- Success Criteria: Home, About, Services, Contact live on konative.com with working form

### Milestone 5 — WebOS starter extracted
- Status: Not Started
- Target Date: within 2 weeks
- Success Criteria: reusable starter repo documented for future sites

---

## Konative tasks to create immediately

Create these tasks in Tasks Database and relate them to Konative.com.

### Today — Notion + planning
- Create AI OS Hub in Notion — P0 — Manual
- Create Projects database — P0 — Manual
- Create Tasks database — P0 — Manual
- Create Milestones database — P0 — Manual
- Create Site Registry database — P0 — Manual
- Create Block Library database — P0 — Manual
- Seed Konative, SpokaneWire, TolowaPacific — P0 — Manual
- Create AI Skills Library pages — P0 — Manual
- Create Konative project hub page — P0 — Manual
- Paste Konative brief into project hub — P0 — Manual

### Today — technical kickoff
- Scaffold Payload website project for Konative — P0 — Code — webos-launch
- Create Pages collection — P0 — Code
- Create Services collection — P1 — Code
- Create Testimonials collection — P1 — Code
- Create Site Settings global — P0 — Code
- Create Navigation global — P0 — Code
- Register first 5 blocks — P0 — Code
- Build HeroRotating block — P0 — Code
- Build ThreeCardGrid block — P0 — Code
- Build StatBar block — P0 — Code
- Build SplitImageText block — P1 — Code
- Build CTABand block — P1 — Code

### Tomorrow
- Enter home page content in Payload admin — P0 — Manual
- Build About page — P1 — Code
- Build Services page — P1 — Code
- Build Contact page — P1 — Code
- Configure contact form handling — P0 — Code
- Deploy preview to Vercel — P0 — Code

### Before launch
- Connect konative.com DNS — P0 — Manual
- Run deploy-preflight — P0 — Code — deploy-preflight
- Verify mobile and desktop QA — P0 — Manual
- Add analytics — P1 — Code
- Write editor guide for Katrina — P1 — Manual

---

## Exact startup order for execution

### Step 1 — Open Notion
Create AI OS Hub and the 5 essential databases.

### Step 2 — Open the AI OS Notion template document
Use it as the source of truth for properties, relations, and pages.

### Step 3 — Open the Konative build brief
Use it to create the Konative project hub page and milestones.

### Step 4 — Seed the system
Add Konative, SpokaneWire, TolowaPacific, and the 14 planned blocks.

### Step 5 — Open Claude in Code mode
Use this exact command:

> Run /webos-launch for konative.com. Business: woman-owned sales representation and marketing firm for outdoor living, surfaces, and fabrication. Goal: generate manufacturer partnership inquiries. Reference: https://www.kimley-horn.com/. Assets available: domain, concept, founder story, service categories. Start by scaffolding the Payload project and building the first 5 blocks.

### Step 6 — Track every completed step in Notion
Do not build outside the system. If it is not in Notion, it is not part of the operating model.

---

## Daily operating rhythm for the next 3 days

### Day 1
- Build Notion operating system
- Seed Konative into system
- Scaffold site
- Build first 5 blocks

### Day 2
- Compose home page
- Add real content
- Build About, Services, Contact
- Deploy preview

### Day 3
- QA
- Connect DNS
- Launch
- Document editor workflow
- Freeze Konative as Site 0 starter baseline

---

## Rules for execution

1. Do not perfect the Notion workspace before creating the minimum databases.
2. Do not build multi-tenant architecture yet.
3. Do not create more than 14 initial blocks.
4. Do not add pages that do not support immediate credibility or conversion.
5. Do not let Konative become custom chaos — it must stay reusable.
6. Every new insight that changes the system goes into Notion or the Knowledge Base.
7. Every future website must reference Konative as Site 0 unless there is a strong reason not to.

---

## What success looks like by end of today

By end of today, success means:

- AI OS exists in Notion as a real operating system
- Konative exists as a tracked project with milestones and tasks
- WebOS exists as a section in the AI OS
- The block library is seeded
- The Payload starter is scaffolded
- The first 5 blocks are in progress or complete
- You have a clear next action tomorrow, not ambiguity

That is the kickoff.