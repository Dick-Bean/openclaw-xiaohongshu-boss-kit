#!/usr/bin/env python3
import argparse
from pathlib import Path


def parse_list(value: str) -> list[str]:
    if not value:
        return []
    return [item.strip() for item in value.split(",") if item.strip()]


def build_markdown(
    title: str,
    content_summary: str,
    tags: list[str],
    assets: list[str],
    schedule_time: str,
    post_type: str,
    objective: str,
) -> str:
    tags_text = ", ".join(tags) if tags else "(none)"
    assets_lines = "\n".join(f"- {asset}" for asset in assets) if assets else "- (none listed)"
    schedule_text = schedule_time or "Immediate or not decided"

    return f"""# Xiaohongshu Publish Preflight

## Goal

- objective: {objective or "(not specified)"}
- post type: {post_type}

## Draft

- title: {title or "(missing)"}
- content summary: {content_summary or "(missing)"}
- tags: {tags_text}
- schedule: {schedule_text}

## Assets

{assets_lines}

## Checks

- [ ] Title is final
- [ ] Content summary matches the intended post
- [ ] Tags are confirmed
- [ ] Asset files exist and are the correct media
- [ ] Schedule is confirmed or intentionally blank
- [ ] Human review is complete
- [ ] Safe to proceed to manual publish

## Notes

- Default behavior is prepare-only.
- Final publish should remain a human-confirmed action.
"""


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate a Xiaohongshu publish preflight markdown file.")
    parser.add_argument("--title", default="", help="Draft title")
    parser.add_argument("--content-summary", default="", help="Short content summary")
    parser.add_argument("--tags", default="", help="Comma-separated tags")
    parser.add_argument("--assets", default="", help="Comma-separated asset paths")
    parser.add_argument("--schedule-time", default="", help="Optional schedule time")
    parser.add_argument("--post-type", default="image-text", help="Post type, e.g. image-text or video")
    parser.add_argument("--objective", default="", help="Posting objective")
    parser.add_argument("--output", required=True, help="Output markdown path")
    args = parser.parse_args()

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    markdown = build_markdown(
        title=args.title,
        content_summary=args.content_summary,
        tags=parse_list(args.tags),
        assets=parse_list(args.assets),
        schedule_time=args.schedule_time,
        post_type=args.post_type,
        objective=args.objective,
    )

    output_path.write_text(markdown, encoding="utf-8")
    print(output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
