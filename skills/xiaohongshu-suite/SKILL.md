---
name: xiaohongshu-suite
description: |
  Xiaohongshu specialist worker for ClawX/OpenClaw. Use when a higher-level planner or the user needs a dedicated worker to execute Xiaohongshu search, note collection, ranking by likes or other engagement, browser-assisted navigation with human checkpoints, batch export, and follow-up analysis tasks.
---

# Xiaohongshu Suite Skill

Use this skill as the main Xiaohongshu worker.

Treat it as a specialist employee that executes Xiaohongshu work after a boss or planner decides the objective.

Read [references/modules.md](references/modules.md) when deciding which module flow to use.
Read [references/official-clawhub-audit.md](references/official-clawhub-audit.md) when checking market coverage or deciding what capabilities are still missing.
Read [references/search-filters.md](references/search-filters.md) when the task needs Xiaohongshu search constraints.
Read [references/profile-and-explore.md](references/profile-and-explore.md) when the task is about creator profiles or homepage recommendations.
Read [references/publish-preflight.md](references/publish-preflight.md) when the task is publish preparation instead of direct posting.

## Operating Principle

Prefer this order of execution:

1. Use the user's existing Chrome session and human checkpoints.
2. Collect only visible and reviewable data.
3. Normalize engagement metrics before ranking.
4. Export structured results.
5. Escalate to deeper automation only if the task truly needs it.

## Position In The Team

- `xiaohongshu-boss` is the manager and dispatcher.
- `xiaohongshu-suite` is the specialist Xiaohongshu worker.
- `xiaohongshu-safe` is the safe collection sub-worker.
- `browser-assist` handles browser actions with human checkpoints.
- `windows-ops` handles local file and export work.

## Default Module Selection

- Search, open notes, and collect visible fields:
  Use the workflow from `xiaohongshu-safe`.
- Human-in-the-loop browser continuation:
  Use the workflow from `browser-assist`.
- Local export, file movement, and desktop output:
  Use the workflow from `windows-ops`.
- Multi-step task breakdown:
  Use the workflow from `team-orchestrator`.
- Capability planning and gap checks:
  Read [references/capability-matrix.md](references/capability-matrix.md).

## Core Tasks

- Search Xiaohongshu for a keyword or theme
- Apply search filters such as sort, note type, publish time, scope, and location
- Rank visible results by likes, collects, comments, or mixed score
- Collect top N notes into CSV or Markdown
- Continue after the user completes login or verification
- Build repeatable collection batches for a topic
- Prepare simple trend summaries from collected tables
- Compare multiple keywords or brands side by side
- Analyze note details and visible comments
- Analyze visible creator profile signals
- Inspect homepage or explore-style recommendation flows
- Generate title and topic suggestions for Xiaohongshu-style content
- Prepare publishing-ready data packs for later manual or assisted posting
- Prepare publish-preflight checklists and Markdown-to-image packaging briefs
- Prepare creator-center export analysis if the user provides exported CSV files

## Safe Defaults

- Use the user's authenticated browser session
- Pause for login, CAPTCHA, slider, or identity checks
- Keep raw metric text and normalized numeric values together
- Save spreadsheet-friendly CSV files to the desktop unless the user says otherwise
- Prefix output filenames with the user task keyword or subject
- Prefer small batches over long unattended runs

## Do Not Do

- Do not bypass anti-bot or verification systems
- Do not guess hidden values
- Do not install unreviewed third-party Xiaohongshu skills into the main environment
- Do not replace the user's browser session with a separate stealth browser unless the user explicitly asks for a test environment

## Output Patterns

Prefer one of these:

- top-N CSV table
- Markdown comparison table
- trend summary with source keywords and capture time
- note-detail dataset with URLs and authors
- creator comparison table
- title and angle suggestion pack
- content brief with keyword clusters
- engagement-ranked CSV with weighted score

## Working Style

1. Confirm the topic, target count, and ranking rule.
2. Reuse the safest existing workflow.
3. Tell the user when a human checkpoint is required.
4. Normalize metrics and sort locally.
5. Save the result and report the output path.

If `xiaohongshu-boss` has already decided the task shape, follow that routing decision and focus on execution rather than re-planning the whole job.

## Built-in Functional Coverage

Use this checklist to route work:

- Discovery:
  keyword search, hot-note discovery, multi-keyword comparison
- Collection:
  visible note fields, visible note detail, visible comments, author/profile capture
- Analysis:
  likes-first ranking, mixed engagement ranking, trend summary, competitor comparison
- Content planning:
  topic ideas, title ideas, hook variants, keyword clusters
- Publishing prep:
  draft package, asset checklist, post metadata checklist
- Reporting:
  CSV export, Markdown table, desktop delivery, follow-up summaries

## Official Market Alignment

Use the official ClawHub audit as a capability checklist.

The suite should aim to cover the useful parts of these market families without inheriting risky implementation details:

- automation and collection
- trend and deep research
- title and content planning
- operator assistance
- platform-specific controller variants

## Preferred Helpers

- Normalize and re-rank CSV exports with `scripts/rank_xhs_csv.py`.
- Use `xiaohongshu-safe/scripts/normalize_xhs_metrics.py` when only metric normalization is needed.
- Generate a publish-preflight checklist with `scripts/prepare_publish_pack.py`.
- Run real authenticated Xiaohongshu collection with `scripts/xhs_relay_collect.js` when the OpenClaw browser CLI wrapper is unstable.
- Prefer `scripts/run_xhs_collect.ps1` on Windows when you want desktop output names to automatically begin with the task keyword.

## Current Boundaries

- This suite can coordinate publish planning, but write actions should stay human-confirmed.
- Creator-center analytics are supported when the user provides exports or visible pages.
- Full detached MCP automation is a future phase, not the default path.
