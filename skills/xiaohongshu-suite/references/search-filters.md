# Search Filters

Use this file when a Xiaohongshu task needs search constraints rather than a plain keyword search.

## Useful Filter Dimensions

- keyword
- sort rule
- note type
- publish time
- search scope
- location
- result count

## Recommended Normalized Terms

### Sort rule

Use one of:
- comprehensive
- newest
- most-liked
- most-commented
- most-collected

### Note type

Use one of:
- any
- image-text
- video

### Publish time

Use one of:
- any
- one-day
- one-week
- one-month
- six-months
- custom-recent-window

### Search scope

Use one of:
- any
- seen
- unseen
- followed

### Location

Use one of:
- any
- local-city
- nearby

## Worker Behavior

When the user gives fuzzy wording, normalize it:

- "最近" -> use a recent time window and state the chosen window
- "爆款" -> prefer `most-liked` or a mixed engagement score
- "图文" -> `image-text`
- "视频" -> `video`
- "同城" -> `local-city`
- "附近" -> `nearby`

If the actual page filter does not expose the requested option, collect visible data first and note the limitation.

## Suggested Structured Input

- keyword:
- sort:
- note_type:
- publish_time:
- scope:
- location:
- limit:

## Example

- keyword: `护肤`
- sort: `most-liked`
- note_type: `image-text`
- publish_time: `one-month`
- scope: `any`
- location: `any`
- limit: `20`

