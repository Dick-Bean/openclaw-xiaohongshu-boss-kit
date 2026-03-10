---
name: xiaohongshu-safe
description: |
  Safe Xiaohongshu browser workflow for ClawX/OpenClaw using the user's own Chrome session with manual human checkpoints. Use when the user wants to search Xiaohongshu, open notes, rank visible results by likes or other engagement metrics, extract fields into tables, and continue after the user manually completes login or human verification.
---

# Xiaohongshu Safe Skill

Use this skill for Xiaohongshu tasks that should stay inside the user's normal browser session.

Do not use it to bypass anti-bot checks. Treat login, CAPTCHA, slider checks, and identity verification as user-only steps.

## Main Workflow

1. Open or reuse the user's Xiaohongshu tab in Chrome.
2. Confirm the search topic, target count, and ranking rule.
3. If login or verification appears, stop and wait for the user.
4. After the user confirms completion, continue from the current page.
5. Read only visible page data and keep batches reviewable.
6. Export results as a table on the user's desktop unless the user asks for another location.

## Preferred Collection Fields

Prefer these fields when visible:

- ranking
- title
- author
- note url
- likes raw
- likes normalized
- collects raw
- collects normalized
- comments raw
- comments normalized
- publish hint
- keywords
- source page
- captured at

If some fields are not visible, leave them blank instead of guessing.

## Ranking Rules

- If the user says "highest likes", normalize Chinese units before sorting.
- Treat `万` as 10000 and `千` as 1000.
- Keep the raw text and the normalized numeric value.
- If the page is already sorted by a platform control, still capture the numeric fields for later checking.

Use `scripts/normalize_xhs_metrics.py` when metric text needs normalization or a CSV needs re-sorting by engagement.

## Working Style

- Use the user's own authenticated browser context.
- Collect in small batches, then merge and sort.
- Say clearly when a verification step needs manual action.
- Keep exports audit-friendly and easy to open in Excel or WPS.

## Allowed Use

- Search Xiaohongshu in the user's browser
- Open notes and collect visible metadata
- Continue after the user manually completes verification
- Export visible results into CSV or Markdown tables
- Re-rank results locally using normalized engagement values

## Not Allowed

- Automatic CAPTCHA solving
- Evasion of anti-bot or fingerprint checks
- Hidden background scraping outside the user's session
- Guessing inaccessible or hidden data

## Output Defaults

- Save CSV exports to the user's desktop
- Use UTF-8 with BOM for Chinese spreadsheet compatibility
- Include raw and normalized metric columns together
