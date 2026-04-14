# Notion — Konative / Founder OS

## Hub (canonical)

**Primary (Notion source of truth):** [Konative.com — Project Hub](https://www.notion.so/34232e0a547481b39bc1e081765d6df6) — strategy, status, execution; `docs/` and `web/` mirror it for git and agents.

**Legacy:** [konative.com — Founder OS HUB](https://www.notion.so/34132e0a547481489537d232018bbbb0) (superseded for site work; keep for historical links if needed).

Child pages under the legacy hub (still useful) include:

| Page | URL |
|------|-----|
| PRD — requirements | [link](https://www.notion.so/PRD-konative-com-requirements-34132e0a54748191aa41c3fe657c89e5) |
| Founder OS — cadence | [link](https://www.notion.so/Founder-OS-cadence-pillars-34132e0a5474810088a1f18cde8248bc) |
| Tasks — Konative (E1–E5 epic pages) | [link](https://www.notion.so/Tasks-Konative-34132e0a547481d6a8cfc4facf12bae2) |
| Decisions log | [link](https://www.notion.so/Decisions-log-34132e0a5474818cb7aac21163b78816) |
| Meetings → actions | [link](https://www.notion.so/Meetings-actions-34132e0a5474813bbeb5ff8084d85883) |

## Task rows (database-backed)

**Tolowa Pacific Task Board** ([database](https://www.notion.so/3ac5bd5b8ff94dd58b9c157ccd03bac4)) now includes **five rows** titled `[Konative] E1 … E5` with Status, Priority, Workstream, Phase, and Session Notes. Filter the board by **Konative** in the task title, or add a **linked view** of this database under **Tasks — Konative** (type `/linked` → choose the task board → filter `Task` contains `Konative`).

To isolate Konative in its own database: duplicate **Tolowa Pacific Task Board** in the Notion UI, move it under the konative hub, select the five `[Konative]` rows in the source board, and move them to the new database (or leave as-is and use filters).

## Integration note (mcpx)

Through **user-mcpx**, these Notion API routes work: `post-page` (including **rows in an existing database**), `retrieve-database`, `patch-block-children`, `retrieve-page`, search, etc.

These return **`invalid_request_url`** on the current proxy: `create-a-data-source`, `query-data-source`, `retrieve-a-data-source` — so **new databases cannot be created via this MCP path**; use the Notion UI to duplicate a task board, or rely on epic pages + existing DB rows as above.

## Repo

Detailed PRD: [`docs/requirements-prd.md`](requirements-prd.md).
