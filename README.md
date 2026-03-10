# OpenClaw Xiaohongshu Boss Kit

An OpenClaw / ClawX workflow kit for Xiaohongshu research and browser-assisted collection.

This project packages a boss-worker architecture for people who want:

- a natural-language command layer
- human-in-the-loop browser automation
- OpenProse orchestration
- reusable OpenClaw skills
- ranked Xiaohongshu collection exports

## Overview

This repository turns a Xiaohongshu task into a team workflow:

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

## Why This Exists

Most browser-heavy platforms are not a good fit for fully detached scraping.

This kit is built around a safer and more practical model:

- use the operator's real browser session
- let the boss turn a prompt into a mission
- delegate work to specialized workers
- pause for login, CAPTCHA, slider, 2FA, or other human verification
- continue after the operator completes the checkpoint

That makes it much better suited to dynamic and personalized platforms such as Xiaohongshu.

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

## Workflow

Full workflow diagram:

- [PDF diagram](./docs/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%9B%A2%E9%98%9F%E5%AE%8C%E6%95%B4%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E5%9B%BE.pdf)
- [HTML diagram](./docs/xiaohongshu_workflow_diagram.html)

Core execution chain:

1. user gives a natural-language objective in ClawX
2. `xiaohongshu-boss` interprets the task
3. OpenProse turns it into a structured workflow
4. workers execute search, browser, export, and validation steps
5. the system pauses for human-only verification when needed
6. the boss validates results before reporting completion

## Repository Layout

- `skills/`
  OpenClaw skills to copy into `~/.openclaw/skills/`
- `workflows/`
  OpenProse programs to run with `/prose run`
- `docs/`
  workflow diagram assets
- `scripts/`
  installer and helper scripts

## Quick Install

1. Copy the skill folders under `skills/` into your OpenClaw skills directory.
2. Copy `workflows/xiaohongshu-boss.prose` into a workspace path you will use with ClawX.
3. Enable the OpenProse plugin in OpenClaw.
4. Use your normal Chrome session and OpenClaw browser relay.

You can also use:

`scripts/install-kit.ps1`

## Windows Collection Helper

The ranked collection helper is:

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

## Best-Fit Use Cases

- keyword-based hot-post scans
- top-N ranking by likes
- comment-topic extraction
- trend snapshots in a real logged-in session
- human-in-the-loop browser workflows
- OpenClaw / ClawX skill orchestration demos

## Notes

- This kit is optimized for human-in-the-loop operation.
- Detail pages and comments on Xiaohongshu can be personalized by session and recommendation logic.
- Treat comment and detail extraction as best-effort.

## License

MIT
