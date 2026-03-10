# OpenClaw Xiaohongshu Boss Kit

An OpenClaw / ClawX workflow kit for Xiaohongshu research and browser-assisted collection.

This repository packages a boss-worker architecture:

- `xiaohongshu-boss`
  natural-language instruction layer, dispatcher, monitor, validator
- `xiaohongshu-suite`
  Xiaohongshu specialist worker for search, ranking, detail collection, and export
- `xiaohongshu-safe`
  safe browser-session collection helper
- `browser-assist`
  human-in-the-loop browser continuation
- `windows-ops`
  Windows local export and file handling helper
- `workflows/xiaohongshu-boss.prose`
  OpenProse workflow for mission parsing, delegation, monitoring, and validation

## What This Kit Does

- turn a natural-language Xiaohongshu task into a structured mission
- delegate execution to worker skills instead of doing everything in one prompt
- pause for login, CAPTCHA, slider, or other human verification
- continue after the operator finishes the human checkpoint
- collect visible search results in the user's real browser session
- normalize engagement metrics and export ranked CSV files
- generate Markdown summaries and workflow documentation

## What This Kit Does Not Do

- bypass CAPTCHA automatically
- evade anti-bot protections
- spoof human behavior to defeat verification systems
- scrape hidden data outside the user's authorized session

## Repository Layout

- `skills/`
  OpenClaw skills to copy into `~/.openclaw/skills/`
- `workflows/`
  OpenProse programs to run with `/prose run`
- `docs/`
  visual workflow diagram and PDF
- `scripts/`
  installer and helper scripts

## Quick Install

1. Copy the skill folders under `skills/` into your OpenClaw skills directory.
2. Copy `workflows/xiaohongshu-boss.prose` into a workspace path you will use with ClawX.
3. Enable the OpenProse plugin in OpenClaw.
4. Use your normal Chrome session and OpenClaw browser relay.

You can also use:

`scripts/install-kit.ps1`

On Windows, the ranked collection helper is:

`skills/xiaohongshu-suite/scripts/run_xhs_collect.ps1`

If your OpenClaw bundle stores `playwright-core` in a different location, set:

`OPENCLAW_PLAYWRIGHT_ROOT=<path-to-playwright-core>`

## Recommended Usage

In ClawX:

1. open a normal conversation
2. run:

   `/prose run ./workflows/xiaohongshu-boss.prose`

3. give the workflow an objective such as:

   `objective: collect recent Xiaohongshu posts for fashion2026, rank top 20 by likes, extract comment topics, export to desktop`

## Output Naming

Collection exports are designed to start with the task keyword or subject:

- `fashion2026_top20.csv`
- `fashion2026_summary.md`
- `iphone_top20.csv`

## Notes

- This kit is optimized for human-in-the-loop operation.
- Detail pages and comments on Xiaohongshu can be personalized by session and recommendation logic.
- Treat comment and detail extraction as best-effort.
