# Modules

## Goal

Unify Xiaohongshu capabilities without blindly merging third-party code.

## Module Map

### Module 1: Human Browser Intake

Purpose:
Open Xiaohongshu, reach the target page, and hand control to the user for login or verification.

Preferred path:
- `browser-assist`
- `xiaohongshu-safe`

### Module 2: Visible Result Collection

Purpose:
Collect note cards or note detail fields from visible pages in the authenticated session.

Preferred fields:
- title
- author
- url
- likes raw
- collects raw
- comments raw
- publish hint
- keywords
- capture time

### Module 3: Metric Normalization

Purpose:
Convert values like `1.2万` and `9千` into sortable numbers.

Preferred path:
- `xiaohongshu-safe/scripts/normalize_xhs_metrics.py`

### Module 4: Ranking and Export

Purpose:
Sort by likes, collects, comments, or mixed score and export to CSV.

Preferred path:
- local CSV processing
- desktop output

### Module 5: Trend and Competitor Layer

Purpose:
Compare repeated runs across multiple keywords, brands, or themes.

Current state:
- supported as a suite workflow
- ready for repeated manual or assisted runs

### Module 6: Creator and Profile Analysis

Purpose:
Collect and compare visible creator profile signals such as follower hints, note style, posting focus, and engagement patterns.

Preferred path:
- browser-assisted profile capture
- local comparison tables

### Module 7: Comment and Note Detail Review

Purpose:
Open high-performing notes, capture visible detail, and inspect comments for audience language and demand signals.

Preferred path:
- browser-assisted note detail collection
- local CSV or Markdown export

### Module 8: Content Planning Layer

Purpose:
Turn collected examples into title ideas, hook variants, topic clusters, and content briefs.

Preferred path:
- suite-guided planning
- optional future dedicated planning sub-skill

### Module 9: Publishing Preparation Layer

Purpose:
Prepare publish-ready assets, metadata, and checklists without forcing automatic posting.

Preferred path:
- local draft package
- user confirmation before any write action

### Module 10: Deep MCP Integration

Purpose:
Expose Xiaohongshu collection as a dedicated worker that OpenClaw can call like a specialist.

Current state:
- candidate future phase
- should use the existing browser session model, not a detached stealth browser, unless built in an isolated test environment

## Why Not Blindly Merge Public Skills

- They often store login state differently.
- They often assume their own browser runtime.
- Their DOM selectors conflict or drift.
- They may include shell commands or side behaviors that are harmless but unnecessary.
- Public market ranking does not equal production safety.

## Best Build Strategy

Build one suite with layered modules:

1. safe browser collection
2. metric normalization
3. ranking and export
4. optional future specialist worker

This gives one user-facing Xiaohongshu skill without inheriting every risk from every public package.
