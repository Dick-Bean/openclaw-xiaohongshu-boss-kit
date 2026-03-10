# Routing

Use this file to decide how `xiaohongshu-boss` should dispatch work.

Treat `xiaohongshu-boss` as the instruction and control layer:
- it interprets the user prompt
- it decides the route
- it assigns the worker
- it monitors progress
- it validates output before closing the task

## Primary Routes

### 1. Collection route

Use when the user wants:
- top notes
- visible search results
- URLs, authors, likes, comments
- CSV export

Dispatch:
- `xiaohongshu-suite`
- `browser-assist` if page interaction is needed
- `windows-ops` for export placement

Execution shape:
1. search Xiaohongshu for the requested keyword
2. constrain results to the requested time window when the page allows it
3. collect visible candidates
4. normalize likes and rank the requested top N
5. open each selected note and inspect visible comments when possible
6. extract repeated comment themes and topic phrases
7. export both the ranked table and a comment-topic summary

### 2. Detail and comments route

Use when the user wants:
- note detail inspection
- comment language analysis
- audience demand signals

Dispatch:
- `xiaohongshu-suite`
- `browser-assist`

### 3. Creator route

Use when the user wants:
- account comparison
- creator profile review
- content style comparison

Dispatch:
- `xiaohongshu-suite`
- `browser-assist`
- `windows-ops` for report export

### 4. Trend or deep research route

Use when the user wants:
- multiple keywords
- repeated comparisons
- trend snapshots
- thematic research

Dispatch:
- `xiaohongshu-suite`
- `team-orchestrator` if the job has multiple collection and analysis phases

### 5. Content planning route

Use when the user wants:
- titles
- hooks
- content directions
- keyword clusters

Dispatch:
- `xiaohongshu-suite`

### 6. Publishing preparation route

Use when the user wants:
- post checklist
- metadata checklist
- asset preparation
- markdown content packaged into image posts
- publish-page readiness checks

Dispatch:
- `xiaohongshu-suite`
- `windows-ops`

Pattern:
- prepare title, content, tags, and media first
- stop at a human confirmation checkpoint before final publish
- treat direct publish as an explicit opt-in action, not the default

### 7. Profile and explore route

Use when the user wants:
- homepage recommendations
- user profile inspection
- self-profile checks
- creator comparisons based on visible profile pages

Dispatch:
- `xiaohongshu-suite`
- `browser-assist`
- `windows-ops` if exporting profile tables

## Escalation Rules

- If the user asks for hidden data, reset to visible-data collection only.
- If the user asks for anti-bot evasion, refuse that part and keep the safe workflow.
- If the user asks for a broad outcome like "handle everything," split it into collection, analysis, and export stages.

## Default Structured Objective Template

Use this structure when the user gives a compact objective:

- keyword:
- time window:
- ranking rule:
- target count:
- detail layer:
- export format:
- output path:

Default output naming rule:
- filename prefix should match the user keyword or task subject
- examples: `iphone_top20.csv`, `2026服装_summary.md`

## Quick Routing Playbook

- If the ask is for hot notes or Top N, use the Collection route with search filters and ranking; send to `xiaohongshu-suite` and `browser-assist`.
- If the ask is for comments or topics, run the Detail and comments route after collection and focus on comment themes.
- If the ask is for creator comparison, use the Profile and explore route and export through `windows-ops`.
- If the ask is for trends or multiple keywords, use the Trend route and combine `xiaohongshu-suite` with `team-orchestrator`.
- If the ask is for titles or content planning, use the Content planning route with `xiaohongshu-suite`.
- If the ask is for publishing prep, use the Publishing preparation route and stop before auto-publish.
- If the ask mentions anti-bot evasion or stealth, refuse that part and return to visible-data collection with human verification.

## Routing Steps

1. Parse the user request into keyword, time window, ranking rule, target count, detail layer, export format, and goal.
2. Choose one primary route: Collection, Detail, Profile, Trend, Planning, or Publish-prep.
3. Dispatch `xiaohongshu-suite` as the main worker, then add `browser-assist`, `windows-ops`, or `team-orchestrator` only when needed.
4. Monitor the active worker and confirm each stage produced the expected output.
5. Stop for any login, CAPTCHA, or forced verification checkpoint and wait for the user.
6. Validate the final result against the original instruction.
7. Return the result path, findings, and any limitation in the final answer.
