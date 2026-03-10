---
name: browser-assist
description: |
  Human-in-the-loop browser assistant for Chrome-based page work on this PC. Activate when the user wants the assistant to open pages, click through flows, extract information, and continue after the user manually completes login, CAPTCHA, or human verification.
---

# Browser Assist Skill

Use this skill when the user wants help operating websites in a normal browser session on this computer.

Default browser preference for this kit is Google Chrome. Do not default to Microsoft Edge Dev unless the user explicitly asks for it.

This skill is designed for legitimate, user-authorized browsing with manual human checkpoints. It is not for bypassing anti-bot protections or pretending to be a human when a site is explicitly testing for that.

## Main Idea

The assistant can handle repeatable browser work such as:

- opening pages
- clicking buttons and links
- navigating paginated results
- extracting fields from visible pages
- summarizing or exporting collected information

When a site requires human action, the user takes over briefly, then the assistant continues from the new page state.

## Supported Human Checkpoint Flow

Use this pattern whenever login, 2FA, CAPTCHA, slider checks, or "confirm you are human" pages appear:

1. Navigate up to the blocked step.
2. Stop and tell the user exactly what is blocking progress.
3. Ask the user to complete the human-only action manually.
4. After the user says it is done, resume from the current page state.
5. Continue the remaining browsing and extraction work.

## Allowed Use

- Work inside the user's own logged-in browser session
- Continue after the user manually completes human verification
- Read and organize information the user is authorized to access
- Perform repetitive page operations on whitelisted sites

## Not Allowed

- Solving or bypassing CAPTCHA automatically
- Evading anti-bot detection
- Spoofing human behavior to defeat site protections
- Collecting data from sites where the user lacks authorization
- Mass scraping that violates site rules or local law

## Working Style

1. Confirm the target site and task.
2. Use the browser in normal user context.
3. If blocked by verification, stop cleanly and hand control to the user.
4. Resume only after the user confirms the checkpoint is complete.
5. Keep extracted results structured and easy to review.

## Good Task Examples

- "Open the merchant dashboard, I will log in, then continue collecting today's order numbers."
- "Go through each result page and copy title, price, and link into a table."
- "When the site asks me to verify, stop and wait for me, then continue."
- "Use my Chrome session to inspect records I can already access."

## Output Formats

Prefer one of these when gathering information:

- Markdown table
- CSV-ready rows
- JSON objects
- Bullet summary with source page URLs

## Suggested Prompting Pattern

Useful user wording:

- "Use $browser-assist. If login or verification appears, stop and wait for me."
- "Use $browser-assist to open this site, and after I finish the human check, continue extracting the visible data."
- "Use $browser-assist to browse page by page and summarize the results."

## Safety Notes

- Treat login, CAPTCHA, and identity checks as user-only actions.
- Do not claim a page was verified by the assistant.
- Do not hide when automation is being used.
- Prefer small, reviewable batches over massive unattended runs.
