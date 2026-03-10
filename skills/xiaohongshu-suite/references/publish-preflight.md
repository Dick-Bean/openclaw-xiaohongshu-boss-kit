# Publish Preflight

Use this file when the user wants publish preparation without automatic posting.

## Principle

Publishing is a guarded action. Default to preparation and human confirmation, not final submission.

## Preflight Checklist

- title prepared
- content prepared
- tags prepared
- assets exist on disk
- image or video count checked
- schedule time confirmed or left blank
- publishing objective stated
- final human review checkpoint kept

## Supported Preparation Outputs

- publish checklist Markdown
- draft metadata sheet
- asset inventory
- markdown-to-image packaging brief

## When To Stop

Stop before final publish unless the user explicitly asks for a posting action and accepts the risk.

## Markdown-To-Image Preparation

If the user wants a long Xiaohongshu post prepared from Markdown:

1. confirm title
2. confirm Markdown source
3. confirm output image width or use default
4. confirm tags
5. prepare the image asset list
6. hand off the final publish step to human confirmation

## Helper Script

Use `scripts/prepare_publish_pack.py` to create a reusable preflight Markdown file.

