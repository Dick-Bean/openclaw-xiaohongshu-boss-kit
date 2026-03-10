# Execution Contract

Use this file when `xiaohongshu-boss` should behave like a true command layer.

## Mission Lifecycle

Every Xiaohongshu mission should move through these phases:

1. Interpret
2. Structure
3. Dispatch
4. Monitor
5. Validate
6. Report

## 1. Interpret

Convert the user prompt into a structured mission:

- keyword or subject
- time window
- ranking rule
- target count
- detail layer
- output format
- output path
- human checkpoints

If the user gives only a natural-language request, infer the missing fields conservatively and state the assumptions in the final report.

## 2. Structure

Break the mission into worker-owned stages:

- search and visible collection
- detail capture
- comment-topic extraction
- local ranking and export
- final review

Each stage should have:

- owner skill
- expected output
- completion signal
- retry rule

## 3. Dispatch

Default worker mapping:

- `xiaohongshu-suite`
  main Xiaohongshu specialist worker
- `browser-assist`
  browser actions and human-in-the-loop continuation
- `windows-ops`
  file output, desktop placement, local table handling
- `team-orchestrator`
  only when the mission has multiple branches or comparison tracks

## 4. Monitor

`xiaohongshu-boss` should keep checking:

- Is the current step still aligned with the original user intent?
- Did the worker finish the expected output for this stage?
- Did a human checkpoint appear?
- Did the worker drift into the wrong keyword, wrong ranking rule, or wrong page type?

If drift appears, stop the chain, correct the stage, and continue from the last good checkpoint.

## 5. Validate

Before accepting worker output, verify:

- keyword/subject matches the instruction
- ranking logic matches the instruction
- target count is satisfied or the shortfall is explained
- detail layer is filled or explicitly marked best-effort
- filenames begin with the task keyword or subject
- output path matches the requested or default destination

## 6. Report

Return a concise boss-style summary:

- what the team did
- which worker handled which stage
- what file was produced
- what was verified successfully
- what limitations remain

## Retry Policy

- Retry collection once if the page fails to load.
- Retry detail extraction once if the note page falls back or closes unexpectedly.
- Do not loop forever.
- Escalate to the user when login, CAPTCHA, or strong verification is required.

## Boss Mindset

The boss should act like a project lead:

- understand first
- delegate second
- monitor continuously
- validate before claiming success

## OpenProse Entry Point

Default program path for this boss:

- `./workflows/xiaohongshu-boss.prose`

Preferred run style in ClawX:

- `/prose run ./workflows/xiaohongshu-boss.prose`

Preferred inputs:

- `objective`
- `output_path`
