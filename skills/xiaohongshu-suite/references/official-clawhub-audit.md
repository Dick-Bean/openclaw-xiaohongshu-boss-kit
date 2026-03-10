# Official ClawHub Audit

Last checked against the official ClawHub site and frontend on 2026-03-10.

Source used:
- official page filter route: `https://clawhub.ai/skills?sort=downloads&nonSuspicious=true&q=xiaohongshu`
- official search listings observed via ClawHub search
- official frontend bundle confirms `nonSuspicious` is a real filter in the skills page UI

## Important Note

The public page is a client-rendered app. The visible filter exists, but the underlying search results are served through an internal frontend search path and the CLI was rate-limited during deeper inspection.

Use this audit as an official-market capability map, not as a guarantee that every listed skill is safe to install.

## Official Listing Families Observed

### Automation and collection

- `xiaohongshu-mcp`
- `xiaohongshu-mcp-skill`
- `xiaohongshu-mcp-skills`
- `xiaohongshu-api`

Typical capability signals:
- keyword search
- note lookup
- engagement extraction
- comments
- browser or API driven collection

### Research and trend analysis

- `xiaohongshu-cn`
- `xiaohongshu-deep-research`

Typical capability signals:
- hot-note discovery
- keyword monitoring
- trend analysis
- repeated research style workflows

### Content planning and writing

- `xiaohongshu-title`
- `xiaohongshu-content`
- `xiaohongshu-founder-growth-writer`
- `xhs-writing-coach`

Typical capability signals:
- title generation
- hook optimization
- content angle planning
- founder-style growth writing

### Operator and workflow assistant

- `xiaohongshu-assistant-operator`
- `rednote-skills`
- `rednote`
- `DeliciousBuding/xiaohongshu-skill`

Typical capability signals:
- operator assistant patterns
- workflow guidance
- mixed Xiaohongshu task handling
- search filters
- QR-code login flow
- user profile and self-profile lookup
- guarded publishing support
- markdown-to-image publish path

### Desktop or Mac controller variants

- `rednote-mac`
- `xhs-mac-mcp`

Typical capability signals:
- desktop automation
- app or browser control on specific platforms

## Gap Summary For Local Suite

### Already covered well

- safe browser collection
- human checkpoint continuation
- metric normalization
- likes-first and mixed-score ranking
- CSV export
- multi-step task routing design

### Partially covered and worth expanding

- note-detail and comment review templates
- creator/profile comparison templates
- keyword watch workflow
- multi-keyword deep-research workflow
- content-planning prompts and output packs
- operator checklists for posting preparation
- search filter presets
- homepage/explore collection route
- publish-preflight checklist
- markdown-to-image content packaging

### Intentionally not default-enabled

- detached browser login and cookie persistence
- direct automated publishing
- opaque third-party API dependencies
- stealth automation behavior

## Recommended Build Direction

To match the useful parts of the official market without inheriting its risks, the local suite should include:

1. collection and ranking
2. note-detail and comments analysis
3. creator comparison
4. trend watch workflow
5. title and content planning
6. publishing preparation checklists
7. future optional specialist worker
