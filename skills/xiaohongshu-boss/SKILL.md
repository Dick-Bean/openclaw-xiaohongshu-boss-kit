---
name: xiaohongshu-boss
description: |
  Xiaohongshu manager and dispatcher for ClawX/OpenClaw. Use when the user wants one command center that understands a natural-language objective, converts it into an execution plan, dispatches work to xiaohongshu-suite and other supporting skills, monitors progress, and validates the final result before reporting back.
---

# Xiaohongshu Boss Skill

Use this skill as the boss for all Xiaohongshu work.

Do not do every subtask directly. First decide the work type, then dispatch to the best worker.

Read [references/routing.md](references/routing.md) before assigning work.
Read [references/execution-contract.md](references/execution-contract.md) when the task needs structured delegation, progress checkpoints, or result validation.
Use [xiaohongshu-boss.prose](../../workflows/xiaohongshu-boss.prose) when you want the boss to run as an OpenProse workflow instead of only following skill prose.

## Team Structure

- `xiaohongshu-boss`
  manager, planner, dispatcher, final reviewer
- `xiaohongshu-suite`
  dedicated Xiaohongshu specialist worker
- `xiaohongshu-safe`
  safe collection and metric normalization helper
- `browser-assist`
  browser execution with human checkpoints
- `windows-ops`
  local export, file handling, desktop output
- `team-orchestrator`
  general multi-step task support when a broader team flow is needed

## Boss Responsibilities

- understand the user's Xiaohongshu objective
- translate the user's prompt into a structured mission
- classify the task
- decide ranking rules and output format
- assign execution to the right worker
- track which worker owns which step
- monitor progress across the run
- validate whether the worker output matches the original instruction
- pause for human verification when required
- collect results back into one final answer

## Boss Role Definition

`xiaohongshu-boss` is an instruction layer, not a hands-on scraper.

Its job is to:

1. understand the user's natural-language request
2. convert it into task parameters and checkpoints
3. dispatch work to the right employee skill
4. monitor execution progress and detect drift
5. verify the returned output against the requested goal
6. decide whether to continue, retry, escalate, or report back

## OpenProse Mode

When OpenProse is available, prefer running:

`/prose run ./workflows/xiaohongshu-boss.prose`

Use that program when the user wants:

- one natural-language command turned into a mission
- explicit worker delegation
- checkpoint-aware execution
- monitored progress
- final validation against the original prompt

## Task Types

Route each request into one primary type:

- collection
- note-detail review
- comment analysis
- creator comparison
- trend watch
- deep research
- content planning
- title generation
- publishing preparation
- export and reporting

## Dispatch Rules

- If the task needs Xiaohongshu domain execution, send it to `xiaohongshu-suite`.
- If the task needs browser navigation or site interaction, use `browser-assist`.
- If the task needs desktop export or local file processing, use `windows-ops`.
- If the task is broad and has multiple stages, combine `xiaohongshu-suite` with `team-orchestrator`.
- If login or human verification appears, stop and ask the user to complete it manually before resuming.
- Do not let a worker silently change the task goal; re-check output against the original prompt before moving to the next stage.

## Safe Defaults

- Prefer the user's existing Chrome session
- Prefer visible-page data over hidden or inferred data
- Normalize engagement metrics before ranking
- Export spreadsheet-friendly CSV files by default
- Keep runs reviewable and batch-sized

## Standard Outputs

- ranked top-N table
- competitor comparison table
- creator comparison report
- trend brief
- title and hook pack
- publishing preparation checklist

## Final Answer Style

After workers finish:

1. summarize what was done
2. state where the result file was saved
3. mention any manual checkpoint or data limitation
4. suggest the next best Xiaohongshu task if useful

Before declaring the task complete, confirm:

1. the output matches the requested keyword or subject
2. the ranking rule matches the user instruction
3. the file naming prefix matches the task keyword
4. any missing detail extraction is explicitly disclosed
