# Task Templates

Use these templates when the user wants a repeatable Xiaohongshu mission.

## Template: Keyword hot-post scan with comment topics

Goal:
Find recent high-performing posts for a keyword, then inspect comment sections for recurring topics.

Inputs:
- keyword
- recent window in days
- target count
- ranking metric

Default workflow:
1. search by keyword
2. limit to the recent time window if the site exposes that filter
3. collect visible post metadata
4. normalize engagement metrics
5. rank the top posts
6. inspect comments on the selected posts
7. cluster comment topics
8. export table plus summary

Outputs:
- top-post table
- comment-topic summary
- optional creator comparison notes

Filename rule:
- exported files should begin with the task keyword or subject
- example: `2026服装_top20.csv`
- example: `2026服装_summary.md`

## Parameterized mission template

- keyword: `<topic>`
- time window: `<days or custom range>`
- ranking rule: `<likes | comments | collects | mixed>`
- target count: `<N>`
- detail layer: `<none | comment topics | creator comparison | note detail>`
- outputs:
  - `<keyword>_top<N>.csv`
  - `<keyword>_summary.md`

Suggested comment-topic buckets when comment extraction is requested:
- purchase intent
- comparison points
- feature discussion
- price and value
- complaints or pain points
- accessories or ecosystem
