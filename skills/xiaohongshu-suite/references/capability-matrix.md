# Capability Matrix

Use this file to check which public Xiaohongshu skill patterns exist and what the local suite should cover.

## Public Capability Clusters Observed

### 1. Search and note discovery

Seen in:
- `xiaohongshu-mcp`
- `xiaohongshu-cn`
- `xiaohongshu-mcp-skills`

Typical functions:
- keyword search
- hot-note discovery
- trend lookup
- note detail lookup

Local suite coverage:
- covered now

### 2. Detail and comment analysis

Seen in:
- `xiaohongshu-mcp`
- `xiaohongshu-mcp-skills`

Typical functions:
- open note detail
- fetch comment list
- extract engagement metrics

Local suite coverage:
- covered for visible browser data
- deeper automated extraction can be expanded later

### 3. Creator and profile analysis

Seen in:
- `xiaohongshu-cn`
- `xiaohongshu-mcp-skills`
- creator-toolkit style projects

Typical functions:
- author profile view
- creator comparison
- account-level signal collection

Local suite coverage:
- added as supported analysis path
- needs more dedicated report templates

### 4. Content planning and title generation

Seen in:
- `xiaohongshu-title`
- `rednote`
- `xiaohongshu-founder-growth-writer`
- `xiaohongshu-content`

Typical functions:
- title generation
- content angle generation
- hook optimization
- cover or content brief generation

Local suite coverage:
- added to suite scope
- not yet separated into a dedicated title/planning sub-skill

### 5. Publishing and creator-center workflows

Seen in:
- `xiaohongshu-mcp`
- `xhs-skill`
- `rednote`
- toolkit-style MCP projects
- `DeliciousBuding/xiaohongshu-skill`

Typical functions:
- QR login
- publish image note
- publish video note
- tag insertion
- creator-center data export
- markdown-to-image publishing
- publish-page readiness checks
- home feed exploration

Local suite coverage:
- planning and checklists covered
- direct write operations intentionally kept cautious

### 7. Fine-grained worker command design

Seen in:
- `DeliciousBuding/xiaohongshu-skill`

Typical functions:
- `search` with filters for sort, note type, publish time, scope, and location
- `feed` for note detail with optional comments
- `user` and `me` for profile views
- `explore` for home recommendations
- `comment`, `reply`, `like`, `collect` interaction actions
- `publish`, `publish-video`, `publish-md` for guarded write flows

Local suite coverage:
- command ideas adopted into planning
- direct write actions still gated by explicit user confirmation

### 6. Scheduled monitoring and repeated research

Seen in:
- `xiaohongshu-cn`
- toolkit-style data collectors
- deep-research style skills

Typical functions:
- keyword watch
- repeated capture
- trend snapshots
- batch comparisons

Local suite coverage:
- workflow-ready
- can later become an automation

## Recommended Completion Strategy

Treat the local suite as complete when these six blocks are present:

1. search and collection
2. metric normalization and ranking
3. detail/comment analysis
4. creator/profile analysis
5. content planning
6. export and reporting

Publishing can remain a guarded optional block instead of a default block.
