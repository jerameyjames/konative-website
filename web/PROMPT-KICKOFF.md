# Cursor Kickoff Prompt

Use this exact prompt in Cursor 3.0 agent mode:

---

You are operating inside the **Konative WebOS Starter** repository.

Read these files first and follow them in order:
1. `AGENTS.md`
2. `PLAN.md`
3. `TASKS.md`
4. `docs/notion-sync.md`
5. `docs/decisions.md`
6. `.cursor/rules/*.mdc`

You have access to my filesystem and Notion via Desktop Commander.

## Mission
Build **konative.com** as Site 0 of my WebOS using **Payload CMS + Next.js**, and keep my AI OS in Notion updated as the system of record.

## Execution rules
- Start in **plan-first mode**.
- Do not write code until you inspect the repo and propose the first milestone implementation sequence.
- Use the existing WebOS strategy: reusable architecture, no premature multi-tenant complexity, no more than 14 initial blocks.
- Prioritize the first 5 blocks: HeroRotating, ThreeCardGrid, StatBar, SplitImageText, CTABand.
- Keep the site aligned with a Kimley-Horn-inspired professional services structure, adapted for Konative.
- Sync key project records into Notion if they do not already exist.
- Log every Notion action clearly.

## First tasks
1. Inspect the repository state.
2. Confirm whether this repo is already scaffolded. If not, propose the exact scaffold path.
3. Identify files to create/update for Milestone 1: scaffold + CMS foundation.
4. Inspect Notion and confirm whether these records already exist:
   - Project: Konative.com
   - Site Registry entry: konative.com
   - Milestones for kickoff
   - Block Library entries for the 14 approved blocks
5. Present a concise implementation plan for approval.

After presenting the plan, wait for approval before editing code or Notion.

---
